# Date

日期格式化输出，日期位移


## 使用

```javascript
const date = require('./index');

// 格式化输出2008-09-07日期
date(new Date('2008-08-08'), 'yyyy-MM-dd hh:mm:ss.ms', 'dd:-1,MM:1');
// 输出：2008-09-07 08:00:00.0

// 不指定日期则默认是当前日期
date('yyyy-MM-dd hh:mm:ss.ms', 'dd:-1,MM:1');
// 输出：2018-07-18 16:42:52.43
```

- 第一个参数是一个Date对象，默认是new Date()
- 第二个参数是格式化输出模型，需要有符号分割，不用按照顺序，没有符号要求，默认是yyyy-MM-dd hh:mm:ss
- 第三个参数是日期位移，dd:-1表示前一天，dd:1表示后一天，如果想设置多组请使用“,”分割