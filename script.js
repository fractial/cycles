const os = require('os');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const exec = promisify(require('child_process').exec);

const platform = os.platform();

const filePath = path.join(__dirname, '.cycles/run.json');

async function add(type, name, scripts) {
    const jsonData = JSON.parse(await fs.promises.readFile(filePath, 'utf-8'));
    
    const nameExists = jsonData.configurations.some(config => config.name === name);
    
    if (nameExists) {
        return;
    }
    
    scripts = scripts.split('||');
    
    console.log(scripts);
    
    const newConfiguration = {
        type: type || platform,
        name: name,
        scripts: scripts,
    }
    
    jsonData.configurations.push(newConfiguration);
    
    const newConfigurations = JSON.stringify(jsonData, null, 2);
    
    await fs.promises.writeFile(filePath, newConfigurations);
}

async function run(name) {
    const data = JSON.parse(await fs.promises.readFile(filePath, 'utf-8'));

    const match = name.match(/([a-zA-Z]+)(\[(\d+)\])?/);
    
    if (!match) {
        return;
    }
    
    const identifier = match[1];
    const index = match[3];
    
    const configuration = data.configurations.find(config => config.name === identifier);
    
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

module.exports = {add, run};