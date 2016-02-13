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
]

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
]

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

civicbot.service('imageService',['$q','$http',function($q,$http){
        this.loadImages = function(){
            return $http.jsonp("https://api.flickr.com/services/feeds/photos_public.gne?format=json&jsoncallback=JSON_CALLBACK");
        };
    }])
    .controller('data', ['$scope','imageService','angularGridInstance', function ($scope,imageService,angularGridInstance) {
       imageService.loadImages().then(function(data){
            //$scope.images = data.data.items;

            $scope.images = [
                { url: "static/images/test/test1.jpg", cat: "A", catName: "Cultura" },
                { url: "static/images/test/test2.jpg", cat: "B", catName: "Economia" },
                { url: "static/images/test/test3.jpeg", cat: "C", catName: "Educación" },
                { url: "static/images/test/test4.JPEG", cat: "D", catName: "M. Ambiente" },
                { url: "static/images/test/test5.jpg", cat: "E", catName: "M de Comunicación" },
                { url: "static/images/test/test6.jpg", cat: "F", catName: "Política" },
                { url: "static/images/test/test7.jpg", cat: "G", catName: "Sanidad" },
                { url: "static/images/test/test8.jpg", cat: "H", catName: "Otros" },
                { url: "static/images/test/test9.jpg", cat: "D", catName: "M. Ambiente" },
                { url: "static/images/test/test10.png", cat: "A", catName: "Cultura" },
                { url: "static/images/test/test11.jpg", cat: "B", catName: "Economia" },
                { url: "static/images/test/test12.jpg", cat: "C", catName: "Educación" },
            ];
        });

        $scope.refresh = function(){
            angularGridInstance.gallery.refresh();
        }

        var additional_images = [
            { url: "static/images/test/test1.jpg", cat: "A", catName: "Cultura" },
            { url: "static/images/test/test2.jpg", cat: "B", catName: "Economia" },
            { url: "static/images/test/test3.jpeg", cat: "C", catName: "Educación" },
            { url: "static/images/test/test4.JPEG", cat: "D", catName: "M. Ambiente" },
            { url: "static/images/test/test5.jpg", cat: "E", catName: "M de Comunicación" },
            { url: "static/images/test/test6.jpg", cat: "F", catName: "Política" },
            { url: "static/images/test/test7.jpg", cat: "G", catName: "Sanidad" },
            { url: "static/images/test/test8.jpg", cat: "H", catName: "Otros" },
            { url: "static/images/test/test9.jpg", cat: "D", catName: "M. Ambiente" },
            { url: "static/images/test/test10.png", cat: "A", catName: "Cultura" },
            { url: "static/images/test/test11.jpg", cat: "B", catName: "Economia" },
            { url: "static/images/test/test12.jpg", cat: "C", catName: "Educación" },
        ];

        $scope.loadMore = function () {
            for (var i = 0; i < Object.keys(additional_images).length; i++) {
                $scope.images.push({url: additional_images[i].url, cat: additional_images[i].cat, catName: additional_images[i].catName});
            }
            $scope.$apply();
        }; 
    }]);

/*civicbot.controller("data", function ($scope) {
    $scope.images = [
        { url: "static/images/test/test1.jpg", cat: "A", catName: "Cultura" },
        { url: "static/images/test/test2.jpg", cat: "B", catName: "Economia" },
        { url: "static/images/test/test3.jpeg", cat: "C", catName: "Educación" },
        { url: "static/images/test/test4.JPEG", cat: "D", catName: "M. Ambiente" },
        { url: "static/images/test/test5.jpg", cat: "E", catName: "M de Comunicación" },
        { url: "static/images/test/test6.jpg", cat: "F", catName: "Política" },
        { url: "static/images/test/test7.jpg", cat: "G", catName: "Sanidad" },
        { url: "static/images/test/test8.jpg", cat: "H", catName: "Otros" },
        { url: "static/images/test/test9.jpg", cat: "D", catName: "M. Ambiente" },
        { url: "static/images/test/test10.png", cat: "A", catName: "Cultura" },
        { url: "static/images/test/test11.jpg", cat: "B", catName: "Economia" },
        { url: "static/images/test/test12.jpg", cat: "C", catName: "Educación" },
    ];

    var additional_images = [
        { url: "static/images/test/test1.jpg", cat: "A", catName: "Cultura" },
        { url: "static/images/test/test2.jpg", cat: "B", catName: "Economia" },
        { url: "static/images/test/test3.jpeg", cat: "C", catName: "Educación" },
        { url: "static/images/test/test4.JPEG", cat: "D", catName: "M. Ambiente" },
        { url: "static/images/test/test5.jpg", cat: "E", catName: "M de Comunicación" },
        { url: "static/images/test/test6.jpg", cat: "F", catName: "Política" },
        { url: "static/images/test/test7.jpg", cat: "G", catName: "Sanidad" },
        { url: "static/images/test/test8.jpg", cat: "H", catName: "Otros" },
        { url: "static/images/test/test9.jpg", cat: "D", catName: "M. Ambiente" },
        { url: "static/images/test/test10.png", cat: "A", catName: "Cultura" },
        { url: "static/images/test/test11.jpg", cat: "B", catName: "Economia" },
        { url: "static/images/test/test12.jpg", cat: "C", catName: "Educación" },
    ];

    $scope.addMoreImages = function () {
        for (var i = 0; i < Object.keys(additional_images).length; i++) {
            $scope.images.push({url: additional_images[i].url, cat: additional_images[i].cat, catName: additional_images[i].catName});
        }
        $scope.$apply();
    }; 
});*/