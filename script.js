
function $(id) {
    return document.getElementById(id);
}
var isChecking = false;
var checksFailed = 0;
var failureMessages = ["", "Double checking...", "Third time's the charm..."];
var timeout = 2000;
var locationLookup = false;
var imgArray = [];

//Credits go to Chuck Callebs at Stack Overflow for (finding) this function
//http://stackoverflow.com/questions/4282151/is-it-possible-to-ping-a-server-from-javascript
function Pinger_ping(ip) {
	imgArray.push({});
    var index = imgArray.length - 1;

    if (!isChecking) {
        //checking
        //alert('Checking...');
        setToMaybe();
        //alert('Maybe set...');
        isChecking = true;
        imgArray[index].inUse = true;
        imgArray[index].ip = ip;

        imgArray[index].img = new Image();
        var _that = imgArray[index];
        _that.inUse = true;

        imgArray[index].timer = setTimeout(function() {
            if (_that.inUse && isChecking) {
                _that.inUse = false;
                //failure
                console.log("Image loading timed out!");
                setToNo();
            }
        }, timeout);

        imgArray[index].start = new Date().getTime();
        imgArray[index].img.src = "https://" + ip + "/blank.gif?cachebreaker=" + new Date().getTime();

        imgArray[index].img.onload = function() {
            if (_that.inUse) {
                _that.inUse = false;
                var loadTime = Math.abs(new Date() - imgArray[index].start);

                if (loadTime < timeout) {
                    var height = imgArray[index].img.height;
                    var width = imgArray[index].img.width;
                    //alert('Load time took:' + loadTime);

                    console.log("Image loading took " + loadTime + " and is " + height + "px tall, " + width + "px wide");

                    setStatus(loadTime);
                }
            }
        };

        imgArray[index].img.onerror = function() {
            if (_that.inUse) {
                _that.inUse = false;

                //blank.gif should exist; this is a failure
                console.log("Image loading error!");
                setToNo();
            }
        };
    }
}

function setStatus(loadTime) {
    /*if (loadTime < 40) {
        //alert('Loaded too fast to be true!');
        setToNo();
    } else {*/
        checksFailed = 0;
        $("yestime").innerHTML = "The mothership responded in " + loadTime + " ms.";
        setToYes();
    //}
}

function setToMaybe() {
    isChecking = true;

    $("yeslink").style.color = "#FF9000";
    $("status").style.color = "#FF9000";
    $("yeslink").innerHTML = "MAYBE";
    $("yessub").innerHTML = "Just a moment, I'm checking...";
    $("status").innerHTML = "currently being tested.";
    $("yeslink").setAttribute("class", "");

    $("yestime").innerHTML = "Connecting...";
}

function setToYes() {

    $("yeslink").style.color = "green";
    $("status").style.color = "green";
    $("yeslink").innerHTML = "YES!";
    $("yessub").innerHTML = "Your Internet is Working!";
    $("status").innerHTML = "is working!";

    if (!locationLookup) {
        locationLookup = true;

        var ipString = $("currentIP").innerHTML;
        var ip = ipString.substring(ipString.lastIndexOf(" ") + 1);
        //alert("Looking up " + 'http://www.geoplugin.net/json.gp?ip=' + ip + '&jsoncallback=setLocation');

        var script = document.createElement('script');
        script.src = 'https://freegeoip.net/json/' + ip + '?callback=setLocation';

        document.getElementsByTagName('head')[0].appendChild(script);
    }
    setLinks();
}

function setLocation(data) {
    var locationDesc = "Your <b>approximate location</b> (based on IP): " + data.city + ", " + data.region_name + ' ' + data.zip_code + ", " + data.country_name;
    $("location").innerHTML = locationDesc;
    $("location").setAttribute("style", "");
}

function setToNo() {
    if (checksFailed + 1 >= failureMessages.length) {
        checksFailed = 0;
        $("yestime").innerHTML = "The mothership didn't respond :(";

        $("yeslink").style.color = "#eb0000";
        $("status").style.color = "#eb0000";
        $("yeslink").innerHTML = "NO!";
        $("yessub").innerHTML = "Something's Wrong!";
        $("status").innerHTML = "isn't working!";

    } else {
        checksFailed++;
        $("yestime").innerHTML = failureMessages[checksFailed];
        setTimeout(function() {
            isChecking = false;
            runTest();
        }, 1000);
    }
}

function setLinks() {
    setTimeout(function() {
        isChecking = false;
        $("yeslink").setAttribute("class", "grow");
        var linkA = $("status_description");
        $("status_description").innerHTML = linkA.innerHTML.replace("click here to test again", "<a href=\"javascript:void(0)\" onclick=\"runTest()\" title=\"Test again!\">click here to test again</a>");
    }, 500);
}

function runTest() {
    Pinger_ping('www.ismyinternetworking.com');
}
