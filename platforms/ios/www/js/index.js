/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var view;
var cssDebug = false;
var deviceID = "C46885AB-D1D5-41CD-B4F0-1B4428788B37";

var caseNum = 0;
var _caseNum = 0;
var counter=0;


var app = {
    // Application Constructor
    initialize: function() {
        if(cssDebug){
          view = new ViewController(app);
          view.startchat();
        }else{
          this.bindEvents();
        }
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
      console.log("Happy Circuits::onDeviceReady");
      view = new ViewController(app);
      app.scan();
    },
    scan: function(){
      app.listup();
      view.scan();
    },

    listup: function(){
      console.log('Happy Circuits::listup');
      bluetoothSerial.list(app.ondevicelist, app.generateFailureFunction("List Failed"));
    },

    ondevicelist: function(devices) {
      console.log("Happy Circuits::ondevicelist");
      //console.log(devices);
      if (devices.length === 0) {
        view.scanFailed();
        setTimeout(app.scan, 2000);
      }else{
        console.log("Found " + devices.length + " device" + (devices.length === 1 ? "." : "s."));
        app.connect();
      }

    },

    connect: function() {
      console.log("Happy Circuits::connect");
      var device = deviceID;


      // devices.forEach(function(device) {
      //   if (device.hasOwnProperty("uuid")) {
      //     if(device.uuid == deviceID) {
      //       console.log("Requesting connection to " + deviceID);
      //       bluetoothSerial.connect(device, app.onconnect, app.ondisconnect);
      //     } else {
      //       app.generateFailureFunction("connection Failed");
      //     }
      //   }
      // });
      //console.log(deviceList[0].value);
      // var device = deviceList[0].value;
      // //app.disable(connectButton);
      // app.setStatus("Connecting...");

      console.log("Requesting connection to " + device);
      bluetoothSerial.connect(device, app.onconnect, app.ondisconnect);
    },

    onconnect: function() {
      console.log("Happy Circuits::onconnect");
      view.didConnected();
    },

    ondisconnect: function(reason) {
      console.log("Happy Circuits::ondisconnect");

      var details = "";
      if (reason) {
          details += ": " + JSON.stringify(reason);
      }
    },

    onwrite: function(){
      console.log("Happy Circuits::onwrite");

      var text = "s"+ "\n";
      bluetoothSerial.write(text,app.onchat,app.ondisconnect);

    },
    onchat: function(){
      console.log("Happy Circuits::onchat");

      view.startchat();
      setTimeout(function(){
        bluetoothSerial.subscribe("\n", app.onmessage, app.generateFailureFunction("Subscribe Failed"));
      },500);  
    },
    onmessage: function(message) {
      // messages.value += "Them: " + message;
      // messages.scrollTop = messages.scrollHeight;
      console.log("from serial: "+message);
      caseNum = parseInt(message);
      
      
      if(caseNum != _caseNum) {
        view.toggleMessage(caseNum);
      }
      else if(caseNum == _caseNum){
        // counter++;
        // if(counter > 2000){
        //     view.addMessage(caseNum);
        //     counter = 0;
        // }
      };

      // if(caseNum == 1) {
      //     console.log("say hello");
      // }else if(caseNum == 0) {
      //     console.log("can't find you.");
      //     botmessage.innerHTML = "Are you there?";
      // }
      _caseNum = caseNum;
    },
    generateFailureFunction: function(message) {
      var func = function(reason) { // some failure callbacks pass a reason
        var details = "";
        if (reason) {
          details += ": " + JSON.stringify(reason);
        }
        app.setStatus(message + details);
      };
      return func;
    },

    setStatus: function(message) {
        console.log(message);
    }

};
