<?php
include 'database.php';
	
if($_SERVER['REQUEST_METHOD'] == "POST"){

		$data = json_decode($_POST['json']);		

		$id = $_POST['userID']; 
		$newdata = array('$push' => array('data'=>$data));
		$collection->update(array("_id" => new MongoID($id)), $newdata);
		
		
		//echo($data['_id']);
		//echo($data->_id);
	}
	
	
	exit;


?>