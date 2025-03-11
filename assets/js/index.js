// importando elementos do html
// importando os sliders
const sliderMin = document.getElementById('range-min');
const sliderMax = document.getElementById('range-max');
// importando os spans 
const sizeMin = document.getElementById('valor_minimo');
const sizeMax = document.getElementById('valor_maximo');
// importando os containers de resultado
const containerNumero = document.querySelector('.container-main__resultado');
const exibeNumero = document.querySelector('.container-main__resultado__saida');
// importando os containers de histórico
const containerHistorico = document.querySelector('.container-main__historico');
const listaHistorico = document.querySelector('.container-main__historico-lista');
// importando os botões de sorteio e de limpeza
const botaoSortear = document.querySelector('.container-main__botoes__sortear');
const botaoLimpar = document.querySelector('.container-main__botoes__limpar');


// colocando os valores que os sliders se encontram no começo
sizeMin.innerHTML = sliderMin.value;
sizeMax.innerHTML = sliderMax.value;

// criando uma função que irá receber o slider e o display quer irá armazenar o numero
const showNumber = (slider, display)=>{
    slider.addEventListener('input', (e)=>{
        display.innerHTML = e.target.value;
    });
}

// atualizando o numero do slider selecionado
showNumber(sliderMin, sizeMin);
showNumber(sliderMax, sizeMax);


// criando lista de historico
let historicoNumeros = [];
// criando a constante que irá comandar quantos números irão aparecer dentro do histórico 
let maxHistorico = 5;

// função que gera o número aleatório
const gerarNumeroAleatorio = () => {
    
    // transformando o valor do slider em número
    let minValue = parseInt(sliderMin.value);
    let maxValue = parseInt(sliderMax.value);

    // verificando a condição de validade do espaçamento entre o valor máximo e mínimo
    if (minValue > maxValue) {
        exibeNumero.innerHTML = 'O valor mínimo deve ser menor ou igual ao valor máximo.';
        containerNumero.classList.remove('hide');
    // caso não caia dentro da verificação, começa o processo de gerar um número e exibi-lo
    } else {
        // gera o numero aleatório dentro do intervalo fornecido
        const numeroAleatorio = Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;

        // mostro o container que irá exibir o resultado
        containerNumero.classList.remove('hide');
        // mostro o resultado
        exibeNumero.innerHTML = numeroAleatorio;

        // insiro na lista de resultados no histórico
        historicoNumeros.unshift(numeroAleatorio);


        // verifico se o número de itens dentro da lista de histórico é maior que o limite pré-estabelecido pela variável
        if (historicoNumeros.length > maxHistorico) {
            // remove o ultimo item caso o numero tenha exedido
            historicoNumeros.pop();
        }

        // verifica se a variavel "containerHistorico" não é null ou undefined
        if (containerHistorico) {
            // exibe o container que irá armazenar o histórico
            containerHistorico.style.display = 'block';
            // insiro dentro da lista de histórico(html) o que está dentro da variável de historico(js) 
            listaHistorico.innerHTML = historicoNumeros
                .map((numero) => `<li class="container-main__historico-item">${numero}</li>`)
                .join('');
        }
    }
};

// função de copiar o numero gerado
const copiarNumero = () => {
    // alerto o usuario de que o número ja foi copiado para a área de transferencia
    alert('Número copiado com sucesso!');
    // mando o ultimo numero gerado para a área de transferencia do usuario
    navigator.clipboard.writeText(exibeNumero.textContent); 
};

// função que irá limpar o historico 
const limparDados = () => {
    // exibo uma mensagem perguntando se o usuario realmente deseja deletar o historico de numeros gerados
    const confirmacao = confirm('Deseja excluir o histórico?');

    // verifico se a variavel "confirmacao" não é null ou undefined
    if (confirmacao) {
        // deleto os itens da lista de historico
        historicoNumeros = [];
        // limpo o ultmo numero gerado
        exibeNumero.innerHTML = '';
        // escondo o container com a classe(css) .hide
        containerNumero.classList.add('hide');

        // limpo o elemento de lista(html), para de inserir LIs
        listaHistorico.innerHTML = '';

        // informo o usuário de que a página foi limpa 
        alert('Histórico excluído!');

        // voltar para 1 os sliders
        sliderMin.value = 1;
        sliderMax.value = 1

        // mostrando o valor que esta sendo apresentado
        sizeMin.innerHTML = sliderMin.value;
        sizeMax.innerHTML = sliderMax.value;

    } else {
        // caso o usuário diga que não deseja deletar os numeros gerados, informo o usuario de que a lista foi mantida
        alert('Histórico mantido!');
    }
};

// adiciono cada uma das funções aos seus respectivos botões
botaoLimpar.addEventListener('click', limparDados);
containerNumero.addEventListener('click', copiarNumero);
botaoSortear.addEventListener('click', gerarNumeroAleatorio);
