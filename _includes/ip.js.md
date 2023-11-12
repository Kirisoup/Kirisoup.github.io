{%- capture ip -%}
<script>
    function getIP(json) { 
        ip = document.querySelectorAll('.ip');
        
        for (i = 0; i < ip.length; i++) {
            ip[i].innerHTML=`你的IP地址是: <a href="https://ipleak.net/?q=${json.ip}">${json.ip}</a>`;
        };
    }
</script>
<script src="http://api.ipify.org?format=jsonp&callback=getIP" async priority="low"></script>
{% endcapture %}
{{ ip | strip_newlines | normalize_whitespace }}
