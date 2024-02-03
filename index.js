const fs = require('fs');
const { homedir } = require('os');
const path = require('path');
const { add } = require('./add');
const { remove } = require('./remove');
const { run } = require('./run');

const filePath = path.join(homedir(), '.cycles.json');

if (!fs.existsSync(filePath)) {
  try {
    const jsonData = {
      configurations: [],
    };
    fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2));
  } catch (error) {
    console.error(error);
  }
}

const args = process.argv.slice(2);

if (args.length === 0) {
  console.log('Usage: cycles <command> [-t <type>] [-n <name>] [-s <scripts>]');
  console.log('Commands: add, remove, run');
  process.exit(1);
}

const command = args[0];

const getFlagValue = (flags) => {
  for (const flag of flags) {
    const index = args.indexOf(flag);
    const value =
      index !== -1 && index + 1 < args.length ? args[index + 1] : null;
    if (value !== null) return value;
  }
};

let name, type, script;

switch (command) {
  case 'add':
    name = getFlagValue(['-n', '--name']);
    type = getFlagValue(['-t', '--type']);
    script = getFlagValue(['-s', '--script', '--scripts']);
    add(name, type, script);
    break;
  case 'remove':
    remove(args[1]);
    break;
  case 'run':
    run(args[1]);
    break;
  default:
    run(args[0]);
}
