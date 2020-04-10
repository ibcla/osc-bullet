# osc-bullet

OSCHINA 2020年愚人节弹幕插件

## 演示

https://oschina.gitee.io/osc-bullet/

![OSCHINA 2020年愚人节弹幕](preview.png)

## 使用方法

引入 `jQuery`, `dist/osc-bullet.min.js`, `dist/osc-bullet.min.css`。

```js
// 添加弹幕
$('body').bullet({
    content: '',        // 内容文字
    avatar: '',         // 头像图片 URL (可选)
    url: '',            // 链接 (可选)
    color: '',          // 字体颜色 (可选)
    bgColor: '',        // 背景颜色 (可选)
    speed: 20,          // 动画时间(秒)
    top: 0,             // 距离顶部位置(默认随机)
    safeTop: 0,         // 顶部安全距离(范围内不显示)
    safeBottom: 0,      // 底部安全距离(范围内不显示)
    hasClose: true,     // 开启关闭按钮
    escapeContent: true // 内容HTML转义(默认开启)
});

// 清空弹幕
$('body').bullet.clear();
```
