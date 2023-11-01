var elements = document.querySelectorAll("h1, h2, h3, h4, h5, h6");
for (var i = 0; i < elements.length; i++)
{
    elements[i].addEventListener("click", function() {
        console.log("Hearder "+ this.tagName + " with \"" + this.id + "\" from ")
        var a = this.getAttribute("id");
        var url = window.location.href.split('#')[0]     + "#" + a;
        var textArea = document.createElement("textarea");
        textArea.value = url
        document.body.appendChild(textArea);
        textArea.select();
        try {
            var successful = document.execCommand("copy");
            var msg = successful ? "\'已复制："+url+"\'" : "'失败:|'";
            var elements2 = document.querySelectorAll("h1, h2, h3, h4, h5, h6");
            for (var i = 0; i < elements2.length; i++) {
                this.style.setProperty('--notify', msg);
            }
        } catch (err) {
            console.log("an error has occured during copying");
        }
        document.body.removeChild(textArea);
    }, true);
}

var elements3 = document.querySelectorAll("h1, h2, h3, h4, h5, h6");
for (var i = 0; i < elements3.length; i++) {
    elements3[i].addEventListener("mouseleave", function() {
        this.removeAttribute("style");
    });
}