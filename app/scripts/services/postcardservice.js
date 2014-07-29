'use strict';

/**
 * @ngdoc service
 * @name projectPostcardApp.Postcardservice
 * @description
 * # Postcardservice
 * Service in the projectPostcardApp.
 */
angular.module('projectPostcardApp')

    .service('Postcardservice', [
        function () {
            var service = {};

            service.isFlipCard = {
                value: false
            };

            service.rotationAngle = {
                value: 0
            };

            service.scaleFactor = {
                value: 1
            };

            service.isAddTextBlock = {
                value: false
            };

            /**
             * Calculate and set rotation angle based on given deltaAngle.
             * @param {Number} deltaAngle
             */
            service.rotate = function (deltaAngle) {
                var angle = service.rotationAngle.value + deltaAngle;

                if (angle >= 360) {
                    angle = angle - 360;
                }

                service.rotationAngle.value = angle;
            };

            /**
             * alculate and set scale factor based on given deltaScaleFactor.
             * @param {Number} deltaScaleFactor
             */
            service.scale = function (deltaScaleFactor) {
                var scaleFactor = service.scaleFactor.value + deltaScaleFactor;

                if (scaleFactor > 0) {
                    service.scaleFactor.value = scaleFactor;
                }

            };

            return service;
        }
    ]);
