#!/usr/bin/env node

const program = require('commander');

let sourceDir;
let targetDir;

program
    .version('0.0.1')
    .arguments('<sourceDir> <targetDir>')
    .action(function (source, target) {
        sourceDir = dir;
        targetDir = targetDir;
    })
    .parse(process.argv);

if (typeof sourceDir === 'undefined' ||  typeof targetDir === 'undefined') {
    console.error('need source and target dir !');
    process.exit(1);
}

// Open source directory
