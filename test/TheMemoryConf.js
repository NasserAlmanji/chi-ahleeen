function TheMemory () {
		var ID = "Exp3";
		var shapes = [];
		var minSidesOfPoly = $("#minSides").val() || 3;
		var maxSidesOfPoly = $("#maxSides").val() || 8;
		var thisLeave = leave;
				
		var middleOnce;
		var comingShape = undefined;
		var goneShape = undefined;
		var middleTimeDelay = $("#stopTime").val() || 1000;
		var sideSize = $("#sizeSides").val() ||100;
		var shapeColor = "#00AA00";
		var linearSpeed = $("#speed").val() || 2000; 		// pixels / second
		
		
		var conf =1;
		
		var tries = $("#numTries").val() || 3;
		
		var triesCount = 0;
		var started = null;

		var passedTrue = [];
		var passedFalse = [];
		var trueMatch = [];
		var falseMatch = [];
		var logXs = [];
		var logXi = 0;
		

		
		var jsonData = {ID: ID,Results:{'match':trueMatch,'notMatch':falseMatch,'passedTrue':passedTrue,'passedFalse':passedFalse}};
				

		window.requestAnimFrame = (function(callback) {
			return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
			function(callback) {
			  window.setTimeout(callback, 1000 / 60);
			};
		})();
		
		for (var i =minSidesOfPoly; i <= maxSidesOfPoly;i++) {
			//push a shape function for each side, the pushed element is invokable with a new X coordinate;
			shapes.push(drawPoly(i,sideSize,canvas.width,canvas.height/2,context,shapeColor));
		}
		
		//var repetitive = setInterval(instaniateShapes,1500);

		var state =1;
		gameClick();
		$('#canvas').bind('click',gameClick);
				
		function instaniateShapes() {
			if (triesCount==tries) {
				//finish(jsonData,ID);
				$('#canvas').unbind('click');
				return; // importatnt for the sake of discontinuty
			} else {
				triesCount++;
			}
			
			goneShape = comingShape;
			comingShape = Math.floor(Math.random()*(maxSidesOfPoly-minSidesOfPoly+1));
			var startTime = (new Date()).getTime();
			middleOnce = false;
			
			if (triesCount>1) { // because in order to compare, you need at least two shapes.
				started = true;
							
				if (goneShape==comingShape) {
					passedTrue.push({goneShapeObject:goneShape,comingShapeObject:comingShape,tryNumber:triesCount,time:new Date().valueOf()});
				} else {
					passedFalse.push({goneShapeObject:goneShape,comingShapeObject:comingShape,tryNumber:triesCount,time:new Date().valueOf()});
				}
				
			}
			
			animate(startTime);
			return;
		}
		
		function animate(startTime) {
			// update
			if (leave > thisLeave) {
				console.log ("Leaving: "+thisLeave)
				$('#canvas').unbind('click',gameClick);
				return;
			}
			
			if (middleOnce) {
				var time = (new Date()).getTime() - startTime - middleTimeDelay;
			} else {
				var time = (new Date()).getTime() - startTime;
			}

			logXi++;
			var newX = canvas.width - (linearSpeed * time / 1000); //minus as it starts from the left to right;
			logXs.push(newX);

			if ((newX+200) < 0) { //does this imply finished?;
				//console.log(logXs);
				instaniateShapes();
				return;
			}

			// clear
			context.clearRect(0, 0, canvas.width, canvas.height-100);
			//drawRectangle(myRectangle, context);
			shapes[comingShape](newX);

			// request new frame
			if (!middleOnce && (newX-(sideSize/4))<(canvas.width/2)) {
				middleOnce = true;
				setTimeout(function() {
					animate(startTime);
				},middleTimeDelay);
			} else {
				requestAnimFrame(function() {
					animate(startTime);
				});
			}
      }
	  
		var colorsSuccBackground = ["#008800","#00aa00","#00bb00","#00cc00","#00dd00","#00ee00"];
		var colorsFailBackground = ["#880000","#aa0000","#bb0000","#cc0000","#dd0000","#ee0000"];
		
		function gameClick(e) {
			if (e) {
						e.preventDefault(); e.stopImmediatePropagation();

			}
			
			if (state) {
				instaniateShapes();		
				state = 0;
			}
			
			if (started) {

				var color = colorsFailBackground;
				if (goneShape==comingShape) {
					trueMatch.push({goneShapeObject:goneShape,comingShapeObject:comingShape,tryNumber:triesCount,time:event.timeStamp});
					color = colorsSuccBackground;
				} else {
					falseMatch.push({goneShapeObject:goneShape,comingShapeObject:comingShape,tryNumber:triesCount,time:event.timeStamp});
				
				}
				var i = 0;
				var animation = setInterval(backgroundColor,20);
				
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

			return;
		};
		
		return;
		
}