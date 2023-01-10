class Validator {

    constructor() {
        this.validations = [
            'data-min-length', 
        ]
    }

    // Método que inicia a validação de todos os campos

    validate(form) {

        // pegar os inputs

        let inputs = form.getElementsByTagName('input');        

        // Transformar HTMLCollection --> array

        let inputsArray = [...inputs];
        
        // Loop nos inputs e validação mediante ao que for encontrado

        inputsArray.forEach(function(input) {

            // Loop em todas as validações existentes

            for(let i = 0; this.validations.length > i; i++) {

                // Verifica se a validação atual existe no input

                if(input.getAttribute(this.validations[i]) != null) {
                    
                    // Limpar a string para virar um método

                    let method = this.validations[i].replace('data-', '').replace('-', '');

                    // Valor do input

                    let value = input.getAttribute(this.validations[i]);

                    // Chamar o método

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

    // Método para imprimir as mensagens de erro na tela

    printMessage(input, msg) {

        let template = document.querySelector('.error-validation').cloneNode(true);

        template.textContent = msg;

        let inputParent = input.parentNode;

        template.classList.remove('template');

        inputParent.appendChild(template);


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