const mongoose = require('mongoose');
async function connect() {
    try {
        await mongoose.connect('mongodb+srv://nguyendinhthong:anhladuado1@cluster0.djmldi6.mongodb.net/scoring-software-nodeJS', {
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