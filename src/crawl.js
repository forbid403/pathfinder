const cheerio = require('cheerio');
const puppeteer = require('puppeteer')
const axios = require('axios')
const contestModel = require('../models/contest')
const mongoose = require('mongoose')
const schedule = require('node-schedule');
const nodemailer = require('nodemailer')
const db = mongoose.connection
db.once('open', () => { console.log("connected to mongo db") })
mongoose.connect('mongodb://localhost/pathfinder');

getContests = async () => {
    console.log("GETCONTESTS IN")
    //매번 오전 12시에 알람
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    contestModel.find({"startTime" : {"$gte": today.toISOString(), "$lt": tomorrow.toISOString()}}, (err, con)=>{
        if(err) console.log("error : ", err)
        console.log(con)
    })
}
sendMail = (email, title, time, url)=>{
    
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'pathfinder1217@gmail.com',  // gmail 계정 아이디를 입력
          pass: 'pathfinder1234!'          // gmail 계정의 비밀번호를 입력
        }
      });
    
      let mailOptions = {
        from: 'pathfinder1217@gmail.com',    // 발송 메일 주소 (위에서 작성한 gmail 계정 아이디)
        to: email,                     // 수신 메일 주소
        subject: 'Your' + title +'is Starting Tommorrow at ' + time +'.',   // 제목
        text: 'Your' + title +'is Starting Tommorrow at ' + time +'.\n'
        + 'Check it! -> ' + url +' \n'  // 내용
      };
    
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        }
        else {
          console.log('Email sent: ' + info.response);
        }
      });
}


schedule.scheduleJob('0 10 * * *', () => {
    console.log("schedule")

    getAtcoder().then(html => {
        console.log("Crawl Atcoder...")

        let ulList = []
        let temp = []
        let timeList = []
        let durationList = []
        let ret = []
        const $ = cheerio.load(html.data)
        const $bodyList = $(".col-sm-8").find(".panel").find(".panel-body")

        $bodyList.each((i, elem) => {
            ulList[i] = ($(elem).text())
        })

        for (var i = 1; i < $bodyList.length; i++) {
            let strList = ulList[i].split("\n")

            temp[i] = new Array()
            for (var j = 2; j < 5; j++) {
                let data = strList[j].split(": ")
                temp[i].push(data[1])
            }

            let durRet = temp[i][1].split("iso=")
            let durRet2 = durRet[1].split("&")
            timeList[i] = durRet2[0]

            let num = temp[i][2].split(" ")
            let duration = (num[1] / 60).toString()
            durationList[i] = duration.substr(0, 3)
        }

        const $title = $(".col-sm-8").find(".panel")
        $title.each((i, elem) => {
            ret[i] = {
                title: $(elem).find(".panel-title").text(),
            }
        })

        for (var i = 1; i < ret.length; i++) {
            saveModel("Atcoder", ret[i].title, timeList[i], durationList[i], temp[i][0])
        }
        console.log("Atcoder save complete")
    }).then(() => getLeetCode())
});

const getAtcoder = async () => {
    try { return await axios.get("https://atcoder.jp/") }
    catch (err) { console.log(err) }
}

async function getLeetCode() {
    console.log("Crawl Leetcode...")
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // 수집하고자 하는 URL을 입력
    await page.goto('https://leetcode.com/contest/');

    const timeWork = await page.waitFor(".time");
    const time = await page.evaluate(timeWork => timeWork.textContent, timeWork);

    const durationWork = await page.waitFor("div.intro");
    const duration = await page.evaluate(durationWork => durationWork.textContent, durationWork);

    const titleWork = await page.waitFor("div.card-title");
    const title = await page.evaluate(titleWork => titleWork.textContent, titleWork);

    const parent = await page.waitFor("div.contest-card");
    const link = await parent.$eval('a', a => a.getAttribute('href'));

    await browser.close()


    const durationOutput = duration.split("hour")
    let hour = durationOutput[0].match(/\d/g);
    minute = durationOutput[1].match(/\d/g)
    hour = hour.join("")
    minute = minute.join("")
    if (minute.length != 0) {
        minute /= 60
    }
    const durationRet = Number(hour) + Number(minute)
    const contestURL = "https://leetcode.com/contest" + link

    saveModel("leetcode", title, time, durationRet, contestURL)
    console.log("Leetcode save complete!")
}

saveModel = (site, title, time, duration, url) => {
    console.log("TIME", site, ":",time)
    if(title === 'leetcode'){
        
    }
    contestModel.create({
        site: site,
        title: title,
        startTime: new Date(time.substring(0, 4), time.substring(4, 6),
            time.substring(6, 8), time.substring(9, 11), time.substring(11, 13)),
        duration: duration,
        url: url
    })
}

getContests()
getAtcoder().then(html => {
    console.log("Crawl Atcoder...")

    let ulList = []
    let temp = []
    let timeList = []
    let durationList = []
    let ret = []
    const $ = cheerio.load(html.data)
    const $bodyList = $(".col-sm-8").find(".panel").find(".panel-body")

    $bodyList.each((i, elem) => {
        ulList[i] = ($(elem).text())
    })

    for (var i = 1; i < $bodyList.length; i++) {
        let strList = ulList[i].split("\n")

        temp[i] = new Array()
        for (var j = 2; j < 5; j++) {
            let data = strList[j].split(": ")
            temp[i].push(data[1])
        }

        let durRet = temp[i][1].split("iso=")
        let durRet2 = durRet[1].split("&")
        timeList[i] = durRet2[0]

        let num = temp[i][2].split(" ")
        let duration = (num[1] / 60).toString()
        durationList[i] = duration.substr(0, 3)
    }

    const $title = $(".col-sm-8").find(".panel")
    $title.each((i, elem) => {
        ret[i] = {
            title: $(elem).find(".panel-title").text(),
        }
    })

    for (var i = 1; i < ret.length; i++) {
        saveModel("Atcoder", ret[i].title, timeList[i], durationList[i], temp[i][0])
    }
    console.log("Atcoder save complete")
}).then(() => getLeetCode())