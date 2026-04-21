# LoanPro User Management API - Playwright Framework

A clean Playwright API automation framework for the User Management API take-home challenge.

## What is included
- Client-Service layered design
- Environment-based execution for `dev` and `prod`
- Positive, Negative, Boundary, and Contract-level tests
- Zod schema validation for response contracts
- GitHub Actions workflow with parallel `dev` and `prod` jobs
- `BUGS.md` template for documenting discrepancies

## Project structure
```text
project-root/
├── .github/
│   └── workflows/
│       └── api-tests.yml
├── src/
│   ├── api/
│   │   ├── clients/
│   │   ├── schemas/
│   │   ├── services/
│   │   └── tests/
│   │       └── users/
│   │           ├── positive/
│   │           ├── negative/
│   │           ├── boundary/
│   │           └── contract/
│   ├── core/
│   ├── fixtures/
│   └── test-data/
├── BUGS.md
├── package.json
├── playwright.config.ts
└── tsconfig.json
```

## Setup
```bash
npm install
cp .env.example .env
```

## Run the API locally
```bash
docker run -p 3000:3000 ghcr.io/danielsilva-loanpro/sdet-interview-challenge:latest
```

## Run tests
```bash
# Run all tests in parallel (recommended)
npm test

# Run tests and view detailed HTML report
npm run report

# Run tests for specific environment
npm run test:dev
npm run test:prod

# Run tests for specific test type
npm run test:positive
npm run test:negative
npm run test:boundary
npm run test:contract
```

## Test Results
- Parallel execution enabled
- Configured workers: 4 (local) / 2 (CI)
- Last run: 28 passed, 14 failed (66.67% pass rate)

## Detailed Test Report

For a more detailed test report including test traces and error contexts:
```bash
npm run report
```
Test results are available at: `test-results/`
HTML Report is available at: `playwright-report/`

  - `TCPassed.md` - List of passing tests
  - `BUGS.md` - Documentation of bugs found

## Allure Report

This project uses Allure for advanced test reporting, providing detailed insights such as test steps, execution timeline, and failure analysis.

### Install Allure
Allure dependencies are already included in the project. Ensure Java is installed:

```bash
java -version

# Install Allure Commandline
npm install -g allure-commandline --save-dev
```
### Generate and Open Allure Report
After running tests, generate the Allure report:
```bash
npm run allure:generate
```
### Open Allure Report
```bash
npm run allure:open
```


## Notes
- Update `BUGS.md` with real findings after execution.
- If the API behavior differs from the contract, keep the tests and document the discrepancy.
- For final submission, commit this framework to GitHub and verify GitHub Actions is green or at least executing both jobs.
