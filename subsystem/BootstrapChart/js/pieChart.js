/**
 * Created by Administrator on 2015/2/6.
 */
var data = [
    {
        value: 30,
        color: "#F38630"
    },
    {
        value: 50,
        color: "#E0E4CC"
    },
    {
        value: 100,
        color: "#69D2E7"
    }
];
var options = {
    //Boolean - Whether we should show a stroke on each segment
    segmentShowStroke: true,

    //String - The colour of each segment stroke
    segmentStrokeColor: "#fff",

    //Number - The width of each segment stroke
    segmentStrokeWidth: 2,

    //Boolean - Whether we should animate the chart
    animation: true,

    //Number - Amount of animation steps
    animationSteps: 100,

    //String - Animation easing effect
    animationEasing: "easeOutBounce",

    //Boolean - Whether we animate the rotation of the Pie
    animateRotate: true,

    //Boolean - Whether we animate scaling the Pie from the centre
    animateScale: false,

    //Function - Will fire on animation completion.
    onAnimationComplete: null
};
var ctx = $("#pieChart").get(0).getContext("2d");
new Chart(ctx).Pie(data, options);