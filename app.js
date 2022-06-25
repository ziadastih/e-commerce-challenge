//============ open nav links event=====
const navLinks = document.querySelector(".links-container");
const toggleMenu = document.querySelector(".toggle-menu");
const closeBtn = document.getElementById("close-btn");

toggleMenu.addEventListener("click", function () {
  navLinks.classList.add("open-menu");
  cartChart.classList.remove("show-cart-info");
});
closeBtn.addEventListener("click", function () {
  navLinks.classList.remove("open-menu");
});

// ===open cart item ===============
const cart = document.querySelector(".cart");
const cartChart = document.querySelector(".cart-info");
cart.addEventListener("click", function () {
  cartChart.classList.toggle("show-cart-info");
});
// ============end of navigation click events===

// ========creating array of object as proto of what data would be

const items = [
  {
    id: 0,
    edition: `fall limited edition sneakers`,
    info: `these low-profile sneakers are your perfect casual wear companion.featuring a dudrable rubber outer sole.they'll withstand everything the waether can offer`,

    discount: 25,
    oldPrice: 350.0,
    url0: "./images/image-product-1.jpg",
    url1: "./images/image-product-2.jpg",
    url2: "./images/image-product-3.jpg",
    url3: "./images/image-product-4.jpg",
  },
  {
    id: 1,
    edition: `fall limited edition sneakers`,
    info: `these low-profile sneakers are your perfect casual wear companion.featuring a dudrable rubber outer sole.they'll withstand everything the waether can offer`,

    discount: 50,
    oldPrice: 250.0,
    url0: "./images/image-product-1.jpg",
    url1: "./images/image-product-2.jpg",
    url2: "./images/image-product-3.jpg",
    url3: "./images/image-product-4.jpg",
  },
];

const shop = document.querySelector(".shop");

// =======function to displayshop no matter how many item we have in it
function displayShop() {
  let listItems = " ";
  for (let i = 0; i < items.length; i++) {
    let item = items[i];
    let mainPrice = item.oldPrice - (item.oldPrice * item.discount) / 100;

    listItems += `<section class="main-container" id=${item.id}>
  <div class="images-section">
  <div class="main-Image-container">
   
  <img src=${item.url0} class="main-img" alt="">
  
  <div class="switch-btns">
  <img src="./images/icon-previous.svg" class="previous-btn" id ="prev-btn"alt="">
  <img src="./images/icon-next.svg" class="next-btn" id="next-btn" alt="">
 </div>
  </div>
  
  <div class="images-album">
  <img src=${item.url0} data-id = "0" alt="" >
  <img src=${item.url1} data-id = "1"alt="">
  <img src=${item.url2}  data-id = "2"alt="">
  <img src=${item.url3} data-id="3"  alt="">
  </div>
</div>

<div class="text-content">
  <h3>SNEAKER COMPANY</h3>
  <h1 class="edition">${item.edition}</h1>
  <p class="info">${item.info} </p>

<div class="prices-info">
<p class="main-price">$${mainPrice} <span class="discount"> ${item.discount}%</span></p>
<span class="old-price">$${item.oldPrice}</span>

</div>
<div class="btn-container">
  <div class="items-amount-counter">
    <img src="./images/icon-minus.svg" class="minus-btn" alt="">
    <span class="number">0</span>
    <img src="./images/icon-plus.svg" class="plus-btn" alt="">
  </div>
  <button class="add-item-btn"><i class="fa-solid fa-cart-shopping"></i> Add to cart</button>
</div>
</div>

</section>
<span class="section-line"></span>`;
  }
  shop.innerHTML = listItems;
  // ======auto main price clac======
}

// ======window display all shop item=======
window.addEventListener("DOMContentLoaded", function () {
  displayShop();
});

// =======remove menu when we scroll more than 100px in window
window.addEventListener("scroll", function (e) {
  e.preventDefault();
  let scrollHeight = window.pageYOffset;
  if (scrollHeight > 100) {
    navLinks.classList.remove("open-menu");
  }
});
