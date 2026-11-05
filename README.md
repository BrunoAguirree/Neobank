# Neobank savings-goal demo — FIN506

**Owners:** Bruno Aguirre and Sofia Torres · **Scope approved by team:** 2026-11-05

A mobile-first **educational simulation**, not a real bank. One fictional student, Alex, creates a savings goal, confirms fake contributions, and sees a simulated MXN balance and progress. No real money, identity checks, third-party APIs or credentials.

## Status

The **six-file harness is prepared**; no working application has been built or tested in this package. The course scope freeze (2026-10-22) precedes team approval: **TODO-verify** that the instructor accepts late adoption. Do not describe the app as already functional.

## Requirements

- A modern desktop or mobile browser with JavaScript and localStorage enabled.
- Node.js **20+** only for built-in `node:test` tests when implemented.
- VS Code optional for editing. **No third-party packages** and no npm install required under approved SPEC.

## How to run (once the source exists)

1. Open the repository folder in VS Code.
2. Open the project's `index.html` using a browser. The app must use relative ES-module imports. **Note:** some browsers restrict `file://` module loading; the build will need a verified local static-server command if so. No server implementation or command has been tested yet.
3. Follow the single demo flow: enter demo → create goal → enter fake contribution → confirm → view balance and history.
4. Verify that every screen identifies the simulation as `Demo mode · No real money or bank account`.

**Run instructions are provisional** until the app exists and has been tested on a clean machine. The team must replace them with verified commands and expected results before the Demo Day.

## Tests (after they are implemented)

Node's built-in test runner is the only approved testing facility:

```bash
node --test
```

This is the intended command, **not a claim that tests already exist or pass**. Tests should cover parsing MXN to integer cents, summing contributions, invalid amounts, double confirmation and goal completion.

## Required root files

- `PROJECT_METHOD.md` — exact official FIN506 handout, unchanged.
- `SPEC.md` — team-approved product definition, stack, business assumptions and single flow.
- `AGENTS.md` — original eight golden rules plus product rules.
- `BITACORA.md` — per-session entries **written by the team**, not the coding agent.
- `DECISIONS.md` — dated human-approved decisions and reasons.
- `README.md` — the repository's setup and run guide.

## AI workflow and stop gates

At the start of every coding session, read `PROJECT_METHOD.md`, `SPEC.md`, `AGENTS.md` and the latest `BITACORA.md` entry. Follow **checkpoint → orient → plan → build → verify (independent reviewer) → decide → log**. Any code change needs an approved plan and named files. Ask before new packages, top-level folders, data model changes, financial-logic changes, deletion or regulatory statements. Never access secrets or use real user information.

Use `.github/chatmodes/reviewer.chatmode.md` for Copilot or `.claude/agents/reviewer.md` for Claude Code. The reviewer is read-only and must not be the builder. Keep `.env` excluded in `.gitignore`.

## Definition of done

- [ ] One fictional-user flow works end to end in under two minutes.
- [ ] MXN money shown with two decimals; monetary tests pass.
- [ ] Empty, loading, error and success states work; fake data is clearly identified.
- [ ] Actual commands in this README have been tested on a clean environment.
- [ ] A separate reviewer passed the diff; both partners can explain the code.
- [ ] Small commits exist; the team authored real BITACORA entries.
- [ ] Scope timing has been discussed with instructor (`TODO-verify` pending).
