const commander = require('commander');
const Heroi = require('./heroi');
const data = require('./data');

function cmd() {
  commander
    .version('v1')
    .option('-n, --nome [value]', 'adicionar nome')
    .option('-p, --poder [value]', 'adicionar poder')
    .option('-i, --id [value]', 'id do herói')
    //CRUD
    .option('-c, --cadastrar', 'cadastrar Heroi')
    .option('-r, --listar [value]', 'listar herois pelo id')
    .option('-u, --atualizar [value]', 'atualizar heroi pelo id')
    .option('-d, --remover [value]', 'remover heroi pelo id');
}

function main() {
  /**
   * node cli.js --help
   */
  cmd();
  commander.parse(process.argv);

  const heroi = new Heroi(commander);
  try {
    /**
     * node cli.js --cadastrar params...
     * node cli.js -c -n Hulk -p Forca
     */
    if (commander.cadastrar) {
      data.cadastrar(heroi);
      console.log('item cadastrado com sucesso!');
      return;
    }

    /**
     * node cli.js --listar
     * node cli.js -r
     * node cli.js -r 1
     */
    if (commander.listar) {
      const result = data.listar(commander.id || false);
      console.log(result);
      return;
    }

    /**
     * node cli.js --atualizar
     * node cli.js -u 1 -n papa
     * node cli.js -u 1 -n thor -p trovao
     */
    if (commander.atualizar) {
      const id = commander.atualizar;
      console.log('id', id);
      heroi.id = id;
      data.atualizar(heroi);
      console.log('item atualizado com sucesso!');
      return;
    }
    /**
     * node cli.js --remover
     * node cli.js -d 1
     */
    if (commander.remover) {
      const id = commander.remover;
      data.remover(id);
      console.log('item removido com sucesso!');
      return;
    }
  } catch (error) {
    console.error('DEU RUIM', error);
    return;
  }
};

main();