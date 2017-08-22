setInterval(function() {
    var d = new Date(),
    minutes = d.getMinutes().toString().length == 1 ? '0'+d.getMinutes() : d.getMinutes(),
    hours = d.getHours().toString().length == 1 ? '0'+d.getHours() : d.getHours(),
    seconds = d.getSeconds().toString().length == 1 ? '0'+d.getSeconds() : d.getSeconds(),
    days = ['日曜日','月曜日','火曜日','水曜日','木曜日','金曜日','土曜日'],
    months = ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十月'];

    var dayPrint = days[d.getDay()]
    var datePrint = d.getDate()+' '+months[d.getMonth()]+' '+d.getFullYear()
    var timePrint = hours+':'+minutes+':'+seconds
    var currentTimeString = days[d.getDay()]+' '+d.getDate()+' '+months[d.getMonth()]+' '+d.getFullYear()+' - '+hours+':'+minutes+':'+seconds;
    document.getElementById("day").innerHTML = dayPrint;
    document.getElementById("date").innerHTML = datePrint;
    document.getElementById("time").innerHTML = timePrint;
}, 1000);
