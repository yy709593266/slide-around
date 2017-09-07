(function(){
    //申请一下:
    // 这里的方法都不考虑兼容性,揍似这么任性(因为我也不熟这些个兼容性,百度搜索吧...)
    var slideleft = document.getElementById('slideLeft');
    var slideRight = document.getElementById('slideRight');
    var contentWrap = document.getElementById('contentWrap');

    //左滑动
    slideleft.addEventListener("click", function(){
        
    });

    //右滑动
    //ele.style.left只能获取内联样式的属性值,对于这种外联的样式没作用
    slideRight.addEventListener("click", function(){
        var left = Number(window.getComputedStyle(contentWrap, null)['left'].split('px')[0]);
        console.log(left);
    });
})()