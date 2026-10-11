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
