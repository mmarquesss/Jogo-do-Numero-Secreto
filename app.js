let listaDeNumerosSorteados = [];
let numeroLimite = 100;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1; // Declarada a variável que faltava!


function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, "Brazilian Portuguese Female", {rate: 1.2});// Adiciona a funcionalidade de leitura em voz alta
}

exibirTextoNaTela('h1', 'Jogo do Número Secreto');
exibirTextoNaTela('p', 'Escolha um número entre 1 e 100!');

function verificarChute() {
    let campo = document.querySelector('input');
    let chute = parseInt(campo.value);

    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Você acertou!');
        
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        // Espaço adicionado entre o número e a palavra
        let mensagemTentativas = `Você acertou o numero secreto com ${tentativas} ${palavraTentativa}.`;
        
        exibirTextoNaTela('p', mensagemTentativas);

        document.getElementById('reiniciar').disabled = false; // Habilita o botão de reiniciar
    } else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela('h1', 'O número secreto é menor!');
        } else {
            exibirTextoNaTela('h1', 'O número secreto é maior!');
        }
        tentativas++;
        limparCampo();
    }
}

function limparCampo() {
    let campo = document.querySelector('input');
    campo.value = '';
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite) + 1;
    let quantidadeDeElementos = listaDeNumerosSorteados.length;

    if (quantidadeDeElementos >= numeroLimite) {
        listaDeNumerosSorteados = []; // Reinicia a lista se todos os números já foram sorteados
    }

    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio(); // Gera outro número se já foi sorteado
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido); // Adiciona o número à lista
        return numeroEscolhido;
    }
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1; // Reinicia o contador de tentativas
    exibirTextoNaTela('h1', 'Jogo do Número Secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 100!');
    document.getElementById('reiniciar').disabled = true; // Desabilita o botão de reiniciar novamente
}