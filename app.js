//============ open nav links event=====
const navLinks = document.querySelector(".links-container");
const toggleMenu = document.querySelector(".toggle-menu");
const closeBtn = document.getElementById("close-btn");

toggleMenu.addEventListener("click", function () {
  navLinks.classList.add("open-menu");
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
