'use strict';

const { resolve } = require('path');
const { tag } = require('../src/tag');
const reader = require('./reader');

describe('tag', () => {
    const targetImagePath = resolve(__dirname, 'result/tagged.jpg');
    const name = 'name';
    const cleanName = 'clean_name';
    const newDate = new Date('2017-12-17T03:24:00Z');

    describe('image with empty metadata', () => {
        const emptyImagePath = resolve(__dirname, 'images/empty.jpg');

        it('write new date, description and comment', async () => {
            await tag(emptyImagePath, targetImagePath, newDate, name, cleanName);
            const newValues = await reader(targetImagePath);
            expect(newValues).toEqual({
                "DateTimeOriginal": {
                    "description": "2017-12-17T03:24:00.000Z",
                    "value": [
                        "2017-12-17T03:24:00.000Z",
                    ],
                },
                "Exif IFD Pointer": {
                    "description": 26,
                    "value": 26,
                },
                "MakerNote": {
                    "description": "[Raw maker note data]",
                    "value": [
                        110,
                        97,
                        109,
                        101,
                    ],
                },
                "UserComment": {
                    "description": "Undefined",
                    "value": [
                        "clean_name",
                    ],
                },
            });
        });
    });
});
