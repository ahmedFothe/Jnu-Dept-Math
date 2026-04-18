window.addEventListener("load", () => {
  setTimeout(() => {
    const loader = document.getElementById("studentLoaderRoot");

    if (loader) {
      loader.style.opacity = "0";

      setTimeout(() => {
        loader.style.display = "none";
      }, 100);
    }

  }, 200);
});