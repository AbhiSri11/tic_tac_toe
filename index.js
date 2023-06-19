// js for TicTacToe

const boxes = Array.from(document.getElementsByClassName('box'));
const resetBtn = document.getElementById('resetBtn');
resetBtn.addEventListener('click', reset);
const headerText = document.getElementById('header-text');
const areas = [null, null, null, null, null, null, null, null, null];
const o_text = "O";
const x_text = "X";
let currentPlayer = o_text; 
let winBoxesIds = [];

//jo 9 boxes hai unko clickable banane ke liye
function bindClickEvent(){
    boxes.forEach(box=>{
        box.addEventListener('click', handleBoxClick);
    })
}

bindClickEvent();

//9 boxes ke andar likhne ke liye
function handleBoxClick(e){

    // if se hoga ye ki hum koi jeet jayega to game whi stop ho jayega
    if(winBoxesIds.length>0) return;

    //is id se hi check hoga kya wo box khali hai ya written hai
    const id = e.target.id;

    //!areas[id] ka mtlb jb wo boxe khali hoga tb hi 'o' ya 'x' usme likha jayega 
    if(!areas[id]){
        areas[id] = currentPlayer;
        e.target.innerHTML = currentPlayer;
        
        //hr baar check hoga khi 3 ka pair to nhi bn gya hai
        if(hasPlayerWon(currentPlayer)){
            headerText.innerHTML = `${currentPlayer} has won!!`;
            headerText.style.background = 'lightgreen';
            changeWinBoxesBg();
        }
        // agar 'o' hai to 'x' kardo and vise versa
        currentPlayer = currentPlayer === o_text ? x_text : o_text;
    }
}

//3 ka pair bana ya nhi uske liye
function hasPlayerWon(cPlayer){
    //form 0th index kitna pair banne ka posibility hai
    if(areas[0] === cPlayer){
        if(areas[1] === cPlayer && areas[2] === cPlayer){
            winBoxesIds = [0,1,2];
            return true;
        }
        if(areas[3] === cPlayer && areas[6] === cPlayer){
            winBoxesIds = [0,3,6];
            return true;
        }
        if(areas[4] === cPlayer && areas[8] === cPlayer){
            winBoxesIds = [0,4,8];
            return true;
        }
    }
    //form 4th index kitna pair banne ka posibility hai
    if(areas[4] === cPlayer){
        if(areas[1] === cPlayer && areas[7] === cPlayer){
            winBoxesIds = [4,1,7];
            return true;
        }
        if(areas[3] === cPlayer && areas[5] === cPlayer){
            winBoxesIds = [4,3,5];
            return true;
        }
        if(areas[2] === cPlayer && areas[6] === cPlayer){
            winBoxesIds = [2,4,6];
            return true;
        }
    }
    //form 8th index kitna pair banne ka posibility hai
    if(areas[8] === cPlayer){
        if(areas[2] === cPlayer && areas[5] === cPlayer){
            winBoxesIds = [2,5,8];
            return true;
        }
        if(areas[6] === cPlayer && areas[7] === cPlayer){
            winBoxesIds = [6,7,8];
            return true;
        }
    }

}

// jb 3 ka pair bn jaye tb un theno boxes ko modify karne ke liye
function changeWinBoxesBg(){
    winBoxesIds.forEach(win=>{
        boxes[win].style.background = 'lightgreen';
    })
    boxes.forEach(box=>{
        box.style.cursor = 'not-allowed';
    })
}

// reset karne ke liye
function reset(){
    winBoxesIds = [];
    areas.forEach((val,index)=>{
        areas[index] = null;
    })
    boxes.forEach(box=>{
        box.innerHTML = '';
        box.style.background = '';
        box.style.cursor = 'pointer' 
    })
    headerText.innerHTML = "Let's Play..";
    headerText.background = "";
    headerText.style.backgroundColor = "";
    currentPlayer = o_text;
}