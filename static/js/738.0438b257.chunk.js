/*! For license information please see 738.0438b257.chunk.js.LICENSE.txt */
"use strict";(self.webpackChunkarterial=self.webpackChunkarterial||[]).push([[738],{738:(e,t,s)=>{s.r(t),s.d(t,{scopeCss:()=>y});const r="-shadowcsshost",n="-shadowcssslotted",o="-shadowcsscontext",c=")(?:\\(((?:\\([^)(]*\\)|[^)(]*)+?)\\))?([^,{]*)",l=new RegExp("("+r+c,"gim"),i=new RegExp("("+o+c,"gim"),a=new RegExp("("+n+c,"gim"),h=r+"-no-combinator",p=/-shadowcsshost-no-combinator([^\s]*)/,g=[/::shadow/g,/::content/g],u=/-shadowcsshost/gim,d=/:host/gim,m=/::slotted/gim,f=/:host-context/gim,$=/\/\*\s*[\s\S]*?\*\//g,x=/\/\*\s*#\s*source(Mapping)?URL=[\s\S]+?\*\//g,_=/(\s*)([^;\{\}]+?)(\s*)((?:{%BLOCK%}?\s*;?)|(?:\s*;))/g,w=/([{}])/g,b=/(^.*?[^\\])??((:+)(.*)|$)/,v="%BLOCK%",S=(e,t)=>{const s=W(e);let r=0;return s.escapedString.replace(_,(function(){const e=arguments.length<=2?void 0:arguments[2];let n="",o=arguments.length<=4?void 0:arguments[4],c="";o&&o.startsWith("{"+v)&&(n=s.blocks[r++],o=o.substring(v.length+1),c="{");const l=t({selector:e,content:n});return`${arguments.length<=1?void 0:arguments[1]}${l.selector}${arguments.length<=3?void 0:arguments[3]}${c}${l.content}${o}`}))},W=e=>{const t=e.split(w),s=[],r=[];let n=0,o=[];for(let c=0;c<t.length;c++){const e=t[c];"}"===e&&n--,n>0?o.push(e):(o.length>0&&(r.push(o.join("")),s.push(v),o=[]),s.push(e)),"{"===e&&n++}o.length>0&&(r.push(o.join("")),s.push(v));return{escapedString:s.join(""),blocks:r}},k=(e,t,s)=>e.replace(t,(function(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];if(t[2]){const e=t[2].split(","),r=[];for(let n=0;n<e.length;n++){const o=e[n].trim();if(!o)break;r.push(s(h,o,t[3]))}return r.join(",")}return h+t[3]})),O=(e,t,s)=>e+t.replace(r,"")+s,j=(e,t,s)=>t.indexOf(r)>-1?O(e,t,s):e+t+s+", "+t+" "+e+s,E=(e,t)=>{const s=(e=>(e=e.replace(/\[/g,"\\[").replace(/\]/g,"\\]"),new RegExp("^("+e+")([>\\s~+[.,{:][\\s\\S]*)?$","m")))(t);return!s.test(e)},R=(e,t)=>e.replace(b,(function(e){return(arguments.length>1&&void 0!==arguments[1]?arguments[1]:"")+t+(arguments.length>3&&void 0!==arguments[3]?arguments[3]:"")+(arguments.length>4&&void 0!==arguments[4]?arguments[4]:"")})),C=(e,t,s)=>{const r="."+(t=t.replace(/\[is=([^\]]*)\]/g,(function(e){return arguments.length<=1?void 0:arguments[1]}))),n=e=>{let n=e.trim();if(!n)return"";if(e.indexOf(h)>-1)n=((e,t,s)=>{if(u.lastIndex=0,u.test(e)){const t=`.${s}`;return e.replace(p,((e,s)=>R(s,t))).replace(u,t+" ")}return t+" "+e})(e,t,s);else{const t=e.replace(u,"");t.length>0&&(n=R(t,r))}return n},o=(e=>{const t=[];let s=0;return{content:(e=e.replace(/(\[[^\]]*\])/g,((e,r)=>{const n=`__ph-${s}__`;return t.push(r),s++,n}))).replace(/(:nth-[-\w]+)(\([^)]+\))/g,((e,r,n)=>{const o=`__ph-${s}__`;return t.push(n),s++,r+o})),placeholders:t}})(e);let c,l="",i=0;const a=/( |>|\+|~(?!=))\s*/g;let g=!((e=o.content).indexOf(h)>-1);for(;null!==(c=a.exec(e));){const t=c[1],s=e.slice(i,c.index).trim();g=g||s.indexOf(h)>-1;l+=`${g?n(s):s} ${t} `,i=a.lastIndex}const d=e.substring(i);return g=g||d.indexOf(h)>-1,l+=g?n(d):d,m=o.placeholders,l.replace(/__ph-(\d+)__/g,((e,t)=>m[+t]));var m},T=(e,t,s,r,n)=>S(e,(e=>{let n=e.selector,o=e.content;"@"!==e.selector[0]?n=((e,t,s,r)=>e.split(",").map((e=>r&&e.indexOf("."+r)>-1?e.trim():E(e,t)?C(e,t,s).trim():e.trim())).join(", "))(e.selector,t,s,r):(e.selector.startsWith("@media")||e.selector.startsWith("@supports")||e.selector.startsWith("@page")||e.selector.startsWith("@document"))&&(o=T(e.content,t,s,r));return{selector:n.replace(/\s{2,}/g," ").trim(),content:o}})),L=(e,t,s,c,p)=>{const u=((e,t)=>{const s="."+t+" > ",r=[];return e=e.replace(a,(function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];if(t[2]){const e=t[2].trim(),n=t[3],o=s+e+n;let c="";for(let s=t[4]-1;s>=0;s--){const e=t[5][s];if("}"===e||","===e)break;c=e+c}const l=c+o,i=`${c.trimRight()}${o.trim()}`;if(l.trim()!==i.trim()){const e=`${i}, ${l}`;r.push({orgSelector:l,updatedSelector:e})}return o}return h+t[3]})),{selectors:r,cssText:e}})(e=(e=>k(e,i,j))(e=(e=>k(e,l,O))(e=e.replace(f,o).replace(d,r).replace(m,n))),c);return e=(e=>g.reduce(((e,t)=>e.replace(t," ")),e))(e=u.cssText),t&&(e=T(e,t,s,c)),{cssText:(e=(e=e.replace(/-shadowcsshost-no-combinator/g,`.${s}`)).replace(/>\s*\*\s+([^{, ]+)/gm," $1 ")).trim(),slottedSelectors:u.selectors}},y=(e,t,s)=>{const r=t+"-h",n=t+"-s",o=e.match(x)||[];e=(e=>e.replace($,""))(e);const c=[];if(s){const t=e=>{const t=`/*!@___${c.length}___*/`,s=`/*!@${e.selector}*/`;return c.push({placeholder:t,comment:s}),e.selector=t+e.selector,e};e=S(e,(e=>"@"!==e.selector[0]?t(e):e.selector.startsWith("@media")||e.selector.startsWith("@supports")||e.selector.startsWith("@page")||e.selector.startsWith("@document")?(e.content=S(e.content,t),e):e))}const l=L(e,t,r,n);return e=[l.cssText,...o].join("\n"),s&&c.forEach((t=>{let{placeholder:s,comment:r}=t;e=e.replace(s,r)})),l.slottedSelectors.forEach((t=>{e=e.replace(t.orgSelector,t.updatedSelector)})),e}}}]);
//# sourceMappingURL=738.0438b257.chunk.js.map