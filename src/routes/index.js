const loginRouter = require('./login');
const registerRouter = require('./register');
const siteRouter = require('./site');
const pointRouter = require('./point');
const meRouter = require('./me');

function routes(app) {
    app.use('/me', meRouter);
    app.use('/point', pointRouter);
    app.use('/home', siteRouter);
    app.use('/register', registerRouter);
    app.use('/', loginRouter);
}

module.exports = routes;