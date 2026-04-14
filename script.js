const services = [
  {
    id: "bpo",
    title: "BPO",
    short: "Externalización operativa estructurada",
    problem: "La operación se sobrecarga y pierde control en momentos críticos",
    diagnosis: [
      "Procesos manuales y dispersos",
      "Sobrecarga operativa",
      "Falta de continuidad",
    ],
    solution: [
      "Externalización operativa estructurada",
      "Procesos estandarizados",
      "Soporte continuo",
    ],
    result: "Operación estable, continua y controlada",
    position: { x: 18, y: 30 },
    curve: "M500,500 C390,430 290,350 180,300",
  },
  {
    id: "contratos",
    title: "Administración de contratos",
    short: "Gestión estructurada y control de cumplimiento",
    problem: "Los contratos existen, pero no se gestionan",
    diagnosis: [
      "Falta de control documental",
      "Desviaciones no detectadas",
      "Procesos manuales",
    ],
    solution: [
      "Gestión estructurada de contratos",
      "Control de cumplimiento",
      "Seguimiento de estados de pago",
    ],
    result: "Control contractual real y reducción de riesgos",
    position: { x: 69, y: 18 },
    curve: "M500,500 C590,400 650,260 700,190",
  },
  {
    id: "sap",
    title: "Soporte Funcional SAP",
    short: "Soporte con SLA y visibilidad operativa",
    problem: "La operación no se detiene, pero los sistemas fallan",
    diagnosis: [
      "Incidentes sin trazabilidad",
      "Respuesta reactiva",
      "Baja visibilidad",
    ],
    solution: [
      "Mesa de soporte estructurada",
      "Gestión por SLA",
      "Mejora continua",
    ],
    result: "Continuidad operacional con control y visibilidad",
    position: { x: 82, y: 50 },
    curve: "M500,500 C620,500 730,490 820,500",
  },
  {
    id: "transformacion",
    title: "Acompañamiento en proyectos de transformación",
    short: "Aterrizaje operativo con control de avance real",
    problem: "Los proyectos avanzan, pero no aterrizan en la operación",
    diagnosis: [
      "Desalineación negocio–tecnología",
      "Falta de seguimiento",
      "Baja adopción",
    ],
    solution: [
      "Acompañamiento operativo",
      "Gestión de actividades",
      "Control de avance real",
    ],
    result: "Proyectos que se implementan y funcionan",
    position: { x: 64, y: 78 },
    curve: "M500,500 C560,590 620,690 650,780",
  },
  {
    id: "ia",
    title: "Faros IA",
    short: "Agentes, análisis e integración con sistemas",
    problem: "Los datos existen, pero no se usan",
    diagnosis: [
      "Información dispersa",
      "Decisiones manuales",
      "Baja explotación de datos",
    ],
    solution: [
      "Agentes inteligentes",
      "Automatización de análisis",
      "Integración con sistemas",
    ],
    result: "Decisiones más rápidas y basadas en datos",
    position: { x: 18, y: 72 },
    curve: "M500,500 C380,590 270,690 180,720",
  },
];

const state = {
  currentView: "intro",
  currentService: null,
  storyTimeline: null,
};

const views = {
  intro: document.querySelector('[data-view="intro"]'),
  map: document.querySelector('[data-view="map"]'),
  service: document.querySelector('[data-view="service"]'),
};

const introButton = document.getElementById("enterFaros");
const backButton = document.getElementById("backToMap");
const replayButton = document.getElementById("replayStory");
const serviceNodes = document.getElementById("serviceNodes");
const servicePaths = document.getElementById("servicePaths");
const networkHub = document.getElementById("networkHub");
const storyPhaseLabel = document.getElementById("storyPhaseLabel");
const serviceEyebrow = document.getElementById("serviceEyebrow");
const serviceTitle = document.getElementById("serviceTitle");
const impactStatement = document.getElementById("impactStatement");
const resultStatement = document.getElementById("resultStatement");
const diagnosisGrid = document.getElementById("diagnosisGrid");
const problemLayer = document.getElementById("problemLayer");
const transformationLayer = document.getElementById("transformationLayer");
const resultLayer = document.getElementById("resultLayer");

function initIntroAnimation() {
  const logo = document.querySelector(".logo-mark");
  const rings = document.querySelectorAll(".logo-ring, .logo-beam");

  gsap.to(logo, {
    scale: 1.04,
    duration: 2.6,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  });

  gsap.to(rings, {
    opacity: 0.42,
    duration: 2.2,
    stagger: 0.1,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  });
}

function renderNetwork() {
  services.forEach((service) => {
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", service.curve);
    path.setAttribute("class", "network-path");
    path.dataset.service = service.id;
    servicePaths.appendChild(path);

    const node = document.createElement("button");
    node.className = "network-node";
    node.dataset.service = service.id;
    node.style.left = `${service.position.x}%`;
    node.style.top = `${service.position.y}%`;
    node.innerHTML = `
      <span class="node-title">${service.title}</span>
      <span class="node-copy">${service.short}</span>
    `;

    node.addEventListener("mouseenter", () => highlightService(service.id));
    node.addEventListener("mouseleave", clearHighlights);
    node.addEventListener("focus", () => highlightService(service.id));
    node.addEventListener("blur", clearHighlights);
    node.addEventListener("click", () => openService(service.id));

    serviceNodes.appendChild(node);
  });

  preparePaths();
}

function preparePaths() {
  document.querySelectorAll(".network-path").forEach((path) => {
    const length = path.getTotalLength();
    path.dataset.length = length;
    path.style.strokeDasharray = `${length}`;
    path.style.strokeDashoffset = `${length}`;
  });
}

function highlightService(serviceId) {
  document.querySelectorAll(".network-node").forEach((node) => {
    const active = node.dataset.service === serviceId;
    node.classList.toggle("is-active", active);
    node.classList.toggle("is-muted", !active);
  });

  document.querySelectorAll(".network-path").forEach((path) => {
    const active = path.dataset.service === serviceId;
    path.classList.toggle("is-highlighted", active);
    path.classList.toggle("is-muted", !active);
  });
}

function clearHighlights() {
  document.querySelectorAll(".network-node").forEach((node) => {
    node.classList.remove("is-active", "is-muted");
  });

  document.querySelectorAll(".network-path").forEach((path) => {
    path.classList.remove("is-highlighted", "is-muted");
  });
}

function switchView(nextView) {
  if (state.currentView === nextView) return null;

  const current = views[state.currentView];
  const next = views[nextView];
  const tl = gsap.timeline();

  tl.to(current, {
    autoAlpha: 0,
    duration: 0.45,
    ease: "power2.inOut",
  })
    .set(next, { autoAlpha: 0, display: "block" })
    .add(() => next.classList.add("is-active"))
    .add(() => current.classList.remove("is-active"))
    .fromTo(next, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.65, ease: "power2.out" });

  state.currentView = nextView;
  return tl;
}

function enterExperience() {
  const tl = gsap.timeline({
    onComplete: () => {
      const viewTransition = switchView("map");
      if (viewTransition) {
        viewTransition.eventCallback("onComplete", animateMapIn);
      }
    },
  });

  tl.to(".logo-gateway", {
    scale: 1.18,
    duration: 0.55,
    ease: "power2.in",
  })
    .to(".logo-ring-a", { scale: 1.6, opacity: 0, duration: 0.65, ease: "power3.inOut" }, 0)
    .to(".logo-ring-b", { scale: 1.9, opacity: 0, duration: 0.65, ease: "power3.inOut" }, 0.04)
    .to(".logo-core", { scale: 0.45, opacity: 0, duration: 0.55, ease: "power2.in" }, 0)
    .to(".logo-copy", { y: -18, opacity: 0, duration: 0.45, ease: "power2.in" }, 0.05)
    .to(".intro-grid", { opacity: 0, duration: 0.45 }, 0)
    .to(".intro-view", { autoAlpha: 0, duration: 0.3 }, 0.48);
}

function animateMapIn() {
  clearHighlights();

  gsap.fromTo(
    networkHub,
    { scale: 0.82, opacity: 0 },
    { scale: 1, opacity: 1, duration: 1, ease: "power3.out" },
  );

  gsap.fromTo(
    ".network-path",
    {
      opacity: 0,
      strokeDashoffset: (_, target) => Number(target.dataset.length || 0),
    },
    {
      opacity: 0.34,
      strokeDashoffset: 0,
      duration: 1.2,
      stagger: 0.08,
      ease: "power2.out",
    },
  );

  gsap.fromTo(
    ".network-node",
    { opacity: 0, scale: 0.8 },
    { opacity: 0.45, scale: 1, duration: 0.9, stagger: 0.08, ease: "power3.out" },
  );
}

function populateService(service) {
  serviceEyebrow.textContent = "Servicio FAROS";
  serviceTitle.textContent = service.title;
  storyPhaseLabel.textContent = "Problema";
  impactStatement.textContent = service.problem;
  resultStatement.textContent = service.result;

  diagnosisGrid.innerHTML = service.diagnosis
    .map(
      (item, index) => `
        <article class="diagnosis-card" data-index="${index}">
          <span class="card-index">Diagnóstico ${index + 1}</span>
          <p class="card-text">${item}</p>
        </article>
      `,
    )
    .join("");
}

function runServiceStory(service) {
  if (state.storyTimeline) {
    state.storyTimeline.kill();
  }

  populateService(service);

  const cards = gsap.utils.toArray(".diagnosis-card");
  const cardTexts = cards.map((card) => card.querySelector(".card-text"));
  const cardIndexes = cards.map((card) => card.querySelector(".card-index"));

  gsap.set(problemLayer, { opacity: 1, scale: 1 });
  gsap.set(transformationLayer, { opacity: 1 });
  gsap.set(resultLayer, { opacity: 0, scale: 0.92 });
  gsap.set(cards, {
    opacity: 0,
    scale: 0.7,
    x: (index) => (index === 0 ? -120 : index === 1 ? 0 : 120),
    y: 34,
  });
  gsap.set(".transformation-beam", { opacity: 0, xPercent: -26 });

  const tl = gsap.timeline();

  tl.fromTo(
    ".hero-statement",
    { opacity: 0, y: 26 },
    { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" },
  )
    .to(".focus-pulse", {
      scale: 1.12,
      opacity: 0.95,
      duration: 1.3,
      repeat: 1,
      yoyo: true,
      ease: "sine.inOut",
    }, 0)
    .add(() => {
      storyPhaseLabel.textContent = "Diagnóstico";
    }, "+=0.2")
    .to(problemLayer, {
      opacity: 0.22,
      scale: 0.97,
      duration: 0.55,
      ease: "power2.inOut",
    })
    .to(cards, {
      opacity: 1,
      scale: 1,
      x: 0,
      y: 0,
      duration: 0.75,
      stagger: 0.12,
      ease: "power3.out",
    }, "<0.05")
    .add(() => {
      storyPhaseLabel.textContent = "Solución";
    }, "+=0.85")
    .to(".transformation-beam", {
      opacity: 1,
      xPercent: 24,
      duration: 0.95,
      ease: "power2.inOut",
    })
    .to(cards, {
      x: (index) => (index === 0 ? -110 : index === 1 ? 0 : 110),
      y: (index) => (index === 1 ? -66 : 54),
      scale: 1.04,
      duration: 0.85,
      stagger: 0.06,
      ease: "power3.inOut",
    }, "<")
    .add(() => {
      cards.forEach((card, index) => {
        card.classList.add("is-solution");
        cardIndexes[index].textContent = `Solución ${index + 1}`;
      });
    })
    .to(cardTexts, {
      y: -28,
      duration: 0.5,
      stagger: 0.05,
      ease: "power2.inOut",
      onComplete: () => {
        cardTexts.forEach((text, index) => {
          text.textContent = service.solution[index];
        });
      },
    })
    .to(cardTexts, {
      y: 0,
      duration: 0.5,
      stagger: 0.05,
      ease: "power2.out",
    })
    .add(() => {
      storyPhaseLabel.textContent = "Resultado";
    }, "+=0.8")
    .to(cards, {
      x: 0,
      y: 0,
      scale: 0.72,
      opacity: 0.16,
      duration: 0.8,
      stagger: 0.04,
      ease: "power2.inOut",
    })
    .to(problemLayer, {
      opacity: 0,
      duration: 0.55,
      ease: "power2.out",
    }, "<")
    .to(resultLayer, {
      opacity: 1,
      scale: 1,
      duration: 0.95,
      ease: "power3.out",
    }, "-=0.15")
    .fromTo(
      ".result-statement",
      { opacity: 0, y: 22 },
      { opacity: 1, y: 0, duration: 0.75, ease: "power3.out" },
      "<0.05",
    )
    .to(".result-halo", {
      scale: 1.08,
      duration: 1.4,
      repeat: 1,
      yoyo: true,
      ease: "sine.inOut",
    }, "<");

  state.storyTimeline = tl;
}

function openService(serviceId) {
  const service = services.find((item) => item.id === serviceId);
  if (!service) return;

  state.currentService = service;
  highlightService(serviceId);

  const targetNode = document.querySelector(`.network-node[data-service="${serviceId}"]`);
  const targetPath = document.querySelector(`.network-path[data-service="${serviceId}"]`);

  gsap.timeline({
    onComplete: () => {
      const viewTransition = switchView("service");
      if (viewTransition) {
        viewTransition.eventCallback("onComplete", () => runServiceStory(service));
      }
    },
  })
    .to(".network-node", {
      opacity: (_, element) => (element === targetNode ? 1 : 0.08),
      duration: 0.45,
      ease: "power2.inOut",
    })
    .to(targetPath, {
      stroke: "rgba(198, 166, 107, 0.9)",
      strokeWidth: 3,
      opacity: 1,
      duration: 0.42,
      ease: "power2.inOut",
    }, "<")
    .to(".network-stage", {
      scale: 1.03,
      opacity: 0,
      duration: 0.58,
      ease: "power2.inOut",
    });
}

function returnToMap() {
  const viewTransition = switchView("map");

  clearHighlights();
  gsap.set(".network-stage", { opacity: 1, scale: 1 });
  gsap.set(".network-node", { opacity: 0.45, scale: 1 });
  gsap.set(".network-path", {
    clearProps: "stroke,strokeWidth",
    strokeDashoffset: (_, target) => Number(target.dataset.length || 0),
  });

  if (viewTransition) {
    viewTransition.eventCallback("onComplete", animateMapIn);
  }
}

introButton.addEventListener("click", enterExperience);
backButton.addEventListener("click", returnToMap);
replayButton.addEventListener("click", () => {
  if (state.currentService) {
    runServiceStory(state.currentService);
  }
});

renderNetwork();
initIntroAnimation();
