$(document).ready(function(){
    var r = Raphael("gpa");
//[[2.5,2.5,2.5,2.5,2.5]],
    r.linechart(10,
                10,
                109,
                109,
                [1,2,3,4,5],
                [10,20,30,40,50],
                {
                    smooth: true,
                    colors: ['#F00'],
                    symbol: 'circle',
                    axis: "0 0 1 1"
                });
});