(this["webpackJsonp@colsidx/local-client"]=this["webpackJsonp@colsidx/local-client"]||[]).push([[278],{466:function(e,n){!function(e){function n(e,n){return"___"+e.toUpperCase()+n+"___"}Object.defineProperties(e.languages["markup-templating"]={},{buildPlaceholders:{value:function(t,a,o,r){if(t.language===a){var c=t.tokenStack=[];t.code=t.code.replace(o,(function(e){if("function"==typeof r&&!r(e))return e;for(var o,i=c.length;-1!==t.code.indexOf(o=n(a,i));)++i;return c[i]=e,o})),t.grammar=e.languages.markup}}},tokenizePlaceholders:{value:function(t,a){if(t.language===a&&t.tokenStack){t.grammar=e.languages[a];var o=0,r=Object.keys(t.tokenStack);!function c(i){for(var l=0;l<i.length&&!(o>=r.length);l++){var s=i[l];if("string"==typeof s||s.content&&"string"==typeof s.content){var u=r[o],p=t.tokenStack[u],g="string"==typeof s?s:s.content,f=n(a,u),k=g.indexOf(f);if(-1<k){++o;var h=g.substring(0,k),d=new e.Token(a,e.tokenize(p,t.grammar),"language-"+a,p),m=g.substring(k+f.length),v=[];h&&v.push.apply(v,c([h])),v.push(d),m&&v.push.apply(v,c([m])),"string"==typeof s?i.splice.apply(i,[l,1].concat(v)):s.content=v}}else s.content&&c(s.content)}return i}(t.tokens)}}}})}(Prism)}}]);
//# sourceMappingURL=278.b34bd3db.chunk.js.map