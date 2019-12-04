createGrid();

let items = {
    rocks: createLeaves('R08C02'),
    // rocks: createLeaves('R08C17'),
    wood: ['R08C05','R09C05','R10C05'] ,
    leaves: createLeaves('R11C05'),
    cloud: ['R15C10', 'R15C11', 'R15C12', 'R15C13', 'R15C14', 'R15C15', 'R14C14', 'R14C15', 'R16C10', 'R16C11', 'R16C12',],
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

let selectedTool = "pickaxe";
//let pressedMouse = false;
let axe = false;
let shovel = false;
let pickaxe = false;


let box = document.getElementsByClassName("block");

document.getElementById("axe").addEventListener('click', function (event) {
    axe = true;
    shovel = false;
    pickaxe = false;
});


document.getElementById("shovel").addEventListener('click', function (event) {
    axe = false;
    shovel = true;
    pickaxe = false;
});


document.getElementById("pickaxe").addEventListener('click', function (event) {
    axe = false;
    shovel = false;
    pickaxe = true;
});

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
    }
    )
};

// 	switch(activeTool) {
// 		case "shovel":
//             tools[activeTool].forEach(function(){
//                 if (targetTile.classList.contains(activeToolEl)) {
//                     targetTile.classList.remove(actoveToolEl);
//                 } else {
//                     for(let i = 0; i < 4; i++) {
//                         setTimeout(flashBgRed(shovel), 1000 * i);
//                     }   
//                 }
//             }
//             break;



// 		case "axe":
// 			if (targetTile.classList.contains('wood') || targetTile.classList.contains('leaves')) {
//                 targetTile.classList.remove('wood');
//                 targetTile.classList.remove('leaves');
// 			} else {
//                 for(let i = 0; i < 4; i++) {
//                     setTimeout(flashBgRed(shovel), 1000 * i);
//                 }   
//             }



// 	}


// }

// //grass
// box.addEventListener('click', function () {

//     if (box.classList('grass') && shovel) {

//         box.classList.remove("grass");
//     } else {
//         box.addEventListener("mousedown", function (e) {
//             //pressedMouse = true;
//             box.classList.add("background-red");
//         });
//         box.addEventListener("onmousemove", function (e) {
//             //pressedMouse = true;
//             box.classList.add("background-red");
//         });
//         box.addEventListener("mouseup", function (e) {
//             //pressedMouse = false;
//             box.classList.remove("background-red");
//         });
//     }
// });
// //dirt
// box.addEventListener('click', function () {

//     if (box.classList("dirt") && shovel) {

//         box.remove.classList("dirt");
//     } else {
//         box.addEventListener("mousedown", function (e) {
//             //pressedMouse = true;
//             box.classList.add("background-red");
//         });
//         box.addEventListener("onmousemove", function (e) {
//             //pressedMouse = true;
//             box.classList.add("background-red");
//         });
//         box.addEventListener("mouseup", function (e) {
//             //pressedMouse = false;
//             box.classList.remove("background-red");
//         });
//     }

// });
// //tree
// box.addEventListener('click', function () {

//     if (box.classList("tree") && axe) {

//         box.remove.classList("tree");
//     } else {
//         box.addEventListener("mousedown", function (e) {
//             //pressedMouse = true;
//             box.classList.add("background-red");
//         });
//         box.addEventListener("onmousemove", function (e) {
//             //pressedMouse = true;
//             box.classList.add("background-red");
//         });
//         box.addEventListener("mouseup", function (e) {
//             //pressedMouse = false;
//             box.classList.remove("background-red");
//         });
//     }

// });
// //leave
// box.addEventListener('click', function () {

//     if (box.classList("leave") && axe) {

//         box.remove.classList("leave");
//     } else {
//         box.addEventListener("mousedown", function (e) {
//             //pressedMouse = true;
//             box.classList.add("background-red");
//         });
//         box.addEventListener("onmousemove", function (e) {
//             //pressedMouse = true;
//             box.classList.add("background-red");
//         });
//         box.addEventListener("mouseup", function (e) {
//             //pressedMouse = false;
//             box.classList.remove("background-red");
//         });
//     }

// });
// //rock
// box.addEventListener('click', function () {

//     if (box.classList("rock") && pickaxe) {

//         box.remove.classList("rock");
//     } else {
//         box.addEventListener("mousedown", function (e) {
//             //pressedMouse = true;
//             box.classList.add("background-red");
//         });
//         box.addEventListener("onmousemove", function (e) {
//             //pressedMouse = true;
//             box.classList.add("background-red");
//         });
//         box.addEventListener("mouseup", function (e) {
//             //pressedMouse = false;
//             box.classList.remove("background-red");
//         });
//     }

// });

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

Array.from(allBlocks).forEach(singleBlock => singleBlock.addEventListener('click', function () {
    tileID = this.id;
    bridgeFunc();
}));


function bridgeFunc(tileID) {
    tileIDmatrix = idToPoints(tileID);

    // if tools=active
    takeTileOut(tileID);

    //if inventory=active
    return canImplant(tileID, tileIDmatrix);

}

function canImplant(tileID, tileIDmatrix) {
    if (isEmpty(tileID)) {
        console.log('tile is empty')
        return hasAdjacentTile(tileIDmatrix);
    } else {
        console.log('tile is occupied');
        hasAdjacentTile(tileIDmatrix);
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
    console.log("filled top:", !isEmpty(adjacentTop));
    console.log("filled right:", !isEmpty(adjacentRight));
    console.log("filled bottom:", !isEmpty(adjacentBottom));
    console.log("filled left:", !isEmpty(adjacentLeft));
    return (!isEmpty(adjacentTop) || !isEmpty(adjacentBottom) || !isEmpty(adjacentRight) || !isEmpty(adjacentLeft));
};
