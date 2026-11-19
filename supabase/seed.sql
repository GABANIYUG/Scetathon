-- =============================================================================
-- SCETATHON — Phase 6: Seed Configuration & Candidate Content
-- Source of Truth: config/tracks.ts, config/schedule.ts, config/site.ts
-- Idempotent: Uses ON CONFLICT DO NOTHING
-- Note: Does NOT seed fake users, teams, registrations, sponsors or metrics.
-- =============================================================================

-- 1. Initial Event Settings (Registration mode: preview, per security rules)
INSERT INTO public.event_settings (
  id,
  event_name,
  tagline,
  registration_mode,
  min_team_size,
  max_team_size,
  allow_solo,
  eligibility_information
) VALUES (
  'current',
  'SCETATHON',
  '24-Hour Inter-College Hackathon',
  'preview',
  2,
  4,
  false,
  'Open to verified undergraduate and graduate engineering students from recognized colleges.'
) ON CONFLICT (id) DO UPDATE SET
  event_name = EXCLUDED.event_name,
  tagline = EXCLUDED.tagline;

-- 2. Seed 6 Candidate Challenge Tracks (Initial status: provisional)
INSERT INTO public.tracks (
  id,
  title,
  slug,
  category,
  short_description,
  detailed_overview,
  competencies,
  key_themes,
  opportunity_areas,
  approval_status
) VALUES
(
  'ai-systems',
  'AI & Intelligent Systems',
  'ai-intelligent-systems',
  'Artificial Intelligence',
  'Autonomous agents, edge inference pipelines, computer vision for regional industries, and accessible LLM tooling designed for real-world impact.',
  'This domain challenges student builders to go beyond generic wrapper applications and create intelligent, context-aware computational systems. Focus areas include edge-optimized neural models, agentic workflows, multi-modal reasoning, and localized natural language processing designed to address tangible operational challenges in Indian industries.',
  ARRAY['PyTorch / TensorFlow', 'ONNX Runtime', 'Vector Embeddings', 'LangChain / LlamaIndex', 'TypeScript / Python'],
  ARRAY['Edge Inference', 'Autonomous Agents', 'Regional NLP', 'Computer Vision'],
  ARRAY['Low-latency document intelligence for vernacular administrative records', 'Defect detection pipelines for regional textile and diamond processing workflows', 'Edge-deployed visual inspection for agricultural produce quality assurance'],
  'provisional'
),
(
  'web3-protocols',
  'Decentralized Protocols & Security',
  'decentralized-protocols-security',
  'Security & Web3',
  'Cryptographic primitives, zero-knowledge proofs, verifiable credentials, and decentralized physical infrastructure networks (DePIN).',
  'Focuses on engineering decentralized systems with tangible utility. Rather than speculative tokens, builders will explore trust-minimized coordination mechanisms, privacy-preserving state verification, cryptographic audit trails for supply chains, and resilient peer-to-peer data channels.',
  ARRAY['Rust / Solidity', 'Circom / Halo2', 'IPFS / Arweave', 'Zero-Knowledge Proofs', 'Smart Contract Auditing'],
  ARRAY['Zero-Knowledge Proofs', 'Verifiable Credentials', 'Decentralized Storage', 'Cryptographic Audits'],
  ARRAY['Tamper-evident verification protocols for academic credential issuance', 'Decentralized attestation networks for municipal infrastructure audits', 'Privacy-preserving verification of student identification across universities'],
  'provisional'
),
(
  'smart-iot',
  'Smart Cities & Sustainable IoT',
  'smart-cities-sustainable-iot',
  'IoT & Smart Systems',
  'Embedded hardware, low-power mesh networks, municipal telemetry, and smart resource distribution designed for urban density.',
  'Encourages student engineers to build resilient end-to-end telemetry solutions integrating embedded hardware controllers, environmental sensor suites, low-power networking protocols, and real-time municipal telemetry dashboards tailored for South Gujarat urban corridors.',
  ARRAY['Embedded C / C++', 'ESP32 / Raspberry Pi', 'MQTT / CoAP Protocols', 'LoRaWAN Mesh', 'Time-Series Databases'],
  ARRAY['LoRaWAN Mesh', 'Municipal Telemetry', 'Energy Management', 'Micro-Controllers'],
  ARRAY['Decentralized air quality and dust particle monitoring networks for Surat industrial clusters', 'Automated stormwater flood detection along the Tapi River basin and urban canals', 'Smart street lighting telemetry nodes optimizing municipal power grid load'],
  'provisional'
),
(
  'health-tech',
  'HealthTech & Assistive Engineering',
  'healthtech-assistive-engineering',
  'Healthcare',
  'Point-of-care diagnostics, accessible hardware interfaces, vernacular medical assistants, and streamlined clinical triaging.',
  'Participants design high-impact technological solutions that bridge healthcare delivery gaps in regional clinics and underserved populations. Challenge statements prioritize intuitive accessibility, low-power battery operation, vernacular speech interfaces, and edge diagnosis.',
  ARRAY['Embedded Biosensors', 'Speech Recognition', 'FHIR Standards', 'Computer Vision / Edge ML', 'Secure Data Storage'],
  ARRAY['Point-of-Care Diagnostics', 'Assistive Devices', 'Vernacular Interfaces', 'Clinical Triage'],
  ARRAY['Low-cost portable digital screening devices for diabetic retinopathy triage', 'Speech-enabled clinic intake assistants operating in vernacular Gujarati and Hindi', 'Haptic navigation and tactile notification tools for visually impaired students'],
  'provisional'
),
(
  'open-innovation',
  'Open Innovation & Moonshots',
  'open-innovation-moonshots',
  'Open Track',
  'Unconstrained creative engineering: deep-tech explorations, breakthrough tools, and unconventional applications of emerging technology.',
  'SCETATHON embraces bold, unconventional engineering explorations that do not neatly fit conventional domain boundaries. This track is reserved for builders pursuing ambitious multidisciplinary ideas, novel hardware-software hybrids, and ambitious tools for developers.',
  ARRAY['Systems Architecture', 'Novel Hardware / Software Hybrids', 'Developer Tooling', 'Computer Graphics', 'Human-Computer Interaction'],
  ARRAY['Deep Tech Explorations', 'Developer Infrastructure', 'Robotics & Automation', 'Interdisciplinary Hybrid'],
  ARRAY['High-performance cross-compiler tooling for resource-constrained target devices', 'Collaborative peer-to-peer code synthesis and verification environments', 'Open-source scientific simulation workbenches for regional engineering laboratories'],
  'provisional'
),
(
  'fintech-commerce',
  'FinTech & Open Digital Commerce',
  'fintech-open-digital-commerce',
  'Digital Commerce',
  'ONDC protocols, account aggregator networks, programmatic micro-lending, and accessible financial tools for informal economies.',
  'Empowers engineering builders to reimagine open economic infrastructure. Problem statements center around open digital commerce networks, programmatic credit scoring for small and medium enterprises, fraud detection pipelines, and accessible merchant software.',
  ARRAY['ONDC Beckn Protocol', 'Account Aggregator APIs', 'Fraud Detection Models', 'High-Throughput Databases', 'Secure Payment Gateways'],
  ARRAY['ONDC Protocols', 'Micro-Credit Automation', 'Fraud Intelligence', 'Informal Economy Tooling'],
  ARRAY['Voice-assisted localized inventory reconciliation and ONDC catalog onboarding for micro-merchants', 'Predictive cash flow verification models for seasonal agricultural traders in Gujarat', 'Privacy-preserving escrow protocols for decentralized student freelance services'],
  'provisional'
)
ON CONFLICT (id) DO NOTHING;

-- 3. Seed 6 Chronological Schedule Phases (Initial status: provisional)
INSERT INTO public.schedule_phases (
  id,
  phase_number,
  title,
  short_summary,
  hour_range,
  relative_time,
  detailed_agenda,
  operational_focus,
  participant_instructions,
  approval_status
) VALUES
(
  'phase-01',
  'PHASE 01',
  'Check-in, Keynote & Problem Statement Reveal',
  'Teams arrive on campus, verify collegiate credentials, settle into assigned workstations, and receive the official challenge briefs.',
  'HOUR 00 – 02',
  '00:00 – 02:00',
  ARRAY[
    'Participant workstation allocation and local network provisioning',
    'Opening address by SCET faculty coordinators and organizing committee',
    'Official challenge statement release and track guidelines briefing',
    'Team station workspace inspection and mentor introductions'
  ],
  'Orientation, Technical Setup & Challenge Scoping',
  'Ensure all team members have valid college IDs, approved development laptops, and pre-installed toolchains.',
  'provisional'
),
(
  'phase-02',
  'PHASE 02',
  'Architecture, Data Modeling & First Code Sprint',
  'Initial development sprint: team members formalize database schemas, wireframe user flows, configure repositories, and establish foundational pipelines.',
  'HOUR 02 – 06',
  '02:00 – 06:00',
  ARRAY[
    'Repository initialization and version control conventions agreement',
    'System architecture mapping: Frontend, Backend API, Database, and external integrations',
    'Drafting core wireframes and establishing API contract specifications',
    'First milestone commit verification with student technical mentors'
  ],
  'Core Systems Architecture & Base Pipeline Deployment',
  'Focus on establishing an end-to-end data flow between client and backend before building secondary features.',
  'provisional'
),
(
  'phase-03',
  'PHASE 03',
  'Deep Build Sprint & Midpoint Mentor Checkpoint',
  'Core execution window: teams implement primary functional logic, assemble domain models, and engage in designated mentor checkpoints for technical critique.',
  'HOUR 06 – 12',
  '06:00 – 12:00',
  ARRAY[
    'Full implementation of primary challenge track functional requirements',
    'Mandatory Checkpoint 1: Technical mentor visits and code architecture audits',
    'Refining integration points, testing API throughput, and verifying edge cases',
    'Midnight refreshments and energy recharge in designated student lounge'
  ],
  'Intensive Implementation, Hardware Testing & Mentorship',
  'Take notes during the mentor audit; identify 1-2 critical adjustments that will strengthen your evaluation score.',
  'provisional'
),
(
  'phase-04',
  'PHASE 04',
  'Nocturnal Sprint, Integration & Edge Testing',
  'Overnight building session: continuous development, third-party API integration, handling network failures, and polishing responsive user workflows.',
  'HOUR 12 – 18',
  '12:00 – 18:00',
  ARRAY[
    'Uninterrupted late-night development sprint with continuous network support',
    'End-to-end integration testing: simulated load, offline resilience, and error states',
    'UI polish: micro-interactions, responsive states, and accessible typography',
    'Early morning campus breakfast and rejuvenation break'
  ],
  'Full Integration, Fault Tolerance & Polish',
  'Rotate sleep and rest within your squad; pace yourselves for the morning evaluation rounds.',
  'provisional'
),
(
  'phase-05',
  'PHASE 05',
  'Code Freeze, Documentation & Pitch Preparation',
  'Final sprint before submission: final Git push to designated review branch, slide deck preparation, architecture diagramming, and rehearsing live 3-minute demonstrations.',
  'HOUR 18 – 22',
  '18:00 – 22:00',
  ARRAY[
    'Strict repository code freeze and final commit hash registration',
    'Preparation of 3-minute technical pitch deck and demonstrable user walkthrough',
    'Mandatory Checkpoint 2: Verification of working build and README documentation',
    'Stage audio/visual equipment check for final auditorium presentations'
  ],
  'Code Finalization, Deployment & Presentation Framing',
  'A working, clean prototype beats an overcomplicated unfinished system. Ensure your demo flow is bulletproof.',
  'provisional'
),
(
  'phase-06',
  'PHASE 06',
  'Jury Evaluations, Grand Finale & Accolades',
  'The culmination of SCETATHON: live podium presentations before faculty and industry jury panels, technical cross-examinations, score tallying, and award announcements.',
  'HOUR 22 – 24',
  '22:00 – 24:00',
  ARRAY[
    'Live technical demonstrations and jury Q&A in the SCET Auditorium',
    'Technical jury evaluation rubric consolidation and code quality audit review',
    'Closing ceremony, faculty advisory remarks, and industry partner address',
    'Announcement of domain track winners and presentation of accolades'
  ],
  'Evaluation, Technical Defense & Celebration',
  'Be ready to answer questions regarding your database schema, security posture, and deployment viability.',
  'provisional'
)
ON CONFLICT (id) DO NOTHING;

