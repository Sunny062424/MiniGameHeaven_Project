(function(){"use strict";var t={683:function(t,e,s){var i=s(9242),n=s(3396),o=s(7139);const r={class:"app"},l={key:0,id:"iyyoo_logined"},a={id:"menu_bar"},c={key:1,id:"iyyoo_login"},u={for:"nickname"},d=(0,n._)("h2",null,[(0,n._)("span",{class:"entypo-login"},[(0,n._)("i",{class:"fa fa-sign-in"})]),(0,n.Uk)(" Login ")],-1),h=(0,n._)("span",{class:"entypo-lock"},[(0,n._)("i",{class:"fa fa-lock"})],-1),f=[h],m=(0,n._)("span",{class:"entypo-user inputUserIcon"},[(0,n._)("i",{class:"fa fa-user"})],-1);function k(t,e,s,h,k,p){const w=(0,n.up)("MyTestGameView");return(0,n.wg)(),(0,n.iD)("div",r,[h.state.account.nickname?((0,n.wg)(),(0,n.iD)("div",l,[(0,n._)("p",null,"환영합니다! "+(0,o.zw)(h.state.account.nickname)+"님",1),(0,n._)("div",a,[(0,n._)("button",{class:"w-btn w-btn-indigo",type:"button",onClick:e[0]||(e[0]=t=>h.logout())},"로그아웃"),(0,n._)("button",{class:"w-btn w-btn-indigo",type:"button",onClick:e[1]||(e[1]=t=>{k.sudokustart=!0})},"스도쿠 게임하기"),(0,n._)("button",{class:"w-btn w-btn-indigo",type:"button",onClick:e[2]||(e[2]=e=>{t.snakestart=!0})},"스네이크 게임하기"),(0,n._)("button",{class:"w-btn w-btn-indigo",type:"button",onClick:e[3]||(e[3]=e=>{t.rank=!0})},"랭킹보기")]),k.sudokustart?((0,n.wg)(),(0,n.j4)(w,{key:0,onInputdata:p.sendsudoku,onEndsudokus:e[4]||(e[4]=t=>{k.sudokustart=!1})},null,8,["onInputdata"])):(0,n.kq)("",!0)])):((0,n.wg)(),(0,n.iD)("div",c,[(0,n._)("label",u,[d,(0,n._)("button",{onClick:e[5]||(e[5]=t=>h.submit())},f),m,(0,n.wy)((0,n._)("input",{type:"text",class:"user",id:"nickname","onUpdate:modelValue":e[6]||(e[6]=t=>h.state.form.nickname=t),placeholder:"username"},null,512),[[i.nr,h.state.form.nickname]])])]))])}var p=s(4870),w=s(4161);const g={id:"sudoku_div"},v={key:1,class:"setup"},S=(0,n._)("h1",null,"SUDOKU",-1),y=(0,n._)("div",null," 난이도 선택 ",-1);function _(t,e,s,r,l,a){const c=(0,n.up)("Sudoku");return(0,n.wg)(),(0,n.iD)("div",g,[l.start?((0,n.wg)(),(0,n.j4)(c,{key:0,diff:l.diff,showDetails:l.showDetails,onSendtimer:a.sendtimerz,onReset:a.getout},null,8,["diff","showDetails","onSendtimer","onReset"])):((0,n.wg)(),(0,n.iD)("div",v,[S,y,(0,n.wy)((0,n._)("input",{type:"range",min:"1",max:"10","onUpdate:modelValue":e[0]||(e[0]=t=>l.diff=t)},null,512),[[i.nr,l.diff,void 0,{number:!0}]]),(0,n._)("div",null,"난이도 : "+(0,o.zw)(l.diff),1),(0,n._)("button",{onClick:e[1]||(e[1]=t=>l.start=!0),class:"start"}," 게임 시작하기 ")]))])}const b={class:"sudoku"},D={class:"top_btns"},C={class:"header"},M={class:"mistakes"},T={class:"grids"},$=["onMouseup"],z={class:"digits"},O=["onClick"],x={class:"solution"},j=(0,n._)("h2",null,"Solution",-1),I={class:"grid"};function q(t,e,s,r,l,a){const c=(0,n.up)("timer");return(0,n.wg)(),(0,n.iD)("div",b,[(0,n._)("div",D,[(0,n._)("button",{class:"reset_btn",onClick:e[0]||(e[0]=t=>a.checkreset())},"되돌아가기")]),(0,n.wy)((0,n._)("div",C,[(0,n.Wm)(c,{startMin:l.minutes,startSec:l.seconds,ref:"Timer"},null,8,["startMin","startSec"]),(0,n._)("div",null,"난이도 : "+(0,o.zw)(s.diff),1),(0,n._)("div",M,"틀린횟수 : "+(0,o.zw)(l.mistakes),1)],512),[[i.F8,s.showDetails]]),(0,n._)("div",T,[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(l.sudoku,((t,s)=>((0,n.wg)(),(0,n.iD)("div",{class:"rows",key:s},[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(t,((t,r)=>((0,n.wg)(),(0,n.iD)("div",{class:(0,o.C_)(["cell",a.getClass(t,s,r)]),key:r,onMouseup:t=>a.handleSelect(s,r,t),onKeydown:e[1]||(e[1]=(0,i.iM)(((...t)=>a.typeDigit&&a.typeDigit(...t)),["prevent"])),tabindex:"0"},(0,o.zw)(t),43,$)))),128))])))),128))]),(0,n.wy)((0,n._)("div",z,[((0,n.wg)(),(0,n.iD)(n.HY,null,(0,n.Ko)(9,(t=>(0,n._)("button",{class:"choise_num_btn",key:t,onClick:e=>a.insertDigit(t)},(0,o.zw)(t),9,O))),64)),(0,n._)("button",{class:"delete_num_btn",onClick:e[2]||(e[2]=t=>a.deleteDigit())},"숫자지우기 ")],512),[[i.F8,s.showDetails]]),(0,n._)("div",x,[j,(0,n._)("div",I,[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(l.solution,((t,e)=>((0,n.wg)(),(0,n.iD)("div",{class:"row",key:e},[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(t,((t,e)=>((0,n.wg)(),(0,n.iD)("div",{class:"cell",key:e},(0,o.zw)(t),1)))),128))])))),128))])])])}s(7658);const F={class:"timer"};function K(t,e,s,i,r,l){return(0,n.wg)(),(0,n.iD)("div",F,(0,o.zw)(r.minutes)+":"+(0,o.zw)(r.seconds),1)}let U;var V={name:"Timer",data(){return{minutes:null,seconds:null}},props:{startMin:Number,startSec:Number},methods:{tick(){null===this.seconds&&(this.minutes=this.startMin,this.seconds=this.startSec),this.seconds++,this.seconds>=60&&(this.minutes++,this.seconds=0)},sysout(){let t=this.minutes+":"+this.seconds;return t},timer_stop(){clearInterval(U)}},mounted(){U=setInterval(this.tick,1e3)},beforeDestroy(){clearInterval(U)}},H=s(89);const Z=(0,H.Z)(V,[["render",K]]);var E=Z;let N=[[],[],[],[],[],[],[],[],[]];const P=[1,2,3,4,5,6,7,8,9],Y=[{rowStart:0,colStart:0},{rowStart:0,colStart:6},{rowStart:6,colStart:6},{rowStart:6,colStart:0}],A=[{rowStart:0,colStart:3},{rowStart:3,colStart:0},{rowStart:6,colStart:3},{rowStart:3,colStart:6},{rowStart:3,colStart:3}];var G={name:"Sudoku",data(){return{sudoku:[],solution:[],saver:[],rowSelected:null,colSelected:null,seconds:0,minutes:0,mistakes:0}},components:{Timer:E},props:{diff:Number,showDetails:Boolean},methods:{handleSelect(t,e){this.rowSelected=t,this.colSelected=e},insertDigit(t){if(""!=this.saver[this.rowSelected][this.colSelected])return void alert("해당 값을 변경 할 수 없습니다.");t!==this.solution[this.rowSelected][this.colSelected]&&""!==t&&this.mistakes++,this.sudoku[this.rowSelected].splice(this.colSelected,1,t);let e=this.checkPointisEnd(),s=this.$refs.Timer.sysout();if(this.$refs.Timer.timer_stop(),alert("성공! 축하합니다.\n클리어 기록 : "+s),this.$emit("sendtimer",s),this.$emit("reset"),e){let t=this.$refs.Timer.sysout();this.$refs.Timer.timer_stop(),alert("성공! 축하합니다.\n클리어 기록 : "+t),this.$emit("sendtimer",t),this.$emit("reset")}},deleteDigit(){""==this.saver[this.rowSelected][this.colSelected]?this.sudoku[this.rowSelected].splice(this.colSelected,1,""):alert("해당 값을 변경 할 수 없습니다.")},typeDigit(t){const e=t.key,s=parseInt(e);isNaN(s)||0===s||this.insertDigit(s),"Delete"!==e&&"Backspace"!==e||this.insertDigit("")},getClass(t,e,s){if(!1===this.showDetails)return"";if(t!==this.solution[e][s]&&""!==t)return"invalid";const i=this.sudoku[e],n=this.getCol(s,this.sudoku),o=this.getSquare(e,s,this.sudoku),r=this.checkFilled(i),l=this.checkFilled(n),a=this.checkFilled(o);return r||l||a?this.rowSelected===e||this.colSelected===s?"completeHighlight":"complete":this.rowSelected===e||this.colSelected===s?this.rowSelected===e&&this.colSelected===s?"":"highlight":void 0},checkFilled(t){const e=t.filter((t=>""!==t));return 9===new Set(e).size},randomArrayVal(t){const e=Math.floor(Math.random()*t.length);return t[e]},getCol(t,e){return e.map((e=>e[t]))},selectDigit(t,e,s){const i=N[t],n=this.getCol(e,N),o=i.concat(n).concat(s),r=P.filter((t=>!o.includes(t)));return this.randomArrayVal(r)},getSquare(t,e,s){const i=3*Math.floor(t/3),n=i+3,o=3*Math.floor(e/3),r=o+3,l=s.slice(i,n),a=l.map((t=>t.slice(o,r))),c=a.flat();return c},resetCell(){return"-"},fillSquare({rowStart:t,colStart:e},s){let i=[];for(let n=t;n<t+3;n++)for(let t=e;t<e+3;t++){const e=s(n,t,i);if(void 0===e)return!0;i.push(e),N[n][t]=e}},fillSection(t){t.forEach((t=>this.fillSquare(t,this.resetCell)));for(const e of t){const s=this.fillSquare(e,this.selectDigit);if(!0===s)return void this.fillSection(t)}},makeSudoku(){this.fillSection(Y),this.fillSection(A),this.sudoku=N.map((t=>t.map((t=>(Math.round(10*Math.random())<=this.diff&&(t=""),t))))),this.solution=N,0==this.saver.length&&(this.saver=this.sudoku.map((t=>[...t])))},checkreset(){let t=confirm("메뉴 화면으로 돌아가시겠습니까?");t&&this.$emit("reset")},checkPointisEnd(){for(let t=0;t<this.sudoku.length;t++)for(let e=0;e<this.sudoku[t].length;e++)if(""===this.sudoku[t][e])return!1;return!0}},mounted(){this.makeSudoku(),setInterval(this.tick,1e3)}};const B=(0,H.Z)(G,[["render",q]]);var R=B,L={name:"MyTestGameView",data(){return{diff:5,start:!1,showDetails:!0}},components:{Sudoku:R},methods:{getout(){this.start=!1,this.$emit("endsudokus")},sendtimerz(t){this.$emit("inputdata",t)}}};const W=(0,H.Z)(L,[["render",_]]);var J=W,Q={name:"App",components:{MyTestGameView:J},methods:{sendsudoku(t){let e=this.state.account.nickname,s="http://localhost:3001/testa";(0,w.Z)({url:s,method:"PUT",data:{nickname:e,timer:t}}).then((t=>{console.log(t)}))}},data(){return{sudokustart:!1}},setup(){const t=(0,n.f3)("$axios"),e=(0,p.qj)({account:{id:null},form:{nickname:""}}),s=()=>{const s={nickname:e.form.nickname};t.post("http://localhost:3001/api/account",s).then((t=>{alert("로그인에 성공했습니다."),e.account.nickname=t.data})).catch((()=>{console.log(s),alert("로그인에 실패했습니다. 계정 정보를 확인해주세요.")}))},i=()=>{t.delete("http://localhost:3001/api/account").then((()=>{alert("로그아웃하였습니다."),e.account.nickname=null,e.form.nickname="",location.reload()}))};return{state:e,submit:s,logout:i}}};const X=(0,H.Z)(Q,[["render",k]]);var tt=X;const et=(0,i.ri)(tt);et.provide("$axios",w.Z),et.mount("#app")}},e={};function s(i){var n=e[i];if(void 0!==n)return n.exports;var o=e[i]={exports:{}};return t[i].call(o.exports,o,o.exports,s),o.exports}s.m=t,function(){var t=[];s.O=function(e,i,n,o){if(!i){var r=1/0;for(u=0;u<t.length;u++){i=t[u][0],n=t[u][1],o=t[u][2];for(var l=!0,a=0;a<i.length;a++)(!1&o||r>=o)&&Object.keys(s.O).every((function(t){return s.O[t](i[a])}))?i.splice(a--,1):(l=!1,o<r&&(r=o));if(l){t.splice(u--,1);var c=n();void 0!==c&&(e=c)}}return e}o=o||0;for(var u=t.length;u>0&&t[u-1][2]>o;u--)t[u]=t[u-1];t[u]=[i,n,o]}}(),function(){s.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(e,{a:e}),e}}(),function(){s.d=function(t,e){for(var i in e)s.o(e,i)&&!s.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,get:e[i]})}}(),function(){s.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}}(),function(){var t={143:0};s.O.j=function(e){return 0===t[e]};var e=function(e,i){var n,o,r=i[0],l=i[1],a=i[2],c=0;if(r.some((function(e){return 0!==t[e]}))){for(n in l)s.o(l,n)&&(s.m[n]=l[n]);if(a)var u=a(s)}for(e&&e(i);c<r.length;c++)o=r[c],s.o(t,o)&&t[o]&&t[o][0](),t[o]=0;return s.O(u)},i=self["webpackChunkfront"]=self["webpackChunkfront"]||[];i.forEach(e.bind(null,0)),i.push=e.bind(null,i.push.bind(i))}();var i=s.O(void 0,[998],(function(){return s(683)}));i=s.O(i)})();
//# sourceMappingURL=app.8455a29d.js.map