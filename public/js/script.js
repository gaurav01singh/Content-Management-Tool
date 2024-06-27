const login1 = document.getElementById("login1");
const register1 = document.getElementById("register1");
const login2 = document.getElementById("login2");
const register2 = document.getElementById("register2");

document.addEventListener("DOMContentLoaded", function () {
  const allButtons = document.querySelectorAll(".searchBtn");
  const searchBar = document.querySelector(".searchBar");
  const searchInput = document.getElementById("searchInput");
  const searchClose = document.getElementById("searchClose");

  for (var i = 0; i < allButtons.length; i++) {
    allButtons[i].addEventListener("click", function () {
      searchBar.style.visibility = "visible";
      searchBar.classList.add("open");
      this.setAttribute("aria-expanded", "true");
      searchInput.focus();
    });
    searchClose.addEventListener("click", function () {
      searchBar.style.visibility = "hidden";
      searchBar.classList.remove("open");
      this.setAttribute("aria-expanded", "false");
    });
  }
});
login2.addEventListener("click", function () {
  register1.style.display = "none";
  login1.style.display = "block";
});

register2.addEventListener("click", function () {
  register1.style.display = "block";
  login1.style.display = "none";
});
