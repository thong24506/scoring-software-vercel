const Point = require('../models/Point');
const User = require('../models/User');
const { mutipleMongooseToObject, mongooseToObject, mongooseDataInputToDataDB, mongooseTotalScore } = require('../../util/mongoose');

class PointController {

    // [GET] point/create
    create(req, res, next) {
        User.findOne({ userId: req.params.userId, login: true }).lean()
            .then(user => res.render('points/create', { user }))
            .catch(next)
    }

    // [PUT] point/store
    store(req, res, next) {
        Point.find({ userId: req.params.userId })
            .then(points => {
                const indexHK = Number(req.body.HK);
                const dataInput =  mongooseDataInputToDataDB(req.body)
                const pointObj = mutipleMongooseToObject(points);
                let dataDB = pointObj.find(function(point, index) {
                    return point.index === indexHK;
                })
                if(dataDB) {
                    dataDB.data.push(dataInput)
                    mongooseTotalScore(dataDB);
                    Point.updateOne({ _id: dataDB._id }, dataDB)
                        .then(() => res.redirect('back'))
                        .catch(next)
                }
                else {
                    const newObj = {
                        userId: req.params.userId,
                        index: indexHK,
                        data: [
                            dataInput
                        ]
                    }
                    mongooseTotalScore(newObj);
                    dataDB = new Point(newObj);
                    dataDB.save()
                        .then(() => res.redirect('back'))
                        .catch(next);
                }
                
            })
            .catch(next)
    }

    // [GET] /point/:MMH/edit/:userId
    edit(req, res, next) {
        User.findOne({ userId: req.params.userId, login: true }).lean()
            .then(user => {
                Point.find({ userId: req.params.userId })
                .then(points => {
                    points = mutipleMongooseToObject(points);
                    points.map( point => {
                        point.data.map(subjects => {
                            if(subjects.MMH === req.params.MMH) {
                                res.render('me/edit', { subject: subjects, index: point.index, user });
                            }
                        })
                    })
                })
                .catch(next)
            })
            .catch(next)
    }

    // [PUT] /point/:_id
    update(req, res, next) {
        Point.find({ userId: req.params.userId })
            .then(points => {                
                const indexHK = Number(req.body.HK);
                const dataInput =  mongooseDataInputToDataDB(req.body)
                const pointObj = mutipleMongooseToObject(points);
                let dataDB = pointObj.find(function(point, index) {
                    return point.index === indexHK;
                })
                let indexSubjects;
                console.log(points);
                dataDB.data.map((subject, index) => {
                    if(subject._id == req.params._id) {
                        indexSubjects = index;
                        return;
                    }
                })
                dataDB.data[indexSubjects] = dataInput;
                mongooseTotalScore(dataDB);
                Point.updateOne({ _id: dataDB._id }, dataDB)
                    .then(() => res.redirect('/me/show/' + req.params.userId))
                    .catch(next)
            })
            .catch(next)
    }

    // [PUT] /point/:MMH/delete
    delete(req, res, next) {
        Point.find({ userId: req.params.userId })
            .then(points => {                
                const pointObj = mutipleMongooseToObject(points);
                pointObj.map(points => {
                    points.data.map( (subject, index) => {
                        if(subject._id == req.params._id) {
                            points.data.splice(index, 1);
                            mongooseTotalScore(points);
                            if(points.totalScore.TC === 0) {
                                Point.deleteOne({ _id: points._id })
                                    .then(() => res.redirect('back'))
                                    .catch(next);
                            }
                            Point.updateOne({ _id: points._id }, points)
                            .then(() => res.redirect('/me/show/' + req.params.userId))
                            .catch(next)
                        }
                    })
                })
            })
            .catch(next)
    }

    
}

module.exports = new PointController;