'use strict';

var request = require('request');
// 最大重连次数
var MAX_HTTP_RETRIES = 4;
// 重连等待时间
var RETRY_DELAY = 5000;
// 连接超时时间
var TIMEOUT = 30000;

var httpManager = {
    /**
     *  HTTP POST请求，返回JSON数据格式
     * @param host
     * @param postData
     * @param callback
     * @return json数据
     */
    post: function (host, postData, callback) {
        postData.version = '3.0.0.0';
        var tries = MAX_HTTP_RETRIES;
        attempt();
        function attempt() {
            console.log({
                uri: host,
                body: postData,
                json: true,
                method: 'post',
                timeout: TIMEOUT
            });
            request(
                {
                    uri: host,
                    body: postData,
                    json: true,
                    method: 'post',
                    timeout: TIMEOUT
                },
                function (err, res, data) {
                    if (!err && res.statusCode == 200) {
                        callback&&callback(null, data);
                    } else if (--tries) {
                        attempt();
                    } else {
                        callback&&callback(err, data);
                    }
                })
        }
    }
};

module.exports = httpManager;
