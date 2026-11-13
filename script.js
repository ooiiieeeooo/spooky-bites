const restaurantName = "Spooky Bites";
let isOpen = true;
let customerName = "";
let mealPrice = 0;
let quantity = 1;
let total = 0;

const DISCOUNT_RATE = 0.1;
const DISCOUNT_MIN = 300;

const prices = {
  "Spider Pizza": 150,
  "Pumpkin Pasta": 180,
  "Ghost Burger": 120,
};

const status = document.getElementById("status");
const result = document.getElementById("result");
const orderBtn = document.getElementById("orderBtn");

function showResult(message, isError = false) {
  result.textContent = message;
  result.classList.toggle("error", isError);
}

function displayStatus() {
  status.textContent = isOpen ? "We are OPEN!" : "We are CLOSED!";
  orderBtn.disabled = !isOpen;
  orderBtn.textContent = isOpen ? "Order Now!" : "Closed";
}

function toggleStatus() {
  isOpen = !isOpen;
  displayStatus();
}

function greetCustomer() {
  const name = document.getElementById("customer").value.trim();
  if (!name) {
    showResult("Please enter your name first!", true);
    return;
  }
  showResult(
    "👻 Boo-tiful to see you, " +
      name +
      "! Welcome to " +
      restaurantName +
      ", where every bite is a treat (and a little bit of a trick)! 🎃",
  );
  result.classList.add("greeting");
}

function recommendMeal(amount) {
  if (amount >= 500) {
    return "Our Haunted Feast Platter - perfect for sharing with your fellow ghouls!";
  } else if (amount >= 300) {
    return "Witch's Brew Float - a spooky drink to go with your meal!";
  } else if (amount >= 150) {
    return "Bat Wing Fries - a crispy side to complete your order!";
  }
  return "Candy Corn Cupcake - a sweet little treat!";
}

function placeOrder() {
  result.classList.remove("greeting");
  customerName = document.getElementById("customer").value.trim();
  const selectedMeal = document.getElementById("meal").value;
  quantity = Number(document.getElementById("quantity").value);

  if (!customerName) {
    showResult("Please enter your name first!", true);
    return;
  }
  if (!Number.isInteger(quantity) || quantity < 1) {
    showResult("Please enter a valid quantity.", true);
    return;
  }
  if (!isOpen) {
    showResult("Sorry! The restaurant is closed.", true);
    return;
  }

  mealPrice = prices[selectedMeal];
  total = mealPrice * quantity;

  let discount = 0;
  if (total >= DISCOUNT_MIN) {
    discount = total * DISCOUNT_RATE;
  }
  const finalTotal = total - discount;

  const confirmed = confirm(
    "Confirm your order, " +
      customerName +
      "?\n\n" +
      quantity +
      " x " +
      selectedMeal +
      "\n" +
      "Subtotal: ₱" +
      total.toFixed(2) +
      "\n" +
      "Discount: ₱" +
      discount.toFixed(2) +
      "\n" +
      "Total: ₱" +
      finalTotal.toFixed(2),
  );

  if (!confirmed) {
    showResult(
      "Order cancelled. Come back when you're ready for a scare, " +
        customerName +
        "!",
      true,
    );
    return;
  }

  let summary =
    "Thank you, " +
    customerName +
    "! Your order: " +
    quantity +
    " " +
    selectedMeal +
    "(s). " +
    "Subtotal: ₱" +
    total.toFixed(2) +
    ". ";
  if (discount > 0) {
    summary += "10% discount applied: -₱" + discount.toFixed(2) + ". ";
  } else {
    summary += "Order ₱" + DISCOUNT_MIN + " or more to get a 10% discount. ";
  }
  summary +=
    "Total: ₱" +
    finalTotal.toFixed(2) +
    ". Enjoy your spooky meal! " +
    "Special recommendation: " +
    recommendMeal(finalTotal);
  showResult(summary);
}

function showMenuMessage() {
  alert("Welcome to " + restaurantName + "! Choose your spooky meal.");
}

displayStatus();
orderBtn.addEventListener("click", placeOrder);
document.getElementById("greetBtn").addEventListener("click", greetCustomer);
document.getElementById("toggleBtn").addEventListener("click", toggleStatus);
document
  .querySelector('a[href="#menu"]')
  .addEventListener("click", showMenuMessage);
