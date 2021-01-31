# 20210131
# 仅包含策略组及图标设置，整体配置待完善后发出；
# 基于神机配置中的策略组调整，感谢大佬的辛苦付出；

# 地区分组策略
static=Hongkong, server-tag-regex=(?=.*(港|香港|HK|(?i)Hong)), img-url=https://raw.githubusercontent.com/yogayyy/Scripts/master/Policy/HK.png
static=Taiwan, server-tag-regex=(?=.*(台湾|台灣|TW|(?i)Taiwan)), img-url=https://raw.githubusercontent.com/yogayyy/Scripts/master/Policy/CN.png
static=Singapore, server-tag-regex=(?=.*(新加坡|狮城|SG|(?i)Singapore)), img-url=https://raw.githubusercontent.com/yogayyy/Scripts/master/Policy/SG.png
static=American, server-tag-regex=(?=.*(美国|美國|US|(?i)States|American)), img-url=https://raw.githubusercontent.com/yogayyy/Scripts/master/Policy/US.png
static=Japan, server-tag-regex=(?=.*(日本|JP|(?i)Japan)), img-url=https://raw.githubusercontent.com/yogayyy/Scripts/master/Policy/JP.png
static=Korean, server-tag-regex=(?=.*(韩国|韓國|南朝鲜|KR|(?i)Korean)), img-url=https://raw.githubusercontent.com/yogayyy/Scripts/master/Policy/KR.png
static=Others, server-tag-regex=^((?!(香港|台湾|日本|新加坡|美国|韩国|狮城|南朝鲜|US|SG|JP|KR|HK|TW|台灣|美國|韓國|獅城|账号|试用|流量|电报|网址|最新|域名|剩余|(?i)IPLC|IEPL|game|States|American|Singapore|Japan|Korea|Hong|Taiwan|data|date|website)).)*$, img-url=https://raw.githubusercontent.com/yogayyy/Scripts/master/Policy/Others.png
static=IPLC, server-tag-regex=(手游|游戏|专线|(?i)IPLC|IEPL|game), img-url=https://raw.githubusercontent.com/yogayyy/Scripts/master/Policy/IPLC.png

# 软件分组策略
static=Apple, direct, American, Hongkong, proxy, img-url=https://raw.githubusercontent.com/yogayyy/Scripts/master/Policy/Apple.png
static=Spotify, proxy, American, Hongkong, img-url=https://raw.githubusercontent.com/yogayyy/Scripts/master/Policy/Spotify.png
static=Netflix, proxy, Singapore, Hongkong, Taiwan, img-url=https://raw.githubusercontent.com/yogayyy/Scripts/master/Policy/Netflix.png
static=Telegram, proxy, direct, Singapore, IPLC, img-url=https://raw.githubusercontent.com/yogayyy/Scripts/master/Policy/Telegram.png
static=Twitter, proxy, American, Hongkong, img-url=https://raw.githubusercontent.com/yogayyy/Scripts/master/Policy/Twitter.png
static=Speedtest, direct, proxy, Taiwan, American, Hongkong, Singapore, img-url=https://raw.githubusercontent.com/yogayyy/Scripts/master/Policy/Speedtest.png

# 基础策略组
static=Streaming, proxy, Hongkong, Taiwan, img-url=https://raw.githubusercontent.com/yogayyy/Scripts/master/Policy/Streaming.png
static=StreamingSE, direct, proxy, img-url=https://raw.githubusercontent.com/yogayyy/Scripts/master/Policy/StreamingSE.png
static=Guard, reject, direct, proxy, img-url=https://raw.githubusercontent.com/yogayyy/Scripts/master/Policy/Guard.png
static=Final, proxy, Hongkong, direct, img-url=https://raw.githubusercontent.com/yogayyy/Scripts/master/Policy/Final.png
