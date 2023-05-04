
const friendPal1 = "friend-pal-01.png", friendPal2 = "friend-pal-02.png", friendPal3 = "friend-pal-03.png";

class Friend {
	
	constructor(username,email,level,dailyProgress, pal) {
		this.username = username;
		this.email = email;
		this.level= level;
		this.dailyProgress = dailyProgress;
		this.pal = pal;
	}
	
	toElement(id) {
		let div, img, inner, hover;
		div = document.createElement('div');
		div.className = "friendDiv";
		div.innerHTML = "<p>" + this.username + "</p>";
		
		inner = document.createElement('div');
		inner.className = "friendInsideDiv";
		
		img = document.createElement('img');
		img.src = this.pal;
		img.className = "friendPalImg";
		
		hover = document.createElement('div');
		hover.innerHTML = "<p>Level: " + this.level + "</p>";
		hover.className = "friendHover";
		
		hover.appendChild(img);
		inner.appendChild(hover);
		
		div.appendChild(inner);
		document.getElementById(id).appendChild(div);
	}
}
	

let addedFriends = [];
let afriend = new Friend("Superman","s@m.com",21,20,friendPal1);
let bfriend = new Friend("Spiderman","spidey@m.com",42,60,friendPal2);
let cfriend = new Friend("Ironman","i@m.com",14,0,friendPal3);
addedFriends.push(afriend,bfriend,cfriend);


let level = addedFriends;

function getFriendPage() {
	showFriends();
	reorderDaily();

    setUpBoardLeft();
    reorderLevel();
    setUpBoardRight();
}

function showFriends(){

	for(let i = 0; i<addedFriends.length;i++){
		addedFriends[i].toElement("friendGraphs");
	}

}

function reorderDaily(){

    addedFriends.sort(function(aFriend, bFriend){return bFriend.dailyProgress - aFriend.dailyProgress});

}

function reorderLevel(){
	level.sort(function(aFriend, bFriend){return bFriend.level-aFriend.level});
}


//doesn't work :(
function setUpBars(val) {
	if(val instanceof Friend) {
        var name = document.createElement('name');
		var div = document.createElement('div');
        div.role="progressbar";
		// alert(val.dailyProgress);
        div.style = "--value:"+ val.dailyProgress;
    
	    name.innerHTML = val.username;
        //div.appendChild(name);
        document.getElementById('friendGraphs').appendChild(name);
        document.getElementById('friendGraphs').appendChild(div);
	}
}

function setUpBoardLeft(val) {
for(var i = 0; i<addedFriends.length;i++){
    var tr = document.createElement('tr');
    var th = document.createElement('th');
   // var th2 = document.createElement('th2');
    var nameL = document.createElement('nameL');
   // var nameR = document.createElement('nameR');
    nameL.innerHTML = i + ") " + addedFriends[i].username + " (" + addedFriends[i].dailyProgress + ")";
  //  nameR.innerHTML = level[i].username + " ("+ level[i].level + ")";
    th.appendChild(nameL);
  //  th2.appendChild(nameR);
    tr.appendChild(th);
  //  tr.appendChild(th2);
    document.getElementById('boardLeft').appendChild(tr);


}
}

function setUpBoardRight(val) {
    for(var i = 0; i<addedFriends.length;i++){
        var tr = document.createElement('tr');
        //var th = document.createElement('th');
        var th2 = document.createElement('th2');
        //var nameL = document.createElement('nameL');
        var nameR = document.createElement('nameR');
       // nameL.innerHTML = i + ") " + addedFriends[i].username + " (" + addedFriends[i].dailyProgress + ")";
       nameR.innerHTML = level[i].username + " ("+ level[i].level + ")";
       // th.appendChild(nameL);
       th2.appendChild(nameR);
        //tr.appendChild(th);
       tr.appendChild(th2);
        document.getElementById('boardRight').appendChild(tr);
    
    
    }
}