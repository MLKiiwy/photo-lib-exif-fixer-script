const Filehound = require("filehound");
const Promise = require("bluebird");
const moment = require("moment");
const path = require("path");
const exiftoolBin = require("dist-exiftool");
const exiftool = require("node-exiftool");
const {
  extractDateFromDir,
  extractCleanPhotoNameFromDir,
  extractReadableNameFromDir,
  generateNewPath
} = require("./utils");
const tag = require("./tag");

module.exports = async (sourceDir, targetDir) => {
  const fullTargetDir = path.resolve(targetDir);
  const fullSourceDir = path.resolve(sourceDir);
  const directories = await Filehound.create()
    .depth(1)
    .paths(fullSourceDir)
    .directory()
    .find();
  const ep = new exiftool.ExiftoolProcess(exiftoolBin);

  try {
    await ep.open();
    process.stdout.write(`Processing ${directories.length} directories \n`);

    await Promise.each(directories, async dir => {
      const dirname = path.basename(dir);
      const date = moment(extractDateFromDir(dirname), "YYYY:MM:DD HH:mm:ss");
      const cleanName = extractCleanPhotoNameFromDir(dirname);
      const readableName = extractReadableNameFromDir(dirname);

      const photos = await Filehound.create()
        .depth(10)
        .paths(dir)
        .ext([".jpeg", ".JPG", ".JPEG", ".jpg"])
        .find();
      process.stdout.write(
        `Processing ${photos.length} photos in : ${dirname} content \n`
      );
      await Promise.all(
        photos.map(photo => {
          const targetPath = generateNewPath(
            fullSourceDir,
            fullTargetDir,
            dirname,
            photo
          );
          return tag(ep, photo, targetPath, date, readableName, cleanName);
        })
      );

      const videos = await Filehound.create()
        .depth(10)
        .paths(dir)
        .ext([
          ".avi",
          ".AVI",
          ".mpg",
          ".MPG",
          ".mp4",
          ".MP4",
          ".flv",
          ".FLV",
          ".mov",
          ".MOV"
        ])
        .find();
      process.stdout.write(
        `Processing ${videos.length} videos in : ${dirname} content \n`
      );
      await Promise.all(
        videos.map(video => {
          const targetPath = generateNewPath(
            fullSourceDir,
            fullTargetDir,
            dirname,
            video
          );
          return tag(ep, video, targetPath, date, readableName, cleanName);
        })
      );

      process.stdout.write(`End of processing in : ${dirname} content \n`);
    });
    return ep.close();
  } catch (error) {
    return ep.close();
  }
};
