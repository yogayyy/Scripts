/*
Termius unlocks local pro v 
(From the author @Maasea)

Surge:
http-response https:\/\/api\.termius\.com\/api\/v3\/bulk\/account\/ requires-body=1,max-size=0,script-path=Termius.js
QX：
https:\/\/api\.termius\.com\/api\/v3\/bulk\/account\/ url script-response-bodyTermius.js

MITM = api.termius.com
*/

let obj=JSON.parse($response.body)
obj.account["pro_mode"] = true;
obj.account["plan_type"] = "Premium";
obj.account["user_type"] = "Premium";
obj.account["current_period"]["until"] = "2099-10-10T03:27:34";
$done({body:JSON.stringify(obj)})
