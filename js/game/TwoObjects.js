function TwoObjects() {
	
				var ID = "Exp2";
				var started = null;
				var first;
				var second;
				
				var tries;
				if (triesTwoObjects) {
					tries =triesTwoObjects;
				}
					
				var triesCount = 0;

				var passedTrue = [];
				var passedFalse = [];
				var trueMatch = [];
				var falseMatch = [];
				var repetitive;

				
				var state = startMsg("In this experiement:, 1) if the two appearing shapes MATCH, 2) then click",gameClick);
						
				var jsonData = {ID: ID,Results:{'match':trueMatch,'notMatch':falseMatch,'passedTrue':passedTrue,'passedFalse':passedFalse}};



		var color = "rgb(169, 169, 169)";
		function drawShapes() {			
			if (triesCount==tries) {
				clearInterval(repetitive);
				finish(jsonData,ID);
				return;
			} else {
				triesCount++;
			}

			started = true;

			first = Math.floor(Math.random()*4)+3;
			second = Math.floor(Math.random()*4)+3;
			if (first==second) {
				passedTrue.push({firstObject:first,secondObject:second,tryNumber:triesCount,time:new Date().valueOf()});
			} else {
				passedFalse.push({firstObject:first,secondObject:second,tryNumber:triesCount,time:new Date().valueOf()});
			}
			context.clearRect(0, 0, canvas.width, canvas.height);
			drawPoly(first,100,180,300,context,color)();
			drawPoly(second,100,400,300,context,color)();

					
		}
		
		function gameClick(e) {
				if (state) {
					repetitive = setInterval(drawShapes,1500);
					state = 0;
				}
			e.preventDefault(); e.stopImmediatePropagation();
			if (started) {	
				var colorsSuccBackground = ["#008800","#00aa00","#00bb00","#00cc00","#00dd00","#00ee00"];
				var colorsFailBackground = ["#880000","#aa0000","#bb0000","#cc0000","#dd0000","#ee0000"];
				
				var color = colorsFailBackground;
				if (first==second) {
					trueMatch.push({firstObject:first,secondObject:second,tryNumber:triesCount,time:event.timeStamp});
					color = colorsSuccBackground;
				} else {
					falseMatch.push({firstObject:first,secondObject:second,tryNumber:triesCount,time:event.timeStamp});
				}
				
				var i = 0;
				
				var animation = setInterval(backgroundColor,70);
				
				function backgroundColor() {
					context.fillStyle = color[i] ;
					context.fillRect(0, 500, 600, 100);
					i++;
					
					if (i==color.length) {
							clearInterval(animation);
							context.clearRect(0, 500, 600, 100);
						}
					
				}
				
				started = false;
			} 

			//console.log("+-"+nowTime());
			

		};

}