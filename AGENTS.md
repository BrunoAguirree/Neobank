# Agent instructions: Neobank savings-goal demo (FIN506)

A browser-based educational neobank concept for one fictional university student (Alex) to create a savings goal, simulate contributions and see progress. Owners: Bruno Aguirre and Sofia Torres.

## Golden rules

1. `SPEC.md` is the source of truth. If a task conflicts with it, stop and say so
   instead of improvising.
2. Comment every financial formula: what it computes, and why this formula (CAC, LTV,
   contribution margin, interest, fees).
3. Never invent regulatory claims (Ley Fintech, CNBV, Banxico, Condusef, LFPDPPP).
   If a regulatory statement is needed and unverified, write `TODO-verify` next to it.
4. Ask before: adding any dependency, creating a new top-level folder, or changing the
   data model. These need both partners present.
5. Never read or write `.env` or any credentials file. This project contains no real
   secrets and no real personal data: all data is invented.
6. Prefer the simplest implementation that completes the core flow end to end. No
   features outside `SPEC.md` scope without flagging them first.
7. When a request is ambiguous, ask one clarifying question instead of guessing.
8. After significant changes, state plainly what you changed and where, so it can be
   logged in `BITACORA.md`.

## Project facts

- Vertical: **Digital banking / neobank concept (educational simulation, not a bank).**
- Core flow (the ONE flow that must work): **enter demo → create savings goal → enter simulated MXN contribution → confirm/cancel → see balance, progress, and history**, as specified in SPEC.md.
- Stack: **HTML5, CSS3, JavaScript ES modules, browser localStorage; Node.js 20+ built-in node:test and node:assert/strict for tests.** Third-party packages: **none**.
- Out of scope this semester: actual banking, real money, accounts, transfers, cards, KYC, login, multiuser support, interest, chatbots, subscriptions checkout, mobile-native apps; see complete list in SPEC.md.
- Fake data source: **repository-root seed.json**, with fictional demo user Alex, initially without a goal or contributions; subsequent fictitious records made locally and stored in localStorage. Label every screen **Demo mode · No real money or bank account**.
- Money amounts: **integer MXN cents**, zero fees and zero interest in the demo. The hypothetical subscription, CAC, churn and LTV assumptions in SPEC.md are **not charged in the MVP**.
- Course gate: **TODO-verify instructor approval** of scope adoption after Avance 2 (2026-10-22); don't claim late scope changes have been cleared.

## Additional course-based instructions

- Read SPEC.md before planning or changing any code. If a requirement is unclear or conflicts with the approved SPEC, stop and ask; do not fill gaps from illustrative slide examples.
- Implement exactly one core flow; 4–6 steps, one small working step per iteration. Do not expand to a second user type or additional flow.
- Build the core-flow screens, financial calculations, and validation/error handling. Simulate KYC, payments, and credit-score data only if those belong to the approved core flow; label them "Demo mode".
- Display financial values with currency and cents; calculate with integer cents or decimal arithmetic, not floating-point currency values. Document rounding in SPEC.md before coding and add unit tests.
- UI must show the amount that matters, next action, fees before confirming where relevant, one primary action, and back/cancel/error paths. Design mobile-first at 390 px.
- Use the loop: Plan → Build → Run → Review → Commit → Log. Always plan first, implement one step, test, obtain independent read-only review, and inspect the diff.
- Never silently install packages or modify the data model, SPEC.md, or the human-authored BITACORA.md. Propose edits for approval; owners make the final entries.
- Keep .env and other secrets out of version control. Do not use real customer or payment data.
- Reviewer findings must report verdict, up to five file/line findings, and two likely defense questions. The reviewer does not fix or approve its own code.
- If a regulatory claim is required, mark it `TODO-verify` until independently verified by the owners.

## Agent entry points

- GitHub Copilot: `.github/copilot-instructions.md` points to this file.
- Claude Code: `CLAUDE.md` imports `@AGENTS.md`.
- Reviewer definitions are read-only and live under `.github/chatmodes/` and `.claude/agents/`.
