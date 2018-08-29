#!/usr/bin/env node

const program = require('commander');
const fs = require('fs-promise');
const path = require('path');
const Filehound = require('filehound');
const { tag } = require('./tag');
const Promise = require('bluebird');
const moment = require('moment');
const { extractDateFromDir, extractCleanPhotoNameFromDir, extractReadableNameFromDir, generateNewPhotoName } = require('./utils');

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
        await Promise.each(directories, async dir => {
            const photos = await Filehound.create().depth(0).paths(dir).ext(['.jpeg', '.JPG', '.JPEG', '.jpg']).find();
            const date = moment(extractDateFromDir(dir), 'YYYY:MM:DD HH:mm:ss');
            const cleanName = extractCleanPhotoNameFromDir(dir);
            const readableName = extractReadableNameFromDir(dir);
            process.stdout.write(`Processing ${photos.length} photos in : ${dir} content \n`);
            await Promise.all(photos.map(photo => tag(photo, `${targetDir}/${generateNewPhotoName(photo, dir)}.jpg`, date, `${readableName} ${photo}`, `${cleanName} ${photo}`)));
            process.stdout.write(`End of processing in : ${dir} content \n`);
        });
    } catch (e) {
        console.error(e);
        process.exit(2);
    }

    process.exit(0);
}

main();
