angular.module("umbraco").controller("ContactNumberController", function ($scope, $routeParams, $http, localizationService) {
	$scope.model.separator = "#";
	console.log($scope.model.config);
	$http.get("backoffice/UmbracoMongoContactNumber/CountryCodeDataApi/GetCountryPhoneCodeDataDictionary").then(function (response) {
		$scope.model.db = JSON.parse(response.data);
		if (!$scope.model.value.CountryCodeAndPhoneCode || !$scope.model.value.ContactNumber) {
			$scope.model.value = {
				CountryCodeAndPhoneCode: $scope.model.value.CountryCodeAndPhoneCode || $scope.model.separator,
				ContactNumber: typeof $scope.model.value === 'object' ? "" : ($scope.model.value || "")
			};
		}

		$scope.inEditState = !!$routeParams.create || !$scope.model.value.CountryCodeAndPhoneCode || !$scope.model.value.ContactNumber;
		var dictionaryPrefix = "ContactNumber";
		var localizeList = [dictionaryPrefix + "_Edit", dictionaryPrefix + "_Delete"];
		$scope.translations = {};
		
		$scope.onEdit = function (reset) {
			if (reset) {
				$scope.model.value = {
					CountryCodeAndPhoneCode: "",
					ContactNumber: ""
				};
			}
			$scope.inEditState = true;
		}

		for (var key in $scope.model.db) {
			if (!$scope.model.db.hasOwnProperty(key)) continue;
			localizeList.push(dictionaryPrefix + "_" + key);
		}
		$scope.model.list = [];

		localizationService.localizeMany(localizeList).then(function (data) {
			for (var i = 0; i < localizeList.length; ++i) {
				$scope.translations[localizeList[i]] = data[i];
			}
			for (var key in $scope.model.db) {
				if (!$scope.model.db.hasOwnProperty(key)) continue;
				$scope.model.db[key].CountryPhoneCodeList.forEach(function (countryPhoneCode, index) {
					var listItem = { ID: key + $scope.model.separator + countryPhoneCode, CountryName: $scope.translations["ContactNumber_" + key], ValidLengths: $scope.model.db[key].ValidLengths };
					$scope.model.list.push(listItem);
				});

			}

		});
	}, function (err) {
		console.error(err);
	});

	

	$scope.$on("formSubmitting", function (ev, args) {
		if (args.action === "save" || args.action === "publish") {
			$scope.inEditState = (!$scope.model.value.CountryCodeAndPhoneCode || !$scope.model.value.ContactNumber);
		}
	});
});


angular.module("umbraco.directives").directive('numbersOnly', function () {
	return {
		require: 'ngModel',
		link: function (scope, element, attr, ngModelCtrl) {
			function fromUser(text) {
				if (text) {
					var transformedInput = text.replace(/[^0-9 ]/g, '');
					if (transformedInput !== text) {
						ngModelCtrl.$setViewValue(transformedInput);
						ngModelCtrl.$render();
					}
					return transformedInput;
				}
				return undefined;
			}
			ngModelCtrl.$parsers.push(fromUser);
		}
	};
});