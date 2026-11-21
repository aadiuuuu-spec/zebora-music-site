# ZEBORA × MUSIC

Premium responsive music discovery website built with Next.js 15 and TypeScript.

## Features
- Responsive premium dark interface
- YouTube Data API v3 search (server-side API key)
- Official YouTube embedded playback
- Browser-local likes, history and queue

## Setup
1. Use Node.js 20.9+.
2. Run `npm install`.
3. Copy `.env.example` to `.env.local`.
4. Set `YOUTUBE_API_KEY` to a YouTube Data API v3 key.
5. Run `npm run dev`.

## Vercel
Import this repository, add `YOUTUBE_API_KEY` in Project Settings → Environment Variables, then deploy.

Playback uses YouTube's official embedded player; no audio extraction, downloading, cookies, or playback restriction bypass is used. Some videos may not allow embedding. Likes and history are stored only in the current browser.