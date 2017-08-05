!function(e,r){"object"==typeof exports&&"object"==typeof module?module.exports=r():"function"==typeof define&&define.amd?define([],r):"object"==typeof exports?exports.MyNumbers=r():e.MyNumbers=r()}(this,function(){return function(e){function r(t){if(n[t])return n[t].exports;var i=n[t]={i:t,l:!1,exports:{}};return e[t].call(i.exports,i,i.exports,r),i.l=!0,i.exports}var n={};return r.m=e,r.c=n,r.d=function(e,n,t){r.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:t})},r.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(n,"a",n),n},r.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},r.p="",r(r.s=0)}([function(e,r,n){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var t=Object.assign||function(e){for(var r=1;r<arguments.length;r++){var n=arguments[r];for(var t in n)Object.prototype.hasOwnProperty.call(n,t)&&(e[t]=n[t])}return e},i=function(){function e(e,r){var n=[],t=!0,i=!1,o=void 0;try{for(var u,a=e[Symbol.iterator]();!(t=(u=a.next()).done)&&(n.push(u.value),!r||n.length!==r);t=!0);}catch(e){i=!0,o=e}finally{try{!t&&a.return&&a.return()}finally{if(i)throw o}}return n}return function(r,n){if(Array.isArray(r))return r;if(Symbol.iterator in Object(r))return e(r,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),o=new RegExp(/^(#)?(\+\??)?((?:1([^\d]))?1)?(?:([^\d])(0+\??))?(#)?$/),u=["#","##","#+#","+","#+?#","+?","#+?","+?#"],a=function(e,r){return Math.round(e*Math.pow(10,r))/Math.pow(10,r)},f=function(e){return e.replace(/([.+?*\\|()\][{}])/g,function(e){return"\\"+e[0]})},s=function(e){if(-1!==u.indexOf(e))return!1;var r=o.exec(e);if(null===r)return!1;var n={},t=i(r,8),a=t[0],f=t[1],s=t[2],c=t[3],l=t[4],d=t[5],p=t[6],h=t[7];return""!==a&&(n.prefix="#"===f,n.suffix="#"===h,n.sign="+"===s||"+?"===s,n.signOptional=n.sign&&s.endsWith("?"),n.integer=void 0!==c,n.decimal=d||!1,n.thousands=l||!1,n.decimalOptional=(p||"").endsWith("?"),n.decimalNumbers=(""+(p||"")).length-(n.decimalOptional?1:0),n)},c=function(e,r,n){return"number"==typeof r?n?e*(1/r):e*r:r(e,n)},l=function(e){var r="";return r="("+(e.prefix?Object.keys(e._prefixes).map(function(e){return f(e)}):[]).join("|")+")?",r=e.sign?r+"(\\+|-)?":r+"()",e.integer?e.thousands?r=r+"([1-9][0-9]{0,2}(?:\\"+e.thousands+"[0-9]{3,3})*)":r+="([0-9]+)":r+="()",e.decimal&&(r=r+"(?:\\"+e.decimal+"([0-9]+))?"),r=r+"("+(e.suffix?Object.keys(e._suffixes).map(function(e){return f(e)}):[]).join("|")+")?",{_regex:new RegExp("^"+r+"$"),_replaceThousands:function(r){return parseInt(e.thousands?r.replace(new RegExp("\\"+e.thousands,"g"),""):r)}}},d=function(e,r){var n=r._regex.exec(e);if(null===n)return!1;var t=i(n,6),o=(t[0],t[1]),u=t[2],f=t[3],s=t[4],l=t[5],d=0;return f&&(d=r._replaceThousands(f)),s&&(d+=parseFloat("0."+s)),"-"===u&&(d*=-1),o&&r.prefix&&(d=c(d,r._prefixes[o],!1)),l&&r.suffix&&(d=c(d,r._suffixes[l],!1)),a(d,r.decimalNumbers)},p=function(e,r){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,t=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null;if(n&&r.prefix){var o=r._prefixes[n];if(!o)throw new Error(n+" prefix not found");e=c(e,o,!0)}if(t&&r.suffix){var u=r._suffixes[t];if(!u)throw new Error(t+" suffix not found");e=c(e,u,!0)}e=a(e,r.decimalNumbers);var f=(""+e).split(/\./),s=i(f,2),l=s[0],d=s[1],p="";if(e<0&&!1===r.sign)return!1;if(!r.integer&&"0"!==l)return!1;if(r.integer&&(p=l.split("").reverse().join("").match(/[0-9]{1,3}/g).join(r.thousands).split("").reverse().join("")),r.decimalNumbers>0)if(r.decimalOptional)0!==parseInt(d||"0")&&(p=""+p+r.decimal+d);else{var h=(d||"").length,v=h<r.decimalNumbers?"0".repeat(r.decimalNumbers-h):"";p=""+p+r.decimal+(d||"")+v}return r.sign&&(p=(e<0?"-":r.signOptional?"":"+")+p),n&&r.prefix&&(p=n+p),t&&r.suffix&&(p+=t),p},h=function(e){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},i=Array.isArray(e);e=i?e:[e];var o={};return o._fdata={},e.forEach(function(e){var i=s(e);if(!i)throw new Error("The format '"+e+"' is invalid.");i._prefixes=r||{},i._suffixes=n||{},i=t({},i,l(i)),o._fdata[e]=i}),o.parse=function(r){var n={};return Object.keys(o._fdata).forEach(function(e){n[e]=d(r,o._fdata[e])}),i?n:n[e[0]]},o.stringify=function(r){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,u={};return Object.keys(o._fdata).forEach(function(e){u[e]=p(r,o._fdata[e],n,t)}),i?u:u[e[0]]},o};r.default=h}]).default});