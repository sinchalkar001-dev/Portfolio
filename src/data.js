// All site content lives here, so updating the portfolio never means touching layout code.

export const profile = {
  name: "Sinchal Kar",
  location: "West Bengal, India",
  email: "sinchalkar001@gmail.com",
  github: "https://github.com/sinchalkar001-dev",
  githubHandle: "sinchalkar001-dev",
  linkedin: "https://www.linkedin.com/in/sinchalkar",
  linkedinHandle: "in/sinchalkar",
  resume: "/Sinchal-Kar-Resume.pdf",
  photo: "/sinchal-kar.jpg",
};

// Margin comments on the hero headline: each claim gets its receipt.
export const headlineNotes = [
  {
    anchor: "systems",
    href: "#syncspace",
    text: "SyncSpace is live: a real-time whiteboard and code editor I took from spec to production.",
  },
  {
    anchor: "correct",
    href: "#e-medico",
    text: "E-Medico: zero double-bookings across 1,000+ simulated parallel requests.",
  },
  {
    anchor: "concurrent load",
    href: "#skill-sphere",
    text: "Skill Sphere: 180 ms p95 at 200 concurrent users, zero failed requests.",
  },
];

export const featured = {
  id: "syncspace",
  name: "SyncSpace",
  tagline: "Real-time collaborative whiteboard and code editor",
  context: "Built during my internship at Axlero Innovative Solutions",
  summary:
    "I took it from specification to live deployment. Concurrent edits merge conflict-free through Yjs CRDTs over WebSockets, with Socket.io handling rooms and chat.",
  points: [
    "Two-tier MongoDB persistence: debounced binary snapshots for fast room loads, plus a schema-enforced append-only update log, so rooms survive server restarts and any session can be replayed.",
    "JWT authentication with a 6-level role hierarchy enforced on the server.",
    "Sandboxed code execution for 7 languages including Java: one container per run, no network, capped CPU, memory and processes.",
    "Vitest and Supertest suites against in-memory MongoDB, plus Playwright end-to-end tests driving two live browsers, all run by GitHub Actions on every push.",
  ],
  stack: ["React", "Yjs", "WebSockets", "Socket.io", "Node.js", "Express", "MongoDB", "Docker", "Playwright", "Vercel", "Render"],
  live: "https://sync-space-client-gray.vercel.app",
  repo: "https://github.com/sinchalkar001-dev/SyncSpace",
};

export const projects = [
  {
    id: "skill-sphere",
    name: "Skill Sphere",
    tagline: "Skill-based recruitment portal",
    evidence: "query",
    points: [
      "Designed 6 MongoDB collections supporting 500+ applications per posting, with compound indexes on skill tags and application status.",
      "Load-tested the API at 200 concurrent users: 180 ms p95 latency and zero failed requests.",
      "Stateless JWT auth with bcrypt hashing, role-based access for recruiters and candidates, and status-change emails with retry-on-failure delivery.",
    ],
    stack: ["React", "Node.js", "Express", "MongoDB", "JWT", "Nodemailer"],
    repo: "https://github.com/sinchalkar001-dev/Skill-Sphere-Online-Skill-Based-Recruitment-Portal",
  },
  {
    id: "e-medico",
    name: "E-Medico",
    tagline: "Doctor appointment system",
    evidence: "race",
    points: [
      "Eliminated double-booking with atomic conditional MongoDB updates that lock each slot.",
      "Sustained 300+ concurrent booking requests under 250 ms p95 across 50+ doctor profiles and 2 user roles.",
      "Cut the booking flow from 6 steps to 3 with doctor search filtered by specialisation, availability and location.",
    ],
    stack: ["React", "Node.js", "Express", "MongoDB", "JWT"],
    repo: "https://github.com/sinchalkar001-dev/Doctor-Appointment-System",
  },
  {
    id: "credit-risk",
    name: "Credit Risk & Fraud Detection",
    tagline: "Machine-learning classification API",
    evidence: "accuracy",
    points: [
      "Flask REST API for credit-risk classification with single-record and batch CSV inference, session auth and an analytics dashboard.",
      "Gradient Boosting classifier trained on a 1,000-record, 20-attribute credit dataset.",
      "Containerised with Docker Compose, with a health-check endpoint.",
    ],
    stack: ["Python", "Flask", "scikit-learn", "Pandas", "Docker"],
  },
];

export const timeline = [
  {
    when: "Jul 2026 – present",
    title: "Web Development Intern",
    org: "Axlero Innovative Solutions",
    meta: "Technology & Product Development, remote",
    body: "Building SyncSpace end to end: CRDT sync, persistence, auth, sandboxed code execution and CI.",
    current: true,
  },
  {
    when: "2022 – 2026",
    title: "B.Tech, Computer Science and Engineering",
    org: "Kalinga Institute of Industrial Technology (KIIT), Bhubaneswar",
    meta: "CGPA 7.59 / 10",
  },
  {
    when: "2020 – 2022",
    title: "Class XII: 84%, Class X: 91%",
    org: "Bina Mohit Memorial School, West Bengal",
  },
];

export const certifications = [
  { issuer: "IBM", name: "Web Development Fundamentals" },
  { issuer: "IBM", name: "Generative AI: Introduction and Applications" },
  { issuer: "Infosys Springboard", name: "AWS Certified Developer course" },
];

export const skills = [
  { group: "Languages", items: ["Java", "JavaScript", "Python", "SQL", "HTML", "CSS"] },
  { group: "Frontend", items: ["React.js", "Next.js", "Zustand", "Vite", "Konva", "Monaco Editor"] },
  { group: "Backend", items: ["Node.js", "Express", "Flask", "REST API design", "Socket.io", "WebSockets", "Yjs (CRDTs)", "JWT", "RBAC"] },
  { group: "Databases", items: ["MongoDB (Mongoose, schema design, compound indexing, aggregation, atomic updates)", "SQL"] },
  { group: "Testing", items: ["Vitest", "Supertest", "Playwright (E2E)", "Postman", "load and concurrency testing"] },
  { group: "DevOps & cloud", items: ["Git", "GitHub Actions (CI)", "Docker", "Docker Compose", "Vercel", "Render", "AWS"] },
  { group: "Core CS", items: ["Data Structures & Algorithms", "OOP", "DBMS", "Data Modelling", "Machine Learning (scikit-learn, Pandas)"] },
];
