'use strict';

const utils = require('../src/utils');
const each = require('lodash/each');

describe('utils', () => {
    describe('extractDateFromDir', () => {
        it('extract date from the dir name', () => {
            const cases = [
                { input: '2007-12-07 Soirée raclette', output: '2007:12:07 00:00:00' },
                { input: '2007-12-07 Soirée raclettËê #plop', output: '2007:12:07 00:00:00' },
                { input: '2004 Boinet', output: '2004:01:01 00:00:00' },
                { input: '2004 IUT', output: '2004:01:01 00:00:00' },
                { input: '2011-05', output: '2011:05:01 00:00:00' },
                { input: '2015 PC -KL-', output: '2015:01:01 00:00:00' },
                { input: '2015-2020 PC -KL-', output: '2015:20:01 00:00:00' },
            ];

            each(cases, ({ input, output }) => {
                expect(utils.extractDateFromDir(input)).toEqual(output);
            });
        });
    });

    describe('extractCleanPhotoNameFromDir', () => {
        it('extract clean photo name from dir', () => {
            const cases = [
                { input: '2007-12-07 Soirée raclette', output: 'soiree_raclette' },
                { input: '2007-12-07 Soirée raclettëËê #-*=)(plop', output: 'soiree_raclett_plop' },
                { input: '2004 Boinet', output: 'boinet' },
                { input: '2004 IUT', output: 'iut' },
                { input: '2011-05', output: '2011_05' },
                { input: '2015 PC -KL-', output: 'pc_kl' },
            ];

            each(cases, ({ input, output }) => {
                expect(utils.extractCleanPhotoNameFromDir(input)).toEqual(output);
            });
        });
    });

    describe('extractReadableNameFromDir', () => {
        it('extract readable photo name from dir', () => {
            const cases = [
                { input: '2007-12-07 Soirée raclette', output: 'Soirée raclette' },
                { input: '2007-12-07 Soirée raclettëËê #-*=)(plop', output: 'Soirée raclettëËê #-*=)(plop' },
                { input: '2004 Boinet', output: 'Boinet' },
                { input: '2004 IUT', output: 'IUT' },
                { input: '2011-05', output: '2011-05' },
                { input: '2015 PC -KL-', output: 'PC -KL-' },
            ];

            each(cases, ({ input, output }) => {
                expect(utils.extractReadableNameFromDir(input)).toEqual(output);
            });
        });
    });

    describe('generateNewPhotoName', () => {
        it('generate photo name from dir', () => {
            const cases = [
                { input: ['/path/to/PSCN1522.JPG', '2007-12-07 Soirée raclette'], output: 'soiree_raclette-PSCN1522' },
                { input: ['/path/to/PSCN1522.JPG', '2007-12-07 Soirée raclette super longue'], output: 'soiree_raclette_super_longue-PSCN1522' },
            ];

            each(cases, ({ input, output }) => {
                expect(utils.generateNewPhotoName(input[0], input[1])).toEqual(output);
            });
        });
    });

    describe('generateNewPath', () => {
        it('generate new path', () => {
            const cases = [
                { input: ['/sourcePath/src', '/dest', '2007-12-07 Soirée raclette', '/sourcePath/src/path/1/sub/to/PSCN1522.JPG'], output: '/dest/path/1/sub/to/soiree_raclette-PSCN1522.jpg' },
                { input: ['/sourcePath/src/a/b', '/dest', '2007-12-07 Soirée raclette', '/sourcePath/src/a/b/path/1/sub/to/1 2 5 7.MPG'], output: '/dest/path/1/sub/to/soiree_raclette-1 2 5 7.mpg' },
                { input: ['/sourcePath/src/a/b', '/dest', '2007-12', '/sourcePath/src/a/b/path/1/sub/to/1 2 5 7.mp4'], output: '/dest/path/1/sub/to/2007_12-1 2 5 7.mp4' },
            ];

            each(cases, ({ input, output }) => {
                expect(utils.generateNewPath(input[0], input[1], input[2], input[3])).toEqual(output);
            });
        });
    });
});
