<?php
		$m = new MongoClient();
		$collection = $m->selectCollection('amerDB', 'users');
		$collectionConf = $m->selectCollection('amerDB','meta');

?>