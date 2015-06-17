'use strict';
var util = require('util');
var APS = "aps";
var Payload = function(options) {
};

Payload.prototype.getParams = function() {
    return this.params;
};
Payload.prototype.setParams = function(params) {
    this.params = params;
    return this;
};
Payload.prototype.addParam = function(key, obj) {
    if (key.toLowerCase() === APS) {
        throw new Error('the key can\'t be aps');
    }
    if (!this.params) this.params = {};
    this.params[key] = obj;
    return this;
};

Payload.prototype.getAlert = function() {
    return this.alert;
};
Payload.prototype.setAlert = function(alert) {
    this.alert = alert;
    return this;
};

Payload.prototype.getBadge = function() {
    return this.badge;
};
Payload.prototype.setBadge = function(badge) {
    this.badge = badge;
    return this;
};

Payload.prototype.getSound = function() {
    return this.sound;
};
Payload.prototype.setSound = function(sound) {
    this.sound = sound;
    return this;
};

Payload.prototype.getAlertBody = function() {
    return this.alertBody;
};
Payload.prototype.setAlertBody = function(alertBody) {
    this.alertBody = alertBody;
    return this;
};

Payload.prototype.getAlertActionLocKey = function() {
    return this.alertActionLocKey;
};
Payload.prototype.setAlertActionLocKey = function(alertActionLocKey) {
    this.alertActionLocKey = alertActionLocKey;
    return this;
};

Payload.prototype.getAlertLaunchImage = function() {
    return this.alertLaunchImage;
};
Payload.prototype.setAlertLaunchImage = function(alertLaunchImage) {
    this.alertLaunchImage = alertLaunchImage;
    return this;
};

Payload.prototype.getAlertLocArgs = function() {
    return this.alertLocArgs;
};
Payload.prototype.setAlertLocArgs = function(alertLocArgs) {
    this.alertLocArgs = alertLocArgs;
    return this;
};

Payload.prototype.getAlertLocKey = function() {
    return this.alertLocKey;
};
Payload.prototype.setAlertLocKey = function(alertLocKey) {
    this.alertLocKey = alertLocKey;
    return this;
};

Payload.prototype.getContentAvailable = function() {
    return this.contentAvailable;
};
Payload.prototype.setContentAvailable = function(contentAvailable) {
    this.contentAvailable = contentAvailable;
    return this;
};

Payload.prototype.toString = function() {
    var object = {};
    var apsObj = {};
    if (this.getAlert()) {
        apsObj.alert =  this.getAlert();
    } else {
        if (this.getAlertBody() !== null || this.getAlertLocKey() !== null) {
            var alertObj = {};
            this.getAlertBody() !== null && (alertObj['body'] = this.getAlertBody());
            this.getAlertActionLocKey() !== null&& (alertObj['action-loc-key'] = this.getAlertActionLocKey());
            this.getAlertLocKey() !== null&& (alertObj['loc-key'] = this.getAlertLocKey());
            this.getAlertLaunchImage() !== null&& (alertObj['launch-image'] = this.getAlertLaunchImage());
            this.getAlertLocArgs() !== null && (alertObj['loc-args'] = this.getAlertLocArgs());
            apsObj.alert = alertObj;
        }
    }

    typeof this.getBadge() !== 'undefined' && (apsObj.badge = this.getBadge());
    // 判断是否静音
    if (this.getSound() && 'com.gexin.ios.silence' !== this.getSound()) {
        apsObj.sound = this.getSound();
    }
    if (this.getContentAvailable() === 1) {
        apsObj['content-available'] = 1;
    }
    object.APS = apsObj;
    var params = this.getParams();
    for (var key in params) {
        if (params.hasOwnProperty(key)) {
            object[key] = params[key];
        }
    }
    return JSON.stringify(object);
};

module.exports = Payload;