(function() {
	'use strict';

	angular.module('reliance').controller('RegistrationController', RegistrationController);

	RegistrationController.$inject = [ '$scope', '$state','HTTPPOSTService', 'dialogs'];

	function RegistrationController($scope, $state, HTTPPOSTService, dialogs) {
		
		var baseURL = 'https://newytl.mybluemix.net/api/v1/';
		var requestURL;
		$scope.regForm={};
		$scope.error='';
		
		$scope.clearDetails = function () {
			$scope.regForm={};
			$state.go('login');
		}

		$scope.submitDetails =function(){
			
			
				$scope.error='';
				var payload = {};
				requestURL = baseURL + 'neUserRegistration';
				payload = $scope.regForm;
				console.log(payload.USERNAME);
				var config = {
					headers : {'Content-type':'application/json'}}
					
				HTTPPOSTService.post(requestURL, payload,config).then(function(response) {
				
					if(response.statusText!='OK'){
						$scope.error=response.data.description;
						dialogs.notify('Registration Failed', $scope.error );
					}				
					else{
						dialogs.notify('Registration Success', 'Registration done successfully');
						$state.go('login');
					}
					$scope.regForm = {};
				}, function(data) {
					$scope.regForm = {};
					dialogs.error('Error', 'An error has occured during registration');
				});
					
					var newdata = {
						deviceId : payload.MO_ID,
						username: payload.USERNAME

					};
					console.log(newdata);

			HTTPPOSTService.post("http://localhost:1000/generic/updatejson" , newdata,config).then(function(response) {

			console.log(response);		

			});

		}
	}
})();