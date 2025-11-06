// Cursor Motion
const cursor = document.querySelector(".cursor");
document.addEventListener("mousemove", e => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});
document.addEventListener("mousedown", () => cursor.style.transform = "scale(0.8)");
document.addEventListener("mouseup", () => cursor.style.transform = "scale(1)");

// Sample artworks for homepage
const artworks = [
  { title: "Dreamscape", image: "https://picsum.photos/400/300?1" },
  { title: "City Lights", image: "https://picsum.photos/400/300?2" },
  { title: "Cosmic Bloom", image: "https://picsum.photos/400/300?3" },
  { title: "Tranquil Mind", image: "https://picsum.photos/400/300?4" },
  { title: "Neon Mirage", image: "https://picsum.photos/400/300?5" },
];

const artContainer = document.getElementById("art-container");
if (artContainer) {
  artworks.forEach(art => {
    const card = document.createElement("div");
    card.className = "art-card fade-in";
    card.innerHTML = `<img src="${art.image}" alt="${art.title}"><h3>${art.title}</h3>`;
    artContainer.appendChild(card);
  });
}

// Smooth scroll fade-in on scroll
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in-visible");
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll(".fade-in").forEach(el => observer.observe(el));

// Upload preview
const uploadForm = document.getElementById("uploadForm");
if (uploadForm) {
  uploadForm.addEventListener("submit", e => {
    e.preventDefault();
    const title = document.getElementById("title").value;
    const file = document.getElementById("image").files[0];
    const preview = document.getElementById("preview");

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        preview.innerHTML = `<div class="art-card fade-in"><img src="${reader.result}" alt="${title}"><h3>${title}</h3></div>`;
      };
      reader.readAsDataURL(file);
    }
  });
}

// Commission form alert
const commissionForm = document.getElementById("commissionForm");
if (commissionForm) {
  commissionForm.addEventListener("submit", e => {
    e.preventDefault();
    alert("Thank you! Your commission request has been sent successfully.");
    commissionForm.reset();
  });
}
