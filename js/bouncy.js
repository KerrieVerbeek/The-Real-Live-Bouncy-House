//alert("Hi this is the Java file");

//get some access to the canvas


var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d'); 


var dotSize = 10;

var xCoordList = new Array();
var yCoordList = new Array();


//dots in x and y direction (velocity)

var dxList = new Array();
var dyList = new Array();

//making colored dots

var dotColorList = new Array();
var listOfColors = ['#ffff1a',  '#ff99ff', '#00ffff', '#1aff1a', '#d24dff', ' #66b3ff', '#ff8533', '#660033', '#ff0000', '#ff4da6', '#944dff', '#b30000', ' #003366', '#ffb3b3', ' #00ff55', '#ff5050','#ff3300', ' #ffff66', ' #00cc00', '#0000ff'];

var totalColors = listOfColors.length; 

var rect = canvas.getBoundingClientRect();
var canvasWidth = rect.right - rect.left;
var canvasHeight = rect.bottom - rect.top;

alert(" canvas width and height are " + canvasWidth + ", " + canvasHeight);

//taken from w3schools 

//move dots just changes the x and y locations of each dot
// by dx and dy

var id = setInterval(frame, 8);


function moveDots() {

	
	for ( var whatDot = 0; whatDot < xCoordList.length; whatDot++) {

		xCoordList[whatDot] = xCoordList[whatDot] + dxList[whatDot];
		yCoordList[whatDot] = yCoordList[whatDot] + dyList[whatDot];

		if(dxList[whatDot] < 0){
			if(xCoordList[whatDot] < 0){
				xCoordList[whatDot] = 5;
				dxList[whatDot] *= -1;
			}
		} else {

			if( xCoordList[whatDot] > canvasWidth ){
				xCoordList[whatDot] = canvasWidth - 5;
				dxList[whatDot] *= -1;
			}

		}


if(dyList[whatDot] < 0){
			if(yCoordList[whatDot] < 0){
				yCoordList[whatDot] = 5;
				dyList[whatDot] *= -1;
			}
		} else {

			if( yCoordList[whatDot] > canvasHeight ){
				yCoordList[whatDot] = canvasHeight - 5;
				dyList[whatDot] *= -1;
			}

		}


	}
}



//function getMousePosition.. (x,y c caords)

function getMousePos(canvas, event) {
	var rect = canvas.getBoundingClientRect();
		return {
		x: event.clientX - rect.left,
		y: event.clientY - rect.top
	};
}



//function addClick (adss x,y click coords to array)

function addClick(x, y) {
//alert("hellow from addClick dragging is "" + dragging);
	xCoordList.push(x);
	yCoordList.push(y);

	//add create a random color
	var randomColor = Math.floor(Math.random() * totalColors); 

	//alert("random color created is" + random color);
	dotColorList.push(randomColor);

//added for animation in Add Click

	var myDX = (Math.floor(Math.random() * 7)) - 3; // mutlitply by your range and + by lowest number
	var myDY = (Math.floor(Math.random() * 7)) - 3;

	if (myDX === 0 ) {
		myDY = 1;
	}
	if (myDY === 0 ) {
		myDY = 1;
	}

	dxList.push(myDX);
	dyList.push(myDY);

}



//function redraw (redraws the window after each click)

function redraw() {

	context.clearRect(0, 0, context.canvas.width, context.canvas.height); //clears the canvas
	for (var i=0; i < xCoordList.length; i++) {
		context.beginPath();
		context.ellipse(xCoordList[i], yCoordList[i], dotSize , dotSize, 0, 0, Math.PI*2);
	// context.fillstyle = "pink";
	whatColorNumber = dotColorList[i]
	var myColor = listOfColors[whatColorNumber]; 
	context.fillStyle = myColor;
	context.fill();
	context.closePath();
}


}


//function addEventLisenter (allows us to catch mouseclicks)

canvas.addEventListener('mousedown', function(event) {
 	var mousePos = getMousePos(canvas, event);
 	var message = 'Mouse Down postition:' + mousePos.x + ',' + mousePos.y; 

 	addClick(mousePos.x, mousePos.y);

 	redraw();
 	console.log(message);

}, false);

function frame() {
	moveDots();
	redraw();
}





	