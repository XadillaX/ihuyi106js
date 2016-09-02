/**
 * XadillaX created at 2016-09-03 14:30:37 With ♥
 *
 * Copyright (c) 2016 Souche.com, all rights
 * reserved.
 */
"use strict";

const IHuyi = require("../");

const iHuyi = new IHuyi(process.env.IHUYI_ACCOUNT, process.env.IHUYI_PASSWORD);

iHuyi.send(process.env.MY_MOBILE,
    "您的验证码是：0000。请不要把验证码泄露给其他人。",
    function(err, smsId) {
        console.log(err, smsId);
    });
