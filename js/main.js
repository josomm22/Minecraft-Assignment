createGrid();

let items = {
    rocks: (createLeaves('R08C02')).concat(createLeaves('R08C15')),
    wood: ['R08C05','R09C05','R10C05'] ,
    leaves: createLeaves('R11C05'),
    cloud : (createLeaves('R15C09')).concat(createLeaves('R14C12')),
    water: [],
}
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
}

function idToPoints(id) {
    let x = parseInt(id.slice(1, 3));
    let y = parseInt(id.slice(4));
    return [x, y];
}
function pointsToId(arr) {
    row = arr[0];
    col = arr[1];
    rowNum = ("0" + row).slice(-2);
    colNum = ("0" + col).slice(-2);
    return (`R${rowNum}C${colNum}`)
}

let selectedTool = "pickaxe"; //default tool

let axeTool = document.getElementById("axe");
let shovelTool = document.getElementById("shovel");
let pickaxeTool = document.getElementById("pickaxe");

//function activeToolBg ()
    /*
    improve/add later
    */

axeTool.addEventListener('click', function () {    
    selectedTool = "axe";
    console.log('active tool:', selectedTool);
    //function activeToolBg ()
    axeTool.classList.add('bg-blue');
    shovelTool.classList.remove('bg-blue');
    pickaxeTool.classList.remove('bg-blue');
});
shovelTool.addEventListener('click', function () {
    selectedTool = "shovel"
    console.log('active tool:', selectedTool);
    //function activeToolBg ()
    shovelTool.classList.add('bg-blue');
    axeTool.classList.remove('bg-blue');
    pickaxeTool.classList.remove('bg-blue');
});
pickaxeTool.addEventListener('click', function () {
    selectedTool = "pickaxe";
    console.log('active tool:', selectedTool);
    //function activeToolBg ()
    pickaxeTool.classList.add('bg-blue');
    shovelTool.classList.remove('bg-blue');
    axeTool.classList.remove('bg-blue');
});

//set tiles that can be targeted by each tool
let tools = {
    axe: ["wood", "leaves"],
    pickaxe: ["rocks"],
    shovel: ["dirt", "grass", "leaves"]
}

function flashBgRed() {
    $(`#${selectedTool}`).toggleClass('bg-red');
}

function takeTileOut(tileID) {
    let targetTile = document.getElementById(tileID);
    tools[selectedTool].forEach(element => {
        if (targetTile.classList.contains(element)) {
            targetTile.classList.remove(element);
        } else {
            for (let i = 0; i < 4; i++) {
                setTimeout(flashBgRed, 1000 * i);
            }
        }
    })
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
}
displayElements(items);

function createLeaves(startpoint) {
    let originArr = [startpoint]
    function grow() {
        let proba = 0
        let direction = ['up', 'left', 'right']
        for (let o = 0; o < originArr.length; o++) {
            for (let i = 0; i < direction.length; i++) {
                try{let adjacentBlock = checkAround(originArr[o],direction[i])
                    if (adjacentBlock.className === 'block'){
                        // console.log (`${adjacentBlock.id} is a block`);
                        if (chance(proba)){
                            originArr.push(adjacentBlock.id);
            
                        }
                    }}
                catch(error){}
                
            };
            proba += 1
        }
        // console.log(typeof(originArr))
        let uniqueSet = new Set(originArr)
        originArr = [...uniqueSet];
    }
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
        }
        return (document.getElementById(`${pointsToId(move)}`));
    }
}

let tilesArray = ['dirt', 'grass', 'rocks', 'wood', 'leaves'];
let allBlocks = document.getElementsByClassName('block');
let inventory = document.getElementById('inventory-block');
let inventorySelected = false;

Array.from(allBlocks).forEach(singleBlock => singleBlock.addEventListener('click', function () {
    tileID = this.id;
    console.log(tileID); //REMOVE ON FINAL VERSION (FOR CHECKING ONLY)
    tileAction(tileID);
}));

//toggle True/False on inventorySelected
inventory.addEventListener('click', function() {
    inventorySelected = inventorySelected? false : true;
});

function tileAction(tileID) {
    tileIDmatrix = idToPoints(tileID);

    if(inventorySelected){
        return canImplant(tileID, tileIDmatrix);
    } else { // if tools=active        
        takeTileOut(tileID);
    }
}

function canImplant(tileID, tileIDmatrix) {
    if (isEmpty(tileID)) {
        console.log('tile is empty')
        return hasAdjacentTile(tileIDmatrix);
    } else {
        console.log('tile is occupied');
        hasAdjacentTile(tileIDmatrix);  //REMOVE ON FINAL VERSION (FOR CHECKING ONLY)
        return false;
    }
}


function isEmpty(tileID) {
    tileToCheck = document.getElementById(tileID);
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
}

function hasAdjacentTile(tileIDmatrix) {
    //get adjacents' matrices and convert to ID strings
    let adjacentTop = pointsToId([tileIDmatrix[0] + 1, tileIDmatrix[1]]);
    let adjacentBottom = pointsToId([tileIDmatrix[0] - 1, tileIDmatrix[1]]);
    let adjacentRight = pointsToId([tileIDmatrix[0], tileIDmatrix[1] + 1]);
    let adjacentLeft = pointsToId([tileIDmatrix[0], tileIDmatrix[1] - 1]);
    console.log("filled top:", !isEmpty(adjacentTop)); //REMOVE ON FINAL VERSION (FOR CHECKING ONLY)
    console.log("filled right:", !isEmpty(adjacentRight)); //REMOVE ON FINAL VERSION (FOR CHECKING ONLY)
    console.log("filled bottom:", !isEmpty(adjacentBottom)); //REMOVE ON FINAL VERSION (FOR CHECKING ONLY)
    console.log("filled left:", !isEmpty(adjacentLeft)); //REMOVE ON FINAL VERSION (FOR CHECKING ONLY)
    return (!isEmpty(adjacentTop) || !isEmpty(adjacentBottom) || !isEmpty(adjacentRight) || !isEmpty(adjacentLeft));
};
