const slides = document.querySelectorAll(".slide");
const text = document.querySelector(".changing-text");
const dotsContainer = document.querySelector(".dots");

const texts = [
  "A moment of unity and pride",
  "Strength is Built by overcoming challenges",
  "We Grow Together",
  "Strong teamwork dives our success",
  "A symphony of collaboration"
];

let index = 0;
let interval; // 🔥 control auto slide

// Create dots + click event
slides.forEach((_, i) => {
  const dot = document.createElement("span");
  dot.classList.add("dot");

  if (i === 0) dot.classList.add("active");

  // 🔥 CLICK EVENT
  dot.addEventListener("click", () => {
    index = i;
    showSlide(index);

    resetAutoSlide(); // 🔥 restart timer
  });

  dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll(".dot");

function showSlide(i) {
  slides.forEach(slide => slide.classList.remove("active"));
  dots.forEach(dot => dot.classList.remove("active"));

  slides[i].classList.add("active");
  dots[i].classList.add("active");

  // Text animation
  text.classList.remove("show");

  setTimeout(() => {
    text.textContent = texts[i % texts.length];
    text.classList.add("show");
  }, 300);
}

// Auto slide
function startAutoSlide() {
  interval = setInterval(() => {
    index = (index + 1) % slides.length;
    showSlide(index);
  }, 4000);
}

// Reset timer when user clicks
function resetAutoSlide() {
  clearInterval(interval);
  startAutoSlide();
}

// Init
showSlide(index);
startAutoSlide();