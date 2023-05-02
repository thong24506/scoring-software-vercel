const path = require('path');
const port = 3000;
const express = require('express');
const handlebars = require('express-handlebars').engine;
const morgan = require('morgan');
const methodOverride = require('method-override');
const routes = require('./src/routes');
const db = require('./src/config/db');
const { stringify } = require('querystring');
const app = express();

// Connect DB
db.connect();

// Static file
app.use(express.static(path.join(__dirname, 'src', 'public')));

// Express middleware
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());
app.use(methodOverride('_method'));

// HTTP logger
// app.use(morgan('combined'));

// Template engine
app.engine('hbs', handlebars({ 
    extname: '.hbs',
    helpers: {
        sum: (a, b) => a + b,
        schoolYear: (y) => {
            let count = 0;
            while(y > 2) {
                count++;
                y = y - 2;
            }
            return `${2022 + count} - ${2023 + count}`;
        },
    },

}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'src', 'resources', 'views'));

// Route init
routes(app);

// Listen when start app
app.listen(port, () =>
    console.log(`App listening on port http://localhost:${port}`),
);