(function(){"use strict";var n={9830:function(n,t,o){var e=o(9242),r=o(3396),i=o(7139);const c={class:"app"},a={key:0},u={key:1},l={for:"nickname"},f=(0,r._)("span",null,"아이디",-1);function s(n,t,o,s,p,v){return(0,r.wg)(),(0,r.iD)("div",c,[s.state.account.nickname?((0,r.wg)(),(0,r.iD)("div",a,[(0,r._)("p",null,"안녕하세요? "+(0,i.zw)(s.state.account.nickname)+"님!",1),(0,r._)("button",{onClick:t[0]||(t[0]=n=>s.logout())},"로그아웃")])):((0,r.wg)(),(0,r.iD)("div",u,[(0,r._)("label",l,[f,(0,r.wy)((0,r._)("input",{type:"text",id:"nickname","onUpdate:modelValue":t[1]||(t[1]=n=>s.state.form.nickname=n)},null,512),[[e.nr,s.state.form.nickname]])]),(0,r._)("button",{onClick:t[2]||(t[2]=n=>s.submit())},"로그인")]))])}var p=o(4870),v={setup(){const n=(0,r.f3)("$axios"),t=(0,p.qj)({account:{id:null},form:{nickname:""}}),o=()=>{const o={nickname:t.form.nickname};n.post("http://localhost:3001/api/account",o).then((n=>{alert("로그인에 성공했습니다."),t.account.nickname=n.data})).catch((()=>{console.log(o),alert("로그인에 실패했습니다. 계정 정보를 확인해주세요.")}))},e=()=>{n.delete("http://localhost:3001/api/account").then((()=>{alert("로그아웃하였습니다."),t.account.nickname=null,t.form.nickname=""}))};return{state:t,submit:o,logout:e}}},m=o(89);const d=(0,m.Z)(v,[["render",s]]);var h=d,k=o(4161);const b=(0,e.ri)(h);b.provide("$axios",k.Z),b.mount("#app")}},t={};function o(e){var r=t[e];if(void 0!==r)return r.exports;var i=t[e]={exports:{}};return n[e].call(i.exports,i,i.exports,o),i.exports}o.m=n,function(){var n=[];o.O=function(t,e,r,i){if(!e){var c=1/0;for(f=0;f<n.length;f++){e=n[f][0],r=n[f][1],i=n[f][2];for(var a=!0,u=0;u<e.length;u++)(!1&i||c>=i)&&Object.keys(o.O).every((function(n){return o.O[n](e[u])}))?e.splice(u--,1):(a=!1,i<c&&(c=i));if(a){n.splice(f--,1);var l=r();void 0!==l&&(t=l)}}return t}i=i||0;for(var f=n.length;f>0&&n[f-1][2]>i;f--)n[f]=n[f-1];n[f]=[e,r,i]}}(),function(){o.n=function(n){var t=n&&n.__esModule?function(){return n["default"]}:function(){return n};return o.d(t,{a:t}),t}}(),function(){o.d=function(n,t){for(var e in t)o.o(t,e)&&!o.o(n,e)&&Object.defineProperty(n,e,{enumerable:!0,get:t[e]})}}(),function(){o.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(n){if("object"===typeof window)return window}}()}(),function(){o.o=function(n,t){return Object.prototype.hasOwnProperty.call(n,t)}}(),function(){var n={143:0};o.O.j=function(t){return 0===n[t]};var t=function(t,e){var r,i,c=e[0],a=e[1],u=e[2],l=0;if(c.some((function(t){return 0!==n[t]}))){for(r in a)o.o(a,r)&&(o.m[r]=a[r]);if(u)var f=u(o)}for(t&&t(e);l<c.length;l++)i=c[l],o.o(n,i)&&n[i]&&n[i][0](),n[i]=0;return o.O(f)},e=self["webpackChunkfront"]=self["webpackChunkfront"]||[];e.forEach(t.bind(null,0)),e.push=t.bind(null,e.push.bind(e))}();var e=o.O(void 0,[998],(function(){return o(9830)}));e=o.O(e)})();
//# sourceMappingURL=app.c0fcf830.js.map