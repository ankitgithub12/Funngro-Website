import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, '..', 'data');
const DATA_FILE = path.join(DATA_DIR, 'db_fallback.json');

// Helper to ensure data folder and file exist
const ensureFileExists = () => {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (!fs.existsSync(DATA_FILE)) {
    const defaultData = {
      users: [],
      gigs: [
        {
          _id: "gig_mock_1",
          title: "Design Instagram Reels Cover Templates",
          company: "Gizmo Tech Solutions",
          description: "Create a set of 10 modern, vibrant cover templates for our tech reels. The style should be futuristic, sleek, and follow our brand guideline document.",
          budget: 1500,
          category: "Design",
          skills: ["Photoshop", "Canva", "Graphic Design"],
          duration: "5 days",
          createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          _id: "gig_mock_2",
          title: "Write Blog Articles on Gen-Z Money Management",
          company: "PennyWise Finance",
          description: "We are looking for a teen writer to create 3 engaging, easy-to-understand blog posts (800 words each) on basic budgeting, savings, and why compound interest is a superpower.",
          budget: 2000,
          category: "Writing",
          skills: ["Content Writing", "SEO", "Research"],
          duration: "7 days",
          createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          _id: "gig_mock_3",
          title: "Build Responsive React Portfolio Page",
          company: "Alpha Digital Agency",
          description: "Develop a neat, dark-themed responsive portfolio site using React and Tailwind CSS based on our Figma layout designs. Clean, component-based code is required.",
          budget: 4500,
          category: "Tech",
          skills: ["React", "Tailwind CSS", "HTML/CSS"],
          duration: "10 days",
          createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          _id: "gig_mock_4",
          title: "Edit Short Brand Promotional Video",
          company: "EcoSphere Apparel",
          description: "Edit a 30-60 second brand video using raw clips. Add background music, sound effects, subtitles, and engaging transitions suitable for Instagram and TikTok.",
          budget: 1800,
          category: "Video",
          skills: ["Premiere Pro", "CapCut", "Video Editing"],
          duration: "4 days",
          createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString()
        },
        {
          _id: "gig_mock_5",
          title: "Promote App Launch on Student Networks",
          company: "CampusHub",
          description: "Share the launch post of our student app across your school/college WhatsApp groups, social handles, and invite at least 15 fellow students to sign up.",
          budget: 1000,
          category: "Marketing",
          skills: ["Social Media", "Communication", "Marketing"],
          duration: "3 days",
          createdAt: new Date().toISOString()
        }
      ],
      applications: [
        {
          _id: "app_mock_1",
          gigId: "gig_mock_1",
          gigTitle: "Design Instagram Reels Cover Templates",
          teenName: "Kabir Mehta",
          teenEmail: "kabir.mehta@example.com",
          age: 16,
          skills: "Canva, Illustrator, Color Theory",
          portfolioLink: "https://behance.net/kabir-designs",
          pitch: "I've been designing social graphics for school clubs for 2 years. I love Gizmo Tech's products and can deliver modern layouts that boost CTR!",
          status: "pending",
          createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          _id: "app_mock_2",
          gigId: "gig_mock_2",
          gigTitle: "Write Blog Articles on Gen-Z Money Management",
          teenName: "Ananya Sen",
          teenEmail: "ananya.sen@example.com",
          age: 17,
          skills: "Creative Writing, Budgeting, SEO",
          portfolioLink: "https://medium.com/@ananya-writes",
          pitch: "I manage my own finance blog on Medium. I can write extremely relatable finance advice tailored specifically to teenagers because I am one!",
          status: "approved",
          createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString()
        }
      ]
    };
    fs.writeFileSync(DATA_FILE, JSON.stringify(defaultData, null, 2), 'utf-8');
  }
};

const readData = () => {
  ensureFileExists();
  const rawData = fs.readFileSync(DATA_FILE, 'utf-8');
  const data = JSON.parse(rawData);
  if (!data.users) data.users = [];
  return data;
};

const writeData = (data) => {
  ensureFileExists();
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
};

export const fallbackDb = {
  getUsers: () => {
    return readData().users;
  },

  createUser: (userData) => {
    const data = readData();
    const newUser = {
      _id: `user_fallback_${Date.now()}`,
      ...userData,
      createdAt: new Date().toISOString()
    };
    data.users.push(newUser);
    writeData(data);
    return newUser;
  },

  findUserByEmail: (email) => {
    const data = readData();
    return data.users.find(u => u.email.toLowerCase() === email.toLowerCase()) || null;
  },

  findUserById: (id) => {
    const data = readData();
    return data.users.find(u => u._id === id) || null;
  },

  getGigs: () => {
    return readData().gigs;
  },

  createGig: (gigData) => {
    const data = readData();
    const newGig = {
      _id: `gig_fallback_${Date.now()}`,
      ...gigData,
      createdAt: new Date().toISOString()
    };
    data.gigs.unshift(newGig); // Add to beginning
    writeData(data);
    return newGig;
  },

  getApplications: () => {
    return readData().applications;
  },

  createApplication: (appData) => {
    const data = readData();
    const newApp = {
      _id: `app_fallback_${Date.now()}`,
      ...appData,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    data.applications.unshift(newApp);
    writeData(data);
    return newApp;
  },

  updateApplicationStatus: (id, status) => {
    const data = readData();
    const appIndex = data.applications.findIndex(app => app._id === id);
    if (appIndex !== -1) {
      data.applications[appIndex].status = status;
      writeData(data);
      return data.applications[appIndex];
    }
    return null;
  }
};
