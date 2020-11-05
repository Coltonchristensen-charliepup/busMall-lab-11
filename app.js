'use strict';
var allProducts = [];
var totalSelectionsAllowed = 25;
var selections = 0;
var renderQueue = [];
var myContentBin = document.getElementById('Bin'); // listerner will listen to this container
var imgOneEl = document.getElementById('image-one'); // images -can give properties from the js
var imgTwoEl = document.getElementById('image-two'); // images -can give properties from the js
var imgThreeEl = document.getElementById('image-three'); // images -can give properties from the js
var companyList = document.getElementById('companyList'); // render results
console.log(imgOneEl);

var ctx = document.getElementById('myChart');


function Products(name) {
  this.name = name;
  this.src = `img/${name}.jpg`;
  this.views = 0;
  this.votes = 0;
  allProducts.push(this);
}
function getRandomProducts() {
  return Math.floor(Math.random() * allProducts.length);
}
new Products('bag');
new Products('banana');
new Products('bathroom');
new Products('boots');
new Products('breakfast');
new Products('bubblegum');
new Products('chair');
new Products('cthulhu');
new Products('dog-duck');
new Products('dragon');
new Products('pen');
new Products('pet-sweep');
new Products('scissors');
new Products('shark');
new Products('sweep');
new Products('tauntaun');
new Products('unicorn');
new Products('usb');
new Products('water-can');
new Products('wine-glass');
// function populateRenderQueueWithNot(){ // one or the other
//   renderQueue = [];
//   while(renderQueue.length < 3){
//     var uniqueProduct = getRandomProducts();
//     while(!renderQueue.includes(uniqueProduct)){
//       renderQueue.push(uniqueProduct); // if we get here we KNOW its unique and can push into array
//     }
//   }
//   console.log('renderQueue: ', renderQueue);
// }
function populateRenderQueueWithoutNot() { // one or the other
  // renderQueue = [];
  while (renderQueue.length > 0) { //equivalent of emptying out array (like line 59)
    renderQueue.pop();
  }
  while (renderQueue.length < 3) {
    var uniqueProduct = getRandomProducts();
    while (renderQueue.includes(uniqueProduct)) {
      uniqueProduct = getRandomProducts();
    }
    renderQueue.push(uniqueProduct); // if we get here we KNOW its unique and can push into array
  }
  console.log('renderQueue: ', renderQueue);
}
function imageRenderProperties(imgEl, prod) {
  imgEl.src = allProducts[prod].src;
  imgEl.alt = allProducts[prod].name;
  allProducts[prod].views++;
}
function renderProducts() {
  populateRenderQueueWithoutNot();
  var productOne = renderQueue[0]; // 1
  var productTwo = renderQueue[1]; // 4
  var productThree = renderQueue[2]; // 9
  imageRenderProperties(imgOneEl, productOne);
  imageRenderProperties(imgTwoEl, productTwo);
  imageRenderProperties(imgThreeEl, productThree);
}
function renderResults() {
  for (var i = 0; i < allProducts.length; i++) {
    var li = document.createElement('li');
    li.textContent = `${allProducts[i].name} had ${allProducts[i].votes} votes, and they saw ${allProducts[i].views} times.`;
    companyList.appendChild(li);
  }
}
renderProducts(); // gives us intial images
function handleSelections(event) {
  var selectedProducts = event.target.alt;
  // if (selectedProducts === myContentBin){
  //   alert('click on the damn image');
  // }
  if (selectedProducts) {
    console.log(selectedProducts);
    selections++;
    for (var i = 0; i < allProducts.length; i++) {
      if (selectedProducts === allProducts[i].name) {
        allProducts[i].votes++;
      }
    }
    renderProducts(); // gives us the images after each click
    console.log(imgOneEl);
    if (selections === totalSelectionsAllowed) {
      console.log(selections);
      myContentBin.removeEventListener('click', handleSelections);
      renderResults();
    }
  } else {
    alert('click on the damn image');
  }
}

var myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [{
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  }
});



myContentBin.addEventListener('click', handleSelections);
