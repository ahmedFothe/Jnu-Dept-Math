const tutorial = document.querySelector("#tutorial");

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {

    if (entry.isIntersecting) {
      tutorial.classList.add("active");
    } else {
      tutorial.classList.remove("active");
    }

  });
}, {
  threshold: 0.3
});

observer.observe(tutorial);