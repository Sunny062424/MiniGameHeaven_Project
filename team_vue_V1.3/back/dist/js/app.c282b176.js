(function(){"use strict";var t={3973:function(t,e,i){var s=i(9242),n=i(3396),o=i(7139);const r={class:"app"},l={key:0},c={key:1},a={for:"nickname"},u=(0,n._)("span",null,"아이디",-1);function d(t,e,i,d,h,f){const m=(0,n.up)("MyTestGameView");return(0,n.wg)(),(0,n.iD)("div",r,[d.state.account.nickname?((0,n.wg)(),(0,n.iD)("div",l,[(0,n._)("p",null,"안녕하세요? "+(0,o.zw)(d.state.account.nickname)+"님!",1),(0,n._)("button",{onClick:e[0]||(e[0]=t=>d.logout())},"로그아웃"),(0,n._)("button",{onClick:e[1]||(e[1]=()=>{})},"스도쿠 게임하기"),h.sudokustart?((0,n.wg)(),(0,n.j4)(m,{key:0,onInputdata:e[2]||(e[2]=e=>{h.sudokustart=!1,f.inputdatas(t.timer)})})):(0,n.kq)("",!0)])):((0,n.wg)(),(0,n.iD)("div",c,[(0,n._)("label",a,[u,(0,n.wy)((0,n._)("input",{type:"text",id:"nickname","onUpdate:modelValue":e[3]||(e[3]=t=>d.state.form.nickname=t)},null,512),[[s.nr,d.state.form.nickname]])]),(0,n._)("button",{onClick:e[4]||(e[4]=t=>d.submit())},"로그인")]))])}var h=i(4870);i(7658);const f={id:"sudoku_div"},m={key:1,class:"setup"},k=(0,n._)("h1",null,"SUDOKU",-1),p=(0,n._)("div",null," 난이도 선택 ",-1);function w(t,e,i,r,l,c){const a=(0,n.up)("Sudoku");return(0,n.wg)(),(0,n.iD)("div",f,[l.start?((0,n.wg)(),(0,n.j4)(a,{key:0,diff:l.diff,showDetails:l.showDetails,onReset:e[0]||(e[0]=t=>l.start=!1),onExitSudoku:e[1]||(e[1]=e=>{l.start=!1,t.$router.push("/")})},null,8,["diff","showDetails"])):((0,n.wg)(),(0,n.iD)("div",m,[k,p,(0,n.wy)((0,n._)("input",{type:"range",min:"1",max:"10","onUpdate:modelValue":e[2]||(e[2]=t=>l.diff=t)},null,512),[[s.nr,l.diff,void 0,{number:!0}]]),(0,n._)("div",null,"난이도 : "+(0,o.zw)(l.diff),1),(0,n._)("button",{onClick:e[3]||(e[3]=t=>l.start=!0),class:"start"}," 게임 시작하기 "),(0,n._)("button",{onClick:e[4]||(e[4]=e=>t.$router.push("/")),class:"ending"}," 돌아가기 ")]))])}const v={class:"sudoku"},S={class:"top_btns"},g={class:"header"},_={class:"mistakes"},D={class:"grids"},y=["onMouseup"],b={class:"digits"},C=["onClick"],M={class:"solution"},x=(0,n._)("h2",null,"Solution",-1),O={class:"grid"};function T(t,e,i,r,l,c){const a=(0,n.up)("timer");return(0,n.wg)(),(0,n.iD)("div",v,[(0,n._)("div",S,[(0,n._)("button",{class:"reset_btn",onClick:e[0]||(e[0]=t=>c.checkreset())},"되돌아가기"),(0,n._)("button",{class:"exit_btn",onClick:e[1]||(e[1]=t=>c.checkexited())},"스도쿠 종료")]),(0,n.wy)((0,n._)("div",g,[(0,n.Wm)(a,{startMin:l.minutes,startSec:l.seconds,ref:"Timer"},null,8,["startMin","startSec"]),(0,n._)("div",null,"난이도 : "+(0,o.zw)(i.diff),1),(0,n._)("div",_,"틀린횟수 : "+(0,o.zw)(l.mistakes),1)],512),[[s.F8,i.showDetails]]),(0,n._)("div",D,[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(l.sudoku,((t,i)=>((0,n.wg)(),(0,n.iD)("div",{class:"rows",key:i},[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(t,((t,r)=>((0,n.wg)(),(0,n.iD)("div",{class:(0,o.C_)(["cell",c.getClass(t,i,r)]),key:r,onMouseup:t=>c.handleSelect(i,r,t),onKeydown:e[2]||(e[2]=(0,s.iM)(((...t)=>c.typeDigit&&c.typeDigit(...t)),["prevent"])),tabindex:"0"},(0,o.zw)(t),43,y)))),128))])))),128))]),(0,n.wy)((0,n._)("div",b,[((0,n.wg)(),(0,n.iD)(n.HY,null,(0,n.Ko)(9,(t=>(0,n._)("button",{class:"choise_num_btn",key:t,onClick:e=>c.insertDigit(t)},(0,o.zw)(t),9,C))),64)),(0,n._)("button",{class:"delete_num_btn",onClick:e[3]||(e[3]=t=>c.deleteDigit())},"숫자지우기 ")],512),[[s.F8,i.showDetails]]),(0,n._)("div",M,[x,(0,n._)("div",O,[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(l.solution,((t,e)=>((0,n.wg)(),(0,n.iD)("div",{class:"row",key:e},[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(t,((t,e)=>((0,n.wg)(),(0,n.iD)("div",{class:"cell",key:e},(0,o.zw)(t),1)))),128))])))),128))])])])}const z={class:"timer"};function $(t,e,i,s,r,l){return(0,n.wg)(),(0,n.iD)("div",z,(0,o.zw)(r.minutes)+":"+(0,o.zw)(r.seconds),1)}let j;var q={name:"Timer",data(){return{minutes:null,seconds:null}},props:{startMin:Number,startSec:Number},methods:{tick(){null===this.seconds&&(this.minutes=this.startMin,this.seconds=this.startSec),this.seconds++,this.seconds>=60&&(this.minutes++,this.seconds=0)},sysout(){let t=this.minutes+":"+this.seconds;return t},timer_stop(){clearInterval(j)}},mounted(){j=setInterval(this.tick,1e3)},beforeDestroy(){clearInterval(j)}},F=i(89);const K=(0,F.Z)(q,[["render",$]]);var V=K;let H=[[],[],[],[],[],[],[],[],[]];const I=[1,2,3,4,5,6,7,8,9],E=[{rowStart:0,colStart:0},{rowStart:0,colStart:6},{rowStart:6,colStart:6},{rowStart:6,colStart:0}],N=[{rowStart:0,colStart:3},{rowStart:3,colStart:0},{rowStart:6,colStart:3},{rowStart:3,colStart:6},{rowStart:3,colStart:3}];var P={name:"Sudoku",data(){return{sudoku:[],solution:[],saver:[],rowSelected:null,colSelected:null,seconds:0,minutes:0,mistakes:0}},components:{Timer:V},props:{diff:Number,showDetails:Boolean},methods:{handleSelect(t,e){this.rowSelected=t,this.colSelected=e},insertDigit(t){if(""!=this.saver[this.rowSelected][this.colSelected])return void alert("해당 값을 변경 할 수 없습니다.");t!==this.solution[this.rowSelected][this.colSelected]&&""!==t&&this.mistakes++,this.sudoku[this.rowSelected].splice(this.colSelected,1,t);let e=this.checkPointisEnd();if(e){let t=this.$refs.Timer.sysout();this.$refs.Timer.timer_stop(),this.$emit(inputdatas(t)),alert("성공! 축하합니다.\n클리어 기록 : "+t),this.$emit("reset")}},deleteDigit(){""==this.saver[this.rowSelected][this.colSelected]?this.sudoku[this.rowSelected].splice(this.colSelected,1,""):alert("해당 값을 변경 할 수 없습니다.")},typeDigit(t){const e=t.key,i=parseInt(e);isNaN(i)||0===i||this.insertDigit(i),"Delete"!==e&&"Backspace"!==e||this.insertDigit("")},getClass(t,e,i){if(!1===this.showDetails)return"";if(t!==this.solution[e][i]&&""!==t)return"invalid";const s=this.sudoku[e],n=this.getCol(i,this.sudoku),o=this.getSquare(e,i,this.sudoku),r=this.checkFilled(s),l=this.checkFilled(n),c=this.checkFilled(o);return r||l||c?this.rowSelected===e||this.colSelected===i?"completeHighlight":"complete":this.rowSelected===e||this.colSelected===i?this.rowSelected===e&&this.colSelected===i?"":"highlight":void 0},checkFilled(t){const e=t.filter((t=>""!==t));return 9===new Set(e).size},randomArrayVal(t){const e=Math.floor(Math.random()*t.length);return t[e]},getCol(t,e){return e.map((e=>e[t]))},selectDigit(t,e,i){const s=H[t],n=this.getCol(e,H),o=s.concat(n).concat(i),r=I.filter((t=>!o.includes(t)));return this.randomArrayVal(r)},getSquare(t,e,i){const s=3*Math.floor(t/3),n=s+3,o=3*Math.floor(e/3),r=o+3,l=i.slice(s,n),c=l.map((t=>t.slice(o,r))),a=c.flat();return a},resetCell(){return"-"},fillSquare({rowStart:t,colStart:e},i){let s=[];for(let n=t;n<t+3;n++)for(let t=e;t<e+3;t++){const e=i(n,t,s);if(void 0===e)return!0;s.push(e),H[n][t]=e}},fillSection(t){t.forEach((t=>this.fillSquare(t,this.resetCell)));for(const e of t){const i=this.fillSquare(e,this.selectDigit);if(!0===i)return void this.fillSection(t)}},makeSudoku(){this.fillSection(E),this.fillSection(N),this.sudoku=H.map((t=>t.map((t=>(Math.round(10*Math.random())<=this.diff&&(t=""),t))))),this.solution=H,0==this.saver.length&&(this.saver=this.sudoku.map((t=>[...t])))},checkexited(){let t=confirm("수도쿠를 종료하고 메인페이지로 돌아가시겠습니까?");t&&this.$emit("exitSudoku")},checkreset(){let t=confirm("메뉴 화면으로 돌아가시겠습니까?");t&&this.$emit("reset")},checkPointisEnd(){for(let t=0;t<this.sudoku.length;t++)for(let e=0;e<this.sudoku[t].length;e++)if(""===this.sudoku[t][e])return!1;return!0}},mounted(){this.makeSudoku(),setInterval(this.tick,1e3)}};const U=(0,F.Z)(P,[["render",T]]);var Y=U,Z={name:"MyTestGameView",data(){return{diff:5,start:!1,showDetails:!0}},components:{Sudoku:Y},method:{}};const A=(0,F.Z)(Z,[["render",w]]);var G=A,B={name:"App",components:{MyTestGameView:G},methods:{inputdatas(t){let e=state.account.nickname,i="/testa";axios({url:i,method:"PUT",data:{nickname:e,timer:t}}).then((t=>{console.log(t)}))}},data(){return{sudokustart:!1}},setup(){const t=(0,n.f3)("$axios"),e=(0,h.qj)({account:{id:null},form:{nickname:""}}),i=()=>{const i={nickname:e.form.nickname};t.post("http://localhost:3001/api/account",i).then((t=>{alert("로그인에 성공했습니다."),e.account.nickname=t.data})).catch((()=>{console.log(i),alert("로그인에 실패했습니다. 계정 정보를 확인해주세요.")}))},s=()=>{t.delete("http://localhost:3001/api/account").then((()=>{alert("로그아웃하였습니다."),e.account.nickname=null,e.form.nickname=""}))};return{state:e,submit:i,logout:s}}};const R=(0,F.Z)(B,[["render",d]]);var W=R,J=i(4161);const L=(0,s.ri)(W);L.provide("$axios",J.Z),L.mount("#app")}},e={};function i(s){var n=e[s];if(void 0!==n)return n.exports;var o=e[s]={exports:{}};return t[s].call(o.exports,o,o.exports,i),o.exports}i.m=t,function(){var t=[];i.O=function(e,s,n,o){if(!s){var r=1/0;for(u=0;u<t.length;u++){s=t[u][0],n=t[u][1],o=t[u][2];for(var l=!0,c=0;c<s.length;c++)(!1&o||r>=o)&&Object.keys(i.O).every((function(t){return i.O[t](s[c])}))?s.splice(c--,1):(l=!1,o<r&&(r=o));if(l){t.splice(u--,1);var a=n();void 0!==a&&(e=a)}}return e}o=o||0;for(var u=t.length;u>0&&t[u-1][2]>o;u--)t[u]=t[u-1];t[u]=[s,n,o]}}(),function(){i.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return i.d(e,{a:e}),e}}(),function(){i.d=function(t,e){for(var s in e)i.o(e,s)&&!i.o(t,s)&&Object.defineProperty(t,s,{enumerable:!0,get:e[s]})}}(),function(){i.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}}(),function(){var t={143:0};i.O.j=function(e){return 0===t[e]};var e=function(e,s){var n,o,r=s[0],l=s[1],c=s[2],a=0;if(r.some((function(e){return 0!==t[e]}))){for(n in l)i.o(l,n)&&(i.m[n]=l[n]);if(c)var u=c(i)}for(e&&e(s);a<r.length;a++)o=r[a],i.o(t,o)&&t[o]&&t[o][0](),t[o]=0;return i.O(u)},s=self["webpackChunkfront"]=self["webpackChunkfront"]||[];s.forEach(e.bind(null,0)),s.push=e.bind(null,s.push.bind(s))}();var s=i.O(void 0,[998],(function(){return i(3973)}));s=i.O(s)})();
//# sourceMappingURL=app.c282b176.js.map