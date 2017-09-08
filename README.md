# slide-around
点击左右滑动实现左右无缝隙循环滑动

## 实现原理
左右滑动的原理图如下所示
![原理图](http://ouampsjjo.bkt.clouddn.com/slide-around.jpg)
其中,黑色框为窗口容器,用来显示当前展示的窗口,红色框是内容的容器,通过对内容容器添加相对定位属性并通过设置left值实现左右滑动效果:
<pre><code>
.content-wrap {
    position: relative;
}
</code></pre>

