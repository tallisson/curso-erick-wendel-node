const { 
  readFileSync,
  writeFile
} = require('fs');

// const dadosJson = require('./herois.json');

class Data {
  constructor() {
    this.nomeArq = 'herois.json';
  }

  obterDados() {
    const arquivo = readFileSync(this.nomeArq, 'utf-8');
    return JSON.parse(arquivo.toString());
  }

  escreverDados(heroi) {
    if(heroi) {
      const arquivo = this.obterDados();      
      return true;
    }

    return null;
  }

  listar(id) {
    const dados = this.obterDados();
    return (id ? dados.filter(item => item.id === id) : dados);
  }
}

module.exports = new Data();