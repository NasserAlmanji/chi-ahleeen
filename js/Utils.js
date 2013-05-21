	function nowTime(value) {
		var date;
		if (value) {
			date = new Date(value);
		} else {
			date = new Date();
		}

		  return date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()+':'+date.getMilliseconds();
	}

	function nextButtonClick (e) { // function expression to make it very global as of JQuery (< not any more an expression)
			if (!e) var e = window.event;
			e.preventDefault(); e.stopImmediatePropagation();
			context.clearRect(0,0,canvas.width, canvas.height);
			$('.nextButton').addClass("disabled");
			$('.nextButton').unbind("click");
			var task = tasks[taskID];
			task();
			taskID++;					
	};
				
	function finish(jsonData,ID) {
			$('html').unbind('click');
			$('#canvas').unbind('click');
			
			//context.clearRect(0, 0, 600, 600);
			context.fillStyle = "rgba(20, 20, 20, 0.7)";
			context.fillRect(0, 100, 600, 400);
			
			var postData = JSON.stringify(jsonData);
			//console.log(postData);
			
			if	(jsonData&&ID) {
				send(postData,ID);
			}
			
			if (taskID!=tasks.length) {
				context.fillStyle = "rgb(200, 200, 200)";
				drawText("Finished :), move to Next",30, 300, 300,0);
				$('.nextButton').removeClass("disabled");
				$('.nextButton').bind('click',function() {nextButtonClick();});
			} else {
				context.fillStyle = "rgb(200, 255, 200)";
				drawText("Results time :)",30, 300, 300,0);
				//context.clearRect(0,0,canvas.width, canvas.height);
				$('.resultsButton').removeClass("disabled");
				$('.resultsButton').bind('click',function() {Results(userID)});
			}
			
}
	
	function send(postData,ID) {
		var postArray;
		postArray = {json:postData,userID:userID};

		$.ajax({
				type:"POST",
				url:"php/"+ID+".php",
				data:postArray,
				//cache: false,
				//contentType: false,
				//processData: false,
				success:function(rponse){
					/*if (!userID) {
						userID = rponse;
					}*/
				}
				
			});
	}
				
	function htmlClick(e) {
		if (!e) var e = window.event;
		e.preventDefault(); e.stopImmediatePropagation();
		htmlX = e.pageX;
		htmlY = e.pageY;
		htmlTimeStamp = e.timeStamp;
		$('#canvas').click();
	};

	function barGraph(dataName,dataValue,can,stepSizePar) {
			var ctx,xScalar, yScalar, numSamples, y;
			// set these values for your data
			numSamples = dataValue.length;
			
			var maxVal = 0;
			
			for(var i=0;i<dataValue.length;i++){
				console.log("dataValue["+i+"] :"+dataValue[i])
				if (dataValue[i] > maxVal){
					maxVal = dataValue[i];
				}
			}
			var stepSize;
			if (stepSizePar) {
				stepSize = stepSizePar;
			} else {
				stepSize = 1;
			}
			
			var colHead = 50;
			var rowHead = 60;
			var margin = 10;
			var header = "# of Clicks";
			ctx = can.getContext("2d");
			
			/*ctx.fillStyle = "red";
			ctx.fillRect(0,0,can.width,margin);	*/
			
			yScalar = (can.height - colHead - margin) / (maxVal); // pixels per unit value
			xScalar = (can.width - rowHead) / (numSamples); // from left to left of green col
			ctx.strokeStyle = "rgba(128,128,255, 0.5)"; // light blue line
			ctx.beginPath();
			// print column header
			ctx.font = "15pt Helvetica"
			ctx.fillStyle = "rgba(180,180,180,170)";
			ctx.fillText(header, 0, colHead - 2*margin);
			
			// print row header and draw horizontal grid lines
			ctx.font = "12pt Helvetica"
			var count = 0;
			for (scale = maxVal; scale >= 0; scale -= stepSize) {
				y = colHead + (yScalar * count * stepSize); // count = 0 draws the digit 12000.
					/*if (count==0) {
								ctx.fillStyle = "rgba(128,0,0,0.3)";
								ctx.fillRect(0,y,can.width,margin);	
					}*/
				ctx.fillStyle = "rgba(0,180,255,170)";
				ctx.fillText(scale, margin,y + 0.6*margin);// margin what makes it actually fall below line
				ctx.moveTo(rowHead, y)
				ctx.lineTo(can.width, y)
				count++;
			}
			
			ctx.stroke();
			
			// label samples
			ctx.fillStyle = "rgba(215,205,166,125)";
			ctx.font = "12pt Helvetica";
			ctx.textBaseline = "bottom"; // notic how 'p' touches the top of the green col
			for (i = 0; i < 4; i++) {
				y = (can.height - dataValue[i]*yScalar);
				if (i%2!=0) {
					var newX = (xScalar* (i + 1)) -(xScalar*0.45);
					var a = dataName[i].split(" "); 
					
					ctx.fillText(a[0], newX, y - ((!a[1]) ? margin : 2*margin));
					if(a[1])
					ctx.fillText(a[1], newX, y - margin);
				} else {
					ctx.fillText(dataName[i], xScalar * (i + 1), y - margin);
				}
			}
			
			
			// translate to bottom of graph and scale x,y to match data
			ctx.translate(0, can.height - margin);
			ctx.scale(xScalar, -1 * yScalar);
			// draw bars
			for (i = 0; i < 4; i++) {
				//backgroundBarColor();
				//ctx.fillRect(i+1, 0, 0.5, dataValue[i]+1000);
				dataBarColor();
				if (i%2!=0) {
					ctx.fillRect(i+0.55, 0, 0.5, dataValue[i]);
				} else {
					ctx.fillRect(i+1, 0, 0.5, dataValue[i]);
				}
				
				
			}
			
			function dataBarColor() {
				// set a color and a shadow
				ctx.fillStyle = "green";
				/*ctx.shadowColor = 'rgba(128,128,128, 0.5)';
				ctx.shadowOffsetX = 10;
				ctx.shadowOffsetY = 1;*/
			}
			
			function backgroundBarColor(){
				// set a color and a shadow
				ctx.fillStyle = "rgba(255,0,0, 0.5)";
				ctx.shadowColor = null;
				ctx.shadowOffsetX = null;
				ctx.shadowOffsetY = null;
				//ctx.shadowColor = 'rgba(128,128,128, 0.2)';
				//ctx.shadowOffsetX = 20;
				//ctx.shadowOffsetY = 1;
			}
			
			
			
			
			console.log("yScalar: "+yScalar);
			console.log("xScalar: "+xScalar);
			console.log("numSamples: "+numSamples);
			console.log("maxVal: "+maxVal);
			console.log("y: "+y);


			
			
	}
	
	//Add Msg Option
	function startMsg(Msg,gameClick) {
			var n=Msg.split(",");
			//context.save();
			//console.log(Msg)
			context.fillStyle = "rgba(20, 20, 20, 0.7)";
			context.fillRect(0, 100, 600, 400);
			context.fillStyle = "rgb(200, 200, 200)";
			
			drawStartMsg(n[0],20, 40, 200,0);
			for (var i=1;i<n.length;i++) {
					drawStartMsg(n[i],20, 80, 200+(50*i),0);
					//console.log(n[i].length);
			}
			
			function handler(event) {
				context.clearRect(0,0,canvas.width,canvas.height);
				//context.restore();
				$('#canvas').unbind('click');			
				$('#canvas').bind('click',gameClick);;
			}
			
			$('html').bind('click',htmlClick);
			$("#canvas").bind("click", handler);
			
			return 1;

	}

	function drawText(text,size, X, Y, offset) {
			context.font = size+"pt Helvetica";
			context.textAlign = "center";
			context.textBaseline = "middle";
			context.fillText(text, X + 0.5 * offset , Y + 0.5 * offset);
	}
	
	function drawStartMsg(text,size, X, Y, offset) {
			context.font = size+"pt Helvetica";
			context.textBaseline = "middle";
			context.textAlign = "left";
			context.fillText(text, X + 0.5 * offset , Y + 0.5 * offset);
	}
	
