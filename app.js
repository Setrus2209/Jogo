let listaDeNumeros = [];
let numeroLimite = 100;
let numeroSecreto = gerarNumero();
let tentativas = 1;
let chute;

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', 
    {rate:1.2});
}

function exibirMensagemInicial() {
  exibirTextoNaTela('h1', 'Jogo do número secreto');
  exibirTextoNaTela('p', 'Escreva um numero entre 1 e 100');
}

exibirMensagemInicial();

function limparCampo() {
  chute = document.querySelector('input');
  chute.value = '';
}

function verificarChute() {
    chute = document.querySelector('input').value;
    if (chute == numeroSecreto) {
      exibirTextoNaTela('h1' , 'Acertou');
      let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
      let mensagemTentativas = `Você acertou o numero secreto com ${tentativas} ${palavraTentativa}!`;
      exibirTextoNaTela('p', mensagemTentativas);
      document.getElementById('reiniciar').removeAttribute('disabled');
    } else if (chute < numeroSecreto) {
      exibirTextoNaTela('p', 'O numero é maior');
    } else {
      exibirTextoNaTela('p', 'O numero é menor');
    }
    tentativas++;
    limparCampo();
}

function gerarNumero() {
  let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1); 
  let quantidadeDeNumerosNaLista = listaDeNumeros.length;

  if (quantidadeDeNumerosNaLista == numeroLimite) {
    listaDeNumeros = [];
  }

  if (listaDeNumeros.includes(numeroEscolhido)) {
    return gerarNumero();
  } else {
    listaDeNumeros.push(numeroEscolhido);
    return numeroEscolhido;
  } 
}

function reiniciar() {
  numeroSecreto = gerarNumero();
  limparCampo();
  tentativas = 1;
  exibirMensagemInicial();
}

reiniciar();

document.getElementById('reiniciar').setAttribute('disabled', true);
