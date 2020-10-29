const {
  obterPessoas
} = require('./service');

Array.prototype.meuFilter = function(callback) {
  const lista = [];
  for(let i in this) {
    if(callback(this[i], i, this)) {
      lista.push(this[i]);
    }
  }
  return lista;
}

async function main() {
  try {
    const {
      results
    } = await obterPessoas('a');

    let names = results.map((pessoa) => pessoa.name);
    console.log(names);

    let familiaLars = results.meuFilter((pessoa) => {
      return pessoa.name.toLowerCase().indexOf('lars') !== -1;
    });
    console.log(familiaLars.map(pessoa => pessoa.name));
    familiaLars = results.meuFilter((item, index, lista) => {
      //console.log(`index: ${index}`, lista.length)
      return item.name.toLowerCase().indexOf('lars') !== -1
    });
    //console.log(familiaLars);
  } catch (error) {
    console.error('DEU RUIM', error);
  }
}
main();
