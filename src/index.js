#!/usr/bin/env node

const program = require('commander');
const path = require('path');
const replicate = require('./replicate');

let sourceDir;
let targetDir;

program
    .version('0.0.1')
    .arguments('<sourceDir> <targetDir>')
    .action(function (source, target) {
        sourceDir = path.resolve(source);
        targetDir = path.resolve(target);
    })
    .parse(process.argv);

if (typeof sourceDir === 'undefined' || typeof targetDir === 'undefined') {
    console.error('need source and target dir !');
    process.exit(1);
}

const main = async () => {
    try {
        process.setMaxListeners(0);
        process.stdout.write(`Reading : ${sourceDir} \n`);
        await replicate(sourceDir, targetDir);
    } catch (e) {
        console.error(e);
        process.exit(2);
    }

    process.exit(0);
}

main();
