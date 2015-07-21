  
 SomApi.account = "SOM55acb149168bc";  //your API Key here
        SomApi.domainName = "speedof.me";     //your domain or sub-domain here
        SomApi.onTestCompleted = onTestCompleted;
        SomApi.onError = onError;
        SomApi.onProgress = onProgress;
        SomApi.config = {
sustainTime: 4,
testServerEnabled: true,
userInfoEnabled: true,
latencyTestEnabled: true,
uploadTestEnabled: true,
progress: {
enabled: true,
verbose: false
}
}

        var msgDiv = document.getElementById("msg");
        var prgsDiv = document.getElementById("prgs");

        function btnStartClick() {
            //set config values
      SomApi.config.sustainTime = document.getElementById("sustainTime").value;
            SomApi.config.testServerEnabled = document.getElementById("testServerEnabled").checked;
            SomApi.config.userInfoEnabled = document.getElementById("userInfoEnabled").checked;
            SomApi.config.latencyTestEnabled = document.getElementById("latencyTestEnabled").checked;
            SomApi.config.uploadTestEnabled = document.getElementById("uploadTestEnabled").checked;
            SomApi.config.progress.enabled = document.getElementById("progress.enabled").checked;
            SomApi.config.progress.verbose = document.getElementById("progress.verbose").checked;

            msg.innerHTML = "<h3>--------------- Test Result ---------------</h3><h4>" +
                "Speed test in progress. Please wait...</h4>";
            SomApi.startTest();
        }

        function onTestCompleted(testResult) {
            msg.innerHTML = "<h3>--------------- Test Result ---------------</h3><h4>" +
                "Download: " + testResult.download + " Mbps <br/>" +
                "Upload: " + testResult.upload + " Mbps <br/>" +
                "Latency: " + testResult.latency + " ms <br/>" +
                "Jitter: " + testResult.jitter + " ms <br/>" +
                "Test Server: " + testResult.testServer + "<br/>" +
                "IP: " + testResult.ip_address + "<br/>" +
                "Hostname: " + testResult.hostname + "<br/>" +
            "</h4>";
        }

        function onError(error) {
            msg.innerHTML = "Error " + error.code + ": " + error.message;
        }

        function onProgress(progress) {
            prgs.innerHTML =
            "<h3>--------------- Progress ---------------</h3><h4>" +
                "Progress Type: " + progress.type + "<br/>" +
                "Pass: " + progress.pass + "<br/>" +
                "Percent Done: " + progress.percentDone + "% <br/>" +
                "Current Speed: " + progress.currentSpeed + " Mbps <br/>" +
            "</h4>";
        }


$(document).ready(function(){ 
  $('#btnStart').click(function()
    {
      btnStartClick();
    }
    );
});












 /*$(document).ready(function(){ 
  $('#btnStart').click(function()
    {
      btnStartClick();
    }
    );
});



  SomApi.account = "SOM55acb149168bc";   //your API Key here
  SomApi.domainName = "speedof.me";      //your domain or sub-domain here 
  SomApi.config.sustainTime = 1; 
  SomApi.onTestCompleted = onTestCompleted;
  SomApi.onError = onError;

  var msgDiv = document.getElementById("msg");
  
  function btnStartClick() {
   msgDiv.innerHTML = "<h3>Speed test in progress. Please wait...</h3>";
   SomApi.startTest();
  }
  
  function onTestCompleted(testResult) {
    msgDiv.innerHTML = 
    "<h3>"+
      "Download: "   +testResult.download +"Mbps <br/>"+
      "Upload: "     +testResult.upload   +"Mbps <br/>"+
      "Latency: "    +testResult.latency  +"ms <br/>"+
      "Jitter: "     +testResult.jitter   +"ms <br/>"+
      "Test Server: "+testResult.testServer +"<br/>"+
      "IP: "         +testResult.ip_address +"<br/>"+
      "Hostname: "   +testResult.hostname +"<br/>"+
    "</h3>";
  }
  
  function onError(error) {
   msgDiv.innerHTML = "Error "+ error.code + ": "+error.message;
  }*/



