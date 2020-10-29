const {
  obterPessoas
} = require('./service');

Array.prototype.meuReduce = function (callback, valorInicial) {
  if(this.length === 0)
    return (valorInicial != undefined ? valorInicial : 0);

  let valorFinal = this.shift();
  for (let i = 0; i < this.length; i++) {
    valorFinal = callback(valorFinal, this[i]);
  }
  return valorFinal;
}

async function main() {
  try {
    const {
      results
    } = await obterPessoas(`a`)
    const alturas = results.map(item => parseFloat(item.height));
    console.log('alturas', alturas);
    
    let total = alturas.meuReduce((previous, next) => {
      return previous + next;
    }, 0);
    console.log('total', total);

    const minhaLista = [
      ['Erick', 'Wendel'],
      ['NodeBR', 'Nerdzão']
    ];
    total = minhaLista.meuReduce((anterior, proximo) => {
      return anterior.concat(proximo);
    }, [])
      .join(', ');
    console.log('total: ', total);
  } catch (error) {
    console.error('DEU RUIM', error);
  }
}

main();