'use strict';


var allProducts = [];
var totalSelectionsAllowed = 25;
var selections = 0;
var myContentBin = document.getElementById('Bin');
var imgOneEl = document.getElementById('image-one');
var imgTwoEl = document.getElementById('image-two');
var imgThreeEl = document.getElementById('image-three');
var companyList = document.getElementById('companyList');

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

function renderProducts() {
  var productOne = getRandomProducts();
  var productTwo = getRandomProducts();
  var productThree = getRandomProducts();

  while (productOne === productTwo) {
    productTwo = getRandomProducts();
  }

  imgOneEl.src = allProducts[productOne].src;
  imgOneEl.alt = allProducts[productOne].name;
  allProducts[productOne].views++;


  imgTwoEl.src = allProducts[productTwo].src;
  imgTwoEl.alt = allProducts[productTwo].name;
  allProducts[productTwo].views++;


  imgThreeEl.src = allProducts[productThree].src;
  imgThreeEl.alt = allProducts[productThree].name;
  allProducts[productThree].views++;
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
  selections++;

  for (var i = 0; i < allProducts.length; i++) {
    if (selectedProducts === allProducts[i].name) {
      allProducts[i].votes++;
    }
  }
  renderProducts();

  if (selections === totalSelectionsAllowed) {
    myContentBin.removeEventListener('selction', handleSelections);

    renderResults();
  }

}

myContentBin.addEventListener(`click`, handleSelections);
