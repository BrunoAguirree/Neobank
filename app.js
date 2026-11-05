import seed from "./seed.json" with { type: "json" };

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

function parseMxnToCents(value) {
  const normalized = String(value).trim();
  if (!/^\d+(?:\.\d{1,2})?$/.test(normalized)) return null;

  const [whole, decimal = ""] = normalized.split(".");
  const cents = Number(whole) * 100 + Number(decimal.padEnd(2, "0"));
  // Converts a positive MXN amount to integer cents so currency never uses binary floating-point arithmetic.
  // The goal amount is stored this way because the demo accepts no fractional cents or rounding.
  if (!Number.isSafeInteger(cents) || cents <= 0) return null;
  return cents;
}

function formatMxn(cents) {
  const wholePesos = Math.floor(cents / 100);
  const fraction = String(cents % 100).padStart(2, "0");
  return `MXN ${new Intl.NumberFormat("es-MX").format(wholePesos)}.${fraction}`;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character]);
}

function renderWelcome() {
  app.innerHTML = `
    <section class="screen" aria-labelledby="welcome-title">
      <p class="eyebrow">Tu dinero, con dirección</p>
      <h1 id="welcome-title">Ahorra para lo que sigue.</h1>
      <p class="lede">Una forma sencilla de visualizar cómo tus pequeñas aportaciones pueden acercarte a una meta.</p>
      <div class="name-chip"><span class="avatar" aria-hidden="true">A</span><span>Demo de Alex · estudiante</span></div>
      <br />
      <button id="start-demo" class="primary" type="button">Entrar al demo</button>
    </section>`;
  document.querySelector("#start-demo").addEventListener("click", renderGoalForm);
}

function renderGoalForm() {
  app.innerHTML = `
    <section class="screen" aria-labelledby="goal-title">
      <p class="eyebrow">Paso 1 de 5 · Tu primera meta</p>
      <h2 id="goal-title">¿Para qué quieres ahorrar?</h2>
      <p class="lede">Ponle un nombre y define un objetivo. Puedes cambiarlo en otra sesión del demo.</p>
      <form id="goal-form" class="card" novalidate>
        <div class="field">
          <label for="goal-name">Nombre de la meta</label>
          <input id="goal-name" name="goalName" type="text" maxlength="60" placeholder="Ej. Viaje de verano" autocomplete="off" required />
        </div>
        <div class="field">
          <label for="target-amount">Objetivo</label>
          <p class="hint">Ingresa una cantidad positiva en pesos mexicanos.</p>
          <div class="input-wrap"><span class="currency">MXN</span><input id="target-amount" name="targetAmount" inputmode="decimal" placeholder="0.00" autocomplete="off" required /></div>
        </div>
        <p id="goal-error" class="error" role="alert"></p>
        <div class="form-actions">
          <button id="cancel-goal" class="secondary" type="button">Cancelar</button>
          <button class="primary" type="submit">Guardar meta</button>
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
      error.textContent = "Escribe un nombre para tu meta.";
      document.querySelector("#goal-name").focus();
      return;
    }
    if (targetCents === null) {
      error.textContent = "Ingresa un objetivo mayor a MXN 0.00, con máximo dos decimales.";
      document.querySelector("#target-amount").focus();
      return;
    }

    state.goal = { id: `goal-${Date.now()}`, userId: state.user.id, name, targetCents, createdAt: new Date().toISOString() };
    state.contributions = [];
    if (saveState()) renderGoalSaved();
  });
}

function renderGoalSaved() {
  app.innerHTML = `
    <section class="screen" aria-labelledby="saved-title">
      <p class="eyebrow">Meta guardada</p>
      <h2 id="saved-title">Tu meta ya tiene rumbo.</h2>
      <p class="lede"><strong>${escapeHtml(state.goal.name)}</strong> · objetivo de <strong>${formatMxn(state.goal.targetCents)}</strong>.</p>
      <div class="card"><p class="hint">Este es el siguiente slice del demo: aquí añadiremos la aportación simulada y su historial.</p></div>
    </section>`;
}

function renderStorageError() {
  app.innerHTML = `<section class="screen"><div class="card"><p class="error">No fue posible acceder al almacenamiento local. Activa localStorage para continuar con el demo.</p></div></section>`;
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
