// Every word, link and image path on the site lives in this file.
// Edit it here and the components pick the change up; none of them hold content of their own.

export const site = {
  name: "Sinchal Kar",
  monogram: "SK",
  role: "Full-stack developer",
  location: "West Bengal, India",
  email: "sinchalkar001@gmail.com",
  resume: "/Sinchal-Kar-Resume.pdf",
  resumeFileName: "Sinchal-Kar-Resume.pdf",
  socials: [
    { label: "GitHub", href: "https://github.com/sinchalkar001-dev" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/sinchalkar" },
  ],

  // Search and link-preview details. `url` is the live address, with no trailing slash.
  url: "https://portfolio-phenix17.vercel.app",
  title: "Sinchal Kar | Full-Stack Developer",
  description:
    "Sinchal Kar is a full-stack developer (React, Node.js, Express, MongoDB) who builds real-time and high-concurrency web apps. Web Development Intern at Axlero, B.Tech CSE at KIIT, class of 2026.",
  ogImage: "/og.png",
  ogImageAlt: "Sinchal Kar, full-stack developer. I build systems that stay correct under concurrent load.",
};

// Header and footer links. Each id must match a section on the home page.
export const nav = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

// Short interface wording that is shared across the site.
export const labels = {
  preloader: "Loading",
  skipLink: "Skip to content",
  home: "Home",
  downloadCv: "Download CV",
  menu: "Menu",
  openMenu: "Open menu",
  closeMenu: "Close menu",
  menuHeading: "Get in touch",
  location: "Location",
  email: "Email",
  elsewhere: "Elsewhere",
  caseStudy: "Read case study",
  liveDemo: "Live demo",
  github: "GitHub",
  seeItIn: "See it in",
  allProjects: "All projects",
  nextProject: "Next project",
  backToTop: "Back to top",
  pauseMarquee: "Pause the scrolling list",
  playMarquee: "Resume the scrolling list",
  runAgain: "Run again",
  now: "Now",
  footerNav: "Sections",
  notFoundTitle: "This page doesn't exist.",
  notFoundBody: "The link may be old, or the address may have a typo.",
  notFoundAction: "Go to the home page",
};

export const hero = {
  // Shown as one giant word across the page.
  roleWord: "developer",
  // On wide screens the photo's head sits over this letter of the word (1 = first letter).
  headOverLetter: 6,
  intro: "Hi, I'm Sinchal Kar, a full-stack developer from West Bengal, India.",
  focusLabel: "Focus areas",
  focusAreas: [
    "Full-stack web apps (MERN)",
    "Real-time collaboration (Yjs, WebSockets)",
    "REST API design",
    "MongoDB schema design and indexing",
    "Load and concurrency testing",
  ],
  // The sentence starts as `before` + `after`. Two labelled cursors then type at the same time:
  // `me` adds `byMe`, `you` adds `byYou`. With reduced motion the full sentence is shown at once.
  statement: {
    before: "I build systems",
    byMe: " that stay correct",
    byYou: " under concurrent load",
    after: ".",
    me: "Sinchal",
    you: "you",
  },
  cta: { label: "View projects", section: "projects" },
  stats: [
    { value: 83, suffix: "%", label: "faster dashboard queries after indexing" },
    { value: 1000, suffix: "+", label: "parallel booking requests, zero double-bookings" },
    { value: 200, suffix: "", label: "concurrent users at 180 ms p95, zero failed requests" },
  ],
  photo: {
    // A transparent cutout, in two widths. The master PNG sits beside them as /sinchal-cutout.png.
    src: "/sinchal-cutout.webp",
    srcSet: "/sinchal-cutout-520.webp 520w, /sinchal-cutout.webp 780w",
    width: 780,
    height: 960,
    alt: "Portrait of Sinchal Kar",
  },
};

export const about = {
  statement: "I enjoy problems where many things happen at once, and I prove every fix with numbers.",
  paragraphs: [
    "I'm Sinchal, a full-stack developer and a 2026 Computer Science graduate from KIIT, Bhubaneswar. I write Java, JavaScript, Python and SQL, and build most things with React, Node.js, Express and MongoDB.",
    "Two people editing the same line, a thousand requests racing for one appointment slot, a dashboard that has to stay fast with 200 users on it. I measure query times before and after an index, take p95 latencies from load tests, and write end-to-end tests that drive two browsers at once.",
    "Right now I'm a Web Development Intern at Axlero Innovative Solutions, where I took SyncSpace from a specification to a live deployment.",
  ],
  stats: [
    { value: "2026", label: "B.Tech CSE graduate, KIIT" },
    { value: "4", label: "projects, each with a measured result" },
  ],
};

export const experience = {
  heading: "Experience",
  items: [
    {
      period: "Jul 2026 – present",
      current: true,
      title: "Web Development Intern",
      org: "Axlero Innovative Solutions (Technology & Product Development, remote)",
      detail: "Building SyncSpace end to end: CRDT sync, persistence, auth, sandboxed code execution and CI.",
    },
    {
      period: "2022 – 2026",
      title: "B.Tech, Computer Science and Engineering",
      org: "KIIT, Bhubaneswar",
      detail: "CGPA 7.59/10.",
    },
    {
      period: "2020 – 2022",
      title: "Class XII 84%, Class X 91%",
      org: "Bina Mohit Memorial School, West Bengal",
    },
  ],
  certificationsHeading: "Certifications",
  certifications: [
    { issuer: "IBM", name: "Web Development Fundamentals" },
    { issuer: "IBM", name: "Generative AI: Introduction and Applications" },
    { issuer: "Infosys Springboard", name: "AWS Certified Developer course" },
  ],
};

export const skills = {
  heading: "Skills",
  // The word repeated in the moving strip.
  marqueeWord: "Skills",
  // `thumb` appears beside the cursor when a row is hovered on desktop.
  // `project` is the slug of the case study the row opens; remove it and the row stops being a link.
  groups: [
    {
      title: "Languages",
      tools: ["Java", "JavaScript", "Python", "SQL"],
      thumb: "/thumbs/languages.webp",
      project: "credit-risk",
    },
    {
      title: "Frontend",
      tools: ["React", "Next.js", "Vite", "Zustand"],
      thumb: "/thumbs/frontend.webp",
      project: "syncspace",
    },
    {
      title: "Backend",
      tools: ["Node.js", "Express", "MongoDB", "Socket.io"],
      thumb: "/thumbs/backend.webp",
      project: "e-medico",
    },
    {
      title: "Testing & DevOps",
      tools: ["Playwright", "Vitest", "Docker", "GitHub Actions"],
      thumb: "/thumbs/testing-devops.webp",
      project: "syncspace",
    },
  ],
};

export const techStack = {
  heading: "Tech stack",
  // Each name is matched to an icon in src/components/techIcons.js. Unknown names get a plain marker.
  tools: [
    "Java",
    "JavaScript",
    "Python",
    "SQL",
    "React",
    "Next.js",
    "Vite",
    "Node.js",
    "Express",
    "Socket.io",
    "Yjs",
    "MongoDB",
    "Flask",
    "Vitest",
    "Playwright",
    "Postman",
    "Docker",
    "GitHub Actions",
    "Vercel",
    "Render",
    "AWS",
    "scikit-learn",
  ],
};

// Project screenshots go in /public/projects/<slug>/ as 1600 x 1000 WebP files.
//   cover        Picture on the home-page card. Leave it out and the card shows the live `proof` instead.
//   screenshots  Gallery on the case-study page. Leave the list empty and the gallery is hidden.
//   proof        The animated evidence for the result. Shown on the case-study page.
//   links        Any link left out hides its button.
//   alt      what the picture shows, for people who cannot see it
//   title    optional heading shown under the picture
//   caption  optional description shown under the picture
const shot = (slug, file, alt, title, caption) => ({
  src: `/projects/${slug}/${file}.webp`,
  width: 1600,
  height: 1000,
  alt,
  title,
  caption,
});

// SyncSpace's cover: the picture on its home-page card and the large one at the top of its case study.
const syncspaceCover = shot(
  "syncspace",
  "01-room",
  "A SyncSpace room with two people in it: an architecture sketch on the shared whiteboard, a guest's live cursor, and the code editor showing the output of a run",
  "A whiteboard and a code editor in one room",
  "Two people draw and type in the same room at the same time. Each sees the other's cursor, edits merge through Yjs CRDTs instead of overwriting each other, and a run's output is shown to everyone.",
);

const skillSphereCover = shot(
  "skill-sphere",
  "01-landing",
  "Skill Sphere home page in dark mode: Hire for skills you can see, beside a candidate's rubric score",
  "Hire for skills you can see",
  "The landing page, in dark mode. Candidates apply with the projects they have built, recruiters score every application against the same rubric, and both sides can see where an application stands.",
);

const eMedicoCover = shot(
  "e-medico",
  "01-home",
  "E-Medico home page: Find a doctor, book a visit, beside a list of eight departments",
  "Find a doctor, book a visit",
  "Patients start from the list of departments, or search for a doctor by name or specialty.",
);

export const projects = {
  heading: "Selected work",
  intro: "Four projects, each with a measured result.",
  items: [
    {
      slug: "syncspace",
      title: "SyncSpace",
      tagline: "Real-time collaborative whiteboard and code editor",
      tags: ["Real-time", "CRDTs", "MERN", "Internship"],
      featured: true,
      status: "Live",
      result: "Live, with Playwright tests driving two browsers in CI",
      summary:
        "Built during my internship at Axlero and taken from specification to live deployment. Concurrent edits merge conflict-free through Yjs CRDTs over WebSockets, with Socket.io handling rooms and chat.",
      links: {
        live: "https://sync-space-client-gray.vercel.app",
        github: "https://github.com/sinchalkar001-dev/SyncSpace",
      },
      cover: syncspaceCover,
      overview:
        "SyncSpace is a shared whiteboard and code editor that several people can use in the same room at the same time. I built it during my internship at Axlero Innovative Solutions and took it from a written specification to a live deployment.",
      built:
        "The whole product, end to end: CRDT sync, persistence, authentication, sandboxed code execution and the CI pipeline. Concurrent edits merge conflict-free through Yjs CRDTs over WebSockets, and Socket.io handles rooms and chat.",
      features: [
        "Shared whiteboard (Konva) and code editor (Monaco) that several people edit at once",
        "Two-tier MongoDB persistence: debounced binary snapshots for fast room loads, plus a schema-enforced append-only update log, so rooms survive server restarts and any session can be replayed",
        "JWT authentication with a 6-level role hierarchy enforced on the server",
        "Sandboxed code execution for 7 languages including Java: one container per run, no network, capped CPU, memory and processes",
        "Vitest and Supertest suites against in-memory MongoDB, plus Playwright end-to-end tests driving two live browsers, all run by GitHub Actions on every push",
      ],
      architecture: {
        steps: [
          { title: "React client", detail: "Konva whiteboard and Monaco code editor" },
          { title: "Real-time layer", detail: "Yjs sync over WebSockets, Socket.io rooms and chat" },
          { title: "Node.js + Express API", detail: "JWT authentication with role checks" },
          { title: "MongoDB", detail: "Snapshots plus an update log" },
          { title: "Sandboxed code runner", detail: "One container per run" },
        ],
        note: "The client runs on Vercel and the API on Render.",
      },
      decisions: [
        {
          title: "CRDTs, not last-write-wins",
          detail:
            "Concurrent edits merge through Yjs CRDTs, so two people can draw and type at the same time without losing either change.",
        },
        {
          title: "A snapshot and a log",
          detail:
            "Debounced binary snapshots keep room loads fast. The append-only update log, with an enforced schema, is what lets a room survive a restart and be replayed.",
        },
        {
          title: "Every run gets its own container",
          detail:
            "Submitted code runs with no network and capped CPU, memory and processes, in any of 7 languages including Java.",
        },
      ],
      stack: ["React", "Yjs", "WebSockets", "Socket.io", "Node.js", "Express", "MongoDB", "Docker", "Playwright", "Vercel", "Render"],
      // One picture per feature. Each has a title and a description, shown under it and in the full-screen viewer.
      screenshots: [
        syncspaceCover,
        shot(
          "syncspace",
          "06-chat",
          "A SyncSpace room with the chat panel open: four messages between Sinchal Kar and Priya about a declined card, above the shared board and code",
          "Live chat",
          "Messages reach everyone in the room over Socket.io, without leaving the board. They are live only: nothing is stored, and an unread count on the button catches whatever arrives while the panel is shut.",
        ),
        shot(
          "syncspace",
          "07-comments",
          "The SyncSpace comments panel with two open threads, one on line 5 of the code and one on the Payments shape, which carries a pin counting two messages",
          "Comments on shapes, code and files",
          "Threads are pinned to a shape, a line of code or a shared file, with replies, @mentions and resolve. A code comment is anchored to the characters themselves, so it stays with its code as lines are added above it.",
        ),
        shot(
          "syncspace",
          "08-copilot",
          "The SyncSpace copilot panel in its whiteboard context, offering to explain or review the architecture, generate code or an API, find risks and plan the implementation",
          "Engineering copilot",
          "One panel that offers what fits the work in front of you: explain or review the architecture on the board, find a bug in the code, diagnose a failed run, summarise the session. It lists what it read, and nothing it proposes is applied without review.",
        ),
        shot(
          "syncspace",
          "09-people",
          "The SyncSpace roster: the owner and an editor in the room now, a member who is away with the Runner role, a pending invitation, and a field to invite by email",
          "People, roles and invitations",
          "The roster shows who is in the room and what each person is doing, with follow and go-to. Six roles from viewer to owner are enforced on the server, including a runner who may run the code but not change it. An invitation is tied to one address and expires.",
        ),
        shot(
          "syncspace",
          "10-files",
          "The SyncSpace files panel listing three shared files, a text schema, a PNG and a Markdown note, each with save and comment controls",
          "Shared files",
          "Images, PDFs and text files up to 10 MB, shared with everyone in the room. Each file can carry its own comment thread.",
        ),
        shot(
          "syncspace",
          "02-history",
          "SyncSpace room history paused at change 180 of 506: the finished diagram beside code that is still only six lines long",
          "Room history",
          "Every change is appended to a log, so a room can be replayed from its first stroke. Dragging the scrubber rebuilds the board and the code as they stood at that change.",
        ),
        shot(
          "syncspace",
          "11-timeline",
          "SyncSpace room history with the session timeline open: components added and connected, code added, a successful run, chat and comments, each with its time",
          "Session timeline",
          "Built from the room's own record, with no model involved: what was drawn and connected, which functions were added, which runs passed, who commented. Each entry jumps the replay to that moment.",
        ),
        shot(
          "syncspace",
          "12-palette",
          "The SyncSpace command palette listing view and board commands with their keyboard shortcuts",
          "Command palette",
          "Ctrl+K lists the room's commands: switch the view, pick a drawing tool, run the code, change the language, open the history or the copilot.",
        ),
        shot(
          "syncspace",
          "13-dashboard",
          "The SyncSpace dashboard for a signed-in user: a room to resume, three rooms filtered by type, and a feed of recent activity",
          "Dashboard",
          "Signed-in users get their rooms, filtered by type, with who is in each one and a feed of recent activity. Rooms are private and invite-only until their owner makes them public.",
        ),
        shot(
          "syncspace",
          "14-devices",
          "The SyncSpace signed-in devices dialog listing Safari on iPhone and Chrome on Windows, the second marked as this device",
          "Signed-in devices",
          "Every browser holding a session for the account. Signing one out takes effect at once: its live document and presence connections are closed on the spot.",
        ),
        shot(
          "syncspace",
          "15-api-docs",
          "The Swagger page for the SyncSpace API, listing the health and auth endpoints",
          "API documentation",
          "The REST API is described in OpenAPI and served as a browsable page by the API itself: accounts, rooms, invitations and replay.",
        ),
        shot(
          "syncspace",
          "05-ci",
          "GitHub Actions run for SyncSpace with all four jobs passing: secret scan, client, server and end-to-end tests",
          "Continuous integration",
          "GitHub Actions runs four jobs on every push: a secret scan, the client tests, the server tests, and Playwright end-to-end tests that drive two browsers.",
        ),
        shot(
          "syncspace",
          "03-home",
          "SyncSpace home page: Draw and code in the same room, with a form to start or join a public room",
          "Landing page",
          "Anyone can start or join a public room as a guest, with no account. Signing in adds private rooms, invitations and the dashboard.",
        ),
        shot(
          "syncspace",
          "04-features",
          "Lower part of the SyncSpace home page: a preview of a room above its four features",
          "What it is built on",
          "The four ideas the landing page leads with: conflict-free merging, live cursors and carets, a history that can be replayed, and rooms that are private until they are shared.",
        ),
      ],
    },
    {
      slug: "skill-sphere",
      title: "Skill Sphere",
      tagline: "Skill-based recruitment portal",
      tags: ["MERN", "MongoDB indexing", "Load testing"],
      result: "180 ms p95 at 200 concurrent users, zero failed requests",
      summary:
        "A recruitment portal with role-based access for recruiters and candidates. Compound indexes on skill tags and application status made its dashboard queries 83% faster.",
      links: {
        github: "https://github.com/sinchalkar001-dev/Skill-Sphere-Online-Skill-Based-Recruitment-Portal",
      },
      cover: skillSphereCover,
      proof: {
        type: "query",
        title: "Dashboard query time",
        unit: "ms",
        before: { label: "Without compound indexes", value: 820 },
        after: { label: "With compound indexes", value: 140 },
        note: "83% faster once compound indexes are added.",
      },
      overview: "Skill Sphere is a skill-based recruitment portal with role-based access for recruiters and candidates.",
      built:
        "React dashboards over an Express REST API, backed by 6 MongoDB collections that support 500+ applications per posting. I load-tested the API at 200 concurrent users: 180 ms p95 latency with zero failed requests.",
      features: [
        "6 MongoDB collections supporting 500+ applications per posting, with compound indexes on skill tags and application status",
        "Stateless JWT auth with bcrypt hashing and role-based access for recruiters and candidates",
        "Status-change emails with retry-on-failure delivery",
      ],
      architecture: {
        steps: [
          { title: "React dashboards", detail: "For recruiters and candidates" },
          { title: "Express REST API", detail: "JWT authentication and roles" },
          { title: "MongoDB", detail: "Compound indexes on skill tags and application status" },
          { title: "Nodemailer", detail: "Status-change emails, retried on failure" },
        ],
      },
      decisions: [
        {
          title: "Indexes built for the dashboard's queries",
          detail:
            "Compound indexes on skill tags and application status took dashboard query time from 820 ms to 140 ms, 83% faster.",
        },
        {
          title: "Stateless authentication",
          detail: "JWT auth with bcrypt-hashed passwords, and access split by role between recruiters and candidates.",
        },
        {
          title: "Emails that retry",
          detail: "Status-change emails go out with retry-on-failure delivery.",
        },
      ],
      stack: ["React", "Node.js", "Express", "MongoDB", "JWT", "Nodemailer"],
      // In the order a hire happens: the job is written, found and applied to, then reviewed, scored and reported back.
      screenshots: [
        skillSphereCover,
        shot(
          "skill-sphere",
          "06-post-job",
          "Skill Sphere's post-a-job form: requirements and responsibilities above an assessment rubric with four criteria, each with a maximum score and a weight",
          "Posting a job with its rubric",
          "A recruiter lists the role's tech stack, requirements and responsibilities, then sets the rubric every applicant will be scored on: each criterion with a maximum score and a weight.",
        ),
        shot(
          "skill-sphere",
          "04-jobs",
          "Skill Sphere job board with search and filters for job type, experience and work style",
          "Job board",
          "Candidates search by title, skill or keyword and narrow the list by job type, experience and work style. Each card shows the pay, the tech stack, how many have applied, and whether the role is scored by rubric.",
        ),
        shot(
          "skill-sphere",
          "07-job-detail",
          "A Skill Sphere job posting for a backend engineer: about the role, tech stack and requirements, with the salary, an Apply now button and details about the company",
          "A job posting",
          "The full posting: the role, its tech stack and requirements, the salary and the date applications close, and a note that applicants are scored by rubric.",
        ),
        shot(
          "skill-sphere",
          "08-profile",
          "A candidate's profile in Skill Sphere: a short bio, skills, portfolio links and two projects with their tech stacks and links",
          "Candidate profile",
          "A candidate's skills, portfolio links and projects. Each project lists its tech stack and links to the live demo and the code, so the work itself is one click away.",
        ),
        shot(
          "skill-sphere",
          "05-application",
          "A candidate's application in Skill Sphere at the shortlisted stage of a five-stage tracker, with the cover letter, an attached project and the job's details",
          "Application tracker",
          "Each application moves through five stages, from applied to a decision. The candidate sees which stage it has reached, next to their cover letter, the projects they attached and the role's details.",
        ),
        shot(
          "skill-sphere",
          "02-hiring-dashboard",
          "Skill Sphere's hiring dashboard in dark mode: counts of open roles and applicants, the recruiter's job postings, quick actions and recent activity",
          "Hiring dashboard",
          "A recruiter's open roles, postings and applicants at a glance, with each posting's applicant count and controls to review, pause, edit or delete it. Shown in dark mode.",
        ),
        shot(
          "skill-sphere",
          "03-applicants",
          "Skill Sphere applicant review: each candidate's skills and cover letter, with assess, accept and reject actions",
          "Reviewing applicants",
          "Everyone who applied for a role, filtered by stage, each with their skills, experience and cover letter. From here a recruiter starts a review, shortlists, scores, accepts or rejects.",
        ),
        shot(
          "skill-sphere",
          "09-assess",
          "Skill Sphere's assessment dialog: four rubric criteria scored out of ten with sliders, each with a feedback note, and a box for overall feedback",
          "Scoring against the rubric",
          "The recruiter scores each criterion of the role's rubric, adds a note where it helps, and writes a summary for the candidate. The overall score takes each criterion's weight into account.",
        ),
        shot(
          "skill-sphere",
          "11-notifications",
          "The notifications menu open on a candidate's dashboard in Skill Sphere: Assessment Complete with an 83% score, and Application Shortlisted",
          "Live notifications",
          "Being shortlisted, scored or moved to another stage reaches the candidate at once over Socket.IO, under the bell in the header, and by email as well.",
        ),
        shot(
          "skill-sphere",
          "10-scored",
          "A candidate's view of their assessment in Skill Sphere: 83% overall, four criteria with scores and notes, the recruiter's summary, and the tracker at the assessed stage",
          "What the candidate sees",
          "Once scored, the candidate sees the overall score, every criterion with the recruiter's note, and the summary, and the tracker moves on to Assessed.",
        ),
        shot(
          "skill-sphere",
          "12-candidate-dashboard",
          "Skill Sphere's candidate dashboard: application counts by stage, a recent application with its 83% score, quick actions and recent activity",
          "Candidate dashboard",
          "A candidate's applications counted by stage, the latest ones with their score, shortcuts to the job board and their profile, and recent activity.",
        ),
      ],
    },
    {
      slug: "e-medico",
      title: "E-Medico",
      tagline: "Doctor appointment system",
      tags: ["MERN", "Concurrency", "Atomic updates"],
      result: "Zero double-bookings across 1,000+ parallel requests",
      summary:
        "A doctor appointment system where booking is one atomic conditional update: the first request claims the slot and every other one fails the condition.",
      links: {
        github: "https://github.com/sinchalkar001-dev/Doctor-Appointment-System",
      },
      cover: eMedicoCover,
      proof: {
        type: "race",
        title: "One slot, a thousand requests",
        requests: 1000,
        caption: "Each dot is a booking request for the same slot. The first one to arrive claims it; every other one fails the condition.",
        booked: "Booked",
        rejected: "Rejected",
        doubleBooked: "Double-booked",
        note: "A simulation running in your browser. In testing, E-Medico had zero double-bookings across 1,000+ parallel requests.",
      },
      overview:
        "E-Medico is a doctor appointment system for patients and doctors, with 50+ doctor profiles and search by specialisation, availability and location.",
      built:
        "A booking flow cut from 6 steps to 3, on top of a booking endpoint that holds up under load: 300+ concurrent booking requests sustained under 250 ms p95.",
      features: [
        "Booking is a single atomic conditional MongoDB update: the first request claims the slot and every other one fails the condition",
        "300+ concurrent booking requests sustained under 250 ms p95 across 50+ doctor profiles and 2 user roles",
        "Booking flow cut from 6 steps to 3, with doctor search by specialisation, availability and location",
      ],
      architecture: {
        steps: [
          { title: "Search doctors", detail: "By specialisation, availability and location" },
          { title: "Pick a slot" },
          { title: "One atomic update", detail: "A single conditional MongoDB update" },
          { title: "First request wins", detail: "The rest fail the condition" },
          { title: "Confirmation" },
        ],
      },
      decisions: [
        {
          title: "Let the database pick the winner",
          detail:
            "Booking is a single atomic conditional MongoDB update. The first request claims the slot and every other one fails the condition, so no slot is booked twice.",
        },
        {
          title: "Fewer steps to a booking",
          detail: "The flow went from 6 steps to 3, with search by specialisation, availability and location.",
        },
        {
          title: "Tested with parallel requests",
          detail: "300+ concurrent booking requests held under 250 ms p95, across 50+ doctor profiles and 2 user roles.",
        },
      ],
      stack: ["React", "Node.js", "Express", "MongoDB", "JWT"],
      // Patients first, then the doctor's side, then the clinic's administrators.
      screenshots: [
        eMedicoCover,
        shot(
          "e-medico",
          "02-doctors",
          "E-Medico doctor directory with each doctor's department, experience and consultation fee",
          "Doctor directory",
          "Every doctor with their department, years of experience and consultation fee. The list can be searched, filtered by department and sorted by name, fee or experience, and each card books straight from here.",
        ),
        shot(
          "e-medico",
          "03-booking",
          "E-Medico booking panel: pick a doctor, a date and an open time, with taken times crossed out",
          "Booking a visit",
          "Pick a doctor, a day and an open time. Days off and fully booked days can't be picked, taken times are crossed out, and the doctor confirms each request. If two patients go for the same time at once, only one booking gets through.",
        ),
        shot(
          "e-medico",
          "04-appointments",
          "A patient's appointments in E-Medico, with the next visit and its status",
          "My appointments",
          "A patient's next visit and all their appointments, upcoming, past and cancelled, each with its status and the reason given. When the doctor confirms or cancels, the change shows up at once, without a refresh.",
        ),
        shot(
          "e-medico",
          "07-reschedule",
          "E-Medico's reschedule panel: a new day and an open time picked for an appointment with Dr. Sarah Johnson",
          "Rescheduling",
          "Moving an appointment works like booking one: the patient picks another day and time with the same doctor, from the times that doctor is actually free.",
        ),
        shot(
          "e-medico",
          "08-doctors-note",
          "A patient's past appointments in E-Medico: a completed check-up with the doctor's note about blood work and cholesterol",
          "The doctor's note",
          "After a visit the doctor marks it completed and can leave a note, which the patient reads under their past appointments.",
        ),
        shot(
          "e-medico",
          "05-doctor-schedule",
          "A doctor's schedule in E-Medico, with a request waiting to be confirmed",
          "Doctor's schedule",
          "Each doctor signs in to their own schedule: today's visits, then requests, upcoming, past and cancelled appointments. Requests are confirmed or declined from here.",
        ),
        shot(
          "e-medico",
          "09-working-hours",
          "E-Medico's working-hours panel: Monday to Friday, 9:00 to 17:00 with a break from 13:00 to 14:00 and 30-minute appointments, making 14 a day",
          "Working hours",
          "A doctor sets their working days, hours, a daily break and how long an appointment lasts, and sees how many appointments a day that makes. Patients can only book inside these hours; existing appointments are kept.",
        ),
        shot(
          "e-medico",
          "06-admin",
          "E-Medico admin overview: key numbers, appointments by status and requests awaiting confirmation",
          "Admin overview",
          "The clinic at a glance: doctors, registered users and appointments, a breakdown by status, and the requests still waiting, each of which can be confirmed from here.",
        ),
        shot(
          "e-medico",
          "10-admin-appointments",
          "E-Medico's admin appointments table: patients, doctors, dates and statuses, with confirm and cancel buttons on pending requests",
          "Every appointment",
          "Admins see every appointment in the clinic, filtered by status, with the patient's reason, and can confirm or cancel the ones still open.",
        ),
        shot(
          "e-medico",
          "11-admin-doctors",
          "E-Medico's admin doctors table: department, working hours, sign-in, experience and fee for each doctor, with edit and remove buttons and an Add doctor button",
          "Managing doctors",
          "The directory as admins run it: each doctor's department, working hours, sign-in for the doctor portal, experience and fee, with add, edit and remove.",
        ),
        shot(
          "e-medico",
          "12-admin-users",
          "E-Medico's admin users list: doctors and patients with their role and the date they joined, and a search box",
          "Registered users",
          "Everyone with an account, their role and when they joined, searchable by name or email.",
        ),
      ],
    },
    {
      slug: "credit-risk",
      title: "Credit Risk & Fraud Detection",
      tagline: "Machine-learning classification API",
      tags: ["Python", "Machine learning", "Flask", "Docker"],
      result: "91% test accuracy against a 70% majority-class baseline",
      summary:
        "A Flask REST API that classifies credit risk for single records or batch CSV uploads, built on a Gradient Boosting model trained on a 1,000-record credit dataset.",
      links: {},
      proof: {
        type: "accuracy",
        title: "Test accuracy",
        unit: "%",
        bars: [
          { label: "Majority-class baseline", value: 70 },
          { label: "Gradient Boosting model", value: 91, highlight: true },
        ],
        note: "Always predicting the majority class scores 70%, so that is the number the model has to beat.",
      },
      overview: "A machine-learning API that classifies credit risk, with an analytics dashboard on top.",
      built:
        "A Flask REST API with single-record and batch CSV inference, session auth and an analytics dashboard, around a Gradient Boosting classifier trained on a 1,000-record, 20-attribute credit dataset.",
      features: [
        "Flask REST API for credit-risk classification with single-record and batch CSV inference, session auth and an analytics dashboard",
        "Gradient Boosting classifier trained on a 1,000-record, 20-attribute credit dataset",
        "Containerised with Docker Compose, with a health-check endpoint",
      ],
      architecture: {
        steps: [
          { title: "Input", detail: "A single record or a CSV upload" },
          { title: "Flask REST API", detail: "Session auth" },
          { title: "Gradient Boosting model" },
          { title: "Risk label" },
          { title: "Analytics dashboard" },
        ],
      },
      decisions: [
        {
          title: "Measured against a baseline",
          detail:
            "The model reaches 91% test accuracy. Always predicting the majority class would score 70%, so that is the number it has to beat.",
        },
        {
          title: "Single and batch inference in one API",
          detail: "The same Flask REST API scores one record at a time or a whole CSV upload.",
        },
        {
          title: "Containerised, with a health check",
          detail: "The service runs under Docker Compose and exposes a health-check endpoint.",
        },
      ],
      stack: ["Python", "Flask", "scikit-learn", "Pandas", "Docker"],
      screenshots: [],
    },
  ],
};

// Headings on every case-study page.
export const caseStudy = {
  overview: "Overview",
  built: "What I built",
  result: "The result",
  features: "Key features",
  architecture: "Architecture",
  decisions: "Technical decisions",
  stack: "Tech stack",
  screenshots: "Screenshots",
  openImage: "Open screenshot",
  closeImage: "Close",
  previousImage: "Previous screenshot",
  nextImage: "Next screenshot",
};

export const contact = {
  heading: "Let's build something that holds up.",
  line: "Reach out about roles, projects or anything on this page.",
  form: {
    name: "Name",
    email: "Email",
    message: "Message",
    submit: "Send message",
    sending: "Sending",
    errors: {
      name: "Enter your name.",
      email: "Enter an email address, like name@example.com.",
      message: "Write a message of at least 10 characters.",
    },
    success: "Message sent. I'll reply to the email address you gave.",
    failure: "The message wasn't sent. Try again, or email me directly at",
    viaEmailApp: "Your email app should open with the message filled in. If it doesn't, write to",
    subject: "Portfolio message from",
  },
  // The form sends through FormSubmit (formsubmit.co), which emails every message to `to`.
  // Nothing is delivered until the address is activated: FormSubmit emails it an "Activate Form" link
  // the first time the form is used, and that link has to be clicked once.
  // After activating, FormSubmit also offers a random string that can stand in for the address here,
  // so the address is not readable in the page's code. Leave `to` empty and the form opens the
  // visitor's email app instead.
  formsubmit: {
    to: site.email,
  },
};

export const footer = {
  rights: "All rights reserved.",
};

export const projectBySlug = (slug) => projects.items.find((project) => project.slug === slug);
