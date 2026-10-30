/**
 * Portfolio Content Data
 * 
 * Edit your personal information, profile image, projects, skills, and links here.
 */

export const personalInfo = {
  name: "Sunith",
  brandName: "Sunith.dev",
  role: "Full-Stack Developer",
  location: "Galle, SriLanka",
  email: "sunithkaushalya.pp@gmail.com",
  experienceYears: "3+ Years Exp",
  
  /**
   * Profile Image:
   * Single image file located at public/profile.jpg
   */
  avatarUrl: "/profile.jpg",
  
  status: "Available for Full-Stack & Software Engineering Roles",
  headline: "Sunith P Pathirana",
  headlineGradient: "Software Engineer",
  bio: "Motivated and imaginative Software Engineer with a strong foundation in programming languages, software development, and database management. Proficient in a wide range of frameworks and databases, with hands-on experience in designing and developing scalable systems. Adept at collaborating with cross-functional teams to deliver innovative, high-quality solutions. Passionate about leveraging technical expertise to drive organizational success while continuously enhancing professional skills.",
  contactTitle: "Get in touch",
  contactSubtitle: "Have a project in mind or want to discuss engineering opportunities? Drop a message below or reach out directly.",
  footerCopyright: "Sunith P Pathirana. Built with React & Liquid Glassmorphism."
};

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" }
];

export const socialLinks = {
  github: "https://github.com/Pathirana99",
  linkedin: "https://www.linkedin.com/in/sunith-p-pathirana-323b712a0",
  email: "mailto:sunithkaushalya.pp@gmail.com"
};

export const highlights = [
  {
    id: "systems",
    icon: "Cpu",
    title: "Systems Architecture",
    description: "Designing scalable cloud-native services with Go, Rust, and container orchestration."
  },
  {
    id: "frontend",
    icon: "Layers",
    title: "Frontend Polish",
    description: "Crafting immaculate user interfaces with React, Vite, and advanced glassmorphism."
  },
  {
    id: "devops",
    icon: "Globe",
    title: "Reliability & CI/CD",
    description: "Automating testing pipelines and frictionless deployments via GitHub Actions."
  }
];

export const projectCategories = [
  { id: "all", label: "All" },
  { id: "backend", label: "Backend" },
  { id: "frontend", label: "Frontend" },
  { id: "ai", label: "AI" }
];

export const projects = [
  {
    id: 1,
    title: "Office for Reparations Sri Lanka – Information Management System (IMS)",
    image: "/projects/orims.jpg",
    description: "Contributed to the development and maintenance of an enterprise information management system that supports the digital handling of sensitive case records, applicant data, and administrative workflows, proactively resolving workflow and logic issues, improving system stability, and contributing to ongoing feature development to improve the efficiency and transparency of government operations.",
    tech: ["Java", "Spring Boot", "MySQL", "Enterprise IMS", "Workflows"]
  },
  {
    id: 2,
    title: "Agsafe – Recycling & Operations Information Management System",
    image: "/projects/dd.jpg",
    description: "Worked on an enterprise system that supports recycling operations and environmental stewardship programs, allowing for efficient tracking of inventory, operational workflows, and reporting processes. Contributed to the design of system components, workflow automation, and implementation of scalable features to improve overall efficiency.",
    tech: ["Java", "Spring Boot", "MySQL", "Workflow Automation", "Reporting"]
  },
  {
    id: 3,
    title: "Ceciliyan – Tea Factory Management System",
    image: "/projects/ciciliyan.jpg",
    description: "Developed and maintained the Ceciliyan Tea Factory Management System to streamline employee attendance and daily operational workflows. Contributed to planning and optimizing system flows, implementing new features, and enhancing overall system performance, improving workforce management efficiency and operational accuracy.",
    tech: ["React", "Node.js", "MySQL", "Workforce Management", "Optimization"]
  },
  {
    id: 4,
    title: "Boarding House Reservation System",
    image: "/projects/bdoor.jpg",
    description: "Developed a full-stack reservation system using React, Spring Boot, and MySQL for property booking management, implementing scalable backend services, real-time updates, booking functionalities, and email notifications, while designing a responsive UI/UX with advanced search filters and price comparison features to enhance overall user experience.",
    tech: ["React", "Spring Boot", "MySQL", "REST API", "UI/UX"]
  },
  {
    id: 5,
    title: "Wallet Web Application",
    image: "/projects/wallet.jpg",
    description: "Built a full-stack personal finance web application using React, Spring Boot, and MySQL, developing features for user account management, income and expense tracking, and real-time balance updates, while implementing admin functionalities for managing user profiles and monitoring system data.",
    tech: ["React", "Spring Boot", "MySQL", "Fintech", "Admin Panel"]
  },
  {
    id: 6,
    title: "Budget Handling Application",
    image: "/projects/bjt.jpg",
    description: "Developed a personal finance mobile application using Flutter and Android Studio, enabling expense and income tracking with calendar integration and detailed financial records, while focusing on usability and intuitive design to enhance user experience and financial management efficiency.",
    tech: ["Flutter", "Android Studio", "Dart", "Finance Tracking", "Calendar"]
  }
];

export const skills = [
  { id: "react", name: "React" },
  { id: "node", name: "Node.js" },
  { id: "springboot", name: "Spring Boot" },
  { id: "nextjs", name: "Next.js" },
  { id: "nestjs", name: "Nest.js" },
  { id: "medusajs", name: "Medusa.js" },
  { id: "java", name: "Java" },
  { id: "javascript", name: "JavaScript" },
  { id: "typescript", name: "TypeScript" },
  { id: "c", name: "C" },
  { id: "docker", name: "Docker" },
  { id: "mysql", name: "MySQL" },
  { id: "postgresql", name: "PostgreSQL" },
  { id: "cicd", name: "CI/CD" },
  { id: "git", name: "Git" },
  { id: "tailwindcss", name: "Tailwind CSS" },
  { id: "pwa", name: "PWA" }
];

export const experience = [
  {
    id: 1,
    role: "Software Engineer",
    company: "E-Life America (US)",
    period: "Present",
    logo: "/companies/elife.jpg",
    points: [
      "Contributing to the full-stack engineering and ongoing maintenance of an American enterprise ticketing system and scalable healthcare-related platforms.",
      "Additionally serving as an IT Support Engineer, diagnosing complex system issues, resolving infrastructure workflows, and ensuring optimal platform uptime and reliability.",
      "Collaborating closely with cross-functional teams to design, optimize, and deploy secure, robust solutions aligned with industry best practices."
    ]
  },
  {
    id: 2,
    role: "Associate Software Engineer",
    company: "iTerminal Technologies",
    period: "Nov 2025 – Present",
    logo: "/companies/iterminal.jpg",
    points: [
      "Developed and maintained full-stack applications using Next.js, Nest.js, Spring Boot, React, and MySQL, delivering scalable, secure, and high-performance systems.",
      "Collaborated with cross-functional teams, leveraging Git, Bitbucket, Jira, and Trello for version control, project management, and API documentation, while following best practices in clean code, testing, and system design.",
      "Applied strong problem-solving, data structures, and algorithmic thinking to create efficient solutions."
    ]
  },
  {
    id: 3,
    role: "Software Engineer Intern",
    company: "iTerminal Technologies",
    period: "May 2025 - Nov 2025",
    logo: "/companies/iterminal.jpg",
    points: [
      "Developed and maintained full-stack applications using Next.js, Nest.js, TypeScript, and MySQL, following industry best practices and coding standards.",
      "Collaborated with cross-functional teams to design and deliver high-quality features, while actively participating in code reviews, debugging, and performance optimization.",
      "Utilized tools such as Bitbucket, Jira, Trello, and Swagger for version control, project management, and API documentation to ensure efficient development workflows."
    ]
  }
];

export const education = [
  {
    id: 1,
    degree: "Bachelor of Science",
    field: "(Computer Science, Mathematics, Physics)",
    institution: "University of Ruhuna",
    period: "Graduated",
    logo: "/companies/ruhuna.png",
    points: [
      "Focused on Computer programming language, Software development, Computer system, Laboratory practice and Projects"
    ],
    description: "Focused on Computer programming language, Software development, Computer system, Laboratory practice and Projects"
  }
];

