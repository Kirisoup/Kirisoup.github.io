const targetElement = document.getElementById("soup.exe");

const attributeChangeCallback = function (mutationsList, observer) {
    for (let mutation of mutationsList) {
        if (mutation.type === 'attributes' && mutation.attributeName == "style") {
            document.getElementById("overflow").setAttribute('style', targetElement.getAttribute(mutation.attributeName))
        }
    }
};

const observer = new MutationObserver(attributeChangeCallback);

const config = { attributes: true };

observer.observe(targetElement, config);
