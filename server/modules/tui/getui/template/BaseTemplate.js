'use strict';
var util = require('util');
var GtReq = require('../GtReq');
var ApnsUtils = require('../ApnsUtils');
function BaseTemplate(options) {
    options = util._extend({
        appId: '',
        appkey: ''
    }, options);
    util._extend(this, options);
}

BaseTemplate.prototype.setAppId = function (appId) {
    this.appId = appId;
    return this;
};
BaseTemplate.prototype.setAppkey = function (appkey) {
    this.appkey = appkey;
    return this;
};

BaseTemplate.prototype.getTransparent = function () {
    var transparent = new GtReq.Transparent({
        id: '',
        messageId: '',
        action: 'pushmessage',
        taskId: '',
        pushInfo: this.getPushInfo(),
        appId: this.appId,
        appKey: this.appkey
    });
    var actionChainList = this.getActionChain();
    transparent.setActionChain(actionChainList);
    return transparent;
};
BaseTemplate.prototype.getTransmissionContent = function () {
    return '';
};
BaseTemplate.prototype.getPushType = function () {
    return '';
};
BaseTemplate.prototype.getActionChain = function () {
    return null;
};
BaseTemplate.prototype.getPushInfo = function () {
    if (this.pushInfo == null) {
        this.pushInfo = new GtReq.PushInfo({
            actionKey: '',
            badge: '-1',
            message: '',
            sound: ''
        })
    }
    return this.pushInfo;
};
/**
 *
 * @param options  actionLocKey, badge, message, sound, payload, locKey, locArgs, launchImage, contentAvailable
 * @returns {BaseTemplate}
 */
BaseTemplate.prototype.setPushInfo = function (options) {
    this.pushInfo = new GtReq.PushInfo({
        actionLocKey: options.actionLocKey,
        badge: options.badge.toString(), // string.valueOf(badge)
        message: options.message
    });
    options.sound && this.pushInfo.setSound(options.sound);
    options.payload && this.pushInfo.setPayload(options.payload);
    options.locKey && this.pushInfo.setLocKey(options.locKey);
    options.locArgs && this.pushInfo.setLocArgs(options.locArgs);
    options.launchImage && this.pushInfo.setLaunchImage(options.launchImage);
    options.contentAvailable && this.pushInfo.setContentAvailable(options.contentAvailable);

    var payloadLen = ApnsUtils.validatePayloadLength(options);
    if (payloadLen > 256) {
        throw new Error("PushInfo length over limit: " + payloadLen + ". Allowed: 256.");
    }
    return this;
};

module.exports = BaseTemplate;