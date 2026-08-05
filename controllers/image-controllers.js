const Image = require('../models/image');
const { uploadToCloudinary } = require('../helpers/uploadToCloudinary')

const uploadImage = async (req, res) => {
    try {

        // check if the file is missing 
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "File is required"
            })
        }

        const { url, publicId } = await uploadToCloudinary(req.file.path);

        // now we need to store the url and public ID 

        const newlyUploadedImage = new Image({
            url,
            publicId,
            uploadedBy: req.userInfo.userID
        });

        res.status(201).json({
            success: true,
            message: "image is uploaded",
            image: newlyUploadedImage
        })

    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            success: false,
            message: "Something went wrong"
        })

    }
}

module.exports = {
    uploadImage,
}