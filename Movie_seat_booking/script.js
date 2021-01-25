const container = document.querySelector('.container');
//exclude all .row .seat with ".occupied" as class name
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

populateUI();

//+ sign turns movieSelect.value from string type into a number type
//Alternatively you may use parseInt()
let ticketPrice = +movieSelect.value;

//Save selected Movie index and price
function setMovieData(movieIndex, moviePrice){
  localStorage.setItem('selectedMovieIndex',movieIndex);
  localStorage.setItem('SelectedMoviePrice',moviePrice);
}

// update total and count
function updateSelectCount(){
  const selectedSeats = document.querySelectorAll('.row .seat.selected');

  //Copy selected seats into an array
  //Map through array 
  //return a new array of indexes
  //what is spread operator: https://www.youtube.com/watch?v=iLx4ma8ZqvQ
  const seatsIndex = [...selectedSeats].map((seat)=>{
    return [...seats].indexOf(seat)
  });

  localStorage.setItem('selectedSeats',JSON.stringify(seatsIndex));

  const selectedSeatsCount = selectedSeats.length; //no. of node in the nodelist

  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}

//Get data from local Storage and populate UI
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

  if(selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index)=>{
      if(selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

  if(selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

//Movie select event
movieSelect.addEventListener('change',(e) => {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectCount();
});

//Seat click event
//event will trigger due to event bubbling
container.addEventListener('click',(e) => {
  //console.log(e.target) will tell us what is being clicked on.

  //what is clicked upon must contain class 'seat' but not class 'occupied'
  if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
    e.target.classList.toggle('selected');

    updateSelectCount();
  } 
});

//Initial count and total set
updateSelectCount();