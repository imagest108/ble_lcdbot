var name = 'YOMI';
var counter = 0;
var missingMsgArray = ["Are you there?","I can't see you", "So lonely..", ".........", "ᗜੂͦ﹏ᗜੂͦ"];
var greetingMsgArray = ["Hello, buddy!","I'm happy!", "Welcome<3","◉‿◉", "How are you?"];


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
  $('#givenName').text(name);

  var message='';
  message = "I'm "+name+"!";
  $('#botmessage').attr("data-content",message);
 
}

ViewController.prototype.toggleMessage = function(caseNum) {

  console.log("\n\nViewController::toggleMessage\n\n");
  
  this.messageClear();

  var randomMessage = '';

  var randomNum = Math.floor((Math.random() * 5) + 1); 
  if(caseNum == 0) randomMessage = missingMsgArray[randomNum];
  else if(caseNum == 1) randomMessage = greetingMsgArray[randomNum];
  $('#botmessage').attr("data-content",randomMessage);

  counter = 0;

}

ViewController.prototype.addMessage = function(caseNum) {

   console.log("\n\nViewController::addMessage\n\n");
  
   var newId = 'botmessage'+counter.toString();
   $('#chattext').append('<h4 id="tempID" class="bubbledLeft"></h4>');
   $('#tempID').attr('id',newId);

  var randomMessage = '';

  var randomNum = Math.floor((Math.random() * 5) + 1); 
  if(caseNum == 0) randomMessage = missingMsgArray[randomNum];
  else if(caseNum == 1) randomMessage = greetingMsgArray[randomNum];

  var newMessage = document.getElementById(newId);
  newMessage.setAttribute("data-content", randomMessage);

  counter++;

}


ViewController.prototype.clear = function() {

  $('#page-scanning').css('display','none');
  $('#page-getName').css('display','none');
}

ViewController.prototype.messageClear = function() {

  var parent = document.getElementById("chattext");
  for(var i = 0; i < counter; i++){
    var childId = 'botmessage'+counter;
    var childMessage = document.getElementById(childId);
    parent.removeChild(childMessage);
  }
}
