# OpenSJ

An open source Style Judging app for [LudoSport](https://www.ludosport.net), based on the system used by Style Judges under the supervision of [LudoSport INCOM](https://www.ludosportincom.org).

The encoding algorithm implements [Style Codes Version 2](https://anfive.github.io/style-codes/style-codes.html) (supporting half-point increments in Technical Coefficients), in use since September 2025.

The main objective of this repo is to provide an available base for creating alternative apps for new judging formats and testing them.

## Features

- **Dual-athlete evaluation** — Score two athletes side by side in a single session
- **Style parameters** — Evaluate BAS, MOV, DIN, COM, SAPD, GCC, and DIF (each 0–3 in 0.5 steps, contributing +0.1 per half-point)
- **SOG parameter** — Spirit of the Game bonus (0–3, contributing +0.1 per level)
- **PEN parameter** — Penalty deductions (0–20, each level subtracts 0.5)
- **Style code generation (V2)** — Encodes parameters into a compact alphanumeric code using base-23 encoding with the format `abXXcdeYZ`
- **Finalize evaluation** — Locks all parameters and displays the final score and style code for each athlete
- **Penalty highlighting** — Scores and codes are visually highlighted in red when penalties are applied
- **Reset / New Evaluation** — Long-press to reset all values; after finalization, starts a new evaluation
- **Dark mode support** — Respects system color scheme preferences

## Getting Started

This is a [Next.js](https://nextjs.org) project using the App Router and Tailwind CSS.

```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to use the app.

## Project Structure

```
app/
  page.tsx              — Main page with scoring logic and code generation
  layout.tsx            — Root layout
  globals.css           — Global styles and theme variables
  components/
    styleParameter.tsx  — Individual parameter row (click to increment)
    styleSummary.tsx    — Final score and code display after finalization
    styleCodes.tsx      — Style code display component
    stylePoints.tsx     — Score points display component
    styles.css          — Component-level styles
```

## Build

```bash
npm run build
npm start
```

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
