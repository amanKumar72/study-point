const cloudinary = require("cloudinary").v2;

const uploadImage = async (file, folder, height, quality) => {
  try {
    const options = { folder };
    if (height) {
      options.height = height;
    }
    if (quality) {
      options.quality = quality;
    }
    options.resource_type = "auto";
    return await cloudinary.uploader.upload(file.tempFilePath, options);
  } catch (error) {
    console.log("error in uploading image");
    return error.message;
  }
};

const deleteImageByUrl = async (secureUrl) => {
  try {
      // Extract public_id from the secure URL
      const parts = secureUrl.split("/");
      const fileName = parts[parts.length - 1]; // e.g., "example.jpg"
      const folder = parts[parts.length - 2];   // e.g., "uploads"

      const publicId = `${folder}/${fileName.split(".")[0]}`; // Remove file extension

      // Delete image from Cloudinary
      const result = await cloudinary.uploader.destroy(publicId);
      console.log("Delete Result:", result);

      return result;
  } catch (error) {
      console.error("Error deleting image:", error);
      throw error;
  }
};

module.exports = { uploadImage, deleteImageByUrl };
