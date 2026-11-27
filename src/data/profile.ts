export interface StatItem {
  value: string;
  label: string;
  numericValue?: number;
  suffix?: string;
  isTag?: boolean;
}

export interface SkillGroup {
  category: string;
  subtitle: string;
  icon: "server" | "database" | "code" | "wrench";
  items: string[];
}

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  employmentType?: string;
  highlights: string[];
}

/**
 * Single easy-to-edit constant for experience duration shown across the site.
 */
export const EXPERIENCE_YEARS = 1;
export const EXPERIENCE_LABEL = `${EXPERIENCE_YEARS}+ ${
  EXPERIENCE_YEARS === 1 ? "year" : "years"
}`;

export const profile = {
  name: "Muhammad Arsalan",
  brandName: "Arsalan",
  initials: "MA",
  siteTitle: "Muhammad Arsalan — Laravel Developer | Also experienced in .NET",
  aboutHeading: "Laravel Developer with .NET experience",
  tagline: "Building reliable backend systems with Laravel and .NET.",
  footerStack: "Laravel · MySQL · ASP.NET Core",
  location: "Islamabad, Pakistan",
  locationNote: "Open to remote & relocation",
  heroBadge: "Open to opportunities · Islamabad, Pakistan",
  heroRoles: [
    "Laravel Developer",
    "REST API Developer",
    "Multi-Tenant Systems",
    "Also experienced in .NET",
  ],
  heroSummary:
    "Laravel developer at Netrix Cloud since June 2025, building web applications, REST APIs, and multi-tenant systems with PHP and MySQL, alongside freelance experience in ASP.NET MVC and ASP.NET Core.",
  email: "arslankhakwani001@gmail.com",
  company: "Netrix Cloud",
  languages: ["English", "Urdu", "Pashto", "Saraiki"],
  links: {
    github: "https://github.com/arslankhakwani",
    linkedin: "https://www.linkedin.com/in/muhammad-arsalan-b0357a363",
    laravelCv: "/cv/Muhammad-Arsalan-Laravel-CV.pdf",
    dotnetCv: "/cv/Muhammad-Arsalan-DotNet-CV.pdf",
  },
  summary:
    "Laravel developer currently working at Netrix Cloud (since June 2025), building web applications with PHP, Laravel and MySQL: REST APIs, authentication and role-based access, multi-tenant architecture, and real-time notifications. Alongside my job, I have worked as a freelance .NET developer, delivering ASP.NET MVC and ASP.NET Core applications with SQL Server and Entity Framework. I care about clean code, solid database design, and performance.",
  skillsIntro:
    "Laravel and MySQL are my daily tools at Netrix Cloud. Alongside that, I've built and delivered applications using ASP.NET MVC, ASP.NET Core, and SQL Server as a freelancer.",
  stats: [
    {
      numericValue: EXPERIENCE_YEARS,
      suffix: EXPERIENCE_YEARS === 1 ? "+ year" : "+ years",
      value: EXPERIENCE_LABEL,
      label: "Professional Laravel experience",
    },
    {
      numericValue: 5,
      suffix: "",
      value: "5",
      label: "Projects",
    },
    {
      numericValue: 2,
      suffix: "",
      value: "2",
      label: "Backend stacks",
    },
    {
      value: "Netrix Cloud",
      label: "Currently employed",
      isTag: true,
    },
  ] as StatItem[],
  skills: {
    primary: [
      {
        category: "Laravel & PHP",
        subtitle: "Daily production work",
        icon: "server",
        items: [
          "Laravel",
          "Eloquent ORM",
          "Blade",
          "Middleware",
          "RBAC",
          "Multi-Tenancy",
          "REST APIs",
          "Pusher",
          "Laravel Scheduler",
          "Laravel Broadcast",
        ],
      },
      {
        category: "Database & Query Layer",
        subtitle: "Schema & performance",
        icon: "database",
        items: [
          "MySQL",
          "Migrations",
          "Seeders",
          "Pivot Tables",
          "Query Optimization",
        ],
      },
    ] as SkillGroup[],
    secondary: [
      {
        category: ".NET Ecosystem",
        subtitle: "Freelance delivery",
        icon: "code",
        items: [
          "C#",
          ".NET Core",
          "ASP.NET MVC",
          "Entity Framework",
          "LINQ",
          "Dependency Injection",
          "Razor",
          "SQL Server",
          "Stored Procedures",
          "IIS Deployment",
        ],
      },
      {
        category: "Shared Engineering & Tooling",
        subtitle: "Frontend basics & workflow",
        icon: "wrench",
        items: [
          "HTML5",
          "CSS3",
          "JavaScript",
          "Bootstrap",
          "Git",
          "GitHub",
          "Postman",
          "Composer",
          "VS Code",
          "Visual Studio",
        ],
      },
    ] as SkillGroup[],
  },
  experience: [
    {
      role: "Laravel Developer",
      company: "Netrix Cloud",
      period: "Jun 2025 – Present",
      employmentType: "Full-time",
      highlights: [
        "Built and maintained web application modules in PHP and Laravel",
        "Implemented RESTful APIs and backend features for frontend integration",
        "Designed relational databases with MySQL, Eloquent, migrations and pivot tables",
        "Implemented authentication, authorization, middleware and role-based permissions",
        "Worked on multi-tenant architecture and tenant-specific database operations",
        "Built task management features: assignments, comments, and notifications",
        "Integrated real-time notifications with Pusher and Laravel broadcasting, plus scheduled backend processes",
        "Debugged issues, improved queries, and collaborated through Git/GitHub",
      ],
    },
    {
      role: ".NET Developer",
      company: "Freelance",
      period: "Nov 2024 – Present",
      highlights: [
        "Built ASP.NET MVC and ASP.NET Core web applications",
        "Worked with SQL Server, stored procedures and complex queries",
        "Used Entity Framework and LINQ for database operations",
        "Deployed applications on IIS and local production servers",
        "Debugged, fixed bugs, and optimized performance",
      ],
    },
  ] as ExperienceItem[],
  education: [
    {
      degree: "Bachelor of Science in Computer Science (BSCS)",
      level: "Bachelor's",
      period: "2020 – 2024",
    },
    {
      degree: "Higher Secondary School Certificate (HSSC / Intermediate)",
      level: "Inter",
      period: "2018 – 2020",
    },
    {
      degree: "Secondary School Certificate (SSC / Matriculation)",
      level: "Matric",
      period: "2016 – 2018",
    },
  ],
  faqs: [
    {
      question: "What roles are you open to?",
      answer:
        "I am primarily looking for backend or full-stack Laravel / PHP developer roles where I can contribute to APIs, database architecture, and core application logic. I am also open to .NET backend or MVC roles given my freelance experience delivering ASP.NET applications.",
    },
    {
      question: "Which stack do you prefer?",
      answer:
        "Laravel is my daily stack and strongest area — I work in PHP, Laravel, and MySQL every day at Netrix Cloud. At the same time, I am comfortable picking up C#, ASP.NET Core / MVC, Entity Framework, and SQL Server from real freelance projects.",
    },
    {
      question: "Are you open to remote work?",
      answer:
        "Yes. I am based in Islamabad, Pakistan, and I am open to remote opportunities across time zones as well as on-site or relocation roles for the right team.",
    },
    {
      question: "How quickly can you start?",
      answer:
        "I'm currently employed full-time at Netrix Cloud, so I'd work out a standard notice period, typically 2 to 4 weeks, with my current team. Feel free to reach out so we can align on timelines.",
    },
  ],
};
