const axios = require('axios')
const cheerio = require('cheerio')
const puppeteer = require('puppeteer')


const getAtcoder = async()=>{
    try{return await axios.get("https://atcoder.jp/")}
    catch(err){console.log(err)}
};
const getLeetcode = async()=>{
    try{return await axios.get("https://leetcode.com/contest/")
    }catch(err){console.log(err)}
}
/* 
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
})//.then(res => console.log(res))
*/
getLeetcode().then(html=>{

    const $ = cheerio.load(html.data)
    const $bodyList = $(".contest-upcoming")
    $bodyList.each((i, ele)=>{
        console.log("?")
        console.log($(ele).text())
    })



})//.then(res => console.log(res))