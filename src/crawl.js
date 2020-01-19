const cheerio = require('cheerio');
const puppeteer = require('puppeteer')
const axios = require('axios')
const contestModel = require('../models/contest')
const mongoose = require('mongoose')
const schedule = require('node-schedule');

async ()=> schedule.scheduleJob('0 10 * * *', function(){
    getAtcoder().then(html => {
        console.log("Crawl Atcoder...")
    
        let ulList = []
        let temp = []
        let timeList = []
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
        }
    
        const $title = $(".col-sm-8").find(".panel")
        $title.each((i, elem) => {
            ret[i] = {
                title: $(elem).find(".panel-title").text(),
            }
        })
        
        for (var i = 1; i < ret.length; i++) {
            saveModel("Atcoder", ret[i].title, timeList[i], temp[i][2], temp[i][0])
        }
        console.log("Atcoder save complete")
    }).then(()=>getLeetCode())
});

const db = mongoose.connection
db.once('open', () => { console.log("connected to mongo db") })
mongoose.connect('mongodb://localhost/pathfinder');

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
    contestModel.create({
        site: site,
        title: title,
        startTime: Date(time),
        duration: duration,
        url: url
    })
}
