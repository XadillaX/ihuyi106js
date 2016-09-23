/**
 * Created by XadillaX on 14-2-12.
 */
"use strict";

const DOMParser = require("xmldom").DOMParser;
const spidex = require("spidex");

const INTERNATIONAL_BASE_URI = "http://api.isms.ihuyi.cn/webservice/isms.php?method=Submit";
const NATIONAL_BASE_URI = "http://106.ihuyi.com/webservice/sms.php?method=Submit";
const USER_AGENT = "IHuyiNodeBot/" + require("../package").version + " (+https://github.com/XadillaX/ihuyi106js)";

/**
 * IHuyi
 * @constructor
 * @param {String} account ihuyi account
 * @param {String} password ihuyi password
 * @param {String} [internationalApiKey] ihuyi international api key, if exsit
 */
var IHuyi = function(account, password, internationalApiKey) {
    this.account = account;
    Object.defineProperties(this, {
        password: {
            writable: true,
            enumerable: false,
            configurable: false,
            value: password
        },
        apiKey: {
            writable: true,
            enumerable: false,
            configurable: false,
            value: internationalApiKey
        }
    });
};

/**
 * send a national SMS
 * @param {String} mobile mobile phone number
 * @param {String} content the SMS content
 * @param {Function} callback the callback function
 */
IHuyi.prototype.send = function(mobile, content, callback) {
    spidex.post(NATIONAL_BASE_URI, {
        data: {
            account: this.account,
            password: this.password,
            mobile: mobile,
            content: content
        },
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

/**
 * send an international SMS
 * @param {String|Number} contryCode the country code
 * @param {String} mobile mobile phone number
 * @param {String} content the SMS content
 * @param {Function} callback the callback function
 */
IHuyi.prototype.sendInternational = function(contryCode, mobile, content, callback) {
    if(parseInt(contryCode) === 86) {
        return this.send(mobile, content, callback);
    }

    spidex.post(INTERNATIONAL_BASE_URI, {
        data: {
            account: this.account,
            password: this.apiKey,
            mobile: `${contryCode} ${mobile}`,
            content: content
        },
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
            return callback(undefined, json.ismsid);
        } else {
            return callback(new Error(json.msg, parseInt(json.code)));
        }
    }).on("error", callback);
};

module.exports = IHuyi;
