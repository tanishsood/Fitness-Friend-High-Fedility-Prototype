//water.js

const waterImg = "water.png", trackerId = "waterTracker", waterClass = "waterClass", waterSelectClass = "waterClicked";
const waterW = 50, waterH = 50;
var num = 0;


//object class for individual clickable water glasses
class SingleWater {
	constructor(parentDiv) {
		this.glass = document.createElement('li');
		this.glass.className = waterClass;
		parentDiv.appendChild(this.glass);		
	}
	
	setSelect() {
		this.glass.className = waterSelectClass;
	}
	
	getElement() {
		return this.glass;
	}
	
}

//WaterTracker object class
class WaterTracker {
	
	//constructor takes int ct for number of glasses, parentDiv id of element to append to
	constructor(ct,parentDiv) {
		let glass, curr;
		this.div = document.createElement('ul');
		this.div.id = trackerId;
		this.glasses = sjs.List([]);
		document.getElementById(parentDiv).appendChild(this.div);
		for(let i=0; i<ct; i++) {
			curr = new SingleWater(this.div);
			this.glasses.add(curr);
			
		}
	}
	
	//returns the array of singleWater objects
	getGlasses() {
		return this.glasses.list;
	}
	
}

//takes an array of SingleWater objects and adds eventlistener to each
function setUp(glasses) {
	if(Array.isArray(glasses)) {
		var curr;
		for(let i=0; i<glasses.length; i++) {
			curr = glasses[i];
			glasses[i].getElement().addEventListener("click", function() {handleClick(glasses[i]);});
		}
	}
}

//fn takes id for div where water tracker will be appended
//sends int to waterTracker constructor for how many glasses to use
//calls setUp() to add event listeners to glasses
function water(parentDiv) {
	let tracker = new WaterTracker(5,parentDiv);
	setUp(tracker.getGlasses());
}

//fn removes water tracker element from parentDiv
function clearWater(parentDiv) {
	document.getElementById(parentDiv).removeChild(document.getElementById(trackerId));
}

//code for click event
//to-do: write code to handle case: click on already selected glass
function handleClick(glass) {
	if(glass instanceof SingleWater) {
		glass.setSelect();
		currUser[0].incWater();
		num++;
	}
	//adding goals to goals page and alerting user when they finished up the goal
	if(num == 3){
		alert("congratulations!!! You just finished up a goal 3 GlassFun");
		document.getElementById("3glass").innerHTML = "3 GlassFun: You drank 3 glass of water in a day";
		document.getElementById("3").style.display = "none"; 
		userCoin+=100;
	}else if(num == 5){
		alert("congratulations!!! You just finished up a goal 5 GlassFun");
		document.getElementById("5glass").innerHTML = "5 GlassFun: You drank 5 glass of water in a day";
		document.getElementById("5").style.display = "none";  
		userCoin+=100;
	}else if(num == 8){
		alert("congratulations!!! You just finished up a goal 8 GlassFun");
		document.getElementById("8glass").innerHTML = "8 GlassFun: You drank 8 glass of water in a day";
		document.getElementById("8").style.display = "none";  
		userCoin+=100;
	}
}