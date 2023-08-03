const calcContainer = document.getElementById("calcContainer")
const numDisplay = document.getElementById("nums")
const opBtn = document.querySelectorAll(".op")
const numBtn = document.querySelectorAll(".num")
const signBtn = document.querySelector(".sign")
const clearBtn = document.querySelector(".clear")
const equalBtn = document.querySelector(".equal")
const allBtn = document.querySelectorAll("button")
let currNum = null;
let prevNum = null;
let computation = null;
let prevOp = null;
let currOp = null;
let currDisplay = "0"

function numClick(value){
    if (value == "." && currDisplay.includes(".")) {
        return
    }
    if (currDisplay == "0" || currDisplay == "") {
        currDisplay = `${value}`
        numDisplay.textContent = currDisplay
    }
    else {
        currDisplay += `${value}`
        numDisplay.textContent = currDisplay
    }
    currNum = Number(currDisplay)
}

function opClick(operator) {
    currOp = operator;
    if (prevNum == null) {
        prevNum = currNum;
        prevOp = operator;
        newValue()
        return
    }
    console.log(prevNum)
    prevNum = operate(prevNum, currNum, prevOp)
    console.log(prevNum)
    newValue()
}

function operate(a, b, op) {
    switch (op) {
        case "+":
            computation = a + b;
            break
        case "-":
            computation = a - b;
            break
        case "/":
            if (b == 0) {
                alert("You cannot divide by zero! Try again!")
                clearAll()
            }
            computation = a / b;
            break
        case "*":
            computation = a * b;
            break;
        case "%":
            computation = a % b;
            break;
    }
    return computation;
}

function newValue() {
    currNum = 0;
    currDisplay = ""
    numDisplay.textContent = currDisplay;
}

function equal() {
    prevNum = operate(prevNum, currNum, currOp)
    numDisplay.textContent = prevNum
    allBtn.forEach(btn => {
        if (btn.textContent != "AC") {
            btn.disabled = true;
        }
    })
}

function clearAll() {
    currNum = null;
    prevNum = null;
    computation = null;
    prevOp = null;
    currDisplay = "0"
    numDisplay.textContent = currDisplay;
    allBtn.forEach(btn => {
        btn.disabled = false;
    })
}

function sign() {
    currNum = currNum * -1;
    currDisplay = currNum;
    numDisplay.textContent = currDisplay
}

clearBtn.addEventListener("click", clearAll)
equalBtn.addEventListener("click", equal)
signBtn.addEventListener("click", sign)
numBtn.forEach(btn => {
    btn.addEventListener("click", () => {
        numClick(btn.textContent)
    })
})

opBtn.forEach(btn => {
    btn.addEventListener("click", () => {
        opClick(btn.textContent)
    })
})



