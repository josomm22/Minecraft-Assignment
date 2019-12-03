let items = {
    rocks: ['R08C02','R08C03'],
    wood: ['R08C05','R09C05','R10C05'] 
}
function createGrid(){
    let rows = 17;
    let columns = 20;
    for (let r = 0; r <= rows; r++) {
        rowDiv = $('<div/>').attr('class','row');
        for (let c = 0; c <= columns; c++) {
            rowNum = ("0" + r).slice(-2);
            colNum = ("0" + c).slice(-2);
            if (r < 7){
                colDiv = $('<div/>').attr('class','block dirt');
            }
            else if(r === 7){
                colDiv = $('<div/>').attr('class','block grass');

            }
            else{
                colDiv = $('<div/>').attr('class','block');
            }
            colDiv.attr('id',`R${rowNum}C${colNum}`)
            rowDiv.append(colDiv)
            
        }
        $('.container').prepend(rowDiv);
    }
}
createGrid();
function idToPoints (id){
    let x = parseInt(id.slice(1,3));
    let y = parseInt(id.slice(4));
    return [x,y];
}
function pointsToId (arr){
    row = arr[0];
    col = arr[1];
    rowNum = ("0" + row).slice(-2);
    colNum = ("0" + col).slice(-2);
    return (`R${rowNum}C${colNum}`)
}

let tilesArray = ['dirt','grass', 'rock'];
let allBlocks = document.getElementsByClassName('block');

Array.from(allBlocks).forEach(singleBlock => singleBlock.addEventListener('click', function(){
    tileID = this.id; 
    tileIDmatrix = idToPoints(tileID);
    console.log("tile ID:", tileID, "/", "tile ID matrix:", tileIDmatrix);
    console.log("can implant?", canImplant(tileID, tileIDmatrix));   
    // return canImplant(tileID, tileIDmatrix);  --remove console log later and retain this return t/f
}));

function canImplant (tileID, tileIDmatrix) {    
    if (isEmpty(tileID)){
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
            if(tileToCheck.classList.contains(tilesArray[i])) {
                empty = false;
                return empty;
            }; 
        } catch (error) {
            return "error";
        }                  
    }
    return empty;
  
}

function hasAdjacentTile (tileIDmatrix) {
    //get adjacents' matrices and convert to ID strings
    let adjacentTop = pointsToId([tileIDmatrix[0] + 1,  tileIDmatrix[1]]);    
    let adjacentBottom = pointsToId([tileIDmatrix[0] - 1,  tileIDmatrix[1]]);
    let adjacentRight = pointsToId([tileIDmatrix[0],  tileIDmatrix[1] + 1]);
    let adjacentLeft = pointsToId([tileIDmatrix[0],  tileIDmatrix[1] - 1]);
    console.log("filled top:", !isEmpty(adjacentTop));
    console.log("filled right:", !isEmpty(adjacentRight));
    console.log("filled bottom:", !isEmpty(adjacentBottom));    
    console.log("filled left:", !isEmpty(adjacentLeft));
    return (!isEmpty(adjacentTop) || !isEmpty(adjacentBottom) || !isEmpty(adjacentRight) || !isEmpty(adjacentLeft));    
}