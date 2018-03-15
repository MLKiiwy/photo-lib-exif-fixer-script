'use strict';

const utils = require('../src/utils');
const each = require('lodash/each');

describe('utils', () => {
    describe('extractDateFromDir', () => {
        it('extract date from the dir name', () => {

            // YYYY:MM:DD hh:mm:ss
            const cases = [
                {input: '2007-12-07 Soirée raclette', output: '2007:12:07 00:00:00'},
                {input: '2004 Boinet', output: '2004:01:01 00:00:00'},
                {input: '2004-2006 IUT', output: '2004:01:01 00:00:00'},
                {input: '2011-05', output: '2011:05:01 00:00:00'},
                {input: '2015 PC -KL-', output: '2015:01:01 00:00:00'},
            ];

            each(cases, ({input, output}) => {
                expect(utils.extractDateFromDir(input)).toEqual(output);
            });
        });
    });
});
