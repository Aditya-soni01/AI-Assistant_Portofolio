# dev-portfolio

AI-assisted interactive React portfolio with a voice-guided tour and animated assistant.

## Features
- Single-page portfolio experience
- Hero section
- Projects/systems showcase
- Skills/evolution timeline
- Contact/terminal section
- AI assistant popup for onboarding
- Visitor name personalization (`visitorName` in localStorage)
- Time-based greeting (morning/afternoon/evening)
- Voice-guided portfolio tour with smooth auto-scroll
- MagicRings animated assistant visualization (idle/thinking/speaking/listening states)
- Optional browser voice commands (Web Speech API)

## Tech Stack
- React 18
- Vite 5
- Tailwind CSS
- Framer Motion
- React Icons
- React Intersection Observer
- React Scroll
- React Type Animation
- Three.js (MagicRings animation)
- Browser Web Speech API (`SpeechSynthesisUtterance`, `SpeechRecognition` / `webkitSpeechRecognition`)

## Folder Structure
```text
src/
  App.jsx
  main.jsx
  components/
    Contact.jsx
    Projects.jsx
    Skills.jsx
    voice/
      VoiceAssistant.jsx
      VoiceAssistant.css
      MagicRings/
        MagicRings.jsx
        MagicRings.css
  data/
    data.js
  styles/
    index.css
```

## Installation
```bash
npm install
npm run dev
```

Default local URL:
- http://localhost:5173

## Build
```bash
npm run build
npm run preview
```

## Environment Variables
A `.env.example` file is present.

This frontend can run without setting env variables for the current assistant/tour flow, but optional integrations are documented in `.env.example`.

Available example variables:
- `VITE_APP_NAME`
- `VITE_APP_URL`
- `VITE_EMAILJS_SERVICE_ID`
- `VITE_EMAILJS_TEMPLATE_ID`
- `VITE_EMAILJS_PUBLIC_KEY`
- `VITE_RECAPTCHA_SITE_KEY`
- `VITE_GA_MEASUREMENT_ID`
- `VITE_PLAUSIBLE_DOMAIN`
- `VITE_FORMSPREE_ENDPOINT`
- `VITE_GITHUB_USERNAME`
- `VITE_GITHUB_TOKEN`
- `VITE_DEBUG`

## Backend
This project is currently frontend-only. No backend setup is required.

## LLM / HLM Usage
- This project does not require an LLM API by default.
- Voice greeting and guided narration use browser Text-to-Speech where supported.
- Optional voice commands use browser Speech Recognition where supported.
- Future upgrades can connect OpenAI, Claude, or Gemini APIs for full conversational intelligence.

Current HLM (high-level logic) includes:
- Visitor name capture and persistence
- Time-based greeting logic
- Assistant state management (`idle`, `thinking`, `speaking`, `listening`)
- Guided section tour orchestration
- Animation state mapping to assistant behavior

## Scripts
From `package.json`:
- `npm run dev` - Start Vite dev server
- `npm run build` - Build production bundle
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint checks
- `npm run lint:fix` - Auto-fix ESLint issues where possible
- `npm run format` - Format source files with Prettier

## Development Notes
- Keep portfolio content in `src/data/data.js`
- Add new sections as React components under `src/components`
- Keep reusable UI logic/components in `src/components`
- Keep global styles in `src/styles/index.css`
- Keep assistant-specific logic in `src/components/voice`

## Deployment
You can deploy this Vite app on:
- Vercel
- Netlify
- Hostinger static hosting
- Any static hosting provider that supports serving built files

Deployment steps:
1. Run `npm run build`
2. Deploy the `dist` folder
