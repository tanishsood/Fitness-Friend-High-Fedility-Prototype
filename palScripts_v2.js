/* palScripts_v2.js
 * this version is for index.html
 *
 ************************************************************************************************
 * CSS information
 ************************************************************************************************
 * for the PalPicker screen:
 * the class name of individual characters is 'palPicker' (const palClass) when unselected, 
 * when selected the class name changes to 'pickedPal' (const selectClass) 
 * they are all contained in a div with the id 'palsDiv' (const palPicker)
 *
 * for the Homescreen:
 * class name for the character 'palHome' (const homeClass)
 * in a div with class name 'palHomeDiv' (const homePal) attached to id:'details' div in id:'homeScreen' div
 * 
 */


const catImg = "cat-pal-sprite.png", dogImg = "dog-sprite.png", hornyImg = "horny-sprite.png", palPicker = "palsDiv", homePal = "palHomeDiv";
const spriteW = 250, spriteH = 330, sceneW = 250, sceneH = 330;
let catPal, dogPal, hornyPal, selected;
const catId = "cat", dogId = "dog", hornyId = "horny";

var palScene, cycle, ticker, palArr, selection;
const palClass = "palPicker", selectClass = "pickedPal", homeClass = "palHome";

class Pal {
	constructor(parentDiv, width, height,img, id, thisClass) {
		this.scene = sjs.Scene({parent:parentDiv,w:width,h:height});
		this.scene.dom.className = thisClass;
		this.scene.dom.id = id;
		
		this.scene.loadImages([img]);
		this.mainLayer = this.scene.Layer("mainLayer",{useCanvas:false, autoClear:false});

		this.animations = sjs.List();
			
		this.idle = true;
						
		this.sprite = this.scene.Sprite(img,{layer:this.mainLayer,x:0,y:0,size:[spriteW,height]});
		this.sprite.update();
		
		this.animations.add(sjs.Cycle([[250,0,1],[500,0,1]]));
		this.animations.add(sjs.Cycle([[0,0,1],[750,0,1]]));
		this.animations.add(sjs.Cycle([[0,0,1],[1000,330,1],[1250,330,1]]));
		
		this.setUp();
			
		this.ticker = this.createTicker();
		this.ticker.run();
	}
	
	createTicker() {
		let scn = this;
		let tick = this.scene.Ticker(function paint(){scn.animation();},{tickDuration:1000});
		return tick;
	}
	
	
	compare(val) {
		if(this.getId() == val) return true;
		else return false;
	}
		
	getId() {
		return this.scene.dom.id;
	}
	
	animation() {
		var mation;

		this.sprite.update();
		
		while(mation = this.animations.iterate()) {
			if(mation.done) {
				mation.removeSprite([0]);
				mation.reset();
			}
			else {
				mation.next(this.ticker.lastTicksElapsed);
			}
			mation.update();
		}
	}
	
	setUp() {
		var wavemation,blinkmation,idlemation;
		wavemation = this.animations.list[0];
		blinkmation = this.animations.list[1];
		idlemation = this.animations.list[2];
		
		idlemation.addSprite(this.sprite);
	}
	
	swapIdle(val) {
		var othermation,idlemation;
		othermation = this.animations.list[val];
		idlemation = this.animations.list[2];
		
		this.ticker.pause();
		
		if(this.idle){
			idlemation.removeSprite(this.sprite);
			othermation.addSprite(this.sprite);
			othermation.repeat = false;
			this.idle = false;
		}
		else {
			this.idle = true;
			othermation.removeSprite(this.sprite);
			idlemation.addSprite(this.sprite);
		}
		
		idlemation.update();
		othermation.update();
		this.sprite.update();
		this.ticker.resume();
	}
	
}

// this class creates the selectable animated characters of the palPicker screen
class OpenPal extends Pal{
	
	constructor(parentDiv, width, height,img, id) {
		super(parentDiv, width, height,img, id, palClass);
		
	}
	
	selectThis() {
		this.scene.dom.className = selectClass;
	}
	
	deselect() {
		this.scene.dom.className = palClass;
	}
	
}

//this class creates the animated character for the homescreen
class mainPal extends Pal{
	constructor(parentDiv, width, height,id) {
		var img;
		
		if(id == catId) img = catImg;
		else if(id == dogId) img = dogImg;
		else if(id == hornyId) img = hornyImg;
		else window.alert("Id error while creating pal for homescreen");
		
		super(parentDiv, width, height,img, id, homeClass);
		
	}

}
					//this function creates the palpicker
					function go(divId) {
						//debugger;
						
						let pals = document.createElement('div');
						
						palArr = sjs.List();
						
						dogPal = new OpenPal(pals,sceneW,sceneH,[dogImg],dogId);
						catPal = new OpenPal(pals,sceneW,sceneH,[catImg],catId);
						hornyPal = new OpenPal(pals,sceneW,sceneH,[hornyImg],hornyId);
						
						selectPal(catPal);
						
						palArr.add(dogPal);
						palArr.add(catPal);
						palArr.add(hornyPal);
						
						pals.id = palPicker;
						
						document.getElementById(divId).appendChild(pals);
						
						document.getElementById(catId).addEventListener("click",function(){clickHandle(catPal);});
						document.getElementById(dogId).addEventListener("click",function(){clickHandle(dogPal);});
						document.getElementById(hornyId).addEventListener("click",function(){clickHandle(hornyPal);});
						
						document.getElementById(catId).addEventListener("mouseenter",function(){hoverHandle(catPal);});
						document.getElementById(dogId).addEventListener("mouseenter",function(){hoverHandle(dogPal);});
						document.getElementById(hornyId).addEventListener("mouseenter",function(){hoverHandle(hornyPal);});
						
						document.getElementById(catId).addEventListener("mouseleave",function(){leaveHandle(catPal);});
						document.getElementById(dogId).addEventListener("mouseleave",function(){leaveHandle(dogPal);});
						document.getElementById(hornyId).addEventListener("mouseleave",function(){leaveHandle(hornyPal);});
						
						//debugger;
						
					}
					
					//this function creates the pal for the homescreen
					function getPal(divId, id) {
						let palId = currPal();
						if(palId != null) {
							let thisDiv = document.createElement('div');
							thisDiv.id = id;
							let thePal = new mainPal(thisDiv,spriteW,spriteH,palId);
							document.getElementById(divId).appendChild(thisDiv);
						
							document.getElementById(palId).addEventListener("mouseenter",function(){hoverHandle(thePal);});
							document.getElementById(palId).addEventListener("mouseleave",function(){leaveHandle(thePal);});
						}
					}
					
					function clearPalPicker(divId) {
						document.getElementById(divId).removeChild(document.getElementById(palPicker));
					}
					
					function selectPal(pal) {
						var curr;
						
						if(pal instanceof OpenPal) {
							if(!pal.compare(selection)) {
								while(curr = palArr.iterate()) {
									if(curr.compare(selection)) {
										curr.deselect();
									}
								}
								selection = pal.getId();
								pal.selectThis();
							}
						}
					}
					
					function getSelection() {
						return selection;
					}
					
					function clickHandle(pal) {
						if(pal instanceof Pal) {
							selectPal(pal);
						}
					}
					
					function hoverHandle(pal) {
						if(pal instanceof Pal) {
							pal.swapIdle(1);
						}
					}
					
					function leaveHandle(pal) {
						if(pal instanceof Pal) {
							pal.swapIdle(1);
						}
					}
					
				