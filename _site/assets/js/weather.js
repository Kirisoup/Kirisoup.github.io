

    doneWeather = false;

    fetch('https://api.open-meteo.com/v1/forecast?latitude=36.7&longitude=137.85&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,wind_direction_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=Asia%2FTokyo&past_days=1&forecast_days=8')
    .then(response => response.json())
    .then(jsonWeather => { if (!doneWeather) { doneWeather = true;

        console.log(jsonWeather);

        // current weather

        
        _weather = jsonWeather.current.weather_code;
        _weather_intervs  = [-1, 1, 2, 3, 48, 51, 55, 57, 61, 63, 65, 67, 71, 73, 75, 77, 82, 86, 95, 99, 100];
        _weather_msgs = [ '快晴', '半晴', '阴晴', '云天', '浓雾', '细雨', '雾雨', '寒雨', '疏雨', '雨', '強雨', '冰雨', '綿雪', '雪', '大雪', '霰', '豪雨', '豪雪', '风雨', '雪嵐'];
        
        temp = jsonWeather.current.temperature_2m;
        temp_intervs  = [-100, 7, 13, 18, 23, 28, 33, 35, 100];
        temp_msgs = [ '严寒', '寒冷', '清凉', '和暖', '温暖', '炎热', '酷热', '极热'];
        
        humi = jsonWeather.current.relative_humidity_2m;
        humi_intervs  = [0, 40, 70, 85, 95, 100];
        humi_msgs = [ '干燥难耐', '干燥', '适宜', '潮湿', '太潮了'];
        
        winddir = jsonWeather.current.wind_direction_10m;
        winddir_intervs  = [0, 22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5, 360];
        winddir_msgs = [ '北风', '东北风', '东风', '东南风', '南风', '西南风', '西风', '西北风', '北风'];
        
        windscal = jsonWeather.current.wind_speed_10m;
        windscal_intervs  = [0, 2, 7, 13, 20, 31, 41, 52, 63, 76, 88, 104, 118];
        windscal_msgs = [ '无风', '弱风', '轻风', '微风', '和风', '清风', '强风', '疾风', '大风', '烈风', '狂风', '暴风', '飓风'];
        
        categs = ['_weather' , 'temp' , 'humi' , 'winddir' , 'windscal'];

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

        console.log(`天气: ${ _weather_value } ${ _weather_msg }`);
        console.log(`温度: ${ temp_value }°C ${ temp_msg }`);
        console.log(`湿度: ${ humi_value }\% ${ humi_msg }`);
        console.log(`风向: ${ winddir_value }° ${ winddir_msg }`);
        console.log(`风速: ${ windscal_value }km/h ${ windscal_msg }`);
        

        // weather forcast

        
        fweather = jsonWeather.daily.weather_code;
        fweather_intervs  = _weather_intervs;
        fweather_msgs = _weather_msgs;
        
        ftempM = jsonWeather.daily.temperature_2m_max;
        ftempM_intervs  = temp_intervs;
        ftempM_msgs = temp_msgs;
        
        ftempm = jsonWeather.daily.temperature_2m_min;
        ftempm_intervs  = temp_intervs;
        ftempm_msgs = temp_msgs;
        

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


