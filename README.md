# Playwright E2E Test Project

This project uses [Playwright](https://playwright.dev/) with TypeScript for end-to-end testing of web applications.

## Project Structure

- `myDemoTests/` — Contains all test files.
- `pojos/` — Page Object Models for test abstraction.
- `playwright.config.ts` — Playwright configuration.
- `myDemoTests/myDataSet.ts` — Test data for login scenarios.

## Prerequisites

- Node.js (v16+ recommended)
- npm

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. (Optional) Configure environment variables in `.env`.

## Running Tests

Run all tests:
```
npx playwright test
```

Run tests for a specific browser:
```
npx playwright test --project=chromium
```

View HTML test report:
```
npx playwright show-report
```

## Configuration

See `playwright.config.ts` for browser/project settings, retries, and parallelism.

## Writing Tests

- Use TypeScript in the `myDemoTests/` directory.
- Page Objects are in `pojos/`.

## Resources

- [Playwright Documentation](https://playwright.dev/docs/intro)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
