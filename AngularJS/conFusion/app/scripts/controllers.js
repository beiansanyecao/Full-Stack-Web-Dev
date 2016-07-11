'use strict';

angular.module('confusionApp')

        .controller('MenuController', ['$scope', 'menuFactory', function($scope, menuFactory) {
            
            $scope.tab = 1;
            $scope.filtText = '';
            $scope.showDetails = false;
            
            $scope.showMenu = false;
            $scope.message = "Loading ...";
            menuFactory.getDishes().query(
                function(response) {
                    $scope.dishes = response;
                    $scope.showMenu = true;
                },
                function(response) {
                    $scope.message = "Error: "+response.status + " " + response.statusText;
            });

                        
            $scope.select = function(setTab) {
                $scope.tab = setTab;
                
                if (setTab === 2) {
                    $scope.filtText = "appetizer";
                }
                else if (setTab === 3) {
                    $scope.filtText = "mains";
                }
                else if (setTab === 4) {
                    $scope.filtText = "dessert";
                }
                else {
                    $scope.filtText = "";
                }
            };

            $scope.isSelected = function (checkTab) {
                return ($scope.tab === checkTab);
            };
    
            $scope.toggleDetails = function() {
                $scope.showDetails = !$scope.showDetails;
            };
        }])

        .controller('ContactController', ['$scope', function($scope) {

            $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
            
            var channels = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];
            
            $scope.channels = channels;
            $scope.invalidChannelSelection = false;
                        
        }])

        .controller('FeedbackController', ['$scope', 'feedbackFactory', function($scope,feedbackFactory) {
            
            $scope.sendFeedback = function() {
                
                console.log($scope.feedback);
                $scope.message = "Loading ...";
                
                if ($scope.feedback.agree && ($scope.feedback.mychannel == "")) {
                    $scope.invalidChannelSelection = true;
                    console.log('incorrect');
                }
                else {
                    feedbackFactory.getFeedbacks().save($scope.feedback);
                    
                    $scope.invalidChannelSelection = false;
                    $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
                    $scope.feedback.mychannel="";
                    $scope.feedbackForm.$setPristine();
                    console.log($scope.feedback);
                }
            };
        }])

        .controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function($scope, $stateParams, menuFactory) {

            $scope.showDish = false;
            $scope.message="Loading ...";
                        $scope.dish = menuFactory.getDishes().get({id:parseInt($stateParams.id,10)})
            .$promise.then(
                            function(response){
                                $scope.dish = response;
                                $scope.showDish = true;
                            },
                            function(response) {
                                $scope.message = "Error: "+response.status + " " + response.statusText;
                            }
            );
            
        }])

        .controller('DishCommentController', ['$scope', 'menuFactory', function($scope,menuFactory) {
            
            //Step 1: Create a JavaScript object to hold the comment from the form
             $scope.feedback = {author:"", rating:5, comment:"", date:""};
             console.log($scope.feedback);
            
            $scope.submitComment = function () {
                
                //Step 2: This is how you record the date
                $scope.feedback.date = new Date().toISOString();
                console.log($scope.feedback);
                
                // Step 3: Push your comment into the dish's comment array
                $scope.dish.comments.push($scope.feedback);
                menuFactory.getDishes().update({id:$scope.dish.id},$scope.dish);
                
                //Step 4: reset your form to pristine
                $scope.commentForm.$setPristine();
                
                //Step 5: reset your JavaScript object that holds your comment
                $scope.feedback = {author:"", rating:5, comment:"", date:""};
                
            }
        }])

        // implement the IndexController and About Controller here
        .controller('IndexController', ['$scope', 'menuFactory', 'corporateFactory', function($scope, menuFactory, corporateFactory) {
            $scope.showDish = false;
            $scope.dishmessage="Loading ...";
            $scope.dish = menuFactory.getDishes().get({id:0})
                        .$promise.then(
                            function(response){
                                $scope.dish = response;
                                $scope.showDish = true;
                            },
                            function(response) {
                                $scope.dishmessage = "Error: "+response.status + " " + response.statusText;
                            }
                        );
            
            $scope.showPromo = false;
            $scope.promomessage = "Loading ...";
            $scope.promo = menuFactory.getPromotion().get({id:0})
                        .$promise.then(
                            function(response){
                                $scope.promo = response;
                                $scope.showPromo = true;
                            },
                            function(response) {
                                $scope.promomessage = "Error: "+response.status + " " + response.statusText;
                            }
                        );
            
            $scope.showLeader = false;
            $scope.leadermessage = "Loading ...";
            $scope.chef = corporateFactory.getLeaders().get({id:3})
                        .$promise.then(
                            function(response){
                                $scope.chef = response;
                                $scope.showLeader = true;
                            },
                            function(response) {
                                $scope.leadermessage = "Error: "+response.status + " " + response.statusText;
                            }
            
                        );
            
        }]) 

        .controller('AboutController',['$scope', 'corporateFactory', function($scope, corporateFactory) {
            
            $scope.showLeader = false;
            $scope.leadermessage = "Loading ...";
            corporateFactory.getLeaders().query(
                function(response) {
                    $scope.leaders = response;
                    $scope.showLeader = true;
                },
                function(response) {
                    $scope.leadermessage = "Error: "+response.status + " " + response.statusText;
            });
        }])


;
