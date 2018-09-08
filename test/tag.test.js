'use strict';

const { resolve } = require('path');
const tag = require('../src/tag');
const reader = require('./reader');
const moment = require('moment');

describe('tag', () => {
    const targetImagePath = resolve(__dirname, 'result/tagged.jpg');
    const name = 'name';
    const cleanName = 'clean_name';
    const newDate = moment('2017-12-17T03:24:00');

    describe('image with empty metadata', () => {
        const emptyImagePath = resolve(__dirname, 'images/empty.jpg');

        it('write new date, description and comment, on empty image', async () => {
            await tag(emptyImagePath, targetImagePath, newDate, name, cleanName);
            const newValues = await reader(targetImagePath);
            expect(newValues).toMatchObject({
                "DateTimeOriginal": {
                    "description": "2017:12:17 03:24:00",
                    "value": [
                        "2017:12:17 03:24:00"
                    ],
                },
                "DateTime": {
                    "description": "2017:12:17 03:24:00",
                    "value": [
                        "2017:12:17 03:24:00"
                    ],
                },
                "DateTimeDigitized": {
                    "description": "2017:12:17 03:24:00",
                    "value": [
                        "2017:12:17 03:24:00"
                    ],
                },
                "UserComment": {
                    "description": "Undefined",
                    "value": [
                        "clean_name",
                    ],
                },
                "ImageDescription": {
                    "description": "name",
                    "value": [
                        "name",
                    ],
                },
            });
        });
    });

    describe('image with all fields date set to 2018-08-27', () => {
        const emptyImagePath = resolve(__dirname, 'images/with_date_27-08-2018-20-00-00.jpg');

        it('write nothing except name and clean name because date after 1999 already set on image for all fields', async () => {
            await tag(emptyImagePath, targetImagePath, newDate, name, cleanName);
            const newValues = await reader(targetImagePath);
            expect(newValues).toMatchObject({
                "DateTimeOriginal": {
                    "description": "2018:08:27 20:00:00",
                    "value": [
                        "2018:08:27 20:00:00"
                    ],
                },
                "DateTime": {
                    "description": "2018:08:27 20:00:00",
                    "value": [
                        "2018:08:27 20:00:00"
                    ],
                },
                "DateTimeDigitized": {
                    "description": "2018:08:27 20:00:00",
                    "value": [
                        "2018:08:27 20:00:00"
                    ],
                },
                "UserComment": {
                    "description": "Undefined",
                    "value": [
                        "clean_name",
                    ],
                },
                "ImageDescription": {
                    "description": "name",
                    "value": [
                        "name",
                    ],
                },
            });
        });
    });

    describe('image with all fields date set to 1995-08-27', () => {
        const emptyImagePath = resolve(__dirname, 'images/with_date_27-08-1995-20-00-00.jpg');

        it('write new dates, name and clean name because date is before 1999 on image', async () => {
            await tag(emptyImagePath, targetImagePath, newDate, name, cleanName);
            const newValues = await reader(targetImagePath);
            expect(newValues).toMatchObject({
                "DateTimeOriginal": {
                    "description": "2017:12:17 03:24:00",
                    "value": [
                        "2017:12:17 03:24:00"
                    ],
                },
                "DateTime": {
                    "description": "2017:12:17 03:24:00",
                    "value": [
                        "2017:12:17 03:24:00"
                    ],
                },
                "DateTimeDigitized": {
                    "description": "2017:12:17 03:24:00",
                    "value": [
                        "2017:12:17 03:24:00"
                    ],
                },
                "UserComment": {
                    "description": "Undefined",
                    "value": [
                        "clean_name",
                    ],
                },
                "ImageDescription": {
                    "description": "name",
                    "value": [
                        "name",
                    ],
                },
            });
        });
    });


    describe('image with only date time original field date set to 2001-04-07 and custom description, comment', () => {
        const emptyImagePath = resolve(__dirname, 'images/with_date_original_2001-04-07-custom-description.jpg');

        it('write new dates, name and clean name because date is before 1999 on image', async () => {
            await tag(emptyImagePath, targetImagePath, newDate, name, cleanName);
            const newValues = await reader(targetImagePath);
            expect(newValues).toMatchObject({
                "DateTimeOriginal": {
                    "description": "2001:04:07 01:01:00",
                    "value": [
                        "2001:04:07 01:01:00"
                    ],
                },
                "DateTime": {
                    "description": "2001:04:07 01:01:00",
                    "value": [
                        "2001:04:07 01:01:00"
                    ],
                },
                "DateTimeDigitized": {
                    "description": "2001:04:07 01:01:00",
                    "value": [
                        "2001:04:07 01:01:00"
                    ],
                },
                "UserComment": {
                    "description": "Undefined",
                    "value": [
                        "ASCII",
                        undefined,
                        undefined,
                        "custom comment",
                    ],
                },
                "ImageDescription": {
                    "description": "custom description",
                    "value": [
                        "custom description",
                    ],
                },
            });
        });
    });

    describe('image with a good descrption read by google photo', () => {
        const imagePath = resolve(__dirname, 'images/empty_with_description.jpg');

        it.only('write new dates, name and clean name because date is before 1999 on image', async () => {
            // await tag(emptyImagePath, targetImagePath, newDate, name, cleanName);
            const newValues = await reader(imagePath);
        });
    });
});
