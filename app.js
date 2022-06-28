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

// =========ITEMS ARRAY =========================
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
    order: "0",
  },
  {
    id: 1,
    edition: `Summer limited edition sneakers`,
    info: `these low-profile sneakers are your perfect casual wear companion.featuring a dudrable rubber outer sole.they'll withstand everything the waether can offer`,

    discount: 50,
    oldPrice: 250.0,
    url0: "./images/image-product-1.jpg",
    url1: "./images/image-product-2.jpg",
    url2: "./images/image-product-3.jpg",
    url3: "./images/image-product-4.jpg",
    order: "0",
  },
];

// ================= VARIABLES=======================
const shop = document.querySelector(".shop");
const modal = document.querySelector(".modal");
const closeModal = document.getElementById("modal-close-btn");
const itemsInCartNum = document.querySelector(".items-in-cart");
const modalMainImg = document.querySelector(".modal-main-img");
const modalAlbum = document.querySelector(".modal-images-album");
const modalPrevBtn = document.querySelector(".modal-prev-btn");
const modalNextBtn = document.querySelector(".modal-next-btn");
const cartItems = document.querySelector(".cart-items");
const cartInfo = document.querySelector(".cart-info");
const checkoutBtn = document.querySelector(".checkout-btn");

let myCart = [];

// =======DISPLAY OUR DATA FROM ITEMS ARRAY ........ FUNCTION==========
function displayShop() {
  let listItems = " ";
  for (let i = 0; i < items.length; i++) {
    let item = items[i];
    let mainPrice = item.oldPrice - (item.oldPrice * item.discount) / 100;

    listItems += `<section class="main-container" data-id=${item.id}>
  <div class="images-section">
  <div class="main-Image-container" data-id=${item.id}>
   
  <img src=${item.url0} class="main-img" alt="">
  
  <div class="switch-btns">
  <img src="./images/icon-previous.svg" class="previous-btn" id ="previous-btn"alt="">
  <img src="./images/icon-next.svg" class="next-btn" id="next-btn" alt="">
 </div>
  </div>
  
  <div class="images-album">
  <img src=${item.url0} class="mini-img selected " id = "0" alt="" >
  <img src=${item.url1} class= "mini-img" id = "1"alt="">
  <img src=${item.url2} class= "mini-img"  id = "2"alt="">
  <img src=${item.url3} class ="mini-img" id="3"  alt="">
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

  // =========FOR EACH CONTAINER FUNCTION..============================
  const mainContainer = document.querySelectorAll(".main-container");

  mainContainer.forEach(function (container) {
    let count = 0;
    const pervBtn = container.querySelectorAll("#previous-btn");
    const nextBtn = container.querySelectorAll("#next-btn");
    const mainImg = container.querySelector(".main-img");
    const miniImg = container.querySelectorAll(".mini-img");
    const counter = container.querySelectorAll(".items-amount-counter");

    // ========desktop selected img and switch main img
    miniImg.forEach(function (smallimg) {
      smallimg.addEventListener("click", function () {
        mainImg.src = smallimg.src;
        miniImg.forEach(function (item) {
          if (item !== smallimg) {
            item.classList.remove("selected");
          }
          smallimg.classList.add("selected");
        });
      });
    });

    // ===========prev btn for mobile =============

    pervBtn.forEach(function (btn) {
      btn.addEventListener("click", function () {
        count--;
        if (count < 0) {
          count = 3;
        }

        let strcount = count.toString();
        let img = document.getElementById(strcount);
        mainImg.src = img.src;
      });
    });

    // ==========next Btn for mobile ===========
    nextBtn.forEach(function (next) {
      next.addEventListener("click", function () {
        count++;

        if (count > 3) {
          count = 0;
        }

        let strcount = count.toString();
        let img = document.getElementById(strcount);
        mainImg.src = img.src;
      });
    });
    // =================COUNTER FUNCTION==============
    //==========counter btn==============
    counter.forEach(function (counter) {
      const number = counter.querySelector(".number");
      let amount = 0;
      number.textContent = amount;
      const minusBtn = counter.querySelector(".minus-btn");
      const plusBtn = counter.querySelector(".plus-btn");
      // ========plus btn=========
      plusBtn.addEventListener("click", function () {
        amount++;
        number.textContent = amount;
      });
      // ==========minus btn ========
      minusBtn.addEventListener("click", function () {
        amount--;
        if (amount < 0) {
          amount = 0;
        }
        number.textContent = amount;
      });

      // =======ADD ITEM TO CART FUNCTION====================
      // =========add to cart btn and cart display  inside the counter so they cant add any item unless they actually select a number===========

      const addToCartBtn = container.querySelectorAll(".add-item-btn");

      addToCartBtn.forEach(function (addBtn) {
        addBtn.addEventListener("click", function () {
          let id = container.dataset.id;
          let itemAdded = items[id];
          // ========adding items to array===
          if (!myCart.includes(itemAdded) && amount > 0) {
            itemAdded.order = amount;
            myCart.push(itemAdded);
            localStorage.setItem("myCart", JSON.stringify(myCart));
          }
          addItemToCart(myCart);
        });
      });
    });

    // ==========MODAL FUNCTIONS==============================
    // ===========img select to open modal======
    mainImg.addEventListener("click", function (e) {
      let element = e.target.parentElement.dataset.id;
      let albumItems = items[element];
      modal.classList.add("open-modal");
      modalAlbum.innerHTML = `<img src=${albumItems.url0} class="modal-mini-img"  alt="" id="0">
<img src=${albumItems.url1} class="modal-mini-img" id="1" alt="">
<img src=${albumItems.url2}  class = "modal-mini-img" id="2"alt="">
<img  src=${albumItems.url3}  class= "modal-mini-img" id"3"alt="">`;
      // =======close modal btn==========
      closeModal.addEventListener("click", function () {
        modal.classList.remove("open-modal");
      });
      // ======modal main img========
      modalMainImg.src = mainImg.src;
      const modalMiniImg = document.querySelectorAll(".modal-mini-img");
      modalMiniImg.forEach(function (smallimg) {
        smallimg.addEventListener("click", function () {
          modalMainImg.src = smallimg.src;
          modalMiniImg.forEach(function (item) {
            if (item !== smallimg) {
              item.classList.remove("selected");
            }
            smallimg.classList.add("selected");
          });
        });
      });
      // ========modal prev btn========================
      modalPrevBtn.addEventListener("click", function () {
        count--;
        if (count < 0) {
          count = 3;
        }

        let strcount = count.toString();
        let img = document.getElementById(strcount);
        modalMainImg.src = img.src;
      });

      // ==========modal next Btn for mobile ===========

      modalNextBtn.addEventListener("click", function () {
        count++;

        if (count > 3) {
          count = 0;
        }

        let strcount = count.toString();
        let img = document.getElementById(strcount);
        modalMainImg.src = img.src;
      });
    });
  });
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

// ==========add items to cart function==========

function addItemToCart(Arr) {
  // ======show the checkout btn=====
  checkoutBtn.classList.add("add-checkout");
  // ===empty item====
  let itemlist = " ";
  // ====add the cart num also check if my cart array is empty i want to remove all and put a message instead
  itemsInCartNum.classList.add("show-item-cart-number");
  itemsInCartNum.textContent = myCart.length;
  if (myCart.length === 0) {
    cartItems.innerHTML = itemsInCartNum.classList.remove(
      "show-item-cart-number"
    );
    cartChart.classList.remove("show-cart-info");
    checkoutBtn.classList.remove("add-checkout");
  }
  // ====if array is empty put a message if not the for loop over it and display items
  if (Arr.length === 0) {
    cartItems.innerHTML = `<p>Your cart is empty </p>`;
  } else {
    for (let i = 0; i < Arr.length; i++) {
      // ======name shortcut====
      let shortcutName = Arr[i].edition.split(" ").slice(0, 3).join(" ");
      // =====main price calc=======
      let mainPrice =
        Arr[i].oldPrice - (Arr[i].oldPrice * Arr[i].discount) / 100;

      itemlist += ` <div class="item-info" >
    <img src=${Arr[i].url0} class="item-img" alt="">
    <div class="text">
      <p class="item-name">${shortcutName}...</p>
      <p class="item-value">${mainPrice} * ${
        Arr[i].order
      } <span class="total">$${mainPrice * Arr[i].order}
    </span></p>
    </div >

    <img src="./images/icon-delete.svg" alt="" class="delete-item" id =${i}>
  </div>`;
    }
    cartItems.innerHTML = itemlist;

    // =======delete btn search for the element id that we gave then turn it into number then ask to splice this item from array
    const deleteItem = document.querySelectorAll(".delete-item");
    deleteItem.forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        let element = e.target.id;

        function removeItem(myCart) {
          const elementNumber = parseInt(element);
          if (elementNumber !== -1) {
            myCart.splice(elementNumber, 1);
            console.log(myCart);
            return myCart;
          }
        }
        // ===call the remove function then add the new array to the local storage then call the original function to display what left in array
        removeItem(myCart);
        localStorage.setItem("myCart", JSON.stringify(myCart));
        addItemToCart(myCart);
      });
    });
  }
}

// =======local storage for the cart items when refresh we want to get our item from local storage from previous session================
const itemFromLocalS = JSON.parse(localStorage.getItem("myCart"));
if (itemFromLocalS) {
  myCart = itemFromLocalS;

  addItemToCart(myCart);
}
