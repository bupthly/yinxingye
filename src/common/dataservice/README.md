dataService
=======
#### 用fetch发起网络请求

## 安装
```javascript
yarn add @sunl-fe/dataservice // 建议使用 yarn 安装

or cnpm install @sunl-fe/dataservice --save
```
## Import

    import { getJSON } from '@sunl-fe/dataservice'

## 使用
####  1. POST
```javascript
getJSON( url, params )  // parmas 为可选项
	.then((data)=>{
		// to do when request succeeded
		onsuccess();
	})
	.catch((err)=>{
		// to do when request failed
		onerror();
	})
```
**注：**对于多层结构的 params 使用了类 jquery.param 方法处理，参考 [jQuery.param()](http://api.jquery.com/jQuery.param/)
####  2. GET
```javascript
getJSON( url, params, { method: "GET" } )
	.then(onsuccess) // 即 data => success(data)
	.catch(onerror) // 即 err => onerror(data)
```
####  3. Upload
```javascript
// 新建 formData 将 media 标签内取出的 Blob 对象 append 到 formData 内
let uploadFile = new FormData()
uploadFile.append( 'file', input.files[0] )
uploadFile.append( 'name', 'userIcon' )

// uploadFile 为 formData
getJSON( url, uploadFile )
	.then(onsuccess) // 即 data => success(data)
	.catch(onerror) // 即 err => onerror(data)
```
####  4. JSONP
**需单独引入 getJsonp 方法**

    import { getJsonp } from '@sunl-fe/dataservice'
```javascript
getJsonp( url )
	.then(( json, response ) => {
	   console.log(json) // response.json() 解析后的对象，如 {title: '获取学员信息', userName: 'mercury'}
	   console.log(response) // 请求返回的完整相应
	})
	.catch(onerror) // 即 err => onerror(data)
```
## 配置
#### 1. request
- 默认值

```javascript
if (typeof req_params == 'string') {
    contentType = 'application/json';
}
else {
    contentType = "application/x-www-form-urlencoded; charset=UTF-8";
}
const options = {
    method: 'POST',
    headers: {
       'Accept': 'application/json, text/javascript, */*; q=0.01',
       'Content-Type': contentType,
       'X-Requested-With': 'XMLHttpRequest'
   },
    credentials: 'same-origin',
    cache: 'no-cache'
};
// FormData
delete options.headers; //fetch 会自动添加相应的content-type 为 multipart/form-data; boundary=...
```
- 配置

```javascript
const options = {
    method: 'GET',
    headers: {
       'Accept': 'image/gif',
       'Content-Type': contentType, // 一般不需要，有特殊需要则配置
   },
};
getJSON( url, params, options )
```
#### 2. response
- 默认值

```javascript
const JsonDTO = {
    flag: 'flag',
    message: 'message',
    data: 'data'
};
// 默认解析的 response 字段

const successFlag = 1; // 成功
const failFlag = 0; // 失败
// 标志位值

const extraFlagMissions = [];
// 额外的 flag 和 mission [{flag: -1, mission: (data, resData) => console.log(data, resData)}]

const badStatus = [];
// 如果请求失败，配置返回状态对应的回调 [{status: 401, callback: () => window.location.href = '#/login'}]
```
- 配置

```javascript
// 均为可选项
const resParams = {
    JsonDTO,
    successFlag,
    failFlag,
    extraFlagMissions,
    badStatus,
}
getJSON.initHttpDTO(resParams); // 将配置对象传入
```

## 更新
#### 1.0.1
1.修改参数提交由url拼参 ==> 参数添加在body里，保证参数仍然以Form表单提交，其中对提交参数为数组的情况作了特殊处理，使用时需要根据后端接收的方式进行相应的修改；

2.在resolve 和 reject中 提供第二个参数，可以拿到返回的完整数据，如data.data, data.flag, data.message等；

3.优化请求头的contentType和accept条件。
#### 1.0.2
1.修改data为string类型时数据处理的bug;

2.增加getJSON接收的参数，theOptions,可以增加对请求的细节设置，比如是否需要跨域等等，具体可以参考[MDN 使用fetch](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch)
#### 1.0.3
1.增加兼容性的polyfill，如果低版本的浏览器或者IE浏览器遇到兼容问题，则仍用ajax进行请求，但***要求安装jquery依赖***。
#### 1.0.4
1.对于不同项目对入参出参的要求，增加配置函数，可以配置响应字段格式，详情见使用方法中的配置。
#### 1.1.0
1.增加 FormData 上传的支持，既可以在 uploadfile 上传文件使用；（不需要依赖其他插件啦！！）

2.增加Promise polyfill 以及 fetch polyfill，支持 IE10+, 不再使用ajax，也不需要再依赖JQuery，全部使用fetch实现网络请求。
#### 1.1.1
修改使用方法, 只可以 import {getJSON} from '@sunl-fe/dataservice'。
#### 1.1.4
1.修复 failFlag 和 successFlag 设置可能无效的bug, 修复返回数据格式中 flag 标志位解析失败但没有抛出异常的bug。

2.arrFormation 设置取消，默认传入数组则以字符串 arr[] 形式为入参请求数据，若需拼接数组成员，请自行拼接。
#### 1.1.5
1.增加对入参含有对象但未 JSON.stringyify 的校验，同时抛出错误。

2.优化对返回数据格式解析错误的抛出。
#### 1.1.6
修复设置 successFlag 和 failFlag 失败的bug。
#### 1.1.7
更新README.md。
#### 1.1.8
修复 method 设置无效问题。
#### 1.2.1
支持GET时入参，要求入参为 string 或者 object，string 会直接在URL后增加加'/string',object会以 key=value的形式加在URL后。
#### 1.2.4
Header 默认增加 X-Requested-With:XMLHttpRequest
#### 1.2.5
对参数合并增加deep assign，防止参数合并错误。
#### 1.2.6
恢复对 FormData 的支持，某一版本手抖给干掉了。。
#### 1.2.8
修复无入参请求，data.constructor 报错bug。

#### 2.0.0
1.初始化方法 initHttpDTO 不再单独引用，使用时引用getJSON，getJSON.initHttpDTO()即可；
2.增加对失败请求返回的处理，针对不同的response.status，initHttpDTO 传入数组， 如

```
let badStatus = [status:401, callback: func];
params.badStatus = badStatus;
initHttpDTO(params);
```
#### 2.0.1
修复对入参value值为 null 及 空数组的判断。
#### 2.1.0
增加对入参为多层数组对象进行类 jQuery 的遍历encode处理。
#### 2.2.0
增加 dataType 配置项，为 getJSON 第4个参数。
#### 2.3.0
增加 getJsonp 方法，传入 url 即可，返回一个promise，resolve 会传入 parse 后的 data。
引用为 import { getJsonp } from '@sunl-fe/dataservice'
#### 2.3.1
优化使用文档。
#### 2.3.2
error.toString bugfix。
#### 2.3.3
增加对 window.Promise 的判断及补偿。
#### 2.3.5
对接口返回失败的400等等状态可能未抛出错误进行修复。