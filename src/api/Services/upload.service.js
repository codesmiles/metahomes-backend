const { errorDey, cloudinary,logger } = require("./imports");

module.exports.uploadImage = async (files) => {
  logger.info("Uploading Files...")
  if (Object.keys(files).length !== 1)
    return logger.error(errorDey(400, "error in req.files length"));

  // check if the file is an image
  const checkIfImage = (img, starterText) => {
    logger.info("Verifying Images...")
    if (!img.mimetype.startsWith(starterText))
      return logger.error(errorDey(400, "Please upload an image file or files"));

    return true;
  };

  for (const imgProp in files) {
    const file = files[imgProp]; // files.image || files[image]

    if (Array.isArray(file)) {
      const imageUrls = [];
      file.forEach((image) => checkIfImage(image, "image"));
      for (const image of file) {
        await cloudinary.uploader.upload(image.tempFilePath, (err, result) => {
          if (err) return logger.error(errorDey(err.message, 500));
          imageUrls.push(result.secure_url);
        });
      }

      logger.info("Image Uploaded Successfully");
      return imageUrls;
    }

    const imgCheck = checkIfImage(file, "image");
    if (imgCheck) {
      return await cloudinary.uploader.upload(
        file.tempFilePath,
        (err, result) => {
          if (err) return logger.error(errorDey(err.message, 500));
          logger.info("Image Uploaded Successfully");
          return result.secure_url;
        }
      );
    }
  }
};
