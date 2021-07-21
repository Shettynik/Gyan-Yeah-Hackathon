const multer = require("multer");
const aws = require("aws-sdk");
const multerS3 = require("multer-s3");

aws.config.update({
    accessKey: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.REGION
});

const s3 = new aws.S3();

const storage = multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET_NAME,
    cacheControl: 'max-age=31536000',
	contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function (req, file, cb) {
        const d = new Date();
          const FileName = d.toISOString().slice(0, 10) + 'T' + (d.getTime().toString()) + (Math.floor(Math.random() * 1e+10).toString());
        cb(null, FileName + '.mp4');
    }
});

const UploadStorage = multer({
    storage: storage,
    fileFilter: function (req, file, callback) {
		if (file) {
			// var ext = path.extname(file.originalname).toLowerCase();
			// if (
			// 	ext !== '.mp4' &&
			// 	ext !== '.webm' &&
			// 	ext !== '.mpeg' &&
            //     ext !== '.m4p' &&
            //     ext !== '.mpe'
			// ) {
			// 	return callback(
			// 		'Only videos are allowed, Given file extension '
			// 	);
			// }
			callback(null, true);
		} else {
			return callback('No video provided');
		}
	}
}).single("video");


module.exports = {
    UploadStorage
}