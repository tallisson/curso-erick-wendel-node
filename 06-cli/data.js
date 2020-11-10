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
      const dados = this.obterDados();
      const index = dados.findIndex(item => item.id === parseInt(heroi.id));
      if(index === -1) {
        writeFileSync(this.nomeArq, JSON.stringify(heroi));
        return true;
      } else {
        this.atualizar(heroi);
      }
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

  remover(id) {
    if(!id) {
      return Error('Id não informado');
    }
    const dados = this.obterDados();
    const index = dados.findIndex(item => item.id === parseInt(id));
    if(index === -1) {
      throw new Error('O heroi informado não existe');
    }
    dados.splice(index, 1);
    this.escreverDados(dados);
    return true;
  }

  atualizar(heroi) {    
    if(!heroi.id) {
      return Error('Id não informado');
    }    
    const dados = this.obterDados();    
    const index = dados.findIndex(item => item.id === parseInt(heroi.id));
    if(index === -1) {
      throw new Error('O heroi informado não existe');
    }
    dados[index] = heroi;
    this.escreverDados(dados);
    return this.obterDados()[index];
  }
}

module.exports = new Data();