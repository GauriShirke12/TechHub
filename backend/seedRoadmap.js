const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Roadmap = require('./models/Roadmap');

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const seedRoadmaps = async () => {
  try {
    await Roadmap.deleteMany({}); 

    const roadmaps = [
      {
        domain: "MERN Stack",
  milestones: [
    {
      title: "Learn HTML, CSS, JS",
      description: "Basics of web development",
      order: 1,
      quizzes: ["html-basics", "css-fundamentals"],
      projects: ["build a portfolio"]
    },
    {
      title: "Master React",
      description: "Component-based UI library",
      order: 2,
      quizzes: ["react-hooks", "react-routing"],
      projects: ["build a todo app"]
    },
    {
      title: "Understand Node.js and Express",
      description: "Server-side development",
      order: 3,
      quizzes: ["node-basics", "express-routing"],
      projects: ["build a REST API"]
    },
    {
      title: "Learn MongoDB",
      description: "NoSQL database basics",
      order: 4,
      quizzes: ["mongodb-basics", "mongoose"],
      projects: ["build a CRUD app"]
    },
    {
      title: "Version Control with Git and GitHub",
      description: "Source code management",
      order: 5,
      quizzes: ["git-basics", "github-workflow"],
      projects: []
    },
    {
      title: "Explore Additional Tools & Frameworks",
      description: "Bootstrap, security basics, deployment",
      order: 6,
      quizzes: ["bootstrap", "security-fundamentals"],
      projects: ["deploy your app"]
    }
  ]
      },
      {
        domain: 'AI/ML',
        milestones: [
          {
            title: 'Step 1: Learn Python',
            description: 'Understand Python syntax, data structures, and libraries like Numpy and Pandas.',
            order: 1,
            quizzes: ['python-basics'],
            projects: ['Data wrangling with Pandas']
          },
          {
            title: 'Step 2: Math for ML',
            description: 'Linear algebra, statistics, probability, calculus.',
            order: 2,
            quizzes: ['math-linear-algebra'],
            projects: []
          },
          {
            title: 'Step 3: Data Preprocessing',
            description: 'Cleaning, handling missing data, feature scaling and encoding.',
            order: 3,
            quizzes: ['data-cleaning'],
            projects: ['Clean dataset using Sklearn']
          },
          {
            title: 'Step 4: Machine Learning',
            description: 'Supervised and Unsupervised algorithms, sklearn, model evaluation.',
            order: 4,
            quizzes: ['ml-supervised', 'ml-unsupervised'],
            projects: ['Build a spam classifier']
          },
          {
            title: 'Step 5: Deep Learning',
            description: 'Neural networks, TensorFlow, Keras, CNNs, RNNs.',
            order: 5,
            quizzes: ['neural-networks'],
            projects: ['Digit recognition with MNIST']
          },
          {
            title: 'Step 6: Deployment & Tools',
            description: 'Streamlit, Flask, Docker, model serving basics.',
            order: 6,
            quizzes: [],
            projects: ['Deploy ML model with Streamlit']
          }
        ]
      },
      {
        domain: 'Data Science',
        milestones: [
          {
            title: 'Step 1: Learn Python & Data Analysis',
            description: 'Python, Numpy, Pandas, Matplotlib, Seaborn for EDA.',
            order: 1,
            quizzes: ['data-analysis'],
            projects: ['Explore COVID dataset']
          },
          {
            title: 'Step 2: Statistics & Probability',
            description: 'Distributions, Hypothesis Testing, Confidence Intervals.',
            order: 2,
            quizzes: ['stats-hypothesis'],
            projects: ['Analyze A/B test']
          },
          {
            title: 'Step 3: Data Wrangling & Cleaning',
            description: 'Handling nulls, merging datasets, feature engineering.',
            order: 3,
            quizzes: [],
            projects: ['Clean Kaggle dataset']
          },
          {
            title: 'Step 4: Visualization & Storytelling',
            description: 'DataViz tools, dashboards, communication.',
            order: 4,
            quizzes: ['data-visualization'],
            projects: ['Build a dashboard with Plotly']
          },
          {
            title: 'Step 5: Machine Learning & Modeling',
            description: 'Regression, classification, clustering with real-world data.',
            order: 5,
            quizzes: ['ml-modeling'],
            projects: ['Predict housing prices']
          },
          {
            title: 'Step 6: Capstone Project',
            description: 'End-to-end Data Science project from data to deployment.',
            order: 6,
            quizzes: [],
            projects: ['Data Science capstone']
          }
        ]
      }
    ];

    await Roadmap.insertMany(roadmaps);
    console.log('Roadmaps seeded successfully');
    process.exit();
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedRoadmaps();
