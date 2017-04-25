response.controller("ResponseController", function($scope, $cordovaSQLite) {
 
		$scope.page_name = "home";
		$scope.module_name = "get_home_card";
		
		var sel_query = "SELECT t2.Module_Json FROM tbl_Page_Module as t1 inner join tbl_Module as t2 on (t1.Module_ID = t2.Module_ID) where t2.Module_Json !='' AND t1.Page_Name = ? AND t2.Module_Name = ?";
		
		$cordovaSQLite.execute(db, select_query, [$scope.page_name, $scope.module_name]).then(function (res) {
			if (res.rows.length > 0) {
				var data=[];
				for (var i = 0 ; i <= res.rows.length; i++) {
				   var resp_data={module_id:res.rows.item(i).Module_Json};//data.push(obj);
				}
				//console.log(data);
			} else {
				/* Fetch the Data from Remote API Start */



				/* Fetch the Data from Remote API End*/
				
				/* Insert the remote response into local db */
				/* 1.tbl_Page */
				var insert_query = "INSERT INTO tbl_Page(`Page_Name`,`Complete_Json_Data`,`Status`,`Date_Created`) VALUES(?,?,?,?); ";
				$cordovaSQLite.execute(db,query,[$scope.page_name,complete_json_data,'active',DATETIME('NOW')]).then(function(result) {
					console.log("INSERT ID -> " + result.insertId);
					var result_page_id = result.insertId;
				}, function(error) {
					console.error(error);
				});

				/* 2.tbl_module */
				var insert_query = "INSERT INTO tbl_Module(`Module_Name`,`Module_Json`,`Status`,`Date_Created`) VALUES(?,?,?,?); ";
				$cordovaSQLite.execute(db,query,[$scope.module_name,module_json,'active',DATETIME('NOW')]).then(function(result) {
					console.log("INSERT ID -> " + result.insertId);
					var result_module_id = result.insertId;
				}, function(error) {
					console.error(error);
				});

				/* 3.tbl_Page_Module */
				var insert_query = "INSERT INTO tbl_Page_Module(`Page_ID`,`Module_ID`,`Status`,`Date_Created`) VALUES(?,?,?,?); ";
				$cordovaSQLite.execute(db,query,[result_page_id,result_module_id,'active',DATETIME('NOW')]).then(function(result) {
					console.log("INSERT ID -> " + result.insertId);
				}, function(error) {
					console.error(error);
				});


			}
		}); 
});