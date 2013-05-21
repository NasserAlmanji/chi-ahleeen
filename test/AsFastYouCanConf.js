function AsFastYouCan() {
	
		var ID = "Exp1";

		var increase;
		if (increaseAsFastYouCan) {
			increase = increaseAsFastYouCan;  /*can be configurable */
		}
		
		var fitinX = canvas.width / increase;
		var fitinY = canvas.height / increase;
		var countX = 0;
		var countY = 0;
		var totalCount = 0;
		var max = fitinX * fitinY;
		var results = [];
		var jsonData = {ID:ID,Results:results};
		
		startMsg("In this experiement:, 1) click AS FAST YOU CAN, 2) each click results in the next number",gameClick);
		
		function gameClick(e) {
					e.preventDefault(); e.stopImmediatePropagation();
					
					context.fillStyle = "#5555FF";
					drawText((totalCount+1)+"",increase/2, countX,countY,increase );
					
					totalCount += 1;

					if ((totalCount % fitinX) == 0 ) {
						countX = 0;
						countY += increase;
					} else {
						countX += increase;
					
					}
								
					var X, Y, Time;
					if (htmlX && htmlY && htmlTimeStamp) {
						X = htmlX;
						Y = htmlY;
						Time = htmlTimeStamp;
						htmlX = null;
						htmlY = null;
						htmlTimeStamp = null;
					} else {
						X = e.pageX;
						Y = e.pageY;
						Time = e.timeStamp;
					}
					
					results.push({X: X,Y:Y,Time:Time});
					
					
					//Finish, unbind events and make ready to move
					if (totalCount==max) {
						finish(jsonData,ID);
						return;
					}
					
			};
			
			//$('html').bind('click',htmlClick); // Its order is really importatnt to be here, so it does not conflict with startMsg click binding;


	

}