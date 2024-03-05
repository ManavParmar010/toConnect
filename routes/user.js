const express = require('express');
const {userSignup, userLogin,home} = require('../controllers/user');
const router = express.Router();
const {verifyToken} = require('../middlewares/user')
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,'./uploads/profile')
    },
    filename:(req,file,cb)=>{
        cb(null,`${Date.now()}-${file.originalname}`)
    }
})

const upload = multer({storage:storage})


router.post('/signup',upload.single('file'),userSignup)
router.post('/login',userLogin)
router.get('/',verifyToken, home)
module.exports= router;