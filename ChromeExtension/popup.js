
$(document).ready(function(){
    
    $('.btnStart').click(function()
	  {
		startTest();
	  });
	  	 
	  
	 $('.hoverDiv').mouseenter(function () {
		$(this).find('.content').animate({
			height: '25px'
				}, 200);
		}).mouseleave(function () {
       $(this).find('.content').animate({
          height: '0px'
		}, 200);
		
	}).click(function () {
       $(this).find('.content').animate({
           height: $(this).find('.content')[0].scrollHeight
       }, 200);
	});
	  
});



function progress(percent, $element) {
    var progressBarWidth = percent * $element.width() / 100;
    $element.find('div').animate({ width: progressBarWidth }, 500).html(percent + "% ");
}


var imageAddr0 = "https://upload.wikimedia.org/wikipedia/commons/1/1e/Allied_Invasion_Force.jpg"; 
var downloadSize0 = 574331; //bytes

var imageAddr1 = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Austroboletus_occidentalisRH.jpg/1280px-Austroboletus_occidentalisRH.jpg";
var downloadSize1 = 348495;

var imageAddr2 = "https://upload.wikimedia.org/wikipedia/commons/e/ec/68thNY_Gettysburg.png";
var downloadSize2 = 102428;

var imageAddr3 = "http://axeetech.com/wp-content/uploads/2014/09/4k-wallpaper.jpg";
var downloadSize3 = 2112829;




function startTest(){

	var oProgress = document.getElementById("progress");
    oProgress.innerHTML = "<div id='progressBar'><div></div></div></br>" + "Test in progress, please wait...";
    window.setTimeout(MeasureConnectionSpeed, 1);
}

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
    download.src = imageAddr0 + cacheBuster;
    
    function showResults() {
        var duration = (endTime - startTime) / 1000;
        var bitsLoaded = downloadSize0 * 8;
        var speedBps = (bitsLoaded / duration).toFixed(2);
        var speedKbps = (speedBps / 1024).toFixed(2);
        var speedMbps = (speedKbps / 1024).toFixed(2);
        oProgress.innerHTML = "Your connection speed is: <br />" + 
           speedBps + " bps<br />"   + 
           speedKbps + " kbps<br />" + 
           speedMbps + " Mbps<br />" + 
           "Test Duration: " + duration + " seconds";

           console.log(document.getElementById("sustainTime").value);
           
    }	
	progress(56, $('#progressBar'));	
}



