import { useCallback, useEffect, useReducer, useRef } from 'react';
import { createGeneration, fetchGenerations } from '@/lib/api';

const initialState = { status: 'loading', batches: [], progress: null };

const patchBatch = (batches, id, patch) =>
  batches.map((batch) => (batch.id === id ? { ...batch, ...patch } : batch));

function reducer(state, action) {
  switch (action.type) {
    case 'loading':
      return { ...state, status: 'loading' };
    case 'loaded':
      return { ...state, status: 'ready', batches: action.batches };
    case 'load-failed':
      return { ...state, status: 'error' };
    case 'add':
      return { ...state, batches: [action.batch, ...state.batches], progress: 0.08 };
    case 'retry':
      return {
        ...state,
        progress: 0.08,
        batches: patchBatch(state.batches, action.id, { status: 'loading', error: null }),
      };
    case 'tick': // ease toward 90% while we wait; the response jumps it to 100%
      return state.progress === null || state.progress >= 0.9
        ? state
        : { ...state, progress: state.progress + (0.9 - state.progress) * 0.15 };
    case 'resolve':
      return {
        ...state,
        progress: 1,
        batches: state.batches.map((batch) =>
          batch.id === action.id ? { ...action.batch, id: action.id } : batch,
        ),
      };
    case 'fail':
      return {
        ...state,
        progress: 1,
        batches: patchBatch(state.batches, action.id, { status: 'error', error: action.error }),
      };
    case 'progress-done':
      return { ...state, progress: null };
    case 'dismiss':
      return { ...state, batches: state.batches.filter((batch) => batch.id !== action.id) };
    default:
      return state;
  }
}

/** Feed data + generate/retry flow against the mock API. */
export function useGenerations() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const counter = useRef(0);
  const isGenerating = state.batches.some((batch) => batch.status === 'loading');

  const load = useCallback(() => {
    fetchGenerations()
      .then((batches) => dispatch({ type: 'loaded', batches }))
      .catch(() => dispatch({ type: 'load-failed' }));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    if (!isGenerating) return;
    const timer = setInterval(() => dispatch({ type: 'tick' }), 250);
    return () => clearInterval(timer);
  }, [isGenerating]);

  const run = useCallback(async (id, settings) => {
    let result;
    try {
      const batch = await createGeneration(settings);
      dispatch({ type: 'resolve', id, batch });
      result = { ok: true };
    } catch (error) {
      dispatch({ type: 'fail', id, error: error.message });
      result = { ok: false, error: error.message };
    }
    setTimeout(() => dispatch({ type: 'progress-done' }), 600);
    return result;
  }, []);

  const generate = useCallback(
    (settings) => {
      const id = `gen-${++counter.current}`;
      const prompt = settings.prompt.trim();
      dispatch({
        type: 'add',
        batch: { id, status: 'loading', prompt, settings: { ...settings, prompt }, items: [] },
      });
      return run(id, { ...settings, prompt });
    },
    [run],
  );

  const retry = useCallback(
    (batch) => {
      dispatch({ type: 'retry', id: batch.id });
      return run(batch.id, batch.settings);
    },
    [run],
  );

  const dismiss = useCallback((id) => dispatch({ type: 'dismiss', id }), []);

  const reload = useCallback(() => {
    dispatch({ type: 'loading' });
    load();
  }, [load]);

  return { ...state, isGenerating, generate, retry, dismiss, reload };
}
