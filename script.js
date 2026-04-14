const services = [
  {
    id: "bpo",
    title: "BPO",
    short: "Externalización operativa con estructura y continuidad.",
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
    position: { x: 14, y: 24 },
    curve: "M500,500 C370,430 250,320 160,260",
  },
  {
    id: "contratos",
    title: "Administración de contratos",
    short: "Control contractual, documental y financiero con seguimiento real.",
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
    position: { x: 68, y: 14 },
    curve: "M500,500 C560,360 650,250 760,180",
  },
  {
    id: "sap",
    title: "Soporte Funcional SAP",
    short: "Soporte estructurado con trazabilidad, SLA y mejora continua.",
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
    position: { x: 74, y: 44 },
    curve: "M500,500 C620,470 730,450 840,460",
  },
  {
    id: "transformacion",
    title: "Acompañamiento en proyectos de transformación",
    short: "Aterrizaje operativo para que el proyecto sí funcione.",
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
    position: { x: 60, y: 72 },
    curve: "M500,500 C560,610 650,700 700,790",
  },
  {
    id: "ia",
    title: "Faros IA",
    short: "Datos, automatización e inteligencia conectados a la operación.",
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
    position: { x: 12, y: 68 },
    curve: "M500,500 C390,610 260,720 150,760",
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
const serviceProblem = document.getElementById("serviceProblem");
const servicePanelLabel = document.getElementById("servicePanelLabel");
const servicePanelBody = document.getElementById("servicePanelBody");
const serviceResult = document.getElementById("serviceResult");
const impactStatement = document.getElementById("impactStatement");
const resultStatement = document.getElementById("resultStatement");
const diagnosisGrid = document.getElementById("diagnosisGrid");
const problemLayer = document.getElementById("problemLayer");
const transformationLayer = document.getElementById("transformationLayer");
const resultLayer = document.getElementById("resultLayer");
const resultCard = document.getElementById("resultCard");

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
    node.classList.toggle("is-active", node.dataset.service === serviceId);
  });

  document.querySelectorAll(".network-path").forEach((path) => {
    path.classList.toggle("is-highlighted", path.dataset.service === serviceId);
  });
}

function clearHighlights() {
  document
    .querySelectorAll(".network-node, .network-path")
    .forEach((element) => element.classList.remove("is-active", "is-highlighted"));
}

function switchView(nextView) {
  if (state.currentView === nextView) return;

  const current = views[state.currentView];
  const next = views[nextView];

  const tl = gsap.timeline();

  tl
    .to(current, {
      autoAlpha: 0,
      duration: 0.45,
      ease: "power2.inOut",
    })
    .set(next, {
      autoAlpha: 0,
      display: "block",
    })
    .add(() => next.classList.add("is-active"))
    .add(() => current.classList.remove("is-active"))
    .fromTo(
      next,
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: 0.65, ease: "power2.out" },
    );

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
      opacity: 1,
      strokeDashoffset: 0,
      duration: 1.1,
      stagger: 0.08,
      ease: "power2.out",
    },
  );

  gsap.fromTo(
    ".network-node",
    { y: 18, opacity: 0, scale: 0.96 },
    { y: 0, opacity: 1, scale: 1, duration: 0.9, stagger: 0.09, ease: "power3.out" },
  );
}

function populateService(service) {
  serviceEyebrow.textContent = "Servicio FAROS";
  serviceTitle.textContent = service.title;
  serviceProblem.textContent = service.problem;
  servicePanelLabel.textContent = "Impacto";
  servicePanelBody.textContent = "La tensión operativa aparece cuando el flujo pierde estructura, trazabilidad o continuidad.";
  serviceResult.textContent = service.result;
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

  gsap.set(problemLayer, { opacity: 1 });
  gsap.set(transformationLayer, { opacity: 1 });
  gsap.set(resultLayer, { opacity: 0 });
  gsap.set(cards, { y: 40, opacity: 0, scale: 0.94 });
  gsap.set(".transformation-beam", { opacity: 0, xPercent: -30 });
  gsap.set(resultCard, { opacity: 0.4, y: 12 });

  storyPhaseLabel.textContent = "Problema";

  const tl = gsap.timeline();

  tl.fromTo(
    problemLayer,
    { scale: 0.92, opacity: 0 },
    { scale: 1, opacity: 1, duration: 0.9, ease: "power3.out" },
  )
    .to(".impact-pulse", {
      scale: 1.08,
      opacity: 0.84,
      duration: 1.2,
      repeat: 1,
      yoyo: true,
      ease: "sine.inOut",
    }, 0)
    .add(() => {
      storyPhaseLabel.textContent = "Diagnóstico";
      servicePanelLabel.textContent = "Diagnóstico";
      servicePanelBody.textContent = "Los puntos críticos se hacen visibles y se ordenan para intervenir donde realmente se pierde control.";
    }, "+=0.2")
    .to(problemLayer, {
      opacity: 0.24,
      scale: 0.96,
      duration: 0.6,
      ease: "power2.inOut",
    })
    .to(cards, {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.75,
      stagger: 0.12,
      ease: "power3.out",
    }, "<0.1")
    .add(() => {
      storyPhaseLabel.textContent = "Solución FAROS";
      servicePanelLabel.textContent = "Solución";
      servicePanelBody.textContent = "FAROS convierte fricción operativa en una estructura estable, medible y continua.";
    }, "+=0.8")
    .to(".transformation-beam", {
      opacity: 1,
      xPercent: 30,
      duration: 1,
      ease: "power2.inOut",
    })
    .to(cards, {
      borderColor: "rgba(198, 166, 107, 0.72)",
      boxShadow: "0 22px 60px rgba(162, 133, 78, 0.22)",
      duration: 0.8,
      stagger: 0.08,
    }, "<0.1")
    .to(cards, {
      y: (index) => (index === 1 ? -28 : index === 0 ? 18 : 22),
      x: (index) => (index === 0 ? 56 : index === 2 ? -56 : 0),
      scale: 1.02,
      duration: 0.9,
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
      opacity: 0,
      y: 12,
      duration: 0.28,
      stagger: 0.05,
      ease: "power1.in",
      onComplete: () => {
        cardTexts.forEach((text, index) => {
          text.textContent = service.solution[index];
        });
      },
    })
    .to(cardTexts, {
      opacity: 1,
      y: 0,
      duration: 0.48,
      stagger: 0.08,
      ease: "power2.out",
    })
    .add(() => {
      storyPhaseLabel.textContent = "Resultado";
      servicePanelLabel.textContent = "Resultado";
      servicePanelBody.textContent = service.result;
    }, "+=0.9")
    .to(problemLayer, {
      opacity: 0,
      duration: 0.6,
      ease: "power2.out",
    })
    .to(cards, {
      scale: 0.9,
      opacity: 0.26,
      duration: 0.65,
      stagger: 0.04,
      ease: "power2.inOut",
    }, "<")
    .to(resultLayer, {
      opacity: 1,
      duration: 0.9,
      ease: "power3.out",
    }, "-=0.15")
    .to(".result-orbit", {
      scale: 1.08,
      duration: 1.4,
      repeat: 1,
      yoyo: true,
      ease: "sine.inOut",
    }, "<")
    .to(resultCard, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: "power2.out",
    }, "-=0.5");

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
      opacity: (index, element) => (element === targetNode ? 1 : 0.15),
      scale: (index, element) => (element === targetNode ? 1.08 : 0.92),
      duration: 0.45,
      ease: "power2.inOut",
    })
    .to(targetPath, {
      stroke: "rgba(198, 166, 107, 0.9)",
      strokeWidth: 3,
      duration: 0.4,
      ease: "power2.inOut",
    }, "<")
    .to(".network-stage", {
      scale: 1.05,
      opacity: 0,
      duration: 0.6,
      ease: "power2.inOut",
    });
}

function returnToMap() {
  const viewTransition = switchView("map");
  clearHighlights();
  gsap.set(".network-stage", { opacity: 1, scale: 1 });
  gsap.set(".network-node", { opacity: 1, scale: 1, clearProps: "transform" });
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
