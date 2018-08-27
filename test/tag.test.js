'use strict';

const { resolve } = require('path');
const tag = require('../src/tag');
const reader = require('../src/reader');

describe('tag', () => {
    const targetImagePath = resolve(__dirname, '../result/tagged.jpg');
    const name = 'name';
    const cleanName = 'clean_name';
    const newDate = new Date('');

    describe('image with empty metadata', () => {
        const emptyImagePath = resolve(__dirname, '../images/empty.jpg');

        it('write new date, description and comment', async () => {
            expect(await tag(emptyImagePath, targetImagePath, newDate, name, cleanName)).toBeTruthy();
            const newValues = reader(targetImagePath);
            expect(newValues).toEqual({});
        });
    });
});
