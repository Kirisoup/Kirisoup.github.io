{%- capture weather -%} 
<script>
    doneWeather = false;

    fetch('https://api.open-meteo.com/v1/forecast?latitude=36.7&longitude=137.85&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,wind_direction_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=Asia%2FTokyo&past_days=1&forecast_days=8')
    .then(response => response.json())
    .then(jsonWeather => { if (!doneWeather) { doneWeather = true;

        console.log(jsonWeather);

        // current weather

        {% for i in site.data.weather.current %}
        {{ i.categ }} = jsonWeather.{{ i.addr }};
        {{ i.categ }}_intervs  = [{{ i.intervs }}];
        {{ i.categ }}_msgs = [{{ i.msgs }}];
        {% endfor %}

        {%- capture categs %}
            {% for i in site.data.weather.current -%}
            '{{ i.categ }}'
            {% if forloop.last %}{% else %}, {% endif %}
            {% endfor %}
        {% endcapture %}
        categs = [{{ categs | strip_newlines | normalize_whitespace}}];

        for (i = 0; i < categs.length; i++) {
            categ = `${categs[i]}`;
            value  = eval(`${categ}`);
            interv = eval(`${categ}_intervs`);
            msg    = eval(`${categ}_msgs`);
            
            for (j = 0; j < interv.length; j++) {
                if (value > interv[j] && value <= interv[j+1] ) {
                    window[`${categ}_value`] = value;
                    window[`${categ}_msg`] = msg[j];
                    break;
                }
            }
        }

        {% for i in site.data.weather.current -%}
        console.log(`{{ i.name }}: ${ {{ i.categ }}_value }{{ i.unit }} ${ {{ i.categ }}_msg }`);
        {% endfor %}

        // weather forcast

        {% for i in site.data.weather.forcast %}
        f{{ i.categ }} = jsonWeather.{{ i.addr }};
        f{{ i.categ }}_intervs  = {{ i.intervs }};
        f{{ i.categ }}_msgs = {{ i.msgs }};
        {% endfor %}

        console.log('未来七日幻想乡天气：')

        fcategs = ['fweather', 'ftempM', 'ftempm'];

        for (i = 2; i < fweather.length; i++) {

            for (j = 0; j < fcategs.length; j++) { 
                fcateg = `${fcategs[j]}`;
                value  = eval(`${fcateg}`)[i];
                interv = eval(`${fcateg}_intervs`);
                msg    = eval(`${fcateg}_msgs`);

                for (k = 0; k < interv.length; k++) {
                    if (value >= interv[k] && value < interv[k+1]) {
                        window[`${fcateg}_value_${i}`] = value;
                        window[`${fcateg}_msg_${i}`] = msg[k];
                        break;
                    }
                }
            }
        console.log(`${eval(`fweather_value_${i}`)} ${eval(`fweather_msg_${i}`)}\n  ${eval(`ftempM_msg_${i}`)}/${eval(`ftempm_msg_${i}`)}\n  ${eval(`ftempM_value_${i}`)}°C ~ ${eval(`ftempm_value_${i}`)}°C`);
        }
    }})
</script>
{% endcapture %}
{{ weather | remove: "<script>" | remove: "</script>"}}