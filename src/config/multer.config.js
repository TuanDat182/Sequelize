const multer = require('multer');
const path = require('path');
const crypto = require("crypto");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "..", "..", "public", "images"))
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + crypto.randomBytes(10).toString("hex");
        cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname))
    }
})


const upload = multer({ storage: storage })

module.exports = upload;