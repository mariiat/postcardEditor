'use strict';

/**
 * @ngdoc function
 * @name projectPostcardApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the projectPostcardApp
 */
angular
    .module('projectPostcardApp')

    .controller('MainCtrl', function ($scope) {
        $scope.isFace = true;
        $scope.angle = 0;
    })

    .controller('ButtonsCtrl', [
        '$scope',
        'Postcardservice',

        function ($scope, Postcardservice) {

            var rotationAngle = 90,
                scaleFactor = 0.1;

            $scope.zoomIn = function () {
                Postcardservice.scale(scaleFactor);
            };

            $scope.zoomOut = function () {
                Postcardservice.scale(-scaleFactor);
            };

            $scope.rotate = function () {
                Postcardservice.rotate(rotationAngle);
            };

            $scope.flip = function () {
                Postcardservice.isFlipCard.value = !Postcardservice.isFlipCard.value;
            };

            $scope.addTextBlock = function () {
                Postcardservice.isAddTextBlock.value = !Postcardservice.isAddTextBlock.value;
            };

        }
    ])

    .directive('postcard', [
        'Postcardservice',

        function (Postcardservice) {
            return {
                restrict: 'E',
                scope: {
                    isFace: '=',
                    angle: '='
                },
                replace: true,
                templateUrl: 'views/postcard.html',
                link: function ($scope, $element) {
                    var postcardElement = $element[0],

                        /**
                         * Shows posctcard's face or back
                         */
                        flip = function () {
                            $scope.isFace = !$scope.isFace;
                        },

                        /**
                         * Rotate postcard on given angle
                         * @param {Number} angle
                         */
                        rotate = function (angle) {
                            postcardElement.style.transform = 'rotate(' + angle + 'deg)';
                            postcardElement.style.WebkitTransform = 'rotate(' + angle + 'deg)';
                            postcardElement.style.msTransform  = 'rotate(' + angle + 'deg)';
                        },

                        /**
                         * Scale postcard with given scale factor
                         * @param {Number} scaleFactor
                         */
                        scale = function (scaleFactor) {
                            postcardElement.style.transform = 'scale(' + scaleFactor + ', ' + scaleFactor + ') rotate(' + $scope.rotationAngle.value + 'deg)';
                            postcardElement.style.WebkitTransform = 'scale(' + scaleFactor + ', ' + scaleFactor + ') rotate(' + $scope.rotationAngle.value + 'deg)';
                            postcardElement.style.msTransform  = 'scale(' + scaleFactor + ', ' + scaleFactor + ') rotate(' + $scope.rotationAngle.value + 'deg)';
                        },

                        /**
                         * Adds text blocks to face or back of the postcard.
                         */
                        addTextBlock = function () {
                            if ($scope.isFace) {
                                $scope.textBlocksFace.push({});
                            } else {
                                $scope.textBlocksBack.push({});
                            }
                        };


                    // Init Postcard with setted angle
                    if ($scope.angle > 0) {
                        Postcardservice.rotationAngle.value = $scope.angle;
                    }

                    $scope.isFlipCard = Postcardservice.isFlipCard;
                    $scope.rotationAngle = Postcardservice.rotationAngle;
                    $scope.scaleFactor = Postcardservice.scaleFactor;
                    $scope.isAddTextBlock = Postcardservice.isAddTextBlock;

                    $scope.textBlocksFace = [];
                    $scope.textBlocksBack = [];

                    $scope.$watch('isFlipCard.value', function (newValue, oldValue) {
                        if (newValue === oldValue) {
                            return;
                        }

                        flip();
                    });

                    $scope.$watch('rotationAngle.value', function (newValue) {
                        rotate(newValue);
                    });

                    $scope.$watch('scaleFactor.value', function (newValue) {
                        scale(newValue);
                    });

                    $scope.$watch('isAddTextBlock.value', function (newValue, oldValue) {
                        if (newValue === oldValue) {
                            return;
                        }

                        addTextBlock(newValue);
                    });

                }
            };
        }])

    .directive('textBlock', [
        function () {
            return {
                restrict: 'E',
                replace: true,
                templateUrl: 'views/textBlock.html',
                link: function ($scope, $element) {
                    /**
                     * Edit text on text click
                     */
                    $scope.editText = function () {
                        $element.find('.editor').show();
                    };

                    /**
                     * Finish enter text
                     */
                    $scope.saveText = function () {
                        $element.find('.editor').hide();
                    };
                }
            };
        }
    ]);
