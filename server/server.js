var loopback = require('loopback');
var boot = require('loopback-boot');
var bodyParser = require('body-parser');
var path = require('path');

var GeTui = require('./modules/tui/GT.push');
var NotificationTemplate = require('./modules/tui/getui/template/NotificationTemplate');
var AppMessage = require('./modules/tui/getui/message/AppMessage'); 
var HOST = 'http://sdk.open.api.igexin.com/apiex.htm';
var APPID = 'UfKhp63nHO9Hz79xPaVsO7';
var APPKEY = 'Un1E3MucAx8wX22n8dAfI8';
var MASTERSECRET = 'fdkqdoXBuW94hkl7rcNWw9';

var app = module.exports = loopback();
var gt = new GeTui(HOST, APPKEY, MASTERSECRET);

app.middleware('initial', bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs'); // LoopBack comes with EJS out-of-box
app.set('json spaces', 2); // format json responses for easier viewing

// must be set to serve views properly when starting the app via `slc run` from
// the project root
// app.set('views', path.resolve(__dirname, 'views'));

// -- Mount static files here--
// All static middleware should be registered at the end, as all requests
// passing the static middleware are hitting the file system
// Example:
//   app.use(loopback.static(path.resolve(__dirname', '../client')));
var websitePath = require('path').resolve(__dirname, '../client');
app.use(loopback.static(websitePath));

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    console.log('Web server listening at: %s', app.get('url'));
  });
};

app.sendNotification = function(cb){
  
  gt.connect(function (cb) {
      pushMessageToApp(cb);
  });
}

function pushMessageToApp(cb){
  // var taskGroupName = 'test';
    var taskGroupName = null;
    //消息类型 : 状态栏通知 点击通知启动应用
    var template = NotificationTemplateDemo();
    //个推信息体
    //基于应用消息体
    var message = new AppMessage({
        isOffline: true,
        offlineExpireTime: 3600 * 12 * 1000,
        data: template,
        appIdList: [APPID],
        phoneTypeList: ['ANDROID'],
        provinceList: ['浙江','北京','河南'],
        tagList: ['tag1','tag2'],
        speed: 40
    });
    gt.pushMessageToApp(message, taskGroupName, cb);
}

function NotificationTemplateDemo() {
    var template = new NotificationTemplate({
        appId: APPID,
        appKey: APPKEY,
        title: '个推',
        text: '个推最新版点击下载',
        logo: 'http://wwww.igetui.com/logo.png',
        isRing: true,
        isVibrate: true,
        isClearable: false,
        transmissionType: 2,
        transmissionContent: '测试离线'
    });
    // iOS推送需要设置的pushInfo字段
    //template.setPushInfo({actionLocKey: 'a', badge: 4, message: 'b', sound: 'com.gexin.ios.silence', payload: 'DDDD', locKey: '近日。',
    //    locArgs: '', launchImage: ''});
    return template;
}

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;


  app.dataSources.pretzeldb.autoupdate(['board-brownbag', 'board', 'brownbag-discussion', 'brownbag-registration', 'user'], function(err){
  	console.log(err);
  });

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});
