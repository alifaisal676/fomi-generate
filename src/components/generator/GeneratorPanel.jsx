'use client';

import { useId, useRef, useState } from 'react';
import CollapsibleSection from '@/components/ui/CollapsibleSection';
import SegmentedControl from '@/components/ui/SegmentedControl';
import { useToast } from '@/components/ui/Toast';
import { MODE_OPTIONS } from '@/data/generatorDefaults';
import AdvancedSettings from './AdvancedSettings';
import CountPicker from './CountPicker';
import DurationPicker from './DurationPicker';
import ModelPicker from './ModelPicker';
import PromptBox from './PromptBox';
import RatioPicker from './RatioPicker';
import StylePicker from './StylePicker';

const PLACEHOLDERS = {
  image: 'Describe your imagination to be turned into a piece of art ...',
  video: 'Describe the scene you want to bring to life ...',
};

export default function GeneratorPanel({
  settings,
  onChange,
  onModeChange,
  onGenerate,
  isGenerating,
}) {
  const toast = useToast();
  const promptId = useId();
  const promptRef = useRef(null);
  const [isNudging, setIsNudging] = useState(false);
  const isVideo = settings.mode === 'video';

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isGenerating) return;

    // Empty prompt: guide the user instead of failing silently.
    if (!settings.prompt.trim()) {
      promptRef.current?.focus();
      setIsNudging(true);
      setTimeout(() => setIsNudging(false), 400);
      toast.show('Describe what you want to create first');
      return;
    }
    onGenerate();
  };

  return (
    <form
      aria-label="Generation settings"
      onSubmit={handleSubmit}
      noValidate
      className="flex flex-col gap-3"
    >
      <SegmentedControl
        label="Output type"
        options={MODE_OPTIONS}
        value={settings.mode}
        onChange={onModeChange}
        className="h-9"
      />

      <PromptBox
        id={promptId}
        value={settings.prompt}
        onChange={(prompt) => onChange({ prompt })}
        placeholder={PLACEHOLDERS[settings.mode]}
        isGenerating={isGenerating}
        isNudging={isNudging}
        textareaRef={promptRef}
      />

      <div className="flex items-center gap-1.5">
        {isVideo ? (
          <DurationPicker
            value={settings.duration}
            onChange={(duration) => onChange({ duration })}
          />
        ) : (
          <CountPicker value={settings.count} onChange={(count) => onChange({ count })} />
        )}
        <RatioPicker value={settings.ratio} onChange={(ratio) => onChange({ ratio })} />
        <ModelPicker
          mode={settings.mode}
          value={settings.model}
          onChange={(model) => onChange({ model })}
          className="flex-1"
        />
      </div>

      <CollapsibleSection title="Advance">
        <AdvancedSettings settings={settings} onChange={onChange} />
      </CollapsibleSection>

      <CollapsibleSection title="Styles">
        <StylePicker value={settings.style} onChange={(style) => onChange({ style })} />
      </CollapsibleSection>
    </form>
  );
}
