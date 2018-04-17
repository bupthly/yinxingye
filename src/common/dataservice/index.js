var _this = this;
/**
 * 所有访问数据的接口调用该服务
 */
require('whatwg-fetch');
var objectAssignDeep = require('./js/objectAssignDeep');
var Promise = require('promise-polyfill');
var traverseParams = require('./js/traverseParams');
var fetchJsonp = require('./js/fetchJsonp');
// 检测 window 是否含有 Promise 对象，fetch底层由 Promise 实现
if (!window.Promise) {
    window.Promise = Promise;
}
//默认出参字段
var JsonDTO = {
    flag: 'flag',
    message: 'message',
    data: 'data'
};
var arrFormation = 'array'; // 入参数组格式 array 或者 string (spilt with ',')
var successFlag = 1;
var failFlag = 0;
var extraFlagMissions = []; //有额外的flag 和 mission {flag, mission(data, request)}
var badStatus = []; //如果请求失败，配置返回状态对应的回调 [{status: 401, callback:func()}]
var initHttpDTO = function (obj) {
    JsonDTO = obj.JsonDTO || JsonDTO;
    arrFormation = obj.arrFormation || arrFormation;
    successFlag = obj.successFlag != undefined ? obj.successFlag : successFlag;
    failFlag = obj.failFlag != undefined ? obj.failFlag : failFlag;
    extraFlagMissions = obj.extraFlagMissions || extraFlagMissions;
    badStatus = obj.badStatus || badStatus;
};
//对外暴露的调用方法
var getJSON = function (url, data, theOptions, dataType) {
    return fetchJSON(url, data, "POST", dataType || "json", theOptions);
};
//为GET组装参数
var assembleParams = function (params) { return Object.keys(params).map(function (key) { return key + "=" + params[key]; }).join('&'); };
var fetchJSON = function (url, data, method, dataType, theOptions) {
    //设置options
    var contentType = '*/*';
    var isFormData = data && data.constructor && data.constructor['name'] == 'FormData';
    if (typeof data == 'string') {
        contentType = 'application/json';
    }
    else {
        contentType = "application/x-www-form-urlencoded; charset=UTF-8";
    }
    var options = {
        method: method,
        headers: {
            'Accept': 'application/json, text/javascript, */*; q=0.01',
            'Content-Type': contentType,
            'X-Requested-With': 'XMLHttpRequest'
        },
        credentials: 'same-origin',
        cache: 'no-cache'
    };
    var newOption = objectAssignDeep({}, options, theOptions); //合并自定义参数，自此请求开始前的设置已经结束，接下来发起请求
    // 为fetch添加body信息
    var esc = encodeURIComponent;
    if (newOption.method.toUpperCase() != 'GET' && newOption.method.toUpperCase() != 'HEAD') {
        if (data) {
            if (typeof data == 'string') {
                newOption.body = data;
            }
            else if (isFormData) {
                delete newOption.headers;
                newOption.body = data;
            }
            else {
                newOption.body = traverseParams(data);
            }
        }
    }
    else if (newOption.method.toUpperCase() == 'GET') {
        var extraUrl = '';
        if (data) {
            if (typeof data == 'string') {
                extraUrl = '/' + data;
            }
            else if (Object.prototype.toString.call(data) == "[object Object]") {
                if (assembleParams(data)) {
                    extraUrl = '?' + assembleParams(data);
                }
            }
            else {
                throw new Error('使用GET进行请求请先格式化入参！');
            }
        }
        url = url + extraUrl;
    }
    //fetch不会对400 500等服务器返回错误reject，需要自己进行判断，抛出error
    var checkStatus = function (response) {
        if (response.status >= 200 && response.status < 300) {
            return response;
        }
        else {
            var error = new Error(response.statusText);
            error.response = response;
            throw error;
        }
    };
    //调用 response.json() 或者 response.text() 得到返回数据
    var parseJSON = function (response) {
        if (dataType == 'json') {
            return response.json();
        }
        else {
            return response.text();
        }
    };
    //在fetch外包一层Promise，拿到resolve和reject
    var defer = new Promise(function (resolve, reject) {
        fetch(url, newOption) //request
            .then(checkStatus) //check status
            .then(parseJSON) //parse data
            .then(function (data) {
            if (dataType == 'json') {
                if (typeof data == 'object' && typeof data[JsonDTO.flag] != 'undefined') {
                    if (data[JsonDTO.flag] == successFlag) {
                        if (typeof resolve == 'function') {
                            resolve(data);
                        }
                    }
                    else if (data[JsonDTO.flag] == failFlag) {
                        if (typeof reject == 'function') {
                            reject.call(_this, data[JsonDTO.message], data); // 在此可以设置错误返回数据字段，如message
                        }
                        else {
                            alert(data.data[JsonDTO.message]);
                        }
                    }
                    else if (extraFlagMissions && extraFlagMissions.length > 0) {
                        extraFlagMissions.forEach(function (mission) {
                            if (data[JsonDTO.flag] == mission.flag)
                                mission.mission(data[JsonDTO.data], data);
                        });
                    }
                }
                else {
                    throw new Error('请求数据格式错误！');
                }
            }
            else {
                if (typeof data == 'string' && data != 'error') {
                    if (typeof resolve == 'function') {
                        resolve.call(_this, data);
                    }
                }
                else {
                    if (typeof reject == 'function') {
                        reject.call(_this, '请求数据失败，请稍后再试', data);
                    }
                    else {
                        alert('请求数据失败，请稍后再试');
                    }
                }
            }
        })["catch"](function (error) {
            var errorStr = ''
            //Error 对象 toString
            if (error && error.__proto__ && (error.__proto__.name == 'Error' || error.__proto__.__proto__.name == 'Error')) {
                errorStr = error.toString();
            }
            //捕获异常
            if (error.response && error.response.status) {
                // 请求返回状态，执行相应callback
                var errStatus = error.response.status;
                if (badStatus && badStatus.length > 0) {
                    var hasSetup = false;
                    badStatus.forEach(function (_status) {
                        if (_status.status == errStatus) {
                            _status.callback.call(_this, error, error.response);
                            hasSetup = true;
                        }
                        ;
                    });
                    if(hasSetup) return;
                }
            }
            if (typeof reject == 'function') {
                if (error.response && error.response.status) {
                    var errStatus = error.response.status;
                    if (badStatus && badStatus.length > 0 && (badStatus.indexOf(errStatus) != -1))
                        return;
                    else
                        reject.call(_this, errorStr, error);
                }
                else
                    reject.call(_this, errorStr, error);
            }
            else {
                alert(errorStr);
            }
        });
    });
    return defer;
};
// JSONP 请求
var getJsonp = function (url) {
    return new Promise(function (resolve, reject) {
        fetchJsonp(url, { jsonpCallbackFunction: '' })
            .then(function (response) {
            return response.json().then(function (data) { return resolve(data, response); });
        })["catch"](reject);
    });
};
getJSON.initHttpDTO = initHttpDTO;
module.exports = { getJSON: getJSON, getJsonp: getJsonp };
