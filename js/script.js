// 定义左右滑动构造函数
function SlideAround(){
    //申一下:
    // 这里的方法都不考虑兼容性,揍似这么任性...
    var slideleft = document.getElementById('slideLeft');
    var slideRight = document.getElementById('slideRight');
    var contentWrap = document.getElementById('contentWrap');
    // 左移动距离
    var slideVal = -900;
    // 克隆首尾元素并插入到内容容器的尾和首部
    var firstContent = document.getElementsByClassName('left-content')[0];
    var lastContent = document.getElementsByClassName('right-content')[0];
    var cloneFirst = firstContent.cloneNode(true);
    var cloneLast = lastContent.cloneNode(true);
    contentWrap.insertBefore(cloneLast, firstContent);
    contentWrap.appendChild(cloneFirst);
    // 子元素个数
    var itemNum = document.getElementsByClassName('content-item').length;
    // 子元素宽度
    var itemWidth = Number(window.getComputedStyle(document.getElementsByClassName('content-item')[0], null)['width'].split('px')[0]);
    contentWrap.style.width = itemNum * itemWidth + "px";

    //左滑动
    slideleft.addEventListener("click", function(){
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
    slideRight.addEventListener("click", function(){
        slideVal -= itemWidth;
        if(slideVal < -(itemWidth * (itemNum - 1))) {
            contentWrap.style.transition = "none";
            contentWrap.style.left = -900 + "px";
            slideVal = -(itemWidth * 2);
        }
        // 需要等到将位置移到第二个元素之后再重新开启transition属性,不设置setTimeout的话后面的transition动画属性会直接覆盖了前面取消动画的操作
        setTimeout(function(){
            contentWrap.style.transition = "left 0.6s";
            contentWrap.style.left = slideVal + 'px';
        }, 20);
    });
}

//echarts图表
// 初始化参数函数
function initOptionStyle(options){
    var optionItem = {
        title: {
            text: options.title,        //标题及其样式
            textStyle: {
                color: '#68A1F5',
                fontSize: 12,
                fontFamily: 'PingFangSC-Regular'
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        grid: {left: '0', top: '30', right: '0', bottom: '30', containLabel: true},         //图表的位置,通过修改top值可以看出效果(top为0时,柱状图的上标会被切掉)
        xAxis: [{
            show: options.isShowXaxis,              //是否显示横坐标刻度
            type: 'category',
            axisTick: {
                alignWithLabel: true, lineStyle: {
                    length: 15, color: "#fff"
                }
            },
            axisLine: {
                alignWithLabel: true, lineStyle: {
                    length: 15, color: "#fff"
                }
            },
            splitLine: {
                show: true, lineStyle: {
                    color: "options.lineColor.slice(1, options.lineColor.length - 1)"       //纵向分隔线
                }
            },
            axisLabel: {rotate: 90, color: ['#D4E2FF']}
        }],
        yAxis: [{
            type: 'value',
            axisTick: {
                show: false
            },
            axisLine: {
                show: false
            },
            axisLabel: {show: false},
            splitLine: {
                show: true, lineStyle: {
                    color: options.lineColor
                }
            }
        }],
        series: [
            {
                name: options.title,
                type: 'bar',                        //柱状图
                barMinHeight: 10,
                barWidth: '28',
                itemStyle: {
                    normal: {
                        barBorderRadius: [4, 4, 0, 0], color: {
                            type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
                            colorStops: [
                                {offset: 0, color: options.barNormalStartColor},
                                {offset: 1, color: options.barNormalEndColor}]
                        }
                    },
                    emphasis: {
                        color: {
                            type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
                            colorStops: [
                                {offset: 0, color: options.barEmphasisStartColor},
                                {offset: 1, color: options.barEmphasisEndColor}]
                        }
                    }
                },
                markPoint: {
                    symbol: 'pin',                  //柱状图上的强调显示,大头针样式
                    symbolSize: [20, 20],
                    label: {
                        normal: {
                            show: false
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: 'rgba(255,29,29,1)'
                        }
                    },
                    data: [
                        {type: 'max'}               //最大值自动添加强调样式
                    ]
                },
                    label: {                        //数值显示
                    normal: {
                        show: true,
                        color: 'rgba(255, 255, 255, 0)',
                        position: 'top'
                    },
                    emphasis: {
                        show: true,
                        color: 'rgba(255, 255, 255, 1)',
                        position: 'top'
                    }
                }
            },
            {
                type: 'line',                       //折线图(和柱状图重复显示)
                symbol: 'none',
                smooth: true,
                lineStyle: {
                    normal: {
                        width: 0
                    }
                },
                areaStyle: {                        //折线图区域面积样式
                    normal: {
                        color: {
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0, color: options.lineNormalStartColor
                            }, {
                                offset: 1, color: options.lineNormalEndColor
                            }]
                        }
                    }
                }
            }
        ]
    }
    return optionItem;
}
// 网格渐变色
var riskLineColors = ['rgba(177,110,20,0.4)', 'rgba(70,144,255,0.1)', 'rgba(70,144,255,0.1)', 'rgba(70,144,255,0.1)', 'rgba(70,144,255,0.1)', 'rgba(70,144,255,0.1)', 'rgba(70,144,255,0.1)', 'rgba(70,144,255,0.1)', 'rgba(70,144,255,0.1)', 'rgba(70,144,255,0.1)', 'rgba(70,144,255,0.1)'];

var riskOption = initOptionStyle(
    {
        title: '高危人群数',
        lineColor: riskLineColors,
        barNormalStartColor: "#B06E13",
        barNormalEndColor: "#B02815",
        barEmphasisStartColor: "#E38D1A",
        barEmphasisEndColor: "#EB2E13",
        lineNormalStartColor: "rgba(226,139,25,0.2)",
        lineNormalEndColor: "rgba(228,57,20,0.2)",
        isShowXaxis: true
    }
);
var riskChart = echarts.init(document.getElementById('centerContent'));
// 模拟数据
var allInfo = {
    "success": true,
    "message": null,
    "data": [
        {
            "name": "铜仁",
            "alarm": "50",
            "risk": "60",
            "people": "80",
            "blacklist": "120",
            "code": "520600",
            "type": "0"
        },
        {
            "name": "碧江",
            "alarm": "20",
            "risk": "40",
            "people": "70",
            "blacklist": "100",
            "code": "520602",
            "type": "1"
        },
        {
            "name": "万山",
            "alarm": "30",
            "risk": "30",
            "people": "70",
            "blacklist": "110",
            "code": "520603",
            "type": "1"
        },
        {
            "name": "江口",
            "alarm": "20",
            "risk": "50",
            "people": "60",
            "blacklist": "100",
            "code": "520621",
            "type": "1"
        },
        {
            "name": "玉屏",
            "alarm": "30",
            "risk": "50",
            "people": "80",
            "blacklist": "90",
            "code": "520622",
            "type": "1"
        },
        {
            "name": "石阡",
            "alarm": "80",
            "risk": "40",
            "people": "60",
            "blacklist": "110",
            "code": "520623",
            "type": "1"
        },
        {
            "name": "思南",
            "alarm": "30",
            "risk": "30",
            "people": "70",
            "blacklist": "120",
            "code": "520624",
            "type": "1"
        },
        {
            "name": "印江",
            "alarm": "30",
            "risk": "70",
            "people": "80",
            "blacklist": "90",
            "code": "520625",
            "type": "1"
        },
        {
            "name": "德江",
            "alarm": "10",
            "risk": "30",
            "people": "100",
            "blacklist": "110",
            "code": "520626",
            "type": "1"
        },
        {
            "name": "沿河",
            "alarm": "20",
            "risk": "50",
            "people": "70",
            "blacklist": "120",
            "code": "520627",
            "type": "1"
        },
        {
            "name": "松桃",
            "alarm": "30",
            "risk": "30",
            "people": "70",
            "blacklist": "140",
            "code": "520628",
            "type": "1"
        }
    ]
};
riskOption.xAxis[0].data = allInfo.data.map(function(u) {
    return u.name;
});
for(var k = 0; k < 2; k++) {
    riskOption.series[k].data = allInfo.data.map(function(w){
        return w.risk
    });
}
riskChart.setOption(riskOption);
// 图表点击事件
// alarmChart.on('click', function(params){
    
// });

new SlideAround();