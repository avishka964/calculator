class Calculator {
  constructor(previousOperation, currentOperation) {
    this.currentOperation = currentOperation;
    this.previousOperation = previousOperation;
    this.clear();
  }

  clear() {
    this.currentValue = "";
    this.previousValue = "";
    this.operation = undefined;
  }

  delete() {
      this.currentValue = this.currentValue.toString().slice(0, -1)
  }

  appendNumbers(number) {
    if (number === '.' && this.currentValue.includes('.')) return
    this.currentValue = this.currentValue.toString() + number.toString();
  }

  selectOperation(operation) {
      if (this.currentValue === '') return
      if (this.previousValue !== ''){
          this.compute()
      } 
      this.operation = operation
      this.previousValue = this.currentValue
      this.currentValue = ''
  }

  compute() {
      let computation
      const pre = parseFloat(this.previousValue)
      const current = parseFloat(this.currentValue)
      if(isNaN(pre) || isNaN(current)) return
      switch (this.operation) {
          case '+':
            computation = pre+current  
              break;
          case '-':
            computation = pre-current  
              break;
          case 'x':
            computation = pre*current  
              break;
          case '÷':
            computation = pre/current  
              break;
      
          default:
              return;
      }
      this.currentValue = computation
      this.operation = undefined
      this.previousValue = ""
  }

  getDisplayNumber(number){
      const stringNumbers = number.toString()
      const integerNumbers = parseFloat(stringNumbers.split('.')[0])
      const decimalNumbers = stringNumbers.split('.')[1]
      let integerDisplay
      if (isNaN(integerNumbers)){
          integerDisplay = ''
      } else{
          integerDisplay = integerNumbers.toLocaleString('en',{
              maximumFractionDigits: 0
          })        
      }
      if(decimalNumbers != null){
          return `${integerDisplay}.${decimalNumbers}`
      }else{
        return integerDisplay
      }
      
  }


  updateDisplay() {
    this.currentOperation.innerText = this.getDisplayNumber(this.currentValue)

    if (this.operation != null){
        this.previousOperation.innerText =
        `${this.previousValue} ${this.operation}`
    }else{
        this.previousOperation.innerText = ''
    } 
    
  }
}

const numberOfButtons = document.querySelectorAll("[btn-number]");
const operationButtons = document.querySelectorAll("[btn-operation]");
const equalButton = document.querySelector("[btn-equals]");
const deleteButton = document.querySelector("[btn-delete]");
const allClearButton = document.querySelector("[btn-all-clear]");
const currentOperation = document.querySelector("[current-operation]");
const previousOperation = document.querySelector("[pre-operation]");

const calculator = new Calculator(previousOperation, currentOperation);

numberOfButtons.forEach( button => {
  button.addEventListener("click", () => {
    calculator.appendNumbers(button.innerText);
    calculator.updateDisplay();
  });
});

operationButtons.forEach(button => {
    button.addEventListener("click", () => {
        calculator.selectOperation(button.innerText);
        calculator.updateDisplay();
    })
})

equalButton.addEventListener("click", button =>{
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener("click", button =>{
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener("click", button =>{
    calculator.delete()
    calculator.updateDisplay()
})