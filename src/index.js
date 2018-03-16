#!/usr/bin/env node

const program = require('commander');
const fs = require('fs-promise');
const path = require('path');
const Filehound = require('filehound');
const { tag } = require('./tag');

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
        process.stdout.write(`Reading : ${sourceDir} \n`);
        const directories = await Filehound.create().depth(1).paths(sourceDir).directory().find();
        process.stdout.write(`Processing ${directories.length} directories \n`);
        each(directories, dir => {
            const photos = await Filehound.create().depth(0).paths(dir).ext(['.jpeg', '.JPG', '.JPEG', '.jpg']).find();
            process.stdout.write(`Processing ${photos.length} photos in : ${dir} content \n`);
            await Promise.all(photos.map(photo => tag(photo, dir, targetDir)));
            process.stdout.write(`End of processing in : ${dir} content \n`);
        });
    } catch (e) {
        console.error(e);
        process.exit(2);
    }

    process.exit(0);
}

main();
