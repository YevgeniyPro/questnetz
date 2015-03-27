var app = angular.module('app', []);

app.controller('surveyCtrl',['$http','$scope', function($http, $scope){
    console.log("Hello from surveyCtrl");

    $scope.survey = {};

    var refresh = function() {
        $http.get('/getsurveys').success(function (response) {
            console.log("got the json data");
            console.log(response);
            $scope.surveys = response;

        });

    };


    refresh();

    $scope.addSurvey = function(){

        $http.post('/getsurveys', $scope.survey).success(function(response){
            console.log("Object inserted : ");
            console.log(response);
            $scope.survey = {};
            refresh();
        });


    }

    $scope.removeSurvey = function(id) {
        console.log(id);

        $http.delete('/getsurveys/'+ id).success(function(response){
            console.log('is removed');
            refresh();
        })

    };
    $scope.editSurvey = function(id) {
        console.log(id);
        $http.get('/getsurveys/' + id).success(function(response) {
            $scope.survey = response;
        })
    }


    //var findIndex = function(array, id) {
    //    for (i=0;i< array.length; i++)
    //        if (array[i]._id == id)return i;
    // }

    $scope.updateSurvey = function() {
        console.log($scope.survey._id);
        $http.put('/getsurveys/' + $scope.survey._id , $scope.survey).success(function(response){
            $scope.survey = {};
            refresh();
        });


    };

    $scope.clearForm = function() {

        $scope.survey = {};
    }
}]);