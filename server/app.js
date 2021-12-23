const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const session = require('express-session');
const dotenv = require('dotenv');
const passport = require("passport");
const passportConfig = require("./passport");
const { sequelize } = require('./models');
const cors = require('cors')
const authRouter = require('./routes/auth');    
const FileStore = require('session-file-store')(session)
const path =require('path')


dotenv.config();
const app = express();
passportConfig(passport); // 패스포트 설정

const port = 5000;

sequelize.sync({ force: false })
.then(() => {
  console.log('데이터베이스 연결 성공');
})
.catch((err) => {
  console.error(err);
});
app.use(morgan('dev'));
app.use(express.json());
// app.use(express.static(path.join(__dirname, "client", "build")));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true, 
}));
app.use(session({
  resave: false,
  secret: process.env.COOKIE_SECRET,
  saveUninitialized: false,
  cookie: {
    expires: 60 * 60 * 24,
    httpOnly:true,
    secure:false,
  },
  store:new FileStore()
}));
app.use(passport.initialize());
app.use(passport.session());

// middleware

// route
// app.get("/*", function (req, res) {
//   res.sendFile(__dirname + "/client/build/index.html");
// });


// app.use('/auth', authRouter)
app.use('/api/auth', authRouter)

/* 404 처리 */
app.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error); 
});

/* error 처리 */
app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500);
    res.status(500).json({err});
});
app.listen(port, () => {
  console.log(`${port}번 포트에 연결`);
});