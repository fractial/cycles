const { existsSync, writeFileSync } = require('fs');
const path = require('path');
const { add, remove, modify, run } = require('./script');

const filePath = path.join(__dirname, '.cycles.json');

if (!existsSync(filePath)) {
  const jsonData = {
    configurations: [],
  };

  writeFileSync(filePath, JSON.stringify(jsonData, null, 2));
}

const args = process.argv.slice(2);

if (args.length === 0) {
  console.log(
    'Usage: node index.js <command> [-t <type>] [-n <name>] [-s <scripts>]'
  );
  console.log('Commands: add, remove, modify, run');
  process.exit(1);
}

const command = args[0];

const getFlagValue = (flag) => {
  const index = args.indexOf(flag);
  return index !== -1 && index + 1 < args.length ? args[index + 1] : null;
};

let type, name, scripts;

switch (command) {
  case 'add':
    type = getFlagValue('-t') || getFlagValue('--type');
    name = getFlagValue('-n') || getFlagValue('--name');
    scripts =
      getFlagValue('-s') ||
      getFlagValue('--script') ||
      getFlagValue('--scripts');
    add(type, name, scripts);
    break;
  case 'remove':
    name = args[1];
    remove(name);
    break;
  case 'modify':
    break;
  case 'run':
    name = args[1];
    run(name);
    break;
  default:
    name = args[0];
    run(name);
}
