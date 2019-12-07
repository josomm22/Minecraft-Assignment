//Adding theme
window.addEventListener('load', function(){
    var newAudio = document.getElementById('audio');
    newAudio.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
    }, false);
    newAudio.play();
});

//Start button
document.getElementById("btn").addEventListener("click", function(){
	document.getElementById("main").classList.remove("hidden"),
	document.getElementById("game-explain").classList.add("hidden");
 });


createGrid();

let items = {
    rocks: (createLeaves('R08C02')).concat(createLeaves('R08C15')),
    wood: ['R08C05', 'R09C05', 'R10C05'],
    leaves: createLeaves('R11C05'),
    cloud: (createLeaves('R15C09')).concat(createLeaves('R14C12')),
    water: [],
};
function createGrid() {
    let rows = 17;
    let columns = 20;
    for (let r = 0; r <= rows; r++) {
        rowDiv = $('<div/>').attr('class', 'row');
        for (let c = 0; c <= columns; c++) {
            rowNum = ("0" + r).slice(-2);
            colNum = ("0" + c).slice(-2);
            if (r < 7) {
                colDiv = $('<div/>').attr('class', 'block dirt');
            }
            else if (r === 7) {
                colDiv = $('<div/>').attr('class', 'block grass');

            }
            else {
                colDiv = $('<div/>').attr('class', 'block');
            }
            colDiv.attr('id', `R${rowNum}C${colNum}`)
            rowDiv.append(colDiv)

        }
        $('.container').prepend(rowDiv);
    }
};

function idToPoints(id) {
    let x = parseInt(id.slice(1, 3));
    let y = parseInt(id.slice(4));
    return [x, y];
};
function pointsToId(arr) {
    row = arr[0];
    col = arr[1];
    rowNum = ("0" + row).slice(-2);
    colNum = ("0" + col).slice(-2);
    return (`R${rowNum}C${colNum}`)
};

class Tool {
    constructor(type, target, htmlEl) {
        this.type = type;
        this.target = target;
        this.htmlEl = htmlEl;
    }
};

const axeTool = document.getElementById("axe");
const shovelTool = document.getElementById("shovel");
const pickaxeTool = document.getElementById("pickaxe");

//create instances of Tool
let axe = new Tool("axe", ["wood", "leaves"], axeTool);
let shovel = new Tool("shovel", ["dirt", "grass"], shovelTool);
let pickaxe = new Tool("pickaxe", ["rocks"], pickaxeTool);
let toolbox = [axe, shovel, pickaxe];

const allBlocks = document.getElementsByClassName('block');
let tilesArray = ['dirt', 'grass', 'rocks', 'wood', 'leaves'];
let inventorySelected = false;
let selectedTool = pickaxe; //default tool

function activeToolBg(selectedTool) {
    for (i = 0; i < toolbox.length; i++) {
        if (toolbox[i].type === selectedTool.type) {
            toolbox[i].htmlEl.classList.add('bg-blue');
        } else {
            toolbox[i].htmlEl.classList.remove('bg-blue');
        }
    }
};

toolbox.forEach(tool => tool.htmlEl.addEventListener('click', function(){
	selectedTool = tool;
	activeToolBg(selectedTool);	
}));

function flashBgRed() {
    $(`#${selectedTool.type}`).toggleClass('bg-red');
};

const rockHtml = document.getElementById('inventory-rock');
const dirtHtml = document.getElementById('inventory-dirt');
const grassHtml = document.getElementById('inventory-grass');
const leavesHtml = document.getElementById('inventory-leaves');
const woodHtml = document.getElementById('inventory-wood');
const invItems = document.getElementsByClassName("inventory");

class Inventory {
	constructor(type, htmlEl) {
		this.type = type;
		this.htmlEl = htmlEl;
		this.count = 0;
	}
}

let invRock = new Inventory("rocks", rockHtml);
let invDirt = new Inventory("dirt", dirtHtml);
let invGrass = new Inventory("grass", grassHtml);
let invLeaves = new Inventory("leaves", leavesHtml);
let invWood = new Inventory("wood", woodHtml);
let inventoryList = [invRock, invDirt, invGrass, invLeaves, invWood];
isInventoryActive = false;
selectedInventory = "";

inventoryList.forEach(invItem => invItem.htmlEl.addEventListener('click', function(){
    if(isInventoryActive) {
        isInventoryActive = false;
        invItem.htmlEl.classList.remove('active');
    } else {
        if (invItem.count > 0) {
            selectedInventory = invItem;
            isInventoryActive = true;		
            activeInventory(selectedInventory);
        }
    }
}));

function increaseInventory(element) {
	for (i = 0; i < inventoryList.length; i++) {
		if(inventoryList[i].type === element) {
            inventoryList[i].htmlEl.classList.add(element);
			++inventoryList[i].count;
			inventoryList[i].htmlEl.innerText = inventoryList[i].count;
		}
	}
};

function minusInventory () {
    --selectedInventory.count;
    
	if (selectedInventory.count === 0) {
        selectedInventory.htmlEl.innerHTML = "";
        selectedInventory.htmlEl.classList.remove(selectedInventory.type);
        selectedInventory.htmlEl.classList.remove('active');
        isInventoryActive = false;
	} else {
		selectedInventory.htmlEl.innerHTML = selectedInventory.count;
	}
}

function unselectInventories(){
	inventoryList.forEach(item => function(){
		item.htmlEl.classList.remove('active');
	});
}

function activeInventory(selectedInventory) {
	for(i = 0; i < inventoryList.length; i++){
		if (inventoryList[i].type === selectedInventory.type) {
			inventoryList[i].htmlEl.classList.add('active');
		} else {
			inventoryList[i].htmlEl.classList.remove('active');
		}
	}
}

function takeTileOut(tileID) {
    const targetTile = document.getElementById(tileID);
    let element = targetTile.classList[1];

    if(selectedTool.target.includes(element)) {
        targetTile.className = "block";
        increaseInventory(element);
    } else {
        selectedTool.htmlEl.classList.remove('bg-blue');
        for (let i = 0; i < 4; i++) {
            setTimeout(flashBgRed, 700 * i);
        }
        setTimeout(function () {
            selectedTool.htmlEl.classList.add('bg-blue');
        }, 3000);
    }
};

function displayElements(ElementLibrary) {
    for (el in ElementLibrary) { //iterates through all the properties in the object ElementLibrary
        for (let i = 0; i < ElementLibrary[el].length; i++) { //itterates over all the items in the array
            let blockClass = el;
            let blockPosition = ElementLibrary[el][i];
            // console.log(`${blockClass} goes to pos ${blockPosition}`);
            $(`#${blockPosition}`).addClass(`${blockClass}`);
        }
    }
};
displayElements(items);

function createLeaves(startpoint) {
    let originArr = [startpoint]
    function grow() {
        let proba = 0
        let direction = ['up', 'left', 'right']
        for (let o = 0; o < originArr.length; o++) {
            for (let i = 0; i < direction.length; i++) {
                try {
                    let adjacentBlock = checkAround(originArr[o], direction[i])
                    if (adjacentBlock.className === 'block') {
                        // console.log (`${adjacentBlock.id} is a block`);
                        if (chance(proba)) {
                            originArr.push(adjacentBlock.id);

                        }
                    }
                }
                catch (error) { }

            };
            proba += 1
        }
        // console.log(typeof(originArr))
        let uniqueSet = new Set(originArr)
        originArr = [...uniqueSet];
    };
    grow();
    // console.log(typeof(originArr))
    // console.log(originArr);
    return originArr;

    function chance(prob) {
        let win = Math.floor(Math.random() * prob);
        if (win === 0) {
            return true;
        };

    };
    function checkAround(point, direction) {
        let x = idToPoints(point)[0];
        let y = idToPoints(point)[1];
        let left = [x, y - 1];
        let right = [x, y + 1];
        let up = [x + 1, y];
        let move;
        switch (direction) {
            case 'left':
                move = left
                break;
            case 'up':
                move = up
                break;
            case 'right':
                move = right
                break;

            default:
                break;
        };
        return (document.getElementById(`${pointsToId(move)}`));
    };
};

Array.from(allBlocks).forEach(singleBlock => singleBlock.addEventListener('click', function () {
    tileID = this.id;
    tileAction(tileID);
}));

function tileAction(tileID) {
    tileIDmatrix = idToPoints(tileID);

    if (isInventoryActive) {
        if (canReplant(tileID, tileIDmatrix)) {
            document.getElementById(tileID).className = `block ${selectedInventory.type}`;
			minusInventory();			
            unselectInventories();
            inventorySelected = false;
        } else {
            return;
        }
    } else {
        takeTileOut(tileID);
    }
};

function canReplant(tileID, tileIDmatrix) {
    if (isEmpty(tileID)) {
        return hasAdjacentTile(tileIDmatrix);
    } else {
        return false;
    }
};

function isEmpty(tileID) {
    const tileToCheck = document.getElementById(tileID);
    let empty = true;

    for (let i = 0; i < tilesArray.length; i++) {
        try {
            if (tileToCheck.classList.contains(tilesArray[i])) {
                empty = false;
                return empty;
            };
        } catch (error) {
            return "error";
        }
    }
    return empty;
};

function hasAdjacentTile(tileIDmatrix) {
    //get adjacents' matrices and convert to ID strings
    let x = tileIDmatrix[0];
    let y = tileIDmatrix[1];
    let adjacentTop = pointsToId([x + 1, y]);
    let adjacentBottom = pointsToId([x - 1, y]);
    let adjacentRight = pointsToId([x, y + 1]);
    let adjacentLeft = pointsToId([x, y - 1]);
    return (!isEmpty(adjacentTop) || !isEmpty(adjacentBottom) || !isEmpty(adjacentRight) || !isEmpty(adjacentLeft));
};

$('.floater').on('click',function(){
    $(".toolbox").animate({width:'toggle'},150);

})