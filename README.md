# SplitTip — Tip Calculator

A small, polished, self-contained tip calculator. Enter a bill amount, choose a tip percentage, and split the total across any number of people. Results update live as you type.

## How to run

No install, build step, or server required.

1. Open `index.html` in a modern browser (double-click the file, or drag it into a browser window).
2. Optional: open `tests.html` in the same way to run the calculation assertions.

You can also serve the folder with any static file server if you prefer, for example:

```bash
python3 -m http.server 8080
```

Then visit `http://localhost:8080`.

## Features

- **Bill amount** input with live recalculation
- **Tip presets**: 10%, 15%, 18%, 20%, 25%, plus a custom percentage field
- **Number of people** (minimum 1) with per-person tip and total
- **Outputs**: tip amount, total, tip per person, total per person — formatted as USD with two decimal places
- **Validation**: rejects negative values and invalid people counts; shows an inline error message
- **Reset** button to clear inputs and results
- **Responsive** layout for phone and desktop
- **Accessible**: labeled fields, `aria-pressed` on tip presets, `aria-live` on results, focus styles
- **Tests**: `tests.html` loads `calculateTip` from `app.js` and prints PASS/FAIL for each assertion

## Project structure

| File         | Role                                      |
| ------------ | ----------------------------------------- |
| `index.html` | App markup                                |
| `style.css`  | Layout and visual design                  |
| `app.js`     | Calculation logic and UI wiring           |
| `tests.html` | Browser-based assertions for `calculateTip` |
| `README.md`  | This file                                 |

Built with Cursor (Cursor Agent CLI) for MLH Global Hack Week: Hacktoberfest - Challenge 1: Build a Mini App with Cursor

## Development log

1. Build: Create a small, polished, self-contained Tip Calculator web app in this folder. Requirements: index.html, style.css, app.js (vanilla JS, no build step, no external CDNs). Inputs: bill amount, tip percentage (preset buttons 10/15/18/20/25% plus a custom % field), number of people (min 1). Outputs: tip amount, total, tip per person, total per person — updated live, formatted as currency with 2 decimals. Validate input (no negatives, show an inline error message), include a Reset button, make it responsive and accessible (labels, aria-live for results). Also write a README.md describing the app, how to run it (open index.html), features, and a note "Built with Cursor (Cursor Agent CLI) for MLH Global Hack Week: Hacktoberfest - Challenge 1: Build a Mini App with Cursor". Finally add a tests.html that runs a few assertions on the calculation function exported from app.js and prints PASS/FAIL.
2. Bug fix: Bug: in index.html/style.css the "$" currency prefix inside the Bill amount input overlaps the typed digits (e.g. "$86.40" renders with the $ on top of the 8). Fix the padding/positioning so the prefix sits left of the text with clear spacing, on all screen sizes. Also check that the "Total / person" highlight box in the results card is not clipped at the bottom. Keep everything else unchanged. Then append a "Development log" section to README.md listing the two prompts used with Cursor Agent CLI (first: build the app; second: this bug fix) in one line each.
