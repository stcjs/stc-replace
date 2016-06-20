# stc-replace

Content replace for stc, Support string & Regular Expression

## Install

```sh
npm install stc-replace
```

## How to use

```
var replace = require('stc-replace');

//string replace
stc.workflow({
  replace: {plugin: replace, include: [/\.(js|css|html)/, {type: 'tpl'}], options: {
    'xxx.com': 'yyy.com'
  }}
})

//regular replace
stc.workflow({
  replace: {plugin: replace, include: [/\.(js|css|html)/, {type: 'tpl'}], options: [
    [/www\.(com|cn)/, 'yyy.com']
  ]}
})
```
