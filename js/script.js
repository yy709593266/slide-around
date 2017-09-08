function SlideAround(){
    //申请一下:
    // 这里的方法都不考虑兼容性,揍似这么任性...
    var slideleft = document.getElementById('slideLeft');
    var slideRight = document.getElementById('slideRight');
    var contentWrap = document.getElementById('contentWrap');
    // 左移动距离
    var slideVal = -900;
    // 克隆首尾元素
    var firstContent = document.getElementsByClassName('left-content')[0];
    var lastContent = document.getElementsByClassName('right-content')[0];
    var cloneFirst = firstContent.cloneNode();
    var cloneLast = lastContent.cloneNode();
    contentWrap.insertBefore(cloneLast, firstContent);
    contentWrap.appendChild(cloneFirst);
    // 子元素个数
    var itemNum = document.getElementsByClassName('content-item').length;
    // 子元素宽度
    var itemWidth = Number(window.getComputedStyle(document.getElementsByClassName('content-item')[0], null)['width'].split('px')[0]);
    // window.getComputedStyle(contentWrap, null)['width'] = (itemWidth * itemNum) + "px";
    contentWrap.style.width = itemNum * itemWidth + "px";

    //左滑动
    slideleft.addEventListener("click", function(){
        // var curLeft = Number(window.getComputedStyle(contentWrap, null)['left'].split('px')[0]);
        slideVal += itemWidth;
        if(slideVal > 0) {
            contentWrap.style.transition = "none";
            contentWrap.style.left = -(itemWidth * (itemNum - 2)) + "px";
            slideVal = -(itemWidth * (itemNum - 3));
        }
        setTimeout(function(){
            contentWrap.style.transition = "left 0.6s";
            contentWrap.style.left = slideVal + 'px';
        }, 20);
    });

    //右滑动
    //ele.style.left只能获取内联样式的属性值,对于外联的样式没作用
    slideRight.addEventListener("click", function(){
        // var curLeft = Number(window.getComputedStyle(contentWrap, null)['left'].split('px')[0]);
        slideVal -= itemWidth;
        if(slideVal < -(itemWidth * (itemNum - 1))) {
            contentWrap.style.transition = "none";
            contentWrap.style.left = -itemWidth + "px";
            slideVal = -(itemWidth * 2);
        }
        // 需要等到将位置移到第二个元素之后再重新开启transition属性,不设置setTimeout的话后面的transition动画属性会直接覆盖了前面取消动画的操作
        setTimeout(function(){
            contentWrap.style.transition = "left 0.6s";
            contentWrap.style.left = slideVal + 'px';
        }, 20);
    });
}

new SlideAround();