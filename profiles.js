const container = document.getElementById("studentContainer");
const pageNumbers = document.getElementById("pageNumbers");

let students = [];
let filteredStudents = [];
let currentPage = 1;
let perPage = 6;

/* Responsive per page */
function updatePerPage() {
  const width = window.innerWidth;

  if (width <= 600) {
    perPage = 4; // mobile
  } else {
    perPage = 6; // tablet + desktop
  }
}

/* Fetch JSON */
fetch("students.json")
  .then(res => res.json())
  .then(data => {
    students = data;
    filteredStudents = students;
    renderPage();
  });

/* Render Page */
function renderPage() {
  updatePerPage();

  window.scrollTo({ top: 0, behavior: "smooth" });

  container.innerHTML = "";

  const start = (currentPage - 1) * perPage;
  const pageData = filteredStudents.slice(start, start + perPage);

  pageData.forEach(student => {
    const card = `
      <div class="card">
        <img src="${student.image}" />
          <h3>${student.name}</h3>
          <p style="color:orange; font-style: italic; font-family: cursive;margin: 0.5rem auto;">${student.bio}</p>
        <div class="card_info">
          <p>Location: ${student.district}</p>
          <p>District: ${student.homeTown}</p>
          <p>Blood Group: ${student.bloodGroup}</p>
        </div>
        <button class="add-btn" onclick="openProfile('${student.facebook}')">
          Add Friend
        </button>
      </div>
    `;
    container.innerHTML += card;
  });

  renderPagination();
}

/* Pagination */
function renderPagination() {
  pageNumbers.innerHTML = "";

  const totalPages = Math.ceil(filteredStudents.length / perPage);

  let start = Math.max(1, currentPage - 1);
  let end = Math.min(totalPages, start + 2);

  if (end - start < 2) {
    start = Math.max(1, end - 2);
  }

  for (let i = start; i <= end; i++) {
    const btn = document.createElement("button");
    btn.innerText = i;

    if (i === currentPage) btn.classList.add("active");

    btn.onclick = () => {
      currentPage = i;
      renderPage();
    };

    pageNumbers.appendChild(btn);
  }

  document.getElementById("prevBtn").onclick = () => {
    if (currentPage > 1) {
      currentPage--;
      renderPage();
    }
  };

  document.getElementById("nextBtn").onclick = () => {
    if (currentPage < totalPages) {
      currentPage++;
      renderPage();
    }
  };
}

/* Search */
document.getElementById("searchInput").addEventListener("input", function () {
  const value = this.value.toLowerCase();

  filteredStudents = students.filter(s =>
    s.name.toLowerCase().includes(value)
  );

  currentPage = 1;

  if (filteredStudents.length === 0) {
    container.innerHTML = "<h2 class='notFound'>Not Found</h2>";
    pageNumbers.innerHTML = "";
  } else {
    renderPage();
  }
});

/* Open FB */
function openProfile(link) {
  window.open(link, "_blank");
}

/* Resize auto update */
window.addEventListener("resize", () => {
  renderPage();
});