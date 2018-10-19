fetch("https://api.openweathermap.org/data/2.5/weather?zip=90046,us&APPID=33d0a0d0219bef1e831ca05c509cff49").then(function(data) {
        return data.json();
      }).then(function(data) {
        console.log(data.main);
        var celsiusTemp = (data.main.temp-273.15).toFixed(1);
        var celsiusTempMin = (data.main.temp_min-273.15).toFixed(1);
        var celsiusTempMax = (data.main.temp_max-273.15).toFixed(1);
        document.getElementById('temp').innerHTML = celsiusTemp + '&deg;C';
        document.getElementById('type').innerHTML = data.weather[0].description;
        document.getElementById('windSp').innerHTML = 'low: ' + celsiusTempMin + '&deg;C | high: ' + celsiusTempMax + '&deg;C';
      });