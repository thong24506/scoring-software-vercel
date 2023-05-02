const User = require('../models/User');
const Point = require('../models/Point');
const { mutipleMongooseToObject, mongooseToObject } = require('../../util/mongoose');
class LoginController {
    //[GET] /
    show(req, res, next) {
        res.render('login');
    }

    //[PUT] /
    login(req, res, next) {
        User.findOne({ userName: req.body.userName })
            .then(user => {
                if(user.validPassword(req.body.password)) {
                    user = mongooseToObject(user)
                    user.login = true;
                    User.updateOne({ userId: user.userId }, user)
                        .then(() => {
                            Point.find({ userId: user.userId }).lean()
                            .then(points => {
                                res.redirect('/home/' + user.userId);
                            })
                            .catch(next)
                        })
                        .catch(next)
                }
                else {
                    res.render('login', { error: 'Tên đăng nhập hoặc mật khẩu không chính xác' });
                }
            })
            .catch(err => {
                res.render('login', { error: 'Tên đăng nhập hoặc mật khẩu không chính xác' });
            })
    }
    //[PATCH] /logout/:userId
    logout(req, res, next) {
        User.findOne({userId: req.params.userId})
            .then(user => {
                user = mongooseToObject(user);
                user.login = false;
                User.updateOne({ userId: user.userId }, user)
                    .then(() => res.redirect('/'))
                    .catch(next)
            })
            .catch(next)
    }
}

module.exports = new LoginController;
