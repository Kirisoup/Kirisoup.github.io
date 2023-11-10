---
title: ⑨都能读懂的网络代理教程：使用 NekoRay / NekoBox 进行网络代理
---

⑨都能读懂的网络代理教程：  
*使用 NekoRay / NekoBox 进行网络代理*{:.small}
{:.fake.h1}

> 注：本教程面向 Windows 用户。
{:.info}

## 前言：

由于前几天从 Clash for Windows 删库开始的一系列事件，尤其是 Clash 内核与 Clash.Meta 内核的删库/归档，整个 Clash 客户端生态灰飞烟灭。

Clash for Windows 作为一个如此普及的代理客户端，加上我自己也是在两年前左右从 V2rayN 转为 CFW 忠实用户，正好借着这次迁移至 NekoRay 的机会，便想着干脆为这个支持 Xray, Sing-box, Hysteria, Naive 等多个内核，并且有着优秀方便的分流规则与 TUN 代理的优秀客户端写一篇使用教程。

## 前置知识：

> 虽然这一部分并非必须，但可以帮助你对网络代理建立系统性认识。若对网络代理已足够了解，可直接跳转下一部分
{:.note}

### 什么是网络代理：

简单来说，当你访问一个网站 （如 <https://google.com/>），或是应用联网访问数据时，你的设备会向网络运营商发出请求，与目标网址的服务器间建立连接，开始数据交换。

在这种情况下，你的 IP 地址向目标服务器公开、运营商也会知道你所访问的地址。通常称这种连接方式为**直连**。

而**使用代理的话，你的设备转而向运营商请求连接代理服务器，并且数据传输将会被加密，再进一步由代理服务器进一步连接至目标服务器；**

因此，运营商无法得知你此时连接的真实目的地与意图，同时目标服务器也无法得知你的真实IP，从而**达到保护隐私与绕过防火墙的目的。**

### 术语：

- ***代理客户端：***  
  为你的设备**处理网络代理的客户端**{:.h}，拥有的功能通常包括使用多种方式代理本机网络流量，可配置的分流规则，从*订阅链接*{:.u}批量下载*节点*{:.u}等功能。
- ***节点：***  
  一串包括了代理服务器地址，加密协议，密钥等信息的配置，系**建立代理连接的关键要素**{:.h}（使用机场的话大多数时候便无需手动配置节点）。

- ***机场：***  
  **提供与维护**{:.h}分布于世界各地的**代理服务器的服务商**{:.h}，通常通过*订阅*{:.u}的方式提供节点。

- ***订阅链接：***  
  大多数机场使用订阅链接作为**将**{:.h}全部**节点**{:.h}一次性**导入至代理客户端的方式**{:.h}（基于客户端的不同，用户还可以通过手动复制等方式导入节点）。

- ***上传与下载：***  
  上传指由你的设备通过互联网**向外界输出数据的行为**{:.h}，相反，下载则是你的设备**接收外界数据的行为**{:.h}；当你访问网络的时候，上传与下载无时不刻不在进行。

- ***延迟与速度：***  
  延迟与速度是两个经常被混淆的概念。
　　
  - **延迟**{:.u}
    指**数据**{:.h}从你的设备**发送至目标服务器**{:.h}（在这个语境下则是代理服务器），目标服务器的回复**再传回你的设备所使用的总时间**{:.h}（如：200ms）；
  　　
  - **速度**{:.u}
    分为上传速度与下载速度，则是指**一定时间内你的设备所能上传/下载的数据总量**{:.h}（如：10mb/s）。
    
  > 在使用代理的多数时候，我们更关注的是上传与下载速度，因为这通常是导致网络通信不畅的主要瓶颈。而延迟则通常用于检测节点的可用性，对网络的影响更加次要；
  {:.info}

---
{:.break}

接下来，本教程将正式启程！
{:.stroke.echorb.bigger}

---

## 下载 NekoRay：[仓库地址](https://github.com/MatsuriDayo/nekoray) | [下载地址](https://github.com/MatsuriDayo/nekoray/releases/latest)

![](https://telegra.ph/file/1c22af3b4ff6c1dbbecc2.png)

Windows 用户的请从 Release 中的下载文件名为`nekoray-...-windows64.zip`的文件。

下载后无需安装，自行解压到合适的路径，运行位于`.\nekoray-...-windows64\nekoray\nekoray.exe`路径的文件即可启动程序。

## 初次启动

启动程序后首先将会看到以下窗口：

![](https://telegra.ph/file/28ee88573f88511ba6963.png)

两个内核在一般使用场景下区别不大，推荐使用 sing-box 内核。

## 界面
进入主界面之后，会看到与下图类似的界面：

![](https://telegra.ph/file/73680951d07b5b4935f82.png)

其中，序号1到7分别是（暂时不理解的话没关系，下文中会对重要的部分进行讲解）：
    
| **{::nomarkdown} <ul><li>工具栏：      </li></ul> {:/}** | 程序配置、设置选项、以及导入代理节点等功能都可在此调出；
| **{::nomarkdown} <ul><li>代理模式：    </li></ul> {:/}** | 默认的端口转发模式、系统代理模式、TUN 模式；
| **{::nomarkdown} <ul><li>节点列表：    </li></ul> {:/}** | 接下来导入的节点将会显示在本列表中；
| **{::nomarkdown} <ul><li>日志：        </li></ul> {:/}** | 会实时记录节点开关状态、网络连接等等信息——正常使用没有问题的话并不需要理解日志中的信息；
| **{::nomarkdown} <ul><li>当前节点：    </li></ul> {:/}** | 显示当前启用的代理节点名称；
| **{::nomarkdown} <ul><li>转发端口：    </li></ul> {:/}** | 用于手动配置其他程序的代理，正常使用不一定需要；
| **{::nomarkdown} <ul><li>网络流量状态：</li></ul> {:/}** | 实时显示当前经过 NekoRay 处理的网络流量的细节（代理流量与直连流量的上传/下载速度）。

## 关键配置：

> 关于语言：软件默认语言跟随系统，如果你的系统语言不是中文但需要中文界面，请于
> 
> `首选项 > 基本设置 > 样式 > Language`  
> `Preference > Basic Settings > Style > Language`
>
> 切换语言为中文。
{:.note}

---
{:.break}

导航至工具栏的程序选项，建议开启`跟随系统启动`（开机自启动）以及`记住最后的配置`（关闭程序时记住启用的节点、代理模式等设置）。

![](https://telegra.ph/file/99c1a3d2888320a607ad8.png)

### 首选项 > 基本设置：

此分类中大部分选项除非有特殊需要否则无需改动

- **\> 样式：**更改语言与界面主题

### 首选项 > 路由设置：

> **关于分流**：大部分代理客户端都带有分流的功能，可以基于域名、IP、进程名配置**分流规则，指定对应网络流量通过代理或者直连**{:.h}（例：A站 https://acfun.cn/... 无法从国外大部分地区访问，因此可配置域名 acfun.cn 通过直连连接）。
{:.info}

- **\> 通用：**若无需要无需改动
- **\> DNS：**
  - `简易 DNS 设置 > 远程 DNS` 配置代理流量经过的 DNS 服务器，默认选项中含有 Google 和 Cloudflare 提供的 DNS 服务，个人偏向于使用 Cloudflare。**请避免在此选项中填入国内的 DNS 服务或其他不值得信任的 DNS 服务！**
  - `简易 DNS 设置 > 直连 DNS` 配置直连流量经过的 DNS 服务器（意义不大）

- **\> 简易路由：**配置分流规则。

  我所使用的设置：

  ![](https://telegra.ph/file/0c202b196795f517bbb78.png)
  流量默认通过代理，因此无需专门指定此处的代理选项
  
  - **IP- 直连：**
  
        geoip:private
  
  - **域名 - 直连：**
  
        domain_suffix:moegirl.org.cn
        domain_suffix:moegirl.org.cn
        domain_suffix:moegirl.uk
        domain_suffix:saraba1st.com
        domain_suffix:stage3rd.com
        domain_suffix:s1vote.com
        domain_suffix:dmzj.com
        domain_suffix:bog.ac
        domain_suffix:csdn.net
        domain_suffix:jianshu.com
        domain_suffix:tieba.baidu.com
        domain_suffix:baike.baidu.com
        domain_suffix:acfun.cn
        domain_suffix:acfun.tv
        domain_suffix:aixifan.com
        domain_suffix:kuaishou.com
        domain_suffix:ksurl.cn
        domain_suffix:kuaishouzt.com
        domain_suffix:douban.com
        domain_suffix:home.xsus.me
        domain_suffix:sda1.dev
        domain_suffix:hdslb.com
        domain_suffix:qcloud.com
        domain_suffix:qdaily.com
        domain_suffix:qdmm.com
        domain_suffix:qhimg.com
        domain_suffix:qhres.com
        domain_suffix:qq.com
        domain_suffix:qqurl.com
        domain_suffix:woozooo.com
        domain_suffix:weibo.com
        domain_suffix:link.zhihu.com
        domain_suffix:sspai.com
        domain_suffix:gcores.com
        domain_suffix:wantwords.net
        domain_suffix:gitee.com
        domain_suffix:cnblogs.com
        domain_suffix:mcbbs.net
        domain_suffix:apple.com
        domain_suffix:yxsjmc.cn
        domain_suffix:weiyun.com
        domain_suffix:csdnimg.cn
        domain_suffix:enazo.cn
        domain_suffix:nmbxd1.com
        domain_suffix:uselesses.com
        domain_suffix:126.net
        domain_suffix:163.com
        domain_suffix:yuque.com
        domain_suffix:126.net
        domain_suffix:163.com
        domain_suffix:127.net
        domain_suffix:zhihu.com
        domain_suffix:idqqimg.com
        domain_suffix:sda1.dev
        domain_suffix:live.bilibili.com
        domain_keyword:lanzou
        domain_keyword:sina
        domain_keyword:qq-web-legacy
  
  - **域名 - 阻止：**
  
        geosite:category-ads-all
        domain:appcenter.ms
        domain:firebase.io
        domain:crashlytics.com
        domain_suffix:appsflyer.com
        domain_suffix:doubleclick.net
        domain_suffix:mmstat.com
        domain_suffix:vungle.com
        domain_keyword:admarvel
        domain_keyword:admaster
        domain_keyword:adsage
        domain_keyword:adsmogo
        domain_keyword:adsrvmedia
        domain_keyword:adwords
        domain_keyword:adservice
        domain_keyword:domob
        domain_keyword:duomeng
        domain_keyword:dwtrack
        domain_keyword:guanggao
        domain_keyword:lianmeng
        domain_keyword:mopub
        domain_keyword:omgmta
        domain_keyword:openx
        domain_keyword:partnerad
        domain_keyword:pingfore
        domain_keyword:supersonicads
        domain_keyword:uedas
        domain_keyword:umeng
        domain_keyword:usage
        domain_keyword:wlmonitor
        domain_keyword:zjtoolbar

### 首选项 > TUN 设置（仅影响 TUN 模式代理）：

> 有关 TUN 代理和其他代理模式的讲解请见下文
{:.info}

| **{::nomarkdown} <ul><li>启用 Tun IPV6：           </li></ul> {:/}** | 可开启，除非日后使用 TUN 模式时发现问题；
| **{::nomarkdown} <ul><li>Strict Route (严格路由)： </li></ul> {:/}** | 开启。关闭本设置会导致 DNS 泄露；
| **{::nomarkdown} <ul><li>FakeDNS：                 </li></ul> {:/}** | 开启；
| **{::nomarkdown} <ul><li>绕过CIDR、绕过进程名：     </li></ul> {:/}** | 按需自行设置（可开启任务管理器 Ctrl Shift ESC，导航至详细信息标签查看进程名）；


### 导入节点：

> 假设你已经购买了机场订阅，或者有其他获取节点的渠道（自建节点、免费公开节点等）。
{:.info}

#### 从订阅链接导入：

从机场网站复制好订阅链接后，在界面中简单按下`Ctrl V`，或者导航至 `工具栏 > 服务器 > 从剪贴板添加`

![](https://telegra.ph/file/2b709391fbe731f23fccb.png)

选择：`作为订阅（创建新租）`

![](https://telegra.ph/file/aebebd6d3349f8556ba3f.png)

在工具栏打开 `首选项 > 分组`，此时应该可以看到新添加的分组。你可以定期回到这里更新订阅。

![](https://telegra.ph/file/e288375c7793cdb0e6f8c.png)
默认分组此时就可以删除了

此外，你也可以直接复制节点文本导入节点，本文便不再赘述。

### 开始使用代理：

回到程序主界面，切换到刚刚添加的分组标签：

![](https://telegra.ph/file/ce34a7848ea260e1cb2b0.png)

![](https://telegra.ph/file/073d2af95c05d17e0c36a.png)
此时，你应该可以看到全部新添加的节点：

单击选中一个节点，按`Enter`键即可切换至对应节点。此时，任何经过 NekoRay 代理且未被路由设置排除的流量都会通过连接的节点进行代理了。

![](https://telegra.ph/file/94040f67b3c850e1bcacc.png)
连接到节点后的日志消息

![](https://telegra.ph/file/e00351ec2866be2df2eca.png)
界面左下角也会显示当前连接的节点名称

#### 代理模式：

> 参见：*[^proxy-mode]*{:norm="[>>关于端口转发模式、系统代理与 TUN 模式]"}。
{:.info}

[^proxy-mode]: 
    ##### 关于端口转发模式、系统代理与 TUN 模式
    - **端口转发** 是很多代理客户端的默认模式。在这个模式下客户端不会主动代理设备上的任何流量，**须手动在需要代理的软件中设置使用本机的对应端口进行代理**（如：127.0.0.1:2080，其中127.0.0.1代表本地主机，2080为代理客户端监听的端口）；

    ![](https://telegra.ph/file/39ff57b95dc0bf9ae44cf.png)
    例：QBitTorrent 中的代理设置

    - **系统代理** 通过**使用 Windows 默认的代理设置，代理 Windows 设备中的*大部分*网络流量**（相当于自动将 `Windows 设置 > 网络和 Internet > 代理 > 手动设置代理` 中的地址设置成端口转发模式中使用的地址；这种情况下，有些软件不会遵守本设置，因此不会进行代理）；

    ![](https://telegra.ph/file/b267fe918db95d8b4d1ff.png)
    自动设置后的 Windows 系统代理

    - **TUN 模式** 通过复杂的原理，**真正意义上代理设备的全部流量，类似于 VPN 的代理模式。**缺点：必须特别设置分流规则排除不应经过代理的网站与软件。

在 NekoRay 主界面工具栏找到 Tun 模式和系统代理的复选框

ps: 两个都勾选的话系统代理也会被 TUN 覆盖掉
![](https://telegra.ph/file/d6d010c075d520d45a8d1.png)

**正常使用推荐直接开启系统代理即可。**对于普通用户，除非特别需要代理某些不支持系统代理的程序（例：使用 Windows 的 cmd.exe 命令提示符导入ruby gem、为游戏提供加速等）时需要开启 TUN，其他时候不建议 TUN 模式常驻开启。

### 选择最佳节点、理解设备的网络代理状态

#### 节点测速：

NekoRay 内含多种节点测速的方法。在节点列表中右键或在工具栏打开`服务器`标签，按需求选择`当前选中`或`当前分组`为对应节点选择测速方法。

例：选择全部日本节点并对`当前选中`进行测速
![](https://telegra.ph/file/9047f895001729dcab127.png)

- **TCP Ping**: 延迟测试。可用于在全部节点中快速确定节点可用性。

- **完整测试 > 下载速度：** 下载速度测试。测试耗时稍长，建议在 TCP Ping 测试一遍的基础上对部分节点进行更实际的测速（**\*\*MiB/s** 数字越大节点越快）。

TCP Ping 之后按照测试结果对节点排序
![](https://telegra.ph/file/e34b2ea35addb2cb144a0.png)

#### 网络流量状态：

界面的右下角会显示实时更新的当前网络流量状态。

当你发现某个网址无法连接的时候，可以查看这里的状态以确定问题是否由于节点导致，考虑是否需要切换节点。
![](https://telegra.ph/file/4fffb96f90aba0511774b.png)

#### 测试代理效果：

访问 [ipleak.net](https://ipleak.net/)
 查看当前代理的效果。

理想的代理：No forwarded IP detected ~ 未检测到转发的 IP；DNS 地址与节点来自同一个国家
<img src="https://telegra.ph/file/22826e466e01ca1ec7d3a.png">

DNS 列表中夹杂着来自运营商的DNS地址：DNS泄露，请重新检查相关设置！
<img src="https://telegra.ph/file/e5e53e374c1db38f8de5f.png">

### 其他：关于网络安全

#### 任何时候都应该使用 HTTPS！

**通过 HTTP 协议访问网络会面临着遭受中间人攻击的严重风险。**中间人攻击指的是由运营商、CDN 网络、长城防火墙等通过劫持并篡改你接收到的数据包内容进行的欺骗、诈骗等行为。

#### 防止 WebRTC 泄露真实 IP

由于浏览器实现 WebRTC（网络实时通讯）的方法中存在的严重漏洞，**一个网站只需通过简单的 Javascript 便可以获得用户的真实 IP。**解决方案包括禁用 WebRTC 以及使用插件防止泄露（如 [WebRTC Leak Prevent](https://github.com/aghorler/WebRTC-Leak-Prevent)）

例：使用 WebRTC Leak Prevent 防止泄露真实 IP
<img src="https://telegra.ph/file/17f128e4e3967f3101678.png">

#### 防止 CDN 泄露隐私

防止由使用不安全的 CDN（内容分发网络）所导致的隐私泄露：
[Decentraleyes](https://decentraleyes.org/)

#### 避免使用不可信的浏览器访问网络

**任何情况下从原则上都不应使用任何国产商业浏览器，**包括QQ、搜狗、360、“中国特供版”火狐，以及微信 QQ 微企等软件的内置浏览器。不是很推荐使用 Google Chrome 与 Edge，避免被谷歌和微软搜集隐私。推荐使用 Firefox（注意甄别“中国特供版”火狐！）及 Ungoogled Chrome。

---

本教程到这里就结束啦。期待下次再见~
{:.stroke.echorb.bigger}

### 参见：

- [MatsuriDayo/nekoray](https://github.com/MatsuriDayo/nekoray)

- [NekoRay 官方文档](https://matsuridayo.github.io/n-configuration/)

- [Sing-box 官方文档](https://sing-box.sagernet.org/zh/configuration/)

- [数字集权时代生存手记](https://reconsidera.github.io/#/)
