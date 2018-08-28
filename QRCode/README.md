# Edge 插件开发 简单示例

## Edge浏览器支持载入自己开发的插件，最近需要一个获取当前网页二维码的功能，找了一下如何开发一个简单的Edge插件，记录一下。

## 文件结构

![文件结构](https://images2018.cnblogs.com/blog/886374/201808/886374-20180828161739567-2079406987.png)

### manifest.json

- 配置文件，可以填入一些插件信息。
- permissions 中声明需要调用的权限，此处的 tabs 表明需要获取标签信息
- default_popup 中声明调用的 html 文件，插件功能在这个文件中实现。

### popup.html

``` html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>

<body>
    <script type="text/javascript" src="js/jquery.min.js"></script>
    <script type="text/javascript" src="js/qrcode.js"></script>
    <div id="qrcode"></div>
    <script src="js/GetQRCode.js"></script>
</body>

</html>
```

- 点击插件按钮显示的页面文件。
- 这个地方我用了 qrcodejs，下载见git地址：[qrcodejs](https://github.com/davidshimjs/qrcodejs)
- 主要功能在 GetQRCode.js 文件中实现，我一开始试着直接写在html文件中发现始终没成功，还是写在js文件里实现了。

### GetQRCode.js

``` js
browser.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    browser.tabs.get(tabs[0].id, function (tab) {
        new QRCode(document.getElementById("qrcode"), tab.url);
    });
    root.style.display = "block";
});
```

- js 我不大了解，这个地方主要是调用 js api 获取当前标签页的网址，通过QRCode方法得到生成的二维码。

## 安装插件

- 安装自己开发的插件需要先更改下开发者设计。
- 浏览器输入 `about:config`，勾选启用开发者拓展功能，重启浏览器。

![修改开发者设置]](https://images2018.cnblogs.com/blog/886374/201808/886374-20180828163801824-1222251052.png)

- 点击右上角三个点，点击“拓展”，拉到最下面点击“加载拓展”，选择文件夹。
- 现在拓展就加载到我们的浏览器上了。

![插件显示](https://images2018.cnblogs.com/blog/886374/201808/886374-20180828164042982-200923221.png)

## 打开效果

![插件打开效果](https://images2018.cnblogs.com/blog/886374/201808/886374-20180828164259533-1713897144.png)