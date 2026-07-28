let val1 ='' ; 
let val2 = '' ; 
let res = '' ; 
let operator = '' ; 
let userInput = document.querySelector('.user-input') 
let history = JSON.parse(localStorage.getItem('history')) || [] 
const operations = {
    '+' : (n1,n2) => n1+n2 , 
    '−' : (n1,n2) => n1-n2 , 
    'x' : (n1,n2) => n1*n2 ,  
    '÷': (n1, n2) => Number((n1 / n2).toFixed(4)),
    '%': (n1, n2) => Number(((n2 / n1) * 100).toFixed(4))
}
userInput.innerHTML = 0 

document.addEventListener('click' , function(event){
    const button =  event.target.closest('button')
    if(button) {
        if(button.classList.contains('number')) {
            let value = button.textContent 
            console.log( value);
            if (!operator) { 
                if(val1.length >= 10) {
                    return 
                }
                if(value == '0' &&  (val1[0] == '0') ) { 
                    return 
                }
                else if(value == '00' && (val1[0] == '0')) {
                    return 
                }
                val1 += value 
                if(value > '0' && val1[0] == '0' && !val1.includes('.') ) {
                    val1 = value 
                }
            }
            else{
                if(val2.length === 10) {
                    return 
                }
                if(value == '0' && (val2[0] == '0') ) {
                    return 
                }
                else if(value == '00' &&  (val2[0] == '0') ) { 
                    return 
                }
                val2 += value 
                if(value > '0' && val2[0] == '0' && !val2.includes('.') ) {
                    val2 = value 
                }
            }

            
            userInput.innerHTML = val1 + operator + val2
        } 
        else if (button.classList.contains('operator')) {
            const value = button.textContent

            // Allow first number to be minus
            if (!val1 && !operator && value === '−') {
                val1 = '-'
                userInput.innerHTML = val1
                return
            }

            // Don't allow an operator if we only have - 
            if (val1 === '-') {
                return
            }

            // Allow negative second number 
            if (
                val1 &&
                (operator === 'x' || operator === '÷') &&
                value === '−' &&
                val2 === ''
            ) {
                val2 = '-'
                userInput.innerHTML = val1 + operator + val2
                return
            }

            // Don't allow an operator if we only have - 
            if (val2 === '-') {
                return
            }

            // Calculate res before new operator
            if (val1 && operator && val2) {
                res = operations[operator](Number(val1), Number(val2))
                val1 = String(res)
                val2 = ''
            }

            if (val1) {
                operator = value
                userInput.innerHTML = val1 + operator
            }
        }

        else if(button.classList.contains('equal')) {
            if(val1 && val2 && operator) { 
                if ( (val1.length == 1 && val1[0] == '-' )  ||  (val2.length == 1 && val2[0] =='-')) {
                    return 
                }
                res = operations[operator](Number(val1) , Number(val2) )  
                userInput.innerHTML = res   
                let historyObj = {
                    val1:val1 , 
                    val2:val2 , 
                    operator : operator , 
                    res:res 
                }
                history.push(historyObj) 
                localStorage.setItem('history' , JSON.stringify(history)) 
                console.log(history);

                val1 = String(res)   
                val2 = ''
                operator = ''
                
                
                
            }
            
        }

        else if(button.classList.contains('wrong')) {
            if( val1 && operator && val2) {
                val2 = val2.slice(0 , val2.length - 1 ) 
            }
            else if(val1 && operator) {
                operator = ''
            }
            else if(val1) {
                val1 = val1.slice(0 , val1.length - 1 ) 
            }

            userInput.innerHTML = val1 + operator + val2 
        } 

        else if(button.classList.contains('clear')) {
            val1 = '' 
            val2 = "" 
            operator = '' 
            userInput.innerHTML = '0'
        }

        else if(button.textContent == '.') { 

            if (val1 && operator && val2 && !val2.includes('.')) { 
                val2 += '.'
            }
            else if(val1 && operator && !val2.includes('.') ) {
                val2 += '0.'
            }
            else if (val1 && !val1.includes('.') ) {
                val1 += '.'
            }
            else if(val1 == '' ) {
                val1 += '0.'
            }
            userInput.innerHTML = val1 + operator + val2 
            
        }
    }
})







//toggle icons 
let clock = document.querySelector('.clock-icon') 
let CalculatorIcon = document.querySelector('.calculator-icon ')

let iconContainer = document.querySelector('.calculator-header' ) 
let calculatorContainer = document.querySelector('.calculatorContainer') 
let historyContainer = document.querySelector('.historyContainer')



iconContainer.addEventListener('click' , function(event){
    if(event.target.classList.contains('clock-icon')) {
        clock.classList.add('d-none') 
        calculatorContainer.classList.add('d-none') 
        CalculatorIcon.classList.remove('d-none' ) 
        historyContainer.classList.remove('d-none')
        history = JSON.parse(localStorage.getItem('history')) || [] 
        history.reverse()
        historyContainer.innerHTML = ''
        
        history.forEach(item =>{
            historyContainer.innerHTML += `
            <div class = 'history-item' >
                <p class = 'text-secondary p-0 m-0'>${item.val1} ${item.operator} ${item.val2}</p> 
                <h4 class = 'text-light p-0 m-0 result-item'>= ${item.res}</h4>
            </div>
            `
        })
        

    }
    else if(event.target.classList.contains('calculator-icon')){
        console.log('bye');
        clock.classList.remove('d-none') 
        calculatorContainer.classList.remove('d-none') 
        CalculatorIcon.classList.add('d-none' ) 
        historyContainer.classList.add('d-none') 
        
        
    }
})


document.addEventListener('click' , function(event){
    if(event.target.classList.contains('result-item')) {
        console.log('hiii');
        
        val1 = event.target.textContent.slice(2,)
        clock.classList.remove('d-none') 
        calculatorContainer.classList.remove('d-none') 
        CalculatorIcon.classList.add('d-none' ) 
        historyContainer.classList.add('d-none')  

        userInput.innerHTML = val1 
    }
})