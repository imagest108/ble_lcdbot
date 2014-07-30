/*
    Chat Example for Bluetooth Serial PhoneGap Plugin
    http://github.com/don/BluetoothSerial

    Copyright 2013 Don Coleman

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
*/

/* jshint quotmark: false, unused: vars */
/* global cordova, bluetoothSerial, listButton, connectButton, sendButton, disconnectButton */
/* global chatform, deviceList, message, messages, statusMessage, chat, connection */
'use strict';

var cssDebug = false;
var view;
var app = {

    

    initialize: function(){
        
        if(cssDebug){
            view = new ViewController(app);
            view.startchat();
        }else{
            this.bind();
        }
    },
    bind: function(){
    
            document.addEventListener('deviceready', this.onDeviceReady, false);
            //document.addEventListener("pause", this.onPause, false);
            //document.addEventListener('resume', this.onResume, false);
    },
    onDeviceReady: function(){

        if(window.cordova.logger) window.cordova.logger.__onDeviceReady();
        console.log('Happy Circuits::onDeviceReady');
        
        view = new ViewController(app);
        
        view.scan();
        app.listup();
                
    },
    listup: function(event) {
        
        console.log('Happy Circuits::listup');
        app.setStatus("Looking for Bluetooth Devices...");
        bluetoothSerial.list(app.ondevicelist, app.generateFailureFunction("List Failed"));
    },
    ondevicelist: function(devices) {
    
        var option;

        console.log("Happy Circuits::ondevicelist");

        devices.forEach(function(device) {

            option = document.createElement('option');
            if (device.hasOwnProperty("uuid")) {
                option.value = device.uuid;
            } else if (device.hasOwnProperty("address")) {
                option.value = device.address;
            } else {
                option.value = "ERROR " + JSON.stringify(device);
            }
            option.innerHTML = device.name;
            deviceList.appendChild(option);
        });

        if (devices.length === 0) {
            option = document.createElement('option');
            option.innerHTML = "No Bluetooth Devices";
            deviceList.appendChild(option);

            if (cordova.platformId === "ios") { // BLE
                app.setStatus("No Bluetooth Peripherals Discovered.");
            } else { // Android
                app.setStatus("Please Pair a Bluetooth Device.");
            }           
        } else {
            app.setStatus("Found " + devices.length + " device" + (devices.length === 1 ? "." : "s."));
            app.connect();
        }

    },
    onmessage: function(message) {
        // messages.value += "Them: " + message;
        // messages.scrollTop = messages.scrollHeight;
        console.log("from serial: "+message);
        //view.startchat();
        var caseNum = parseInt(message);
        
        view.toggleMessage(caseNum);

        if(caseNum == 1) {
            console.log("say hello");
        }else if(caseNum == 0) {
            console.log("can't find you.");
            botmessage.innerHTML = "Are you there?";
        }
    },
    connect: function() {
        console.log("Happy Circuits::connect");

        //console.log(deviceList[0].value);     
        var device = deviceList[0].value;
        //app.disable(connectButton);
        app.setStatus("Connecting...");
        console.log("Requesting connection to " + device);
        bluetoothSerial.connect(device, app.onconnect, app.ondisconnect);

    },
    onconnect: function() {
        console.log("Happy Circuits::onconnect");
        view.didConnect();

    },
    onwrite: function(){

        console.log("Happy Circuits::onwrite");
        
        var text = "s"+ "\n";
        bluetoothSerial.write(text, app.onchat, app.ondisconnect);
    },

    onchat: function(){

        view.startchat();
        bluetoothSerial.subscribe("\n", app.onmessage, app.generateFailureFunction("Subscribe Failed"));

    },

    ondisconnect: function(reason) {
        var details = "";
        if (reason) {
            details += ": " + JSON.stringify(reason);
        }
        // connection.style.display = "block";
        // //app.enable(connectButton);
        // chat.style.display = "none";
        // app.setStatus("Disconnected");
    },
    setStatus: function(message) { // setStatus
        console.log(message);

        // window.clearTimeout(app.statusTimeout);
        // statusMessage.innerHTML = message;
        // statusMessage.className = 'fadein';

        // // automatically clear the status with a timer
        // app.statusTimeout = setTimeout(function () {
        //     statusMessage.className = 'fadeout';
        // }, 5000);
    },
    generateFailureFunction: function(message) {
        var func = function(reason) { // some failure callbacks pass a reason
            var details = "";
            if (reason) {
                details += ": " + JSON.stringify(reason);
            }
            //app.setStatus(message + details);
        };
        return func;
    }
};





