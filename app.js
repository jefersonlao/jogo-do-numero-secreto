let listaDeNumerosSorteados = [];
let dificuldade = parseInt(prompt("Selecione a dificuldade do jogo. NUMERO 'DE 0 A _____ '? (10 F, 50 M, 100 D): "));
let tentativas = 1;

function escolherDificuldade() {
    dificuldade = parseInt(prompt("Selecione a dificuldade do jogo. NUMERO 'DE 0 A _____ '? (10 F, 50 M, 100 D): "));
}
function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * dificuldade + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if (quantidadeDeElementosNaLista == (dificuldade - 1)) {
        listaDeNumerosSorteados = [];
    }


    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}
let numeroSecreto = gerarNumeroAleatorio();

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}
function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do número Secreto');
    exibirTextoNaTela('p', `Escolha um número entre 1 e ${dificuldade}:`);
}
exibirMensagemInicial();

function verificarChute() {
    let chute = document.querySelector('input').value;

    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa'; 
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`; 
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', "O número Secreto é MENOR!");
        } else {
            exibirTextoNaTela('p', "O número Secreto é MAIOR!");
        }
        tentativas++;
        limparCampo();
    }
}
function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    escolherDificuldade();
    tentativas = 1;
    exibirMensagemInicial();
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}
