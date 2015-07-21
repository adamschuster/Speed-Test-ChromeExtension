
$(document).ready(function(){
      //MeasureConnectionSpeed();
});


var imageAddr = "https://upload.wikimedia.org/wikipedia/commons/1/1e/Allied_Invasion_Force.jpg"; 
var downloadSize = 574331; //bytes

window.onload = function() {
    var oProgress = document.getElementById("progress");
    oProgress.innerHTML = "Loading the image, please wait...";
    window.setTimeout(MeasureConnectionSpeed, 1);
};

function MeasureConnectionSpeed() {
    var oProgress = document.getElementById("progress");
    var startTime, endTime;
    var download = new Image();
    download.onload = function () {
        endTime = (new Date()).getTime();
        showResults();
    }
    
    download.onerror = function (err, msg) {
        oProgress.innerHTML = "Invalid image, or error downloading";
    }
    
    startTime = (new Date()).getTime();
    var cacheBuster = "?nnn=" + startTime;
    download.src = imageAddr + cacheBuster;
    
    function showResults() {
        var duration = (endTime - startTime) / 1000;
        var bitsLoaded = downloadSize * 8;
        var speedBps = (bitsLoaded / duration).toFixed(2);
        var speedKbps = (speedBps / 1024).toFixed(2);
        var speedMbps = (speedKbps / 1024).toFixed(2);
        oProgress.innerHTML = "Your connection speed is: <br />" + 
           speedBps + " bps<br />"   + 
           speedKbps + " kbps<br />" + 
           speedMbps + " Mbps<br />";
    }
}