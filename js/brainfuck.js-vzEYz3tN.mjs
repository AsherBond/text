/*! third party licenses: js/vendor.LICENSE.txt */
import{g as f}from"./modulepreload-polyfill-sPpBbGTg.mjs";import{a as g}from"./brainfuck-NbqkuITC.mjs";function c(t,a){for(var i=0;i<a.length;i++){const e=a[i];if(typeof e!="string"&&!Array.isArray(e)){for(const r in e)if(r!=="default"&&!(r in t)){const n=Object.getOwnPropertyDescriptor(e,r);n&&Object.defineProperty(t,r,n.get?n:{enumerable:!0,get:()=>e[r]})}}}return Object.freeze(Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}))}function o(){o.warned||(o.warned=!0,console.log('Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/brainfuck" instead of "highlight.js/lib/languages/brainfuck.js"'))}o();var s=g;const l=f(s),b=c({__proto__:null,default:l},[s]);export{b};