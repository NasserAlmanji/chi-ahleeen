function TheMemory () {
		var ID = "Exp3";
		var linearSpeed;
		var sideSize;
		var middleTimeDelay;
		var tries;
		var minSidesOfPoly;
		var maxSidesOfPoly;
		var shapeColor;
					
		$.ajax({
				type:"POST",
				url:"php/conf.php",
				data: {loadExpMeta:ID},
				success : function(data){
					data = $.trim(data); //leading whithespace in the PHP responce :!
					
					var jsonData = JSON.parse(data);
					
					 linearSpeed = jsonData.speedTime || 2000;
					 sideSize = jsonData.sizeSides || 100;
					 middleTimeDelay = jsonData.stopTime ||1000;
					 tries = jsonData.numTries || 5;
					 minSidesOfPoly = jsonData.minSides || 5;
					 maxSidesOfPoly =jsonData.maxSides || 8;
					 shapeColor = "#00AA00";
					 
					 start();
					
				}
		})


		
function start() {
		var shapes = [];
		
				
		var middleOnce;
		var comingShape = undefined;
		var goneShape = undefined;


		
		
		var triesCount = 0;
		var started = null;

		var passedTrue = [];
		var passedFalse = [];
		var trueMatch = [];
		var falseMatch = [];
		var logXs = [];
		var logXi = 0;
		
		var state = startMsg("In this experiement, 1) click if the NEXT shape matches, the PREVIOUS shape, 2) if they don't match then DON'T CLICK",gameClick);
		
		// $('html').bind('click',htmlClick);
		
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

	
				
		function instaniateShapes() {
			if (triesCount==tries) {
				finish(jsonData,ID);

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
		}
		
		function animate(startTime) {
			// update
			
			if (middleOnce) {
				var time = (new Date()).getTime() - startTime - middleTimeDelay;
			} else {
				var time = (new Date()).getTime() - startTime;
			}

			logXi++;
			var newX = canvas.width - (linearSpeed * time / 1000); //minus as it starts from the left to right;
			logXs.push(newX);

			if ((newX+200) < 0) { //does this imply finished?;
				console.log(logXs);
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
			if (state) {
				instaniateShapes();		
				state = 0;
			}
			e.preventDefault(); e.stopImmediatePropagation();
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

			
		};
		}
}