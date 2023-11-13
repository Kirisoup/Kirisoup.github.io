Url = 'https://kirisoup.github.io/assets/image/bg.gif';
Timeout = 500;

// check status for github (site domain) and ghproxy (proxy domain)
function checkUrl(url, timeout) {
    return new Promise((resolve, reject) => {
        fetchPromise = fetch(url);
        timeoutPromise = new Promise((_, reject) =>
            setTimeout(() => reject('Timeout'), timeout)
        );

        Promise.race([fetchPromise, timeoutPromise])
            .then(response => {
                if (response) {
                    resolve(response);
                }
            })
            .catch(error => {
                if (error === 'Timeout') {
                    reject('timeour');
                } else {
                    reject('Fail');
                }
            });
    });
}

stylesheets = document.getElementById('style');
stylesheetss = document.getElementsByClassName('assetsheet');
proxyURL = 'https://mirror.ghproxy.com/https://raw.githubusercontent.com/Kirisoup/kirisoup.github.io/main/';

// replace assets url in stylesheet -- forloop go brrrrr
function replaceUrl() {
    for (stylesheet of stylesheetss) {
        t = stylesheet.href
        console.log(`# Replacing ${t}: \n `)
        rules = stylesheet.sheet.cssRules;

        for (let i = 0; i < rules.length; i++) {
            rule = rules[i];

            if (rule.type === CSSRule.STYLE_RULE) {
                style = rule.style;

                for (let j = 0; j < style.length; j++) {
                    property = style[j];
                    value = style.getPropertyValue(property);

                    if (value.includes('url(\"/')) {
                        newValue = value.replace(/url\(\"\//g, 'url(\"' + proxyURL);
                        style.setProperty(property, newValue);
                        console.log(`- ${value} \n\nIs now replaced to:\n- ${newValue} \n `)
                    }
                }
            }
        }

        console.log(`################################\n\n `)
    };
}

// run the functions with proper logic
checkUrl(Url, Timeout)
    .then(response => {
        console.log('Github 连接成功，正常加载网页资源:', response);
    })
    .catch(error => {
        if (error === 'Timeout') {
            console.log('Github 连接超时，正在重新尝试（阈值提升至15秒）');
            Timeout = 15000;
            checkUrl(Url, Timeout).then(response => {
                console.log('Github 连接成功，正常加载网页资源:', response);
            })
            .catch(() => {
                console.log('Github 连接超时/失败，使用代理加载资源')
                replaceUrl();
            });
        } else {
            console.log('Github 连接失败:\n使用代理加载资源');
            replaceUrl();
        }
});
