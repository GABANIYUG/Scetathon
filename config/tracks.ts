/**
 * Curated Engineering Tracks & Challenge Domains for SCETATHON
 * All track content is provisional and subject to formal Technical Committee approval.
 */

export interface ChallengeTrack {
  id: string;
  slug: string;
  number: string;
  title: string;
  category: string;
  shortDescription: string;
  detailedOverview: string;
  keyThemes: string[];
  technicalCompetencies: string[];
  opportunityAreas: string[];
  status: "PROVISIONAL" | "RATIFIED";
  statusLabel: string;
}

export const challengeTracks: ChallengeTrack[] = [
  {
    id: "ai-systems",
    slug: "ai-intelligent-systems",
    number: "TRACK 01",
    title: "AI & Intelligent Systems",
    category: "Artificial Intelligence",
    shortDescription:
      "Autonomous agents, edge inference pipelines, computer vision for regional industries, and accessible LLM tooling designed for real-world impact.",
    detailedOverview:
      "This domain challenges student builders to go beyond generic wrapper applications and create intelligent, context-aware computational systems. Focus areas include edge-optimized neural models, agentic workflows, multi-modal reasoning, and localized natural language processing designed to address tangible operational challenges in Indian industries.",
    keyThemes: ["Edge Inference", "Autonomous Agents", "Regional NLP", "Computer Vision"],
    technicalCompetencies: ["PyTorch / TensorFlow", "ONNX Runtime", "Vector Embeddings", "LangChain / LlamaIndex", "TypeScript / Python"],
    opportunityAreas: [
      "Low-latency document intelligence for vernacular administrative records",
      "Defect detection pipelines for regional textile and diamond processing workflows",
      "Edge-deployed visual inspection for agricultural produce quality assurance",
    ],
    status: "PROVISIONAL",
    statusLabel: "Provisional Track // Pending Committee Approval",
  },
  {
    id: "web3-protocols",
    slug: "decentralized-protocols-security",
    number: "TRACK 02",
    title: "Decentralized Protocols & Security",
    category: "Systems & Security",
    shortDescription:
      "Decentralized trust, verifiable cryptographic computation, identity protocols, and tamper-proof verification for public record systems.",
    detailedOverview:
      "Modern digital infrastructure demands cryptographic verifiability and robust security guarantees. This track focuses on zero-knowledge verification, verifiable digital credentials, tamper-evident audit trails for civic registries, and privacy-preserving consensus primitives.",
    keyThemes: ["Zero-Knowledge Proofs", "Verifiable Credentials", "Smart Contracts", "Cryptographic Auditing"],
    technicalCompetencies: ["Solidity / Rust", "circom / zk-SNARKs", "EVM Architectures", "Cryptography Primitives", "Indexed Graph Queries"],
    opportunityAreas: [
      "Verifiable collegiate credentials and tamper-proof degree certification systems",
      "Zero-knowledge identity verification for anonymous civic grievance reporting",
      "Decentralized supply chain provenance tracking for regional manufacturing",
    ],
    status: "PROVISIONAL",
    statusLabel: "Provisional Track // Pending Committee Approval",
  },
  {
    id: "smart-campus",
    slug: "smart-cities-sustainable-iot",
    number: "TRACK 03",
    title: "Smart Cities & Sustainable IoT",
    category: "Connected Systems",
    shortDescription:
      "Hardware-software convergence, intelligent sensor networks, urban resource optimization, energy monitoring, and campus mobility.",
    detailedOverview:
      "Surat is recognized internationally for dynamic civic administration and urban resilience. This track challenges teams to construct connected physical-digital systems using low-power IoT hardware, edge telemetry streaming, urban resource analytics, and sustainable energy monitoring.",
    keyThemes: ["Sensor Telemetry", "Energy Optimization", "Urban Mobility", "Resource Management"],
    technicalCompetencies: ["ESP32 / Arduino / Raspberry Pi", "MQTT / WebSockets", "Time-Series Databases (InfluxDB)", "Embedded C++ / MicroPython", "GIS / Spatial Analytics"],
    opportunityAreas: [
      "Real-time micro-climate and urban flood level telemetry for coastal zones",
      "Intelligent campus power consumption audits and automated load balancing",
      "Low-cost traffic flow estimation and emergency vehicle priority corridors",
    ],
    status: "PROVISIONAL",
    statusLabel: "Provisional Track // Pending Committee Approval",
  },
  {
    id: "healthtech",
    slug: "healthtech-assistive-engineering",
    number: "TRACK 04",
    title: "HealthTech & Assistive Engineering",
    category: "Bioinformatics & Health",
    shortDescription:
      "Assistive technologies, low-latency vital signal processing, regional telemedicine pipelines, and predictive health monitoring for rural accessibility.",
    detailedOverview:
      "Healthcare engineering must prioritize usability, accessibility, and resilience in low-bandwidth environments. Participants will architect intuitive assistive devices, biometric telemetry streams, decentralized medical record exchange formats, and diagnostic screening aids.",
    keyThemes: ["Assistive Hardware", "Biometric Telemetry", "Telemedicine Pipelines", "Accessibility"],
    technicalCompetencies: ["Digital Signal Processing", "WebRTC / Audio Streaming", "FHIR / HL7 Standards", "Computer Vision for Diagnostics", "Offline-First Mobile UX"],
    opportunityAreas: [
      "Offline-first diagnostic triage assistant for rural primary healthcare centers",
      "Low-cost tactile feedback assistive devices for visually impaired students",
      "Acoustic cough and respiratory pattern analysis for early screening",
    ],
    status: "PROVISIONAL",
    statusLabel: "Provisional Track // Pending Committee Approval",
  },
  {
    id: "open-innovation",
    slug: "open-innovation-moonshots",
    number: "TRACK 05",
    title: "Open Innovation & Moonshots",
    category: "Emerging Domains",
    shortDescription:
      "Radical, cross-disciplinary problem solving that breaks domain silos. Build high-conviction prototypes addressing tangible social or industrial challenges.",
    detailedOverview:
      "Groundbreaking ideas rarely fit neatly inside conventional domain boxes. The Open Innovation track provides an unconstrained canvas for moonshot engineering prototypes, novel developer tooling, civic technology tools, and radical multidisciplinary solutions.",
    keyThemes: ["Cross-Disciplinary Tech", "Developer Infrastructure", "Civic Tech", "Unconventional UI/UX"],
    technicalCompetencies: ["Full-Stack Architecture", "WebAssembly (WASM)", "Custom Compilers / DSLs", "High-Concurrency Backend Engines", "Novel Interaction Design"],
    opportunityAreas: [
      "Developer developer-tools that streamline collaborative coding during hackathons",
      "Peer-to-peer mesh emergency communications for crisis zones",
      "Novel interactive computing interfaces for engineering education",
    ],
    status: "PROVISIONAL",
    statusLabel: "Provisional Track // Pending Committee Approval",
  },
  {
    id: "fintech",
    slug: "fintech-open-digital-commerce",
    number: "TRACK 06",
    title: "FinTech & Open Digital Commerce",
    category: "Economic Infrastructure",
    shortDescription:
      "Next-generation payment architectures, micro-credit transparency, fraud detection systems, and frictionless financial accessibility for small enterprises.",
    detailedOverview:
      "Building on India's world-leading digital public infrastructure (UPI, ONDC, Account Aggregator), this track challenges developers to prototype inclusive financial tools, verifiable credit scoring mechanisms, transaction graph analytics, and frictionless commerce integrations.",
    keyThemes: ["Open Protocols (ONDC)", "Fraud Detection", "Micro-Finance", "Transaction Graphs"],
    technicalCompetencies: ["Financial APIs", "Graph Neural Networks", "Event-Driven Microservices", "PostgreSQL / Redis", "High-Throughput Concurrency"],
    opportunityAreas: [
      "Conversational voice-based digital ledger and payment audit for street vendors",
      "Real-time synthetic transaction fraud simulation and anomaly detection",
      "Fair micro-lending collateral assessment based on operational cashflow proofs",
    ],
    status: "PROVISIONAL",
    statusLabel: "Provisional Track // Pending Committee Approval",
  },
];

export const trackCategories = [
  "All Domains",
  "Artificial Intelligence",
  "Systems & Security",
  "Connected Systems",
  "Bioinformatics & Health",
  "Emerging Domains",
  "Economic Infrastructure",
] as const;

