const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const db = mongoose.connection
const app = express()
const port = process.env.PORT || 5000
const contests = require('./models/contest')
const user = require('./models/User')
const objId = mongoose.Types.ObjectId
db.once('open', () => { console.log("connected to mongo db") })
mongoose.connect('mongodb://localhost/pathfinder');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.get('/api/getcontestdata', (req, res) => {
    contests.find().sort({ 'startTime': -1 }).exec((err, contest) => {
        res.send(contest)
    })
});

app.post('/api/signin', (req, res) => {
    user.create({
        id: req.body.id,
        name: req.body.name,
        provider: req.body.provider,
        star: new Array,
        thumbsUp: new Array
    })
    res.json({ result: 1 })
})

app.post('/api/thumbsup', (req, res) => {
    user.find().where('id').equals(req.body.id)
        .where('thumbsUp').equals(new objId(req.body.contestId)).exec((err, ret) => {
            if (err) { console.log("/api/thumbsup", err); return; }

            if (ret.length > 0) res.json({ ret: 1 });
            else res.json({ ret: 0 });
        })
})

app.post('/api/thumbsup/add', (req, res) => {
    const contestId = new objId(req.body.contestId)
    const id = req.body.id
    //해당 contest에 따봉 1 추가
    contests.findOneAndUpdate(
        { "_id": contestId },
        { $inc: { thumbsup: 1 } },
        (err, data) => {
            if (err) { console.log("/api/thumbsup/add contest", err); return; }
        }
    ).then(() => {
        console.log("/api/thumbsup/add user In")
        //user에 따봉 한 contest의 id 추가
        user.findOneAndUpdate(
            { "id": id },
            { $addToSet: { thumbsUp: contestId } },
            (err, data) => {
                if (err) { console.log("/api/thumbsup/add user", err); res.json({ ret: 0 }); }
                res.json({ ret: 1 })
            }
        )
    })

})

app.post('/api/thumbsup/cancle', (req, res) => {
    const contestId = new objId(req.body.contestId)
    const id = req.body.id
    //해당 contest에 따봉 1 삭제
    contests.findOneAndUpdate(
        { "_id": contestId, "thumsup": { "$lt": 0 } },
        { $inc: { thumbsup: -1 } },
        (err, data) => {
            if (err) { console.log("/api/thumbsup/cancle contest", err); return; }
        }
    ).then(() => {
        console.log("/api/thumbsup/add user In")
        //user에 따봉 한 contest의 id 삭제
        user.findOneAndUpdate(
            { "id": id },
            { $pull: { thumbsUp: contestId } },
            (err, data) => {
                if (err) { console.log("/api/thumbsup/add user", err); res.json({ ret: 0 }); }
                res.json({ ret: 1 })
            }
        )

    })
})

app.post('/api/star', (req, res) => {
    user.find().where('id').equals(req.body.id)
        .where('star').equals(new objId(req.body.contestId)).exec((err, ret) => {
            if (err) { console.log("/api/star", err); return; }
            if (ret.length > 0) res.json({ ret: 1 });
            else res.json({ ret: 0 });
        })
})

app.post('/api/getstared', (req, res) => {
    
    user.find().select('star').where('id').equals(req.body.id)
        .exec(async (err, ret) => {
            if (err) { console.log("/api/getstared", err); return; }
            if(ret) res.send(ret)
        });
})


app.post('/api/getthumbsUp', (req, res) => {
    
    user.find().select('thumbsUp').where('id').equals(req.body.id)
        .exec(async (err, ret) => {
            if (err) { console.log("/api/getthumbsUp", err); return; }
            if(ret) res.send(ret)
        });
})

app.post('/api/getstared/contest', (req, res) => {
    contests.findOne().where('_id').equals(new objId(req.body.id))
        .exec(async (err, ret) => {
            if (err) { console.log("/api/getstared/contest", err); return; }
            if(ret) res.send(ret)
        });    
})


app.post('/api/getthumbsUp/contest', (req, res) => {
    contests.findOne().where('_id').equals(new objId(req.body.id))
        .exec(async (err, ret) => {
            if (err) { console.log("/api/getthumbsUp/contest", err); return; }
            if(ret) res.send(ret)
        });    
})


app.post('/api/star/add', (req, res) => {
    const contestId = new objId(req.body.contestId)
    const id = req.body.id

    //user에 star 한 contest의 id 추가
    user.findOneAndUpdate(
        { "id": id },
        { $addToSet: { star: contestId } },
        (err, data) => {
            if (err) { console.log("/api/star/add user", err); res.json({ ret: 0 }); }
            res.json({ ret: 1 })
        }
    )
})


app.post('/api/star/cancle', (req, res) => {
    const contestId = new objId(req.body.contestId)
    const id = req.body.id
    console.log("/api/star/cancle user In")
    //user에 star 한 contest의 id 삭제
    user.findOneAndUpdate(
        { "id": id },
        { $pull: { star: contestId } },
        (err, data) => {
            if (err) { console.log("/api/star/cancle user", err); res.json({ ret: 0 }); }
            res.json({ ret: 1 })
        }
    )

})


db.once('open', () => { console.log("connected to mongo db") })
mongoose.connect('mongodb://localhost/pathfinder');

app.listen(port, () => console.log(`Listening on port ${port}`))