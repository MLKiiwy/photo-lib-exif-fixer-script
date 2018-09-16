# Script to batch edit Exif metatags on photos / videos

I have a huge library of photos and videos from 1975 - 2018, some are not tagged with correct exif tag (specially the datetime original metadata info). It's an issue specially if you want to import your photos to Google photos.

So I decided to write this script to edit all my photos/videos on one shot !

Idea is simple, all my photos/videos are organized like this: 

+ rootDir
    + XXXX-MM-DD Album_name
        + photo1.jpg
        + photo2.jpg
        + video1.mpg
            + subdir
                + photo1.jpg
    + XXXX-MM Album_name
        + photo1.JPG
        + photo2.jpg
    + XXXX Album_name
  
The root dir contain subdirectories, the name of these subdirectories start by the date in format XXXX-MM-DD with months and days not mandatory.

Rule is simple: each videos or photos from the subdirectories (with unlimited depth) will have the date of the directory applied as Exif DateTimeOriginal tag. But with one more rule: if the datetime original exist and is after 2001, the date should not be overrided. 

The original data are not modified, the script copies all the element with same directory structure in another dir.

### Next step after run : import to google photo

Use the official sync client from google to import the library to google photo.
The google photo timeline should be exact !

### Next improvement : create a second script to re-create albums on google photo

See #2

## Install 

Required : yarn of nvm

```bash
yarn install
```

## Usage

```bash
node ./src/index.js /path/to/sourceRootDir /path/to/resultDir 
```

To get some help : 

```bash
node ./src/index.js --help
```

## Contributing 

### Tests

```bash
yarn test
```
