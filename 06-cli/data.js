const { 
  readFileSync,
  writeFileSync
} = require('fs');

// const dadosJson = require('./herois.json');

class Data {
  constructor() {
    this.nomeArq = 'herois.json';
  }

  obterDados() {
    const arquivo = readFileSync(this.nomeArq, 'utf-8');
    if(arquivo)
      return JSON.parse(arquivo.toString());
    return [];
  }

  escreverDados(heroi) {
    try {
      writeFileSync(this.nomeArq, JSON.stringify(heroi));
      return true;
    } catch(error) {
      return false;
    }
  }

  cadastrar(heroi) {
    const dados = this.obterDados();
    const id = heroi.id <= 2 ? heroi.id : Date.now();
    const heroiComId = {
      id,
      ...heroi
    };
    const dadosFinal = [
      ...dados,
      heroiComId
    ];

    const resultado = this.escreverDados(dadosFinal);
    return resultado;
  }

  listar(id) {
    const dados = this.obterDados();
    return (id ? dados.filter(item => item.id === id) : dados);
  }
}

module.exports = new Data();