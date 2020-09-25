const multer = require('multer');
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'fonts');
    },
    filename: function(req, file, cb){
        cb(null, file.originalname);
    }
});

const font_upload = multer({ storage: storage }).single("file");

module.exports = font_upload;