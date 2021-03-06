import global from './global';
// import moment from 'moment';

//判断url的正则
const LINKREGEXP = new RegExp("((?:(http|https|Http|Https|rtsp|Rtsp):\\/\\/(?:(?:[a-zA-Z0-9\\$\\-\\_\\.\\+\\!\\*\\'\\(\\)\\,\\;\\?\\&\\=]|(?:\\%[a-fA-F0-9]{2})){1,64}(?:\\:(?:[a-zA-Z0-9\\$\\-\\_\\.\\+\\!\\*\\'\\(\\)\\,\\;\\?\\&\\=]|(?:\\%[a-fA-F0-9]{2})){1,25})?\\@)?)?((?:(?:[a-zA-Z0-9][a-zA-Z0-9\\-]{0,64}\\.)+(?:(?:aero|arpa|asia|a[cdefgilmnoqrstuwxz])|(?:biz|b[abdefghijmnorstvwyz])|(?:cat|com|coop|c[acdfghiklmnoruvxyz])|d[ejkmoz]|(?:edu|e[cegrstu])|f[ijkmor]|(?:gov|g[abdefghilmnpqrstuwy])|h[kmnrtu]|(?:info|int|i[delmnoqrst])|(?:jobs|j[emop])|k[eghimnrwyz]|l[abcikrstuvy]|(?:mil|mobi|museum|m[acdghklmnopqrstuvwxyz])|(?:name|net|n[acefgilopruz])|(?:org|om)|(?:pro|p[aefghklmnrstwy])|qa|r[eouw]|s[abcdeghijklmnortuvyz]|(?:tel|travel|top|t[cdfghjklmnoprtvwz])|u[agkmsyz]|v[aceginu]|w[fs]|y[etu]|z[amw]))|(?:(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9])\\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9]|0)\\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9]|0)\\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[0-9])))(?:\\:\\d{1,5})?)(\\/(?:(?:[a-zA-Z0-9\\;\\/\\?\\:\\@\\&\\=\\#\\~\\-\\.\\+\\!\\*\\'\\(\\)\\,\\_])|(?:\\%[a-fA-F0-9]{2}))*)?", 'g');

var util = {

  formatDate(date) {

  },

  deepCopy(data) {
    return JSON.parse(JSON.stringify(data));
  },

  dispatchAsync(action) {
    setTimeout(() => {
      global.store.dispatch(action);
    }, 0);
  },

  isEmptyObject(e) {
    var t;
    for (t in e)
      return !1;
    return !0
  },
  /**
   * 获取URL参数
   * @return {Object} {key:value}
   */
  getURLParams() {
    function parseParams(str) {
      var rs = {};
      var i = str.indexOf('?')
      if (i >= 0) {
        str = str.substr(i + 1);
        var params = str.split('&');
        params.forEach(function (s) {
          var p = s.split('=');
          if (p.length >= 2) {
            rs[p[0]] = p[1];
          }
        });
      }
      return rs;
    }

    return Object.assign({}, parseParams(location.search), parseParams(location.hash));
  },

  addContextUrl(url) {
    var contextPath = location.pathname.replace('/index.html', '');
    return contextPath + url;
  },



 //  /**
 //   * 转换日期，eg:2016-6-18 20:00
 //   * @param {Date}
 //   * @return {String}
 //   */
 //  formatDateTime(time) {
 //    return moment(time).format('YYYY-MM-DD H:mm');
 //  },
 //  *
 // * 转换日期，eg:6.18
 // * @param {Date}
 // * @return {String}
 
 //  formatDate(time) {
 //    return moment(time).format('M.D');
 //  },
 //  /**
 // * 转换时间24小时制，eg:20:30
 // * @param {Date}
 // * @return {String}
 // */
 //  formatTime(time) {
 //    return moment(time).format('H:mm');
 //  },

  /**
   * 解析时间，按东八区解析
   * @str {String|Number}
   * @return {Date}
   */
  parseDate(str) {
    if (!str) {
      return new Date();
    }
    if (typeof str == 'number') {
      return new Date(str);
    }
    //东八区时间
    if (typeof str == 'string' && str.indexOf('+08') < 0) {
      str = str + '+08:00';
    }
    return new Date(str);
  },

  testUrl: function (str) {
    return str.match(/(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/g);
  },

  /**
   * 马赛克字符串中指定位置的字符
   * @str {String|Number} 字符串
   * @start {Number} 开始打码的位置索引，从0开始计算，如果不填则默认从第一个开始打码
   * @end {Number} 结束打码的位置索引，从0开始计算，如果不填则默认打码到最后一个
   * @wildchar {String} 马赛克通配符
   * @count {Number} 替换马赛克的个数，如果不填则根据start和end之间的字符个数替换
   * @return {newStr} 打码后的字符串
   */
  mosaicStr(str = '', start = 0, end, wildchar = '*', count) {
    const reg = new RegExp('^(.{' + start + '})(.*)(.{' + (typeof end == 'undefined' ? 0 : (str.length - end - 1)) + '})$', 'g');
    let newStr = str.replace(reg, (match, p1, p2, p3) => {
      return p1 + new Array(p2.length + 1).join(wildchar) + p3
    });
    return newStr
  },
  /**
   * 将文本中的链接文本替换为a标签
   * @param {String} content 文本内容
   * @param {String} classNames 链接的类名
   * @return {String} 替换a标签后的文本
   */
  replaceLinkText(content = '', classNames = '') {
    const linkArray = [];
    let linkNum = 0;
    let rs = [];
    let formatedContent = content;
    while (rs = LINKREGEXP.exec(content)) {
      const linkText = rs[0];
      linkArray.push(`<a href="${(linkText.indexOf('://') > -1 ? '' : 'http://') + linkText}" target="_blank" class='${classNames}'>${linkText}</a>`);
      formatedContent = formatedContent.replace(linkText, 'LINLPLACEHOLDER' + linkNum++);
    }
    linkArray.forEach((item, index) => {
      formatedContent = formatedContent.replace('LINLPLACEHOLDER' + index, item);
    })
    return formatedContent;
  },

  getDate: function() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + date.getHours() + seperator2 + date.getMinutes()
            + seperator2 + date.getSeconds();
    return currentdate;
  }

}

window.mosaicStr = util.mosaicStr

export default util;
