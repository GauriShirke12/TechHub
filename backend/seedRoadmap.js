const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Roadmap = require('./models/Roadmap');

dotenv.config();


const slugify = (text) => text.toLowerCase().trim().replace(/\s+/g, '-');

const seedRoadmaps = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');

    await Roadmap.deleteMany({}); 

    const roadmaps = [
      {
        domain: 'MERN Stack',
        slug: slugify('MERN Stack'),
        milestones: [
          { title: "Learn HTML, CSS, JS", description: "Basics of web development", order: 1, quizzes: ["html-basics", "css-fundamentals"], projects: ["build a portfolio"] },
          { title: "Master React", description: "Component-based UI library", order: 2, quizzes: ["react-hooks", "react-routing"], projects: ["build a todo app"] },
          { title: "Understand Node.js and Express", description: "Server-side development", order: 3, quizzes: ["node-basics", "express-routing"], projects: ["build a REST API"] },
          { title: "Learn MongoDB", description: "NoSQL database basics", order: 4, quizzes: ["mongodb-basics", "mongoose"], projects: ["build a CRUD app"] },
          { title: "Version Control with Git and GitHub", description: "Source code management", order: 5, quizzes: ["git-basics", "github-workflow"], projects: [] },
          { title: "Explore Additional Tools & Frameworks", description: "Bootstrap, security basics, deployment", order: 6, quizzes: ["bootstrap", "security-fundamentals"], projects: ["deploy your app"] }
        ]
      },
      {
        domain: 'AI/ML',
        slug: slugify('AI/ML'),
        milestones: [
          { title: 'Learn Python', description: 'Understand Python syntax, data structures, and libraries like Numpy and Pandas.', order: 1, quizzes: ['python-basics'], projects: ['Data wrangling with Pandas'] },
          { title: 'Math for ML', description: 'Linear algebra, statistics, probability, calculus.', order: 2, quizzes: ['math-linear-algebra'], projects: [] },
          { title: 'Data Preprocessing', description: 'Cleaning, handling missing data, feature scaling and encoding.', order: 3, quizzes: ['data-cleaning'], projects: ['Clean dataset using Sklearn'] },
          { title: 'Machine Learning', description: 'Supervised and Unsupervised algorithms, sklearn, model evaluation.', order: 4, quizzes: ['ml-supervised', 'ml-unsupervised'], projects: ['Build a spam classifier'] },
          { title: 'Deep Learning', description: 'Neural networks, TensorFlow, Keras, CNNs, RNNs.', order: 5, quizzes: ['neural-networks'], projects: ['Digit recognition with MNIST'] },
          { title: 'Deployment & Tools', description: 'Streamlit, Flask, Docker, model serving basics.', order: 6, quizzes: [], projects: ['Deploy ML model with Streamlit'] }
        ]
      },
      {
        domain: 'Data Science',
        slug: slugify('Data Science'),
        milestones: [
          { title: 'Learn Python & Data Analysis', description: 'Python, Numpy, Pandas, Matplotlib, Seaborn for EDA.', order: 1, quizzes: ['data-analysis'], projects: ['Explore COVID dataset'] },
          { title: 'Statistics & Probability', description: 'Distributions, Hypothesis Testing, Confidence Intervals.', order: 2, quizzes: ['stats-hypothesis'], projects: ['Analyze A/B test'] },
          { title: 'Data Wrangling & Cleaning', description: 'Handling nulls, merging datasets, feature engineering.', order: 3, quizzes: [], projects: ['Clean Kaggle dataset'] },
          { title: 'Visualization & Storytelling', description: 'DataViz tools, dashboards, communication.', order: 4, quizzes: ['data-visualization'], projects: ['Build a dashboard with Plotly'] },
          { title: 'Machine Learning & Modeling', description: 'Regression, classification, clustering with real-world data.', order: 5, quizzes: ['ml-modeling'], projects: ['Predict housing prices'] },
          { title: 'Capstone Project', description: 'End-to-end Data Science project from data to deployment.', order: 6, quizzes: [], projects: ['Data Science capstone'] }
        ]
      },
      {
        domain: 'Web Development',
        slug: slugify('Web Development'),
        milestones: [
          { title: 'Internet & Web Basics', description: 'Understand how the internet works, DNS, HTTP, Browsers.', order: 1 },
          { title: 'HTML & CSS', description: 'Structure and style web pages.', order: 2 },
          { title: 'JavaScript Fundamentals', description: 'Variables, functions, loops, DOM manipulation.', order: 3 },
          { title: 'Modern JS & Tooling', description: 'ES6+, npm, Babel, Webpack.', order: 4 },
          { title: 'Frontend Frameworks', description: 'React, Vue, Angular basics.', order: 5 },
          { title: 'Backend Basics', description: 'Node.js, Express, APIs, Databases.', order: 6 },
          { title: 'Hosting & Deployment', description: 'Netlify, Vercel, Render, CI/CD overview.', order: 7 }
        ]
      },
      {
        domain: 'Data Structures & Algorithms',
        slug: slugify('Data Structures & Algorithms'),
        milestones: [
          { title: 'Arrays & Strings', description: 'Traversal, search, manipulation, time complexity.', order: 1 },
          { title: 'Linked Lists', description: 'Singly, doubly linked lists, operations.', order: 2 },
          { title: 'Stacks & Queues', description: 'Implementation and usage.', order: 3 },
          { title: 'Trees', description: 'Binary trees, BST, traversals, recursion.', order: 4 },
          { title: 'Graphs', description: 'DFS, BFS, shortest path, cycle detection.', order: 5 },
          { title: 'Recursion & Backtracking', description: 'Patterns and problem-solving.', order: 6 },
          { title: 'Dynamic Programming', description: 'Memoization, tabulation, classic problems.', order: 7 }
        ]
      },
      {
        domain: 'Cybersecurity',
        slug: slugify('Cybersecurity'),
        milestones: [
          { title: 'Basics of Cybersecurity', description: 'CIA Triad; types of threats; security principles.', order: 1 },
          { title: 'Networking Fundamentals', description: 'OSI/TCP-IP; IP, DNS, Firewalls, VPNs.', order: 2 },
          { title: 'Operating Systems & Security', description: 'Linux, Windows, permissions, users.', order: 3 },
          { title: 'Cryptography', description: 'Encryption, hashing, digital signatures.', order: 4 },
          { title: 'Vulnerability Assessment & Penetration Testing', description: 'Nmap, Metasploit, Wireshark basics.', order: 5 },
          { title: 'Security Monitoring & Incident Response', description: 'SIEM, log analysis, response.', order: 6 },
          { title: 'Security Best Practices', description: 'Secure coding, patching, GDPR, HIPAA.', order: 7 }
        ]
      },
      {
        domain: 'Full Stack Development',
        slug: slugify('Full Stack Development'),
        milestones: [
          { title: 'Frontend Basics', description: 'HTML, CSS, JS, responsive design, Bootstrap/Tailwind.', order: 1 },
          { title: 'Advanced Frontend', description: 'ES6, React/Angular/Vue, Redux.', order: 2 },
          { title: 'Backend Basics', description: 'Node.js, Express, REST APIs, SQL/NoSQL.', order: 3 },
          { title: 'Advanced Backend', description: 'JWT, OAuth, sockets, microservices.', order: 4 },
          { title: 'Databases', description: 'MongoDB, PostgreSQL, schema design.', order: 5 },
          { title: 'DevOps & Deployment', description: 'Git, CI/CD, Docker, AWS.', order: 6 }
        ]
      },
      {
        domain: 'Blockchain',
        slug: slugify('Blockchain'),
        milestones: [
          { title: 'Blockchain Basics', description: 'What is blockchain, cryptography, ledgers.', order: 1 },
          { title: 'Bitcoin and Ethereum Fundamentals', description: 'Consensus, wallets, smart contracts.', order: 2 },
          { title: 'Smart Contract Development', description: 'Solidity, Remix, Truffle.', order: 3 },
          { title: 'Decentralized Applications (dApps)', description: 'Web3.js, blockchain frontend.', order: 4 },
          { title: 'Advanced Blockchain Concepts', description: 'Layer 2, scaling, security.', order: 5 }
        ]
      },
      {
        domain: 'Cloud Computing',
        slug: slugify('Cloud Computing'),
        milestones: [
          { title: 'Cloud Basics', description: 'IaaS, PaaS, SaaS; cloud models.', order: 1 },
          { title: 'Cloud Providers', description: 'AWS, Azure, GCP basics.', order: 2 },
          { title: 'Core Cloud Services', description: 'Compute, storage, networking.', order: 3 },
          { title: 'Cloud Security', description: 'IAM, encryption, compliance.', order: 4 },
          { title: 'Infrastructure as Code & Automation', description: 'Terraform, CI/CD.', order: 5 },
          { title: 'Containers and Orchestration', description: 'Docker, Kubernetes.', order: 6 }
        ]
      },
      {
        domain: 'Data Analyst',
        slug: slugify('Data Analyst'),
        milestones: [
          { title: 'Data Basics', description: 'Data types, cleaning, sources.', order: 1 },
          { title: 'Excel and SQL', description: 'Pivot tables, queries.', order: 2 },
          { title: 'Data Visualization', description: 'Tableau, Power BI, matplotlib.', order: 3 },
          { title: 'Statistics & Probability', description: 'Descriptive/inferential stats.', order: 4 },
          { title: 'Advanced Data Analysis', description: 'EDA, Python (Pandas, NumPy).', order: 5 },
          { title: 'Reporting & Communication', description: 'Reports, stakeholder communication.', order: 6 }
        ]
      }
    ];

    await Roadmap.insertMany(roadmaps);
    console.log('Roadmaps seeded successfully');
    mongoose.disconnect();
  } catch (error) {
    console.error('Seeding error:', error);
    mongoose.disconnect();
    process.exit(1);
  }
};

seedRoadmaps();
