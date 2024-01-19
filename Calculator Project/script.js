let container = document.querySelector(".container");
let historyBtn = document.querySelector(".historyBtn");

historyBtn.addEventListener("click", () =>{
    if(historyBtn.innerHTML === "Show History"){
        container.style.setProperty("--width", "700px");
        container.style.setProperty("--Animation", "width .5s ease-in-out");
        historyBtn.innerHTML = "Hide History";
    }else{
        container.style.setProperty("--width", "400px");
        container.style.setProperty("--Animation", "width .5s ease-in-out");
        historyBtn.innerHTML = "Show History"
    }
})

const buttons = document.querySelectorAll('button');
const display = document.querySelector('#current-result');
const history = document.querySelector('#result-history');

const operators = ['+', '-', '*', '/'];
let repeatedOperators = [];
const btnValues = [
  'C',      '(', ')',
  '* -1'  , '%', '/',
  '7', '8', '9', '*',
  '4', '5', '6', '-',
  '1', '2', '3', '+',
  '0'     , '.', '=', ""
]

buttons.forEach((button, i) => {
    button.value = btnValues[i];
    button.addEventListener('click', () => getCharacter(button.value));
});

operators.forEach(operator1 => {
  operators.forEach(operator2 => {
    repeatedOperators.push(`${operator1}${operator2}`)
  })
})

function getCharacter(digit) {
  if (display.value === '0' && !operators.find(op => op === digit) && digit !== 'C') {
    display.value = digit;
  } else if (digit === 'C') {
    display.value = '0';
    history.value = "";
    while(ul.hasChildNodes()){
        ul.removeChild(ul.firstChild)
    }
  } else {
    display.value += digit;
  }
  checkCharacter(display.value, digit);
}

function checkCharacter(stringValue, digit) {
  const displayArray = stringValue.split('');

  if (repeatedOperators.find(op => op === stringValue.slice(-2))) {
    displayArray.splice(-2, 1);
    display.value = displayArray.join('');
  }

  if (digit === '=') {
    displayArray.splice(-1, 1);

    solve(displayArray.join(''));
  }
}
let ul = document.getElementById("list");

function solve(expression) {
  let result = eval(expression);

  if (typeof result === 'number' && !Number.isInteger(result)) {
    result = result.toFixed(2);
  }

  display.value = result;
  history.value = `${expression} = ${result}`;
  localStorage.setItem(`${expression} =`, `${result}`)  
  
  let li = document.createElement("li")
  li.innerHTML = history.value
  ul.appendChild(li)
}