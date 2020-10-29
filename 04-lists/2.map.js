const service = require('./service');

Array.prototype.meuMap = (callback) => {
  const novoArray = [];
  for (let i in this) {
    const resultado = callback(this[i], i);
    novoArray.push(resultado);
  }
  return novoArray;
}

async function main() {
  try {
    const result = await service.obterPessoas('a');
    let names = [];
    
    console.time('forEach');
    result.results.forEach(item => {
      names.push(item.name);
    })
    console.timeEnd('forEach');
    console.log(names);
    names = [];

    console.time('map');
    names = result.results.map(pessoa => {
      return pessoa.name;
    })
    console.timeEnd('map');
    console.log(names);
    names = [];

    console.time('map1');
    names = result.results.map((pessoa) => pessoa.name);
    console.timeEnd('map1');
    console.log(names);

    console.time('meuMap');
    names = result.results.meuMap(function (pessoa, indice) {
        return `[${indice}]${pessoa.name}`;
    })
    console.timeEnd('meuMap');
    console.log('names', names);
    names = [];
  } catch (error) {
    console.error('DEU RUIM', error);
  }
}
main();