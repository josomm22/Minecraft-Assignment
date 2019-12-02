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
//test de debo