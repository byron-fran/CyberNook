const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        let hash = crypto.createHash('sha256').update(file.originalname + Date.now()).digest('hex');
        cb(null, hash + path.extname(file.originalname));
    }
});