<?php
	include 'database.php';
	//require_once('XmlConverter.php');

	if (isset($_POST['userID'])) {
		$id= $_POST['userID'];
		$usersCursor = $collection->find(array('_id' => new MongoId($id))); //make sure you find the one you need by supplying ID
	} 
	
	$array = iterator_to_array($usersCursor); // is it necessary?
	$results = array();	
	foreach($array as $item){
				foreach($item['data'] as $exp) {
					if ($exp['ID']=="Exp1") {
						$difference = array();
						$count = 0;
						$prev;
						foreach($exp['Results'] as $xyt) {
							//echo($exp['Results']."<br/>");
							
							if ($count>0) {
								array_push($difference,($xyt['Time']-$prev['Time']));
							}
							$prev = $xyt;
							$count = $count +1;
							
						}
						array_push($results,array(
									'Exp1 Results'=> array(
										'Average' => array_sum($difference) / count($difference))
										)
									);
					} elseif ($exp['ID']=="Exp2") {
								array_push($results,array(
									'Exp2 Results'=> array(
										'Matched' => count($exp['Results']['match']),
										'NotMatched' => count($exp['Results']['notMatch']),
										'PassedTrue' => count($exp['Results']['passedTrue']),
										'PassedFalse' => count($exp['Results']['passedFalse'])
										)
									)
								);

					} elseif ($exp['ID']=="Exp3") {

						array_push($results,array(
									'Exp3 Results'=> array(
										'Matched' => count($exp['Results']['match']),
										'NotMatched' => count($exp['Results']['notMatch']),
										'PassedTrue' => count($exp['Results']['passedTrue']),
										'PassedFalse' => count($exp['Results']['passedFalse'])
										)
									)
								);
					
					}
				}
	}
	
	
	
	$json = json_encode($results);
	echo($json);


?>