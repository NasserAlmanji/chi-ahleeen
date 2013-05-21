		var canvas;
		var context;
		var htmlX = null;
		var htmlY = null;
		var htmlTimeStamp = null;
		var tasks=[];
		var taskID=0;
		
		$(document).ready(function () {
				canvas = document.getElementById('canvas');
				context = canvas.getContext('2d');

				//tasks=[/*TwoObjects,*/TheMemory];
				//
				//tasks=[TwoObjects];
				//TwoObjects();
				
				tasks=[TwoObjects,TheMemory];
				AsFastYouCan();				

				//TheMemory();
				}
			)