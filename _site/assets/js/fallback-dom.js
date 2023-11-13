var host = "https://mirror.ghproxy.com/";
var ghprxy = host + "https://raw.githubusercontent.com/Kirisoup/kirisoup.github.io/main";
var ghprxy_s = ghprxy + "/_site";

function fall(element, prefix = ghprxy_s, attr = "href") {
  element.onerror = null;
  element.setAttribute(attr, prefix + element.getAttribute(attr));
}

function fallss(element) {
  element.onerror = null;
  element.href = ghprxy_s + element.getAttribute("href");
}

function fallimg(element) {
  element.onerror = null;
  element.src = ghprxy + element.getAttribute("src");
}

function fallsc(element) {
  element.onerror = null;
  newScript = document.createElement("script");
  newScript.src = ghprxy + element.getAttribute("src");
  document.head.appendChild(newScript);
}