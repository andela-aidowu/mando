'use strict';

angular.module('campaign').controller('editCampaignCtrl', ['$scope','backendService', '$location', 'Authentication','$stateParams', function ($scope, backendService, $location, Authentication, $stateParams) {
    $scope.Authentication = Authentication;
     $scope.campaign = {
        _id: $stateParams.campaignid
     };
   
    //route unauhenticated user  to the camapaign view page goes
    if(!$scope.Authentication.user){

    $location.path('/');
    }
    
    backendService.getCampaign($scope.campaign)
        .success(function(data, status){
            $scope.campaign = data;
            $scope.campaign.youtubeUrl =  'https://www.youtube.com/watch?v='+data.youtubeUrl;
        }).error(function(err){
        console.log(err);
    });

    $scope.editCampaign =function(){
        backendService.editCampaign().success(function(data, status){
        $location.path('/campaign/' + data._id);
        }).error(function(err){
        $scope.error = err;
        });
    };

}
]);