const { homedir } = require('os');
const fs = require('fs');
const { join } = require('path');

const filePath = join(homedir(), '.cycles.json');

function remove(name) {
  const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  jsonData.configurations = jsonData.configurations.filter(
    (config) => config.name !== name
  );

  fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2));
}

module.exports = {
  remove,
};
