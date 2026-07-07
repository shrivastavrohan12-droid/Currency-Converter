const BASE_URL = "http://localhost:5000/api/rates";

const dropdowns = document.querySelectorAll(".dropdown select");
const form = document.querySelector("form");
const amountInput = document.querySelector("#amount");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");
const swapBtn = document.querySelector(".swap-btn");

const formatAmount = (amount) =>
  new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 4,
  }).format(amount);

/* ── Populate native selects (unchanged logic) ── */
for (const select of dropdowns) {
  for (const currCode of Object.keys(countryList)) {
    const newOption = document.createElement("option");
    newOption.textContent = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = true;
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = true;
    }
    select.append(newOption);
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
    syncPickerUI(evt.target);
  });
}

/* ── Custom dropdown UI ── */
const syncPickerUI = (select) => {
  const picker = select.closest(".currency-picker");
  const codeEl = picker.querySelector(".picker-code");
  const menu = picker.querySelector(".picker-menu");

  codeEl.textContent = select.value;

  for (const item of menu.querySelectorAll("li")) {
    item.classList.toggle("is-selected", item.dataset.value === select.value);
  }
};

const closeAllMenus = () => {
  for (const picker of document.querySelectorAll(".currency-picker")) {
    picker.classList.remove("is-open");
    picker.querySelector(".picker-menu").hidden = true;
    picker.querySelector(".picker-trigger").setAttribute("aria-expanded", "false");
  }
};

const buildPickerMenu = (select) => {
  const picker = select.closest(".currency-picker");
  const menu = picker.querySelector(".picker-menu");

  for (const option of select.options) {
    const item = document.createElement("li");
    item.textContent = option.value;
    item.dataset.value = option.value;
    item.setAttribute("role", "option");
    if (option.selected) item.classList.add("is-selected");

    item.addEventListener("click", () => {
      select.value = option.value;
      select.dispatchEvent(new Event("change", { bubbles: true }));
      closeAllMenus();
      updateExchangeRate();
    });

    menu.append(item);
  }

  const trigger = picker.querySelector(".picker-trigger");

  menu.addEventListener("click", (evt) => evt.stopPropagation());

  trigger.addEventListener("click", (evt) => {
    evt.stopPropagation();
    const isOpen = picker.classList.contains("is-open");
    closeAllMenus();
    if (!isOpen) {
      picker.classList.add("is-open");
      menu.hidden = false;
      trigger.setAttribute("aria-expanded", "true");
    }
  });
};

for (const select of dropdowns) {
  buildPickerMenu(select);
  syncPickerUI(select);
}

document.addEventListener("click", closeAllMenus);

/* ── Swap currencies ── */
swapBtn.addEventListener("click", () => {
  const temp = fromCurr.value;
  fromCurr.value = toCurr.value;
  toCurr.value = temp;

  updateFlag(fromCurr);
  updateFlag(toCurr);
  syncPickerUI(fromCurr);
  syncPickerUI(toCurr);

  swapBtn.classList.add("is-spinning");
  setTimeout(() => swapBtn.classList.remove("is-spinning"), 300);

  updateExchangeRate();
});

/* ── Exchange rate ── */
const updateExchangeRate = async () => {
  let amtVal = Number(amountInput.value);
  if (!Number.isFinite(amtVal) || amtVal < 1) {
    amtVal = 1;
    amountInput.value = "1";
  }

  const fromCode = fromCurr.value.toLowerCase();
  const toCode = toCurr.value.toLowerCase();
  const URL = `${BASE_URL}/${fromCode}.json`;

  try {
    form.classList.add("is-loading");
    msg.className = "msg result-panel is-loading";
    msg.textContent = "Fetching exchange rate...";
    const response = await fetch(URL);

    if (!response.ok) {
      let errMsg = "Unable to fetch the latest exchange rate.";
      try {
        const errData = await response.json();
        if (errData && errData.error) {
          errMsg = errData.error;
        }
      } catch (e) {
        if (response.status === 404) {
          errMsg = `Currency code "${fromCurr.value}" is not supported.`;
        } else {
          errMsg = `Server responded with status ${response.status}.`;
        }
      }
      throw new Error(errMsg);
    }

    const data = await response.json();
    const rate = Number(data[fromCode]?.[toCode]);

    if (!Number.isFinite(rate)) {
      throw new Error(`Exchange rate for ${fromCurr.value} to ${toCurr.value} is unavailable.`);
    }

    const finalAmount = amtVal * rate;
    msg.className = "msg result-panel is-success";
    msg.textContent = `${formatAmount(amtVal)} ${fromCurr.value} = ${formatAmount(
      finalAmount
    )} ${toCurr.value}`;
  } catch (error) {
    console.error(error);
    msg.className = "msg result-panel is-error";
    if (error.message.includes("Failed to fetch")) {
      msg.textContent = "Backend server is currently offline. Please start the backend and try again.";
    } else {
      msg.textContent = error.message || "Unable to fetch the latest exchange rate. Please try again.";
    }
  } finally {
    form.classList.remove("is-loading");
  }
};

const updateFlag = (element) => {
  const currCode = element.value;
  const countryCode = countryList[currCode];
  const newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  const img = element.parentElement.querySelector("img");
  img.src = newSrc;
  img.alt = `${countryCode} flag`;
};

form.addEventListener("submit", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});

window.addEventListener("load", () => {
  updateExchangeRate();
});
