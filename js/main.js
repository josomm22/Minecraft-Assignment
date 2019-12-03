createGrid();

let items = {
    rocks: ['R08C02','R08C03','R08C04','R08C17','R08C18','R09C17','R09C18','R10C17','R10C18',],
    wood: ['R08C05','R09C05','R10C05'] ,
    leaves: createLeaves('R11C05'),
    cloud: ['R15C10','R15C11','R15C12','R15C13','R15C14','R15C15','R14C14','R14C15','R16C10','R16C11','R16C12',],
    water: [],
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

function displayElements(ElementLibrary){
    for (el in ElementLibrary){ //iterates through all the properties in the object ElementLibrary
        for (let i = 0; i < ElementLibrary[el].length; i++) { //itterates over all the items in the array
            let blockClass = el ;
            let blockPosition = ElementLibrary[el][i];
            // console.log(`${blockClass} goes to pos ${blockPosition}`);
            $(`#${blockPosition}`).addClass(`${blockClass}`);
        }
    }
}
displayElements(items);

function createLeaves(startpoint){
    let originArr = [startpoint]
    function grow(){
        let proba = 0
        let direction = ['up','left','right']
        for (let o = 0; o < originArr.length; o++) {
            for (let i = 0; i < direction.length; i++) {
                let adjacentBlock = checkAround(originArr[o],direction[i])
                if (adjacentBlock.className === 'block'){
                    console.log (`${adjacentBlock.id} is a block`);
                    if (chance(proba)){
                        originArr.push(adjacentBlock.id);
        
                    }
                }
            };
            proba += 1
        }
        console.log(typeof(originArr))
        let uniqueSet = new Set(originArr)
        originArr = [...uniqueSet];
    }
    grow();
    console.log(typeof(originArr))
    console.log(originArr);
    return originArr;
  
    function chance(prob){
        let win = Math.floor(Math.random() * prob);
        if (win === 0){
            return true;
        };
         
    };
    function checkAround(point,direction){
        let x = idToPoints(point)[0];
        let y = idToPoints(point)[1];
        let left = [x,y-1];
        let right = [x, y+1];
        let up = [x+1,y];
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