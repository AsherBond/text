/*! third party licenses: js/vendor.LICENSE.txt */
import{g as w}from"./modulepreload-polyfill-sPpBbGTg.mjs";function v(e,i){for(var t=0;t<i.length;t++){const a=i[t];if(typeof a!="string"&&!Array.isArray(a)){for(const r in a)if(r!=="default"&&!(r in e)){const n=Object.getOwnPropertyDescriptor(a,r);n&&Object.defineProperty(e,r,n.get?n:{enumerable:!0,get:()=>a[r]})}}}return Object.freeze(Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}))}function x(e){const i="a-zA-Z_\\-!.?+*=<>&#'",t="["+i+"]["+i+"0-9/;:]*",a={$pattern:t,built_in:"!= % %= & &= * ** **= *= *map + += , --build-class-- --import-- -= . / // //= /= < << <<= <= = > >= >> >>= @ @= ^ ^= abs accumulate all and any ap-compose ap-dotimes ap-each ap-each-while ap-filter ap-first ap-if ap-last ap-map ap-map-when ap-pipe ap-reduce ap-reject apply as-> ascii assert assoc bin break butlast callable calling-module-name car case cdr chain chr coll? combinations compile compress cond cons cons? continue count curry cut cycle dec def default-method defclass defmacro defmacro-alias defmacro/g! defmain defmethod defmulti defn defn-alias defnc defnr defreader defseq del delattr delete-route dict-comp dir disassemble dispatch-reader-macro distinct divmod do doto drop drop-last drop-while empty? end-sequence eval eval-and-compile eval-when-compile even? every? except exec filter first flatten float? fn fnc fnr for for* format fraction genexpr gensym get getattr global globals group-by hasattr hash hex id identity if if* if-not if-python2 import in inc input instance? integer integer-char? integer? interleave interpose is is-coll is-cons is-empty is-even is-every is-float is-instance is-integer is-integer-char is-iterable is-iterator is-keyword is-neg is-none is-not is-numeric is-odd is-pos is-string is-symbol is-zero isinstance islice issubclass iter iterable? iterate iterator? keyword keyword? lambda last len let lif lif-not list* list-comp locals loop macro-error macroexpand macroexpand-1 macroexpand-all map max merge-with method-decorator min multi-decorator multicombinations name neg? next none? nonlocal not not-in not? nth numeric? oct odd? open or ord partition permutations pos? post-route postwalk pow prewalk print product profile/calls profile/cpu put-route quasiquote quote raise range read read-str recursive-replace reduce remove repeat repeatedly repr require rest round route route-with-methods rwm second seq set-comp setattr setv some sorted string string? sum switch symbol? take take-nth take-while tee try unless unquote unquote-splicing vars walk when while with with* with-decorator with-gensyms xi xor yield yield-from zero? zip zip-longest | |= ~"},r="[-+]?\\d+(\\.\\d+)?",n={begin:t,relevance:0},c={className:"number",begin:r,relevance:0},d=e.inherit(e.QUOTE_STRING_MODE,{illegal:null}),p=e.COMMENT(";","$",{relevance:0}),m={className:"literal",begin:/\b([Tt]rue|[Ff]alse|nil|None)\b/},o={begin:"[\\[\\{]",end:"[\\]\\}]",relevance:0},u={className:"comment",begin:"\\^"+t},f=e.COMMENT("\\^\\{","\\}"),g={className:"symbol",begin:"[:]{1,2}"+t},s={begin:"\\(",end:"\\)"},l={endsWithParent:!0,relevance:0},y={className:"name",relevance:0,keywords:a,begin:t,starts:l},b=[s,d,u,f,p,g,o,c,m,n];return s.contains=[e.COMMENT("comment",""),y,l],l.contains=b,o.contains=b,{name:"Hy",aliases:["hylang"],illegal:/\S/,contains:[e.SHEBANG(),s,d,u,f,p,g,o,c,m]}}var h=x;const N=w(h),O=v({__proto__:null,default:N},[h]);export{h as a,O as h};