// DOM Elements
const prevDisplay = document.getElementById("previous");
const currDisplay = document.getElementById("current");
const buttons = document.querySelectorAll(".btn");
const clickSound = document.getElementById("click-sound");

let current = "";
let previous = "";
let operation = null;
let isOn = false;

// Update Display
function updateDisplay() {
  if (!isOn) {
    currDisplay.textContent = "";
    prevDisplay.textContent = "";
    return;
  }
  currDisplay.textContent = current || "0";
  prevDisplay.textContent = previous + (operation || "");
}

// Clear
function clearAll() {
  current = "";
  previous = "";
  operation = null;
  updateDisplay();
}

// Append Number
function appendNumber(num) {
  if (!isOn) return;
  if (num === "." && current.includes(".")) return;
  current += num;
  updateDisplay();
}

// Choose Operation
function chooseOperation(op) {
  if (!isOn || current === "") return;
  if (previous !== "") calculate();
  operation = op;
  previous = current;
  current = "";
  updateDisplay();
}

// Calculate
function calculate() {
  let result;
  const prev = parseFloat(previous);
  const curr = parseFloat(current);
  if (isNaN(prev) || isNaN(curr)) return;

  switch (operation) {
    case "+": result = prev + curr; break;
    case "-": result = prev - curr; break;
    case "×": result = prev * curr; break;
    case "%": result = (prev * curr) / 100; break;
    default: return;
  }

  current = result.toString();
  operation = null;
  previous = "";
  updateDisplay();
}

// Handle Button Click
buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    clickSound.currentTime = 0; // reset sound
    clickSound.play();

    const val = btn.textContent;

    if (btn.classList.contains("power")) {
      if (btn.classList.contains("on")) {
        isOn = true;
        clearAll();
      } else {
        isOn = false;
        updateDisplay();
      }
    }
    else if (!isOn) return;
    else if (btn.classList.contains("operator")) chooseOperation(val);
    else if (btn.classList.contains("equals")) calculate();
    else if (btn.classList.contains("function") && val === "CE") clearAll();
    else if (!isNaN(val) || val === "." || val === "00") appendNumber(val);
  });
});

// Init
updateDisplay();
