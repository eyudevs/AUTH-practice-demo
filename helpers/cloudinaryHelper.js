const cloudinary = require('../config/cloudinary');

const uploadToCloudinary = async (filePath) => {
    try {

    } catch (error) {
        console.error('Error while uploading to cloudinary ', error.message);
        throw new Error('Error while uploading to cloudinary ', error.message);
    }
}

module.exports = {
    uploadToCloudinary
}