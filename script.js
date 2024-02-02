const os = require('os');
const { readFileSync, writeFileSync } = require('fs');
const path = require('path');
const { promisify } = require('util');
const { config } = require('process');
const exec = promisify(require('child_process').exec);

const platform = os.platform();

const filePath = path.join(__dirname, '.cycles.json');

function add(type, name, scripts) {
  const jsonData = JSON.parse(readFileSync(filePath, 'utf-8'));

  const nameExists = jsonData.configurations.some(
    (config) => config.name === name
  );

  if (nameExists) return;

  scripts = scripts.split('||');

  console.log(scripts);

  const newConfiguration = {
    type: type || platform,
    name: name,
    scripts: scripts,
  };

  jsonData.configurations.push(newConfiguration);

  writeFileSync(filePath, JSON.stringify(jsonData, null, 2));
}

function remove(name) {
  const jsonData = JSON.parse(readFileSync(filePath, 'utf-8'));

  jsonData.configurations = jsonData.configurations.filter(
    (config) => config.name !== name
  );

  writeFileSync(filePath, JSON.stringify(jsonData, null, 2));
}

function modify(type, name, scripts) {
  // const jsonData = JSON.parse(readFileSync(filePath, 'utf-8'));
  // const nameExists = jsonData.configurations.some(
  //   (config) => config.name === name
  // );
  // if (!nameExists) return;
  // if (scripts) scripts = scripts.split('||');
  // const newConfiguration = {
  //   type: type || platform,
  //   name: name,
  //   scripts: scripts,
  // };
  // jsonData.configurations.push(newConfiguration);
  // writeFileSync(filePath, JSON.stringify(jsonData, null, 2));
}

async function run(name) {
  const data = JSON.parse(readFileSync(filePath, 'utf-8'));

  const match = name.match(/([a-zA-Z]+)(\[(\d+)\])?/);

  if (!match) return;

  const identifier = match[1];
  const index = match[3];

  const configuration = data.configurations.find(
    (config) => config.name === identifier
  );

  if (configuration.type != platform) {
    console.error("Error: Current OS doesn't match the type entry");
    return;
  }

  const scripts = configuration.scripts;

  if (index) {
    if (scripts[index]) {
      const { stdout } = await exec(scripts[index]);
      console.log(stdout.trim());
    }
  } else {
    for (const script of scripts) {
      const { stdout } = await exec(script);
      console.log(stdout.trim());
    }
  }
}

module.exports = { add, remove, modify, run };
