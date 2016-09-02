/**
 * Created by XadillaX on 14-2-12.
 */
"use strict";

const DOMParser = require("xmldom").DOMParser;
const spidex = require("spidex");

const BASE_URI = "http://106.ihuyi.com/webservice/sms.php?method=Submit";
const USER_AGENT = "node-ihuyi106-module by 死月 (admin@xcoder.in)";

var IHuyi = function(account, password) {
    this.account = account;
    Object.defineProperty(this, "password", {
        writable: true,
        enumerable: false,
        configurable: false,
        value: password
    });
};

IHuyi.prototype.send = function(mobile, content, callback) {
    const data = {
        account: this.account,
        password: this.password,
        mobile: mobile,
        content: content
    };

    spidex.post(BASE_URI, {
        data: data,
        header: {
            "User-Agent": USER_AGENT,
            "X-SDK-REPO": "https://github.com/XadillaX/ihuyi106js"
        },
        charset: "utf8",
        timeout: 10000
    }, function(content, status) {
        if(status !== 200) {
            return callback(new Error("短信发送服务器响应失败。"));
        }

        content = content.replace(/(\r|\n|( xmlns="http:\/\/106.ihuyi.com\/"))/g, "");
        const doc = new DOMParser().parseFromString(content);
        const result = doc.lastChild;
        const json = {};

        for(let node = result.firstChild; node !== null; node = node.nextSibling) {
            json[node.tagName] = node.firstChild.data;
        }

        if(parseInt(json.code) === 2) {
            return callback(undefined, json.smsid);
        } else {
            return callback(new Error(json.msg, parseInt(json.code)));
        }
    }).on("error", callback);
};

module.exports = IHuyi;
