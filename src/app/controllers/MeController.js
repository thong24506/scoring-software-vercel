const Point = require('../models/Point');
const User = require('../models/User');
const { mutipleMongooseToObject } = require('../../util/mongoose');

class MeController {
    // [GET] /me/show
    show(req, res, next) {
        User.findOne({ userId: req.params.userId, login: true}).lean()
            .then(user => {
                Point.find({ userId: user.userId })
                .then(points => res.render('me/show', { points: mutipleMongooseToObject(points), user }))
                .catch(next)
            })
            .catch(next)
    }
}

module.exports = new MeController;