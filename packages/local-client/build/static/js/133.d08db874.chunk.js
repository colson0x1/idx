(this["webpackJsonp@colsidx/local-client"]=this["webpackJsonp@colsidx/local-client"]||[]).push([[133],{321:function(e,n){var a;(a=Prism).languages.erb=a.languages.extend("ruby",{}),a.languages.insertBefore("erb","comment",{delimiter:{pattern:/^<%=?|%>$/,alias:"punctuation"}}),a.hooks.add("before-tokenize",(function(e){a.languages["markup-templating"].buildPlaceholders(e,"erb",/<%=?(?:[^\r\n]|[\r\n](?!=begin)|[\r\n]=begin\s(?:[^\r\n]|[\r\n](?!=end))*[\r\n]=end)+?%>/gm)})),a.hooks.add("after-tokenize",(function(e){a.languages["markup-templating"].tokenizePlaceholders(e,"erb")}))}}]);
//# sourceMappingURL=133.d08db874.chunk.js.map