$(document).ready(function(){
   
    $('.btn-big-red').click(function()
         {
				//console.log($('input[name="view2"]:checked').val());
				
				//var reading = document.getElementById("reading");
				var readingType = $('input[name="view2"]:checked').val()
				
				console.log(readingType);
			
				var numberofImages = document.getElementById("sustainTime").value;
				console.log(numberofImages);
			 
           startTest(readingType, numberofImages);
          });
		  
		 $("#webButton").click(function()
		 {
				chrome.tabs.create({url: "http://www.rocketlaunchlabs.com"}); 
		 
		 });

      /*$('.hoverDiv').mouseenter(function () {
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
     });*/
	 
});
 
 
var imageAddr0 = "http://www.byui.edu/images/agriculture-life-sciences/flower.jpg";
var downloadSize0 = 29746; //bytes
 
var imageAddr1 = "https://upload.wikimedia.org/wikipedia/commons/e/ec/68thNY_Gettysburg.png";
var downloadSize1 = 102428;

var imageAddr2 = "https://upload.wikimedia.org/wikipedia/commons/6/6a/Rojava_Kurdisch_kontrollierte_Gebiete.jpg";
var downloadSize2 = 149254;

var imageAddr3 = "https://upload.wikimedia.org/wikipedia/commons/b/bb/Nairo_Quintana%2C_Vuelta_al_Pais_Vasco_2013_%28cropped%29.jpg";
var downloadSize3 = 229637;
 
var imageAddr4 = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Austroboletus_occidentalisRH.jpg/1280px-Austroboletus_occidentalisRH.jpg";
var downloadSize4 = 348495;
 
var imageAddr5 = "https://upload.wikimedia.org/wikipedia/commons/1/1e/Allied_Invasion_Force.jpg";
var downloadSize5 = 574331; 

var imageAddr6 = "http://www.revitalizenotmilitarize.org/wp-content/uploads/2013/10/FlowerPower_v1.png";
var downloadSize6 = 1049930;
 
var imageAddr7 = "http://wallfoy.com/wp-content/uploads/2015/01/4k-Ultra-HD_00113.jpg";
var downloadSize7 = 1509825;
 
var imageAddr8 = "http://www.freshorigins.com/wp-content/uploads/2013/05/good21-copy.jpg";
var downloadSize8 = 2262204;

var imageAddr9 = "http://cliparts.co/cliparts/6Tr/oqg/6Troqg6pc.png";
var downloadSize9 = 5039029;
 
var imageAddr10 = "http://axeetech.com/wp-content/uploads/2014/10/alien_orbit7680x4320.jpg";
var downloadSize10 = 6967482;
 
 
var imageList = [imageAddr0, imageAddr1, imageAddr2, imageAddr3, imageAddr4, imageAddr5, imageAddr6, imageAddr7, imageAddr8, imageAddr9, imageAddr10]; 
var sizeList = [downloadSize0, downloadSize1, downloadSize2, downloadSize3, downloadSize4, downloadSize5, downloadSize6, downloadSize7, downloadSize8, downloadSize9, downloadSize10];
 
 
function startTest(readingType, numberofImages){ 
    var oProgress = document.getElementById("progress");
    oProgress.innerHTML = "<div id='progressBar' style='width:100%'><div></div></div></br>" + "Test in progress, please wait... </br>" + "<div class='loader'>Loading...</div>";
	setTimeout(function(){
		MeasureConnectionSpeed(readingType, numberofImages);
	}, 1);
    //window.setTimeout(MeasureConnectionSpeed, 1);
}
 
 
function MeasureConnectionSpeed(readingType, numberofImages) {

		var oOptions = document.getElementById("menuOptions");
		oOptions.innerHTML = "";
		
		console.log(readingType);
		console.log(numberofImages);
		
 
       var oProgress = document.getElementById("progress");
       //var numberofImages = document.getElementById("sustainTime").value;
       var numberofLoaded = 0;
       var step = 100/numberofImages;            
       var startTime, endTime;   
       var totalSize = 0;	   
	   var position = 0;
               
               
      startTime = (new Date()).getTime();
               
       var cacheBuster = "?nnn=" + startTime;
            for ( var i = 0; i < numberofImages; i++){
                  imageList[i] = imageList[i] + cacheBuster;
            } 
			
	  ajaxImageLoader(numberofImages, numberofLoaded, totalSize, step, sizeList, imageList, oProgress, position, startTime, endTime, readingType);
	  
}


function ajaxImageLoader(numberofImages, numberofLoaded, totalSize, step, sizeList, imageList, oProgress, position, startTime, endTime, readingType){

		var newimage = imageList[position];
		
		console.log("PREPARING TO LOAD: " + newimage);
		
		//$('#progress').prepend("LOADING " + position);
	
		$.ajax({
			type: "GET",		
			url: newimage,
		
			success: function(){
				console.log("PROGRESS  " + step*(position+1));
				console.log("SUCCESSFULLY LOADED: " + newimage + " of size: " + sizeList[position]);	
				numberofLoaded++;
				console.log("IMAGES LOADED: " + numberofLoaded + " OUT OF " + numberofImages)
				totalSize += sizeList[position];				
				console.log("BYTES DOWNLOADED: " + totalSize);
				position++;
				
				progress((step*(position)).toFixed(1), $('#progressBar'));				
				
				if(numberofLoaded < numberofImages){					
					ajaxImageLoader(numberofImages, numberofLoaded, totalSize, step, sizeList, imageList, oProgress, position, startTime, endTime, readingType);
				}
				else{
					endTime = (new Date()).getTime();
						setTimeout(function(){
							showResults(startTime, endTime, totalSize, oProgress, readingType);
						}, 1200);
				}
			},
			
			
			error: function(){
				console.log("ERROR");
				oProgress.innerHTML = "Error encountered, check internet connection or try again with lower test sensitivity <br />" + "<img src='icons/error.png' height='45' width='45'>";
			}		
	});	
} 
 
function progress(percent, $element) {
    var progressBarWidth = percent * $element.width() / 100;
    $element.find('div').animate({ width: progressBarWidth }, 500).html(percent + "% ");
}

 
function showResults(startTime, endTime, totalSize, oProgress, readingType) {
console.log(readingType);


        var duration = (endTime - startTime) / 1000;
        var bitsLoaded = totalSize * 8;
        var speedBps = (bitsLoaded / duration).toFixed(2);
        var speedKbps = (speedBps / 1024).toFixed(2);
        var speedMbps = (speedKbps / 1024).toFixed(2);
		
		oProgress.innerHTML = "<p id='speed'></p>";
		var oSpeed = document.getElementById("speed");
		if(readingType == 1){
			oSpeed.innerHTML = "SUCCESS! Your connection speed is: <br /><br />" +
           "<span class='resultsNum'>" + speedKbps.toString().replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "</span>" + " KiloBytes/second<br />" +
		   "<span class='resultsNum'>" + (speedKbps*8).toString().replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "</span>" + " KiloBits/second<br />" +
         
           "Test Duration: <span class='resultsNum'>" + duration.toFixed(2) + "</span> seconds <br />" +
           "Total Tested: <span class='resultsNum'>" + ((bitsLoaded*0.000125).toFixed(2)).toString().replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",") +  "</span> Kb" + "<br />";
		}
		else if (readingType == 2){
			oSpeed.innerHTML = "SUCCESS! Your connection speed is: <br /><br />" +
         
          "<span class='resultsNum'>" + speedMbps.toString().replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "</span> MegaBytes/second<br />" +
		   "<span class='resultsNum'>" + (speedMbps*8).toString().replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "</span> MegaBits/second<br />" +
           
		   "Test Duration: " + "<span class='resultsNum'>" + duration.toFixed(2) + "</span> seconds <br />" +
           "Total Tested " + "<span class='resultsNum'>" + ((bitsLoaded*0.000125).toFixed(2)).toString().replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "</span> Kb" +"<br />";
		}
		
		     
    console.log(totalSize);
}
