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
 
 
var imageAddr0 = "https://upload.wikimedia.org/wikipedia/commons/e/ec/68thNY_Gettysburg.png";
var downloadSize0 = 102428;
 
var imageAddr1 = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Austroboletus_occidentalisRH.jpg/1280px-Austroboletus_occidentalisRH.jpg";
var downloadSize1 = 348495;
 
var imageAddr2 = "https://upload.wikimedia.org/wikipedia/commons/1/1e/Allied_Invasion_Force.jpg";
var downloadSize2 = 574331; //bytes
 
var imageAddr3 = "http://wallfoy.com/wp-content/uploads/2015/01/4k-Ultra-HD_00113.jpg";
var downloadSize3 = 1509825;
 
var imageAddr4 = "http://axeetech.com/wp-content/uploads/2014/10/alien_orbit7680x4320.jpg";
var downloadSize4 = 6967482;
 
//var imageAddr3 = "http://axeetech.com/wp-content/uploads/2014/09/4k-wallpaper.jpg";
//var downloadSize3 = 2112829;
 
//var imageAddr4 = "http://interfacelift.com/wallpaper/Ddf418b2/03245_londonfromtheshard_3840x2160.jpg";
//var downloadSize4 = 7699463;
 
var imageList = [imageAddr0, imageAddr1, imageAddr2, imageAddr3, imageAddr4];
//console.log(imageList[0]);
 
var sizeList = [downloadSize0, downloadSize1, downloadSize2, downloadSize3, downloadSize4];
 
 
function startTest(){
 
    var oProgress = document.getElementById("progress");
    oProgress.innerHTML = "<div id='progressBar'><div></div></div></br>" + "Test in progress, please wait...";
    window.setTimeout(MeasureConnectionSpeed, 1);
}
 
 
function MeasureConnectionSpeed() {
 
       var oProgress = document.getElementById("progress");
       var numberofImages = document.getElementById("sustainTime").value;
       //console.log(numberofImages);
       var numberofLoaded = 0;
       var step = 100/numberofImages;            
       var startTime, endTime;   
       var totalSize = 0;
               
               
      startTime = (new Date()).getTime();
               
       var cacheBuster = "?nnn=" + startTime;
            for ( var i = 0; i < numberofImages; i++){
                  imageList[i] = imageList[i] + cacheBuster;
             }             
               
      totalSize = iterateImages(numberofImages, totalSize, step, sizeList, imageList, oProgress);
               
      endTime = (new Date()).getTime();
                               
      //externalLoadFunction.onload = showResults(startTime, endTime, totalSize, oProgress);
}
 
 
function progress(percent, $element) {
 
    console.log("SHIT");
 
    var progressBarWidth = percent * $element.width() / 100;
    $element.find('div').animate({ width: progressBarWidth }, 500).html(percent + "% ");
}
 
 
function log(list, index, step){
                               
      var status_percent = (step * (index+1));
      console.log(step + "    " + index);
      console.log(status_percent);
      progress(status_percent, $('#progressBar'));

}
 
function externalLoadFunction (newimages, imageList, i, step){
                                               
newimages.onload=function(){
          console.log(newimages);
         log(imageList, i, step);
 }

 newimages.onerror = function (err, msg) {
 oProgress.innerHTML = "Error encountered, check internet connection or try again";
     }
}
 
               
function iterateImages(numberofImages, totalSize, step, sizeList, imageList, oProgress){
                for ( var i = 0; i < numberofImages; i++){
               
         //var newimages=[];
         //newimages[i]=new Image();
         
          //newimages[i].src = imageList[i];           
 
        var newimages = new Image();

         newimages.src = imageList[i];
                                               
         externalLoadFunction(newimages,imageList, i, step);
                                               
        /*newimages[i].onload=function(){
        log(imageList, i, step);                                                   
       }
   
        newimages[i].onerror = function (err, msg) {
        oProgress.innerHTML = "Error encountered, check internet connection or try again";
       }*/

     //console.log(newimages[i]);
  
         totalSize += sizeList[i];
      }
return totalSize;
 //showResults();
}
 
 
function showResults(startTime, endTime, totalSize, oProgress) {
        var duration = (endTime - startTime) / 1000;
        var bitsLoaded = totalSize * 8;
        var speedBps = (bitsLoaded / duration).toFixed(2);
        var speedKbps = (speedBps / 1024).toFixed(2);
        var speedMbps = (speedKbps / 1024).toFixed(2);
        oProgress.innerHTML = "Your connection speed is: <br />" +
           speedBps + " bps<br />"   +
           speedKbps + " kbps<br />" +
           speedMbps + " Mbps<br />" +
           "Test Duration: " + duration.toFixed(2) + " seconds <br />" +
                                   "Total Downloaded Kb: " + (bitsLoaded*0.000125).toFixed(2) ;
                                  
                                   console.log(totalSize);
}