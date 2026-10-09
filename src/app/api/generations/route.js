import { NextResponse } from 'next/server';
import { SEED_BATCHES, buildBatch } from '@/lib/mockGenerations';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// GET /api/generations -> past batches
export async function GET() {
  return NextResponse.json({ batches: SEED_BATCHES });
}

// POST /api/generations -> new batch after a realistic delay.
// Tip for demos: a prompt containing the word "fail" returns an error.
export async function POST(request) {
  const settings = await request.json().catch(() => null);
  const prompt = String(settings?.prompt ?? '').trim();

  if (!prompt) {
    return NextResponse.json(
      { error: 'Please describe what you want to create.' },
      { status: 400 },
    );
  }

  await sleep(1400 + Math.random() * 1200);

  if (/\bfail\b/i.test(prompt)) {
    return NextResponse.json(
      { error: 'The model could not process this prompt. Please try again.' },
      { status: 500 },
    );
  }

  return NextResponse.json({ batch: buildBatch(settings) });
}
