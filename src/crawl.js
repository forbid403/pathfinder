const cheerio = require('cheerio');
const puppeteer = require('puppeteer')
const sanitizeHtml = require('sanitize-html');

const getAtcoder = async()=>{
    try{return await axios.get("https://atcoder.jp/")}
    catch(err){console.log(err)}
}

async function init () {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // 수집하고자 하는 URL을 입력
    await page.goto('https://leetcode.com/contest/');

    const timeWork = await page.waitFor( ".time" );
    const time = await page.evaluate( timeWork => timeWork.textContent, timeWork );

    const durationWork = await page.waitFor( "div.intro" );
    const duration = await page.evaluate( durationWork => durationWork.textContent, durationWork );

    const titleWork = await page.waitFor( "div.card-title" );
    const title = await page.evaluate( titleWork => titleWork.textContent, titleWork );
    
    console.log("time : ", time)
    console.log("duration : ", duration)
    console.log("title : ", title)
    
    await browser.close()
}

getAtcoder().then(html => {
    let ulList = []
    const $ = cheerio.load(html.data)
    const $bodyList = $(".col-sm-8").find(".panel").find(".panel-body")

    $bodyList.each((i, elem)=>{
        ulList[i] = ($(elem).text())
    })

    for(var i=1; i<$bodyList.length; i++){
        let strList = ulList[i].split("\n")
        for (var j=2; j<5; j++){
            let data =strList[j].split(": ")
            //console.log(data[1])
        }
    }

    const $bodyList = $(".col-sm-8").find(".panel")
    $bodyList.each((i, elem)=>{
        ulList[i] = {
            title : $(elem).find(".panel-title").text()
        }
    })

    return ulList
})

init()
