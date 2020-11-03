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

describe('Suite de manipulação de heróis', () => {
  it('deve pesquisar um heroi usando arquivos', async () => {
    const expected = DEFAULT_ITEM_CADASTRAR;
    const [resultado] = await data.listar(expected.id);
    deepEqual(resultado, expected);
  });

  it('deve salvar um heroi usando arquivos', async () => {
    const resultado = await data.escreverDados(DEFAULT_ITEM_CADASTRAR);
    console.log(resultado);
    deepEqual(resultado, expected);
  });
});