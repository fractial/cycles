const { homedir, platform } = require('os');
const fs = require('fs');
const { join } = require('path');

const filePath = join(homedir(), '.cycles.json');

function add(name, type = platform(), scripts) {
  const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  if (jsonData.configurations.some((config) => config.name === name)) return;

  scripts = scripts.split('||');
  console.log(name, scripts);

  const configuration = {
    name: name,
    type: type || platform,
    scripts: scripts,
  };

  jsonData.configurations.push(configuration);

  fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2));
}

module.exports = {
  add,
};
