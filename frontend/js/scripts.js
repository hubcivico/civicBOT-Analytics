$(document).ready(function () {
    Chart.defaults.global.responsive = true;

    /*currentChart = document.getElementById("polar_chart").getContext("2d");
    var RadarChart = new Chart(currentChart).PolarArea(pie_data);

    currentChart = document.getElementById("polar_chart2").getContext("2d");
    var RadarChart = new Chart(currentChart).PolarArea(pie_data);

    currentChart = document.getElementById("polar_chart3").getContext("2d");
    var RadarChart = new Chart(currentChart).PolarArea(pie_data);

    currentChart = document.getElementById("polar_chart4").getContext("2d");
    var RadarChart = new Chart(currentChart).PolarArea(pie_data);*/

    window.onscroll = function(ev) {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            angular.element(document.getElementById('images')).scope().loadMore();
        }
    };

    window.onbeforeunload = function () {window.scrollTo(0,0);}
});

$(document).ready(function () {

    /********************************** Waypoints ***********************************/

    $('.wp1').waypoint(function () {
        $('.wp1').addClass('animated fadeInLeft');
    }, {
        offset: '75%'
    });
    $('.wp2').waypoint(function () {
        $('.wp2').addClass('animated fadeInDown');
    }, {
        offset: '75%'
    });
    $('.wp3').waypoint(function () {
        $('.wp3').addClass('animated bounceInDown');
    }, {
        offset: '75%'
    });
    $('.wp4').waypoint(function () {
        $('.wp4').addClass('animated fadeInDown');
    }, {
        offset: '75%'
    });

    /********************************** Flickity ***********************************/

    $('#featuresSlider').flickity({
        cellAlign: 'left',
        contain: true,
        prevNextButtons: false
    });

    $('#showcaseSlider').flickity({
        cellAlign: 'left',
        contain: true,
        prevNextButtons: false,
        imagesLoaded: true
    });

    /********************************** Fancybox ***********************************/

    $(".youtube-media").on("click", function (e) {
        var jWindow = $(window).width();
        if (jWindow <= 768) {
            return;
        }
        $.fancybox({
            href: this.href,
            padding: 4,
            type: "iframe",
            'href': this.href.replace(new RegExp("watch\\?v=", "i"), 'v/'),
        });
        return false;
    });


});

$(document).ready(function () {
    $("a.single_image").fancybox({
        padding: 4,
    });
});

/********************************** Nav Transformicon ***********************************/

/* When user clicks the Icon */
$(".nav-toggle").click(function () {
    $(this).toggleClass("active");
    $(".overlay-dialegs").toggleClass("open");
});

/* When user clicks a link */
$(".overlay ul li a").click(function () {
    $(".nav-toggle").toggleClass("active");
    $(".overlay-dialegs").toggleClass("open");
});

/* When user clicks outside */
$(".overlay").click(function () {
    $(".nav-toggle").toggleClass("active");
    $(".overlay-dialegs").toggleClass("open");
});

/********************************** Smooth Scrolling ***********************************/

$('a[href*=#]:not([href=#])').click(function () {
    if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {

        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
            $('html,body').animate({
                scrollTop: target.offset().top
            }, 2000);
            return false;
        }
    }
});

$(document).ready(function() {
    $('.title').tooltipster({
        animation: 'fade',
        delay: 200,
        theme: 'tooltipster-default',
        touchDevices: false,
        trigger: 'hover'
    });
});