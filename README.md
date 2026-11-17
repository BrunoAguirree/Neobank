# COMPASS — Educational Savings Goal Simulator (FIN506)

**Team:** Sofía Torres and Bruno Aguirre  
**University:** Universidad Panamericana  
**Course:** Financial Technology (FIN506)  
**Date:** November 2026

## 1. Project Overview

COMPASS is an educational savings goal simulator designed to help users understand how to organize savings, track contributions, and monitor progress toward financial goals.

The prototype follows a fictional user named Alex, who can create a savings goal, add simulated contributions, and review the balance, progress, and transaction history.

**Important disclaimer:** COMPASS is not a bank or a licensed financial institution. The application does not receive real money, open bank accounts, process transfers, issue loans, or pay interest. All financial activity shown in the application is simulated.

## 2. Main Features

- Create and save a savings goal.
- Record simulated contributions.
- Review and confirm simulated transactions.
- View savings progress and contribution history.
- Reset the demonstration.
- Store demonstration data locally in the browser.

## 3. Technology

The prototype uses:

- HTML for the interface.
- CSS for styling.
- JavaScript for application logic.
- JavaScript ES modules for monetary calculations.
- Browser localStorage for local data persistence.
- Node.js for automated tests.

No external banking API or real payment processor is connected.

## 4. How to Run the Application

1. Download the GitHub repository.
2. Open a terminal in the project folder containing `index.html`.
3. Start a local server using the command:

   `python3 -m http.server 8000`

4. Open `http://localhost:8000/` in a compatible browser.
5. Follow the demonstration flow:

   **Enter demo → Save goal → Add simulated contribution → Review contribution → Confirm simulation → View goal and history**

6. Use **Reset demo** to restart the simulation.

**Verification note:** A complete browser test and a publicly accessible deployment URL must be confirmed before the application is described as fully deployed.

## 5. Financial Simulation

COMPASS uses fictional financial data for educational purposes.

- All monetary amounts are calculated using integer MXN cents to reduce rounding errors.
- Contributions and balances are simulated.
- No real financial transactions occur.
- No real banking credentials are required.
- The fictional demonstration user is Alex.
- Demonstration data is stored locally in the browser.

The financial business model proposes:

- **Free Plan:** MXN $0 per month.
- **Premium Plan:** MXN $29 per month.

The Premium subscription is a financial projection assumption and is not implemented as a real payment feature in the current prototype.

## 6. Automated Testing

The project includes automated tests for its monetary calculation functions.

To execute them, run:

`node --test money.test.mjs`

During the November 16, 2026 review, four automated tests passed.

These tests cover:

- Conversion of monetary amounts into cents.
- Accurate addition of monetary values.
- Rejection of invalid monetary inputs.
- Safe-integer limits.

These results do not independently verify the full browser experience, authentication, or separation of data between users.

## 7. Repository Structure

- `index.html` — Application interface.
- `styles.css` — Visual design.
- `app.js` — Application logic.
- `money.mjs` — Monetary calculations.
- `money.test.mjs` — Automated tests.
- `seed.json` — Fictional demonstration data.
- `README.md` — Project overview and setup instructions.
- `SPEC.md` — Functional scope and technical specifications.
- `DECISIONS.md` — Project decisions and explanations.
- `BITACORA.md` — Development activity log.
- `PROJECT_METHOD.md` — Development methodology.
- `AGENTS.md` — Development guidelines.

## 8. Market Research

The team conducted an exploratory survey with 30 responses.

For the question about willingness to pay MXN $29 per month:

- 8 respondents answered Yes.
- 10 respondents answered Maybe.
- 10 respondents answered No.
- 2 respondents did not answer.

Therefore, 8 out of 28 valid respondents (28.6%) expressed willingness to pay.

These results represent stated preferences from an exploratory survey, not actual paying customers or validated conversion rates.

## 9. Financial Model

The five-year financial model includes:

- Free and Premium user assumptions.
- Monthly subscription revenue.
- Customer acquisition cost (CAC).
- Customer lifetime value (LTV).
- Churn assumptions.
- Operating expenses.
- Five-year financial projections.
- Cash flow and funding requirements.
- Business valuation scenarios.

Financial projections are hypothetical and should not be interpreted as guaranteed results.

## 10. Legal and Security Considerations

COMPASS is an educational simulation.

- No real funds are accepted.
- No real banking transactions are executed.
- No lending or interest payments are offered.
- No real payment processing is implemented.
- The current prototype uses browser-local demonstration storage.

Regulatory requirements, privacy obligations, and licensing considerations must be independently verified before any real financial service could be launched.

**TODO-verify:** Applicable Mexican financial regulations, data protection obligations, and requirements for a production launch.

## 11. Current Limitations and Pending Verification

The following items must be verified or completed:

- [ ] Test the complete application flow in a browser.
- [ ] Confirm that the public application URL works.
- [ ] Verify cancellation, confirmation, error handling, and data persistence.
- [ ] Review the authentication and multi-user requirement with the professor. The documented prototype currently uses one fictional demonstration user and does not establish per-user account isolation.
- [ ] Record a backup demonstration of no more than two minutes.
- [ ] Document actual development and review sessions in `BITACORA.md`.
- [ ] Obtain teammate review of repository changes through pull requests.
- [ ] Confirm any outstanding legal or regulatory assumptions.

## 12. Academic Purpose

COMPASS was developed as a Financial Technology (FIN506) academic project at Universidad Panamericana.

The project combines financial planning, user research, business modeling, and a functional educational prototype.

**All balances, contributions, transactions, and financial projections are for educational and demonstration purposes only.**
