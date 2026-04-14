gsap.registerPlugin(Flip);

const services = [
  {
    id: "bpo",
    title: "BPO",
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
    map: { x: 190, y: 300 },
    focus: { x: 500, y: 500 },
    diagnosisPositions: [
      { x: 290, y: 430 },
      { x: 500, y: 360 },
      { x: 710, y: 430 },
    ],
    solutionPositions: [
      { x: 330, y: 565 },
      { x: 500, y: 455 },
      { x: 670, y: 565 },
    ],
  },
  {
    id: "contratos",
    title: "Administración de contratos",
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
    map: { x: 700, y: 190 },
    focus: { x: 500, y: 500 },
    diagnosisPositions: [
      { x: 290, y: 430 },
      { x: 500, y: 360 },
      { x: 710, y: 430 },
    ],
    solutionPositions: [
      { x: 315, y: 550 },
      { x: 500, y: 450 },
      { x: 685, y: 550 },
    ],
  },
  {
    id: "sap",
    title: "Soporte Funcional SAP",
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
    map: { x: 820, y: 500 },
    focus: { x: 500, y: 500 },
    diagnosisPositions: [
      { x: 285, y: 430 },
      { x: 500, y: 360 },
      { x: 715, y: 430 },
    ],
    solutionPositions: [
      { x: 330, y: 560 },
      { x: 500, y: 440 },
      { x: 670, y: 560 },
    ],
  },
  {
    id: "transformacion",
    title: "Acompañamiento en proyectos de transformación",
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
    map: { x: 650, y: 780 },
    focus: { x: 500, y: 500 },
    diagnosisPositions: [
      { x: 295, y: 430 },
      { x: 500, y: 360 },
      { x: 705, y: 430 },
    ],
    solutionPositions: [
      { x: 325, y: 560 },
      { x: 500, y: 450 },
      { x: 675, y: 560 },
    ],
  },
  {
    id: "ia",
    title: "Faros IA",
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
    map: { x: 180, y: 720 },
    focus: { x: 500, y: 500 },
    diagnosisPositions: [
      { x: 300, y: 430 },
      { x: 500, y: 360 },
      { x: 700, y: 430 },
    ],
    solutionPositions: [
      { x: 325, y: 560 },
      { x: 500, y: 450 },
      { x: 675, y: 560 },
    ],
  },
];

const state = {
  currentService: null,
  introDone: false,
  activeTimeline: null,
};

const enterButton = document.getElementById("enterFaros");
const introOverlay = document.getElementById("introOverlay");
const hubAnchor = document.getElementById("hubAnchor");
const sceneEyebrow = document.getElementById("sceneEyebrow");
const sceneTitle = document.getElementById("sceneTitle");
const scenePhase = document.getElementById("scenePhase");
const servicePaths = document.getElementById("servicePaths");
const serviceNodes = document.getElementById("serviceNodes");
const heroMessage = document.getElementById("heroMessage");
const diagnosticCloud = document.getElementById("diagnosticCloud");
const resultMessage = document.getElementById("resultMessage");
const backButton = document.getElementById("backToMap");

function setNodePosition(element, point) {
  gsap.set(element, {
    x: point.x,
    y: point.y,
    xPercent: -50,
    yPercent: -50,
  });
}

function buildMap() {
  services.forEach((service) => {
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.classList.add("network-path");
    path.dataset.service = service.id;
    path.setAttribute(
      "d",
      `M500,500 C500,500 ${(service.map.x + 500) / 2},${(service.map.y + 500) / 2} ${service.map.x},${service.map.y}`,
    );
    servicePaths.appendChild(path);

    const node = document.createElement("button");
    node.className = "service-node";
    node.dataset.service = service.id;
    node.innerHTML = `
      <span class="service-node-dot"></span>
      <span class="service-node-label">${service.title}</span>
    `;
    setNodePosition(node, service.map);
    node.addEventListener("mouseenter", () => hoverNode(service.id, true));
    node.addEventListener("mouseleave", () => hoverNode(service.id, false));
    node.addEventListener("focus", () => hoverNode(service.id, true));
    node.addEventListener("blur", () => hoverNode(service.id, false));
    node.addEventListener("click", () => enterService(service.id));
    serviceNodes.appendChild(node);
  });

  document.querySelectorAll(".network-path").forEach((path) => {
    const length = path.getTotalLength();
    path.dataset.length = length;
    path.style.strokeDasharray = `${length}`;
    path.style.strokeDashoffset = `${length}`;
  });
}

function startIntroPulse() {
  gsap.to(".logo-mark", {
    scale: 1.04,
    duration: 2.6,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  });

  gsap.to(".logo-ring, .logo-beam", {
    opacity: 0.42,
    duration: 2.2,
    stagger: 0.08,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  });
}

function hoverNode(serviceId, entering) {
  if (!state.introDone || state.currentService) return;

  document.querySelectorAll(".service-node").forEach((node) => {
    const active = entering && node.dataset.service === serviceId;
    gsap.to(node, {
      scale: active ? 1.14 : entering ? 0.9 : 1,
      opacity: active ? 1 : entering ? 0.22 : 0.78,
      duration: 0.35,
      ease: "power2.out",
    });
    node.classList.toggle("is-active", active);
  });

  document.querySelectorAll(".network-path").forEach((path) => {
    const active = entering && path.dataset.service === serviceId;
    path.classList.toggle("is-active", active);
    path.classList.toggle("is-dimmed", entering && !active);
    gsap.to(path, {
      opacity: active ? 1 : entering ? 0.08 : 0.24,
      duration: 0.35,
      ease: "power2.out",
    });
  });
}

function resetMapFocus() {
  document.querySelectorAll(".service-node").forEach((node) => {
    node.classList.remove("is-active");
    const service = services.find((item) => item.id === node.dataset.service);
    setNodePosition(node, service.map);
  });

  document.querySelectorAll(".network-path").forEach((path) => {
    path.classList.remove("is-active", "is-dimmed");
    const length = Number(path.dataset.length || 0);
    path.style.strokeDashoffset = "0";
    path.style.strokeDasharray = `${length}`;
  });

  gsap.set(".service-node", { opacity: 0.78, scale: 1 });
  gsap.set(".network-path", { opacity: 0.24 });
  gsap.set(".map-layer", { scale: 1, x: 0, y: 0 });
}

function clearStory() {
  heroMessage.textContent = "";
  resultMessage.textContent = "";
  diagnosticCloud.innerHTML = "";
  gsap.set([heroMessage, resultMessage, diagnosticCloud], { clearProps: "all" });
}

function enterExperience() {
  if (state.introDone) return;

  const logo = enterButton;
  const flipState = Flip.getState(logo);

  logo.classList.add("is-hub");
  hubAnchor.appendChild(logo);

  const tl = gsap.timeline({
    defaults: { ease: "power2.inOut" },
    onComplete: () => {
      state.introDone = true;
      introOverlay.style.pointerEvents = "none";
      introOverlay.style.display = "none";
    },
  });

  tl.add(
    Flip.from(flipState, {
      duration: 1.35,
      absolute: true,
      scale: true,
      ease: "power3.inOut",
    }),
    0,
  )
    .to(".intro-eyebrow", { y: -120, duration: 1 }, 0)
    .to(".tagline", { y: 10, duration: 1 }, 0)
    .fromTo(
      ".network-path",
      { strokeDashoffset: (_, target) => Number(target.dataset.length || 0) },
      {
        strokeDashoffset: 0,
        opacity: 0.24,
        duration: 1.2,
        stagger: 0.06,
        ease: "power2.out",
      },
      0.35,
    )
    .fromTo(
      ".service-node",
      { scale: 0.3, opacity: 0 },
      { scale: 1, opacity: 0.78, duration: 0.75, stagger: 0.06, ease: "back.out(1.5)" },
      0.5,
    )
    .to(introOverlay, { y: -40, duration: 0.8 }, 0.4);

  state.activeTimeline = tl;
}

function renderDiagnostics(service) {
  diagnosticCloud.innerHTML = service.diagnosis
    .map(
      (item, index) => `
        <article class="diagnostic-item" data-index="${index}">
          <span class="item-label">Diagnóstico ${index + 1}</span>
          <p class="item-text">${item}</p>
        </article>
      `,
    )
    .join("");

  gsap.utils.toArray(".diagnostic-item").forEach((item, index) => {
    setNodePosition(item, service.diagnosisPositions[index]);
  });
}

function runServiceNarrative(service) {
  clearStory();
  renderDiagnostics(service);

  const items = gsap.utils.toArray(".diagnostic-item");
  heroMessage.textContent = service.problem;
  resultMessage.textContent = service.result;

  gsap.set(heroMessage, { xPercent: -50, yPercent: -50, x: 0, y: 0, opacity: 0.15, scale: 0.9 });
  gsap.set(items, { opacity: 0, scale: 0.55 });
  gsap.set(resultMessage, { xPercent: -50, yPercent: -50, y: 40, opacity: 0, scale: 0.88 });

  const tl = gsap.timeline({
    defaults: { ease: "power3.inOut" },
  });

  tl.add(() => {
    sceneEyebrow.textContent = "Servicio FAROS";
    sceneTitle.textContent = service.title;
    scenePhase.textContent = "Problema";
  })
    .to(heroMessage, {
      opacity: 1,
      scale: 1,
      duration: 0.9,
      ease: "power3.out",
    })
    .add(() => {
      scenePhase.textContent = "Diagnóstico";
    }, "+=0.25")
    .to(heroMessage, {
      y: -54,
      scale: 0.88,
      duration: 0.8,
    })
    .to(
      items,
      {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.12,
        ease: "back.out(1.4)",
      },
      "<0.08",
    )
    .add(() => {
      scenePhase.textContent = "Solución";
      const flipState = Flip.getState(items);
      items.forEach((item, index) => {
        item.classList.add("is-solution");
        item.querySelector(".item-label").textContent = `Solución ${index + 1}`;
        item.querySelector(".item-text").textContent = service.solution[index];
        setNodePosition(item, service.solutionPositions[index]);
      });
      tl.add(
        Flip.from(flipState, {
          duration: 1.2,
          absolute: true,
          scale: true,
          ease: "power3.inOut",
          stagger: 0.05,
        }),
      );
    }, "+=0.65")
    .add(() => {
      scenePhase.textContent = "Resultado";
    }, "+=0.7")
    .to(items, {
      x: 0,
      y: 0,
      scale: 0.72,
      opacity: 0.16,
      duration: 0.8,
      stagger: 0.04,
    })
    .to(
      heroMessage,
      {
        y: -110,
        opacity: 0.08,
        scale: 0.8,
        duration: 0.7,
      },
      "<",
    )
    .to(
      resultMessage,
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.95,
        ease: "power3.out",
      },
      "-=0.12",
    );

  return tl;
}

function enterService(serviceId) {
  if (!state.introDone) return;
  if (state.activeTimeline) state.activeTimeline.kill();

  const service = services.find((item) => item.id === serviceId);
  const node = document.querySelector(`.service-node[data-service="${serviceId}"]`);
  if (!service || !node) return;

  state.currentService = service;
  backButton.classList.remove("is-hidden");

  const flipState = Flip.getState(node);
  setNodePosition(node, service.focus);
  node.classList.add("is-active");

  const tl = gsap.timeline({
    defaults: { ease: "power3.inOut" },
    onStart: () => {
      document.querySelectorAll(".service-node").forEach((element) => {
        if (element !== node) {
          gsap.to(element, { opacity: 0.08, scale: 0.8, duration: 0.4 });
        }
      });
      document.querySelectorAll(".network-path").forEach((path) => {
        const active = path.dataset.service === serviceId;
        path.classList.toggle("is-active", active);
        path.classList.toggle("is-dimmed", !active);
      });
    },
  });

  tl.to(".map-layer", {
    scale: 1.18,
    x: (500 - service.map.x) * 0.14,
    y: (500 - service.map.y) * 0.14,
    duration: 0.9,
  })
    .add(
      Flip.from(flipState, {
        duration: 0.9,
        absolute: true,
        scale: true,
        ease: "power3.inOut",
      }),
      0,
    )
    .to(node, {
      scale: 2.4,
      duration: 0.9,
    }, 0.08)
    .to(
      `.network-path[data-service="${serviceId}"]`,
      {
        opacity: 1,
        strokeWidth: 3.2,
        duration: 0.8,
      },
      0.1,
    )
    .add(() => {
      node.style.pointerEvents = "none";
    })
    .add(runServiceNarrative(service), "-=0.15");

  state.activeTimeline = tl;
}

function backToMap() {
  if (!state.currentService) return;
  if (state.activeTimeline) state.activeTimeline.kill();

  const currentServiceId = state.currentService.id;
  const node = document.querySelector(`.service-node[data-service="${currentServiceId}"]`);
  const service = services.find((item) => item.id === currentServiceId);
  const flipState = Flip.getState(node);

  state.currentService = null;
  clearStory();
  sceneEyebrow.textContent = "Servicios FAROS";
  sceneTitle.textContent = "Una red, cinco caminos, una sola operación con foco.";
  scenePhase.textContent = "Mapa";

  setNodePosition(node, service.map);
  node.style.pointerEvents = "";
  backButton.classList.add("is-hidden");

  const tl = gsap.timeline({
    defaults: { ease: "power3.inOut" },
    onComplete: () => {
      resetMapFocus();
    },
  });

  tl.to(".map-layer", {
    scale: 1,
    x: 0,
    y: 0,
    duration: 0.9,
  })
    .add(
      Flip.from(flipState, {
        duration: 0.9,
        absolute: true,
        scale: true,
        ease: "power3.inOut",
      }),
      0,
    )
    .to(node, { scale: 1, opacity: 0.78, duration: 0.9 }, 0)
    .to(
      ".service-node",
      { opacity: 0.78, scale: 1, duration: 0.5, stagger: 0.04 },
      0.3,
    )
    .to(
      ".network-path",
      { opacity: 0.24, strokeWidth: 2, duration: 0.5 },
      0.3,
    );

  state.activeTimeline = tl;
}

buildMap();
startIntroPulse();

enterButton.addEventListener("click", enterExperience);
backButton.addEventListener("click", backToMap);
