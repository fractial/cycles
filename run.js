const { homedir, platform } = require('os');
const fs = require('fs');
const { join } = require('path');
const { promisify } = require('util');
const exec = promisify(require('child_process').exec);

const filePath = join(homedir(), '.cycles.json');

async function run(name) {
  console.log(filePath);

  const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  const match = name.match(/([a-zA-Z0-9_-]+)(\[(\d+)\])?/);

  if (!match) return;

  const identifier = match[1];
  const index = match[3];

  const configuration = jsonData.configurations.find(
    (config) => config.name === identifier
  );

  if (configuration.type != platform()) {
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

module.exports = {
  run,
};
