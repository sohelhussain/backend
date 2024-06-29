const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "./uploads");
    },
    filename: function(req, file, cb){
        const uniqname = Date.now() + "-" + Math.round(Math.random() * 1e9) + path.extname(file.originalname);
        cb(null, uniqname);
    }
});

const upload = multer({storage: storage}); // multer method ko call karke usse bta dena he ki multer storage me storage konsa hai vo storage bta dena he

module.exports = upload;