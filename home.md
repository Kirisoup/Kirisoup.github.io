---
title: 主页
description: 欢迎来到霧雨蘑菇店！
---

{:9fumo: .icon height="20px" src="/assets/image/indoc/cirno.gif"}
{:mushroom: .icon height="40px" src="/assets/image/indoc/pilze-0004.gif"}
{:tea: .icon src="/assets/image/indoc/Chinese-Tea.gif"}

{:.fake.h1}
*欢迎来到 **¥霧雨蘑菇店¥**{:.big}![](){:mushroom}*{:.big.rainbow.fancy2} <br> ***う*{:r="yo"}*こ*{:r="ko"}*そ*{:r="so"}！**{:.r.rainbow.fancy2}

---

        {% for i in site.data.weather.today %}
        {{ i.categ }} = jsonWeather.{{ i.addr }};
        {{ i.categ }}_intervs  = [{{ i.intervs }}];
        {{ i.categ }}_msgs = [{{ i.msgs }}];
        {% endfor %}


冲浪了这么久，赶快进来歇一会吧\|∀` )。

![](){:tea}  
*红茶无限续杯！*{:.bigger.u}~~没有茶点！幽幽子请不要再来了！~~{:.small}

这里是霧雨蘑菇汤的互联网小角落，本店提供：  
***最新最好的 IBM 计算机*{:t="右下角（看电视请自便）"}、旋转 fumo ![](){:9fumo}![](){:9fumo}、畅销书籍、魔法金属、拉面代码，** 细心发掘的话还可以发现更多有意思的稀奇玩意~

{:.info}
> *请使用天亦3G设备浏览本网页*{:t="请使用横屏设备浏览本网页；支持大部分浏览器的最新版本，很不幸尚不支持火狐"}

{:.info}
> *加载中......*{:.ip}
{% include ip.js.md %}

{:.info}
> *加载中......*{:.weather}

<script src="/assets/js/weather.js" async></script>

{:.note}
> **目击者报告：**{:.u}
> 
> **\*明明叫作蘑菇店，实际上并不出售蘑菇**  
> *（×1 不过确实是有趣的地方）*{:.z style="color:#464b"}  
> *——匿名*{:.r}
