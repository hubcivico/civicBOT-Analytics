$(document).ready(function () {
    Chart.defaults.global.responsive = true;

    var currentChart = document.getElementById("pie_chart").getContext("2d");
    var PieChart = new Chart(currentChart).Pie(cat_data, {
        legendTemplate : "<% for (var i=0; i<segments.length; i++){%><span style=\"background-color:<%=segments[i].fillColor%>\"><%if(segments[i].label){%><%=segments[i].label%><%}%></span><%}%>"
    });
    document.getElementById("pie_legend").innerHTML = PieChart.generateLegend();

    currentChart = document.getElementById("donut_chart").getContext("2d");
    var DonutChart = new Chart(currentChart).Doughnut(donut_data, {
        legendTemplate : "<% for (var i=0; i<segments.length; i++){%><span style=\"background-color:<%=segments[i].fillColor%>\"><%if(segments[i].label){%><%=segments[i].label%><%}%></span><%}%>"
    });
    document.getElementById("donut_legend").innerHTML = DonutChart.generateLegend();

    currentChart = document.getElementById("radar_chart").getContext("2d");
    var RadarChart = new Chart(currentChart).Radar(radar_data);

    currentChart = document.getElementById("radar_chart2").getContext("2d");
    var RadarChart = new Chart(currentChart).Radar(radar_data);

    currentChart = document.getElementById("polar_chart").getContext("2d");
    var RadarChart = new Chart(currentChart).PolarArea(pie_data);

    currentChart = document.getElementById("polar_chart2").getContext("2d");
    var RadarChart = new Chart(currentChart).PolarArea(pie_data);

    currentChart = document.getElementById("polar_chart3").getContext("2d");
    var RadarChart = new Chart(currentChart).PolarArea(pie_data);

    currentChart = document.getElementById("polar_chart4").getContext("2d");
    var RadarChart = new Chart(currentChart).PolarArea(pie_data);


    setTimeout(function(){
        gente.innerHTML = users.count;
        mensajes.innerHTML = message_count;
        fotos.innerHTML = image_count;
    }, 500);

    window.onscroll = function(ev) {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            angular.element(document.getElementById('images')).scope().loadMore();
        }
    };

    window.onbeforeunload = function () {window.scrollTo(0,0);}
});