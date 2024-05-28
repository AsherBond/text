/*! third party licenses: js/vendor.LICENSE.txt */
import{ag as st,ad as mt,ac as _t,ae as xt,af as kt,aG as vt,aF as bt,aH as Et,ao as Lt,bI as wt,ak as K,aw as At}from"./RichText-CfWEvySW.mjs";import"./NcNoteCard-e7-Bxio8-DX1UPUdy.mjs";import{o as St}from"./ordinal-WbJcq6JM.mjs";import{s as Mt}from"./Tableau10-CtWOpFMd.mjs";import"./NcTextArea-XCi8a16Y-CFSsbK92.mjs";import"./vue.runtime.esm-Dd7ivler.mjs";import"./index-vg7q3Iku.mjs";import"./index-DMlkRGZt.mjs";import"./modulepreload-polyfill-DZeoc1eZ.mjs";import"./index-eMgxgA-0.mjs";import"./index-7dlE0du4.mjs";import"./index-Ubm2itxG.mjs";import"./MediaHandler.provider-2sdLyJv2.mjs";import"./logger-2teHUPfo.mjs";import"./_plugin-vue2_normalizer-BWKvF6pj.mjs";import"./init-q33yAy1W.mjs";function ot(n,e){let r;if(e===void 0)for(const c of n)c!=null&&(r<c||r===void 0&&c>=c)&&(r=c);else{let c=-1;for(let h of n)(h=e(h,++c,n))!=null&&(r<h||r===void 0&&h>=h)&&(r=h)}return r}function yt(n,e){let r;if(e===void 0)for(const c of n)c!=null&&(r>c||r===void 0&&c>=c)&&(r=c);else{let c=-1;for(let h of n)(h=e(h,++c,n))!=null&&(r>h||r===void 0&&h>=h)&&(r=h)}return r}function H(n,e){let r=0;if(e===void 0)for(let c of n)(c=+c)&&(r+=c);else{let c=-1;for(let h of n)(h=+e(h,++c,n))&&(r+=h)}return r}function It(n){return n.target.depth}function Pt(n){return n.depth}function Nt(n,e){return e-1-n.height}function pt(n,e){return n.sourceLinks.length?n.depth:e-1}function Ct(n){return n.targetLinks.length?n.depth:n.sourceLinks.length?yt(n.sourceLinks,It)-1:0}function Q(n){return function(){return n}}function at(n,e){return R(n.source,e.source)||n.index-e.index}function ct(n,e){return R(n.target,e.target)||n.index-e.index}function R(n,e){return n.y0-e.y0}function J(n){return n.value}function Dt(n){return n.index}function Ot(n){return n.nodes}function Tt(n){return n.links}function ht(n,e){const r=n.get(e);if(!r)throw new Error("missing: "+e);return r}function lt({nodes:n}){for(const e of n){let r=e.y0,c=r;for(const h of e.sourceLinks)h.y0=r+h.width/2,r+=h.width;for(const h of e.targetLinks)h.y1=c+h.width/2,c+=h.width}}function jt(){let n=0,e=0,r=1,c=1,h=24,g=8,m,d=Dt,i=pt,a,f,_=Ot,y=Tt,k=6;function x(){const t={nodes:_.apply(null,arguments),links:y.apply(null,arguments)};return I(t),w(t),A(t),D(t),P(t),lt(t),t}x.update=function(t){return lt(t),t},x.nodeId=function(t){return arguments.length?(d=typeof t=="function"?t:Q(t),x):d},x.nodeAlign=function(t){return arguments.length?(i=typeof t=="function"?t:Q(t),x):i},x.nodeSort=function(t){return arguments.length?(a=t,x):a},x.nodeWidth=function(t){return arguments.length?(h=+t,x):h},x.nodePadding=function(t){return arguments.length?(g=m=+t,x):g},x.nodes=function(t){return arguments.length?(_=typeof t=="function"?t:Q(t),x):_},x.links=function(t){return arguments.length?(y=typeof t=="function"?t:Q(t),x):y},x.linkSort=function(t){return arguments.length?(f=t,x):f},x.size=function(t){return arguments.length?(n=e=0,r=+t[0],c=+t[1],x):[r-n,c-e]},x.extent=function(t){return arguments.length?(n=+t[0][0],r=+t[1][0],e=+t[0][1],c=+t[1][1],x):[[n,e],[r,c]]},x.iterations=function(t){return arguments.length?(k=+t,x):k};function I({nodes:t,links:o}){for(const[u,s]of t.entries())s.index=u,s.sourceLinks=[],s.targetLinks=[];const l=new Map(t.map((u,s)=>[d(u,s,t),u]));for(const[u,s]of o.entries()){s.index=u;let{source:p,target:b}=s;typeof p!="object"&&(p=s.source=ht(l,p)),typeof b!="object"&&(b=s.target=ht(l,b)),p.sourceLinks.push(s),b.targetLinks.push(s)}if(f!=null)for(const{sourceLinks:u,targetLinks:s}of t)u.sort(f),s.sort(f)}function w({nodes:t}){for(const o of t)o.value=o.fixedValue===void 0?Math.max(H(o.sourceLinks,J),H(o.targetLinks,J)):o.fixedValue}function A({nodes:t}){const o=t.length;let l=new Set(t),u=new Set,s=0;for(;l.size;){for(const p of l){p.depth=s;for(const{target:b}of p.sourceLinks)u.add(b)}if(++s>o)throw new Error("circular link");l=u,u=new Set}}function D({nodes:t}){const o=t.length;let l=new Set(t),u=new Set,s=0;for(;l.size;){for(const p of l){p.height=s;for(const{source:b}of p.targetLinks)u.add(b)}if(++s>o)throw new Error("circular link");l=u,u=new Set}}function S({nodes:t}){const o=ot(t,s=>s.depth)+1,l=(r-n-h)/(o-1),u=new Array(o);for(const s of t){const p=Math.max(0,Math.min(o-1,Math.floor(i.call(null,s,o))));s.layer=p,s.x0=n+p*l,s.x1=s.x0+h,u[p]?u[p].push(s):u[p]=[s]}if(a)for(const s of u)s.sort(a);return u}function v(t){const o=yt(t,l=>(c-e-(l.length-1)*m)/H(l,J));for(const l of t){let u=e;for(const s of l){s.y0=u,s.y1=u+s.value*o,u=s.y1+m;for(const p of s.sourceLinks)p.width=p.value*o}u=(c-u+m)/(l.length+1);for(let s=0;s<l.length;++s){const p=l[s];p.y0+=u*(s+1),p.y1+=u*(s+1)}L(l)}}function P(t){const o=S(t);m=Math.min(g,(c-e)/(ot(o,l=>l.length)-1)),v(o);for(let l=0;l<k;++l){const u=Math.pow(.99,l),s=Math.max(1-u,(l+1)/k);N(o,u,s),O(o,u,s)}}function O(t,o,l){for(let u=1,s=t.length;u<s;++u){const p=t[u];for(const b of p){let W=0,z=0;for(const{source:X,value:Z}of b.targetLinks){let q=Z*(b.layer-X.layer);W+=T(X,b)*q,z+=q}if(!(z>0))continue;let G=(W/z-b.y0)*o;b.y0+=G,b.y1+=G,M(b)}a===void 0&&p.sort(R),j(p,l)}}function N(t,o,l){for(let u=t.length,s=u-2;s>=0;--s){const p=t[s];for(const b of p){let W=0,z=0;for(const{target:X,value:Z}of b.sourceLinks){let q=Z*(X.layer-b.layer);W+=C(b,X)*q,z+=q}if(!(z>0))continue;let G=(W/z-b.y0)*o;b.y0+=G,b.y1+=G,M(b)}a===void 0&&p.sort(R),j(p,l)}}function j(t,o){const l=t.length>>1,u=t[l];E(t,u.y0-m,l-1,o),$(t,u.y1+m,l+1,o),E(t,c,t.length-1,o),$(t,e,0,o)}function $(t,o,l,u){for(;l<t.length;++l){const s=t[l],p=(o-s.y0)*u;p>1e-6&&(s.y0+=p,s.y1+=p),o=s.y1+m}}function E(t,o,l,u){for(;l>=0;--l){const s=t[l],p=(s.y1-o)*u;p>1e-6&&(s.y0-=p,s.y1-=p),o=s.y0-m}}function M({sourceLinks:t,targetLinks:o}){if(f===void 0){for(const{source:{sourceLinks:l}}of o)l.sort(ct);for(const{target:{targetLinks:l}}of t)l.sort(at)}}function L(t){if(f===void 0)for(const{sourceLinks:o,targetLinks:l}of t)o.sort(ct),l.sort(at)}function T(t,o){let l=t.y0-(t.sourceLinks.length-1)*m/2;for(const{target:u,width:s}of t.sourceLinks){if(u===o)break;l+=s+m}for(const{source:u,width:s}of o.targetLinks){if(u===t)break;l-=s}return l}function C(t,o){let l=o.y0-(o.targetLinks.length-1)*m/2;for(const{source:u,width:s}of o.targetLinks){if(u===t)break;l+=s+m}for(const{target:u,width:s}of t.sourceLinks){if(u===o)break;l-=s}return l}return x}var tt=Math.PI,nt=2*tt,F=1e-6,$t=nt-F;function et(){this._x0=this._y0=this._x1=this._y1=null,this._=""}function gt(){return new et}et.prototype=gt.prototype={constructor:et,moveTo:function(n,e){this._+="M"+(this._x0=this._x1=+n)+","+(this._y0=this._y1=+e)},closePath:function(){this._x1!==null&&(this._x1=this._x0,this._y1=this._y0,this._+="Z")},lineTo:function(n,e){this._+="L"+(this._x1=+n)+","+(this._y1=+e)},quadraticCurveTo:function(n,e,r,c){this._+="Q"+ +n+","+ +e+","+(this._x1=+r)+","+(this._y1=+c)},bezierCurveTo:function(n,e,r,c,h,g){this._+="C"+ +n+","+ +e+","+ +r+","+ +c+","+(this._x1=+h)+","+(this._y1=+g)},arcTo:function(n,e,r,c,h){n=+n,e=+e,r=+r,c=+c,h=+h;var g=this._x1,m=this._y1,d=r-n,i=c-e,a=g-n,f=m-e,_=a*a+f*f;if(h<0)throw new Error("negative radius: "+h);if(this._x1===null)this._+="M"+(this._x1=n)+","+(this._y1=e);else if(_>F)if(!(Math.abs(f*d-i*a)>F)||!h)this._+="L"+(this._x1=n)+","+(this._y1=e);else{var y=r-g,k=c-m,x=d*d+i*i,I=y*y+k*k,w=Math.sqrt(x),A=Math.sqrt(_),D=h*Math.tan((tt-Math.acos((x+_-I)/(2*w*A)))/2),S=D/A,v=D/w;Math.abs(S-1)>F&&(this._+="L"+(n+S*a)+","+(e+S*f)),this._+="A"+h+","+h+",0,0,"+ +(f*y>a*k)+","+(this._x1=n+v*d)+","+(this._y1=e+v*i)}},arc:function(n,e,r,c,h,g){n=+n,e=+e,r=+r,g=!!g;var m=r*Math.cos(c),d=r*Math.sin(c),i=n+m,a=e+d,f=1^g,_=g?c-h:h-c;if(r<0)throw new Error("negative radius: "+r);this._x1===null?this._+="M"+i+","+a:(Math.abs(this._x1-i)>F||Math.abs(this._y1-a)>F)&&(this._+="L"+i+","+a),r&&(_<0&&(_=_%nt+nt),_>$t?this._+="A"+r+","+r+",0,1,"+f+","+(n-m)+","+(e-d)+"A"+r+","+r+",0,1,"+f+","+(this._x1=i)+","+(this._y1=a):_>F&&(this._+="A"+r+","+r+",0,"+ +(_>=tt)+","+f+","+(this._x1=n+r*Math.cos(h))+","+(this._y1=e+r*Math.sin(h))))},rect:function(n,e,r,c){this._+="M"+(this._x0=this._x1=+n)+","+(this._y0=this._y1=+e)+"h"+ +r+"v"+ +c+"h"+-r+"Z"},toString:function(){return this._}};function ut(n){return function(){return n}}function zt(n){return n[0]}function Ft(n){return n[1]}var Ut=Array.prototype.slice;function Wt(n){return n.source}function Gt(n){return n.target}function Xt(n){var e=Wt,r=Gt,c=zt,h=Ft,g=null;function m(){var d,i=Ut.call(arguments),a=e.apply(this,i),f=r.apply(this,i);if(g||(g=d=gt()),n(g,+c.apply(this,(i[0]=a,i)),+h.apply(this,i),+c.apply(this,(i[0]=f,i)),+h.apply(this,i)),d)return g=null,d+""||null}return m.source=function(d){return arguments.length?(e=d,m):e},m.target=function(d){return arguments.length?(r=d,m):r},m.x=function(d){return arguments.length?(c=typeof d=="function"?d:ut(+d),m):c},m.y=function(d){return arguments.length?(h=typeof d=="function"?d:ut(+d),m):h},m.context=function(d){return arguments.length?(g=d!=null?d:null,m):g},m}function qt(n,e,r,c,h){n.moveTo(e,r),n.bezierCurveTo(e=(e+c)/2,r,e,h,c,h)}function Kt(){return Xt(qt)}function Qt(n){return[n.source.x1,n.y0]}function Rt(n){return[n.target.x0,n.y1]}function Yt(){return Kt().source(Qt).target(Rt)}var it=function(){var n=function(d,i,a,f){for(a=a||{},f=d.length;f--;a[d[f]]=i);return a},e=[1,9],r=[1,10],c=[1,5,10,12],h={trace:function(){},yy:{},symbols_:{error:2,start:3,SANKEY:4,NEWLINE:5,csv:6,opt_eof:7,record:8,csv_tail:9,EOF:10,"field[source]":11,COMMA:12,"field[target]":13,"field[value]":14,field:15,escaped:16,non_escaped:17,DQUOTE:18,ESCAPED_TEXT:19,NON_ESCAPED_TEXT:20,$accept:0,$end:1},terminals_:{2:"error",4:"SANKEY",5:"NEWLINE",10:"EOF",11:"field[source]",12:"COMMA",13:"field[target]",14:"field[value]",18:"DQUOTE",19:"ESCAPED_TEXT",20:"NON_ESCAPED_TEXT"},productions_:[0,[3,4],[6,2],[9,2],[9,0],[7,1],[7,0],[8,5],[15,1],[15,1],[16,3],[17,1]],performAction:function(d,i,a,f,_,y,k){var x=y.length-1;switch(_){case 7:const I=f.findOrCreateNode(y[x-4].trim().replaceAll('""','"')),w=f.findOrCreateNode(y[x-2].trim().replaceAll('""','"')),A=parseFloat(y[x].trim());f.addLink(I,w,A);break;case 8:case 9:case 11:this.$=y[x];break;case 10:this.$=y[x-1];break}},table:[{3:1,4:[1,2]},{1:[3]},{5:[1,3]},{6:4,8:5,15:6,16:7,17:8,18:e,20:r},{1:[2,6],7:11,10:[1,12]},n(r,[2,4],{9:13,5:[1,14]}),{12:[1,15]},n(c,[2,8]),n(c,[2,9]),{19:[1,16]},n(c,[2,11]),{1:[2,1]},{1:[2,5]},n(r,[2,2]),{6:17,8:5,15:6,16:7,17:8,18:e,20:r},{15:18,16:7,17:8,18:e,20:r},{18:[1,19]},n(r,[2,3]),{12:[1,20]},n(c,[2,10]),{15:21,16:7,17:8,18:e,20:r},n([1,5,10],[2,7])],defaultActions:{11:[2,1],12:[2,5]},parseError:function(d,i){if(i.recoverable)this.trace(d);else{var a=new Error(d);throw a.hash=i,a}},parse:function(d){var i=this,a=[0],f=[],_=[null],y=[],k=this.table,x="",I=0,w=0,A=2,D=1,S=y.slice.call(arguments,1),v=Object.create(this.lexer),P={yy:{}};for(var O in this.yy)Object.prototype.hasOwnProperty.call(this.yy,O)&&(P.yy[O]=this.yy[O]);v.setInput(d,P.yy),P.yy.lexer=v,P.yy.parser=this,typeof v.yylloc>"u"&&(v.yylloc={});var N=v.yylloc;y.push(N);var j=v.options&&v.options.ranges;typeof P.yy.parseError=="function"?this.parseError=P.yy.parseError:this.parseError=Object.getPrototypeOf(this).parseError;function $(){var p;return p=f.pop()||v.lex()||D,typeof p!="number"&&(p instanceof Array&&(f=p,p=f.pop()),p=i.symbols_[p]||p),p}for(var E,M,L,T,C={},t,o,l,u;;){if(M=a[a.length-1],this.defaultActions[M]?L=this.defaultActions[M]:((E===null||typeof E>"u")&&(E=$()),L=k[M]&&k[M][E]),typeof L>"u"||!L.length||!L[0]){var s="";u=[];for(t in k[M])this.terminals_[t]&&t>A&&u.push("'"+this.terminals_[t]+"'");v.showPosition?s="Parse error on line "+(I+1)+":\n"+v.showPosition()+"\nExpecting "+u.join(", ")+", got '"+(this.terminals_[E]||E)+"'":s="Parse error on line "+(I+1)+": Unexpected "+(E==D?"end of input":"'"+(this.terminals_[E]||E)+"'"),this.parseError(s,{text:v.match,token:this.terminals_[E]||E,line:v.yylineno,loc:N,expected:u})}if(L[0]instanceof Array&&L.length>1)throw new Error("Parse Error: multiple actions possible at state: "+M+", token: "+E);switch(L[0]){case 1:a.push(E),_.push(v.yytext),y.push(v.yylloc),a.push(L[1]),E=null,w=v.yyleng,x=v.yytext,I=v.yylineno,N=v.yylloc;break;case 2:if(o=this.productions_[L[1]][1],C.$=_[_.length-o],C._$={first_line:y[y.length-(o||1)].first_line,last_line:y[y.length-1].last_line,first_column:y[y.length-(o||1)].first_column,last_column:y[y.length-1].last_column},j&&(C._$.range=[y[y.length-(o||1)].range[0],y[y.length-1].range[1]]),T=this.performAction.apply(C,[x,w,I,P.yy,L[1],_,y].concat(S)),typeof T<"u")return T;o&&(a=a.slice(0,-1*o*2),_=_.slice(0,-1*o),y=y.slice(0,-1*o)),a.push(this.productions_[L[1]][0]),_.push(C.$),y.push(C._$),l=k[a[a.length-2]][a[a.length-1]],a.push(l);break;case 3:return!0}}return!0}},g=function(){var d={EOF:1,parseError:function(i,a){if(this.yy.parser)this.yy.parser.parseError(i,a);else throw new Error(i)},setInput:function(i,a){return this.yy=a||this.yy||{},this._input=i,this._more=this._backtrack=this.done=!1,this.yylineno=this.yyleng=0,this.yytext=this.matched=this.match="",this.conditionStack=["INITIAL"],this.yylloc={first_line:1,first_column:0,last_line:1,last_column:0},this.options.ranges&&(this.yylloc.range=[0,0]),this.offset=0,this},input:function(){var i=this._input[0];this.yytext+=i,this.yyleng++,this.offset++,this.match+=i,this.matched+=i;var a=i.match(/(?:\r\n?|\n).*/g);return a?(this.yylineno++,this.yylloc.last_line++):this.yylloc.last_column++,this.options.ranges&&this.yylloc.range[1]++,this._input=this._input.slice(1),i},unput:function(i){var a=i.length,f=i.split(/(?:\r\n?|\n)/g);this._input=i+this._input,this.yytext=this.yytext.substr(0,this.yytext.length-a),this.offset-=a;var _=this.match.split(/(?:\r\n?|\n)/g);this.match=this.match.substr(0,this.match.length-1),this.matched=this.matched.substr(0,this.matched.length-1),f.length-1&&(this.yylineno-=f.length-1);var y=this.yylloc.range;return this.yylloc={first_line:this.yylloc.first_line,last_line:this.yylineno+1,first_column:this.yylloc.first_column,last_column:f?(f.length===_.length?this.yylloc.first_column:0)+_[_.length-f.length].length-f[0].length:this.yylloc.first_column-a},this.options.ranges&&(this.yylloc.range=[y[0],y[0]+this.yyleng-a]),this.yyleng=this.yytext.length,this},more:function(){return this._more=!0,this},reject:function(){if(this.options.backtrack_lexer)this._backtrack=!0;else return this.parseError("Lexical error on line "+(this.yylineno+1)+". You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n"+this.showPosition(),{text:"",token:null,line:this.yylineno});return this},less:function(i){this.unput(this.match.slice(i))},pastInput:function(){var i=this.matched.substr(0,this.matched.length-this.match.length);return(i.length>20?"...":"")+i.substr(-20).replace(/\n/g,"")},upcomingInput:function(){var i=this.match;return i.length<20&&(i+=this._input.substr(0,20-i.length)),(i.substr(0,20)+(i.length>20?"...":"")).replace(/\n/g,"")},showPosition:function(){var i=this.pastInput(),a=new Array(i.length+1).join("-");return i+this.upcomingInput()+"\n"+a+"^"},test_match:function(i,a){var f,_,y;if(this.options.backtrack_lexer&&(y={yylineno:this.yylineno,yylloc:{first_line:this.yylloc.first_line,last_line:this.last_line,first_column:this.yylloc.first_column,last_column:this.yylloc.last_column},yytext:this.yytext,match:this.match,matches:this.matches,matched:this.matched,yyleng:this.yyleng,offset:this.offset,_more:this._more,_input:this._input,yy:this.yy,conditionStack:this.conditionStack.slice(0),done:this.done},this.options.ranges&&(y.yylloc.range=this.yylloc.range.slice(0))),_=i[0].match(/(?:\r\n?|\n).*/g),_&&(this.yylineno+=_.length),this.yylloc={first_line:this.yylloc.last_line,last_line:this.yylineno+1,first_column:this.yylloc.last_column,last_column:_?_[_.length-1].length-_[_.length-1].match(/\r?\n?/)[0].length:this.yylloc.last_column+i[0].length},this.yytext+=i[0],this.match+=i[0],this.matches=i,this.yyleng=this.yytext.length,this.options.ranges&&(this.yylloc.range=[this.offset,this.offset+=this.yyleng]),this._more=!1,this._backtrack=!1,this._input=this._input.slice(i[0].length),this.matched+=i[0],f=this.performAction.call(this,this.yy,this,a,this.conditionStack[this.conditionStack.length-1]),this.done&&this._input&&(this.done=!1),f)return f;if(this._backtrack){for(var k in y)this[k]=y[k];return!1}return!1},next:function(){if(this.done)return this.EOF;this._input||(this.done=!0);var i,a,f,_;this._more||(this.yytext="",this.match="");for(var y=this._currentRules(),k=0;k<y.length;k++)if(f=this._input.match(this.rules[y[k]]),f&&(!a||f[0].length>a[0].length)){if(a=f,_=k,this.options.backtrack_lexer){if(i=this.test_match(f,y[k]),i!==!1)return i;if(this._backtrack){a=!1;continue}else return!1}else if(!this.options.flex)break}return a?(i=this.test_match(a,y[_]),i!==!1?i:!1):this._input===""?this.EOF:this.parseError("Lexical error on line "+(this.yylineno+1)+". Unrecognized text.\n"+this.showPosition(),{text:"",token:null,line:this.yylineno})},lex:function(){var i=this.next();return i||this.lex()},begin:function(i){this.conditionStack.push(i)},popState:function(){var i=this.conditionStack.length-1;return i>0?this.conditionStack.pop():this.conditionStack[0]},_currentRules:function(){return this.conditionStack.length&&this.conditionStack[this.conditionStack.length-1]?this.conditions[this.conditionStack[this.conditionStack.length-1]].rules:this.conditions.INITIAL.rules},topState:function(i){return i=this.conditionStack.length-1-Math.abs(i||0),i>=0?this.conditionStack[i]:"INITIAL"},pushState:function(i){this.begin(i)},stateStackSize:function(){return this.conditionStack.length},options:{"case-insensitive":!0},performAction:function(i,a,f,_){switch(f){case 0:return this.pushState("csv"),4;case 1:return 10;case 2:return 5;case 3:return 12;case 4:return this.pushState("escaped_text"),18;case 5:return 20;case 6:return this.popState("escaped_text"),18;case 7:return 19}},rules:[/^(?:sankey-beta\b)/i,/^(?:$)/i,/^(?:((\u000D\u000A)|(\u000A)))/i,/^(?:(\u002C))/i,/^(?:(\u0022))/i,/^(?:([\u0020-\u0021\u0023-\u002B\u002D-\u007E])*)/i,/^(?:(\u0022)(?!(\u0022)))/i,/^(?:(([\u0020-\u0021\u0023-\u002B\u002D-\u007E])|(\u002C)|(\u000D)|(\u000A)|(\u0022)(\u0022))*)/i],conditions:{csv:{rules:[1,2,3,4,5,6,7],inclusive:!1},escaped_text:{rules:[6,7],inclusive:!1},INITIAL:{rules:[0,1,2,3,4,5,6,7],inclusive:!0}}};return d}();h.lexer=g;function m(){this.yy={}}return m.prototype=h,h.Parser=m,new m}();it.parser=it;const Y=it;let B=[],V=[],U={};const Bt=()=>{B=[],V=[],U={},Et()};class Vt{constructor(e,r,c=0){this.source=e,this.target=r,this.value=c}}const Zt=(n,e,r)=>{B.push(new Vt(n,e,r))};class Ht{constructor(e){this.ID=e}}const Jt=n=>(n=Lt.sanitizeText(n,st()),U[n]||(U[n]=new Ht(n),V.push(U[n])),U[n]),tn=()=>V,nn=()=>B,en=()=>({nodes:V.map(n=>({id:n.ID})),links:B.map(n=>({source:n.source.ID,target:n.target.ID,value:n.value}))}),rn={nodesMap:U,getConfig:()=>st().sankey,getNodes:tn,getLinks:nn,getGraph:en,addLink:Zt,findOrCreateNode:Jt,getAccTitle:mt,setAccTitle:_t,getAccDescription:xt,setAccDescription:kt,getDiagramTitle:vt,setDiagramTitle:bt,clear:Bt},dt=class rt{static next(e){return new rt(e+ ++rt.count)}constructor(e){this.id=e,this.href="#".concat(e)}toString(){return"url("+this.href+")"}};dt.count=0;let ft=dt;const sn={left:Pt,right:Nt,center:Ct,justify:pt},on=function(n,e,r,c){var j,$,E,M,L,T,C;const{securityLevel:h,sankey:g}=st(),m=wt.sankey;let d;h==="sandbox"&&(d=K("#i"+e));const i=h==="sandbox"?K(d.nodes()[0].contentDocument.body):K("body"),a=h==="sandbox"?i.select('[id="'.concat(e,'"]')):K('[id="'.concat(e,'"]')),f=(j=g==null?void 0:g.width)!=null?j:m.width,_=($=g==null?void 0:g.height)!=null?$:m.width,y=(E=g==null?void 0:g.useMaxWidth)!=null?E:m.useMaxWidth,k=(M=g==null?void 0:g.nodeAlignment)!=null?M:m.nodeAlignment,x=(L=g==null?void 0:g.prefix)!=null?L:m.prefix,I=(T=g==null?void 0:g.suffix)!=null?T:m.suffix,w=(C=g==null?void 0:g.showValues)!=null?C:m.showValues,A=c.db.getGraph(),D=sn[k];jt().nodeId(t=>t.id).nodeWidth(10).nodePadding(10+(w?15:0)).nodeAlign(D).extent([[0,0],[f,_]])(A);const S=St(Mt);a.append("g").attr("class","nodes").selectAll(".node").data(A.nodes).join("g").attr("class","node").attr("id",t=>(t.uid=ft.next("node-")).id).attr("transform",function(t){return"translate("+t.x0+","+t.y0+")"}).attr("x",t=>t.x0).attr("y",t=>t.y0).append("rect").attr("height",t=>t.y1-t.y0).attr("width",t=>t.x1-t.x0).attr("fill",t=>S(t.id));const v=({id:t,value:o})=>w?"".concat(t,"\n").concat(x).concat(Math.round(o*100)/100).concat(I):t;a.append("g").attr("class","node-labels").attr("font-family","sans-serif").attr("font-size",14).selectAll("text").data(A.nodes).join("text").attr("x",t=>t.x0<f/2?t.x1+6:t.x0-6).attr("y",t=>(t.y1+t.y0)/2).attr("dy","".concat(w?"0":"0.35","em")).attr("text-anchor",t=>t.x0<f/2?"start":"end").text(v);const P=a.append("g").attr("class","links").attr("fill","none").attr("stroke-opacity",.5).selectAll(".link").data(A.links).join("g").attr("class","link").style("mix-blend-mode","multiply"),O=(g==null?void 0:g.linkColor)||"gradient";if(O==="gradient"){const t=P.append("linearGradient").attr("id",o=>(o.uid=ft.next("linearGradient-")).id).attr("gradientUnits","userSpaceOnUse").attr("x1",o=>o.source.x1).attr("x2",o=>o.target.x0);t.append("stop").attr("offset","0%").attr("stop-color",o=>S(o.source.id)),t.append("stop").attr("offset","100%").attr("stop-color",o=>S(o.target.id))}let N;switch(O){case"gradient":N=t=>t.uid;break;case"source":N=t=>S(t.source.id);break;case"target":N=t=>S(t.target.id);break;default:N=O}P.append("path").attr("d",Yt()).attr("stroke",N).attr("stroke-width",t=>Math.max(1,t.width)),At(void 0,a,0,y)},an={draw:on},cn=n=>n.replaceAll(/^[^\S\n\r]+|[^\S\n\r]+$/g,"").replaceAll(/([\n\r])+/g,"\n").trim(),hn=Y.parse.bind(Y);Y.parse=n=>hn(cn(n));const An={parser:Y,db:rn,renderer:an};export{An as diagram};