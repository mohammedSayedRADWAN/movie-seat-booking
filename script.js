
const container=document.querySelector('.container')
//querySelector vs querySelectorAll
//querySelector:return one element and if there are many element has same id or class return first one
//querySelectorAll:return node list like arry can apply fun of arry it
const seats=document.querySelectorAll('.row .seat:not(.occupied)')
const count=document.getElementById('count')
const total=document.getElementById('total')
const selectedMovie=document.getElementById('movie')
populateUI()

//+ or parse int to make type int
let ticketPrice=+selectedMovie.value
//set movie data into local storage
function setMovieData(movieIndex,moviePrice) {
  localStorage.setItem('movieIndex',movieIndex)
  localStorage.setItem('moviePrice',moviePrice)
}
//get data from local storage and populate UI

function updateSelectedCount() {
  const selectedSeats=document.querySelectorAll('.row .seat.selected')
  const seatIndex=[...selectedSeats].map((seat)=>{
    //use spread arry to pull values from node list to return array format and apply fun indexOf 
return [...seats].indexOf(seat)
  })
  localStorage.setItem('seatIndex',JSON.stringify(seatIndex))
  console.log(seatIndex);
  const selectedSeatsCount=selectedSeats.length
  count.innerText=selectedSeatsCount
total.innerText=selectedSeatsCount*ticketPrice
}
function populateUI() {
  seatsIndexSelected=JSON.parse(localStorage.getItem('seatIndex'))
 
  if (seatsIndexSelected.length>0&&seatsIndexSelected!==null) {
    seats.forEach((seat,index)=>{
      if (seatsIndexSelected.indexOf(index)>-1) {
       seat.classList.add('selected')
      }
     })
  }
  movieSelect=localStorage.getItem('movieIndex')
  if (movieSelect!==null) {
    selectedMovie.selectedIndex=movieSelect
  }
}
//movie event lisitener
selectedMovie.addEventListener('change',(e)=>{
  setMovieData(e.target.selectedIndex,e.target.value);
  ticketPrice=+e.target.value
  updateSelectedCount()

})
//seats Event lisiner
container.addEventListener('click',(e)=>{
if (e.target.classList.contains('seat')&&!e.target.classList.contains('occupied')) {
  e.target.classList.toggle('selected')
  updateSelectedCount()
}
})
// init count and price
updateSelectedCount()