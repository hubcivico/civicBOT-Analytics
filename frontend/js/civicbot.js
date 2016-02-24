var API_URL = "http://devcivicbot.herokuapp.com/Public/";

var pie_data = [
    {
        value: 300,
        color:"#659AC9",
        highlight: "#5B90BF",
        label: "Cultura"
    },
    {
        value: 50,
        color: "#B0CC99",
        highlight: "#A3BE8C",
        label: "Economia"
    },
    {
        value: 100,
        color: "#E8A590",
        highlight: "#D08770",
        label: "Educación"
    },
    {
        value: 100,
        color: "#BD9FB7",
        highlight: "#B48EAD",
        label: "M. Ambiente"
    },
    {
        value: 100,
        color: "#B88877",
        highlight: "#AB7967",
        label: "M de Comunicación"
    },
    {
        value: 100,
        color: "#96B5B4",
        highlight: "#7DADAC",
        label: "Política"
    },
    {
        value: 100,
        color: "#7DE8CF",
        highlight: "#6AD9BF",
        label: "Sanidad"
    },
    {
        value: 100,
        color: "#9FE890",
        highlight: "#8FE87D",
        label: "Otros"
    }
];

var donut_data = [
    {
        value: 300,
        color:"#659AC9",
        highlight: "#5B90BF",
        label: "Television"
    },
    {
        value: 50,
        color: "#B0CC99",
        highlight: "#A3BE8C",
        label: "Periódico"
    },
    {
        value: 100,
        color: "#E8A590",
        highlight: "#D08770",
        label: "Web"
    },
    {
        value: 100,
        color: "#BD9FB7",
        highlight: "#B48EAD",
        label: "Boca a boca"
    }
];

var line_data = {
    labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
    datasets: [
        {
            label: "My First dataset",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: [65, 59, 80, 81, 56, 55, 40, 55, 40, 55, 40, 30]
        },
        {
            label: "My Second dataset",
            fillColor: "rgba(151,187,205,0.2)",
            strokeColor: "rgba(151,187,205,1)",
            pointColor: "rgba(151,187,205,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(151,187,205,1)",
            data: [28, 48, 40, 19, 30, 40, 50, 60, 80, 100, 90, 80]
        }
    ]
};

var radar_data = {
    labels: ["Cultura", "Economía", "Educación", "M. Ambiente", "M. de Com.", "Política", "Sanidad", "Otros"],
    datasets: [
        {
            label: "My First dataset",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: [65, 59, 90, 0, 0, 0, 40, 70]
        },
        {
            label: "My Second dataset",
            fillColor: "rgba(151,187,205,0.2)",
            strokeColor: "rgba(151,187,205,1)",
            pointColor: "rgba(151,187,205,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(151,187,205,1)",
            data: [28, 48, 40, 19, 96, 0, 0, 0]
        }
    ]
};

var civicbot = angular.module("civicbot", ['angularGrid'])

civicbot.controller('data', ['$scope','angularGridInstance', function ($scope, angularGridInstance) {
        $.getJSON(API_URL + "getcontributionlist", function(data) {
            return data;
        }).then(function(data){
            $scope.images = [];
            for (var i = 0; i < Object.keys(data).length; i++) {
                if(data[i].type == 1) {
                    $scope.images.push(data[i]);
                }    
            };

            $scope.$apply()
        });

        $scope.refresh = function(){
            angularGridInstance.gallery.refresh();
        }
     }]);

var colors = [
    {"color": "#659AC9", "hcolor": "#5B90BF"},
    {"color": "#B0CC99", "hcolor": "#A3BE8C"},
    {"color": "#E8A590", "hcolor": "#D08770"},
    {"color": "#BD9FB7", "hcolor": "#B48EAD"},
    {"color": "#B88877", "hcolor": "#AB7967"},
    {"color": "#96B5B4", "hcolor": "#7DADAC"},
    {"color": "#7DE8CF", "hcolor": "#6AD9BF"},
    {"color": "#9FE890", "hcolor": "#8FE87D"},
]

$.getJSON(API_URL + "getcontribbycategory", function(data) { return data; }).then(function(data) {
    var cat_data = [];

    for (var i = 0; i < Object.keys(data).length; i++) {
        currentLetter = String.fromCharCode(65 + i);
        cat_data.push({
            value: data[currentLetter].count,
            color: colors[i].color,
            highlight: colors[i].hcolor,
            label: data[currentLetter].cat
        });  
    };

    var currentChart = document.getElementById("pie_chart").getContext("2d");
        var PieChart = new Chart(currentChart).Pie(cat_data);
});

$.getJSON(API_URL + "gettopcategorybymonth", function(data) { return data; }).then(function(data) {
    var top_cat_data_month = [];

    for (var i = 0; i < Object.keys(data).length; i++) {
        currentLetter = String.fromCharCode(65 + i);
        top_cat_data_month.push({
            value: data[currentLetter].count,
            color: colors[i].color,
            highlight: colors[i].hcolor,
            label: data[currentLetter].cat
        });  
    };

    currentChart = document.getElementById("polar_chart").getContext("2d");
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

$.getJSON(API_URL + "gettoplocations", function(data) { return data; }).then(function(data) {
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
            },
        ]
    };

    for (var i = 0; i < Object.keys(data).length; i++) {
        top_places_data.labels.push(data[i].location.name);
        top_places_data.datasets[0].data.push(data[i].count);
    };

    currentChart = document.getElementById("radar_chart").getContext("2d");
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
            },
        ]
    };

    for (var i = 0; i < Object.keys(data).length; i++) {
        top_places_data_month.labels.push(data[i].location.name);
        top_places_data_month.datasets[0].data.push(data[i].count);
    };

    currentChart = document.getElementById("radar_chart4").getContext("2d");
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
            },
        ]
    };

    for (var i = 0; i < Object.keys(data).length; i++) {
        top_parties_data.labels.push(data[i].party.party);
        top_parties_data.datasets[0].data.push(data[i].count);
    };

    currentChart = document.getElementById("radar_chart2").getContext("2d");
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
            },
        ]
    };

    for (var i = 0; i < Object.keys(data).length; i++) {
        top_parties_data_month.labels.push(data[i].party.party);
        top_parties_data_month.datasets[0].data.push(data[i].count);
    };

    currentChart = document.getElementById("radar_chart3").getContext("2d");
    var RadarChart = new Chart(currentChart).Radar(top_parties_data_month);
});

$.getJSON(API_URL + "gettopmedia", function(data) { return data; }).then(function(data) {
    var top_media_data = [];

    for (var i = 0; i < Object.keys(data).length; i++) {
        top_media_data.push({
            value: data[i].count,
            color: colors[i].color,
            highlight: colors[i].hcolor,
            label: data[i].media.media
        });
    };

    currentChart = document.getElementById("donut_chart").getContext("2d");
    var DonutChart = new Chart(currentChart).Doughnut(top_media_data);
});

$.getJSON(API_URL + "gettopmediabymonth", function(data) { return data; }).then(function(data) {
    var top_media_data_month = [];

    for (var i = 0; i < Object.keys(data).length; i++) {
        top_media_data_month.push({
            value: data[i].count,
            color: colors[i].color,
            highlight: colors[i].hcolor,
            label: data[i].media.media
        });
    };

    currentChart = document.getElementById("donut_chart2").getContext("2d");
    var DonutChart = new Chart(currentChart).PolarArea(top_media_data_month);
});