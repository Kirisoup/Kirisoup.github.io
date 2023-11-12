const Url1 = 'https://kirisoup.github.io/assets/image/bg.gif';
const Url2 = 'https://ghproxy.com';
const Timeout1 = 1000;
const Timeout2 = 5000;

// check status for github (site domain) and ghproxy (proxy domain)
function checkUrl(url, timeout) {
    return new Promise((resolve, reject) => {
        const fetchPromise = fetch(url);
        const timeoutPromise = new Promise((_, reject) =>
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
                    reject('超时');
                } else {
                    reject('失败');
                }
            });
    });
}

const stylesheet = document.getElementById('style');
const proxyURL = 'https://ghproxy.com/https://raw.githubusercontent.com/Kirisoup/kirisoup.github.io/main/';

// replace asset url in stylesheet
function replaceUrl() {
    console.log('正在替换资源地址...')
    if (stylesheet) {
        const rules = stylesheet.sheet.cssRules;

        for (let i = 0; i < rules.length; i++) {
            const rule = rules[i];

            if (rule.type === CSSRule.STYLE_RULE) {
                const style = rule.style;

                for (let j = 0; j < style.length; j++) {
                    const property = style[j];
                    const value = style.getPropertyValue(property);

                    if (value.includes('url(\"/')) {
                        const newValue = value.replace(/url\(\"\//g, 'url(\"' + proxyURL);
                        style.setProperty(property, newValue);
                        console.log('成功替换资源地址。')
                    }
                }
            }
        }
    }
}

// run the functions with proper logic
checkUrl(Url1, Timeout1)
    .then(response => {
        console.log('Github 连接成功，正常加载网页资源:', response);
    })
    .catch(error => {
        console.error('Github 连接:', error, '，尝试连接代理服务...');
        checkUrl(Url2, Timeout2)
            .then(response => {
                console.log('ghProxy 连接成功，使用代理服务加载网页资源:', response);
                replaceUrl();
            })
            .catch(error => {
                if (error === 'Timeout') {
                    console.error('ghProxy 连接超时，正在重新尝试连接代理服务...');
                    const Timeout2 = 15000;
                    checkUrl(Url2, Timeout2) 
                    .then(response => {
                        console.log('ghProxy 连接成功，使用代理服务加载网页资源:', response);
                        replaceUrl();
                    })
                    .catch(error => {
                        console.error('ghProxy 连接', error, '，不使用代理服务加载网页资源。');
                    });        
                } else {
                    console.error('ghProxy 连接失败，不使用代理服务加载网页资源。');
                }
            });
    });
