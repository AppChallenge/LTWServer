'use strict';

var GeTui = require('./GT.push');
var Target = require('./getui/Target');

var APNTemplate = require('./getui/template/APNTemplate');
var NotyPopLoadTemplate = require('./getui/template/NotyPopLoadTemplate');
var LinkTemplate = require('./getui/template/LinkTemplate');
var NotificationTemplate = require('./getui/template/NotificationTemplate');
var PopupTransmissionTemplate = require('./getui/template/PopupTransmissionTemplate');
var TransmissionTemplate = require('./getui/template/TransmissionTemplate');

var SingleMessage = require('./getui/message/SingleMessage');
var AppMessage = require('./getui/message/AppMessage');
var ListMessage = require('./getui/message/ListMessage');


var HOST = 'http://sdk.open.api.igexin.com/apiex.htm';
//Android用户测试
var APPID = '';
var APPKEY = '';
var MASTERSECRET = '';
var CID = '';
var DEVICETOKEN='';
var alias='demo';

var gt = new GeTui(HOST, APPKEY, MASTERSECRET);
    pushAPN();
//    getUserStatus();
//    pushMessageToSingle();
//    pushMessageToList();
//    pushMessageToApp();
//    stoptask();
//    setClientTag();

//    aliasBind();
//    queryCID();
//    queryAlias();
//    aliasBatch();
//    aliasUnBind();
//    aliasUnBindAll();


//推送任务停止
function stoptask() {
    gt.stop('OSA-0211_KEtKEAEIbqAe79XpZNCO04', function (err, res) {
        console.log(res);
    });
}
function setClientTag() {
    gt.setClientTag(APPID, CID, ['aa','bb','cc'], function (err, res) {
        console.log(res);
    })
}
function getUserStatus() {
    gt.getClientIdStatus(APPID, CID, function (err, res) {
        console.log(res);
    });
}

function pushAPN() {
    var template = new APNTemplate();
    template.setPushInfo({actionLocKey: 'actionLocKey', badge: 2, message: 'message',
        sound: 'test1.wav', payload: 'payload', locKey: 'locKey',
        locArgs: 'locArgs', launchImage: 'launchImage',contentAvailable:1});
    var message = new SingleMessage();

    message.setData(template);
    gt.pushAPNMessageToSingle(APPID, DEVICETOKEN, message, function (err, res) {
        console.log(res);
    });
}

function pushAPNMessageToList() {
    var template = new APNTemplate();
    template.setPushInfo({actionLocKey: '', badge: 1, message: '',
        sound: '', payload: '', locKey: '',
        locArgs: '', launchImage: ''});
    var message = new ListMessage();
    message.setData(template);

    gt.getAPNContentId(APPID, message, function(err, res) {
        var contentId = res;
        gt.pushAPNMessageToList(APPID, contentId, [DEVICETOKEN], function (err, res) {
            console.log(res);
        });
    })
}

function pushMessageToSingle() {
//    var template = TransmissionTemplateDemo();
//    var template = LinkTemplateDemo();
//    var template = NotificationTemplateDemo();
    var template = NotyPopLoadTemplateDemo();

    //个推信息体
    var message = new SingleMessage({
        isOffline: false,                        //是否离线
        offlineExpireTime: 3600 * 12 * 1000,    //离线时间
        data: template                          //设置推送消息类型
    });

    //接收方
    var target = new Target({
        appId: APPID,
        clientId: CID
//        alias:'_lalala_'
    });
    //target.setAppId(APPID).setClientId(CID);

    gt.pushMessageToSingle(message, target, function (err, res) {
        console.log("demo print", res);
    });

}

function pushMessageToList() {
    process.env.needDetails = true;
    // var taskGroupName = 'test';
     var taskGroupName = "toList任务组名";

    //消息类型 :状态栏链接 点击通知打开网页
    var template = LinkTemplateDemo();

    //个推信息体
    var message = new ListMessage({
        isOffline: false,
        offlineExpireTime: 3600 * 12 * 1000,
        data: template
    });

    gt.getContentId(message, taskGroupName, function (err, res) {
        var contentId = res;
        //接收方1
        var target1 = new Target({
            appId: APPID,
            clientId: CID
//            alias:'_lalala_'
        });

        var targetList = [target1];
//        gt.needDetails = true;

        console.log("getContentId", res);
        gt.pushMessageToList(contentId, targetList, function (err, res) {
            console.log(res);
        });
    });
}

function pushMessageToApp() {
    // var taskGroupName = 'test';
    var taskGroupName = null;

    //消息类型 : 状态栏通知 点击通知启动应用
    var template = NotificationTemplateDemo();

    //个推信息体
    //基于应用消息体
    var message = new AppMessage({
        isOffline: false,
        offlineExpireTime: 3600 * 12 * 1000,
        data: template,
        appIdList: [APPID]
//        phoneTypeList: ['IOS'],
//        provinceList: ['浙江'],
        //tagList: ['阿百川']
//        speed: 1
    });

    gt.pushMessageToApp(message, taskGroupName, function (err, res) {
        console.log(res);
    });
}

//消息模版：
// 1.TransmissionTemplate:透传功能模板
// 2.LinkTemplate:通知打开链接功能模板
// 3.NotificationTemplate：通知透传功能模板
// 4.NotyPopLoadTemplate：通知弹框下载功能模板

function NotyPopLoadTemplateDemo() {
    var template = new NotyPopLoadTemplate({
        appId: APPID,
        appKey: APPKEY,
        notyTitle: '个推',
        notyContent: '个推最新版点击下载',
        notyIcon: 'http://wwww.igetui.com/logo.png',    // 通知栏logo
        isRing: true,
        isVibrate: true,
        isClearable: true,
        popTitle: '弹框标题',
        setPopContent: '弹框内容',
        popImage: '',
        popButton1: '下载',                             // 左键
        popButton2: '取消',                             // 右键
        loadIcon: 'http://www.photophoto.cn/m23/086/010/0860100017.jpg', // 弹框图片
        loadUrl: 'http://dizhensubao.igexin.com/dl/com.ceic.apk',
        loadTitle: '地震速报下载',
        autoInstall: false,
        actived: true
    });
    return template;
}

function LinkTemplateDemo() {
    var template = new LinkTemplate({
        appId: APPID,
        appKey: APPKEY,
        title: '个推',
        text: '个推最新版点击下载',
        logo: 'http://wwww.igetui.com/logo.png',
        logoUrl: 'https://www.baidu.com/img/bdlogo.png',
        isRing: true,
        isVibrate: true,
        isClearable: true,
        url: 'http://www.igetui.com'
    });
    // iOS推送需要设置的pushInfo字段
    //template.setPushInfo({actionLocKey: 'a', badge: 4, message: 'b', sound: 'com.gexin.ios.silence', payload: 'DDDD', locKey: '近日。',
    //    locArgs: '', launchImage: ''});

    return template;
}

function NotificationTemplateDemo() {
    var template = new NotificationTemplate({
        appId: APPID,
        appKey: APPKEY,
        title: '个推',
        text: '个推最新版点击下载',
        logo: 'http://www.igetui.com/logo.png',
        isRing: true,
        isVibrate: true,
        isClearable: true,
        transmissionType: 1,
        transmissionContent: '测试离线'
    });
    // iOS推送需要设置的pushInfo字段
    //template.setPushInfo({actionLocKey: 'a', badge: 4, message: 'b', sound: 'com.gexin.ios.silence', payload: 'DDDD', locKey: '近日。',
    //    locArgs: '', launchImage: ''});
    return template;
}

function TransmissionTemplateDemo() {
    var template =  new TransmissionTemplate({
        appId: APPID,
        appKey: APPKEY,
        transmissionType: 1,
        transmissionContent: '测试离线'
    });
    //iOS推送需要设置的pushInfo字段
    template.setPushInfo({actionLocKey: '', badge: 2, message: '', sound: '', payload: '', locKey: '',
        locArgs: '', launchImage: ''});
//    template.setPushInfo({actionLocKey: '按钮名称', badge: 1, message: 'meissage', sound: 'test2.wav'});
    return template;
}

function aliasBind() {
    gt.bindAlias(APPID, alias, CID, function(err, res) {
        console.log(res);
    });
}

function aliasBatch() {
//    var target = new Target()
//        .setClientId(CID)
//        .setAlias('_lalala_');
    var target2 = new Target({
        alias: alias,
        clientId: CID
    });
    var targetList = [target2];
    gt.bindAlias(APPID, targetList, function(err, res) {
        console.log(res);
    });
}

function queryCID() {
    gt.queryClientId(APPID, alias, function(err, res) {
        console.log(res);
    });
}

function queryAlias() {
    gt.queryAlias(APPID, CID, function(err, res) {
        console.log(res);
    });
}

function aliasUnBind() {
    gt.unBindAlias(APPID, alias, CID, function(err, res) {
        console.log(res);
    });
}

function aliasUnBindAll() {
    gt.unBindAlias(APPID, alias, function(err, res) {
        console.log(res);
    });
}