const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");
const navbar = document.getElementById("navbar");

// Toggle menu
hamburger.addEventListener("click", (e) => {
  e.stopPropagation();
  navLinks.classList.toggle("active");
});

// Home scroll top
document.querySelector('[data-link="home"]').addEventListener("click", (e) => {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

// Close menu on link click
document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
  });
});

// Close when clicking outside
document.addEventListener("click", (e) => {
  const isInside = navbar.contains(e.target);
  if (!isInside) {
    navLinks.classList.remove("active");
  }
});

// Close on scroll (better UX)
window.addEventListener("scroll", () => {
  navLinks.classList.remove("active");
});