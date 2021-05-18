# traceback.js

代码回溯。指定一段文本的位置，格式化显示

![预览图](https://tao-1252397519.cos.ap-shanghai.myqcloud.com/github-projects/traceback-js.jpg)

## 使用

安装：

```shell
npm install traceback.js --save
```

可使用的 API 有：`init`、`render`、`renderToString`

### `init`

初始化配置并渲染源文本：

```javascript
import TracebackJS from 'traceback.js';

fetch('sometext.txt')
    .then(res => res.text())
    .then((data) =>
        TracebackJS.init('.traceback-js', { highlightRow: 5 })(data)
    );
```

1. 第一个参数 `selectors` 为 css 选择符
2. 第二个参数 `opts` 为配置对象

`init` 返回了一个渲染函数，可在任意位置调用，参数为源文本。

配置对象 `opts`:

```javascript
// 下面的值均为默认值
{
    highlightRow: 1, // 高亮行
    start: 1, // 起始行号
    displayRows: '-5+5', // 展示规则。可以是 -1|string|object
    separator: '\n', // 分隔符。全部源文本使用它分隔成一行行
}
```

`displayRows` 展示规则：

+ `-1` 展示全部行
+ `'-10+8'` 展示前 10 行、后 8 行
+ `{ upward, downward }` 展示前 upward 行、后 downward 行

### `render`

重用初始化后的内容，根据配置再次渲染：

```javascript
// 上一步已初始化过 .traceback-js 才会生效
TracebackJS.render('.traceback-js', opts);
```

### `renderToString`

返回 html 字符串而不是添加到 dom 中。

```javascript
TracebackJS.renderToString(data, { highlightRow: 4 }); // html 字符串
// '<div class="traceback-js">...</div>'
```

1. 第一个参数 `rawInput` 为源文本
2. 第二个参数 `opts` 为配置对象
