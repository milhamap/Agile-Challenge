const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const multer = require('multer');

const foodRouter = require('./src/routes/foods');
const userRouter = require('./src/routes/users');

require('dotenv').config();

const app = express();

const fileStorage = multer.diskStorage({
    filename: (req, file, cb) => {
        cb(null, new Date().getTime() + '-' + file.originalname);
    },
    destination: (req, file, cb) => {
        cb(null, '../frontend/public/uploads');
    }
});

const fileFilter = (req, file, cb) => {
    if ( 
        file.mimetype === 'image/png' || 
        file.mimetype === 'image/jpg' || 
        file.mimetype === 'image/jpeg'
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(multer({storage: fileStorage, fileFilter: fileFilter}).single('image'))
app.use(cookieParser());
app.use(cors());
app.use(morgan('dev'));

app.use('/foods', foodRouter);
app.use('/users', userRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port http://localhost:${process.env.PORT}`);
})

module.exports = app;