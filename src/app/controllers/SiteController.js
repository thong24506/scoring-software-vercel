const Point = require('../models/Point');
const User = require('../models/User');
const { mutipleMongooseToObject } = require('../../util/mongoose');
class SiteController {
    //[GET] /
    show(req, res, next) {
        User.findOne({login: true}).lean()
            .then(user => {
                Point.find({userId: req.params.userId}).lean()
                    .then(points => res.render('home', { points, user }))
                    .catch(next)
            })
            .catch(next)
    }
}

module.exports = new SiteController;
