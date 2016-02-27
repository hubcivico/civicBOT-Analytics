var API_URL = "http://devcivicbot.herokuapp.com/Public/";

var civicbot = angular.module("civicbot", ['angularGrid']);

civicbot.controller('data', ['$scope','angularGridInstance', function ($scope, angularGridInstance) {
    $scope.currentImage = 0;
    $scope.totalImage = 0;
    $scope.lastImage = 0;

        $.getJSON(API_URL + "getcontributionlist", function(data) {
            return data;
        }).then(function(data){
            $scope.imageJson = data;
            $scope.totalImage = Object.keys($scope.imageJson).length;
            $scope.currentImage = 8; // Images charged per click

            $scope.images = [];
            for (var i = 0; i < $scope.currentImage; i++) {
                if($scope.imageJson[i].type == 1) {
                    $scope.images.push($scope.imageJson[i]);
                }    
            }

            $scope.$apply()
        });

        $scope.refresh = function(){
            angularGridInstance.gallery.refresh();
        }

    $scope.loadMoreImages = function(){
        $scope.lastImage = $scope.currentImage;
        $scope.currentImage += 8;
        for (var i = $scope.lastImage; i < $scope.currentImage; i++) {
                if($scope.lastImage < $scope.totalImage - 1)
                    if($scope.imageJson[i].type == 1)
                        $scope.images.push($scope.imageJson[i]);
            }
        }

     }]);

function loadMoreImages() {
    var scope = angular.element(
    document.
    getElementById("screenshots")).
    scope();
    scope.$apply(function () {
        scope.loadMoreImages();
    });
}

var colors = [
    {"color": "#659AC9", "hcolor": "#5B90BF"},
    {"color": "#B0CC99", "hcolor": "#A3BE8C"},
    {"color": "#E8A590", "hcolor": "#D08770"},
    {"color": "#BD9FB7", "hcolor": "#B48EAD"},
    {"color": "#B88877", "hcolor": "#AB7967"},
    {"color": "#96B5B4", "hcolor": "#7DADAC"},
    {"color": "#7DE8CF", "hcolor": "#6AD9BF"},
    {"color": "#9FE890", "hcolor": "#8FE87D"}
];

$.getJSON(API_URL + "getcontribbycategory", function(data) { return data; }).then(function(data) {
    var cat_data = [];

    for (var i = 0; i < Object.keys(data).length; i++) {
        var currentLetter = String.fromCharCode(65 + i);
        cat_data.push({
            value: data[currentLetter].count,
            color: colors[i].color,
            highlight: colors[i].hcolor,
            label: data[currentLetter].cat
        });  
    }

    var currentChart = document.getElementById("pie_chart").getContext("2d");
        var PieChart = new Chart(currentChart).Pie(cat_data);
});

$.getJSON(API_URL + "gettopcategorybymonth", function(data) { return data; }).then(function(data) {
    var top_cat_data_month = [];

    for (var i = 0; i < Object.keys(data).length; i++) {
        var currentLetter = String.fromCharCode(65 + i);
        top_cat_data_month.push({
            value: data[currentLetter].count,
            color: colors[i].color,
            highlight: colors[i].hcolor,
            label: data[currentLetter].cat
        });  
    }

    var currentChart = document.getElementById("polar_chart").getContext("2d");
    var RadarChart = new Chart(currentChart).PolarArea(top_cat_data_month);
});

$.getJSON(API_URL + "gettotalactiveusers", function(data) { return data; }).then(function(data) {
    gente.innerHTML = data.count;
});

$.getJSON(API_URL + "getTotalReceivedImg", function(data) { return data; }).then(function(data) {
    fotos.innerHTML = data.count;
});

$.getJSON(API_URL + "gettotalreceivedmsg", function(data) { return data; }).then(function(data) {
    mensajes.innerHTML = data.count;
});

$.getJSON(API_URL + "gettodaycontribnum", function(data) { return data; }).then(function(data) {
    mensajes_hoy.innerHTML = data.count;
});

$.getJSON(API_URL + "gettoplocations", function(data){
    var top_places_data = {
        labels: [],
        datasets: [
            {
                label: "Dataset",
                fillColor: "rgba(220,220,220,0.2)",
                strokeColor: "rgba(220,220,220,1)",
                pointColor: "rgba(220,220,220,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: []
            }
        ]
    };

    for (var i = 0; i < Object.keys(data).length; i++) {
        if(data[i].location){
            top_places_data.labels.push(data[i].location.name);
            top_places_data.datasets[0].data.push(data[i].count);
        }

    }

    var currentChart = document.getElementById("radar_chart").getContext("2d");
    var RadarChart = new Chart(currentChart).Radar(top_places_data);
});

$.getJSON(API_URL + "gettoplocationsbymonth", function(data) { return data; }).then(function(data) {
    var top_places_data_month = {
        labels: [],
        datasets: [
            {
                label: "Dataset",
                fillColor: "rgba(220,220,220,0.2)",
                strokeColor: "rgba(220,220,220,1)",
                pointColor: "rgba(220,220,220,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: []
            }
        ]
    };

    for (var i = 0; i < Object.keys(data).length; i++) {
        if(data[i].location){
            top_places_data_month.labels.push(data[i].location.name);
            top_places_data_month.datasets[0].data.push(data[i].count);
        }

    }

    var currentChart = document.getElementById("radar_chart4").getContext("2d");
    var RadarChart = new Chart(currentChart).Radar(top_places_data_month);
});

$.getJSON(API_URL + "gettopparties", function(data) { return data; }).then(function(data) {
    var top_parties_data = {
        labels: [],
        datasets: [
            {
                label: "Dataset",
                fillColor: "rgba(220,220,220,0.2)",
                strokeColor: "rgba(220,220,220,1)",
                pointColor: "rgba(220,220,220,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: []
            }
        ]
    };

    for (var i = 0; i < Object.keys(data).length; i++) {
        top_parties_data.labels.push(data[i].party.party);
        top_parties_data.datasets[0].data.push(data[i].count);
    }

    var currentChart = document.getElementById("radar_chart2").getContext("2d");
    var RadarChart = new Chart(currentChart).Radar(top_parties_data);
});

$.getJSON(API_URL + "gettoppartiesbymonth", function(data) { return data; }).then(function(data) {
    var top_parties_data_month = {
        labels: [],
        datasets: [
            {
                label: "Dataset",
                fillColor: "rgba(220,220,220,0.2)",
                strokeColor: "rgba(220,220,220,1)",
                pointColor: "rgba(220,220,220,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: []
            }
        ]
    };

    for (var i = 0; i < Object.keys(data).length; i++) {
        top_parties_data_month.labels.push(data[i].party.party);
        top_parties_data_month.datasets[0].data.push(data[i].count);
    }

    var currentChart = document.getElementById("radar_chart3").getContext("2d");
    var RadarChart = new Chart(currentChart).Radar(top_parties_data_month);
});

$.getJSON(API_URL + "gettopmedia", function(data) { return data; }).then(function(data) {
    var top_media_data = [];

    for (var i = 0; i < Object.keys(data).length; i++) {
        if(data[i].media){
            top_media_data.push({
                value: data[i].count,
                color: colors[i].color,
                highlight: colors[i].hcolor,
                label: data[i].media.media
            });
        }
    }

    var currentChart = document.getElementById("donut_chart").getContext("2d");
    var DonutChart = new Chart(currentChart).Doughnut(top_media_data);
});

$.getJSON(API_URL + "gettopmediabymonth", function(data) { return data; }).then(function(data) {
    var top_media_data_month = [];

    for (var i = 0; i < Object.keys(data).length; i++) {
        if(data[i].media){
            top_media_data_month.push({
                value: data[i].count,
                color: colors[i].color,
                highlight: colors[i].hcolor,
                label: data[i].media.media
            });

        }

    }

    var currentChart = document.getElementById("donut_chart2").getContext("2d");
    var DonutChart = new Chart(currentChart).PolarArea(top_media_data_month);
});