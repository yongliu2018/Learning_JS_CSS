document.addEventListener('DOMContentLoaded', ()=>{
  const grid = document.querySelector('.grid');
  let width = 10;
  let bombAmount = 20;
  let flags = 0;
  let squares = [];
  let isGameOver = false;

  //create Board
  function createBoard() {
    //get shuffled game array with random bombs
    let bombsArray = Array(bombAmount).fill('bomb');//creates a array with "bombAmount" no. of 'bomb' elements
    let emptyArray = Array(width*width-bombAmount).fill('valid');
    const gameArray = emptyArray.concat(bombsArray);

    //shuffle gameArray
    const shuffledArray= gameArray.sort(()=>Math.random() -0.5)
    //console.log(shuffledArray);

    for(let i = 0; i < width*width; i++) {
      const square = document.createElement('div');
      square.setAttribute('id', i);
      square.classList.add(shuffledArray[i])
      grid.appendChild(square);
      squares.push(square);

      //normal click
      square.addEventListener('click', function(e) {
        click(square);
      });

      //control and left click //oncontextmenu aka right click
      square.oncontextmenu = function(e) {
        e.preventDefault();
        addFlag(square);
      }
  }
    //add numbers
    for (let i = 0; i<squares.length; i++){
      let total = 0;
      const isLeftEdge = (i%width === 0);
      const isRightEdge = (i%width === width -1);
    // Tbh, had to refer to tutorial frequently for this part:\ 
      if(squares[i].classList.contains('valid')) {
        if(i > 0 && !isLeftEdge && squares[i-1].classList.contains('bomb')){total++}
        if(i > 9 && !isRightEdge && squares[i+1-width].classList.contains('bomb')){total++}
        if(i > 10 && squares[i-width].classList.contains('bomb')){total++}
        if(i > 11 && !isLeftEdge && squares[i-1-width].classList.contains('bomb')){total++}
        if(i < 98 && !isRightEdge && squares[i+1].classList.contains('bomb')){total++}
        if(i < 90 &&!isLeftEdge && squares[i-1+width].classList.contains('bomb')){total++}
        if(i < 88 && !isRightEdge && squares[i+1+width].classList.contains('bomb')){total++}
        if(i < 89 && squares[i+width].classList.contains('bomb')){total++}
        squares[i].setAttribute('data',total)
      }
    }



  }
  createBoard();

  //add flag with right click
  function addFlag(square) {
    if (isGameOver) return
    if(!square.classList.contains('checked') && (flags < bombAmount)){
      if(!square.classList.contains('flag')){
        square.classList.add('flag');
        square.innerHTML = '🚩';
        flags++
        checkForWin();
      } else {
        square.classList.remove('flag');
        square.innerHTML ='';
        flags--
      }
    }
  }

  //click on square actions
  function click(square){
    let currentId = square.id;

    if(isGameOver) return
    if(square.classList.contains('checked')|| square.classList.contains('flag')) return
    if(square.classList.contains('bomb')){
      gameOver(square);
    } else {
      let total = square.getAttribute('data');
      if (total != 0) {
        square.classList.add('checked');
        square.innerHTML = total;
        return
      }
      checkSquare(square, currentId)
    }
    square.classList.add('checked');
  }


  //check neigbouring squares once square is clicked
  function checkSquare(square, currentId) {
    const isLeftEdge = (currentId % width === 0);
    const isRightEdge = (currentId % width === width-1);


    setTimeout(()=>{
      if(currentId > 0 && !isLeftEdge) {
        const newId = squares[parseInt(currentId)-1].id;
        const newSquare = document.getElementById(newId);
        click(newSquare);
      }
      if(currentId > 9 && !isRightEdge) {
        const newId = squares[parseInt(currentId) +1 -width].id;
        const newSquare= document.getElementById(newId);
        click(newSquare);
      }
      if(currentId > 10) {
        const newId = squares[parseInt(currentId - width)].id;
        const newSquare = document.getElementById(newId);
        click(newSquare);
      }
      if (currentId > 11 && !isLeftEdge) {
        const newId = squares[parseInt(currentId) -1 -width].id;
        const newSquare = document.getElementById(newId);
        click(newSquare);
      }
      if (currentId < 98 && !isRightEdge) {
        const newId = squares[parseInt(currentId)+1].id;
        const newSquare = document.getElementById(newId);
      }
      if(currentId < 90 && !isLeftEdge) {
        const newId = squares[parseInt(currentId) -1 +width].id;
        const newSquare = document.getElementById(newId);
        click(newSquare);
      }
      if (currentId < 88 && !isRightEdge) {
        const newId = squares[parseInt(currentId) +1 +width].id;
        const newSquare = document.getElementById(newId);
        click(newSquare);
      }
      if (currentId < 89) {
        const newId = squares[parseInt(currentId)+width].id;
        const newSquare = document.getElementById(newId);
        click(newSquare);
      }
    }, 10)
  }

  //game over
function gameOver(square) {
  console.log('Game Over!');
  isGameOver = true;

  //show all the bombs
  squares.forEach(square =>{
    if (square.classList.contains('bomb')) {
      square.innerHTML = '💣';
     }
  })
}

  //check if win
  function checkForWin(){
    let matches = 0;

    for(let i = 0; i < squares.length; i++){
      if (squares[i].classList.contains('flag') && squares[i].classList.contains('bomb')) {
        matches++
      }
      if(matches === bombAmount) {
        console.log('YOU WIN!');
        isGameOver = true;
      }
    }
  }




});