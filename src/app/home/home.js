angular.module( 'orderCloud' )

	.config( HomeConfig )
	.controller( 'HomeCtrl', HomeController )

;

function HomeConfig( $stateProvider ) {
	$stateProvider.state( 'home', {
		url: '/home',
		templateUrl:'home/templates/home.tpl.html',
		controller:'HomeCtrl',
		controllerAs: 'home',
		data:{ pageTitle: 'Home' }
	});
}

function HomeController( $state, Credentials, $cookies) {
	var vm = this;
	vm.registerView = true;
	vm.example = 'Example Data';

	if ($cookies.get('OrderCloud.token')) {
		$state.go('catalog');
	}

	vm.authenticate = function() {
		Credentials.Get(vm.credentials)
			.then(function() {
				$state.go('catalog');
			})
			.catch(function() {
				vm.example = 'Wrong username and password';
			})
	};
	/*vm.envOpts = {
	 adminUser: {
	 UserID: '12345',
	 Email: "mlund@four51.com",
	 Username: "testAdmin",
	 Password: "fails345",
	 CompanyName: "Test Company",
	 FirstName: "Four51",
	 LastName: "Admin"
	 },
	 buyer: {
	 ID: '22222',
	 Name: 'Test Buyer 8',
	 Active: true

	 },
	 categories: [
	 {
	 "ID": "parentCat1000",
	 "Name": "First Parent Category",
	 "Description": "This is our first parent test category",
	 "xp": null,
	 "ListOrder": 1,
	 "Active": true
	 },
	 {
	 "ID": "parentCat2000",
	 "Name": "Second Parent Category",
	 "Description": "This is our second parent test category",
	 "xp": null,
	 "ListOrder": 1,
	 "Active": true
	 },
	 {
	 "ID": "cat1000",
	 "Name": "First Category",
	 "Description": "This is our first test category",
	 "xp": null,
	 "ListOrder": 1,
	 "Active": true
	 },
	 {
	 "ID": "cat2000",
	 "Name": "Second Category",
	 "Description": "This is our second test category",
	 "xp": null,
	 "ListOrder": 1,
	 "Active": true
	 },
	 {
	 "ID": "cat3000",
	 "Name": "Third Category",
	 "Description": "This is our third test category",
	 "xp": null,
	 "ListOrder": 1,
	 "Active": true
	 },
	 {
	 "ID": "cat4000",
	 "Name": "Fourth Category",
	 "Description": "This is our fourth test category",
	 "xp": null,
	 "ListOrder": 1,
	 "Active": true
	 }

	 ],
	 users: [
	 {
	 "ID": "user10",
	 "Username": "testuser",
	 "Password": "fails345",
	 "FirstName": "Bob",
	 "LastName": "Johnson",
	 "Email": "test@demo.com",
	 "Phone": "555-555-5555",
	 "TermsAccepted": "0001-01-01T00:00:00+00:00",
	 "Active": true,
	 "xp": null
	 },
	 {
	 "ID": "user20",
	 "Username": "testuser2",
	 "Password": "fails345",
	 "FirstName": "Tom",
	 "LastName": "Johnson",
	 "Email": "test@demo.com",
	 "Phone": "555-555-5555",
	 "TermsAccepted": "0001-01-01T00:00:00+00:00",
	 "Active": true,
	 "xp": null
	 }
	 ],
	 products: [
	 {
	 "ID": "100",
	 "Description": "The First Test Product",
	 "Name": "Test Product 1",
	 "QuantityMultiplier": 1,
	 "ShipWeight": 35,
	 "Active": true,
	 "Type": "Static",
	 "StdOrders": true,
	 "ReplOrders": false,
	 "InventoryEnabled": true,
	 "InventoryNotificationPoint": null,
	 "VariantLevelInventory": false,
	 "xp": null,
	 "ExceedInventory": true,
	 "DisplayInventory": true
	 },
	 {
	 "ID": "200",
	 "Description": "The Second Test Product",
	 "Name": "Test Product 2",
	 "QuantityMultiplier": 1,
	 "ShipWeight": 40,
	 "Active": true,
	 "Type": "Static",
	 "StdOrders": true,
	 "ReplOrders": false,
	 "InventoryEnabled": true,
	 "InventoryNotificationPoint": null,
	 "VariantLevelInventory": false,
	 "xp": null,
	 "ExceedInventory": true,
	 "DisplayInventory": true
	 },
	 {
	 "ID": "300",
	 "Description": "The Third Test Product",
	 "Name": "Test Product 3",
	 "QuantityMultiplier": 1,
	 "ShipWeight": 100,
	 "Active": true,
	 "Type": "Static",
	 "StdOrders": true,
	 "ReplOrders": false,
	 "InventoryEnabled": true,
	 "InventoryNotificationPoint": null,
	 "VariantLevelInventory": false,
	 "xp": null,
	 "ExceedInventory": true,
	 "DisplayInventory": true
	 },
	 {
	 "ID": "400",
	 "Description": "The Fourth Test Product",
	 "Name": "Test Product 4",
	 "QuantityMultiplier": 1,
	 "ShipWeight": 12,
	 "Active": true,
	 "Type": "Static",
	 "StdOrders": true,
	 "ReplOrders": false,
	 "InventoryEnabled": true,
	 "InventoryNotificationPoint": null,
	 "VariantLevelInventory": false,
	 "xp": null,
	 "ExceedInventory": true,
	 "DisplayInventory": true
	 },
	 {
	 "ID": "500",
	 "Description": "The Fifth Test Product",
	 "Name": "Test Product 5",
	 "QuantityMultiplier": 1,
	 "ShipWeight": 2,
	 "Active": true,
	 "Type": "Static",
	 "StdOrders": true,
	 "ReplOrders": false,
	 "InventoryEnabled": true,
	 "InventoryNotificationPoint": null,
	 "VariantLevelInventory": false,
	 "xp": null,
	 "ExceedInventory": true,
	 "DisplayInventory": true
	 },
	 {
	 "ID": "600",
	 "Description": "The Sixth Test Product",
	 "Name": "Test Product 6",
	 "QuantityMultiplier": 1,
	 "ShipWeight": 10,
	 "Active": true,
	 "Type": "Static",
	 "StdOrders": true,
	 "ReplOrders": false,
	 "InventoryEnabled": true,
	 "InventoryNotificationPoint": null,
	 "VariantLevelInventory": false,
	 "xp": null,
	 "ExceedInventory": true,
	 "DisplayInventory": true
	 },
	 {
	 "ID": "700",
	 "Description": "The Seventh Test Product",
	 "Name": "Test Product 7",
	 "QuantityMultiplier": 1,
	 "ShipWeight": 7,
	 "Active": true,
	 "Type": "Static",
	 "StdOrders": true,
	 "ReplOrders": false,
	 "InventoryEnabled": true,
	 "InventoryNotificationPoint": null,
	 "VariantLevelInventory": false,
	 "xp": null,
	 "ExceedInventory": true,
	 "DisplayInventory": true
	 },
	 {
	 "ID": "800",
	 "Description": "The Eighth Test Product",
	 "Name": "Test Product 8",
	 "QuantityMultiplier": 1,
	 "ShipWeight": 5,
	 "Active": true,
	 "Type": "Static",
	 "StdOrders": true,
	 "ReplOrders": false,
	 "InventoryEnabled": true,
	 "InventoryNotificationPoint": null,
	 "VariantLevelInventory": false,
	 "xp": null,
	 "ExceedInventory": true,
	 "DisplayInventory": true
	 }
	 ],
	 prodAssignments: [
	 {
	 "CategoryID": "cat1000",
	 "ProductID": "100",
	 "ListOrder": null
	 },
	 {
	 "CategoryID": "cat1000",
	 "ProductID": "200",
	 "ListOrder": null
	 },
	 {
	 "CategoryID": "cat2000",
	 "ProductID": "300",
	 "ListOrder": null
	 },
	 {
	 "CategoryID": "cat2000",
	 "ProductID": "400",
	 "ListOrder": null
	 },
	 {
	 "CategoryID": "cat3000",
	 "ProductID": "500",
	 "ListOrder": null
	 },
	 {
	 "CategoryID": "cat3000",
	 "ProductID": "600",
	 "ListOrder": null
	 },
	 {
	 "CategoryID": "cat4000",
	 "ProductID": "700",
	 "ListOrder": null
	 },
	 {
	 "CategoryID": "cat1000",
	 "ProductID": "800",
	 "ListOrder": null
	 }
	 ],
	 priceSchedule: [
	 {
	 "ID": "p100",
	 "Name": "Price Schedule 1",
	 "ApplyTax": false,
	 "ApplyShipping": false,
	 "MinQuantity": 1,
	 "MaxQuantity": null,
	 "UseCumulativeQuantity": false,
	 "RestrictedQuantity": false,
	 "OrderType": "Standard",
	 "PriceBreaks": [
	 {
	 "Quantity": 10,
	 "Price": 10.00
	 },
	 {
	 "Quantity": 20,
	 "Price": 8.00
	 }
	 ],
	 "xp": null
	 },
	 {
	 "ID": "p200",
	 "Name": "Price Schedule 2",
	 "ApplyTax": false,
	 "ApplyShipping": false,
	 "MinQuantity": 1,
	 "MaxQuantity": null,
	 "UseCumulativeQuantity": false,
	 "RestrictedQuantity": false,
	 "OrderType": "Standard",
	 "PriceBreaks": [
	 {
	 "Quantity": 10,
	 "Price": 15.00
	 },
	 {
	 "Quantity": 15,
	 "Price": 12.00
	 }
	 ],
	 "xp": null
	 }
	 ],
	 prodPriceAssignment: [
	 {
	 "ProductID": "100",
	 "StandardPriceScheduleID": "p100",
	 "BuyerID": "22222"
	 },
	 {
	 "ProductID": "200",
	 "StandardPriceScheduleID": "p100",
	 "BuyerID": "22222"
	 },
	 {
	 "ProductID": "300",
	 "StandardPriceScheduleID": "p100",
	 "BuyerID": "22222"
	 },
	 {
	 "ProductID": "400",
	 "StandardPriceScheduleID": "p100",
	 "BuyerID": "22222"
	 },
	 {
	 "ProductID": "500",
	 "StandardPriceScheduleID": "p200",
	 "BuyerID": "22222"
	 },
	 {
	 "ProductID": "600",
	 "StandardPriceScheduleID": "p200",
	 "BuyerID": "22222"
	 },
	 {
	 "ProductID": "700",
	 "StandardPriceScheduleID": "p200",
	 "BuyerID": "22222"
	 },
	 {
	 "ProductID": "800",
	 "StandardPriceScheduleID": "p200",
	 "BuyerID": "22222"
	 }
	 ],
	 catBuyerAssignments: [
	 {
	 "BuyerID": "22222",
	 "CategoryID": "cat1000"
	 },
	 {
	 "UserID": "user10",
	 "CategoryID": "cat2000"
	 },
	 {
	 "BuyerID": "22222",
	 "CategoryID": "cat3000"
	 },
	 {
	 "UserID": "user20",
	 "CategoryID": "cat4000"
	 }
	 ]

	 };*/
	/*vm.register = function() {
		Registration.Register(vm.envOpts.adminUser)
			.then(function(data) {
				vm.adminClientID = data.ID;
				vm.loginView = true;
				vm.registerView = false;
			}, function(reason) {
				console.log(reason);

				vm.error = reason;
			});
	};*/
	/*vm.buildEnv = function() {

		var buyerID = vm.envOpts.buyer.ID;

		var userCount = 0;
		var catCount = 0;
		var prodCount = 0;
		var priceCount = 0;

		Buyers.Create(vm.envOpts.buyer)
			.then(function() {
				vm.envOpts.users.forEach(function(each) {
					Users.Create(buyerID, each)
						.then(function(data) {
							userCount++;
							if (userCount == vm.envOpts.users.length) {
								vm.userDone = true;
							}
						}, function(reason) {
							console.log("Users Build Error");
							console.log(reason)
						})
				});
				vm.envOpts.categories.forEach(function(eachCat) {
					Categories.Create(buyerID, eachCat)
						.then(function(data) {
							catCount++;
							if (catCount == vm.envOpts.categories.length) {
								vm.catDone = true;
							}
						}, function(reason) {
							console.log("Categories Build Error");
							console.log(reason)
						});
				});
				vm.envOpts.products.forEach(function(eachProd) {
					Products.Create(eachProd)
						.then(function(data) {
							prodCount++;
							if (prodCount == vm.envOpts.products.length) {
								vm.prodDone = true
							}
						}, function(reason) {
							console.log("Products Build Error");
							console.log(reason);
						});
				});
				vm.envOpts.priceSchedule.forEach(function(eachSched) {
					PriceSchedules.Create(eachSched)
						.then(function(data) {
							priceCount++;
							if (priceCount == vm.envOpts.priceSchedule.length) {
								vm.priceDone = true;
							}
						}, function(reason) {
							console.log("Price Schedule Build Error");
							console.log(reason);
						})
				})
			},
			function() {
				vm.envOpts.users.forEach(function(each) {
					Users.Create(buyerID, each)
						.then(function(data) {
							userCount++;
							if (userCount == vm.envOpts.users.length) {
								vm.userDone = true;
							}
						}, function(reason) {
							console.log("Users Build Error");
							console.log(reason)
						})
				});
				vm.envOpts.categories.forEach(function(eachCat) {
					Categories.Create(buyerID, eachCat)
						.then(function(data) {
							catCount++;
							if (catCount == vm.envOpts.categories.length) {
								vm.catDone = true;
							}
						}, function(reason) {
							console.log("Categories Build Error");
							console.log(reason)
						});
				});
				vm.envOpts.products.forEach(function(eachProd) {
					Products.Create(eachProd)
						.then(function(data) {
							prodCount++;
							if (prodCount == vm.envOpts.products.length) {
								vm.prodDone = true
							}
						}, function(reason) {
							console.log("Products Build Error");
							console.log(reason);
						});
				});
				vm.envOpts.priceSchedule.forEach(function(eachSched) {
					PriceSchedules.Create(eachSched)
						.then(function(data) {
							priceCount++;
							if (priceCount == vm.envOpts.priceSchedule.length) {
								vm.priceDone = true;
							}
						}, function(reason) {
							console.log("Price Schedule Build Error");
							console.log(reason);
						})
				})
			}
		);

	};

	vm.setAssign = function() {
		var buyerID = vm.envOpts.buyer.ID;
		Categories.Patch(buyerID,'cat1000',{"ParentID": "parentCat1000"});
		Categories.Patch(buyerID,'cat2000',{"ParentID": "parentCat1000"});
		Categories.Patch(buyerID,'cat3000',{"ParentID": "parentCat2000"});
		Categories.Patch(buyerID,'cat4000',{"ParentID": "parentCat2000"});
		vm.envOpts.prodAssignments.forEach(function(eachProd) {
			Categories.SaveProductAssignments(buyerID, eachProd)
				.then(null, function(reason) {
					console.log("Product Category Assignment Error");
					console.log(reason);
				})
		});
		vm.envOpts.prodPriceAssignment.forEach(function(eachProd) {
			Products.SaveProductAssignment(eachProd)
				.then(null, function(reason) {
					console.log("Product Price Assignment Error");
					console.log(reason);
				})
		});
		vm.envOpts.catBuyerAssignments.forEach(function(eachCat) {
			Categories.SaveCategoryAssignment(buyerID, eachCat)
				.then(null, function(reason) {
					console.log("Category Buyer Assignment Error");
					console.log(reason);
				})
		})
	};*/
}