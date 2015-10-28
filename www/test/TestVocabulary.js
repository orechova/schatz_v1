describe("Vocabulary Tests", function(){
	var $scope, $rootScope, Languages, Expressions;

	beforeEach(function () {
		module('Schatz');

		inject(function ($rootScope, $controller, $q, _$timeout_) {
            $scope = $rootScope.$new();
            $timeout = _$timeout_;

            ctrl = $controller(‘AppCtrl’, {
                $scope: $scope
            });

            it(“should have a $scope variable”, function() {
        			expect($scope).toBeDefined();
    				});
        });

	});
});