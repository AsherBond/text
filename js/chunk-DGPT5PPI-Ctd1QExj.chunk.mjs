/*! third party licenses: js/vendor.LICENSE.txt */
import{_ as h,j as B,l as C,d as N,A as j,B as nt,C as W,D as lt,i as X}from"./mermaid.core-COGPIbHP.chunk.mjs";function F(l,t){t&&l.attr("style",t)}h(F,"applyStyle");function K(l){const t=B(document.createElementNS("http://www.w3.org/2000/svg","foreignObject")),n=t.append("xhtml:div"),r=l.label,i=l.isNode?"nodeLabel":"edgeLabel",e=n.append("span");return e.html(r),F(e,l.labelStyle),e.attr("class",i),F(n,l.labelStyle),n.style("display","inline-block"),n.style("white-space","nowrap"),n.attr("xmlns","http://www.w3.org/1999/xhtml"),t.node()}h(K,"addHtmlLabel");var ot=h((l,t,n,r)=>{let i=l||"";if(typeof i=="object"&&(i=i[0]),j(N().flowchart.htmlLabels)){i=i.replace(/\\n|\n/g,"<br />"),C.debug("vertexText"+i);const e={isNode:r,label:nt(W(i)),labelStyle:t.replace("fill:","color:")};return K(e)}else{const e=document.createElementNS("http://www.w3.org/2000/svg","text");e.setAttribute("style",t.replace("color:","fill:"));let a=[];typeof i=="string"?a=i.split(/\\n|\n|<br\s*\/?>/gi):Array.isArray(i)?a=i:a=[];for(const s of a){const o=document.createElementNS("http://www.w3.org/2000/svg","tspan");o.setAttributeNS("http://www.w3.org/XML/1998/namespace","xml:space","preserve"),o.setAttribute("dy","1em"),o.setAttribute("x","0"),n?o.setAttribute("class","title-row"):o.setAttribute("class","row"),o.textContent=s.trim(),e.appendChild(o)}return e}},"createLabel"),A=ot,L=h(async(l,t,n,r)=>{const i=N();let e;const a=t.useHtmlLabels||j(i.flowchart.htmlLabels);n?e=n:e="node default";const s=l.insert("g").attr("class",e).attr("id",t.domId||t.id),o=s.insert("g").attr("class","label").attr("style",t.labelStyle);let c;t.labelText===void 0?c="":c=typeof t.labelText=="string"?t.labelText:t.labelText[0];const d=o.node();let y;t.labelType==="markdown"?y=lt(o,X(W(c),i),{useHtmlLabels:a,width:t.width||i.flowchart.wrappingWidth,classes:"markdown-node-label"},i):y=d.appendChild(A(X(W(c),i),t.labelStyle,!1,r));let g=y.getBBox();const x=t.padding/2;if(j(i.flowchart.htmlLabels)){const p=y.children[0],v=B(y),w=p.getElementsByTagName("img");if(w){const k=c.replace(/<img[^>]*>/g,"").trim()==="";await Promise.all([...w].map(S=>new Promise(M=>{function _(){if(S.style.display="flex",S.style.flexDirection="column",k){const R=i.fontSize?i.fontSize:window.getComputedStyle(document.body).fontSize,$=parseInt(R,10)*5+"px";S.style.minWidth=$,S.style.maxWidth=$}else S.style.width="100%";M(S)}h(_,"setupImage"),setTimeout(()=>{S.complete&&_()}),S.addEventListener("error",_),S.addEventListener("load",_)})))}g=p.getBoundingClientRect(),v.attr("width",g.width),v.attr("height",g.height)}return a?o.attr("transform","translate("+-g.width/2+", "+-g.height/2+")"):o.attr("transform","translate(0, "+-g.height/2+")"),t.centerLabel&&o.attr("transform","translate("+-g.width/2+", "+-g.height/2+")"),o.insert("rect",":first-child"),{shapeSvg:s,bbox:g,halfPadding:x,label:o}},"labelHelper"),f=h((l,t)=>{const n=t.node().getBBox();l.width=n.width,l.height=n.height},"updateNodeBounds");function I(l,t,n,r){return l.insert("polygon",":first-child").attr("points",r.map(function(i){return i.x+","+i.y}).join(" ")).attr("class","label-container").attr("transform","translate("+-t/2+","+n/2+")")}h(I,"insertPolygonShape");var dt=h(l=>{const t=new Set;for(const n of l)switch(n){case"x":t.add("right"),t.add("left");break;case"y":t.add("up"),t.add("down");break;default:t.add(n);break}return t},"expandAndDeduplicateDirections"),ht=h((l,t,n)=>{const r=dt(l),i=2,e=t.height+2*n.padding,a=e/i,s=t.width+2*a+n.padding,o=n.padding/2;return r.has("right")&&r.has("left")&&r.has("up")&&r.has("down")?[{x:0,y:0},{x:a,y:0},{x:s/2,y:2*o},{x:s-a,y:0},{x:s,y:0},{x:s,y:-e/3},{x:s+2*o,y:-e/2},{x:s,y:-2*e/3},{x:s,y:-e},{x:s-a,y:-e},{x:s/2,y:-e-2*o},{x:a,y:-e},{x:0,y:-e},{x:0,y:-2*e/3},{x:-2*o,y:-e/2},{x:0,y:-e/3}]:r.has("right")&&r.has("left")&&r.has("up")?[{x:a,y:0},{x:s-a,y:0},{x:s,y:-e/2},{x:s-a,y:-e},{x:a,y:-e},{x:0,y:-e/2}]:r.has("right")&&r.has("left")&&r.has("down")?[{x:0,y:0},{x:a,y:-e},{x:s-a,y:-e},{x:s,y:0}]:r.has("right")&&r.has("up")&&r.has("down")?[{x:0,y:0},{x:s,y:-a},{x:s,y:-e+a},{x:0,y:-e}]:r.has("left")&&r.has("up")&&r.has("down")?[{x:s,y:0},{x:0,y:-a},{x:0,y:-e+a},{x:s,y:-e}]:r.has("right")&&r.has("left")?[{x:a,y:0},{x:a,y:-o},{x:s-a,y:-o},{x:s-a,y:0},{x:s,y:-e/2},{x:s-a,y:-e},{x:s-a,y:-e+o},{x:a,y:-e+o},{x:a,y:-e},{x:0,y:-e/2}]:r.has("up")&&r.has("down")?[{x:s/2,y:0},{x:0,y:-o},{x:a,y:-o},{x:a,y:-e+o},{x:0,y:-e+o},{x:s/2,y:-e},{x:s,y:-e+o},{x:s-a,y:-e+o},{x:s-a,y:-o},{x:s,y:-o}]:r.has("right")&&r.has("up")?[{x:0,y:0},{x:s,y:-a},{x:0,y:-e}]:r.has("right")&&r.has("down")?[{x:0,y:0},{x:s,y:0},{x:0,y:-e}]:r.has("left")&&r.has("up")?[{x:s,y:0},{x:0,y:-a},{x:s,y:-e}]:r.has("left")&&r.has("down")?[{x:s,y:0},{x:0,y:0},{x:s,y:-e}]:r.has("right")?[{x:a,y:-o},{x:a,y:-o},{x:s-a,y:-o},{x:s-a,y:0},{x:s,y:-e/2},{x:s-a,y:-e},{x:s-a,y:-e+o},{x:a,y:-e+o},{x:a,y:-e+o}]:r.has("left")?[{x:a,y:0},{x:a,y:-o},{x:s-a,y:-o},{x:s-a,y:-e+o},{x:a,y:-e+o},{x:a,y:-e},{x:0,y:-e/2}]:r.has("up")?[{x:a,y:-o},{x:a,y:-e+o},{x:0,y:-e+o},{x:s/2,y:-e},{x:s,y:-e+o},{x:s-a,y:-e+o},{x:s-a,y:-o}]:r.has("down")?[{x:s/2,y:0},{x:0,y:-o},{x:a,y:-o},{x:a,y:-e+o},{x:s-a,y:-e+o},{x:s-a,y:-o},{x:s,y:-o}]:[{x:0,y:0}]},"getArrowPoints");function Z(l,t){return l.intersect(t)}h(Z,"intersectNode");var ct=Z;function tt(l,t,n,r){var i=l.x,e=l.y,a=i-r.x,s=e-r.y,o=Math.sqrt(t*t*s*s+n*n*a*a),c=Math.abs(t*n*a/o);r.x<i&&(c=-c);var d=Math.abs(t*n*s/o);return r.y<e&&(d=-d),{x:i+c,y:e+d}}h(tt,"intersectEllipse");var et=tt;function at(l,t,n){return et(l,t,t,n)}h(at,"intersectCircle");var yt=at;function rt(l,t,n,r){var i,e,a,s,o,c,d,y,g,x,p,v,w,k,S;if(i=t.y-l.y,a=l.x-t.x,o=t.x*l.y-l.x*t.y,g=i*n.x+a*n.y+o,x=i*r.x+a*r.y+o,!(g!==0&&x!==0&&U(g,x))&&(e=r.y-n.y,s=n.x-r.x,c=r.x*n.y-n.x*r.y,d=e*l.x+s*l.y+c,y=e*t.x+s*t.y+c,!(d!==0&&y!==0&&U(d,y))&&(p=i*s-e*a,p!==0)))return v=Math.abs(p/2),w=a*c-s*o,k=w<0?(w-v)/p:(w+v)/p,w=e*o-i*c,S=w<0?(w-v)/p:(w+v)/p,{x:k,y:S}}h(rt,"intersectLine");function U(l,t){return l*t>0}h(U,"sameSign");var xt=rt,gt=it;function it(l,t,n){var r=l.x,i=l.y,e=[],a=Number.POSITIVE_INFINITY,s=Number.POSITIVE_INFINITY;typeof t.forEach=="function"?t.forEach(function(p){a=Math.min(a,p.x),s=Math.min(s,p.y)}):(a=Math.min(a,t.x),s=Math.min(s,t.y));for(var o=r-l.width/2-a,c=i-l.height/2-s,d=0;d<t.length;d++){var y=t[d],g=t[d<t.length-1?d+1:0],x=xt(l,n,{x:o+y.x,y:c+y.y},{x:o+g.x,y:c+g.y});x&&e.push(x)}return e.length?(e.length>1&&e.sort(function(p,v){var w=p.x-n.x,k=p.y-n.y,S=Math.sqrt(w*w+k*k),M=v.x-n.x,_=v.y-n.y,R=Math.sqrt(M*M+_*_);return S<R?-1:S===R?0:1}),e[0]):l}h(it,"intersectPolygon");var pt=h((l,t)=>{var n=l.x,r=l.y,i=t.x-n,e=t.y-r,a=l.width/2,s=l.height/2,o,c;return Math.abs(e)*a>Math.abs(i)*s?(e<0&&(s=-s),o=e===0?0:s*i/e,c=s):(i<0&&(a=-a),o=a,c=i===0?0:a*e/i),{x:n+o,y:r+c}},"intersectRect"),wt=pt,u={node:ct,circle:yt,ellipse:et,polygon:gt,rect:wt},ut=h(async(l,t)=>{t.useHtmlLabels||N().flowchart.htmlLabels||(t.centerLabel=!0);const{shapeSvg:n,bbox:r,halfPadding:i}=await L(l,t,"node "+t.classes,!0);C.info("Classes = ",t.classes);const e=n.insert("rect",":first-child");return e.attr("rx",t.rx).attr("ry",t.ry).attr("x",-r.width/2-i).attr("y",-r.height/2-i).attr("width",r.width+t.padding).attr("height",r.height+t.padding),f(t,e),t.intersect=function(a){return u.rect(t,a)},n},"note"),ft=ut,Y=h(l=>l?" "+l:"","formatClass"),E=h((l,t)=>"".concat(t||"node default").concat(Y(l.classes)," ").concat(Y(l.class)),"getClassesFromNode"),J=h(async(l,t)=>{const{shapeSvg:n,bbox:r}=await L(l,t,E(t,void 0),!0),i=r.width+t.padding,e=r.height+t.padding,a=i+e,s=[{x:a/2,y:0},{x:a,y:-a/2},{x:a/2,y:-a},{x:0,y:-a/2}];C.info("Question main (Circle)");const o=I(n,a,a,s);return o.attr("style",t.style),f(t,o),t.intersect=function(c){return C.warn("Intersect called"),u.polygon(t,s,c)},n},"question"),bt=h((l,t)=>{const n=l.insert("g").attr("class","node default").attr("id",t.domId||t.id),r=28,i=[{x:0,y:r/2},{x:r/2,y:0},{x:0,y:-r/2},{x:-r/2,y:0}];return n.insert("polygon",":first-child").attr("points",i.map(function(e){return e.x+","+e.y}).join(" ")).attr("class","state-start").attr("r",7).attr("width",28).attr("height",28),t.width=28,t.height=28,t.intersect=function(e){return u.circle(t,14,e)},n},"choice"),mt=h(async(l,t)=>{const{shapeSvg:n,bbox:r}=await L(l,t,E(t,void 0),!0),i=4,e=r.height+t.padding,a=e/i,s=r.width+2*a+t.padding,o=[{x:a,y:0},{x:s-a,y:0},{x:s,y:-e/2},{x:s-a,y:-e},{x:a,y:-e},{x:0,y:-e/2}],c=I(n,s,e,o);return c.attr("style",t.style),f(t,c),t.intersect=function(d){return u.polygon(t,o,d)},n},"hexagon"),vt=h(async(l,t)=>{const{shapeSvg:n,bbox:r}=await L(l,t,void 0,!0),i=2,e=r.height+2*t.padding,a=e/i,s=r.width+2*a+t.padding,o=ht(t.directions,r,t),c=I(n,s,e,o);return c.attr("style",t.style),f(t,c),t.intersect=function(d){return u.polygon(t,o,d)},n},"block_arrow"),St=h(async(l,t)=>{const{shapeSvg:n,bbox:r}=await L(l,t,E(t,void 0),!0),i=r.width+t.padding,e=r.height+t.padding,a=[{x:-e/2,y:0},{x:i,y:0},{x:i,y:-e},{x:-e/2,y:-e},{x:0,y:-e/2}];return I(n,i,e,a).attr("style",t.style),t.width=i+e,t.height=e,t.intersect=function(s){return u.polygon(t,a,s)},n},"rect_left_inv_arrow"),Ct=h(async(l,t)=>{const{shapeSvg:n,bbox:r}=await L(l,t,E(t),!0),i=r.width+t.padding,e=r.height+t.padding,a=[{x:-2*e/6,y:0},{x:i-e/6,y:0},{x:i+2*e/6,y:-e},{x:e/6,y:-e}],s=I(n,i,e,a);return s.attr("style",t.style),f(t,s),t.intersect=function(o){return u.polygon(t,a,o)},n},"lean_right"),Lt=h(async(l,t)=>{const{shapeSvg:n,bbox:r}=await L(l,t,E(t,void 0),!0),i=r.width+t.padding,e=r.height+t.padding,a=[{x:2*e/6,y:0},{x:i+e/6,y:0},{x:i-2*e/6,y:-e},{x:-e/6,y:-e}],s=I(n,i,e,a);return s.attr("style",t.style),f(t,s),t.intersect=function(o){return u.polygon(t,a,o)},n},"lean_left"),_t=h(async(l,t)=>{const{shapeSvg:n,bbox:r}=await L(l,t,E(t,void 0),!0),i=r.width+t.padding,e=r.height+t.padding,a=[{x:-2*e/6,y:0},{x:i+2*e/6,y:0},{x:i-e/6,y:-e},{x:e/6,y:-e}],s=I(n,i,e,a);return s.attr("style",t.style),f(t,s),t.intersect=function(o){return u.polygon(t,a,o)},n},"trapezoid"),kt=h(async(l,t)=>{const{shapeSvg:n,bbox:r}=await L(l,t,E(t,void 0),!0),i=r.width+t.padding,e=r.height+t.padding,a=[{x:e/6,y:0},{x:i-e/6,y:0},{x:i+2*e/6,y:-e},{x:-2*e/6,y:-e}],s=I(n,i,e,a);return s.attr("style",t.style),f(t,s),t.intersect=function(o){return u.polygon(t,a,o)},n},"inv_trapezoid"),Bt=h(async(l,t)=>{const{shapeSvg:n,bbox:r}=await L(l,t,E(t,void 0),!0),i=r.width+t.padding,e=r.height+t.padding,a=[{x:0,y:0},{x:i+e/2,y:0},{x:i,y:-e/2},{x:i+e/2,y:-e},{x:0,y:-e}],s=I(n,i,e,a);return s.attr("style",t.style),f(t,s),t.intersect=function(o){return u.polygon(t,a,o)},n},"rect_right_inv_arrow"),Tt=h(async(l,t)=>{const{shapeSvg:n,bbox:r}=await L(l,t,E(t,void 0),!0),i=r.width+t.padding,e=i/2,a=e/(2.5+i/50),s=r.height+a+t.padding,o="M 0,"+a+" a "+e+","+a+" 0,0,0 "+i+" 0 a "+e+","+a+" 0,0,0 "+-i+" 0 l 0,"+s+" a "+e+","+a+" 0,0,0 "+i+" 0 l 0,"+-s,c=n.attr("label-offset-y",a).insert("path",":first-child").attr("style",t.style).attr("d",o).attr("transform","translate("+-i/2+","+-(s/2+a)+")");return f(t,c),t.intersect=function(d){const y=u.rect(t,d),g=y.x-t.x;if(e!=0&&(Math.abs(g)<t.width/2||Math.abs(g)==t.width/2&&Math.abs(y.y-t.y)>t.height/2-a)){let x=a*a*(1-g*g/(e*e));x!=0&&(x=Math.sqrt(x)),x=a-x,d.y-t.y>0&&(x=-x),y.y+=x}return y},n},"cylinder"),Dt=h(async(l,t)=>{const{shapeSvg:n,bbox:r,halfPadding:i}=await L(l,t,"node "+t.classes+" "+t.class,!0),e=n.insert("rect",":first-child"),a=t.positioned?t.width:r.width+t.padding,s=t.positioned?t.height:r.height+t.padding,o=t.positioned?-a/2:-r.width/2-i,c=t.positioned?-s/2:-r.height/2-i;if(e.attr("class","basic label-container").attr("style",t.style).attr("rx",t.rx).attr("ry",t.ry).attr("x",o).attr("y",c).attr("width",a).attr("height",s),t.props){const d=new Set(Object.keys(t.props));t.props.borders&&(q(e,t.props.borders,a,s),d.delete("borders")),d.forEach(y=>{C.warn("Unknown node property ".concat(y))})}return f(t,e),t.intersect=function(d){return u.rect(t,d)},n},"rect"),Nt=h(async(l,t)=>{const{shapeSvg:n,bbox:r,halfPadding:i}=await L(l,t,"node "+t.classes,!0),e=n.insert("rect",":first-child"),a=t.positioned?t.width:r.width+t.padding,s=t.positioned?t.height:r.height+t.padding,o=t.positioned?-a/2:-r.width/2-i,c=t.positioned?-s/2:-r.height/2-i;if(e.attr("class","basic cluster composite label-container").attr("style",t.style).attr("rx",t.rx).attr("ry",t.ry).attr("x",o).attr("y",c).attr("width",a).attr("height",s),t.props){const d=new Set(Object.keys(t.props));t.props.borders&&(q(e,t.props.borders,a,s),d.delete("borders")),d.forEach(y=>{C.warn("Unknown node property ".concat(y))})}return f(t,e),t.intersect=function(d){return u.rect(t,d)},n},"composite"),Et=h(async(l,t)=>{const{shapeSvg:n}=await L(l,t,"label",!0);C.trace("Classes = ",t.class);const r=n.insert("rect",":first-child"),i=0,e=0;if(r.attr("width",i).attr("height",e),n.attr("class","label edgeLabel"),t.props){const a=new Set(Object.keys(t.props));t.props.borders&&(q(r,t.props.borders,i,e),a.delete("borders")),a.forEach(s=>{C.warn("Unknown node property ".concat(s))})}return f(t,r),t.intersect=function(a){return u.rect(t,a)},n},"labelRect");function q(l,t,n,r){const i=[],e=h(s=>{i.push(s,0)},"addBorder"),a=h(s=>{i.push(0,s)},"skipBorder");t.includes("t")?(C.debug("add top border"),e(n)):a(n),t.includes("r")?(C.debug("add right border"),e(r)):a(r),t.includes("b")?(C.debug("add bottom border"),e(n)):a(n),t.includes("l")?(C.debug("add left border"),e(r)):a(r),l.attr("stroke-dasharray",i.join(" "))}h(q,"applyNodePropertyBorders");var It=h((l,t)=>{let n;t.classes?n="node "+t.classes:n="node default";const r=l.insert("g").attr("class",n).attr("id",t.domId||t.id),i=r.insert("rect",":first-child"),e=r.insert("line"),a=r.insert("g").attr("class","label"),s=t.labelText.flat?t.labelText.flat():t.labelText;let o="";typeof s=="object"?o=s[0]:o=s,C.info("Label text abc79",o,s,typeof s=="object");const c=a.node().appendChild(A(o,t.labelStyle,!0,!0));let d={width:0,height:0};if(j(N().flowchart.htmlLabels)){const v=c.children[0],w=B(c);d=v.getBoundingClientRect(),w.attr("width",d.width),w.attr("height",d.height)}C.info("Text 2",s);const y=s.slice(1,s.length);let g=c.getBBox();const x=a.node().appendChild(A(y.join?y.join("<br/>"):y,t.labelStyle,!0,!0));if(j(N().flowchart.htmlLabels)){const v=x.children[0],w=B(x);d=v.getBoundingClientRect(),w.attr("width",d.width),w.attr("height",d.height)}const p=t.padding/2;return B(x).attr("transform","translate( "+(d.width>g.width?0:(g.width-d.width)/2)+", "+(g.height+p+5)+")"),B(c).attr("transform","translate( "+(d.width<g.width?0:-(g.width-d.width)/2)+", 0)"),d=a.node().getBBox(),a.attr("transform","translate("+-d.width/2+", "+(-d.height/2-p+3)+")"),i.attr("class","outer title-state").attr("x",-d.width/2-p).attr("y",-d.height/2-p).attr("width",d.width+t.padding).attr("height",d.height+t.padding),e.attr("class","divider").attr("x1",-d.width/2-p).attr("x2",d.width/2+p).attr("y1",-d.height/2-p+g.height+p).attr("y2",-d.height/2-p+g.height+p),f(t,i),t.intersect=function(v){return u.rect(t,v)},r},"rectWithTitle"),Mt=h(async(l,t)=>{const{shapeSvg:n,bbox:r}=await L(l,t,E(t,void 0),!0),i=r.height+t.padding,e=r.width+i/4+t.padding,a=n.insert("rect",":first-child").attr("style",t.style).attr("rx",i/2).attr("ry",i/2).attr("x",-e/2).attr("y",-i/2).attr("width",e).attr("height",i);return f(t,a),t.intersect=function(s){return u.rect(t,s)},n},"stadium"),Pt=h(async(l,t)=>{const{shapeSvg:n,bbox:r,halfPadding:i}=await L(l,t,E(t,void 0),!0),e=n.insert("circle",":first-child");return e.attr("style",t.style).attr("rx",t.rx).attr("ry",t.ry).attr("r",r.width/2+i).attr("width",r.width+t.padding).attr("height",r.height+t.padding),C.info("Circle main"),f(t,e),t.intersect=function(a){return C.info("Circle intersect",t,r.width/2+i,a),u.circle(t,r.width/2+i,a)},n},"circle"),jt=h(async(l,t)=>{const{shapeSvg:n,bbox:r,halfPadding:i}=await L(l,t,E(t,void 0),!0),e=5,a=n.insert("g",":first-child"),s=a.insert("circle"),o=a.insert("circle");return a.attr("class",t.class),s.attr("style",t.style).attr("rx",t.rx).attr("ry",t.ry).attr("r",r.width/2+i+e).attr("width",r.width+t.padding+e*2).attr("height",r.height+t.padding+e*2),o.attr("style",t.style).attr("rx",t.rx).attr("ry",t.ry).attr("r",r.width/2+i).attr("width",r.width+t.padding).attr("height",r.height+t.padding),C.info("DoubleCircle main"),f(t,s),t.intersect=function(c){return C.info("DoubleCircle intersect",t,r.width/2+i+e,c),u.circle(t,r.width/2+i+e,c)},n},"doublecircle"),Rt=h(async(l,t)=>{const{shapeSvg:n,bbox:r}=await L(l,t,E(t,void 0),!0),i=r.width+t.padding,e=r.height+t.padding,a=[{x:0,y:0},{x:i,y:0},{x:i,y:-e},{x:0,y:-e},{x:0,y:0},{x:-8,y:0},{x:i+8,y:0},{x:i+8,y:-e},{x:-8,y:-e},{x:-8,y:0}],s=I(n,i,e,a);return s.attr("style",t.style),f(t,s),t.intersect=function(o){return u.polygon(t,a,o)},n},"subroutine"),At=h((l,t)=>{const n=l.insert("g").attr("class","node default").attr("id",t.domId||t.id),r=n.insert("circle",":first-child");return r.attr("class","state-start").attr("r",7).attr("width",14).attr("height",14),f(t,r),t.intersect=function(i){return u.circle(t,7,i)},n},"start"),Q=h((l,t,n)=>{const r=l.insert("g").attr("class","node default").attr("id",t.domId||t.id);let i=70,e=10;n==="LR"&&(i=10,e=70);const a=r.append("rect").attr("x",-1*i/2).attr("y",-1*e/2).attr("width",i).attr("height",e).attr("class","fork-join");return f(t,a),t.height=t.height+t.padding/2,t.width=t.width+t.padding/2,t.intersect=function(s){return u.rect(t,s)},r},"forkJoin"),zt=h((l,t)=>{const n=l.insert("g").attr("class","node default").attr("id",t.domId||t.id),r=n.insert("circle",":first-child"),i=n.insert("circle",":first-child");return i.attr("class","state-start").attr("r",7).attr("width",14).attr("height",14),r.attr("class","state-end").attr("r",5).attr("width",10).attr("height",10),f(t,i),t.intersect=function(e){return u.circle(t,7,e)},n},"end"),$t=h((l,t)=>{var V;const n=t.padding/2,r=4,i=8;let e;t.classes?e="node "+t.classes:e="node default";const a=l.insert("g").attr("class",e).attr("id",t.domId||t.id),s=a.insert("rect",":first-child"),o=a.insert("line"),c=a.insert("line");let d=0,y=r;const g=a.insert("g").attr("class","label");let x=0;const p=(V=t.classData.annotations)==null?void 0:V[0],v=t.classData.annotations[0]?"«"+t.classData.annotations[0]+"»":"",w=g.node().appendChild(A(v,t.labelStyle,!0,!0));let k=w.getBBox();if(j(N().flowchart.htmlLabels)){const b=w.children[0],m=B(w);k=b.getBoundingClientRect(),m.attr("width",k.width),m.attr("height",k.height)}t.classData.annotations[0]&&(y+=k.height+r,d+=k.width);let S=t.classData.label;t.classData.type!==void 0&&t.classData.type!==""&&(N().flowchart.htmlLabels?S+="&lt;"+t.classData.type+"&gt;":S+="<"+t.classData.type+">");const M=g.node().appendChild(A(S,t.labelStyle,!0,!0));B(M).attr("class","classTitle");let _=M.getBBox();if(j(N().flowchart.htmlLabels)){const b=M.children[0],m=B(M);_=b.getBoundingClientRect(),m.attr("width",_.width),m.attr("height",_.height)}y+=_.height+r,_.width>d&&(d=_.width);const R=[];t.classData.members.forEach(b=>{const m=b.getDisplayDetails();let T=m.displayText;N().flowchart.htmlLabels&&(T=T.replace(/</g,"&lt;").replace(/>/g,"&gt;"));const P=g.node().appendChild(A(T,m.cssStyle?m.cssStyle:t.labelStyle,!0,!0));let D=P.getBBox();if(j(N().flowchart.htmlLabels)){const H=P.children[0],O=B(P);D=H.getBoundingClientRect(),O.attr("width",D.width),O.attr("height",D.height)}D.width>d&&(d=D.width),y+=D.height+r,R.push(P)}),y+=i;const $=[];if(t.classData.methods.forEach(b=>{const m=b.getDisplayDetails();let T=m.displayText;N().flowchart.htmlLabels&&(T=T.replace(/</g,"&lt;").replace(/>/g,"&gt;"));const P=g.node().appendChild(A(T,m.cssStyle?m.cssStyle:t.labelStyle,!0,!0));let D=P.getBBox();if(j(N().flowchart.htmlLabels)){const H=P.children[0],O=B(P);D=H.getBoundingClientRect(),O.attr("width",D.width),O.attr("height",D.height)}D.width>d&&(d=D.width),y+=D.height+r,$.push(P)}),y+=i,p){let b=(d-k.width)/2;B(w).attr("transform","translate( "+(-1*d/2+b)+", "+-1*y/2+")"),x=k.height+r}let st=(d-_.width)/2;return B(M).attr("transform","translate( "+(-1*d/2+st)+", "+(-1*y/2+x)+")"),x+=_.height+r,o.attr("class","divider").attr("x1",-d/2-n).attr("x2",d/2+n).attr("y1",-y/2-n+i+x).attr("y2",-y/2-n+i+x),x+=i,R.forEach(b=>{var T;B(b).attr("transform","translate( "+-d/2+", "+(-1*y/2+x+i/2)+")");const m=b==null?void 0:b.getBBox();x+=((T=m==null?void 0:m.height)!=null?T:0)+r}),x+=i,c.attr("class","divider").attr("x1",-d/2-n).attr("x2",d/2+n).attr("y1",-y/2-n+i+x).attr("y2",-y/2-n+i+x),x+=i,$.forEach(b=>{var T;B(b).attr("transform","translate( "+-d/2+", "+(-1*y/2+x)+")");const m=b==null?void 0:b.getBBox();x+=((T=m==null?void 0:m.height)!=null?T:0)+r}),s.attr("style",t.style).attr("class","outer title-state").attr("x",-d/2-n).attr("y",-(y/2)-n).attr("width",d+t.padding).attr("height",y+t.padding),f(t,s),t.intersect=function(b){return u.rect(t,b)},a},"class_box"),G={rhombus:J,composite:Nt,question:J,rect:Dt,labelRect:Et,rectWithTitle:It,choice:bt,circle:Pt,doublecircle:jt,stadium:Mt,hexagon:mt,block_arrow:vt,rect_left_inv_arrow:St,lean_right:Ct,lean_left:Lt,trapezoid:_t,inv_trapezoid:kt,rect_right_inv_arrow:Bt,cylinder:Tt,start:At,end:zt,note:ft,subroutine:Rt,fork:Q,join:Q,class_box:$t},z={},qt=h(async(l,t,n)=>{let r,i;if(t.link){let e;N().securityLevel==="sandbox"?e="_top":t.linkTarget&&(e=t.linkTarget||"_blank"),r=l.insert("svg:a").attr("xlink:href",t.link).attr("target",e),i=await G[t.shape](r,t,n)}else i=await G[t.shape](l,t,n),r=i;return t.tooltip&&i.attr("title",t.tooltip),t.class&&i.attr("class","node default "+t.class),z[t.id]=r,t.haveCallback&&z[t.id].attr("class",z[t.id].attr("class")+" clickable"),r},"insertNode"),Ht=h((l,t)=>{z[t.id]=l},"setNodeElem"),Wt=h(()=>{z={}},"clear"),Ft=h(l=>{const t=z[l.id];C.trace("Transforming node",l.diff,l,"translate("+(l.x-l.width/2-5)+", "+l.width/2+")");const n=8,r=l.diff||0;return l.clusterNode?t.attr("transform","translate("+(l.x+r-l.width/2)+", "+(l.y-l.height/2-n)+")"):t.attr("transform","translate("+l.x+", "+l.y+")"),r},"positionNode");export{A as a,wt as b,Wt as c,qt as i,Ft as p,Ht as s,f as u};