//scripts.js javascript file
//created: 11/09/2021
//last updated: 11/21/2021


//******************************************************************
// CLASSES
//******************************************************************

// defines the user object class
class User {
	
	constructor(username,email,passw,palId) {
		this.username = username;
		this.email = email;
		this.passw = passw;
		this.level = 0;
		this.exp = 0;
		this.palId = palId;
		this.height = 0;
		this.weight = 0;
		this.bdate = 0;
		this.male = false;
		this.activeLvl = 0;
		this.userData = new BigData();
		this.goal = 0;
		this.coins = 0;
		this.personList = new FoodCatList();
	}
	
	getPersonList(){
		return this.personList;
	}
	
	toString() {
		let str = this.username + " " + this.passw;
		return str;
	}
	
	/********************************************************************
	 * various setters for the User Object
	 ********************************************************************/
	setHeight(val) {
		this.height = val;
	}
	
	setWeight(val) {
		this.weight = val;
	}
	
	getWeight() {
		return this.weight;
	}
	
	setGoalWeight(val) {
		this.goalWeight = val;
	}
	
	setGoal(val) {
		if(val == -1) {
			this.goal = val;
		}
		else if(val == 0) {
			this.goal = val;
		}
		else if(val == 1){
			this.goal = val;
		}
		else window.alert("Invalid value for setting user goal. Value: " + val);
	}
	
	setBdate(val) {
		this.bdate = val;
	}
	
	setMale(val) {
		this.male = val;
	}
	
	setActiveLvl(val) {
		this.activeLvl = val;
	}
	
	//TO-DO: write this function
	//should calculate the users age based on their birthday and the current date
	getAge() {
		let bdate, today, age;
		bdate = this.bdate;
		
		return 20;
	}
	
	getWater(d) {
		if(d instanceof Date) {
			//window.alert(this.userData.getWater(d));
			return this.userData.getWater(d);
		}
		else window.alert("Failed to access user water data: Bad date: " + d);
	}
	
	incWater() {
		let currData = this.userData.getDay(currDay[0]);
		currData.incWater();
	}
	
	setWater(d,val) {
		//window.alert("Set user water; User: " + this.username + " Day: " + d + " Value: "+ val);
		if(d instanceof Date) {
			this.userData.setWater(d,val);
		}
		else window.alert("Failed to set user water data: Bad date: " + d);
	}
	
	//returns a constant for the TDEE equation based on the activity level (stored as an int from 1-5)
	getActivityConstant() {
		var result, lvl;
		lvl = this.activeLvl;
		if(lvl == 0) result = 1.2;
		else if(lvl == 1) result = 1.375;
		else if(lvl == 2) result = 1.55;
		else if(lvl == 3) result = 1.725;
		else result = 1.9;
		return result;
	}
	
	//function takes a int parameter + increases the user exp by that amount
	//calls helper function to check if user should level up
	incExp(num) {
		this.exp += num;
		this.checkLvl();
	}
	
	getPal() {
		return this.palId;
	}
	
	//checks if current xp points are enough to level up 
	//if yes, increases level + subtracts exp used to level up
	checkLvl() {
		let val = levelXp(this.level);
		let txt = "" + this.exp + "/" + val;
		showMe(txt);
		if(val <= this.exp) {
			this.exp -= val;
			this.level++;
			window.alert("Congratulations, you have leveled up. You are now level " + this.level);
		}
	}

	//returns a string with html representing the current users details
	details() {
		let val = levelXp(this.level);
		let str = "";
		str += "<p>"+ this.username + "</p>";
		str += "<p>Coins: " + this.coins + "</p>";
		str += "<p>Level: " + this.level + "</p>";
		str += "<label for='xp'>Progress: </label>";
		str += "<progress id='xp' value='"+this.exp + "' max='" + val + "'>Experience </progress>"
		return str;
	}
	
	//method for User object that returns the TDEE (daily calories burned)
	//source: https://www.pediatriconcall.com/calculators/basel-metabolic-rate-bmr-calculator
	//TDEE = BMR x Activity Level
	//https://www.calculators.org/health/bmr.php
	calculateTDEE() {
		let result, male, weight, height, age, activityLevel;
		male = this.male;
		weight = this.weight;
		height = this.height;
		age = this.getAge();
		activityLevel = this.getActivityConstant();
		
		if (!male) {
			result = (655 + (4.35 * weight) + (4.7 * height) - (4.7 * age)) * (activityLevel); 
		}
		else result = (66 + (6.23 * weight) + (12.7 * height) - (6.8 * age)) * (activityLevel);
		
		return result;
	}
	
}

//generic super class for items
class Item {
	constructor(name) {
		this.name = name;
	}
	
	
	
	toString() {
		let str = "";
		str += this.name;
		return str;
	}
}


class FoodCatItem extends Item{
	constructor(name, cals, protein, carbs, fat, quant){
		super(name);
        this.name = name;
        this.cals = cals;
        this.protein = protein;
        this.carbs = carbs;
        this.fat = fat;
        this.quant = quant;
		this.currDate = -1;
	}


    getName(){
        return this.name;
    }

    getCals(){
        return parseInt(this.cals); 
    }
	
	getProtein(){
        return parseInt(this.protein);
    }

    getCarbs(){
        return parseInt(this.carbs);
    }

    getFat(){
        return parseInt(this.fat);
    }

    getQuant(){
        return parseInt(this.quant);
    }
	
	setCurrDate(num){
		this.currDate = num;
	}

	getCurrDate(){
		return this.currDate;
	}

}

class List {
    constructor(){
        if(this.constructor === List){
            throw new Error("Can't instantiate abstract class");
        }
    }
}

class FoodCatList extends List{
    constructor(){
        super();
        this.foodList = new Array();
        this.count = 0;
    }

    put(foodItem){
        if(foodItem instanceof FoodCatItem){
            this.foodList.push(foodItem);
            this.count++;
        }else{
            throw new Error("Its not a food item");
        }
    }

	//Add item in the beginning
    putFirst(foodItem){
        if(foodItem instanceof FoodCatItem){
            this.foodList.unshift(foodItem);
            this.count++;
        }else{
            throw new Error("Its not a food item");
        }
    }
    get(foodItem){
        if(foodItem instanceof FoodCatItem){
            for(var i = 0; this.foodList.length; i++){
                if(_.isEqual(foodItem,this.foodList[i])){
                    return this.foodList[i].name;
                }
            }
        }else{
            throw new Error("Its not a food item");
        }
    }

    removeItem (foodItem){
        if(foodItem instanceof FoodCatItem){
            let index = this.foodList.indexOf(foodItem);
            this.foodList.splice(index,1);
            this.count--;
        }else{
            throw new Error("Its not a food item");
        }
    }

	//Removes all items after given index
    removeAllItemAfter(index){
        if(this.count > index){
            for(var i = 0; i < this.count; i++){
                if(i >= index){
                    let toRem = this.foodList[i];
                    this.removeItem(toRem);
                }
            }
        }else{
            alert("Index is greater than History length");
        }
        
    }
	
	getItembyName(name){
        for(var i  = 0; i < this.foodList.length; i++){
            if(this.getName(i).toUpperCase() === name.toUpperCase()){
                
                return this.foodList[i];
            }
        }
    }
	
	getCurrDate(index){
		return this.foodList[index].getCurrDate();
	}
	
    contains(foodItem){
        if(foodItem instanceof FoodCatItem){
            for(var i  = 0; i < this.foodList.length; i++){
                if(_.isEqual(foodItem,this.foodList[i])){
                    return true;
                }
            }
            return false;
        }else{
            throw new Error("Its not a food item");
        }
    }

    containsName(name){
            for(var i  = 0; i < this.foodList.length; i++){
                if(this.foodList[i].getName().toUpperCase().includes((name.toUpperCase()))){
                    return true;
                }
            }
            return false;
    }

    getName(index){
       return this.foodList[index].getName();
    }

    getCals(index){
        return this.foodList[index].getCals();
    }

    isEmpty(){
        return (this.count === 0);
    }

    retCount(){
        return this.count;
    }



}

//class for goals
class Goal extends Item {
	constructor(name) {
		super(name);
	}
}

//class for objects representing a day unit of data for User object
class DayData {
	
	constructor(date) {
		if(date instanceof Date) {
			this.date = date.toDateString();
		}
		this.water = 0;
		this.meals = new DailyMeals();
	}
	getMeals(){
		return this.meals;
	}
	
	setWater(val) {
		this.water = val;
		//window.alert("Setting daily water; Day: " + this.date + " Value: "+ val);
	}
	
	getWater() {
		//window.alert("Getting daily water; Day: " + this.date + " Value: "+ this.water);
		return this.water;
	}
	
	incWater() {
		this.water++;
		
	}
	
	decWater() {
		this.water++;
	}
	
	compare(d) {
		if(this.date == d) {
			return true;
		}
		else return false;
	}
	
}

class DailyMeals {
	
	constructor() {
		this.breakfast = new FoodCatList();
		this.lunch = new FoodCatList();
		this.dinner = new FoodCatList();
		this.snacks = new FoodCatList();
	}
	
	add(i,food) {
		if(food instanceof FoodCatItem) {
			if(i==0) {
				this.breakfast.put(food);
			}
			else if (i==1) {
				this.lunch.put(food);
			}
			else if (i==2) {
				this.dinner.put(food);
			}
			else if (i==3) {
				this.snacks.put(food);
			}
		}
	}
}

//class for object containing all of user data
class BigData {
	
	constructor() {
		this.data = new Map();
	}
	
	//takes js Data as parameter, returns DayData object with same date
	//finds in data map or creates new object if none exists for date d
	getDay(d) {
		if(d instanceof Date) {
			let day = d.toDateString();
			if(this.data.has(day)) {
				return this.data.get(day);
			}
			else {
				let date = new DayData(d)
				this.data.set(day,date);
				return this.data.get(day);
			}
		}
	}
	
	setWater(d,val) {
		if(d instanceof Date) {
			let day = d.toDateString();
			if(this.data.has(day)) {
				this.data.get(day).setWater(val);
			}
			else {
				//window.alert("Creating new day + adding water; Day: " + d + " Value: "+ val);
				let date = new DayData(d);
				date.setWater(val);
				this.data.set(day,date);
			}
		}
		else window.alert("Failed to set water value; not a valid date: " + d);
	}
	
	getWater(d) {
		let water, day, dateV;
		water = 0;
		//window.alert("Looking for water data; Day: " + d );
		if(d instanceof Date) {
			dateV = d.toDateString();
			if(this.data.has(dateV)) {
				day = this.data.get(dateV);
				if(day instanceof DayData) {
					water = day.getWater();
					//window.alert("Getting there: " + water);
				}
				else window.alert("bad day data object");
			}
			//else("no data for day: " + dateV);
		}
		else window.alert("Failed to get water value; not a valid date: " + d);
		return water;
	}
	
}

//******************************************************************
// GLOBAL VARIABLES
//******************************************************************

//create array of users + add an initial user 
const users = [];
users.push(new User("User0","realemail@email.com","password","cat"));


//create an empty array that should only have at most 1 user at a time
const currUser = [];

const currDay = [];

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const days = [31,28,31,30,31,30,31,31,30,31,30,31];

let item1 = new FoodCatItem("Pears",30,2,20,0,2);
let item2 = new FoodCatItem("Pomello",30,2,20,0,3);
let item3 = new FoodCatItem("Dragon Fruit",30,2,20,0,6);
let item4 = new FoodCatItem("Grapes",30,2,20,0,3);
let item5 = new FoodCatItem("Melon",30,2,20,0,7);
let item6 = new FoodCatItem("Watermelon",30,2,20,0,5);
let item7 = new FoodCatItem("Pineapple",30,2,20,0,1);
let item8 = new FoodCatItem("Blueberry",30,2,20,0,4);
let item9 = new FoodCatItem("Oranges",30,2,20,0,2);
let item10 = new FoodCatItem("Red Apples",30,2,20,0,3);
let item11 = new FoodCatItem("Green Apples",30,2,20,0,3);
let item12 = new FoodCatItem("Gala Apples",30,2,20,0,3);


const foodList = new FoodCatList();
foodList.put(item1);
foodList.put(item2);
foodList.put(item3);
foodList.put(item4);
foodList.put(item5);
foodList.put(item6);
foodList.put(item7);
foodList.put(item8);
foodList.put(item9);
foodList.put(item10);
foodList.put(item11);
foodList.put(item12);

//******************************************************************
// FUNCTIONS
//******************************************************************

function getCurrUser() {
	if(currUser.length > 1) {
		window.alert("Tried to get current user: Multiple users logged in <('~')> ");
	}
	else if(currUser.length == 0) {
		window.alert("Tried to get current user: No user logged in??");
	}
	else if(currUser[0] instanceof User){
		return currUser[0];
	}
	else {
		window.alert("Tried to get current user: I don't think that's a user logged in??");
	}
}

function setUpUser0() {
	let user, d, day;
	user = users[0];
	for(i=1; i<4; i++) {
		d = new Date(2021,10,i);
		users[0].setWater(d,i%6);
	}
}

//sets the dailyFood page 
//accepts either a Date or a number
//will increment from current date if number is positive, decrement if negative
function getDailyFood(d) {
	let day, lastDay;
	
	if(!(d instanceof Date)) {
		lastDay = document.getElementById('dailyDate').value;
		if(lastDay instanceof Date) {
			day = lastDay;
			if(d>0) {
				day.setDate(lastDay.getDate() + 1);
			}
			else if(d<0) {
				day.setDate(lastDay.getDate() - 1);
			}
		}
	}
	else {
		day = d;
	}
	
	//set the dailyDate element
	if(day instanceof Date) {
		document.getElementById('dailyDate').value = day;
		document.getElementById('dailyDate').innerHTML = day.toDateString();
	}
	
	setUpFoodDivs(currUser[0].userData.getDay(day).meals);
	
}

function setUpFoodDivs(meals) {
	if(meals instanceof DailyMeals) {
		console.log("We are HERE!!");
		$('#breakfastOpt').empty();
		//set up the divs
		if(!meals.breakfast.isEmpty()) {
			let breakList = meals.breakfast;
			let listLen = breakList.retCount();
			let toShow = new Array();
			let todayDate = currDay[0].getDate();
			//console.log(breakList);
			let i;
			for(i = 0; i <listLen; i++){
				if(breakList.getCurrDate(i) === todayDate){
					console.log(breakList.getCurrDate(i));
					toShow.push(breakList.getName(i) + " ~ " + breakList.getCals(i) + " cals" );
				}
			}

			$('#breakfastOpt').empty();
			//if(){
				for(var value of toShow){
					console.log("Shouldn't be here");
					$('#breakfastOpt')
					.append(`<input type="checkbox" id="${value}" onclick="ifCheckedBreak()" name="break-option" value="${value}" />`)
					.append(`<label for="${value}">${value}</label>`)            
					.append(`<br>`);
		
					// I was trying to create a border around the options
					// This is working for now
				   $("label[for='" + value + "']").css(
					{
					"display" : "inline-block",
					"border":"thin solid blue",
					"border-radius" : "5px",
					"background-color": "#1E90FF",// You can change the color here
					"font-size" : "15px"
					});
				}
			//}
			
			//document.getElementById('breakfast').innerHTML = meals.breakfast.getName(0);
			
		}
		$('#lunchOpt').empty();
		if(!meals.lunch.isEmpty()) {
			let lunchList = meals.lunch;
			let listLen = lunchList.retCount();
			let toShow = new Array();
			let todayDate = currDay[0].getDate();
			//console.log(breakList);
			let i;
			for(i = 0; i <listLen; i++){
				if(lunchList.getCurrDate(i) === todayDate){
					toShow.push(lunchList.getName(i) + " ~ " + lunchList.getCals(i) + " cals" );
				}
			}

			$('#lunchOpt').empty();
			for(var value of toShow){
				$('#lunchOpt')
				.append(`<input type="checkbox" id="${value}" onclick="ifCheckedLunch()" name="lunch-option" value="${value}" />`)
				.append(`<label for="${value}">${value}</label>`)            
				.append(`<br>`);
	
				// I was trying to create a border around the options
				// This is working for now
			   $("label[for='" + value + "']").css(
				{
					"display" : "inline-block",
					"border":"thin solid blue",
					"border-radius" : "5px",
					"background-color": "#1E90FF",// You can change the color here
					"font-size" : "15px"
				});
			}
			//document.getElementById('lunch').innerHTML = meals.lunch.getName(0);
			
		}
		$('#dinnerOpt').empty();
		if(!meals.dinner.isEmpty()) {
			let dinnerList = meals.dinner;
			let listLen = dinnerList.retCount();
			let toShow = new Array();

			let todayDate = currDay[0].getDate();
			//console.log(breakList);
			let i;
			for(i = 0; i <listLen; i++){
				if(dinnerList.getCurrDate(i) === todayDate){
					toShow.push(dinnerList.getName(i) + " ~ " + dinnerList.getCals(i) + " cals" );
				}
			}

			$('#dinnerOpt').empty();
			for(var value of toShow){
				$('#dinnerOpt')
				.append(`<input type="checkbox" id="${value}" onclick="ifCheckedDinner()" name="dinne-option" value="${value}" />`)
				.append(`<label for="${value}">${value}</label>`)            
				.append(`<br>`);
	
				// I was trying to create a border around the options
				// This is working for now
			   $("label[for='" + value + "']").css(
				{
					"display" : "inline-block",
					"border":"thin solid blue",
					"border-radius" : "5px",
					"background-color": "#1E90FF",// You can change the color here
					"font-size" : "15px"
				});
			}
			//document.getElementById('dinner').innerHTML = meals.dinner.getName(0);
			
		}
		$('#snacksOpt').empty();
		if(!meals.snacks.isEmpty()) {
			let snacksList = meals.snacks;
			let listLen = snacksList.retCount();
			let toShow = new Array();

			let todayDate = currDay[0].getDate();
			//console.log(breakList);
			let i;
			for(i = 0; i <listLen; i++){
				if(snacksList.getCurrDate(i) === todayDate){
					toShow.push(snacksList.getName(i) + " ~ " + snacksList.getCals(i) + " cals" );
				}
			}

			$('#snacksOpt').empty();
			for(var value of toShow){
				$('#snacksOpt')
				.append(`<input type="checkbox" id="${value}" onclick="ifCheckedSnack()" name="snacks-option" value="${value}" />`)
				.append(`<label for="${value}">${value}</label>`)            
				.append(`<br>`);
	
				// I was trying to create a border around the options
				// This is working for now
			   $("label[for='" + value + "']").css(
				{
					"display" : "inline-block",
					"border":"thin solid blue",
					"border-radius" : "5px",
					"background-color": "#1E90FF", // You can change the color here
					"font-size" : "15px"
				});
			}
			//document.getElementById('snacks').innerHTML = meals.snacks.getName(0);
			
		}
	}
	else {
		window.alert("uh oh");
	}
}


function refresh(){
	if(currUser.length == 1){
		let today = new Date();
		let year = today.getFullYear();
		let month = today.getMonth();
		let day = today.getDate();
		today = new Date(year,month,day)
		currDay.push(today);
		
		document.getElementById('details').innerHTML = "";
		
		let dayHeader = document.createElement('h2');
		dayHeader.innerHTML = today.toDateString();
		document.getElementById('details').appendChild(dayHeader);
		
		getPal('details','palHomeDiv');
		let deetDiv = document.createElement('div');
		deetDiv.innerHTML = currUser[0].details();
		deetDiv.id = "innerDetails";
		document.getElementById("details").appendChild(deetDiv);

		water('homeWater');
	}
	else if(currUser.length > 1) {
		window.alert("Multiple users logged in <('~')> ");
	}
	else {
		window.alert("No user logged in??");
	}
}
//simple function for toggling between elements
function replace(d1,d2) {
	//debugger;
	document.getElementById(d1).hidden = true;
	document.getElementById(d2).hidden = false;
}

//calculates the experience required to complete the level that is the parameter
function levelXp(lvl) {
	let val = 10;
	val += lvl * 5;
	return val;
}

function currPal() {
	if(currUser.length == 1) {
		return currUser[0].getPal();
	}
	else return null;
}

//******************************************************************
// FOOD CATALOG FUNCTIONS
//******************************************************************

const meals = ["breakfast","lunch","dinner","snacks"];
var mealNum = -1;


//hides a div on the page
function unShow(d1){
    document.getElementById(d1).hidden = true;
}

// Shows the "adding custom item" options 
function showAddNew(){
    show('newItem');
    unShow('itemOpt');
    unShow('history');
}



function displayFoodCat(){
    show('searchbar');
    show('history');
	unShow('itemOpt');
    unShow('newItem');

	let actUser = currUser[0];
	let userHist = actUser.getPersonList();

    if(!userHist.isEmpty()){
        
        var toShow =  new Array();
        let listSize = userHist.retCount();
        if(listSize > 10){
            userHist.removeAllItemAfter(10);
        }

        for(var i  = 0; i < listSize; i++){
            if(i <= 10){
                toShow.push(userHist.getName(i) + " ~ " + userHist.getCals(i) + " cals");
            }
        } 

        //console.log(toShow);
        $('#hist').empty();
        for(var value of toShow){
            $('#hist')
            .append(`<input type="checkbox" id="${value}" onclick="ifCheckedHist()" name="histItem" value="${value}" />`)
            .append(`<label for="${value}">${value}</label>`)            
            .append(`<br>`);

            // I was trying to create a border around the options
            // This is working for now
           $("label[for='" + value + "']").css(
			{
			"border":"thin solid purple",
			"border-radius" : "15px",
			"background-color": "violet",
			"font-size" : "25px"
			});
        }
    }else{
        
    }
}
function ifCheckedHist(){
    var searchInput = $('#hist :input[type="checkbox"]');
    var temp = searchInput.closest('#hist').find('input:checked').length;
    if(temp >= 1){
        show('nextHistBtns');
    }else{
        unShow('nextHistBtns');
    }
}

function addReturnHist(){
	getSelectedCheckBoxHist();
	unShow('itemOpt');
	unShow('nextHistBtns');
	replace('foodCat','dailyFood');
	getDailyFood(currDay[0]);
}


//Do the same as add and continue but for history
function addContinueHist(){
    getSelectedCheckBoxHist();
    unShow('itemOpt');
    unShow('nextHistBtns');
    document.getElementById('textSearch').value = "";
    show('history');
    displayFoodCat();
	
}


//Gets the item from the history list 
function getSelectedCheckBoxHist(){
	let actUser = currUser[0];
	let userHist = actUser.getPersonList();
	//For each item checked in the list get the name of the item and
	//return the object of it from food list and then deep copy and store 
	//it into history if its not already in there
    $("[name='histItem']").each(function (index, data){
        var itemName = "";
        if(data.checked){
            var itemNameArr = data.value.split(' ');
            for(var i = 0; i < itemNameArr.length; i++){
                if(itemNameArr[i] === "~"){
                    var len = itemName.length;
                    itemName = itemName.substring(0,len - 1);
                    break;
                }else{
                    itemName += itemNameArr[i] + " ";
                }
            }
            var retItem = retItem = foodList.getItembyName(itemName);
            console.log(retItem);
            var newItem =  new FoodCatItem(retItem.getName(),retItem.getCals(),
            retItem.getProtein(),retItem.getCarbs(),retItem.getFat(),retItem.getQuant());
            console.log(newItem);
            if(!userHist.contains(retItem)){
                userHist.putFirst(newItem);
            }
            newItem =  new FoodCatItem(retItem.getName(),retItem.getCals(),
            retItem.getProtein(),retItem.getCarbs(),retItem.getFat(),retItem.getQuant());
			let today = currDay[0].getDate();
			
			newItem.setCurrDate(today);
			console.log(newItem.getCurrDate());
			let dayDataObj = actUser.userData.getDay(currDay[0]).meals;
			dayDataObj.add(mealNum,newItem);

        }
    });
    //console.log(userHist);
}




// Searches an item from hardcoded list 
function searchItem(){
    unShow('newItem'); //Hide the "add custom item" option if it was shown before
    
    //Get the value searched for
    let item = document.getElementById('textSearch').value;
    var toShow =  new Array();
    var write = document.getElementById('itemOpt');
    document.getElementById('options').innerHTML = "";
	

    if(foodList.containsName(item) && item !== ""){
        show('itemOpt'); // Show the searched item div
        unShow('history'); // Hides the history
        console.log("It worked");
        let listSize = foodList.retCount();  // Size of the (hard coded)food list
        var i; 

        // Adding items that include the name and its cals
        for(var i  = 0; i < listSize; i++){
            if(foodList.getName(i).toUpperCase().includes(item.toUpperCase())){
                toShow.push(foodList.getName(i) + " ~ " + foodList.getCals(i) + " cals");
            }
        }

        //Show all the items that includes what the person searched for
        for(var value of toShow){
            $('#options')
            .append(`<input type="checkbox" id="${value}" onclick="ifChecked()" name="option" value="${value}" />`)
            .append(`<label for="${value}">${value}</label>`)            
            .append(`<br>`);

            // I was trying to create a border around the options
            // This is working for now
           $("label[for='" + value + "']").css(
			{
			"border":"thin solid purple",
			"border-radius" : "15px",
			"background-color": "violet",
			"font-size" : "25px"
			});
        }

        //Clears the error message when a person re enters some item
        document.getElementById('error').innerHTML = "";
        document.getElementById('error').style.color = "transparent";

        //Clears a message if it was there
        document.getElementById('no_item_message').innerHTML = "";
		
		
    }else if(!foodList.containsName(item) && item !== ""){
        show('itemOpt');
        errorMsg('error','textSearch');
        document.getElementById('no_item_message').innerHTML = "Sorry we don't have that in the list but would you like to add it";
    }else{ // Error messages
        unShow('itemOpt');
        errorMsg('error','textSearch');
    }
}


function addReturn(){
	getSelectedCheckBox();
	
	unShow('itemOpt');
	unShow('nextBtns');
	replace('foodCat','dailyFood');
	getDailyFood(currDay[0]);

}

// Gets shows the food catalog screen again to add more items
function addContinue(){
    getSelectedCheckBox();
    // Hide options so person can search again
    unShow('itemOpt');
    unShow('nextBtns');

    //Clear the search bar
    document.getElementById('textSearch').value = ""; 
    //Shows the history
    show('history');
    displayFoodCat(); // "Re-loads" the food catalog page
	$('#options').empty();
}

function addtoDay(mealNum,day){
	
}

function ifChecked(){
    var searchInput = $('#options :input[type="checkbox"]');
    var temp = searchInput.closest('#options').find('input:checked').length;
    if(temp >= 1){
        show('nextBtns');
    }else{
        unShow('nextBtns');
    }
}



// Get the items seleceted with the check box
function getSelectedCheckBox(){
	let actUser = currUser[0];
	let userHist = actUser.getPersonList();
	//For each item checked in the list get the name of the item and
	//return the object of it from food list and then deep copy and store 
	//it into history if its not already in there
    $("[name='option']").each(function (index, data){
        var itemName = ""; //Reset the string
        if(data.checked){
            // Array of the all items checked one by one
            var itemNameArr = data.value.split(' ');

            // Process the list so we only get the name from the list string
            for(var i = 0; i < itemNameArr.length; i++){
                if(itemNameArr[i] === "~"){
                    var len = itemName.length; 
                    itemName = itemName.substring(0,len - 1);
                    break;
                }else{
                    itemName += itemNameArr[i] + " ";
                }
            }
            //Get the object of type foodCatItem use the string name
            var retItem = foodList.getItembyName(itemName);
            //console.log(retItem);  for testing 
            //console.log(retItem.getName()); for testing
            var newItem =  new FoodCatItem(retItem.getName(),retItem.getCals(),
            retItem.getProtein(),retItem.getCarbs(),retItem.getFat(),retItem.getQuant());
            //console.log( newItem); for testing

            //If it is not in the history list then add it
            if(!userHist.contains(retItem)){
                userHist.putFirst(newItem);
            }

            newItem =  new FoodCatItem(retItem.getName(),retItem.getCals(),
            retItem.getProtein(),retItem.getCarbs(),retItem.getFat(),retItem.getQuant());
			let today = currDay[0].getDate();
			
			newItem.setCurrDate(today);
			console.log(newItem.getCurrDate());
			let dayDataObj = actUser.userData.getDay(currDay[0]).meals;
			dayDataObj.add(mealNum,newItem);
            
        }
    });
    //console.log(historyList); for testing
}

// Adds a new item into the list once the user clicks "ADD"
function addNewItem(){
    //Gets the values from each of the text box
    var itemName = document.getElementById('itemName').value;
    var calories = parseFloat(document.getElementById('calories').value);
    var protein = parseFloat(document.getElementById('protein').value);
    var carbs = parseFloat(document.getElementById('carbs').value);
    var fat = parseFloat(document.getElementById('fat').value);
    var quantity = parseFloat(document.getElementById('quantity').value);

    //Make a FoodCatItem with the user added item properties
    var newItem = new FoodCatItem(itemName,calories,protein,carbs,fat,quantity);
    foodList.put(newItem); // Add the item into the listl

    document.getElementById('itemName').value = "";
    document.getElementById('calories').value = "";
    document.getElementById('protein').value = "";
    document.getElementById('carbs').value = "";
    document.getElementById('fat').value = "";
    document.getElementById('quantity').value = "";

}

function getFoodCat(meal) {
	// To let the user know what meal they are adding to
	let str;
	str = "Adding to ";
	str += meals[meal] + " for ";
	str += document.getElementById('dailyDate').innerHTML;
	replace('dailyFood','foodCat');
	document.getElementById('currFoodCat').innerHTML = str;
	mealNum = meal;

	displayFoodCat();
	var x = document.getElementById('textSearch');
	//console.log(x);
	x.value = "";


}



function errorMsg(div1,div2){
    var error = document.getElementById(div1);
    if(document.getElementById(div2).value === ""){
        error.textContent = "Please enter a item to search for";
        error.style.color = "red";
    }else{
        error.textContent = "";
    }
}


function show(d1){
	document.getElementById(d1).hidden = false;
}

function unblock(d1){
    var e = document.getElementById(d1);
   if(e.style.display == 'block'){
      e.style.display = 'none';
   }else{
      e.style.display = 'block';
   }
}

//******************************************************************
// FORM FUNCTIONS
//******************************************************************
function quickLogin() {
	if(currUser.length > 1) {
		window.alert("at least one user already logged in?? <('~')> ");
	}
	else {
		setUpUser0();
		currUser.push(users[0]);
		refresh();
	}
}

function logout() {
	if(currUser.length == 1) {
		currUser.pop();
		clearWater('homeWater');
	}
	else if(currUser.length > 1) {
		window.alert("Multiple users logged in <('~')> ");
	}
	else {
		window.alert("No user logged in??");
	}
}
	

//Function to handle the sign-in form from the signIn "page"
//calls helperFunction validUser to check username + password against existing users
//if validUser returns true, changes to the homescreen
function signInHandler() {
	//get the values from the form
	let uname = document.forms["signInForm"]["uname"].value;
	let pw = document.forms["signInForm"]["pw"].value;
	
	if(validUser(uname, pw)){
		replace('signIn','homeScreen');
	}

	//clears the form fields since we aren't using the regular onsubmit function	
	document.forms["signInForm"]["uname"].value = "";
	document.forms["signInForm"]["pw"].value = "";
}

//helper function for the signInHandler() function
//if username + password are valid, pushes user onto currUser array, sets userDetails up + returns true
function validUser(uname, pw) {
	for(let i=0; i<users.length; i++) {
		if(users[i].username == uname) {
			if(users[i].passw == pw){
				currUser.push(users[i]);
				return true;
			}
			else {
				window.alert("Incorrect password.");
				return false;
			}
		}
		else {
			window.alert("User: " + uname + " was not found." );
			return false;
		}
	}	
}

//handles to instant compare of the 2 passwords
function check() {
    if (document.getElementById('password').value ==
      document.getElementById('passwordRepeat').value) {
      document.getElementById('message').style.color = 'green';
      document.getElementById('message').innerHTML = 'Passwords match.';
    } else {
      document.getElementById('message').style.color = 'red';
      document.getElementById('message').innerHTML = 'Passwords not matching';
    }
}


//function called by the actDetails form
function actDataHandler() {
	//check data in the form is valid, create user object
	//push new user onto the currUser array
	
	let uname = document.forms["actDetails"]["uname"].value;
	let pw = document.forms["actDetails"]["psw"].value;	
	let email = document.forms["actDetails"]["email"].value;	
	
	let newUser = new User(uname, email, pw, getSelection());
	users.push(newUser);
	currUser.push(newUser);
	
	replace('actDetails', 'userDetails');
}

//function called by the userDetails form
function userDataHandler() {
	let height, weight, sex, bday, user, lvl, hUnit, wUnit;
	//debugger;
	user = currUser[0];

	hUnit = document.forms["userDetailsForm"]["cms"].checked;
	if(hUnit) {
		height = document.forms["userDetailsForm"]["heightcm"].value;
	}
	else {
		var ft = document.forms["userDetailsForm"]["heightft"].value;
		var ins = document.forms["userDetailsForm"]["heightin"].value;
		height = ((ft*12) + ins) * 2.54;
	}
	
	wUnit = document.forms["userDetailsForm"]["kgs"].checked;
	if(wUnit) {
		weight = document.forms["userDetailsForm"]["weight"].value;
	}
	else {
		weight = document.forms["userDetailsForm"]["weight"].value / 2.205;
	}
	sex = document.forms["userDetailsForm"]["gender"].value;
	bday = document.forms["userDetailsForm"]["age"].value;
	lvl = document.forms["userDetailsForm"]["activityLvl"].value;
	
	user.setHeight(height);
	user.setWeight(weight);
	if(sex == "Male") {
		user.setMale(true);
	}
	user.setBdate(bday);
	user.setActiveLvl(lvl);
	
	replace('userDetails','userDetails2');
	document.getElementById('test').innerHTML = bday;
	//add data from the form to new user object
}

function userDataHandler2() {
	let weight, wUnit, goal;
	
	goal = document.forms["userDetailsForm2"]["maintainW"].checked;
	if(goal) {
		currUser[0].setGoal(0);
		currUser[0].setGoalWeight(currUser[0].getWeight());
	}
	else {
		goal = document.forms["userDetailsForm2"]["loseW"].checked;
		if(goal) {
			currUser[0].setGoal(-1);
		}
		else currUser[0].setGoal(1);
		
		wUnit = document.forms["userDetailsForm2"]["kgsG"].checked;
		if(wUnit) {
			weight = document.forms["userDetailsForm2"]["goalWeight"].value;
		}
		else {
			weight = document.forms["userDetailsForm2"]["goalWeight"].value / 2.205;
		}
		currUser[0].setGoalWeight(weight);
	}
	replace('userDetails2','homeScreen');
}

function checkReqs(){
	if(document.getElementById('cm').hidden == true) {
		replaceReqFt();
	}
	else if(document.getElementById('cm').hidden == false) {
		replaceReqCm();
	}
}

//simple function for toggling between elements, used for height and weight units to fix required
function replaceReqFt() {
	document.getElementById("heightcm").required = false;
	document.getElementById("heightft").required = true;
	document.getElementById("heightin").required = true;
}

function replaceReqCm() {
	document.getElementById("heightft").required = false;
	document.getElementById("heightin").required = false;
	document.getElementById("heightcm").required = true;
}

function swapUnit(str,id) {
	document.getElementById(id).placeholder = str;
}

function getGoalWeight(val) {
	if(val) {
		document.getElementById('goalWeightDiv').disabled = false;
		document.getElementById("goalWeight").required = true;
	}
	else {
		document.getElementById('goalWeightDiv').disabled = true;
		document.getElementById("goalWeight").required = false;
	}
}

//******************************************************************
// SHOP FUNCTIONS
//******************************************************************


function setUpWardrobe() {
		buyItem("blush.jpg");
		buyItem("sparkles.jpg");
		displayWardrobeItems();
	}
	
	function setUpShop() {
		
	}
	
function setShopPal() {
	clearShopPal();
	getPal('palDisplay','shopPal');
	let deetDiv = document.createElement('div');
	deetDiv.innerHTML = currUser[0].details();
	deetDiv.id = "innerDetails";
	deetDiv.appendChild(document.createElement('br'));
	document.getElementById("palDisplay").appendChild(deetDiv);
}

function clearShopPal() {
	document.getElementById('palDisplay').innerHTML = "";
}
	
	function openShop() { 
		replace('homeScreen','shop');
		document.getElementById("defaultOpen").click();
		setShopPal();
		displayShopItems();
		
		// Get all elements with class="tabVerticalcontent" and hide them
		tabVerticalcontent = document.getElementsByClassName("tabVerticalcontent");
		for (i = 0; i < tabVerticalcontent.length; i++) {
			tabVerticalcontent[i].style.display = "none";
		}
  
		// Get all elements with class="tablinks" and remove the class "active"
		tablinks2 = document.getElementsByClassName("tablinks2");
		for (i = 0; i < tablinks2.length; i++) {
			tablinks2[i].className = tablinks2[i].className.replace(" active", "");
		}
	}
	
	function openCloset() {
		replace('homeScreen','shop');
		document.getElementById("closetView").click();
		setShopPal();
		// Get all elements with class="tabVerticalcontent" and hide them
		tabVerticalcontent = document.getElementsByClassName("tabVerticalcontent");
		for (i = 0; i < tabVerticalcontent.length; i++) {
			tabVerticalcontent[i].style.display = "none";
		}
  
		// Get all elements with class="tablinks" and remove the class "active"
		tablinks2 = document.getElementsByClassName("tablinks2");
		for (i = 0; i < tablinks2.length; i++) {
			tablinks2[i].className = tablinks2[i].className.replace(" active", "");
		}
		
	}

//function for switching between shop + closet
function changeTab(evt, tabName) {
	// Declare all variables
	var i, tabcontent, tablinks, curr;
  
	// Get all elements with class="tabcontent" and hide them
	tabcontent = document.getElementsByClassName("tabcontent");
	for (i = 0; i < tabcontent.length; i++) {
	  tabcontent[i].style.display = "none";
	  if(tabcontent[i].id == tabName) {
		  tabcontent[i].style.display = "grid";
	  }
	}
  
	// Get all elements with class="tablinks" and remove the class "active"
	tablinks = document.getElementsByClassName("tablinks");
	for (i = 0; i < tablinks.length; i++) {
	  tablinks[i].className = tablinks[i].className.replace("active", "");
	}
  
	// Show the current tab, and add an "active" class to the button that opened the tab
	curr = document.getElementById(tabName);
	curr.style.display = "block";
	evt.currentTarget.className += " active";

}

//function for switching shop/wardrobe categories
function openCategory(evt, categoryName) {
	// Declare all variables
	var i, tabVerticalcontent, tablinks2;
  
	// Get all elements with class="tabVerticalcontent" and hide them
	tabVerticalcontent = document.getElementsByClassName("tabVerticalcontent");
	for (i = 0; i < tabVerticalcontent.length; i++) {
	  tabVerticalcontent[i].style.display = "none";
	}
  
	// Get all elements with class="tablinks" and remove the class "active"
	tablinks2 = document.getElementsByClassName("tablinks2");
	for (i = 0; i < tablinks2.length; i++) {
	  tablinks2[i].className = tablinks2[i].className.replace(" active", "");
	}
  
	// Show the current tab, and add an "active" class to the link that opened the tab
	document.getElementById(categoryName).style.display = "grid";
	evt.currentTarget.className += " active";
}

//******************************************************************
// CALENDAR FUNCTIONS
//******************************************************************
//takes a year and returns true if it's a leap year or false
function leapYear(yr) {
	result = false;
	if(yr % 4 == 0) {
		if(yr % 100 == 0) {
			if(yr % 400 == 0) {
				result = true;
			}				
		}
		else result = true;
	}
	return result;
}

//sets the calendar page based on the current value of the form
function setCalendar() {
	let dateVal;
	dateVal = document.forms["calendarSelect"]["calendarMonth"].value;
	//document.getElementById('calendarDate').innerHTML = dateVal;
	
	month = dateVal.substring(5,7);
	m = month.valueOf();
	year = dateVal.substring(0,4);
	yr = year.valueOf();
	
	//send month-1 to account for javascript Date handling of numbering
	getCalendar(new Date(yr,m-1,1));
	
}

//takes parameter nxt, boolean: true to increment month, false to decrement
//used for calendar pages next/prev buttons
function nextCalendar(nxt) {
	let dateVal, date, month, m, year, yr;
	
	dateVal = document.forms["calendarSelect"]["calendarMonth"].value;
	//document.getElementById('calendarDate').innerHTML = " "+ dateVal +" ";
	
	//date = new Date(dateVal);
	//document.getElementById('calendarDate').innerHTML += " "+ date +" ";	
	
	month = dateVal.substring(5,7);
	m = month.valueOf();
	//document.getElementById('calendarDate').innerHTML += "this:"+month+"that:"+m;
	//month++;
	
	year = dateVal.substring(0,4);
	yr = year.valueOf();
	//document.getElementById('calendarDate').innerHTML += " "+ month +" " + yr + " ";
	
	if(nxt) {
		if(m > 11) {
			m = 1;
			yr = yr - (-1);
		}
		else m = m - (-1);
	}
	else {
		if(m == 1) {
			m = 12;
			yr = yr -1;
		}
		else m = m - 1;
	}
	
	year = yr.toString();
	if(m<10) {
		month = '0'+m;
	}
	else {
		month = m.toString();
	}
	dateVal = year.concat("-",month);
	
	//document.getElementById('calendarDate').innerHTML += " Month:"+ month +" ";
	
	date = new Date(yr, m-1,1);
	//document.getElementById('calendarDate').innerHTML += date.toISOString();
	document.forms["calendarSelect"]["calendarMonth"].setAttribute("value", dateVal);
	
	getCalendar(date);
}

//sets up the buttons on the calendar page (class 'dayButton') to represent the month of the parameter d 
//should be a js Date of the first day of the month (need to know which day of the week to start at)
function getCalendar(d) {
	if(d instanceof Date) {
		
		let day, start, arr, dayArr, yr, month, dateVal,datesArr;
		
		//create an array that will be filled with js date objects for each day represented in the calendar
		datesArr = [];
		
		//get important values from the js Date parameter in order to populate datesArr in the loop
		month = d.getMonth(); //from 0-11
		yr = d.getFullYear(); 
		day = d.getDay(); //from 0-6
		
		//calls helper function to get the day of the week of the first day of this month/yr
		//returns either 35 or 42 days in order to show the full month
		dayArr = getDates(day,month,yr);
		
		//start one month earlier for the datesArr
		month = month-1;
		
		//get a list of all the calendar buttons
		arr = document.getElementsByClassName('dayButton');
		
		//loop through all the numbers from dayArr and set the numbers in the buttons 
		//also populates the datesArr which is used to set up the event listeners after the loop
		for(let i=0; i<dayArr.length; i++) {
			day = dayArr[i];
			arr.item(i).innerHTML = day;
		
			//increase the month and date values if new month
			if(day == 1) {
				if(month > 11) {
					month = 0;
					yr++;
				}
				else month += 1;
			}
			dateVal = new Date(yr,month,day);
			datesArr.push(dateVal);
			
		}	
		
		updateWaterBars(datesArr);
		
		//call the helper function to add the event listeners
		setUpClicks(datesArr);
	}
}


//helper function for get calendar returns array of numbers representing dates for the calendar buttons
//returns exactly enough numbers for 5 or 6 weeks (7 days each), the minimum to show all the days of the month
//adds upto 6 days at the beginning + ends of the arr to make the required amount
//ALSO: fidgets with the css of the last button container in the calendar
//parameter: 
//	day [0,6] representing starting day of the month
//	month [0,11] current month, to display in full
// 	yr ~ integer to check if it's a leap year
function getDates(day,month,yr) {
	//checks for valid parameters, will do a window alert if it fails
	if(Number.isInteger(day) && Number.isInteger(month) && Number.isInteger(yr)) {
		let result,val;
		result = [];
		//for month not starting on sunday, add last dates for prev month to result, then reverse it
		if(day > 0) {
			if(month == 0) {
				val = days[11];
			}
			else val = days[month-1];
		
			if(val == 28 && leapYear(yr)) {
				val++;
			}
			for(let i=0; i<day; i++) {
				result.push(val-i);
			}
			result.reverse();
		}	
	
		//add all dates for this month
		val = days[month];
		if(val == 28 && leapYear(yr)) {
			val++;
		}
		for(let j=0; j<val; j++) {
			result.push(j+1);
		}
	
		//add first dates of next month if needed
		val = result.length % 7; 
		if(val != 0) {
			for(let k=0; k<(7-val); k++) {
				result.push(k+1);
			}
		}
	
		//check total number of weeks to display
		val = result.length / 7;
		if(val == 5) {
			document.getElementById('lastWeek').style.display = "none";
		}
		else if(val == 6) {
			document.getElementById('lastWeek').style.display = "inline-block";
		}
		return result;
	}
	else {
		window.alert("Something has gone wrong while trying to initialize the calendar, here's what we tried: Day: " + day + " Month: " + month + " Year: " + yr);
	}
}

//helper function for getCalendar, adds event listeners for the buttons so they'll open the right dailyfood page
function setUpClicks(dayArr) {
	let arr, day;
	arr	= document.getElementsByClassName('dayButton');
	for(let i=0; i<dayArr.length; i++) {
		day = dayArr[i];
		arr.item(i).setAttribute("value",day.toDateString());
		arr.item(i).addEventListener("click", handleCalClick, false);
	}
}

//event handler function for calendar buttons
function handleCalClick(evt) {
	let date = evt.currentTarget.getAttribute("value");
	document.getElementById('dailyDate').innerHTML = date;	
	date = new Date(date);
	if(date instanceof Date) {
		replace('calendar','dailyFood');
		getDailyFood(date);
	}
}



function updateWaterBars(days) {
	let day, arr, val;
	arr = document.getElementsByClassName('level');
	let arr2 = [];
	
	for(let i=0; i<days.length; i++) {
		day = days[i];
		val = currUser[0].getWater(day);
		//window.alert("Get user water; User: " + currUser[0].username + " Day: " + day + " Value: "+ val);
		arr2.push(val);
		val = 87 - ((val/5) * 87);
		arr.item(i).style.height = val + "px";	
	}
	//document.getElementById('calendarDate').innerHTML = arr2;
}

//toogle function for adding friend
function myFriend(){
	var x = document.getElementById("myfriendDIV");
    if (x.style.display === "none") {
		x.style.display = "block";
	  } else {
		x.style.display = "none";
	  }
  
}

//Function to add friend to list
function addUser(){
	var txtVal = document.getElementById('friendName').value;
	var check = false;
	
	for(let i=0; i < a.length; i++){
		
		if(txtVal === a[i]){
			
			check = true;
			
			listNode = document.getElementById('list'),
			liNode = document.createElement("li"),
			txtNode = document.createTextNode(txtVal);

			liNode.appendChild(txtNode);
			listNode.appendChild(liNode);
			a.splice(i,1);
		}
	}   

	if(check == false || txtVal == "" ){
		if(txtVal == ""){
			text1 = "Please enter user details...";
		}else{
			text1 = "User not Found, Please re-check spelling...";
		}
		document.getElementById("alert").innerHTML = text1;
		document.getElementById("alert").style.display = "block"; 
	}else{
		document.getElementById("alert").style.display = "none"; 
	}
	
}

//Goals tab function
function openGoals(evt, Goalmenu) {
	var i, tabcontent, tablinks;
	tabcontent = document.getElementsByClassName("goaltabcontent");
	for (i = 0; i < tabcontent.length; i++) {
	  tabcontent[i].style.display = "none";
	}
	tablinks = document.getElementsByClassName("tablinks");
	for (i = 0; i < tablinks.length; i++) {
	  tablinks[i].className = tablinks[i].className.replace(" active", "");
	}
	document.getElementById(Goalmenu).style.display = "block";
	evt.currentTarget.className += " active";
  }