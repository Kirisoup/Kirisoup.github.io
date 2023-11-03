url = new URL(location.href);
urlParams = new URLSearchParams(window.location.search);

function push() { history.pushState(null, '', url.href.replace(/(\?|&).*?=/g, (match) => match.slice(0, -1))); }

// ================

// enter fullscreen
document.getElementById('enterFull').addEventListener('click', function() {
    document.getElementsByClassName('fullscreen')[0].className = 'fullscreen on';
    url.searchParams.set("full", "");
    push();
});

// exit fullscreen
document.getElementById('exitFull').addEventListener('click', function() {
    document.getElementsByClassName('fullscreen on')[0].className = 'fullscreen';
    url.searchParams.delete("full");
    push();
});

// turn on fullscreen on pageload if query string "full" is in url
if (urlParams.has('full')) {
    document.getElementsByClassName('fullscreen')[0].className = 'fullscreen on';
}

// ================

function darkToggle(n) {
    if (document.querySelector(`#dark${n}:checked`)) {
        document.getElementById(`dark${n}`).checked=false;
        url.searchParams.delete("dark");
        push();
    } else { 
        document.getElementById(`dark${n}`).checked=true;
        url.searchParams.set("dark", "");
        push();
    };
}


document.getElementById('dark1').addEventListener('click', function() {darkToggle(2)});
document.getElementById('dark2').addEventListener('click', function() {darkToggle(1)});

// turn on darkmode on pageload if query string "dark" is in url
if (urlParams.has('dark')) {
    document.getElementById('dark1').checked=true;
    document.getElementById('dark2').checked=true;
}
