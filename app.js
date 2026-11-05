import seed from "./seed.json" with { type: "json" };
import { formatMxn, parseMxnToCents, sumCents } from "./money.mjs";

const STORAGE_KEY = "brujula-demo-v1";

const app = document.querySelector("#app");
const resetButton = document.querySelector("#reset-demo");

let state = structuredClone(seed);

function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) state = JSON.parse(saved);
    return true;
  } catch {
    renderStorageError();
    return false;
  }
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    return true;
  } catch {
    renderStorageError();
    return false;
  }
}

function getBalanceCents() {
  return sumCents(state.contributions.map((contribution) => contribution.amountCents)) ?? 0;
}

function getProgressPercent(balanceCents) {
  // Computes display progress from the derived balance and target; the bar is capped at 100% while the balance remains exact.
  // The goal progress is a visual ratio, not a monetary value, so no currency is rounded or changed here.
  return Math.min((balanceCents * 100) / state.goal.targetCents, 100);
}

function createFolio() {
  return `SIM-${Date.now().toString(36).toUpperCase()}-${Math.floor(Math.random() * 1000).toString().padStart(3, "0")}`;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character]);
}

function renderWelcome() {
  app.innerHTML = `
    <section class="screen" aria-labelledby="welcome-title">
      <p class="eyebrow">Give your money direction</p>
      <h1 id="welcome-title">Save for what’s next.</h1>
      <p class="lede">A simple way to see how small contributions can bring you closer to a goal.</p>
      <div class="name-chip"><span class="avatar" aria-hidden="true">A</span><span>Alex’s demo · student</span></div>
      <br />
      <button id="start-demo" class="primary" type="button">Enter demo</button>
    </section>`;
  document.querySelector("#start-demo").addEventListener("click", renderGoalForm);
}

function renderGoalForm() {
  app.innerHTML = `
    <section class="screen" aria-labelledby="goal-title">
      <p class="eyebrow">Step 1 of 5 · Your first goal</p>
      <h2 id="goal-title">What are you saving for?</h2>
      <p class="lede">Name it and set a target. You can change it in another demo session.</p>
      <form id="goal-form" class="card" novalidate>
        <div class="field">
          <label for="goal-name">Goal name</label>
          <input id="goal-name" name="goalName" type="text" maxlength="60" placeholder="e.g. Summer trip" autocomplete="off" required />
        </div>
        <div class="field">
          <label for="target-amount">Target</label>
          <p class="hint">Enter a positive amount in Mexican pesos.</p>
          <div class="input-wrap"><span class="currency">MXN</span><input id="target-amount" name="targetAmount" inputmode="decimal" placeholder="0.00" autocomplete="off" required /></div>
        </div>
        <p id="goal-error" class="error" role="alert"></p>
        <div class="form-actions">
          <button id="cancel-goal" class="secondary" type="button">Cancel</button>
          <button class="primary" type="submit">Save goal</button>
        </div>
      </form>
    </section>`;

  document.querySelector("#cancel-goal").addEventListener("click", renderWelcome);
  document.querySelector("#goal-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const name = document.querySelector("#goal-name").value.trim();
    const targetCents = parseMxnToCents(document.querySelector("#target-amount").value);
    const error = document.querySelector("#goal-error");

    if (!name) {
      error.textContent = "Enter a name for your goal.";
      document.querySelector("#goal-name").focus();
      return;
    }
    if (targetCents === null) {
      error.textContent = "Enter a target greater than MXN 0.00, with no more than two decimals.";
      document.querySelector("#target-amount").focus();
      return;
    }

    state.goal = { id: `goal-${Date.now()}`, userId: state.user.id, name, targetCents, createdAt: new Date().toISOString() };
    state.contributions = [];
    if (saveState()) renderGoalSaved();
  });
}

function renderGoalSaved() {
  const balanceCents = getBalanceCents();
  const remainingCents = Math.max(state.goal.targetCents - balanceCents, 0);
  const progressPercent = getProgressPercent(balanceCents);
  const history = [...state.contributions].reverse();

  app.innerHTML = `
    <section class="screen" aria-labelledby="saved-title">
      <p class="eyebrow">Your savings goal</p>
      <h2 id="saved-title">${escapeHtml(state.goal.name)}</h2>
      <div class="card summary-card">
        <div class="balance-line"><span>Simulated balance</span><strong>${formatMxn(balanceCents)}</strong></div>
        <div class="progress-track" aria-label="${progressPercent.toFixed(1)} percent of goal complete"><span style="width: ${progressPercent}%"></span></div>
        <div class="progress-meta"><span>${progressPercent.toFixed(1)}% complete</span><span>${formatMxn(remainingCents)} left</span></div>
        <p class="hint">Target: ${formatMxn(state.goal.targetCents)} · No fees · No interest</p>
      </div>
      <div class="section-heading"><h3>Contribution history</h3><span>${history.length} ${history.length === 1 ? "entry" : "entries"}</span></div>
      ${history.length ? `<div class="history-list">${history.map(renderContribution).join("")}</div>` : `<div class="card empty-state"><p>No contributions yet.</p><p class="hint">Add a simulated contribution to see your progress.</p></div>`}
      <button id="add-contribution" class="primary" type="button">Add simulated contribution</button>
    </section>`;

  document.querySelector("#add-contribution").addEventListener("click", renderContributionForm);
}

function renderContribution(contribution) {
  return `<div class="history-row"><div><strong>${formatMxn(contribution.amountCents)}</strong><span>${new Date(contribution.createdAt).toLocaleString("en-MX", { dateStyle: "medium", timeStyle: "short" })}</span></div><span class="status-pill">Simulated</span></div>`;
}

function renderContributionForm() {
  app.innerHTML = `
    <section class="screen" aria-labelledby="contribution-title">
      <p class="eyebrow">Step 2 of 5 · Add to your goal</p>
      <h2 id="contribution-title">Make a little progress.</h2>
      <p class="lede">Enter a simulated contribution. You will review the new balance before confirming.</p>
      <form id="contribution-form" class="card" novalidate>
        <div class="field">
          <label for="contribution-amount">Contribution amount</label>
          <p class="hint">This is a simulation. No money moves.</p>
          <div class="input-wrap"><span class="currency">MXN</span><input id="contribution-amount" name="contributionAmount" inputmode="decimal" placeholder="0.00" autocomplete="off" required /></div>
        </div>
        <p id="contribution-error" class="error" role="alert"></p>
        <div class="form-actions">
          <button id="cancel-contribution" class="secondary" type="button">Cancel</button>
          <button class="primary" type="submit">Review contribution</button>
        </div>
      </form>
    </section>`;

  document.querySelector("#cancel-contribution").addEventListener("click", renderGoalSaved);
  document.querySelector("#contribution-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const amountCents = parseMxnToCents(document.querySelector("#contribution-amount").value);
    const error = document.querySelector("#contribution-error");
    const projectedBalance = amountCents === null ? null : getBalanceCents() + amountCents;

    if (amountCents === null || !Number.isSafeInteger(projectedBalance)) {
      error.textContent = "Enter an amount greater than MXN 0.00, with no more than two decimals.";
      document.querySelector("#contribution-amount").focus();
      return;
    }
    renderContributionReview(amountCents, projectedBalance);
  });
}

function renderContributionReview(amountCents, projectedBalance) {
  app.innerHTML = `
    <section class="screen" aria-labelledby="review-title">
      <p class="eyebrow">Step 3 of 5 · Review</p>
      <h2 id="review-title">Ready to add this?</h2>
      <div class="card review-card">
        <div class="review-row"><span>Contribution</span><strong>${formatMxn(amountCents)}</strong></div>
        <div class="review-row"><span>Current balance</span><strong>${formatMxn(getBalanceCents())}</strong></div>
        <div class="review-row total"><span>New simulated balance</span><strong>${formatMxn(projectedBalance)}</strong></div>
        <div class="review-row"><span>Fees</span><strong>MXN 0.00</strong></div>
        <p class="hint">This is a fictional local simulation. No transfer, deposit, or bank account is involved.</p>
      </div>
      <div class="form-actions">
        <button id="cancel-review" class="secondary" type="button">Cancel</button>
        <button id="confirm-contribution" class="primary" type="button">Confirm simulation</button>
      </div>
      <p id="review-error" class="error" role="alert"></p>
    </section>`;

  let confirmed = false;
  document.querySelector("#cancel-review").addEventListener("click", renderContributionForm);
  document.querySelector("#confirm-contribution").addEventListener("click", (event) => {
    if (confirmed) return;
    confirmed = true;
    event.currentTarget.disabled = true;
    event.currentTarget.textContent = "Processing…";

    const contribution = { id: createFolio(), goalId: state.goal.id, amountCents, createdAt: new Date().toISOString(), status: "simulated" };
    if (!state.contributions.some((item) => item.id === contribution.id)) {
      state.contributions.push(contribution);
      if (saveState()) renderContributionSuccess(contribution);
    }
  });
}

function renderContributionSuccess(contribution) {
  const balanceCents = getBalanceCents();
  const progressPercent = getProgressPercent(balanceCents);
  app.innerHTML = `
    <section class="screen" aria-labelledby="success-title">
      <p class="eyebrow">Step 4 of 5 · Confirmed</p>
      <h2 id="success-title">Contribution simulated.</h2>
      <p class="lede">Your fictional contribution of <strong>${formatMxn(contribution.amountCents)}</strong> was added once.</p>
      <div class="card success-card">
        <span class="success-mark" aria-hidden="true">✓</span>
        <p class="hint">Simulated folio</p>
        <strong>${escapeHtml(contribution.id)}</strong>
        <div class="balance-line"><span>New balance</span><strong>${formatMxn(balanceCents)}</strong></div>
        <div class="progress-track" aria-label="${progressPercent.toFixed(1)} percent of goal complete"><span style="width: ${progressPercent}%"></span></div>
        <p class="hint">${progressPercent.toFixed(1)}% of your goal · no money moved</p>
      </div>
      <button id="view-goal" class="primary" type="button">View goal and history</button>
    </section>`;
  document.querySelector("#view-goal").addEventListener("click", renderGoalSaved);
}

function renderStorageError() {
  app.innerHTML = `<section class="screen"><div class="card"><p class="error">Local storage is unavailable. Enable it to continue with the demo.</p></div></section>`;
}

resetButton.addEventListener("click", () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    state = structuredClone(seed);
    renderWelcome();
  } catch {
    renderStorageError();
  }
});

if (loadState()) {
  if (state.goal) renderGoalSaved();
  else renderWelcome();
}

export { parseMxnToCents, formatMxn };
