class Calculator {
  constructor(previousOperandTextELement, currentOperandTextELement) {
    this.previousOperandTextELement = previousOperandTextELement
    this.currentOperandTextELement = currentOperandTextELement
    this.clear()
  }

  clear() {
    this.previousOperand = ""
    this.currentOperand = ""
    this.operation = undefined
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  appendNumber(number) {
    /* this.currentOperand = this.currentOperand + number */ /* . will add 1+1 as 2 instead of 11 */

    if (number === "." && this.currentOperand.includes(".")) return
    this.currentOperand = this.currentOperand.toString() + number.toString()
  }

  chooseOperation(operation) {
    if ((this.currentOperand === "")) return
    if (this.previousOperand !== "") {
      this.compute()
    }

    this.operation = operation
    this.previousOperand = this.currentOperand
    this.previousOperand += this.operation
    this.currentOperand = ""
  }

  compute()
  {
    let computation

    const prev = parseFloat(this.previousOperand)
    const current = parseFloat(this.currentOperand)

   if(isNaN(prev) || isNaN(current)) return

    switch(this.operation)
    {
      case '+': computation = prev + current
                break
      case '-': computation = prev - current
                break
      case '*': computation = prev * current
                break
      case '÷': computation = prev / current
                break

      default : return
    }

    this.currentOperand = computation
    this.previousOperand = ''
    this.operation = undefined
  }

  updateDisplay() {
    this.currentOperandTextELement.innerText = this.currentOperand
    this.previousOperandTextELement.innerText = this.previousOperand;
  }
}

const numberButton = document.querySelectorAll("[data-number]")
const operationButton = document.querySelectorAll("[data-operation]")
const allClearButton = document.querySelector("[data-all-clear]")
const equalsButton = document.querySelector("[data-equals]")
const deleteButton = document.querySelector("[data-delete]")
const previousOperandTextELement = document.querySelector(
  "[data-previous-operand]"
)
const currentOperandTextELement = document.querySelector(
  "[data-current-operand]"
)

const calculator = new Calculator(
  previousOperandTextELement,
  currentOperandTextELement
) //object declaration dynamically

numberButton.forEach((button) => {
  button.addEventListener("click", (event) => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
  })
})

operationButton.forEach((button) => {
  button.addEventListener("click", (event) => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
  })
})

equalsButton.addEventListener("click", (event)=>{

  calculator.compute()
  calculator.updateDisplay()
  
})

allClearButton.addEventListener("click",(event)=>
{
  calculator.clear()
  calculator.updateDisplay()
})

deleteButton.addEventListener("click",(event)=>
{
  calculator.delete()
  calculator.updateDisplay()
})
