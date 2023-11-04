var host = "https://ghproxy.com/";
var ghprxy = host + "https://raw.githubusercontent.com/Kirisoup/kirisoup.github.io/main";
var ghprxy_s = ghprxy + "/_site";

function fall(element, prefix = ghprxy_s, attr = "href") {
  element.onerror = null;
  element.setAttribute(attr, prefix + element.getAttribute(attr));
}

function fallsc(element) {
  element.onerror = null;
  newScript = document.createElement("script");
  newScript.src = ghprxy + element.getAttribute("src");
  document.head.appendChild(newScript);
}