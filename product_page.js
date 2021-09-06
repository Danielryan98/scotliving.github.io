window.onload = function () {
    //localStorage.clear();
    buildImages();
    document.getElementById("productName").innerHTML=(fabricSofasData[productNumber].productName);
    document.getElementById("price").innerHTML='£'+(fabricSofasData[productNumber].price);
    document.getElementById("name-of-product").innerHTML=(fabricSofasData[productNumber].productName);
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    if(cartItems[fabricSofasData[productNumber].productName].inCart > 0){
      document.getElementById("basket-phone-container").innerHTML = `
      <button id="buy-btn" class="btn-buy" style="background-color: blue;" onclick="setColour()";><em class="fa fa-shopping-basket fa-lg" style="padding-right: 3%;"></em>Added to Basket</button>
            <button class="btn-phone"><em class="fa fa-phone fa-lg" style="padding-right: 2%; padding-left: 1%;"></em> Order by Phone</button>
            <img id="adOne" src="Pictures/sale.png" alt="">
            <img id="adTwo" src="Pictures/chair.png" alt="">
            `
    }
}

function setColour() {
    document.getElementById("basket-phone-container").innerHTML = `<button id="buy-btn" class="btn-buy" style="background-color: blue !important;" onclick="setColour()";><em class="fa fa-shopping-basket fa-lg" style="padding-right: 3%;"></em>Added to Basket</button>
					<button class="btn-phone"><em class="fa fa-phone fa-lg" style="padding-right: 2%; padding-left: 1%;"></em> Order by Phone</button>
					<img id="adOne" src="Pictures/sale.png" alt="">
					<img id="adTwo" src="Pictures/chair.png" alt="">
          `;
          addToCart();
          
}

function buildImages() {
    var img = document.getElementById("bigImg")
    img.src = fabricSofasData[productNumber].photoOne;
    var imgOne = document.getElementById("photoOne")
    imgOne.src = fabricSofasData[productNumber].photoOne;
    var imgTwo = document.getElementById("photoTwo")
    imgTwo.src = fabricSofasData[productNumber].photoTwo;
    var imgThree = document.getElementById("photoThree")
    imgThree.src = fabricSofasData[productNumber].photoThree;
    var imgFour = document.getElementById("photoFour")
    imgFour.src = fabricSofasData[productNumber].photoFour;
  }

  function changeImage(smallImg){
    var fullImg = document.getElementById("bigImg");
    fullImg.src = smallImg.src;
}


var productNumber = localStorage.getItem("productIndex");
console.log(productNumber);

// Get the modal
var modal = document.getElementById("myModal");

// Get the image and insert it inside the modal - use its "alt" text as a caption
var img = document.getElementById("bigImg");
var modalImg = document.getElementById("img01");
img.onclick = function(){
  modal.style.display = "block";
  modalImg.src = this.src;
}

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("product-close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

// Checkout related code
//Get the product added to basket
function addToCart(){
  cartNumbers();
  totalCost(fabricSofasData[productNumber]);
}


function cartNumbers() {
  console.log('clicked product', productNumber);
  let productNumbers = localStorage.getItem('cartNumbers');

  productNumbers = parseInt(productNumbers);

  if(productNumbers){
    localStorage.setItem('cartNumbers', productNumbers + 1);
  } else {
    localStorage.setItem('cartNumbers', 1);
  }
  setItems(fabricSofasData);
  
}

function setItems(fabricSofasData) {
  let cartItems = localStorage.getItem('productsInCart');
  cartItems = JSON.parse(cartItems);

  if(cartItems != null){

    if(cartItems[fabricSofasData[productNumber].productName] == undefined) {
      cartItems = {
        ...cartItems,
        [fabricSofasData[productNumber].productName]: fabricSofasData[productNumber]
      }
    }
    cartItems[fabricSofasData[productNumber].productName].inCart += 1;
  } else {
    fabricSofasData[productNumber].inCart = 1;
    cartItems = {
      [fabricSofasData[productNumber].productName]: fabricSofasData[productNumber]
    }
  }
  
  localStorage.setItem("productsInCart", JSON.stringify(cartItems));
  
}

function totalCost(product){

  let cartCost = localStorage.getItem('totalCost');

  if(cartCost != null) {
    cartCost = parseInt(cartCost);
    localStorage.setItem("totalCost", cartCost + product.price);
  } else {
    localStorage.setItem("totalCost", product.price);
  }

}

onLoadCartNumbers();
