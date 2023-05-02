const mongoose = require('mongoose');
async function connect() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/scoring-software-node', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connect Successly!')
    }
    catch (error){
        console.log('Connect Failure!')
    }
}

module.exports = { connect };