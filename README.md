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

## 关键点
这里关键是实现不同内容首尾无缝衔接的轮播:
* 首先clone首尾元素分别衔接在内容的尾首两端
* 当切换到第三张图时,此时继续右滑动应该是clone过来的第一张
* 此时关掉内容容器的transition属性,在动画结束之后将位置重新定位到第一张,同时改变偏移量
* 这时候就相当于又从第一张开始了
* 无缝循环实现
以右滑动为例:
<pre><code>
slideRight.addEventListener("click", function(){
    slideVal -= itemWidth;
    if(slideVal < -(itemWidth * (itemNum - 1))) {
        contentWrap.style.transition = "none";
        contentWrap.style.left = -itemWidth + "px";
        slideVal = -(itemWidth * 2);
    }
    setTimeout(function(){
        contentWrap.style.transition = "left 0.6s";
        contentWrap.style.left = slideVal + 'px';
    }, 20);
});
</code></pre>
其中,slideVal是每次滑动需要偏移的left值,itemWidth是每次移动的距离(即每张图片的宽度), itemNum是总的图片张数(包括已经复制过的内容),contentWrap是内容容器

## 注意
* window窗口出现的内容只有一张图片的内容,溢出的内容需要隐藏,这时候通过设置内容容器的left值才能实现滑动效果
<pre><code>
.window {
    overflow: hidden;
}
</code></pre>
* 如果要求的左右滑动的按钮需要在窗口的外面,那么左右按钮就不能写在window窗口容器中,否则window窗口的``overflow: hidden``会将左右按钮隐藏掉,所以需要在window窗口容器外面再加一个容器``c-box``,左右按钮相对这个容器进行定位
<pre><code>
<div class="c-box">
    <div class="slide-left" id="slideLeft"><i class="icon-L-Carousel"></i></div>
    <div class="window">
        <div class="content-wrap" id="contentWrap">
            <div class="content-item left-content">111111111111</div>
            <div class="content-item center-content">222222222222222</div>
            <div class="content-item right-content">3333333333333333333</div>
        </div>
    </div>
    <div class="slide-right" id="slideRight"><i class="icon-R-carousel"></i></div>
</div>
</code></pre>
* 在关掉transition属性且位置重新定位后,需要重新开启transition属性,此时需要有一个时间的延迟,否则开启transition属性的操作会覆盖关闭transition的操作

