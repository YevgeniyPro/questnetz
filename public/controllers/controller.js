var app = angular.module('app', []);

app.controller('AppCtrl',['$http','$scope', function($http, $scope){
    console.log("Hello from ng-controller");

    $scope.contact = {};

    var refresh = function() {
        $http.get('/contacts').success(function (response) {
            console.log("got the json data");
            console.log(response);
            $scope.contacts = response;

        });

    };
/*
    var a = {};
    $http.get('/contacts').success(function (response) {
        console.log("got the json data");
        console.log(response);
        that.contacts = response;
    });*/

    refresh();

    $scope.addContact = function(){

        $http.post('/contacts', $scope.contact).success(function(response){
            console.log("Object inserted : ");
            console.log(response);
            $scope.contact = {};
            refresh();
        });
        //this.contacts.push(this.contact);
        //this.contact = {};

    }

    $scope.removeContact = function(id) {
        console.log(id);

        $http.delete('/contacts/'+ id).success(function(response){
            console.log('is removed');
            refresh();
        })

    };
    $scope.editContact = function(id) {
        console.log(id);
            $http.get('/contacts/' + id).success(function(response) {
                $scope.contact = response;
            })
    }


    //var findIndex = function(array, id) {
    //    for (i=0;i< array.length; i++)
    //        if (array[i]._id == id)return i;
    // }

    $scope.updateContact = function() {
      console.log($scope.contact._id);
        $http.put('/contacts/' + $scope.contact._id , $scope.contact).success(function(response){
            $scope.contact = {};
            refresh();
        });


    };

    $scope.clearForm = function() {

        $scope.contact = {};
    }
}]);

