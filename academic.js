document.addEventListener("DOMContentLoaded", () => {

  const statsSection = document.getElementById("stats");
  const statNumbers = document.querySelectorAll(".stat-number");
  const titleSection = document.querySelector(".stats-header");

  /* ================= TITLE ANIMATION ================= */
  const titleObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {

      if (entry.isIntersecting) {
        titleSection.classList.add("active");
      } else {
        titleSection.classList.remove("active");
      }

    });
  }, {
    threshold: 0.5
  });

  titleObserver.observe(titleSection);

  /* ================= COUNTER ================= */
  function startCounter(el) {
    const target = Number(el.dataset.targetValue);
    let count = 0;

    el.textContent = "0";

    const duration = 100;
    const stepTime = Math.max(Math.floor(duration / target), 10);

    const timer = setInterval(() => {
      count++;
      el.textContent = count;

      if (count >= target) {
        clearInterval(timer);
        el.textContent = target;
      }
    }, stepTime);
  }

  function resetCounter() {
    statNumbers.forEach(el => el.textContent = "0");
  }

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {

      if (entry.isIntersecting) {
        resetCounter();

        setTimeout(() => {
          statNumbers.forEach(startCounter);
        }, 150);

      } else {
        resetCounter();
      }

    });
  }, {
    threshold: 0.4
  });

  statsObserver.observe(statsSection);

});