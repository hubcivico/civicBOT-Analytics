
var civicbot = angular.module("civicbot", ['angularGrid']);
var API_URL = 'https://prodcivicbot.herokuapp.com/Public/';
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

$(document).ready(function(){
    getTotalActiveUsers();
    getTotalReceivedMsg();
    getTotalReceivedImg();
    getTodayContribNum();

});

function getTotalActiveUsers () {
    setTimeout(function() {
        $.getJSON(API_URL + "gettotalactiveusers", function (data) {
            gente.innerHTML = data.count;
        }, getTotalActiveUsers());
    }, 3000);

}

function getTotalReceivedMsg (){
    setTimeout(function() {
        $.getJSON(API_URL + "gettotalreceivedmsg", function (data) {
            mensajes.innerHTML = data.count;
        }, getTotalReceivedMsg());
    }, 3000);

}

function getTotalReceivedImg (){
    setTimeout(function() {
        $.getJSON(API_URL + "getTotalReceivedImg", function (data) {
            fotos.innerHTML = data.count;
        }, getTotalReceivedImg());
    }, 3000);

}

function getTodayContribNum () {
    setTimeout(function() {
        $.getJSON(API_URL + "gettodaycontribnum", function (data) {
            mensajes_hoy.innerHTML = data.count;
        }, getTodayContribNum());
    }, 3000);

}








$.getJSON(API_URL + "getcontribbycategory", function (data) {
    var cat_data = [];

    for (var i = 0; i < Object.keys(data).length; i++) {
        var currentLetter = String.fromCharCode(65 + i);
        if(data[currentLetter].cat){
            if(data[currentLetter].count >0){
                cat_data.push({
                    value: data[currentLetter].count,
                    color: colors[i].color,
                    highlight: colors[i].hcolor,
                    label: data[currentLetter].cat
                });

            }
        }

    }

    var currentChart = document.getElementById("pie_chart").getContext("2d");
    new Chart(currentChart).Pie(cat_data);
});

$.getJSON(API_URL + "gettopcategorybymonth", function (data) {
    var top_cat_data_month = [];

    for (var i = 0; i < Object.keys(data).length; i++) {
        var currentLetter = String.fromCharCode(65 + i);
        if(data[currentLetter].cat){
            if(data[currentLetter].count >0){
                top_cat_data_month.push({
                    value: data[currentLetter].count,
                    color: colors[i].color,
                    highlight: colors[i].hcolor,
                    label: data[currentLetter].cat
                });

            }
        }

    }

    var currentChart = document.getElementById("polar_chart").getContext("2d");
    new Chart(currentChart).PolarArea(top_cat_data_month);
});

$.getJSON(API_URL + "gettoplocations", function (data) {
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
        if (data[i].location) {
            top_places_data.labels.push(data[i].location.name);
            top_places_data.datasets[0].data.push(data[i].count);
        }

    }

    var currentChart = document.getElementById("radar_chart").getContext("2d");
    new Chart(currentChart).Radar(top_places_data);
});

$.getJSON(API_URL + "gettoplocationsbymonth", function (data) {
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
        if (data[i].location) {
            top_places_data_month.labels.push(data[i].location.name);
            top_places_data_month.datasets[0].data.push(data[i].count);
        }

    }

    var currentChart = document.getElementById("radar_chart4").getContext("2d");
    new Chart(currentChart).Radar(top_places_data_month);
});

$.getJSON(API_URL + "gettopparties", function (data) {
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
        if(data[i].party){
            if(data[i].count>0){
                top_parties_data.labels.push(data[i].party.party);
                top_parties_data.datasets[0].data.push(data[i].count);
            }

        }

    }

    var currentChart = document.getElementById("radar_chart2").getContext("2d");
    new Chart(currentChart).Radar(top_parties_data);
});

$.getJSON(API_URL + "gettoppartiesbymonth", function (data) {
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
        if(data[i].party){
            if(data[i].count>0){
                top_parties_data_month.labels.push(data[i].party.party);
                top_parties_data_month.datasets[0].data.push(data[i].count);
            }
        }

    }

    var currentChart = document.getElementById("radar_chart3").getContext("2d");
    new Chart(currentChart).Radar(top_parties_data_month);
});

$.getJSON(API_URL + "gettopmedia", function (data) {
    var top_media_data = [];

    for (var i = 0; i < Object.keys(data).length; i++) {
        if (data[i].media) {
            if(data[i].count>0){
                top_media_data.push({
                    value: data[i].count,
                    color: colors[i].color,
                    highlight: colors[i].hcolor,
                    label: data[i].media.media
                });

            }

        }
    }

    var currentChart = document.getElementById("donut_chart").getContext("2d");
    new Chart(currentChart).Doughnut(top_media_data);
});

$.getJSON(API_URL + "gettopmediabymonth", function (data) {
    var top_media_data_month = [];

    for (var i = 0; i < Object.keys(data).length; i++) {
        if (data[i].media) {
            if(data[i].count>0){
                top_media_data_month.push({
                    value: data[i].count,
                    color: colors[i].color,
                    highlight: colors[i].hcolor,
                    label: data[i].media.media
                });

            }


        }

    }

    var currentChart = document.getElementById("donut_chart2").getContext("2d");
    new Chart(currentChart).PolarArea(top_media_data_month);
});

$.getJSON(API_URL + "getcontributionlist", function (data) {
    var imageJson = data;
    for (var i = 0; i < imageJson.length; i++) {

        if (imageJson[i].type == 1) {
            var url = "";
            var label = "";
            var party = "";
            var location = "";
            var media = "";

            if (imageJson[i].photo) {
                url = imageJson[i].photo;
            }
            if (imageJson[i].label) {
                label = imageJson[i].label.name;
            }
            if (imageJson[i].party) {
                party = imageJson[i].party.party;
            }
            if (imageJson[i].location) {
                location = imageJson[i].location.name;
            }
            if (imageJson[i].media) {
                media = imageJson[i].media.media;
            }

            $('#imgSlider').append(
                '<figure class="image">' +
                '<img src="' + url + '" alt="' + url + '">' +
                '<figcaption>' +
                '<div class="caption-content">' +
                '<p><b>Categoría: </b> ' + label + '</p>' +
                '<p><b>Partido: </b> ' + party + '</p>' +
                '<p><b>Localidad: </b> ' + location + '</p>' +
                '<p><b>Medio: </b>' + media + '</p>' +
                '<a href="' + url + '" class="single_image">' +
                '<i class="fa fa-search-plus"></i><br>' +
                '</a>' +
                '</div>' +
                '</figcaption>' +
                '</figure>'
            )

        }
    }
}).then(function () {
    $("#imgSlider").owlCarousel({
        items: 4,
        itemsCustom: false,
        itemsDesktop: [1199, 4],
        itemsDesktopSmall: [980, 3],
        itemsTablet: [768, 2],
        itemsTabletSmall: false,
        itemsMobile: [1000, 1],
        singleItem: false,
        itemsScaleUp: false,

        //Basic Speeds
        slideSpeed: 200,
        paginationSpeed: 800,
        rewindSpeed: 1000,

        //Autoplay
        autoPlay: false,
        stopOnHover: true,

        // Navigation
        navigation: false,
        navigationText: ["prev", "next"],
        rewindNav: true,
        scrollPerPage: false,

        //Pagination
        pagination: true,
        paginationNumbers: false,

        // Responsive
        responsive: true,
        responsiveRefreshRate: 200,
        responsiveBaseWidth: window,

        // CSS Styles
        baseClass: "owl-carousel",
        theme: "owl-theme",

        //Lazy load
        lazyLoad: false,
        lazyFollow: true,
        lazyEffect: "fade",

        //Auto height
        autoHeight: false,

        //JSON
        jsonPath: false,
        jsonSuccess: false,

        //Mouse Events
        dragBeforeAnimFinish: true,
        mouseDrag: true,
        touchDrag: true,

        //Transitions
        transitionStyle: false,

        // Other
        addClassActive: false,

        //Callbacks
        beforeUpdate: false,
        afterUpdate: false,
        beforeInit: false,
        afterInit: false,
        beforeMove: false,
        afterMove: false,
        afterAction: false,
        startDragging: false,
        afterLazyLoad: false
    });
});