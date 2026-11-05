# FIN506 Project Method

**Read this file first.** It is written for two readers at once: the student pair, and the
AI agent that coordinates their project. Give it to your agent at the start of every
session ("read PROJECT_METHOD.md and SPEC.md, then propose a plan"). It defines how work
is structured, who decides what, and what "done" means.

Course: FIN506 Financial Technology (Fintech) · Universidad Panamericana · Fall 2026
Deliverable: a working fintech application in one vertical, built by a pair, defended live.

---

## 1. The operating model

You are not "using AI to write code". You are running a small firm with three functions.
The functions are fixed; who performs them changes.

| Function | Who performs it | Decides | Never does |
|---|---|---|---|
| **Coordinator** | The pair, assisted by an agent in planning mode | What gets built next and why; scope; when to stop | Write production code without a plan |
| **Builder** | The agent, in agent mode | How to implement the approved task | Change SPEC.md, add dependencies, or invent scope |
| **Verifier** | A separate agent instance with read-only tools | Whether the work matches SPEC.md and is defensible | Edit files or run state-changing commands |

**The rule that makes this work: the builder never approves its own output.** A verifier
that shares the builder's context inherits the builder's blind spots, so run it as a
separate chat, mode, or subagent with a clean context.

Humans stay the coordinator. Delegating coordination to the agent is how twelve-week
projects become unexplainable at the live defense.

---

## 2. The artifact set

Six files live at the repo root. An agent that reads these six can rebuild the project's
context from scratch. Keep them short: if a file grows past two screens, it has stopped
being a contract and started being a diary.

```
your-project/
├─ PROJECT_METHOD.md   this file, unchanged
├─ SPEC.md             the source of truth: problem, user, core flow, data model, scope
├─ AGENTS.md           standing rules the agent loads on every request
├─ BITACORA.md         append-only log: what the AI did, what you decided (graded)
├─ DECISIONS.md        one line per irreversible choice, with the reason
├─ README.md           how to run it, for a stranger (the Demo Day judge)
├─ .github/chatmodes/  reviewer.chatmode.md  (Copilot) or .claude/agents/reviewer.md
└─ src/ ...            the application
```

**Contracts between the files**

- `SPEC.md` **defines scope.** Anything not in it is out of scope until the pair changes
  it deliberately and logs the change in its changelog.
- `AGENTS.md` **defines behavior.** Rules that apply to every prompt, so you never retype
  them: comment every financial formula, never invent regulatory claims, ask before
  adding a dependency, all data is invented.
- `BITACORA.md` **defines history.** Append-only. Never rewrite an entry; add a new one.
- `DECISIONS.md` **defines the record.** Why Flask and not Django; why 2% monthly churn;
  why this fee. These are the questions asked at the Demo Day Q&A.

---

## 3. The unit of work: a task an agent can finish

Agent output degrades with vague scope. A task is ready to delegate when all five of
these are true:

1. **One outcome.** "The deposit form saves a deposit and shows the new balance", not
   "improve the app".
2. **Named files.** Which files it may touch. If it needs a new file, that is a plan
   item, not a surprise.
3. **A visible check.** How you will know it worked, in one sentence: what you click,
   what you should see, or which test passes.
4. **Bounded size.** If it cannot plausibly be finished in one sitting, it is a plan,
   not a task. Split it.
5. **A rollback point.** A clean git commit exists before it starts.

**Decomposition heuristic.** Slice by *user-visible outcome*, never by technical layer.
Three tasks that each deliver a working slice ("sign up works", "deposit works",
"balance updates") beat three tasks that deliver "the database", "the backend", "the
frontend": the layered version has nothing demonstrable until all three are finished,
which is how pairs arrive at Demo Day with no live demo.

---

## 4. The session loop

Every working session, without exception. Fifteen minutes of discipline per session is
what buys a defensible project in December.

```
1. CHECKPOINT   git commit (clean tree). If the tree is not clean, resolve first.
2. ORIENT       Agent reads PROJECT_METHOD.md + SPEC.md + last BITACORA entry.
3. PLAN         "Propose a plan for <task>. Do not write code yet."
                You read it. You argue with it. You approve it or you fix it.
4. BUILD        Agent implements the approved plan, in agent mode.
                Approval cards appear only for risky actions (see section 6).
5. VERIFY       Run the reviewer on the diff. Read its report.
6. DECIDE       Fix, accept, or revert. Reverting is a normal outcome, not a failure.
7. LOG          One BITACORA entry: goal, what the AI did, what you decided, flags.
```

**Step 3 is the highest-value step in the whole method.** Errors caught in a plan cost a
sentence; the same error caught after the build costs a session. If you skip one step,
never skip this one.

**Step 6, on reverting:** `git reset --hard` back to the checkpoint is cheaper than
debugging a bad run for an hour. The commit at step 1 is what makes this painless.

---

## 5. Definition of done

A task is done when all five hold. Anything less is "in progress", regardless of what
the agent says.

- [ ] It runs, and the visible check from the task passes.
- [ ] Both partners can explain every changed line. **If you cannot explain it, it is
      not done, it is borrowed.**
- [ ] Every financial formula carries a comment: what it computes, and why this formula.
- [ ] The reviewer's verdict is APPROVE or APPROVE WITH FIXES, and the fixes are applied.
- [ ] It is committed, and there is a BITACORA entry.

---

## 6. Gates: where a human must decide

The agent runs freely inside the fence and stops at these lines. This is scoped autonomy:
few approvals, each one meaningful.

**Always stop and ask the pair:**

| Gate | Why |
|---|---|
| New dependency | Every package is code you did not read and must still defend |
| New top-level folder or a data model change | Structure is expensive to undo later |
| Anything touching money logic: interest, fees, LTV, CAC, valuation | Wrong finance is the failure this course actually grades |
| Any file outside the project folder | The folder is a scope, not a fence |
| Deleting files, force-pushing, resetting history | Irreversible |
| Any regulatory claim (Ley Fintech, CNBV, LFPDPPP, licensing) | Mark `TODO-verify`, never assert |

**Milestone gates (both partners, plus a full reviewer pass):** before Avance 1, before
Avance 2, before the final entrega. Tests green, bitacora current, README accurate.

---

## 7. Anti-sprawl rules

Twelve weeks of agent-assisted building goes wrong slowly, then all at once. The failure
is not a rogue command in week 2; it is an unexplainable codebase in week 10. These five
rules are the whole defense.

1. **SPEC.md wins.** If a request conflicts with it, the agent stops and says so.
2. **Closed dependency list.** Additions are a gate, and go in `DECISIONS.md`.
3. **One core flow until it works end to end.** No second feature before the first is
   demonstrable. Ambition goes in a `LATER.md` you are allowed to never open.
4. **Scope freeze after Avance 2.** From that date, only fixes, polish and the
   valuation work. Every pair that ignores this ships something broken.
5. **Weekly explain-one-file ritual.** Each partner opens a random file and explains it
   to the other. Whatever neither can explain becomes the next task: document it,
   simplify it, or delete it. This is the early-warning system for sprawl, and it is
   exactly what happens at the live defense.

---

## 8. Working with the model

- **Ask for a plan before code.** Every time. See section 4, step 3.
- **Give context, not adjectives.** "Users are Mexican students aged 18 to 24 with no
  credit history" produces different software than "make it user friendly".
- **One task per conversation.** When the topic changes, start a new chat. Long mixed
  contexts produce confident, wrong output.
- **Verify what matters.** Recompute at least one number per session by hand. Numbers
  are the deliverable in a finance course; the code is just how they are produced.
- **Match model to task.** Use your strongest available model for planning, financial
  logic and debugging; a cheap fast model is fine for boilerplate and for the reviewer,
  which is high volume. Everything in this course runs on the free student tiers.
- **When it is stuck, restate the problem.** Three failed fixes in a row means the
  problem is described wrong, not that the model is failing. Go back to the plan.

---

## 9. Mapping to the course calendar

| Milestone | Date | What the method produces |
|---|---|---|
| Vertical draft, stack setup | Aug 18 | Repo created, six artifact files in place, dial at position 1 |
| Prototype v0 | Sep 8 | Core flow specified in SPEC.md; first tasks planned and built |
| **Avance 1** (Eval 1, 30%) | Sep 10 | One-pager, prototype v0, bitacora with real entries |
| MVP v1 | Sep 24 | Core flow works end to end; reviewer passing |
| Internal demo, peer review | Oct 1 | A stranger can run it from README.md |
| Security checklist | Oct 15 | Gates documented; secrets and data rules verified |
| **Avance 2** (Eval 2, 30%) | Oct 22 | MVP + validation + go-to-market + security. **Scope freezes here** |
| Valuation and financial model | Oct 27 to Nov 5 | Unit economics from your own data model, three valuation methods |
| **Demo Day** (Eval 3, 40%) | Dec 1 and 3 | Live demo, defended line by line, bitacora as the audit trail |

---

## 10. Instructions for a coordinating agent

If you are an AI agent reading this file, follow this protocol:

1. Read `SPEC.md`, `AGENTS.md` and the most recent `BITACORA.md` entry before proposing
   anything. If `SPEC.md` is missing or its core flow is empty, say so and help the pair
   write it before any code.
2. When given a goal, produce a **plan first**: an ordered list of tasks, each meeting
   the five criteria in section 3, with the files it touches and its visible check. Do
   not write code until the pair approves the plan.
3. Flag every item that hits a gate in section 6, before starting, not after.
4. Implement one task at a time. After each, state plainly what changed and where, in
   the form the pair can paste into `BITACORA.md`.
5. Never edit `SPEC.md`, `AGENTS.md`, `DECISIONS.md` or `BITACORA.md` yourself. Propose
   the text; the pair writes it. Those files are the human record.
6. If a request conflicts with `SPEC.md`, stop and say which line it conflicts with.
7. If asked to verify your own work, refuse and say why: verification runs in a separate
   context with read-only tools.
8. Prefer the simplest implementation that satisfies the core flow. If you are about to
   add a dependency, an abstraction layer, or a second way of doing something that
   already exists in the codebase, stop and ask.

---

*This method is deliberately boring: plan, build, verify, log, gate. It is the same
control structure a bank applies to a payment run, applied to a pair of students and a
model that types faster than both of them.*
