const $ = new Env('步步寶')
let notice = ''
let CookieVal = ('{"store":"appstore","tokenstr":"DB3BD285F93F4BCC3DFFD6AD8525138G1611061337","Connection":"keep-alive","Accept-Encoding":"gzip, deflate, br","version":"10","idfa":"00000000-0000-0000-0000-000000000000","User-Agent":"BBB/132 CFNetwork/1209 Darwin/20.2.0","platform":"2","imei":"7D13946F-986C-4A38-A726-F35203551D8C","Cookie":"PHPSESSID=dqv0ku2nn7eva8hpgsairke882","Host":"bububao.duoshoutuan.com","Accept-Language":"zh-cn","Accept":"*/*","Content-Length":"0"}')

if ($.isNode()) {
      console.log(`============ 脚本执行-国际标准时间(UTC)：${new Date().toLocaleString()}  =============\n`)
      console.log(`============ 脚本执行-北京时间(UTC+8)：${new Date(new Date().getTime() + 8 * 60 * 60 * 1000).toLocaleString()}  =============\n`)
}

now = new Date(new Date().getTime() + new Date().getTimezoneOffset()*60*1000 + 8*60*60*1000);  

if (typeof $request !== 'undefined') {
   if ($request && $request.method != `OPTIONS` && $request.url.indexOf('user/profile') != -1) {
     const CookieVal = JSON.stringify($request.headers)
if(CookieVal)$.setdata(CookieVal,'bbb_ck')
     $.log(`CookieVal:${CookieVal}`)
     $.msg($.name,"获取Cookie成功")
     $.done()
   }
} else {
!(async () => {

$.msg($.name,"開始🎉🎉🎉")

      await userInfo()
      await signIn()
      await sleepStatus()
      await checkWaterNum()
      await clickTaskStatus()
      await watchTaskStatus()
      await checkCode()
      await getQuestionId()
      await showmsg()

})()
    .catch((e) => $.logErr(e))
    .finally(() => $.done())
}



function showmsg(){
    $.msg($.name, '', notice)
     }

var getBoxId = (function () {
    var i = 0;
    return function () {
        return ++i;
    };
})();



function userInfo() {
return new Promise((resolve, reject) => {
  let timestamp=new Date().getTime();
  let userInfo ={
    url: 'https://bububao.duoshoutuan.com/user/profile',
    headers: JSON.parse(CookieVal),
}
   $.post(userInfo,async(error, response, data) =>{
     const userinfo = JSON.parse(data)
     if(response.statusCode == 200 && userinfo.code != -1){
          $.log('\n🎉模擬登陸成功\n')
          //await getQuestionId()
     notice += '🎉步步寶帳號: '+userinfo.username+'\n'+'🎉當前金幣: '+userinfo.jinbi+'💰 約'+userinfo.money+'元💸\n'
    }else{
     notice += '⚠️異常原因: '+userinfo.msg+'\n'
           }
          resolve()
    })
   })
  } 


function checkDailyWatchAd() {
return new Promise((resolve, reject) => {
  let timestamp=new Date().getTime();
  let checkdailywatchad ={
    url: `https://bububao.duoshoutuan.com/user/chuansj`,
    headers: JSON.parse(CookieVal),
    body: `mini_pos=0&c_type=1&`,
}
   $.post(checkdailywatchad,async(error, response, data) =>{
$.log('\n🔔開始查詢每日觀看ID\n')
     const dailywatch = JSON.parse(data)
      if(dailywatch.code == 1) {
      dailyWatchStr = dailywatch.nonce_str
          //$.log('\n'+dailyWatchStr+'\n')
          $.log('\n🎉查詢成功,30s後領取獎勵\n')
          await $.wait(30000)
          await DailyWatchAd()
           }
          resolve()
    })
   })
  } 


function signIn() {
return new Promise((resolve, reject) => {
  let timestamp=new Date().getTime();
  let signin ={
    url: `https://bububao.duoshoutuan.com/user/sign`,
    headers: JSON.parse(CookieVal),
}
   $.post(signin,async(error, response, data) =>{
$.log('\n🔔開始签到\n')
     const sign = JSON.parse(data)
      if(sign.code == 1) {
          $.log('\n🎉'+sign.msg+'簽到金幣+ '+sign.jinbi+'💰\n')
      signInStr = sign.nonce_str
          await signDouble()
         }else{
          $.log('\n🎉'+sign.msg+'\n')
         }
          resolve()
    })
   })
  } 

function signDouble() {
return new Promise((resolve, reject) => {
  let timestamp=new Date().getTime();
  let signdouble ={
    url: `https://bububao.duoshoutuan.com/you/callback`,
    headers: JSON.parse(CookieVal),
    body: `nonce_str=${signInStr}&tid=2&pos=1&`,
}
   $.post(signdouble,async(error, response, data) =>{
     const signin2 = JSON.parse(data)
$.log('\n🔔開始領取每日觀看獎勵\n')
      if(signin2.code == 1) {
          $.log('\n🎉簽到翻倍成功\n')
           }else{
          $.log('\n⚠️簽到翻倍失敗敗:'+signin2.msg+'\n')
           }
          resolve()
    })
   })
  } 

function checkWaterNum() {
return new Promise((resolve, reject) => {
  let timestamp=new Date().getTime();
  let checkwaternum ={
    url: `https://bububao.duoshoutuan.com/mini/water_info`,
    headers: JSON.parse(CookieVal),
}
   $.post(checkwaternum,async(error, response, data) =>{
$.log('\n🔔開始查詢喝水杯數\n')
     const waternum = JSON.parse(data)
      if(waternum.code == 1 && waternum.day_num < 7) {
      waterNum = waternum.day_num
      if(waternum.is_sp == 1){
          $.log('\n🎉喝水前需要看廣告喔！,1s後開始看廣告\n')
          await $.wait(1000)
          await checkWaterSp()
         }else{
          $.log('\n🎉查詢成功,1s後領取喝水獎勵\n')
          await $.wait(1000)
          await waterClick()
         }}else{
          $.log('\n⚠️喝水失敗: 今日喝水已上限\n')
         }
          resolve()
    })
   })
  } 

function checkWaterSp() {
return new Promise((resolve, reject) => {
  let timestamp=new Date().getTime();
  let checksp ={
    url: `https://bububao.duoshoutuan.com/user/chuansj`,
    headers: JSON.parse(CookieVal),
    body: `mini_pos=2&c_type=1&`,
}
   $.post(checksp,async(error, response, data) =>{
     const sp = JSON.parse(data)
      if(sp.code == 1) {
      waterSpStr = sp.nonce_str
          await WaterSp()
           }
          resolve()
    })
   })
  } 

function WaterSp() {
return new Promise((resolve, reject) => {
  let timestamp=new Date().getTime();
  let watersp ={
    url: `https://bububao.duoshoutuan.com/mini/water_sp`,
    headers: JSON.parse(CookieVal),
    body: `day_num=${waterNum}&`,
}
   $.post(watersp,async(error, response, data) =>{
     const spwater = JSON.parse(data)
      if(spwater.code == 1) {
          $.log('\n🎉正在觀看喝水廣告, 30後領取喝水獎勵\n')
          await $.wait(30000)
          await waterClick()
           }
          resolve()
    })
   })
  } 

function waterClick() {
return new Promise((resolve, reject) => {
  let timestamp=new Date().getTime();
  let waterclick ={
    url: `https://bububao.duoshoutuan.com/mini/water_click`,
    headers: JSON.parse(CookieVal),
    body: `day_num=0${waterNum}&`,
}
   $.post(waterclick,async(error, response, data) =>{
     const clickwater = JSON.parse(data)
$.log('\n🔔開始領取喝水獎勵\n')
      if(clickwater.code == 1) {
          $.log('\n🎉'+clickwater.msg+'喝水金幣+ '+clickwater.jinbi+'💰\n')
           }else{
          $.log('\n⚠️喝水失敗:'+clickwater.msg+'\n')
           }
          resolve()
    })
   })
  } 


function sleepStatus() {
return new Promise((resolve, reject) => {
  let timestamp=new Date().getTime();
  let sleepstatus ={
    url: `https://bububao.duoshoutuan.com/mini/sleep_info`,
    headers: JSON.parse(CookieVal),
}
   $.post(sleepstatus,async(error, response, data) =>{
$.log('\n🔔開始查詢睡覺狀態\n')
     const slpstatus = JSON.parse(data)
      if(slpstatus.code == 1) {
      if(slpstatus.is_lq == 1) {
      sleepStr = slpstatus.nonce_str
      sleepId = slpstatus.taskid
     }
      if(slpstatus.is_sleep == 0 && now.getHours() >= 20) {
$.msg('🔔都幾點了，還不睡？5s後開始睡覺！')
          await $.wait(5000)
          await sleepStart()
         }else if(slpstatus.is_sleep == 1 && now.getHours() >= 8 && now.getHours() <= 9){
$.msg('🔔都幾點了，還不起？5s後準備起床！')
          await $.wait(5000)
          await sleepEnd()
         }else if(slpstatus.is_sleep == 1 && now.getHours() >= 22){
          $.msg('⚠️睡覺的時候不要玩手機！！！')
         }else if(slpstatus.is_sleep == 0 &&
now.getHours() >= 18){
          $.msg('😘這麼早就準備睡覺了嗎？是身體不舒服嗎？要保重身體呀！')
         }}
          resolve()
    })
   })
  } 


function sleepStart() {
return new Promise((resolve, reject) => {
  let timestamp=new Date().getTime();
  let sleepstart ={
    url: `https://bububao.duoshoutuan.com/mini/sleep_start`,
    headers: JSON.parse(CookieVal),
}
   $.post(sleepstart,async(error, response, data) =>{
     const startsleep = JSON.parse(data)
$.log('\n🔔開始睡覺\n')
      if(startsleep.code == 1) {
          $.log('\n🎉睡覺成功！早睡早起身體好！\n')
           }else{
          $.log('\n⚠️睡覺失敗敗:'+startsleep.msg+'\n')
           }
          resolve()
    })
   })
  } 

function sleepEnd() {
return new Promise((resolve, reject) => {
  let timestamp=new Date().getTime();
  let sleepend ={
    url: `https://bububao.duoshoutuan.com/mini/sleep_end`,
    headers: JSON.parse(CookieVal),
}
   $.post(sleepend,async(error, response, data) =>{
     const endsleep = JSON.parse(data)
$.log('\n🔔開始起床\n')
      if(endsleep.code == 1) {
          $.log('\n🎉起床了！別睡了！\n')
          await sleepDone()
           }else{
          $.log('\n⚠️起床失敗敗:'+endsleep.msg+'\n')
           }
          resolve()
    })
   })
  } 

function sleepDone() {
return new Promise((resolve, reject) => {
  let timestamp=new Date().getTime();
  let sleepdone ={
    url: `https://bububao.duoshoutuan.com/mini/sleep_end`,
    headers: JSON.parse(CookieVal),
    body: `taskid=${sleepId}&nonce_str=${sleepStr}&`
}
   $.post(sleepdone,async(error, response, data) =>{
     const donesleep = JSON.parse(data)
$.log('\n🔔開始領取睡覺金幣\n')
      if(donesleep.code == 1) {
          $.log('\n🎉'+donesleep.msg+'金幣+ '+donesleep.jinbi+'💰\n')
           }else{
          $.log('\n⚠️領取睡覺金幣失敗敗:'+donesleep.msg+'\n')
           }
          resolve()
    })
   })
  } 

function clickTaskStatus() {
return new Promise((resolve, reject) => {
  let timestamp=new Date().getTime();
  let clicktaskstatus ={
    url: `https://bububao.duoshoutuan.com/user/renwu`,
    headers: JSON.parse(CookieVal),
    body: `idfa=${JSON.parse(CookieVal)['idfa']}&`,
}
   $.post(clicktaskstatus,async(error, response, data) =>{
     const clicktask = JSON.parse(data)
      if(clicktask.first.admobile_st != 2) {
$.log('\n🔔開始查詢每日點擊任務狀態\n')
          await checkDailyClickAdId()
         }else{
          $.log('\n⚠️每日點擊廣告任務已上限\n')
         }
       resolve()
    })
   })
  } 

function watchTaskStatus() {
return new Promise((resolve, reject) => {
  let timestamp=new Date().getTime();
  let watchtaskstatus ={
    url: `https://bububao.duoshoutuan.com/user/renwu`,
    headers: JSON.parse(CookieVal),
    body: `idfa=${JSON.parse(CookieVal)['idfa']}&`,
}
   $.post(watchtaskstatus,async(error, response, data) =>{
     const watchtask = JSON.parse(data)
       if(watchtask.v_st != 2) {
$.log('\n🔔開始查詢每日觀看廣告任務狀態\n')
          await DailyWatchAd()
         }else{
          $.log('\n⚠️每日看廣告任務已上限\n')
         }
       resolve()
    })
   })
  } 

function DailyWatchAd() {
return new Promise((resolve, reject) => {
  let timestamp=new Date().getTime();
  let dailywatchad ={
    url: `https://bububao.duoshoutuan.com/you/callback`,
    headers: JSON.parse(CookieVal),
    body: `nonce_str=${dailyWatchStr}&tid=9&pos=1&`,
}
   $.post(dailywatchad,async(error, response, data) =>{
     const dailywatch = JSON.parse(data)
$.log('\n🔔開始領取每日觀看獎勵\n')
      if(dailywatch.code == 1) {
          $.log('\n🎉每日觀看獎勵領取成功,5m後查詢下一次廣告\n')
          await $.wait(300000)
          await watchTaskStatus()
           }else{
          $.log('\n⚠️每日獎勵領取失敗:'+dailywatch.msg+'\n')
           }
          resolve()
    })
   })
  } 

function checkDailyClickAdId() {
return new Promise((resolve, reject) => {
  let timestamp=new Date().getTime();
  let checkdailyclickadid ={
    url: `https://bububao.duoshoutuan.com/user/admobile_show`,
    headers: JSON.parse(CookieVal),
}
   $.post(checkdailyclickadid,async(error, response, data) =>{
$.log('\n🔔開始查詢每日廣告ID\n')
     const dailyclickid = JSON.parse(data)
      if(dailyclickid.code == 1) {
      dailyClickAdId = dailyclickid.ad_id
         // $.log('\n'+dailyClickAdId+'\n')
          $.log('\n🎉查詢成功,1s後領取獎勵\n')
          await $.wait(1000)
          await checkDailyClickAd()
           }
          resolve()
    })
   })
  } 


function checkDailyClickAd() {
return new Promise((resolve, reject) => {
  let timestamp=new Date().getTime();
  let checkdailyclickad ={
    url: `https://bububao.duoshoutuan.com/user/admobile_click`,
    headers: JSON.parse(CookieVal),
    body: `ad_id=${dailyClickAdId}&`,
}
   $.post(checkdailyclickad,async(error, response, data) =>{
$.log('\n🔔開始查詢每日廣告點擊ID\n')
     const dailyclick = JSON.parse(data)
      if(dailyclick.code == 1) {
      dailyClickStr = dailyclick.nonce_str
         // $.log('\n'+dailyClickStr+'\n')
          $.log('\n🎉查詢成功,5s後返回領取獎勵\n')
          await $.wait(5000)
          await DailyClickAd()
           }
          resolve()
    })
   })
  } 

function DailyClickAd() {
return new Promise((resolve, reject) => {
  let timestamp=new Date().getTime();
  let dailyclickad ={
    url: `https://bububao.duoshoutuan.com/user/admobile_done`,
    headers: JSON.parse(CookieVal),
    body: `nonce_str=${dailyClickStr}&ad_id=${dailyClickAdId}&`,
}
   $.post(dailyclickad,async(error, response, data) =>{
     const dailyclick = JSON.parse(data)
$.log('\n🔔開始領取每日點擊獎勵\n')
      if(dailyclick.code == 1) {
          $.log('\n🎉每日點擊獎勵領取成功,1s後查詢下一次廣告ID\n')
          await $.wait(1000)
          await clickTaskStatus()
           }else{
          $.log('\n⚠️每日點擊領取失敗:'+dailyclick.msg+'\n')
           }
          resolve()
    })
   })
  } 



function checkHomeJin() {
return new Promise((resolve, reject) => {
  let timestamp=new Date().getTime();
  let checkhomejin ={
    url: 'https://bububao.duoshoutuan.com/user/home',
    headers: JSON.parse(CookieVal),
}
   $.post(checkhomejin,async(error, response, data) =>{
$.log('\n🔔開始查詢首頁金幣狀態\n')
     const checkhomejb = JSON.parse(data)
     if(checkhomejb.right_st == 0){
          await homeJin()
         }else if(checkhomejb.right_st == 1){
          await checkHomeGold()
         }else{
$.log('\n🔔首頁金幣狀態:'+checkhomejb.right_text+'\n🔔首頁紅包狀態:'+checkhomejb.hb_text+'\n🔔首頁金蛋狀態:'+checkhomejb.jindan_text+'\n')
         }
          resolve()
    })
   })
  } 

function checkHomeRedbag() {
return new Promise((resolve, reject) => {
  let timestamp=new Date().getTime();
  let checkhomeredbag ={
    url: 'https://bububao.duoshoutuan.com/user/home',
    headers: JSON.parse(CookieVal),
}
   $.post(checkhomeredbag,async(error, response, data) =>{
$.log('\n🔔開始查詢首頁紅包狀態\n')
     const checkhomerb = JSON.parse(data)
     if(checkhomerb.hb_st == 0){
          await checkRedBagId()
         }else if(checkhomerb.right_time > 0){
          await $.wait(checkhomerb.right_time*1000)
          await checkHomeJin()
         }else{
          await checkHomeJin()
         }
          resolve()
    })
   })
  } 

function checkHomeGold() {
return new Promise((resolve, reject) => {
  let timestamp=new Date().getTime();
  let checkhomegold ={
    url: 'https://bububao.duoshoutuan.com/user/home',
    headers: JSON.parse(CookieVal),
}
   $.post(checkhomegold,async(error, response, data) =>{
$.log('\n🔔開始查詢首頁金蛋狀態\n')
     const checkhomegd = JSON.parse(data)
     if(checkhomegd.jindan_show == 0){
          await checkGoldEggId()
         }else if(checkhomegd.right_time > 0){
          await $.wait(checkhomegd.right_time*1000)
          await checkHomeJin()
         }else if(checkhomegd.jindan_show == 1){
          await checkHomeJin()
         }
        
          resolve()
    })
   })
  } 

function homeJin() {
return new Promise((resolve, reject) => {
  let timestamp=new Date().getTime();
  let homejin ={
    url: 'https://bububao.duoshoutuan.com/user/homejin',
    headers: JSON.parse(CookieVal),
}
   $.post(homejin,async(error, response, data) =>{
     const homejb = JSON.parse(data)
     if(homejb.code == 1){
$.log('\n🔔開始領取首頁金幣\n')
          $.log('\n🎉首頁金幣:'+homejb.msg+'\n金幣+ '+homejb.jinbi+'\n')
         homeJinStr = homejb.nonce_str
          //$.log('\n'+homeJinStr+'\n')
          await $.wait(30000)
          await homeJinCallBack()
    }else{
          $.log('\n⚠️首頁金幣失敗:'+homejb.msg+'\n')
           }
          resolve()
    })
   })
  } 



function homeJinCallBack() {
return new Promise((resolve, reject) => {
  let timestamp=new Date().getTime();
  let homejincallback ={
    url: `https://bububao.duoshoutuan.com/you/callback`,
    headers: JSON.parse(CookieVal),
    body: `nonce_str=${homeJinStr}&tid=21&pos=1&`,
}
   $.post(homejincallback,async(error, response, data) =>{
     const hmjcallback = JSON.parse(data)
$.log('\n🔔開始翻倍首頁金幣\n')
      if(hmjcallback.code == 1) {
          $.log('\n🎉首頁金幣翻倍成功\n')
          await checkHomeRedbag()
           }else{
          $.log('\n🔔首頁金幣翻倍失敗'+hmjcallback.msg+'\n')
           }
          resolve()
    })
   })
  } 

function checkRedBagId() {
return new Promise((resolve, reject) => {
  let timestamp=new Date().getTime();
  let checkredbagid ={
    url: `https://bububao.duoshoutuan.com/user/chuansj`,
    headers: JSON.parse(CookieVal),
    body: `mini_pos=0&c_type=2&`,
}
   $.post(checkredbagid,async(error, response, data) =>{
$.log('\n🔔開始查詢首頁紅包ID\n')
     const code = JSON.parse(data)
      if(code.code == 1) {
      redBagStr = code.nonce_str
         // $.log('\n'+redBagStr+'\n')
          await $.wait(30000)
          await redBagCallback()
           }
          resolve()
    })
   })
  } 

function redBagCallback() {
return new Promise((resolve, reject) => {
  let timestamp=new Date().getTime();
  let redbagcallback ={
    url: `https://bububao.duoshoutuan.com/you/callback`,
    headers: JSON.parse(CookieVal),
    body: `nonce_str=${redBagStr}&tid=17&pos=1&`,
}
   $.post(redbagcallback,async(error, response, data) =>{
     const redbag = JSON.parse(data)
$.log('\n🔔開始領取首頁紅包\n')
      if(redbag.code == 1) {
          $.log('\n🎉首頁紅包領取成功\n')
          await checkHomeGold()
           }else{
          $.log('\n⚠️首頁紅包領取失敗:'+redbag.msg+'\n')
          await checkHomeGold()
           }
          resolve()
    })
   })
  } 

function checkGoldEggId() {
return new Promise((resolve, reject) => {
  let timestamp=new Date().getTime();
  let checkgoldeggid ={
    url: `https://bububao.duoshoutuan.com/user/jindan_click`,
    headers: JSON.parse(CookieVal),
}
   $.post(checkgoldeggid,async(error, response, data) =>{
$.log('\n🔔開始查詢首頁金蛋ID\n')
     const goldegg = JSON.parse(data)
      if(goldegg.code == 1) {
      goldEggStr = goldegg.nonce_str
         // $.log('\n'+goldEggStr+'\n')
      goldEggId = goldegg.taskid
         // $.log('\n'+goldEggId+'\n')
          await goldEggDone()
           }
          resolve()
    })
   })
  } 

function goldEggDone() {
return new Promise((resolve, reject) => {
  let timestamp= Date.parse(new Date())/1000;
  let goldeggdone ={
    url: `https://bububao.duoshoutuan.com/user/jindan_done`,
    headers: JSON.parse(CookieVal),
    body: `taskid=${goldEggId}&clicktime=${timestamp}&donetime=${timestamp}+100&nonce_str=${goldEggStr}&`
}
   $.post(goldeggdone,async(error, response, data) =>{
$.log('\n🔔開始領取首頁金蛋\n')
     const goldegg2 = JSON.parse(data)
      if(goldegg2.code == 1) {
          $.log('\n🎉首頁金蛋:'+goldegg2.msg+'\n金幣+ '+goldegg2.jinbi+'\n')
          await goldEggCallback()
           }else{
          $.log('\n⚠️首頁金蛋失敗:'+goldegg2.msg+'\n')
          await checkHomeJin()
           }
          resolve()
    })
   })
  } 

function goldEggCallback() {
return new Promise((resolve, reject) => {
  let timestamp=new Date().getTime();
  let goldeggcallback ={
    url: `https://bububao.duoshoutuan.com/you/callback`,
    headers: JSON.parse(CookieVal),
    body: `nonce_str=${goldEggStr}&tid=5&pos=1&`,
}
   $.post(goldeggcallback,async(error, response, data) =>{
     const goldeggback = JSON.parse(data)
$.log('\n🔔開始翻倍首頁金蛋\n')
      if(goldeggback.code == 1) {
          $.log('\n🎉金蛋翻倍成功\n')
          await checkHomeJin()
           }else{
          $.log('\n⚠️金蛋翻倍失敗:'+goldeggback.msg+'\n')
          await checkHomeJin()
           }
          resolve()
    })
   })
  } 

function checkCode() {
return new Promise((resolve, reject) => {
  let timestamp=new Date().getTime();
  let checkcode ={
    url: `https://bububao.duoshoutuan.com/user/chuansj`,
    headers: JSON.parse(CookieVal),
    body: `mini_pos=5&c_type=1&`,
}
   $.post(checkcode,async(error, response, data) =>{
     const code = JSON.parse(data)
$.log('\n🔔開始查詢助力視頻ID\n')
      if(code.code == 1) {
      nonce_str = code.nonce_str
$.log('\n🔔查詢助力視頻ID成功, 開始觀看助力視頻\n')
          await helpClick()
           }
          resolve()
    })
   })
  } 


function helpClick() {
return new Promise((resolve, reject) => {
  let timestamp=new Date().getTime();
  let helpclick ={
    url: `https://bububao.duoshoutuan.com/user/help_click`,
    headers: JSON.parse(CookieVal),
    body: `nonce_str=${nonce_str}`,
}
   $.post(helpclick,async(error, response, data) =>{
     const help = JSON.parse(data)
$.log('\n🔔開始觀看助力視頻, 30s後領取助力視頻獎勵\n')
      if(help.code == 1) {
          $.log('\n🎉觀看助力視頻成功, 1s後領取金幣+ '+help.jinbi+'\n')
          await $.wait(30000)
          await callBack()
           }else{
          $.log('\n⚠️觀看助力視頻失敗: '+help.msg+'\n')
          await getNewsId()
           }
          resolve()
    })
   })
  } 



function callBack() {
return new Promise((resolve, reject) => {
  let timestamp=new Date().getTime();
  let callback ={
    url: `https://bububao.duoshoutuan.com/you/callback`,
    headers: JSON.parse(CookieVal),
    body: `nonce_str=${nonce_str}&tid=22&pos=1&`,
}
   $.post(callback,async(error, response, data) =>{
     const back = JSON.parse(data)
$.log('\n🔔開始領取助力視頻獎勵\n')
      if(back.code == 1) {
          $.log('\n🎉領取助力視頻獎勵成功,1s後查詢下一次助力視頻ID\n')
          await $.wait(1000)
          await checkCode()
           }else{
          $.log('\n⚠️助力視頻獎勵失敗:'+back.msg+'\n')
           }
          resolve()
    })
   })
  } 

function getNewsId() {
return new Promise((resolve, reject) => {
  let timestamp=new Date().getTime();
  let getnewsid ={
    url: 'https://bububao.duoshoutuan.com/user/news',
    headers: JSON.parse(CookieVal),
    body: `type_class=1&`
}
   $.post(getnewsid,async(error, response, data) =>{
     const newsid = JSON.parse(data)
     if(newsid.code == 1){
       if(newsid.is_first == 1 && newsid.is_max == 0){
          $.log('\n🔔開始查詢新聞ID\n')
          newsStr = newsid.nonce_str
          $.log('\n🎉新聞ID查詢成功,15s後領取閱讀獎勵\n')
          await $.wait(15000)
          await autoRead()
          }else{
          $.log('\n⚠️閱讀失敗: 今日閱讀已上限\n')
          await checkLuckNum()
         }}else{
          $.log('\n⚠️查詢新聞ID失敗:'+newsid.msg+'\n')
           }
          resolve()
    })
   })
  } 

function autoRead() {
return new Promise((resolve, reject) => {
  let timestamp=new Date().getTime();
  let autoread ={
    url: 'https://bububao.duoshoutuan.com/user/donenews',
    headers: JSON.parse(CookieVal),
    body: `nonce_str=${newsStr}& `,
}
   $.post(autoread,async(error, response, data) =>{
     const read = JSON.parse(data)
      if(read.code == 1) {
          $.log('\n🎉閱讀成功,金幣+ '+read.jinbi+'💰,開始查詢下一篇新聞ID\n')
            await getNewsId()
          }else{
          $.log('\n⚠️閱讀失敗:'+data+'\n')
           }
          resolve()
    })
   })
  } 

function checkLuckNum() {
return new Promise((resolve, reject) => {
  let timestamp=new Date().getTime();
  let lucknum ={
    url: `https://bububao.duoshoutuan.com/user/lucky`,
    headers: JSON.parse(CookieVal),
}
   $.post(lucknum,async(error, response, data) =>{
     const num = JSON.parse(data)
$.log('\n🔔開始查詢抽獎次數\n')
      if(num.lucky_num != 0) {
          $.log('\n🎉剩餘抽獎次數:'+num.lucky_num+'1s後開始抽獎\n')
          await $.wait(1000)
          await luckyClick()
         }else if(num.lucky_num == 0) {
          $.log('\n⚠️今日抽獎次數已用完,1s後查詢寶箱狀態\n')
          await $.wait(1000)
       for (box of num.lucky_box){
          //$.log(box)
          if (box != 2)
          await luckyBox()
          if (box == 2)
          $.log('\n⚠️寶箱已開啟\n')
         }
       }
          resolve()
    })
   })
  } 

function luckyClick() {
return new Promise((resolve, reject) => {
  let timestamp=new Date().getTime();
  let luckclick ={
    url: `https://bububao.duoshoutuan.com/user/lucky_click`,
    headers: JSON.parse(CookieVal),
}
   $.post(luckclick,async(error, response, data) =>{
     const lucky = JSON.parse(data)
$.log('\n🔔開始抽獎\n')
      if(lucky.code == 1) {
          $.log('\n🎉抽獎:'+lucky.msg+'\n金幣+ '+lucky.jinbi+'\n')
         luckyStr = lucky.nonce_str
          //$.log('\n'+luckyStr+'\n')
      if(lucky.jinbi != 0) {
          await $.wait(5000)
          await luckyCallBack()
         }else{
          await luckyClick()
         }
       }
          resolve()
    })
   })
  } 


function luckyCallBack() {
return new Promise((resolve, reject) => {
  let timestamp=new Date().getTime();
  let luckycallback ={
    url: `https://bububao.duoshoutuan.com/you/callback`,
    headers: JSON.parse(CookieVal),
    body: `nonce_str=${luckyStr}&tid=16&pos=1&`,
}
   $.post(luckycallback,async(error, response, data) =>{
     const callback = JSON.parse(data)
$.log('\n🔔開始翻倍抽獎\n')
      if(callback.code == 1) {
          $.log('\n🎉抽獎翻倍成功\n')
          await $.wait(5000)
          await luckyClick()
           }else{
          $.log('\n⚠️抽獎翻倍失敗:'+callback.msg+'\n')
           }
          resolve()
    })
   })
  } 

function luckyBox() {
return new Promise((resolve, reject) => {
  let timestamp=new Date().getTime();
  let luckybox ={
    url: `https://bububao.duoshoutuan.com/user/lucky_box`,
    headers: JSON.parse(CookieVal),
    body: `box=${getBoxId()}&`,
}
//$.log('\nlockyboxBODY:'+luckybox.body+'\n')
   $.post(luckybox,async(error, response, data) =>{
     const boxlucky = JSON.parse(data)
$.log('\n🔔開始打開寶箱\n')
      if(boxlucky.code == 1) {
          $.log('🎉寶箱: '+boxlucky.msg+'\n金幣+ '+boxlucky.jinbi+'\n')
         luckyBoxStr = boxlucky.nonce_str
          $.log('\n🔔寶箱翻倍ID'+luckyBoxStr+'\n')
          await $.wait(5000)
          await luckyBoxCallBack()
         }else{
          $.log('\n⚠️寶箱失敗:'+boxlucky.msg+'\n')
         }
          resolve()
    })
   })
  } 

function luckyBoxCallBack() {
return new Promise((resolve, reject) => {
  let timestamp=new Date().getTime();
  let luckyboxcallback ={
    url: `https://bububao.duoshoutuan.com/you/callback`,
    headers: JSON.parse(CookieVal),
    body: `nonce_str=${luckyBoxStr}&tid=16&pos=1&`,
}
   $.post(luckyboxcallback,async(error, response, data) =>{
     const boxcallback = JSON.parse(data)
$.log('\n🔔開始翻倍寶箱\n')
      if(boxcallback.code == 1) {
          $.log('\n🎉寶箱翻倍成功\n')
          //await $.wait(1000)
          await checkLuckNum()
           }else{
          $.log('\n⚠️寶箱翻倍失敗'+boxcallback.msg+'\n')
           }
          resolve()
    })
   })
  } 



function getQuestionId() {
return new Promise((resolve, reject) => {
  let timestamp=new Date().getTime();
  let getquestionid ={
    url: `https://bububao.duoshoutuan.com/mini/cy_info`,
    headers: JSON.parse(CookieVal),
}
   $.post(getquestionid,async(error, response, data) =>{
     const question = JSON.parse(data)
      if(question.code == 1 && question.day_num != 0) {
$.log('\n🔔開始查詢答題ID\n')
         questionSite = question.site
          $.log('\n🎉答題ID1⃣️: '+questionSite+'\n')
         questionId = question.cy_id
          $.log('\n🎉答題ID2⃣️: '+questionId+'\n')
         spId = question.day_num
          $.log('\n🎉答題視頻: '+spId+'\n')
      if(question.is_sp == 1) {
          await $.wait(5000)
          await checkSp()
         }else{
          await answerQue()
         }}else{
          $.log('\n⚠️查詢答題ID成功,答題失敗: 今日答題已上限\n')
         }
          resolve()
    })
   })
  } 

function checkSp() {
return new Promise((resolve, reject) => {
  let timestamp=new Date().getTime();
  let checksp ={
    url: `https://bububao.duoshoutuan.com/user/chuansj`,
    headers: JSON.parse(CookieVal),
    body: `mini_pos=1&c_type=1&`,
}
   $.post(checksp,async(error, response, data) =>{
     const sp = JSON.parse(data)
      if(sp.code == 1) {
      spStr = sp.nonce_str
          //$.log('\n'+spStr+'\n')
          await $.wait(5000)
          await cySp()
           }
          resolve()
    })
   })
  } 

function cySp() {
return new Promise((resolve, reject) => {
  let timestamp=new Date().getTime();
  let cysp ={
    url: `https://bububao.duoshoutuan.com/mini/cy_sp`,
    headers: JSON.parse(CookieVal),
    body: `day_num=${spId}&`,
}
   $.post(cysp,async(error, response, data) =>{
     const sp = JSON.parse(data)
      if(sp.code == 1) {
         // $.log('\n'+sp.msg+'\n')
          //await $.wait(5000)
          await answerQue()
           }
          resolve()
    })
   })
  } 

function answerQue() {
return new Promise((resolve, reject) => {
  let timestamp=new Date().getTime();
  let answerque ={
    url: `https://bububao.duoshoutuan.com/mini/cy_click`,
    headers: JSON.parse(CookieVal),
    body: `cy_id=${questionId}&site=${questionSite}&`,
}
//$.log('\nanswerqueBODY:'+answerque.body+'\n')
   $.post(answerque,async(error, response, data) =>{
     const answer = JSON.parse(data)
$.log('\n🔔開始答題\n')
      if(answer.code == 1) {
          $.log('\n🎉答題: '+answer.msg+'\n金幣+ '+answer.jinbi+'\n')
         answerStr = answer.nonce_str
          $.log('\n🎉答題翻倍ID:'+answerStr+'\n')
          await $.wait(5000)
          await answerQueCallBack()
         }else{
          $.log('\n⚠️答題失敗: '+answer.msg+'\n')
          await checkHomeJin()
         }
          resolve()
    })
   })
  } 


function answerQueCallBack() {
return new Promise((resolve, reject) => {
  let timestamp=new Date().getTime();
  let answerquecallback ={
    url: `https://bububao.duoshoutuan.com/you/callback`,
    headers: JSON.parse(CookieVal),
    body: `nonce_str=${answerStr}&tid=18&pos=1&`,
}
//$.log('\nanswerQueCallBackBODY:'+answerquecallback.body+'\n')
   $.post(answerquecallback,async(error, response, data) =>{
     const answerback = JSON.parse(data)
$.log('\n🔔開始翻倍答題金幣\n')
      if(answerback.code == 1) {
          $.log('\n🎉答題金幣翻倍成功\n')
          await $.wait(5000)
          await getQuestionId()
           }else{
          $.log('\n⚠️答題金幣翻倍失敗:'+answerback.msg+'\n')
           }
          resolve()
    })
   })
  } 



function checkH5Id() {
return new Promise((resolve, reject) => {
  let timestamp=new Date().getTime();
  let checkh5id ={
    url: `https://bububao.duoshoutuan.com/user/h5_list?`,
    headers: JSON.parse(CookieVal),
    body: `page=1&page_limit=50&`,
}
   $.post(checkh5id,async(error, response, data) =>{
     const checkh5 = JSON.parse(data)
      if(response.statusCode == 200){
         for(ID of checkh5){
          H5ID = ID.mini_id
          $.log('\n'+H5ID+'\n')
          await doTaskH5()
         }
        }
      resolve()
    })
   })
  } 


function doTaskH5() {
return new Promise((resolve, reject) => {
  let timestamp=new Date().getTime();
  let dotaskh5 ={
    url: `https://bububao.duoshoutuan.com/user/h5_news?`,
    headers: JSON.parse(CookieVal),
    body: `mini_id=${H5ID}&`,
}
   $.post(dotaskh5,async(error, response, data) =>{
   $.post(dotaskh5,async(error, response, data) =>{
     const doh5task = JSON.parse(data)
$.log('\ndoTaskH5:'+data+'\n')
      if(response.body.indexOf('nonce_str') != -1) {
         H5Str = doh5task.nonce_str
          $.log('\n'+H5Str+'\n')
         H5TaskID = doh5task.taskid
          $.log('\n'+H5TaskID+'\n')
          //await $.wait(30000)
          await upLoadTime2()
           }else{
          $.log('\n'+data+'\n')
           }
          resolve()
    })
   })})
  } 

function upLoadTime() {
return new Promise((resolve, reject) => {
  let timestamp=new Date().getTime();
  let uploadtime ={
    url: `https://wapinformation.dfxwdc.com/wapreport/screen_show?encodedMsg=cWlkMTAyNjcJMTYxMDkxODY0MzAyMjkwNTYJbmV3cwllYXN0ZGF5X3dhcG5ld3MJanVuc2hpCWRmdHQtNzcxMjNkYWI3MC04YWFmCXRvdXRpYW8JaHR0cHM6Ly90b3V0aWFvLmVhc3RkYXkuY29tLwlqdW5zaGkJMQkxCTAJLy9taW5pLmVhc3RkYXkuY29tL21vYmlsZS8yMTAxMTYxMTU0MTE5NTU1NTE3NzcuaHRtbAl0b3V0aWFvCWp1bnNoaQ%3D%3D&_=1610918646639&jsonpcallback=Zepto${timestamp}`,
    headers: {"Accept": "*/*","Accept-Encoding": "gzip, deflate, br","Accept-Language": "zh-cn","Connection": "keep-alive","Host": "wapunionstatis.dfxwdc.com","Referer": "https://toutiao.eastday.com/?qid=qid10267","User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148",},
    timeout: 30000,
}
   $.get(uploadtime,async(error, response, data) =>{
$.log('\nupLoadTime:'+timestamp+'\n'+data+'\n')
          await $.wait(30000)
          await h5Done()
          resolve()
    })
   })
  } 

function upLoadTime2() {
return new Promise((resolve, reject) => {
  let timestamp=new Date().getTime();
  let uploadtime ={
    url: `https://api.clotfun.online/tiger/getConfig/a0d2cb8e06bd53b0530f8786624999db?hdggHtmlId=675`,
    headers: {"User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148",},
    timeout: 30000,
}
   $.get(uploadtime,async(error, response, data) =>{
$.log('\nupLoadTime2:'+data+'\n')
          await $.wait(30000)
          await h5Done()
          resolve()
    })
   })
  } 



function h5Done() {
return new Promise((resolve, reject) => {
  let timestamp=new Date().getTime();
  let h5done ={
    url: `https://bububao.duoshoutuan.com/user/h5_newsdone`,
    headers: JSON.parse(CookieVal),
    body: `taskid=${H5TaskID}&nonce_str=${H5Str}&`,
    timeout: 30000,
}
   $.post(h5done,async(error, response, data) =>{
     const doneh5 = JSON.parse(data)
      if(doneh5.code == 1) {
          $.log('\n看看賺成功, 金幣+ '+          $.log('\n'+doneh5.jinbi+'\n')+'\n')
           }else{
          $.log('\n'+doneh5.msg+'\n')
           }
          resolve()
    })
   })
  } 


function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),a={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(a,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t){let e={"M+":(new Date).getMonth()+1,"d+":(new Date).getDate(),"H+":(new Date).getHours(),"m+":(new Date).getMinutes(),"s+":(new Date).getSeconds(),"q+":Math.floor(((new Date).getMonth()+3)/3),S:(new Date).getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,((new Date).getFullYear()+"").substr(4-RegExp.$1.length)));for(let s in e)new RegExp("("+s+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?e[s]:("00"+e[s]).substr((""+e[s]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r)));let h=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];h.push(e),s&&h.push(s),i&&h.push(i),console.log(h.join("\n")),this.logs=this.logs.concat(h)}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
