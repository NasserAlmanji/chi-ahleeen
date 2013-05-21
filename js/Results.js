function Results(userID) {
		console.log(userID);
		var id = userID;
		$.ajax({
			type: "POST",
			url: 'php/Results.php',
			data: {userID:id},
			 success: function(responce) {
				//console.log(responce);
				var jsonData = JSON.parse(responce);
				console.log(jsonData);
				
				var expResults = [];
				
				jQuery.each(jsonData, function(i, val) {
					 jQuery.each(val, function(i, val2) {
					  /*jQuery.each(val2, function(i, val3) {
							console.log(val3);
						})*/
						expResults.push(val2);
						
					})
				});
				
				/*console.log("Average: "+expResults[0].Average);
				
				console.log("Matched: "+expResults[1].Matched);
				console.log("NotMatched: "+expResults[1].NotMatched);
				console.log("PassedFalse: "+expResults[1].NotMatched);
				console.log("PassedTrue: "+expResults[1].NotMatched);*/
				
				var Average = expResults[0].Average;
				var Names = ['Right','Matches','Wrong','Non Matches'];
				$('.main').append('	<div class="experiementTitle"> <span class="title">Expr#1: </span> <span style="color:#CCCCCC;font-size:20pt;">Average: </span> <span style="color:white;font-size:20pt;">'+Average+'ms </span> </div>');
				$('#canvas').remove();
				
				
				if (expResults[1]) {
					$('.main').append('<div class="experiementTitle"> <span class="title">Expr#2: </span></div>');
					$('.main').append('<canvas class ="canvasBar" id="barExp2" width="600" height="600"></canvas>');
					var Exp2Data = [expResults[1].Matched,expResults[1].PassedTrue,expResults[1].NotMatched,expResults[1].PassedFalse];
					var can = document.getElementById('barExp2');
					barGraph(Names,Exp2Data,can);
					
				}
				if (expResults[2]) {
					$('.main').append('<div class="experiementTitle"> <span class="title">Expr#3: </span></div>');
					$('.main').append('<canvas class ="canvasBar" id="barExp3" width="600" height="600"></canvas>');
					var Exp3Data = [expResults[2].Matched,expResults[2].PassedTrue,expResults[2].NotMatched,expResults[2].PassedFalse];
					var can = document.getElementById('barExp3');
					barGraph(Names,Exp3Data,can)
				}
				

				$.ajax({
				type:"POST",
				url:"php/XmlConverter.php",
				data: {userID:id},
				success : function(){
					console.log("OK");
				}
			});
			
			}
			
			
		});
	}
		
	