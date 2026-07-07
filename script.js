// Diagnostics & Territoires — interactions du site

document.addEventListener("DOMContentLoaded", () => {
  // Année courante dans le pied de page
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Menu mobile
  const toggle = document.getElementById("nav-toggle");
  const nav = document.getElementById("main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
    });
    nav.querySelectorAll("a").forEach((link) =>
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      })
    );
  }

  // Ombre du bandeau au défilement
  const header = document.querySelector(".site-header");
  if (header) {
    const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  // Apparition au défilement
  const revealables = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealables.forEach((el) => observer.observe(el));
  } else {
    revealables.forEach((el) => el.classList.add("visible"));
  }

  // Formulaire de contact : ouvre le client de messagerie avec le message prérempli.
  // Pour un envoi sans client mail, brancher un service type Formspree ici.
  const form = document.getElementById("contact-form");
  const note = document.getElementById("form-note");
  const DESTINATAIRE = "cabinet@diagnoticsterritoires.com";

  if (form && note) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      note.classList.remove("error");
      note.textContent = "";

      const requis = form.querySelectorAll("[required]");
      let valide = true;
      requis.forEach((champ) => {
        const vide = !champ.value.trim();
        const emailInvalide =
          champ.type === "email" && champ.value.trim() && !champ.checkValidity();
        champ.classList.toggle("invalid", vide || emailInvalide);
        if (vide || emailInvalide) valide = false;
      });

      if (!valide) {
        note.classList.add("error");
        note.textContent = "Merci de renseigner les champs obligatoires (courriel valide requis).";
        return;
      }

      const nom = form.nom.value.trim();
      const structure = form.structure.value.trim();
      const email = form.email.value.trim();
      const sujet = form.sujet.value;
      const message = form.message.value.trim();

      const corps = [
        `Nom : ${nom}`,
        structure ? `Structure : ${structure}` : null,
        `Courriel : ${email}`,
        `Besoin : ${sujet}`,
        "",
        message,
      ]
        .filter((ligne) => ligne !== null)
        .join("\n");

      const lien =
        `mailto:${DESTINATAIRE}` +
        `?subject=${encodeURIComponent(`[Site] ${sujet} — ${nom}`)}` +
        `&body=${encodeURIComponent(corps)}`;

      window.location.href = lien;
      note.textContent =
        "Votre client de messagerie va s'ouvrir avec le message prérempli. Merci !";
    });
  }
});
