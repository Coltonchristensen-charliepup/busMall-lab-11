'use strict';
var allProducts = [];
var totalSelectionsAllowed = 25;
var selections = 0;
var renderQueue = [];
var myContentBin = document.getElementById('Bin');
var imgOneEl = document.getElementById('image-one');
var imgTwoEl = document.getElementById('image-two');
var imgThreeEl = document.getElementById('image-three');
var companyList = document.getElementById('companyList');
console.log(imgOneEl);
var ctx = document.getElementById('myChart');
var nameArray = [];
var votesArray = [];
var viewsArray = [];

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


function populateRenderQueueWithoutNot() {
//   while (renderQueue.length > 0) {
//     renderQueue.pop();
  // }
  while (renderQueue.length < 6) {
    var uniqueProduct = getRandomProducts();
    while (renderQueue.includes(uniqueProduct)) {
      uniqueProduct = getRandomProducts();
    }
    renderQueue.push(uniqueProduct);
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
  // console.log('renderQueue', renderQueue);
  var productOne = renderQueue.shift();
  console.log('renderQueue', renderQueue);
  var productTwo = renderQueue.shift();
  console.log('renderQueue', renderQueue);
  var productThree = renderQueue.shift();
  console.log('renderQueue', renderQueue);
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
renderProducts();

function handleSelections(event) {
  var selectedProducts = event.target.alt;
  if (selectedProducts) {
    console.log(selectedProducts);
    selections++;
    for (var i = 0; i < allProducts.length; i++) {
      if (selectedProducts === allProducts[i].name) {
        allProducts[i].votes++;
      }
    }
    renderProducts();
    console.log(imgOneEl);
    if (selections === totalSelectionsAllowed) {
      console.log(selections);
      myContentBin.removeEventListener('click', handleSelections);
      renderResults();
      makeChart();
    }
  } else {
    alert('click on the image');
  }
}
function recieveInput() {
for(var i = 0; i < allProducts.length; i++) {
viewsArray.push(allProducts[i].views);
nameArray.push(allProducts[i].name);
votesArray.push(allProducts[i].votes);
}
console.log('viewsArray', viewsArray, 'nameArray', nameArray, 'votesArray', votesArray);
}

function makeChart() {
  recieveInput(votesArray);
var myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: nameArray,
    datasets: [{
      label: '# of Votes',
      data: votesArray,
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
}


myContentBin.addEventListener('click', handleSelections);
