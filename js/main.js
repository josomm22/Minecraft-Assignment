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

//let pressedMouse = false;
let axe = false;
let shovel = false;
let pickaxe = false;


let box = document.getElementsByClassName("block");

document.getElementById("axe").addEventListener('click', function(event){
    axe = true;
    shovel = false;
    pickaxe = false;
});


document.getElementById("shovel").addEventListener('click', function(event){
    axe = false;
    shovel = true;
    pickaxe = false;
});


document.getElementById("pickaxe").addEventListener('click', function(event){
    axe = false;
    shovel = false;
    pickaxe = true;
});

//grass
box.addEventListener('click',function(){

    if (box.classList('grass') && shovel){
      
        box.classList.remove("grass");
    }else{
            box.addEventListener("mousedown",function(e){
                //pressedMouse = true;
                box.classList.add("background-red");
            });
            box.addEventListener("onmousemove", function(e){
                //pressedMouse = true;
                box.classList.add("background-red");
            });
            box.addEventListener("mouseup", function(e){
                //pressedMouse = false;
                box.classList.remove("background-red");
            });
        }
});
//dirt
box.addEventListener('click',function(){

    if (box.classList("dirt") && shovel){
    
    box.remove.classList("dirt");
    }else{
        box.addEventListener("mousedown",function(e){
            //pressedMouse = true;
            box.classList.add("background-red");
        });
        box.addEventListener("onmousemove", function(e){
            //pressedMouse = true;
            box.classList.add("background-red");
        });
        box.addEventListener("mouseup", function(e){
            //pressedMouse = false;
            box.classList.remove("background-red");
        });
    }   
    
});
//tree
box.addEventListener('click',function(){

    if (box.classList("tree") && axe){ 
 
    box.remove.classList("tree");
    }else{
        box.addEventListener("mousedown",function(e){
            //pressedMouse = true;
            box.classList.add("background-red");
        });
        box.addEventListener("onmousemove", function(e){
            //pressedMouse = true;
            box.classList.add("background-red");
        });
        box.addEventListener("mouseup", function(e){
            //pressedMouse = false;
            box.classList.remove("background-red");
        });
    }
    
});
//leave
box.addEventListener('click',function(){

    if (box.classList("leave") && axe){ 

    box.remove.classList("leave");
    }else{
        box.addEventListener("mousedown",function(e){
            //pressedMouse = true;
            box.classList.add("background-red");
        });
        box.addEventListener("onmousemove", function(e){
            //pressedMouse = true;
            box.classList.add("background-red");
        });
        box.addEventListener("mouseup", function(e){
            //pressedMouse = false;
            box.classList.remove("background-red");
        });
    }
    
});
//rock
box.addEventListener('click',function(){

    if (box.classList("rock") && pickaxe){ 
  
    box.remove.classList("rock");
    }else{
        box.addEventListener("mousedown",function(e){
            //pressedMouse = true;
            box.classList.add("background-red");
        });
        box.addEventListener("onmousemove", function(e){
            //pressedMouse = true;
            box.classList.add("background-red");
        });
        box.addEventListener("mouseup", function(e){
            //pressedMouse = false;
            box.classList.remove("background-red");
        });
    }
    
});

