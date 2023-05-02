module.exports = {
    mutipleMongooseToObject: function (mongooses) {
        return mongooses.map((mongoose) => mongoose.toObject());
    },
    mongooseToObject: function(mongoose) {
        return mongoose ? mongoose.toObject() : mongoose;
    },
    mongooseDataInputToDataDB: function(body) {
        delete body.HK;
        body.TC = Number(body.TC)
        body.KT = Number(body.KT)
        body.THI = Number(body.THI)
        body.KTRA = Number(body.KTRA)
        body.THIL1 = Number(body.THIL1)
        body.TK10 = Math.round((body.KT / 100 * body.KTRA + body.THI / 100 * body.THIL1 + Number.EPSILON) *10) / 10;
        if(body.TK10 >= 8.5) {
            body.TKCH = 'A';
            body.TK4 = 4;
        }
        else if(body.TK10 < 8.5 && body.TK10 >= 7) {
            body.TKCH = 'B';
            body.TK4 = 3;
        }
        else if(body.TK10 < 7 && body.TK10 >= 5.5) {
            body.TKCH = 'C';
            body.TK4 = 2;
        }
        else if(body.TK10 < 5.5 && body.TK10 >= 4) {
            body.TKCH = 'D';
            body.TK4 = 1;
        }
        else {
            body.TKCH = 'F';
            body.TK4 = 0;
            body.KQ = 'X';
        }
        body.KQ = "Đạt";
        return body;
    },
    mongooseTotalScore: function(point) { 
        let TC = 0, TK10 = 0, TK4 = 0;
        point.data.map(data => {
            if(data) {
                TK10 += data.TK10*data.TC;
                TK4 += data.TK4*data.TC;
                TC += data.TC;
            } 
            else {
                TK10 += 0;
                TK4 += 0;
                TC += 0;
            }

        })
        if(TC !== 0) {
            point.totalScore = {
                TK10: Math.round((TK10/TC + Number.EPSILON) * 100) / 100,
                TK4:  Math.round((TK4/TC + Number.EPSILON) * 100) / 100,
                TC
            }
        }
        else {
            point.totalScore = {
                TK10: 0,
                TK4:  0,
                TC: 0
            }
        }
    }
}