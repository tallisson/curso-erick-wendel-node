/*
 0 Obter um usuario
 1 Obter o numero de telefone de um usuario a partir de seu Id
 2 Obter o endereco do usuario pelo Id 
*/
// importamos um módulo interno do node.js
const util = require('util');
const obterEnderecoAsync = util.promisify(obterEndereco);

function obterUsuario() {
  // quando der algum problea -> reject(ERRO)
  // quando sucess -> RESOLV
  return new Promise(function resolvePromise(resolve, reject) {
    setTimeout(function () {
      return resolve({
        id: 1,
        nome: 'Aladin',
        dataNascimento: new Date()
      })
    }, 1000)
  });
}

function obterTelefone(idUsuario) {
  return new Promise(function resolverPromise(resolve, reject) {
    setTimeout(() => {
      return resolve({
        telefone: '98134-1672',
        ddd: 99
        })
    }, 2000);
  })
}

function obterEndereco(idUsuario, callback) {
  setTimeout(() => {
    return callback(null, {
      rua: 'dos bobos',
      numero: 0
    })
  }, 2000);
}

// 1o passso adicionar a palavra async -> automaticamente ela retornará uma Promise
main()
async function main() {
  try {
    console.time('medida-promise')
    const usuario = await obterUsuario()
    // const telefone = await obterTelefone(usuario.id)
    // const endereco = await obterEnderecoAsync(usuario.id)
    const resultado = await Promise.all([
        obterTelefone(usuario.id),
        obterEnderecoAsync(usuario.id)
    ])
    const endereco = resultado[1]
    const telefone = resultado[0]
    console.log(`
        Nome: ${usuario.nome},
        Telefone: (${telefone.ddd}) ${telefone.telefone},
        Endereco: ${endereco.rua}, ${endereco.numero}
    `)
    console.timeEnd('medida-promise')
  } catch (error) {
    console.error('DEU RUIM', error)
  }
}