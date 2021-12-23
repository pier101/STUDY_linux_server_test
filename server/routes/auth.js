
const express = require("express");
const passport = require("passport");
const crypto = require('crypto')
const User = require("../models/user");
const { session } = require("passport");
const {auth , notAuth} = require('../middleware/auth')
const router = express.Router();


router.post("/register",notAuth, async (req, res, next) => {
    console.log("회원가입 요청")
    const { email,password, nick} = req.body;
    console.log(email)
    try {
        const isUserMail = await User.findOne({ where: { email: email } });
        console.log(isUserMail)
        if(isUserMail) {
            console.log('가입된 email이 있습니다.')
            return res.send("email존재");
        } else{
            const pwd = crypto.createHash('sha256').update(password).digest('base64')
           
            await User.create({
                email: email,
                nick: nick,
                password: pwd,
            });
            return res.send(true)
        }
    } catch (error) {
        console.error(error);
        return next(error);
    }
});

router.get('/loginCheck',(req,res)=>{
    console.log("서버에서 로그인 됐는지 체크 중")
    console.log(req.session.passport)
    if(req.session.passport){
        res.send({loggedIn : true, loginData: req.session})
    }else{
        res.send({loggedIn : false})
    }
})

router.post('/login/', (req, res,next) => {
    console.log("로그인 왔다")
    const exUser = User.findOne({
        where: {
          email: req.body.email,
        }
    })
    const {email,password}=req.body;
    console.log(passport.authenticate)
    passport.authenticate('local', (err, user, info) => {
        if (err) {
          res.json({ loginSuccess: false });
        }
        if (info) {
          return res.json({ loginSuccess: false });
        }
        return req.login(user, async (loginErr) => {
          if (loginErr) {
            return res.json({ loginSuccess: false });
          }
          return res.status(200).json({ loginSuccess: true, userId: exUser.id });
        });
      })(req, res, next);
});


router.post('/logout',auth, (req,res)=>{
    console.log("로그아웃 요청 들어옴")
    req.logout();
    console.log(req.session)
    req.session.destroy();
    console.log(req.session)
    res.status(200).send('ok');
})


module.exports = router;