///grid area distribution
let keypads = document.querySelectorAll(".keypads");

let j = 97;
for (let i = 0; i < keypads.length; i++) {
  let s = String.fromCharCode(j);
  keypads[i].style.gridArea = s;
  j++;
}

///theme changing
const btn = document.querySelector(".buttons");
const body = document.querySelector("body");
const btns = btn.children;
themes = ["red_theme", "orange_theme", "blue_theme"];
let active = 0;

for (let i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", () => {
    body.classList.remove(themes[active]);
    btns[active].classList.remove("active");
    active = i;
    body.classList.add(themes[active]);
    btns[active].classList.add("active");
  });
}

const screen = document.querySelector(".digit");

//an object for keeping track of calculator expressions

const calculator = {
  DisplayVal: "0",
  FirstVal: null,
  WaitingForSecond: false,
  operator: null,
};

///input digit

function inputDigit(digit) {
  const { DisplayVal, WaitingForSecond } = calculator;

  if (WaitingForSecond === true) {
    calculator.DisplayVal = digit;
    calculator.WaitingForSecond = false;
  } else {
    calculator.DisplayVal = DisplayVal === "0" ? digit : DisplayVal + digit;
  }
}

//updating screen to default display value

function updateScreen() {
  screen.textContent = calculator.DisplayVal;
}

updateScreen();

//handle keypressing

for (let i = 0; i < keypads.length; i++) {
  keypads[i].addEventListener("click", () => {
    let digit = keypads[i].textContent;
    if (digit == "del") DeleteChar();
    else if (digit == "reset") resetCalc();
    else if (digit == "+") handleOperator("+");
    else if (digit == "-") handleOperator("-");
    else if (digit == "×") handleOperator("*");
    else if (digit == "/") handleOperator("/");
    else if (digit == "=") handleOperator("=");
    else inputDigit(digit);

    updateScreen();
  });
}

//handling operator

function handleOperator(nextOperator) {
  const { FirstVal, DisplayVal, operator } = calculator;
  const inputVal = parseFloat(DisplayVal);

  //if consecutive operator pressed . previous operator will be update by next operator

  if (operator && calculator.WaitingForSecond) {
    calculator.operator = nextOperator;
    return;
  }

  if (FirstVal === null && !isNaN(inputVal)) {
    calculator.FirstVal = inputVal;
  } else if (operator) {
    const result = calculate(FirstVal, inputVal, operator);
    calculator.DisplayVal = `${parseFloat(result.toFixed(7))}`;
    calculator.FirstVal = result;
  }
  calculator.WaitingForSecond = true;
  calculator.operator = nextOperator;
}

///calculate results

function calculate(firstNum, secondNum, operator) {
  console.log(typeof firstNum);
  if (operator === "+") return firstNum + secondNum;
  else if (operator === "-") return firstNum - secondNum;
  else if (operator === "*") return firstNum * secondNum;
  else if (operator === "/") return firstNum / secondNum;

  return secondNum; /// this is for equal button
}

/// reset calculator
function resetCalc() {
  calculator.DisplayVal = "0";
  calculator.FirstVal = null;
  calculator.WaitingForSecond = false;
  calculator.operator = null;
}

///del button functionality

function DeleteChar() {
  const { DisplayVal, WaitingForSecond } = calculator;
  console.log(WaitingForSecond);
  if (DisplayVal === "0" || WaitingForSecond) return;
  else {
    calculator.DisplayVal = DisplayVal.slice(0, DisplayVal.length - 1);
  }
}
