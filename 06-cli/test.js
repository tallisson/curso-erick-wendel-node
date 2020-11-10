const {
  deepEqual,
  ok
} = require('assert');

const data = require('./data');

const DEFAULT_ITEM_CADASTRAR = {
  nome: 'Flash',
  poder: 'Speed',
  id: 1
};

const DEFAULT_ITEM_ATUALIZAR = {
  nome: 'Batman',
  poder: 'Artes Marciais',
  id: 2
}

describe('Suite de manipulação de heróis', () => {
  before( () => {
    data.cadastrar(DEFAULT_ITEM_CADASTRAR);
    data.cadastrar(DEFAULT_ITEM_ATUALIZAR);
  });

  it('deve pesquisar um heroi usando arquivos', () => {
    const expected = DEFAULT_ITEM_CADASTRAR;
    const [resultado] = data.listar(expected.id);
    deepEqual(resultado, expected);
  });

  it('deve salvar um heroi usando arquivos', () => {    
    const resultado = data.cadastrar(DEFAULT_ITEM_CADASTRAR);
    const [atual] = data.listar(DEFAULT_ITEM_CADASTRAR.id);    
    deepEqual(atual, DEFAULT_ITEM_CADASTRAR);
  });

  it('deve deletar um heroi usando arquivos', () => {
    const resultado = data.remover(DEFAULT_ITEM_CADASTRAR.id);
    const expected = true;
    deepEqual(expected, resultado);
  });

  it('deve atualizar um heroi usando arquivos', () => {
    const resultado = data.atualizar({
      ...DEFAULT_ITEM_ATUALIZAR,
      poder: 'Dinheiro'
    });
    const expected = { ...DEFAULT_ITEM_ATUALIZAR, poder: 'Dinheiro' };
    deepEqual(expected, resultado);
  });
});