document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.querySelector(".navbar");

  window.addEventListener("scroll", () => {
    if (navbar) {
      navbar.classList.toggle("scrolled", window.scrollY > 40);
    }
  });

  const revealItems = document.querySelectorAll(".section, .card, .stat, .founder-box, .cta");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    revealItems.forEach(item => {
      item.classList.add("reveal");
      observer.observe(item);
    });
  } else {
    revealItems.forEach(item => item.classList.add("show"));
  }

  const topBtn = document.createElement("button");
  topBtn.id = "topBtn";
  topBtn.innerHTML = "↑";
  topBtn.setAttribute("aria-label", "Back to top");
  document.body.appendChild(topBtn);

  topBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
      topBtn.style.opacity = "1";
      topBtn.style.visibility = "visible";
    } else {
      topBtn.style.opacity = "0";
      topBtn.style.visibility = "hidden";
    }
  });

  const darkToggle = document.createElement("button");
  darkToggle.id = "darkToggle";
  darkToggle.innerHTML = "🌙";
  darkToggle.setAttribute("aria-label", "Toggle dark mode");
  document.body.appendChild(darkToggle);

  if (localStorage.getItem("nepashyaTheme") === "dark") {
    document.body.classList.add("dark");
    darkToggle.innerHTML = "☀️";
  }

  darkToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
      localStorage.setItem("nepashyaTheme", "dark");
      darkToggle.innerHTML = "☀️";
    } else {
      localStorage.setItem("nepashyaTheme", "light");
      darkToggle.innerHTML = "🌙";
    }
  });

  const galleryImages = document.querySelectorAll(".gallery img");

  if (galleryImages.length > 0) {
    const lightbox = document.createElement("div");
    lightbox.className = "lightbox";
    lightbox.innerHTML = `
      <button class="lightbox-close" aria-label="Close image">×</button>
      <img src="" alt="">
    `;

    document.body.appendChild(lightbox);

    const lightboxImg = lightbox.querySelector("img");
    const closeBtn = lightbox.querySelector(".lightbox-close");

    galleryImages.forEach(img => {
      img.addEventListener("click", () => {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt || "Gallery image";
        lightbox.classList.add("active");
      });
    });

    closeBtn.addEventListener("click", () => {
      lightbox.classList.remove("active");
    });

    lightbox.addEventListener("click", event => {
      if (event.target === lightbox) {
        lightbox.classList.remove("active");
      }
    });

    document.addEventListener("keydown", event => {
      if (event.key === "Escape") {
        lightbox.classList.remove("active");
      }
    });
  }
});
