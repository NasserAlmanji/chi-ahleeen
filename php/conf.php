<?php

include 'database.php';

if($_SERVER['REQUEST_METHOD'] == "POST"){
		$data = Array();

		if (isset($_POST['loadExpMeta'])) {
			if ($_POST['loadExpMeta']=='Exp3') {
				$metaCursor = $collectionConf->find(array('expr_id' => 'Exp3'));
				//var_dump($metaCursor->next());//echo 'OK';
				$array = iterator_to_array($metaCursor); // is it necessary?
				
				foreach($array as $item){
					$json = json_encode($item['data']);
					echo($json);

				}
	
			}
		}
		
		
		if (isset($_POST['ExpID'])) {
                     
    
		
					if (isset($_POST['numTries'])) {
									$data['numTries'] = $_POST['numTries'];
					 }
					 
					 if (isset($_POST['minSides'])) {
									$data['minSides'] = $_POST['minSides'];
					 }
					 
					 if (isset($_POST['maxSides'])) {
									$data['maxSides'] = $_POST['maxSides'];
					 }
					 
					 if (isset($_POST['sizeSides'])) {
									$data['sizeSides'] = $_POST['sizeSides'];
					 }
					 
					 if (isset($_POST['stopTime'])) {
									$data['stopTime'] = $_POST['stopTime'];
					 }
					 
					 if (isset($_POST['speedTime'])) {
									$data['speedTime'] = $_POST['speedTime'];
					 }
					 

					$newdata = array('$set' => array('data'=>$data));
					 $json = json_encode($newdata);
					 $newdata = json_decode($json);
							
					$record = $collectionConf->findOne(array('expr_id'=>$_POST['ExpID']));
					if ($record) {
						$collectionConf->update(array('expr_id'=>$_POST['ExpID']),$newdata);
					} else {
						$d['data'] = $data;
						$d['expr_id'] = $_POST['ExpID'];
						$json = json_encode($d);
						$d = json_decode($json);
						$collectionConf->insert($d);		
					} 
					
		}
				
		 //$user = $users->findOne(array('username' => 'jwage'), array('password' => 0));
		
		// $c->insert(array("firstname" => "Bob", "lastname" => "Jones" ));
// $newdata = array('$set' => array("address" => "1 Smith Lane"));
// $c->update(array("firstname" => "Bob"), $newdata);



}

exit;  








?>