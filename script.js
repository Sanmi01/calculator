class Calculator {
    constructor(previousText, currentText) {
        this.previousText = previousText;
        this.currentText = currentText;
        this.readyToReset = false;
        this.clear()
    }

    clear() {
        this.previousOperand = "";
        this.currentOperand = "";
        this.operation = undefined;
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    appendNumber(number) {
        if (number === "." && this.currentOperand.includes(".")) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
        if (this.readyToReset === true) {
            this.readyToReset = false;
            this.currentOperand = number;
        }
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = "";
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return;
        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case "-":
                computation = prev - current;
                break;
            case "*":
                computation = prev * current;
                break;
            case "÷":
                computation = prev / current;
                break;
            default:
                return
        }
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
        this.readyToReset = true;
    }

    updateDisplay() {
        this.currentText.innerText = this.currentOperand
        if (this.operation != null) {
            this.previousText.innerText = `${this.previousOperand} ${this.operation}`
            
        }
        
    }


}

const numberButtons = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const equalsButton = document.querySelector(".equals");
const deleteButton = document.querySelector(".delete");
const allClearButton = document.querySelector(".clear");
const previousText = document.querySelector(".previousOperand");
const currentText = document.querySelector(".currentOperand");

const calculator = new Calculator(previousText, currentText);

numberButtons.forEach(button => {
    button.addEventListener("click", () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operators.forEach(button => {
    button.addEventListener("click", () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener("click", button => {
    calculator.compute()
    calculator.updateDisplay()
    previousText.innerText = ""
})

allClearButton.addEventListener("click", button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener("click", button => {
    calculator.delete()
    calculator.updateDisplay()
})
