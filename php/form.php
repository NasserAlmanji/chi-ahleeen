<?php

include 'database.php';

	
        if($_SERVER['REQUEST_METHOD'] == "POST"){
				$data = Array();
				$ic = Array();
				if (isset($_POST['age'])) {
                        $data['age'] = $_POST['age'];
                        }
						
                if (isset($_POST['sex'])) {
                        $data['sex'] =  $_POST['sex'];
                        }
						
				if (isset($_POST['ImpairmentType'])) {
						$data["ImpairmentType"] = $_POST['ImpairmentType'];
                        }
						
				if (isset($_POST['ic1'])) {
						array_push($ic,$_POST['ic1']);
						}
				if (isset($_POST['ic2'])) {
						array_push($ic,$_POST['ic2']);
						}
				if (isset($_POST['ic3'])) {
						array_push($ic,$_POST['ic3']);
						}

				//if (isset($_POST['ic3']) || isset($_POST['ic2']) || isset($_POST['ic1']) ) {
					$data["ImpairmentClassification"]= $ic;
				//}
				
				if (isset($_POST['cp'])) {
					$data["Cerebral Palsy"] = $_POST['cp'];
					if (isset($_POST['macs'])) {
						$data["MACS Impairment Level"] = $_POST['macs'];
					}
				}
				
				
				if (isset($_POST['email'])) {
					$data["Email"] = $_POST['email'];

				}

              /*  if (isset($_FILES['file'])) {
                        if ($_FILES["file"]["error"] > 0)
                                          {
                                                echo "Error: " . $_FILES["file"]["error"] . "<br>";
                                          } else {
                         echo "Upload: " . $_FILES["file"]["name"] . "<br>";
                         echo "Type: " . $_FILES["file"]["type"] . "<br>";
                         echo "Size: " . ($_FILES["file"]["size"] / 1024) . " kB<br>";
                         echo "Stored in: " . $_FILES["file"]["tmp_name"];
                         
                        }
                 }*/
				 
				 $json = json_encode($data);
				 //var_dump( $json);

				$data = json_decode($json);
				$collection->insert($data);
		
				if (isset($_FILES["file"]['name'])){
					$path_parts = pathinfo($_FILES["file"]["name"]);
					if (!empty($path_parts['extension'])) {
						$ext = $path_parts['extension'];
						move_uploaded_file($_FILES["file"]["tmp_name"],"uploads/" ."{$data->_id}".".".$ext);
					}
				}
				
		
				$rsp =$data->_id;
				//$rsp = json_encode($rsp);
				echo($rsp);
				
		
        }

        exit;
?>