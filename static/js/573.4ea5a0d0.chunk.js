/*! For license information please see 573.4ea5a0d0.chunk.js.LICENSE.txt */
"use strict";(self.webpackChunkarterial=self.webpackChunkarterial||[]).push([[573],{573:(e,t,i)=>{i.r(t),i.d(t,{KEYBOARD_DID_CLOSE:()=>o,KEYBOARD_DID_OPEN:()=>s,copyVisualViewport:()=>D,keyboardDidClose:()=>w,keyboardDidOpen:()=>g,keyboardDidResize:()=>l,resetKeyboardAssist:()=>n,setKeyboardClose:()=>c,setKeyboardOpen:()=>b,startKeyboardAssist:()=>h,trackViewportChanges:()=>y});const s="ionKeyboardDidShow",o="ionKeyboardDidHide";let a={},r={},d=!1;const n=()=>{a={},r={},d=!1},h=e=>{p(e),e.visualViewport&&(r=D(e.visualViewport),e.visualViewport.onresize=()=>{y(e),g()||l(e)?b(e):w(e)&&c(e)})},p=e=>{e.addEventListener("keyboardDidShow",(t=>b(e,t))),e.addEventListener("keyboardDidHide",(()=>c(e)))},b=(e,t)=>{f(e,t),d=!0},c=e=>{u(e),d=!1},g=()=>{const e=(a.height-r.height)*r.scale;return!d&&a.width===r.width&&e>150},l=e=>d&&!w(e),w=e=>d&&r.height===e.innerHeight,f=(e,t)=>{const i=t?t.keyboardHeight:e.innerHeight-r.height,o=new CustomEvent(s,{detail:{keyboardHeight:i}});e.dispatchEvent(o)},u=e=>{const t=new CustomEvent(o);e.dispatchEvent(t)},y=e=>{a=Object.assign({},r),r=D(e.visualViewport)},D=e=>({width:Math.round(e.width),height:Math.round(e.height),offsetTop:e.offsetTop,offsetLeft:e.offsetLeft,pageTop:e.pageTop,pageLeft:e.pageLeft,scale:e.scale})}}]);
//# sourceMappingURL=573.4ea5a0d0.chunk.js.map