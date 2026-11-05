# DECISIONS: Neobank savings-goal demo (FIN506)

Owners: **Bruno Aguirre and Sofia Torres**. Both approved the following project choices on **2026-11-05**. These are **team decisions**, not evidence of earlier professor approval or market-validated financial parameters.

| Date | Choice (one concrete option) | Reason | Approved by | Related SPEC section |
|---|---|---|---|---|
| 2026-11-05 | Digital banking / neobank **simulation** for a single fictional CDMX university student | A focused educational product that avoids real banking infrastructure | Bruno Aguirre and Sofia Torres | Problem / User / Vertical |
| 2026-11-05 | One five-step flow: demo → goal → contribution → confirm → progress/history | Can be completed end to end in less than two minutes and unit-tested | Bruno Aguirre and Sofia Torres | Core flow |
| 2026-11-05 | HTML5 + CSS3 + JavaScript ES modules; browser localStorage; Node.js 20+ built-in test runner; **zero third-party packages** | Simplest explainable stack; no install-dependent framework | Bruno Aguirre and Sofia Torres | Dependencies |
| 2026-11-05 | Fictional seed.json records; no real accounts, real money, personal data, or banking integrations | Safe, demonstrable demo; all money movements simulated | Bruno Aguirre and Sofia Torres | Fake data / Out of scope |
| 2026-11-05 | All monetary amounts stored as integer MXN cents; fee and interest = MXN 0.00 per simulated contribution | Avoid binary floating-point money errors and avoid real-money claims | Bruno Aguirre and Sofia Torres | Data model / Money logic |
| 2026-11-05 | Hypothetical monthly subscription MXN 29, variable cost MXN 5, churn 5%/month, CAC MXN 80 per acquired paying user | Simple FIN506 unit-economics scenario; **not market-sourced or charged by the app** | Bruno Aguirre and Sofia Torres | Unit economics |

**Course gate still open:** `TODO-verify` instructor authorization for adopting this scope after Avance 2 (2026-10-22). Team approval does not resolve this course requirement. Any regulatory claim must be separately marked `TODO-verify`.
