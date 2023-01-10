class Validator {

    constructor() {
        this.validations = [

            'data-required', 
            'data-min-length', 
            'data-max-length', 
            'data-email-validate',
            'data-only-letters', 
            'data-equal', 
            'data-password-validate', 

        ]
    }

    // Método que inicia a validação de todos os campos

    validate(form) {

        // Resgata todas as validações

        let currentValidations = document.querySelectorAll('form .error-validation');

        if(currentValidations.length > 0) {
            this.cleanValidations(currentValidations);
        }

        // Pega os inputs

        let inputs = form.getElementsByTagName('input');        

        // Transforma HTMLCollection --> array

        let inputsArray = [...inputs];
        
        // Loop nos inputs e validação mediante ao que for encontrado

        inputsArray.forEach(function(input) {

            // Loop em todas as validações existentes

            for(let i = 0; this.validations.length > i; i++) {

                // Verifica se a validação atual existe no input

                if(input.getAttribute(this.validations[i]) != null) {
                    
                    // Limpa a string para virar um método

                    let method = this.validations[i].replace('data-', '').replace('-', '');

                    // Valor do input

                    let value = input.getAttribute(this.validations[i]);

                    // Chama o método

                    this[method](input, value);

                }

            }

        }, this);

    }

    // Verifica se um input tem o número mínimo de caracteres

    minlength(input, minValue) {

        let inputLength = input.value.length;

        let errorMessage = `O campo precisa conter ao menos ${minValue} caracteres.`;

        if(inputLength < minValue) {
            this.printMessage(input, errorMessage);
        }

    }

    // Verifica se o input excedeu o limite de caracteres

    maxlength(input, maxValue) {

        let inputLength = input.value.length;

        let errorMessage = `O campo pode conter no máximo ${maxValue} caracteres.`;

        if(inputLength > maxValue) {
            this.printMessage(input, errorMessage);
        }

    }

    // Validação de e-mails

    emailvalidate(input) {

        let re = /\S+@\S+\.\S+/;

        let email = input.value;

        let errorMessage = `Insira um e-mail no padrão email@email.com`;

        if(!re.test(email)) {
            this.printMessage(input, errorMessage);
        }

    }

    // Valida se o campo recebeu apenas letras

    onlyletters(input) {

        let re = /^[A-Za-z]+$/;

        let inputValue = input.value;

        let errorMessage = `Este campo aceita apenas letras.`;

        if(!re.test(inputValue)) {
            this.printMessage(input, errorMessage);
        }

    }

    // Método para imprimir as mensagens de erro na tela

    printMessage(input, msg) {

        // Verifica a quantidade de erros que o input possui

        let errorsQty = input.parentNode.querySelector('.error-validation');

        if(errorsQty === null) {

            let template = document.querySelector('.error-validation').cloneNode(true);

            template.textContent = msg;

            let inputParent = input.parentNode;

            template.classList.remove('template');

            inputParent.appendChild(template);

        }


    }

    // Verifica se o input é requerido

    required(input) {

        let inputValue = input.value;

        if(inputValue === '') {
           let errorMessage = `Este campo é obrigatório.`;

           this.printMessage(input, errorMessage);
        }

    }

    // Verifica se dois campos receberam valores iguais

    equal(input, inputName) {

        let inputToCompare = document.getElementsByName(inputName)[0];

        let errorMessage = `Este campo e o campo "Senha" precisam ser iguais.`;

        if(input.value != inputToCompare.value) {

            this.printMessage(input, errorMessage);

        }

    }

    // Valida o campo de senha

    passwordvalidate(input) {

        // Transforma string em array

        let charArr = input.value.split("");

        let uppercases = 0;
        let numbers = 0;

        for(let i = 0; charArr.length > i; i++) {
            
            if(charArr[i] === charArr[i].toUpperCase() && isNaN(parseInt(charArr[i]))) {

                uppercases++;

            } else if(!isNaN(parseInt(charArr[i]))) {

                numbers++;

            }

        }

        if(uppercases === 0 || numbers === 0) {

            let errorMessage = `A senha precisa conter ao menos 1 letra maiúscula e 1 número.`;

            this.printMessage(input, errorMessage);
            
        }

    }

    // Limpa as validações da tela

    cleanValidations(validations) {

        validations.forEach(el => el.remove());

    }

}

let form = document.getElementById("register-form");

let submit = document.getElementById("btn-submit");


let validator = new Validator();


// Evento que dispara as validações

submit.addEventListener('click', function(e) {

    e.preventDefault();

    validator.validate(form);

});