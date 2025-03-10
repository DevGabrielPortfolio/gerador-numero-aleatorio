// importando elementos do html
const sliderMin = document.getElementById('range-min');
const sliderMax = document.getElementById('range-max');

const sizeMin = document.getElementById('valor_minimo');
const sizeMax = document.getElementById('valor_maximo');

const containerNumero = document.querySelector('.container-main__resultado');
const exibeNumero = document.querySelector('.container-main__resultado__saida');

const containerHistorico = document.querySelector('.container-main__historico');
const listaHistorico = document.querySelector('.container-main__historico-lista');

const botaoSortear = document.querySelector('.container-main__botoes__sortear');
const botaoLimpar = document.querySelector('.container-main__botoes__limpar');

sizeMin.innerHTML = sliderMin.value;
sizeMax.innerHTML = sliderMax.value;

sliderMin.addEventListener('input', (e) => {
    sizeMin.innerHTML = e.target.value;
});

sliderMax.addEventListener('input', (e) => {
    sizeMax.innerHTML = e.target.value;
});

let historicoNumeros = [];
let maxHistorico = 5;

const gerarNumeroAleatorio = () => {
    let minValue = parseInt(sliderMin.value);
    let maxValue = parseInt(sliderMax.value);

    if (minValue > maxValue) {
        exibeNumero.innerHTML = 'O valor mínimo deve ser menor ou igual ao valor máximo.';
        containerNumero.classList.remove('hide');


    } else {
        const numeroAleatorio = Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;

        containerNumero.classList.remove('hide');
        exibeNumero.innerHTML = numeroAleatorio;

        historicoNumeros.unshift(numeroAleatorio);


        if (historicoNumeros.length > maxHistorico) {
            historicoNumeros.pop();
        }

        if (containerHistorico) {
            containerHistorico.style.display = 'block';
            listaHistorico.innerHTML = historicoNumeros
                .map((numero) => `<li class="container-main__historico-item">${numero}</li>`)
                .join('');
        }
    }
};

const copiarNumero = () => {
    alert('Número copiado com sucesso!');
    navigator.clipboard.writeText(exibeNumero.textContent); 
};

const limparDados = () => {
    const confirmacao = confirm('Deseja excluir o histórico?');

    if (confirmacao) {
        historicoNumeros = [];
        exibeNumero.innerHTML = '';
        containerNumero.classList.add('hide');

        listaHistorico.innerHTML = '';
        containerHistorico.style.display = 'none';

        alert('Histórico excluído!');
    } else {
        alert('Histórico mantido!');
    }
};

botaoLimpar.addEventListener('click', limparDados);
containerNumero.addEventListener('click', copiarNumero);
botaoSortear.addEventListener('click', gerarNumeroAleatorio);
