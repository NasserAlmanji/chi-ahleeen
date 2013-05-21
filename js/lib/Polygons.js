function drawPoly(numberOfSides,size,Xcenter,Ycenter,cxt,fillColor) {

		return function(X2center) {

		cxt.beginPath();
		cxt.moveTo((X2center || Xcenter) +  size * Math.cos(0), Ycenter +  size *  Math.sin(0));          
		
		for (var i = 1; i <= numberOfSides;i += 1) {
			cxt.lineTo((X2center || Xcenter) + size * Math.cos(i * 2 * Math.PI / numberOfSides), Ycenter + size * Math.sin(i * 2 * Math.PI / numberOfSides));
		}

		cxt.strokeStyle = "#000000";
		cxt.lineWidth = 2;
		cxt.stroke();
		
		if (fillColor){
			cxt.closePath();
			cxt.fillStyle = fillColor;
			cxt.strokeStyle = fillColor;
			cxt.fill();
		} else {
			cxt.strokeStyle = "#000000";
		}

		cxt.lineWidth = 2;
		cxt.stroke();
		
	}

}