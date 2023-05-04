
//******************************************************************
// CLASSES
//******************************************************************

// defines the user object class
class ShopItem {
	
	constructor(filename,levelUnlock, price, bought, locked, name) {
		this.filename = filename;
		this.levelUnlock = levelUnlock;
        this.price = price;
		this.bought = bought;
        this.locked = locked;
		this.name = name;
	}

	toString() {
		let str = this.filename + " " + this.levelUnlock + " " + this.bought;
		return str;
	}
	
	//takes a number and unlocks, used when user levels up to unlock the correct items
	checkUnlock(num) {
		if (num==this.levelUnlock) {locked = false;}
	}
	
    //check if user can afford
    checkPrice(num) {
        if(this.price>num){
			window.alert("You need " + ((this.price)-num).toString() + " more coins to afford this item.");
			return false;
		}
		else return true;
    }

	//marks the item as bought
	buyItem() {
		this.bought = true;
	}

}

//******************************************************************
// GLOBAL VARIABLES
//******************************************************************
//const shopItems = ['blush.jpg', "bunnyhat.jpg", "sparkles.jpg",'blush.jpg', "bunnyhat.jpg", "sparkles.jpg", 'blush.jpg', "bunnyhat.jpg", "sparkles.jpg"] ;
//const shopItems = ['blush.jpg', "bunnyhat.jpg", "sparkles.jpg",'blush.jpg', "bunnyhat.jpg", "sparkles.jpg", 'blush.jpg', "bunnyhat.jpg", "sparkles.jpg"] ;
let a = new ShopItem("blush.jpg", 0, 100, false, false, "Blush");
let b = new ShopItem("bunnyhat.jpg", 0, 100, false, false, "Bunny hat");
let c = new ShopItem("sparkles.jpg", 0, 100, false, false, "Sparkles");
let d = new ShopItem("blush.jpg", 1, 150, false, true, "Fancy blush");
let e = new ShopItem("bunnyhat.jpg", 1, 150, false, true, "Fancy bunny hat");
let f = new ShopItem("sparkles.jpg", 1, 150, false, true, "Fancy sparkles");

const itemsArr = [a,b,c,d,e,f];
//const shopItems = [a.filename, b.filename, c.filename, d.filename, e.filename, f.filename];
const shopItems = new Set();

let userCoin = 200;

function addToShop(val) {
	if(val instanceof ShopItem) {
		shopItems.add(val);
	}
}

itemsArr.forEach(addToShop);

//alert(a.filename);
//shopItems[0] = new Image();
//shopItems[0].src = 'blush.jpg';

//shopItems.push('blush.jpg','bunnyhat.jpg', 'sparkles.jpg');

const wardrobeItems = new Set();

function displayShopItems() {
  //  alert(shopItems.length.toString());
	shopItems.forEach(setUpShop);
}

function setUpShop(val) {
	if(val instanceof ShopItem) {
		var div = document.createElement('div');
		var img = document.createElement('img');
		var info = document.createElement('p');
		var buy = document.createElement('button');
	
		buy.type = "button";
		buy.innerHTML = "Buy";
		buy.onclick = function() {
			if(val.checkPrice(userCoin)==true){
			buyItem(val);}
		}
	
		div.className = "storeItemDiv";
		
        img.src = val.filename;
        
		//alert(shopItems[i].toString());
        img.style.width = "90%";
        
		if(val.locked == true) {
			info.innerHTML = val.name + "<br>" + "Unlocked at level " + val.levelUnlock;
            img.style.filter = "grayscale(100%)"
			div.appendChild(info);
			div.appendChild(img)
        }
		else{
			info.innerHTML = val.name + "<br>" + "Coins: " + val.price;	
			div.appendChild(info);
			div.appendChild(img);
			div.appendChild(buy);
		}
        document.getElementById('Accessories').appendChild(div);
	}
}

function deleteShop(){
	var div = document.getElementById('Accessories');
		while (div.firstChild) {
			div.removeChild(div.firstChild);
		}
}

function displayWardrobeItems() {
	//alert(wardrobeItems.length);
    wardrobeItems.forEach(setUpWardrobe);
}

function setUpWardrobe(val) {
	if(val instanceof ShopItem) {
		var div = document.createElement('div');
        var img = document.createElement('img');
		var info = document.createElement('p');
		
		info.innerHTML = val.name;
        img.src = val.filename;
        //alert(wardrobeItems[i].toString());
        img.style.width = "100%";
		
		div.appendChild(info);
		div.appendChild(img);
		
        document.getElementById('WAccessories').appendChild(div);
	}
}

function deleteWardrobe(){
	var div = document.getElementById('WAccessories');
		while (div.firstChild) {
			div.removeChild(div.firstChild);
		}
}

function buyItem(item) {
	if(item instanceof ShopItem) {
		item.buyItem();
		deleteShop();
		deleteWardrobe();
		shopItems.delete(item);
		wardrobeItems.add(item);
		displayShopItems();
		displayWardrobeItems();
		userCoin=userCoin-item.price;
		alert(userCoin);
	}
}