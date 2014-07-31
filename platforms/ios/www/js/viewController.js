var name = 'YOMI';

function ViewController(app) {
  this.app = app;
  this.status = '';

  this.debug = false;
}

ViewController.prototype.scan = function() {

  console.log("\n\nViewController::scan\n\n");

  $('#page-scanning').css('display','block');
  $('#bar-title').text('SCAN');
  $('#scanMessage').text('Bluetooth Scanning..');

  // var html = $('body').html();
  //
  // console.log("********************in chat*************************");
  // console.log(html);

}

ViewController.prototype.scanFailed = function() {

  console.log("\n\nViewController::scanFailed\n\n");

  $('#page-scanning').css('display','block');
  $('#bar-title').text('SCANFailed');
  $('#scanMessage').text('No Bluetooth Peripherals Discovered.');
}

ViewController.prototype.didConnected = function() {

  console.log("\n\nViewController::didConnected\n\n");
  this.getName();
}

ViewController.prototype.getName = function() {

  console.log("\n\nViewController::getName\n\n");
  this.clear();
  $('#page-getName').css('display','block');
  $('#bar-title').text('HELLO');

  var that = this;
  $('#nameSubmit').click(function() {
      name = $('#newName').val();
      console.log("Submitted name: "+name);
      that.app.onwrite();
  });
}

ViewController.prototype.startchat = function() {

  console.log("\n\nViewController::chat with "+name+"\n\n");

  this.clear();
  $('#page-chat').css('display','block');
  $('#bar-title').text(name);
  // var html = $('body').html();
  // console.log("********************in chat*************************");
  // console.log(html);

}

ViewController.prototype.toggleMessage = function(caseNum) {

  var message='';
  console.log("\n\nViewController::toggleMessage\n\n");
    //this.clear();
  if(caseNum == 0) message = "Are you there?";
  else if(caseNum == 1) message = "Hello, buddy!";

  $('#botmessage').text(message);

}

ViewController.prototype.clear = function() {

  $('#page-scanning').css('display','none');
  $('#page-getName').css('display','none');
}
