<?php

include 'database.php';


if($_SERVER['REQUEST_METHOD'] == "POST"){
		
		$data = json_decode($_POST['json']);

		$id =  $_POST['userID'];
		
		$newdata = array('$push' => array('data'=>$data));
		$collection->update(array("_id" => new MongoId($id)), $newdata);

	}
	
	exit;

	
?>