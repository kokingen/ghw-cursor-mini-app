/**
 * Tip Calculator — calculation core and UI wiring.
 * calculateTip is exposed on window for tests.html.
 */

/**
 * @param {number} bill
 * @param {number} tipPercent
 * @param {number} people
 * @returns {{ tipAmount: number, total: number, tipPerPerson: number, totalPerPerson: number } | { error: string }}
 */
function calculateTip(bill, tipPercent, people) {
  if (
    typeof bill !== "number" ||
    typeof tipPercent !== "number" ||
    typeof people !== "number" ||
    Number.isNaN(bill) ||
    Number.isNaN(tipPercent) ||
    Number.isNaN(people)
  ) {
    return { error: "Please enter valid numbers." };
  }

  if (bill < 0) {
    return { error: "Bill amount cannot be negative." };
  }

  if (tipPercent < 0) {
    return { error: "Tip percentage cannot be negative." };
  }

  if (people < 1 || !Number.isInteger(people)) {
    return { error: "Number of people must be a whole number of at least 1." };
  }

  const tipAmount = bill * (tipPercent / 100);
  const total = bill + tipAmount;
  const tipPerPerson = tipAmount / people;
  const totalPerPerson = total / people;

  return { tipAmount, total, tipPerPerson, totalPerPerson };
}

function formatCurrency(value) {
  if (typeof value !== "number" || Number.isNaN(value)) {
    return "$0.00";
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

function parseNonNegativeNumber(raw) {
  if (raw === "" || raw === null || raw === undefined) {
    return null;
  }
  const value = Number(raw);
  if (Number.isNaN(value)) {
    return NaN;
  }
  return value;
}

function initTipCalculator() {
  const form = document.getElementById("tip-form");
  if (!form) {
    return;
  }

  const billInput = document.getElementById("bill");
  const peopleInput = document.getElementById("people");
  const customTipInput = document.getElementById("custom-tip");
  const tipPresets = document.getElementById("tip-presets");
  const errorEl = document.getElementById("form-error");
  const resetBtn = document.getElementById("reset-btn");

  const tipAmountEl = document.getElementById("tip-amount");
  const totalEl = document.getElementById("total");
  const tipPerPersonEl = document.getElementById("tip-per-person");
  const totalPerPersonEl = document.getElementById("total-per-person");

  let selectedTip = 15;

  function setError(message) {
    errorEl.textContent = message || "";
    errorEl.hidden = !message;
    form.setAttribute("aria-invalid", message ? "true" : "false");
  }

  function setResults(tipAmount, total, tipPerPerson, totalPerPerson) {
    tipAmountEl.textContent = formatCurrency(tipAmount);
    totalEl.textContent = formatCurrency(total);
    tipPerPersonEl.textContent = formatCurrency(tipPerPerson);
    totalPerPersonEl.textContent = formatCurrency(totalPerPerson);
  }

  function clearResults() {
    setResults(0, 0, 0, 0);
  }

  function syncPresetButtons() {
    const buttons = tipPresets.querySelectorAll("[data-tip]");
    buttons.forEach((btn) => {
      const value = Number(btn.getAttribute("data-tip"));
      const isActive =
        customTipInput.value === "" && value === selectedTip;
      btn.classList.toggle("is-active", isActive);
      btn.setAttribute("aria-pressed", isActive ? "true" : "false");
    });
  }

  function getTipPercent() {
    const customRaw = customTipInput.value.trim();
    if (customRaw !== "") {
      return parseNonNegativeNumber(customRaw);
    }
    return selectedTip;
  }

  function update() {
    const billRaw = billInput.value.trim();
    const peopleRaw = peopleInput.value.trim();

    if (billRaw === "" && peopleRaw === "" && customTipInput.value.trim() === "") {
      setError("");
      clearResults();
      return;
    }

    const bill = billRaw === "" ? 0 : parseNonNegativeNumber(billRaw);
    const people =
      peopleRaw === "" ? 1 : parseNonNegativeNumber(peopleRaw);
    const tipPercent = getTipPercent();

    if (Number.isNaN(bill) || Number.isNaN(people) || Number.isNaN(tipPercent)) {
      setError("Please enter valid numbers.");
      clearResults();
      return;
    }

    if (bill < 0) {
      setError("Bill amount cannot be negative.");
      clearResults();
      return;
    }

    if (tipPercent < 0) {
      setError("Tip percentage cannot be negative.");
      clearResults();
      return;
    }

    if (peopleRaw !== "" && (!Number.isInteger(people) || people < 1)) {
      setError("Number of people must be a whole number of at least 1.");
      clearResults();
      return;
    }

    const peopleCount = peopleRaw === "" ? 1 : people;
    const result = calculateTip(bill, tipPercent, peopleCount);

    if (result.error) {
      setError(result.error);
      clearResults();
      return;
    }

    setError("");
    setResults(
      result.tipAmount,
      result.total,
      result.tipPerPerson,
      result.totalPerPerson
    );
  }

  tipPresets.addEventListener("click", (event) => {
    const btn = event.target.closest("[data-tip]");
    if (!btn) {
      return;
    }
    selectedTip = Number(btn.getAttribute("data-tip"));
    customTipInput.value = "";
    syncPresetButtons();
    update();
  });

  customTipInput.addEventListener("input", () => {
    if (customTipInput.value.trim() !== "") {
      selectedTip = null;
    } else {
      selectedTip = 15;
    }
    syncPresetButtons();
    update();
  });

  billInput.addEventListener("input", update);
  peopleInput.addEventListener("input", update);

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    update();
  });

  resetBtn.addEventListener("click", () => {
    form.reset();
    selectedTip = 15;
    peopleInput.value = "1";
    syncPresetButtons();
    setError("");
    clearResults();
    billInput.focus();
  });

  syncPresetButtons();
  clearResults();
}

if (typeof window !== "undefined") {
  window.calculateTip = calculateTip;
  window.formatCurrency = formatCurrency;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initTipCalculator);
  } else {
    initTipCalculator();
  }
}
