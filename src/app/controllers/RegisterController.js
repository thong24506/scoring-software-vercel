const User = require('../models/User');
const { mutipleMongooseToObject, mongooseToObject, mongooseDataInputToDataDB, mongooseTotalScore } = require('../../util/mongoose');

class RegisterController {
    //[GET] /register
    show(req, res, next) {
        res.render('register');
    }
    //[POST] /register/perform
    perform(req, res, next) {
        User.findOne({userName: req.body.userName}).lean()
            .then(user => {
                if(req.body.password !== req.body.rePassword) {
                    res.render('register', {error: 'Nhập lại mập khẩu không chính xác', user: req.body ,active: 'active'})
                }
                else if(user === null) {
                    const userId = req.body.userName + '_id_' + Math.floor(Math.random() * 1000000);
                    const userDB = new User();
                    userDB.userId = userId;
                    userDB.name = req.body.name;
                    userDB.userName = req.body.userName;
                    userDB.password =  userDB.encryptPassword(req.body.password);
                    userDB.login = false;
                    userDB.save()
                        .then(() => res.redirect('/'))
                        .catch(next)
                }
                else {   
                    res.render('register', {error: 'Tên đăng nhập đã tồn tại'})
                }
            })
            .catch(next)
    }
}

module.exports = new RegisterController;