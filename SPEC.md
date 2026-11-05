# SPEC: Neobank — savings-goal demo (FIN506)

**Status:** Approved as the team's product specification by Bruno Aguirre and Sofia Torres on 2026-11-05. **Course scope-freeze exception remains TODO-verify with instructor** (Avance 2 was 2026-10-22).

**Last updated:** 2026-11-05 · **Owners:** Bruno Aguirre and Sofia Torres

> The savings flow, technology and financial assumptions are team-approved design choices, not factual claims supplied by the FIN506 handouts. Values in the business model are illustrative, unverified assumptions. This team approval does not establish instructor permission to modify scope after 2026-10-22.

## Problem

A university student in Mexico who wants to save for a specific goal may struggle to see how small contributions accumulate toward a target. Today the student may use a notes app or spreadsheet, but these do not provide a single, simple demonstration of goal progress. This MVP tests whether a simulated savings-goal screen makes the progress clear; it does **not** offer a real bank account.

## User

**One fictional user:** "Alex", a 20-year-old university student living in Mexico City who wants to put aside Mexican pesos for an upcoming personal expense. "Alex" is a pseudonym created for the demo, not a real customer. Only one demo-user role is supported.

## Vertical and value proposition

- **Vertical:** digital banking / neobank *concept*, implemented as an educational simulation.
- **One promise:** create a savings goal, simulate adding money, and immediately understand the resulting balance and progress.
- All screens visibly say **"Demo mode · No real money or bank account"**.

## Core flow (one MVP flow)

The same fictional user completes the following **five actions** in one continuous flow:

1. **Enter the demo** as Alex, without password, real identity, login, KYC, or account creation.
2. **Name a savings goal** and enter a positive target amount in MXN.
3. **Enter a simulated contribution** in MXN; see the amount and projected balance before proceeding.
4. **Confirm or cancel** the simulated contribution; validation errors prevent zero, negative, or malformed amounts. **Riskiest step: confirmation updates money correctly, once.**
5. **See the resulting balance and goal progress** on a success screen with an invented folio; return to the same goal to view its simulated contribution history.

**Acceptance check:** a stranger finishes steps 1–5 in less than two minutes at a 390-pixel mobile viewport, using only fabricated data, without a verbal explanation. The confirmation must not create duplicate contributions if clicked again.

## Data model (plain words)

1. **DemoUser**: `id` (fixed pseudonymous ID), `displayName` ("Alex"). One `DemoUser` has one `SavingsGoal`.
2. **SavingsGoal**: `id`, `userId`, `name`, `targetCents` (positive integer MXN cents), `createdAt` (ISO timestamp). The `SavingsGoal` has zero or more `Contribution` records.
3. **Contribution**: `id` (unique fabricated folio), `goalId`, `amountCents` (positive integer MXN cents), `createdAt` (ISO timestamp), `status` (always `simulated` on confirmed entries).

- The balance is **derived** by summing the goal's confirmed `Contribution.amountCents`, not stored separately. Goal progress = `balanceCents / targetCents * 100`; UI caps the visual bar at 100%, while actual balance remains visible even if above target.
- Amounts use **MXN integer cents**, not binary floating-point monetary arithmetic. Accept `123` or `123.45`; reject more than two decimal places, negative numbers, zero, nonnumeric strings, and sums beyond JavaScript's safe integer range. No fractional cents or rounding occurs for contributions.
- Use browser `localStorage` for **fictional demo records only**, so refresh retains progress. A visible **Reset demo** control clears the simulated records only. No server or database is necessary.

## Dependencies (closed list)

**Approved stack:** plain **HTML5 + CSS3 + JavaScript (ES modules)**, all executed in a modern browser. **Node.js 20+** is used solely to execute unit tests with the built-in `node:test` and `node:assert/strict` modules.

**Third-party software packages: NONE.** No React, Flask, Django, npm installation, database, third-party API or UI library. JavaScript standard browser APIs (`localStorage`) and Node.js built-ins are not third-party packages. Adding any package requires both partners' approval and a recorded decision.

## Fake data and simulated operations

- **Source:** a committed, human-readable, invented `seed.json` in the repository root containing one fictitious user (`Alex`) and initially no savings goal or contributions. App-generated IDs and simulated timestamps create subsequent contributions. Do not generate or use real personal names, phone numbers, bank details, identity documents, tokens, or credentials.
- Every contribution is a local simulation, not a transfer, SPEI, card payment, deposit at a bank or promise of custody/interest. Label simulated actions **Demo mode** before and after confirmation.
- No environment variables or secrets are required. Keep `.env` in `.gitignore` and never access credentials.

## Money logic and proposed unit economics

### Core-flow money rules

- **Balance (MXN cents)** = sum of `amountCents` from confirmed simulated contributions for the current goal. Reason: the demo must show the accumulation of fictitious contributions with no double counting.
- **Remaining (MXN cents)** = `max(targetCents - balanceCents, 0)`. Reason: a completed goal has no negative amount remaining.
- **Progress (%)** = `100 * balanceCents / targetCents`, displayed to one decimal place; the bar is visually limited to 100%. This is display rounding only; the integer-cent balance is unchanged.
- **Fees/interest in the simulated savings flow:** MXN **0.00 per contribution**, no interest earned. These are design assumptions for the demo and not claims about a bank product.
- **Required unit tests:** MXN 0.01 → 1 cent; MXN 185.00 → 18,500 cents; two contributions MXN 185.00 and MXN 15.00 → MXN 200.00; reject MXN 0.00, negative inputs, and >2 decimal places; reject duplicate confirmations; validate goal completion.

### Business-model assumptions (for FIN506 valuation; NOT charged or collected in this MVP)

The figures below are **team-approved hypothetical assumptions, not sourced market facts**. Units and periods are explicit. They remain subject to validation or replacement during valuation work through the course change-control process.

| Metric | Proposed value | Unit / period | Source / status |
|---|---:|---|---|
| Subscription price | MXN 29.00 | per paying user per month | Team-approved hypothetical business-model assumption; not implemented as a payment |
| Variable servicing cost | MXN 5.00 | per paying user per month | Team-approved hypothetical estimate; unverified |
| Customer acquisition cost (CAC) | MXN 80.00 | per acquired paying user, once | Team-approved hypothetical estimate; unverified |
| Monthly customer churn | 5% | of paying users per month | Team-approved hypothetical estimate; unverified |
| Monthly contribution margin | MXN 24.00 | per paying user per month | `29.00 - 5.00`, based on hypothetical values above |
| Simplified LTV (undiscounted) | MXN 480.00 | per paying user over assumed lifetime | `24.00 / 0.05`; simplified constant-churn model, before fixed costs and taxes |
| CAC payback | 3.33 months | per paying user | `80.00 / 24.00`; simplified payback, subject to assumptions |

**Scope boundary:** these financial-model calculations can be documented and tested separately for the FIN506 valuation assignment; they do not create a subscription checkout, second user journey, real revenue, or any real regulatory product. Every formula in code must state what it computes and why.

## Out of scope this semester

- Real bank accounts, deposits, withdrawals, credit, card issuance, payment rails, SPEI/CoDi, third-party account linking or any real money movement.
- Real KYC/INE, identity verification, real users, personal information, bank credentials, or external financial APIs.
- Interest-bearing savings, investing, spending analysis, budgets, lending, AI financial advice/chatbot, notifications, multiple users, login or multi-device sync.
- Subscription checkout or collection of the hypothetical subscription price; a second core flow.
- Native iOS or Android apps and a production backend. This is a browser-based demo.
- Any legal assertion that this simulation constitutes a regulated bank or that a specific financial license is or is not required. Any future regulatory statement must be marked `TODO-verify` until verified.

## UI, error states and definition of done

- **Mobile-first:** design at 390 px width with large touch targets; one primary button per screen and a back/cancel path.
- **Trust:** show contribution amount and resulting balance with `MXN` and two decimal digits before confirmation. State that no money moves and that the operation is simulated.
- **States:** empty goal/history, confirmation loading/processing, error validation or local-storage unavailable, and success with fabricated folio. Never show a fake success after an actual failed write.
- **Done when:** the entire five-step flow works with invented data; monetary unit tests pass; a stranger completes it in under two minutes; source files are explainable by both partners; a separate read-only reviewer approves or approves with fixes resolved; README provides verified commands; the work is committed and the team writes a BITACORA entry.

## Governance and stop conditions

- Follow unchanged `PROJECT_METHOD.md` and the eight golden rules in `AGENTS.md`.
- Always plan before code; one user-visible step per task. A separate agent reviews the diff; the builder never approves its own work.
- The coding agent **must not edit** `SPEC.md`, `AGENTS.md`, `DECISIONS.md`, or `BITACORA.md`. It may propose text, but the owners update the records.
- Stop and ask both partners before changing dependencies, adding top-level folders, changing the data model, modifying monetary logic, or making unverified regulatory claims.
- Course materials state scope froze after **Avance 2 (2026-10-22)**; because team approval occurred on **2026-11-05**, the team must confirm with the professor whether this late adoption is permitted (**TODO-verify instructor approval**). Do not treat team approval as course approval.

## Changelog

| Date | Change | Why | Approved by |
|---|---|---|---|
| 2026-11-05 | Approved the savings-goal demo, five-step flow, browser-only stack, fake data model, and hypothetical financial assumptions | Keep one demonstrable flow without real regulated banking infrastructure; team confirmation received in conversation | **Bruno Aguirre and Sofia Torres** |
