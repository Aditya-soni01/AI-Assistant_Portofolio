export const personalInfo = {
  name: "Aditya Soni",
  role: "AI Engineer / Full-Stack Software Developer",
  title: "AI Engineer | Full-Stack Developer | SaaS Builder",
  tagline: "Building AI-powered full-stack systems that scale.",
  subheadline:
    "I\'m Aditya Soni, a Full-Stack Software Developer with 4 years of experience in .NET, Python, FastAPI, SQL, and cloud APIs - now building AI products, LLM-powered workflows, and intelligent automation systems.",
  about:
    "I started as a full-stack developer working across .NET backends and frontend interfaces with React + Vite, alongside REST APIs, SQL Server, authentication, and enterprise systems. Over time, I moved deeper into performance optimization, clean architecture, API design, and scalable full-stack workflows. Recently, I have been building AI-powered SaaS products and tools such as RoleGenie, Nebula, and Stock Analysis API, where I combine full-stack engineering with LLMs, automation, and real-world product thinking.",
  yearsOfExperience: 4,
  location: "India",
  company: "PODTECH",
  email: "adityasoni011997@gmail.com",
  phone: "+91 7400787714",
  resumeUrl: "/resume-aditya-soni.pdf",
  socials: [
    {
      id: "github",
      label: "GitHub",
      url: "https://github.com/Aditya-soni01",
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/aditya-soni-66829722b/",
    },
  ],
  cta: {
    primary: {
      label: "View Projects",
      scrollTarget: "systems",
    },
    secondary: {
      label: "Download Resume",
      href: "/resume-aditya-soni.pdf",
      external: true,
    },
  },
};

export const skillCategories = [
  {
    id: "backend",
    category: "Backend",
    description: "API-first backend development for reliable SaaS products.",
    skills: [
      "C#",
      ".NET Core",
      "ASP.NET Web API",
      "Python",
      "FastAPI",
      "REST APIs",
      "Microservices concepts",
      "Entity Framework Core",
    ],
  },
  {
    id: "ai-llm",
    category: "AI / LLM",
    description: "Practical AI product building using LLMs, agents, and automation.",
    skills: [
      "LLM APIs",
      "AI Agents",
      "Prompt Engineering",
      "Resume Analysis",
      "Workflow Automation",
      "AI-assisted Insights",
      "RAG concepts",
      "Real-time AI apps",
    ],
  },
  {
    id: "database",
    category: "Database",
    description: "Data modeling, query performance, and operational reliability.",
    skills: [
      "SQL Server",
      "PostgreSQL",
      "Stored Procedures",
      "SQL Optimization",
      "Data Modeling",
    ],
  },
  {
    id: "architecture",
    category: "Architecture",
    description: "Structured design patterns for maintainable and scalable systems.",
    skills: [
      "Clean Architecture",
      "SOLID Principles",
      "OOP",
      "Repository Pattern",
      "Unit of Work",
      "API Security",
    ],
  },
  {
    id: "cloud-tools",
    category: "Cloud / Tools",
    description: "Deployment-ready engineering workflows and team delivery practices.",
    skills: [
      "Azure App Services",
      "Azure Functions",
      "Azure DevOps",
      "Git",
      "GitHub",
      "CI/CD",
      "Agile/Scrum",
    ],
  },
  {
    id: "frontend-supporting",
    category: "Frontend / Supporting",
    description: "Supporting frontends with fast integrations and clean API contracts.",
    skills: [
      "React",
      "Angular",
      "API Integration",
      "JSON Serialization",
      "Debugging",
      "Performance Tuning",
    ],
  },
];

export const experience = [
  {
    id: "podtech",
    company: "PODTECH",
    role: "Software Developer",
    period: "June 2025 - Present",
    highlights: [
      "Optimized backend APIs and database calls, reducing response time by around 50% using stored procedure consolidation and improved query flow.",
      "Designed, maintained, and enhanced production APIs with focus on scalability, reliability, and clean code.",
      "Integrated backend services with React-based dashboards and data visualizations.",
      "Worked with cross-functional stakeholders to troubleshoot issues, deliver improvements, and support release timelines.",
    ],
  },
  {
    id: "taritas",
    company: "Taritas Software Solutions",
    role: "Software Developer",
    period: "Nov 2022 - May 2025",
    highlights: [
      "Developed secure backend services and business APIs using ASP.NET Core Web API.",
      "Implemented JWT authentication and role-based access control.",
      "Built and supported RESTful APIs using Python frameworks like FastAPI and Django.",
      "Worked extensively with SQL databases, validation, serialization, backend logic, and API integrations.",
      "Participated in Agile development, debugging, maintenance, and performance improvement.",
    ],
  },
  {
    id: "infosys",
    company: "Infosys Limited",
    role: "System Engineer",
    period: "June 2022 - Oct 2022",
    highlights: [
      "Completed Microsoft .NET training.",
      "Strengthened OOP, software design, and backend development fundamentals.",
      "Built CRUD-based applications and REST APIs with validation and structured debugging.",
    ],
  },
];

export const projects = [
  {
    id: "rolegenie",
    title: "RoleGenie - AI Resume Optimization SaaS",
    caseStudyUrl: "https://rolegenieai.com/",
    description:
      "An AI-powered resume and career platform that analyzes resumes against job descriptions, identifies gaps, improves alignment, and generates stronger ATS-friendly resume output.",
    impact: "Built as a practical SaaS product focused on measurable job-readiness outcomes.",
    techStack: [
      "React",
      "TypeScript",
      "Python",
      "FastAPI",
      "LLM APIs",
      "Resume Parsing",
      "AI Workflow Automation",
    ],
    highlights: [
      "Resume optimization based on job descriptions",
      "ATS-focused improvement suggestions",
      "AI-powered content analysis",
      "Practical SaaS product thinking",
    ],
  },
  {
    id: "nebula",
    title: "Nebula - AI App Builder on OpenClaw",
    caseStudyUrl: "https://github.com/Aditya-soni01",
    description:
      "A platform built on top of OpenClaw that enables rapid creation of AI-powered applications using agent workflows, LLM orchestration, and automation pipelines.",
    impact: "Reduced manual setup and accelerated delivery for AI application development cycles.",
    techStack: [
      "Python",
      "FastAPI",
      "LLM APIs",
      "OpenClaw",
      "Agent Frameworks",
      "Workflow Automation",
    ],
    highlights: [
      "Built on top of OpenClaw agent system",
      "Enables building AI apps with minimal manual coding",
      "Supports multi-agent workflows and orchestration",
      "Focused on reducing development time for AI applications",
      "Designed as a scalable AI application framework",
    ],
  },
  {
    id: "stock-analysis-api",
    title: "Stock Analysis API - AI-assisted Market Insight Backend",
    caseStudyUrl: "https://github.com/Aditya-soni01",
    description:
      "A backend service for stock analysis and trading insights using Python and FastAPI with modular APIs and third-party market data integrations.",
    impact: "Created a clean, extensible backend foundation for intelligent market analysis workflows.",
    techStack: ["Python", "FastAPI", "APIs", "AI-assisted analysis", "Modular Backend Architecture"],
    highlights: [
      "Market data integration",
      "AI-assisted insight generation",
      "Clean service structure",
      "Designed for future automation features",
    ],
  },
  {
    id: "enterprise-api-optimization",
    title: "Enterprise API Optimization System",
    caseStudyUrl: "https://github.com/Aditya-soni01",
    description:
      "Backend optimization work where API response time was reduced by around 50% through SQL stored procedure consolidation, improved query flow, and backend performance tuning. I built a RAG chatbot to retrieve application data quickly and concisely using FastAPI.",
    impact: "Delivered around 50% faster response times for production API workflows.",
    techStack: [
      ".NET Core",
      "SQL Server",
      "Stored Procedures",
      "REST APIs",
      "FastAPI",
      "RAG Chatbot",
      "React Dashboard Integration",
    ],
    highlights: [
      "50% response time improvement",
      "SQL optimization",
      "Backend scalability",
      "Dashboard API integration",
    ],
  },
];

export const education = [
  {
    id: "be-ggct",
    degree: "Bachelor of Engineering",
    institution: "Gyan Ganga College of Technology, Jabalpur",
    period: "2015 - 2019",
  },
];
