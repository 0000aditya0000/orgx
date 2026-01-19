// Mock API Service for Dashboard Components
// This service provides mock data based on year and quarter filters

// Mock data for different years and quarters
const mockData = {
  // Project Wise Allocation Data
  projectWiseAllocation: {
    2024: {
      Q1: [
        { name: "Alpha", darkBlue: 45, lightBlue: 5, total: 50 },
        { name: "Beta", darkBlue: 70, lightBlue: 5, total: 75 },
        { name: "Gamma", darkBlue: 60, lightBlue: 5, total: 65 },
        { name: "Delta", darkBlue: 80, lightBlue: 10, total: 90 },
        { name: "Epsilon", darkBlue: 25, lightBlue: 3, total: 28 },
        { name: "Zeta", darkBlue: 50, lightBlue: 7, total: 57 },
        { name: "Eta", darkBlue: 35, lightBlue: 2, total: 37 },
        { name: "Theta", darkBlue: 65, lightBlue: 10, total: 75 },
        { name: "Iota", darkBlue: 30, lightBlue: 3, total: 33 },
        { name: "Kappa", darkBlue: 55, lightBlue: 8, total: 63 }
      ],
      Q2: [
        { name: "Alpha", darkBlue: 30, lightBlue: 8, total: 38 },
        { name: "Beta", darkBlue: 60, lightBlue: 12, total: 72 },
        { name: "Gamma", darkBlue: 35, lightBlue: 15, total: 50 },
        { name: "Delta", darkBlue: 50, lightBlue: 20, total: 70 },
        { name: "Epsilon", darkBlue: 15, lightBlue: 5, total: 20 },
        { name: "Zeta", darkBlue: 25, lightBlue: 10, total: 35 },
        { name: "Eta", darkBlue: 18, lightBlue: 7, total: 25 },
        { name: "Theta", darkBlue: 40, lightBlue: 15, total: 55 },
        { name: "Iota", darkBlue: 12, lightBlue: 8, total: 20 },
        { name: "Kappa", darkBlue: 30, lightBlue: 12, total: 42 }
      ],
      Q3: [
        { name: "Alpha", darkBlue: 28, lightBlue: 12, total: 40 },
        { name: "Beta", darkBlue: 58, lightBlue: 14, total: 72 },
        { name: "Gamma", darkBlue: 42, lightBlue: 8, total: 50 },
        { name: "Delta", darkBlue: 48, lightBlue: 22, total: 70 },
        { name: "Epsilon", darkBlue: 12, lightBlue: 6, total: 18 },
        { name: "Zeta", darkBlue: 32, lightBlue: 8, total: 40 },
        { name: "Eta", darkBlue: 22, lightBlue: 3, total: 25 },
        { name: "Theta", darkBlue: 38, lightBlue: 17, total: 55 },
        { name: "Iota", darkBlue: 14, lightBlue: 6, total: 20 },
        { name: "Kappa", darkBlue: 28, lightBlue: 14, total: 42 }
      ],
      Q4: [
        { name: "Alpha", darkBlue: 32, lightBlue: 6, total: 38 },
        { name: "Beta", darkBlue: 62, lightBlue: 10, total: 72 },
        { name: "Gamma", darkBlue: 38, lightBlue: 12, total: 50 },
        { name: "Delta", darkBlue: 52, lightBlue: 18, total: 70 },
        { name: "Epsilon", darkBlue: 14, lightBlue: 4, total: 18 },
        { name: "Zeta", darkBlue: 28, lightBlue: 12, total: 40 },
        { name: "Eta", darkBlue: 20, lightBlue: 5, total: 25 },
        { name: "Theta", darkBlue: 42, lightBlue: 13, total: 55 },
        { name: "Iota", darkBlue: 16, lightBlue: 4, total: 20 },
        { name: "Kappa", darkBlue: 30, lightBlue: 12, total: 42 }
      ]
    },
    2023: {
      Q1: [
        { name: "Alpha", darkBlue: 10, lightBlue: 40, total: 50 },
        { name: "Beta", darkBlue: 20, lightBlue: 55, total: 75 },
        { name: "Gamma", darkBlue: 15, lightBlue: 50, total: 65 },
        { name: "Delta", darkBlue: 25, lightBlue: 65, total: 90 },
        { name: "Epsilon", darkBlue: 5, lightBlue: 23, total: 28 },
        { name: "Zeta", darkBlue: 12, lightBlue: 45, total: 57 },
        { name: "Eta", darkBlue: 8, lightBlue: 29, total: 37 },
        { name: "Theta", darkBlue: 18, lightBlue: 57, total: 75 },
        { name: "Iota", darkBlue: 6, lightBlue: 27, total: 33 },
        { name: "Kappa", darkBlue: 14, lightBlue: 49, total: 63 }
      ],
      Q2: [
        { name: "Alpha", darkBlue: 22, lightBlue: 13, total: 35 },
        { name: "Beta", darkBlue: 48, lightBlue: 17, total: 65 },
        { name: "Gamma", darkBlue: 32, lightBlue: 18, total: 50 },
        { name: "Delta", darkBlue: 42, lightBlue: 28, total: 70 },
        { name: "Epsilon", darkBlue: 9, lightBlue: 9, total: 18 },
        { name: "Zeta", darkBlue: 27, lightBlue: 15, total: 42 },
        { name: "Eta", darkBlue: 17, lightBlue: 8, total: 25 },
        { name: "Theta", darkBlue: 37, lightBlue: 26, total: 63 },
        { name: "Iota", darkBlue: 11, lightBlue: 11, total: 22 },
        { name: "Kappa", darkBlue: 27, lightBlue: 22, total: 49 }
      ],
      Q3: [
        { name: "Alpha", darkBlue: 24, lightBlue: 11, total: 35 },
        { name: "Beta", darkBlue: 50, lightBlue: 15, total: 65 },
        { name: "Gamma", darkBlue: 34, lightBlue: 16, total: 50 },
        { name: "Delta", darkBlue: 44, lightBlue: 26, total: 70 },
        { name: "Epsilon", darkBlue: 10, lightBlue: 8, total: 18 },
        { name: "Zeta", darkBlue: 29, lightBlue: 13, total: 42 },
        { name: "Eta", darkBlue: 19, lightBlue: 6, total: 25 },
        { name: "Theta", darkBlue: 39, lightBlue: 24, total: 63 },
        { name: "Iota", darkBlue: 12, lightBlue: 10, total: 22 },
        { name: "Kappa", darkBlue: 29, lightBlue: 20, total: 49 }
      ],
      Q4: [
        { name: "Alpha", darkBlue: 26, lightBlue: 9, total: 35 },
        { name: "Beta", darkBlue: 52, lightBlue: 13, total: 65 },
        { name: "Gamma", darkBlue: 36, lightBlue: 14, total: 50 },
        { name: "Delta", darkBlue: 46, lightBlue: 24, total: 70 },
        { name: "Epsilon", darkBlue: 11, lightBlue: 7, total: 18 },
        { name: "Zeta", darkBlue: 31, lightBlue: 11, total: 42 },
        { name: "Eta", darkBlue: 21, lightBlue: 4, total: 25 },
        { name: "Theta", darkBlue: 41, lightBlue: 22, total: 63 },
        { name: "Iota", darkBlue: 13, lightBlue: 9, total: 22 },
        { name: "Kappa", darkBlue: 31, lightBlue: 18, total: 49 }
      ]
    }
  },

  // Total vs On-Project Data
  totalVsOnProject: {
    2024: {
      Q1: [
        { skill: "Alpha", percentage: 90, onProject: 45, total: 50, color: "#f97316" },
        { skill: "Beta", percentage: 93, onProject: 70, total: 75, color: "#3b82f6" },
        { skill: "Gamma", percentage: 92, onProject: 60, total: 65, color: "#10b981" },
        { skill: "Delta", percentage: 89, onProject: 80, total: 90, color: "#8b5cf6" },
        { skill: "Epsilon", percentage: 89, onProject: 25, total: 28, color: "#ef4444" },
        { skill: "Zeta", percentage: 88, onProject: 50, total: 57, color: "#f59e0b" },
        { skill: "Eta", percentage: 95, onProject: 35, total: 37, color: "#06b6d4" },
        { skill: "Theta", percentage: 87, onProject: 65, total: 75, color: "#84cc16" },
        { skill: "Iota", percentage: 91, onProject: 30, total: 33, color: "#ec4899" },
        { skill: "Kappa", percentage: 87, onProject: 55, total: 63, color: "#6366f1" }
      ],
      Q2: [
        { skill: "Alpha", percentage: 79, onProject: 30, total: 38, color: "#f97316" },
        { skill: "Beta", percentage: 83, onProject: 60, total: 72, color: "#3b82f6" },
        { skill: "Gamma", percentage: 70, onProject: 35, total: 50, color: "#10b981" },
        { skill: "Delta", percentage: 71, onProject: 50, total: 70, color: "#8b5cf6" },
        { skill: "Epsilon", percentage: 75, onProject: 15, total: 20, color: "#ef4444" },
        { skill: "Zeta", percentage: 71, onProject: 25, total: 35, color: "#f59e0b" },
        { skill: "Eta", percentage: 72, onProject: 18, total: 25, color: "#06b6d4" },
        { skill: "Theta", percentage: 73, onProject: 40, total: 55, color: "#84cc16" },
        { skill: "Iota", percentage: 60, onProject: 12, total: 20, color: "#ec4899" },
        { skill: "Kappa", percentage: 71, onProject: 30, total: 42, color: "#6366f1" }
      ],
      Q3: [
        { skill: "Alpha", percentage: 70, onProject: 28, total: 40, color: "#f97316" },
        { skill: "Beta", percentage: 81, onProject: 58, total: 72, color: "#3b82f6" },
        { skill: "Gamma", percentage: 84, onProject: 42, total: 50, color: "#10b981" },
        { skill: "Delta", percentage: 69, onProject: 48, total: 70, color: "#8b5cf6" },
        { skill: "Epsilon", percentage: 67, onProject: 12, total: 18, color: "#ef4444" },
        { skill: "Zeta", percentage: 80, onProject: 32, total: 40, color: "#f59e0b" },
        { skill: "Eta", percentage: 88, onProject: 22, total: 25, color: "#06b6d4" },
        { skill: "Theta", percentage: 69, onProject: 38, total: 55, color: "#84cc16" },
        { skill: "Iota", percentage: 70, onProject: 14, total: 20, color: "#ec4899" },
        { skill: "Kappa", percentage: 67, onProject: 28, total: 42, color: "#6366f1" }
      ],
      Q4: [
        { skill: "Alpha", percentage: 84, onProject: 32, total: 38, color: "#f97316" },
        { skill: "Beta", percentage: 86, onProject: 62, total: 72, color: "#3b82f6" },
        { skill: "Gamma", percentage: 76, onProject: 38, total: 50, color: "#10b981" },
        { skill: "Delta", percentage: 74, onProject: 52, total: 70, color: "#8b5cf6" },
        { skill: "Epsilon", percentage: 78, onProject: 14, total: 18, color: "#ef4444" },
        { skill: "Zeta", percentage: 70, onProject: 28, total: 40, color: "#f59e0b" },
        { skill: "Eta", percentage: 80, onProject: 20, total: 25, color: "#06b6d4" },
        { skill: "Theta", percentage: 76, onProject: 42, total: 55, color: "#84cc16" },
        { skill: "Iota", percentage: 80, onProject: 16, total: 20, color: "#ec4899" },
        { skill: "Kappa", percentage: 71, onProject: 30, total: 42, color: "#6366f1" }
      ]
    },
    2023: {
      Q1: [
        { skill: "Alpha", percentage: 20, onProject: 10, total: 50, color: "#f97316" },
        { skill: "Beta", percentage: 27, onProject: 20, total: 75, color: "#3b82f6" },
        { skill: "Gamma", percentage: 23, onProject: 15, total: 65, color: "#10b981" },
        { skill: "Delta", percentage: 28, onProject: 25, total: 90, color: "#8b5cf6" },
        { skill: "Epsilon", percentage: 18, onProject: 5, total: 28, color: "#ef4444" },
        { skill: "Zeta", percentage: 21, onProject: 12, total: 57, color: "#f59e0b" },
        { skill: "Eta", percentage: 22, onProject: 8, total: 37, color: "#06b6d4" },
        { skill: "Theta", percentage: 24, onProject: 18, total: 75, color: "#84cc16" },
        { skill: "Iota", percentage: 18, onProject: 6, total: 33, color: "#ec4899" },
        { skill: "Kappa", percentage: 22, onProject: 14, total: 63, color: "#6366f1" }
      ],
      Q2: [
        { skill: "Alpha", percentage: 63, onProject: 22, total: 35, color: "#f97316" },
        { skill: "Beta", percentage: 74, onProject: 48, total: 65, color: "#3b82f6" },
        { skill: "Gamma", percentage: 64, onProject: 32, total: 50, color: "#10b981" },
        { skill: "Delta", percentage: 60, onProject: 42, total: 70, color: "#8b5cf6" },
        { skill: "Epsilon", percentage: 50, onProject: 9, total: 18, color: "#ef4444" },
        { skill: "Zeta", percentage: 64, onProject: 27, total: 42, color: "#f59e0b" },
        { skill: "Eta", percentage: 68, onProject: 17, total: 25, color: "#06b6d4" },
        { skill: "Theta", percentage: 59, onProject: 37, total: 63, color: "#84cc16" },
        { skill: "Iota", percentage: 50, onProject: 11, total: 22, color: "#ec4899" },
        { skill: "Kappa", percentage: 55, onProject: 27, total: 49, color: "#6366f1" }
      ],
      Q3: [
        { skill: "Alpha", percentage: 69, onProject: 24, total: 35, color: "#f97316" },
        { skill: "Beta", percentage: 77, onProject: 50, total: 65, color: "#3b82f6" },
        { skill: "Gamma", percentage: 68, onProject: 34, total: 50, color: "#10b981" },
        { skill: "Delta", percentage: 63, onProject: 44, total: 70, color: "#8b5cf6" },
        { skill: "Epsilon", percentage: 56, onProject: 10, total: 18, color: "#ef4444" },
        { skill: "Zeta", percentage: 69, onProject: 29, total: 42, color: "#f59e0b" },
        { skill: "Eta", percentage: 76, onProject: 19, total: 25, color: "#06b6d4" },
        { skill: "Theta", percentage: 62, onProject: 39, total: 63, color: "#84cc16" },
        { skill: "Iota", percentage: 55, onProject: 12, total: 22, color: "#ec4899" },
        { skill: "Kappa", percentage: 59, onProject: 29, total: 49, color: "#6366f1" }
      ],
      Q4: [
        { skill: "Alpha", percentage: 74, onProject: 26, total: 35, color: "#f97316" },
        { skill: "Beta", percentage: 80, onProject: 52, total: 65, color: "#3b82f6" },
        { skill: "Gamma", percentage: 72, onProject: 36, total: 50, color: "#10b981" },
        { skill: "Delta", percentage: 66, onProject: 46, total: 70, color: "#8b5cf6" },
        { skill: "Epsilon", percentage: 61, onProject: 11, total: 18, color: "#ef4444" },
        { skill: "Zeta", percentage: 74, onProject: 31, total: 42, color: "#f59e0b" },
        { skill: "Eta", percentage: 84, onProject: 21, total: 25, color: "#06b6d4" },
        { skill: "Theta", percentage: 65, onProject: 41, total: 63, color: "#84cc16" },
        { skill: "Iota", percentage: 59, onProject: 13, total: 22, color: "#ec4899" },
        { skill: "Kappa", percentage: 63, onProject: 31, total: 49, color: "#6366f1" }
      ]
    }
  },

  // Employees Working Data
  employeesWorking: {
    2024: {
      Q1: { working: 92, onLeave: 8, total: 100 },
      Q2: { working: 88, onLeave: 12, total: 100 },
      Q3: { working: 85, onLeave: 15, total: 100 },
      Q4: { working: 95, onLeave: 5, total: 100 }
    },
    2023: {
      Q1: { working: 65, onLeave: 35, total: 100 },
      Q2: { working: 70, onLeave: 30, total: 100 },
      Q3: { working: 75, onLeave: 25, total: 100 },
      Q4: { working: 80, onLeave: 20, total: 100 }
    }
  },

  // Skill Distribution Data
  skillDistribution: {
    2024: {
      Q1: [
        { skill: "React", count: 65, color: "#61dafb" },
        { skill: "Angular", count: 25, color: "#dd0031" },
        { skill: "Vue", count: 15, color: "#4fc08d" },
        { skill: "Node.js", count: 55, color: "#68a063" },
        { skill: "Python", count: 45, color: "#3776ab" },
        { skill: "Java", count: 20, color: "#f89820" }
      ],
      Q2: [
        { skill: "React", count: 70, color: "#61dafb" },
        { skill: "Angular", count: 20, color: "#dd0031" },
        { skill: "Vue", count: 18, color: "#4fc08d" },
        { skill: "Node.js", count: 60, color: "#68a063" },
        { skill: "Python", count: 50, color: "#3776ab" },
        { skill: "Java", count: 25, color: "#f89820" }
      ],
      Q3: [
        { skill: "React", count: 75, color: "#61dafb" },
        { skill: "Angular", count: 15, color: "#dd0031" },
        { skill: "Vue", count: 20, color: "#4fc08d" },
        { skill: "Node.js", count: 65, color: "#68a063" },
        { skill: "Python", count: 55, color: "#3776ab" },
        { skill: "Java", count: 30, color: "#f89820" }
      ],
      Q4: [
        { skill: "React", count: 80, color: "#61dafb" },
        { skill: "Angular", count: 10, color: "#dd0031" },
        { skill: "Vue", count: 25, color: "#4fc08d" },
        { skill: "Node.js", count: 70, color: "#68a063" },
        { skill: "Python", count: 60, color: "#3776ab" },
        { skill: "Java", count: 35, color: "#f89820" }
      ]
    },
    2023: {
      Q1: [
        { skill: "React", count: 25, color: "#61dafb" },
        { skill: "Angular", count: 45, color: "#dd0031" },
        { skill: "Vue", count: 10, color: "#4fc08d" },
        { skill: "Node.js", count: 20, color: "#68a063" },
        { skill: "Python", count: 15, color: "#3776ab" },
        { skill: "Java", count: 50, color: "#f89820" }
      ],
      Q2: [
        { skill: "React", count: 30, color: "#61dafb" },
        { skill: "Angular", count: 50, color: "#dd0031" },
        { skill: "Vue", count: 12, color: "#4fc08d" },
        { skill: "Node.js", count: 25, color: "#68a063" },
        { skill: "Python", count: 18, color: "#3776ab" },
        { skill: "Java", count: 55, color: "#f89820" }
      ],
      Q3: [
        { skill: "React", count: 35, color: "#61dafb" },
        { skill: "Angular", count: 55, color: "#dd0031" },
        { skill: "Vue", count: 15, color: "#4fc08d" },
        { skill: "Node.js", count: 30, color: "#68a063" },
        { skill: "Python", count: 22, color: "#3776ab" },
        { skill: "Java", count: 60, color: "#f89820" }
      ],
      Q4: [
        { skill: "React", count: 40, color: "#61dafb" },
        { skill: "Angular", count: 60, color: "#dd0031" },
        { skill: "Vue", count: 18, color: "#4fc08d" },
        { skill: "Node.js", count: 35, color: "#68a063" },
        { skill: "Python", count: 25, color: "#3776ab" },
        { skill: "Java", count: 65, color: "#f89820" }
      ]
    }
  },

  // Skill Trends Data
  skillTrends: {
    2024: {
      Q1: [
        { month: "Jan", React: 40, Angular: 35, Vue: 20, Node: 38, Python: 30, Java: 25 },
        { month: "Feb", React: 42, Angular: 36, Vue: 22, Node: 40, Python: 32, Java: 27 },
        { month: "Mar", React: 45, Angular: 38, Vue: 25, Node: 42, Python: 35, Java: 28 }
      ],
      Q2: [
        { month: "Apr", React: 46, Angular: 37, Vue: 26, Node: 43, Python: 36, Java: 29 },
        { month: "May", React: 48, Angular: 35, Vue: 28, Node: 45, Python: 38, Java: 32 },
        { month: "Jun", React: 50, Angular: 35, Vue: 30, Node: 45, Python: 38, Java: 32 }
      ],
      Q3: [
        { month: "Jul", React: 48, Angular: 38, Vue: 28, Node: 43, Python: 36, Java: 30 },
        { month: "Aug", React: 46, Angular: 40, Vue: 30, Node: 41, Python: 38, Java: 32 },
        { month: "Sep", React: 44, Angular: 40, Vue: 30, Node: 40, Python: 40, Java: 35 }
      ],
      Q4: [
        { month: "Oct", React: 46, Angular: 42, Vue: 30, Node: 42, Python: 40, Java: 36 },
        { month: "Nov", React: 48, Angular: 42, Vue: 32, Node: 40, Python: 42, Java: 38 },
        { month: "Dec", React: 50, Angular: 42, Vue: 32, Node: 40, Python: 42, Java: 38 }
      ]
    },
    2023: {
      Q1: [
        { month: "Jan", React: 30, Angular: 25, Vue: 15, Node: 28, Python: 22, Java: 20 },
        { month: "Feb", React: 32, Angular: 27, Vue: 17, Node: 30, Python: 24, Java: 22 },
        { month: "Mar", React: 35, Angular: 30, Vue: 20, Node: 32, Python: 28, Java: 25 }
      ],
      Q2: [
        { month: "Apr", React: 36, Angular: 31, Vue: 21, Node: 33, Python: 29, Java: 26 },
        { month: "May", React: 38, Angular: 32, Vue: 22, Node: 35, Python: 30, Java: 27 },
        { month: "Jun", React: 40, Angular: 32, Vue: 25, Node: 35, Python: 30, Java: 28 }
      ],
      Q3: [
        { month: "Jul", React: 38, Angular: 33, Vue: 23, Node: 33, Python: 28, Java: 25 },
        { month: "Aug", React: 36, Angular: 35, Vue: 25, Node: 31, Python: 30, Java: 27 },
        { month: "Sep", React: 34, Angular: 35, Vue: 25, Node: 30, Python: 32, Java: 30 }
      ],
      Q4: [
        { month: "Oct", React: 36, Angular: 37, Vue: 25, Node: 32, Python: 32, Java: 31 },
        { month: "Nov", React: 38, Angular: 37, Vue: 27, Node: 30, Python: 34, Java: 33 },
        { month: "Dec", React: 40, Angular: 37, Vue: 28, Node: 30, Python: 35, Java: 32 }
      ]
    }
  },

  // Employees Skills Listing Data
  employeesSkillsListing: {
    2024: {
      Q1: {
        React: [
          { name: "John Doe", avatar: "JD", role: "Senior Developer" },
          { name: "Jane Smith", avatar: "JS", role: "Lead Developer" },
          { name: "Mike Johnson", avatar: "MJ", role: "Developer" },
          { name: "Sarah Wilson", avatar: "SW", role: "Senior Developer" },
          { name: "David Brown", avatar: "DB", role: "Developer" }
        ],
        Angular: [
          { name: "Alex Chen", avatar: "AC", role: "Senior Developer" },
          { name: "Lisa Garcia", avatar: "LG", role: "Lead Developer" },
          { name: "Tom Anderson", avatar: "TA", role: "Developer" },
          { name: "Emma Davis", avatar: "ED", role: "Senior Developer" }
        ],
        Vue: [
          { name: "Chris Lee", avatar: "CL", role: "Developer" },
          { name: "Anna Taylor", avatar: "AT", role: "Senior Developer" },
          { name: "Ryan Miller", avatar: "RM", role: "Developer" }
        ],
        Svelte: [
          { name: "Kevin White", avatar: "KW", role: "Developer" },
          { name: "Maria Rodriguez", avatar: "MR", role: "Senior Developer" }
        ]
      },
      Q2: {
        React: [
          { name: "John Doe", avatar: "JD", role: "Senior Developer" },
          { name: "Jane Smith", avatar: "JS", role: "Lead Developer" },
          { name: "Mike Johnson", avatar: "MJ", role: "Developer" },
          { name: "Sarah Wilson", avatar: "SW", role: "Senior Developer" },
          { name: "David Brown", avatar: "DB", role: "Developer" },
          { name: "Alex Chen", avatar: "AC", role: "Senior Developer" }
        ],
        Angular: [
          { name: "Lisa Garcia", avatar: "LG", role: "Lead Developer" },
          { name: "Tom Anderson", avatar: "TA", role: "Developer" },
          { name: "Emma Davis", avatar: "ED", role: "Senior Developer" },
          { name: "Chris Lee", avatar: "CL", role: "Developer" }
        ],
        Vue: [
          { name: "Anna Taylor", avatar: "AT", role: "Senior Developer" },
          { name: "Ryan Miller", avatar: "RM", role: "Developer" },
          { name: "Kevin White", avatar: "KW", role: "Developer" }
        ],
        Svelte: [
          { name: "Maria Rodriguez", avatar: "MR", role: "Senior Developer" },
          { name: "James Wilson", avatar: "JW", role: "Developer" }
        ]
      },
      Q3: {
        React: [
          { name: "John Doe", avatar: "JD", role: "Senior Developer" },
          { name: "Jane Smith", avatar: "JS", role: "Lead Developer" },
          { name: "Mike Johnson", avatar: "MJ", role: "Developer" },
          { name: "Sarah Wilson", avatar: "SW", role: "Senior Developer" }
        ],
        Angular: [
          { name: "David Brown", avatar: "DB", role: "Developer" },
          { name: "Alex Chen", avatar: "AC", role: "Senior Developer" },
          { name: "Lisa Garcia", avatar: "LG", role: "Lead Developer" },
          { name: "Tom Anderson", avatar: "TA", role: "Developer" },
          { name: "Emma Davis", avatar: "ED", role: "Senior Developer" }
        ],
        Vue: [
          { name: "Chris Lee", avatar: "CL", role: "Developer" },
          { name: "Anna Taylor", avatar: "AT", role: "Senior Developer" },
          { name: "Ryan Miller", avatar: "RM", role: "Developer" },
          { name: "Kevin White", avatar: "KW", role: "Developer" }
        ],
        Svelte: [
          { name: "Maria Rodriguez", avatar: "MR", role: "Senior Developer" },
          { name: "James Wilson", avatar: "JW", role: "Developer" },
          { name: "Sophie Brown", avatar: "SB", role: "Developer" }
        ]
      },
      Q4: {
        React: [
          { name: "John Doe", avatar: "JD", role: "Senior Developer" },
          { name: "Jane Smith", avatar: "JS", role: "Lead Developer" },
          { name: "Mike Johnson", avatar: "MJ", role: "Developer" },
          { name: "Sarah Wilson", avatar: "SW", role: "Senior Developer" },
          { name: "David Brown", avatar: "DB", role: "Developer" },
          { name: "Alex Chen", avatar: "AC", role: "Senior Developer" },
          { name: "Lisa Garcia", avatar: "LG", role: "Lead Developer" }
        ],
        Angular: [
          { name: "Tom Anderson", avatar: "TA", role: "Developer" },
          { name: "Emma Davis", avatar: "ED", role: "Senior Developer" },
          { name: "Chris Lee", avatar: "CL", role: "Developer" },
          { name: "Anna Taylor", avatar: "AT", role: "Senior Developer" }
        ],
        Vue: [
          { name: "Ryan Miller", avatar: "RM", role: "Developer" },
          { name: "Kevin White", avatar: "KW", role: "Developer" },
          { name: "Maria Rodriguez", avatar: "MR", role: "Senior Developer" }
        ],
        Svelte: [
          { name: "James Wilson", avatar: "JW", role: "Developer" },
          { name: "Sophie Brown", avatar: "SB", role: "Developer" },
          { name: "Daniel Kim", avatar: "DK", role: "Senior Developer" }
        ]
      }
    },
    2023: {
      Q1: {
        React: [
          { name: "John Doe", avatar: "JD", role: "Developer" },
          { name: "Jane Smith", avatar: "JS", role: "Senior Developer" },
          { name: "Mike Johnson", avatar: "MJ", role: "Developer" }
        ],
        Angular: [
          { name: "Alex Chen", avatar: "AC", role: "Developer" },
          { name: "Lisa Garcia", avatar: "LG", role: "Senior Developer" }
        ],
        Vue: [
          { name: "Chris Lee", avatar: "CL", role: "Developer" }
        ],
        Svelte: [
          { name: "Kevin White", avatar: "KW", role: "Developer" }
        ]
      },
      Q2: {
        React: [
          { name: "John Doe", avatar: "JD", role: "Developer" },
          { name: "Jane Smith", avatar: "JS", role: "Senior Developer" },
          { name: "Mike Johnson", avatar: "MJ", role: "Developer" },
          { name: "Sarah Wilson", avatar: "SW", role: "Developer" }
        ],
        Angular: [
          { name: "Alex Chen", avatar: "AC", role: "Developer" },
          { name: "Lisa Garcia", avatar: "LG", role: "Senior Developer" },
          { name: "Tom Anderson", avatar: "TA", role: "Developer" }
        ],
        Vue: [
          { name: "Chris Lee", avatar: "CL", role: "Developer" },
          { name: "Anna Taylor", avatar: "AT", role: "Developer" }
        ],
        Svelte: [
          { name: "Kevin White", avatar: "KW", role: "Developer" },
          { name: "Maria Rodriguez", avatar: "MR", role: "Developer" }
        ]
      },
      Q3: {
        React: [
          { name: "John Doe", avatar: "JD", role: "Developer" },
          { name: "Jane Smith", avatar: "JS", role: "Senior Developer" },
          { name: "Mike Johnson", avatar: "MJ", role: "Developer" },
          { name: "Sarah Wilson", avatar: "SW", role: "Developer" },
          { name: "David Brown", avatar: "DB", role: "Developer" }
        ],
        Angular: [
          { name: "Alex Chen", avatar: "AC", role: "Senior Developer" },
          { name: "Lisa Garcia", avatar: "LG", role: "Senior Developer" },
          { name: "Tom Anderson", avatar: "TA", role: "Developer" },
          { name: "Emma Davis", avatar: "ED", role: "Developer" }
        ],
        Vue: [
          { name: "Chris Lee", avatar: "CL", role: "Developer" },
          { name: "Anna Taylor", avatar: "AT", role: "Developer" },
          { name: "Ryan Miller", avatar: "RM", role: "Developer" }
        ],
        Svelte: [
          { name: "Kevin White", avatar: "KW", role: "Developer" },
          { name: "Maria Rodriguez", avatar: "MR", role: "Developer" },
          { name: "James Wilson", avatar: "JW", role: "Developer" }
        ]
      },
      Q4: {
        React: [
          { name: "John Doe", avatar: "JD", role: "Developer" },
          { name: "Jane Smith", avatar: "JS", role: "Senior Developer" },
          { name: "Mike Johnson", avatar: "MJ", role: "Developer" },
          { name: "Sarah Wilson", avatar: "SW", role: "Developer" },
          { name: "David Brown", avatar: "DB", role: "Developer" },
          { name: "Alex Chen", avatar: "AC", role: "Developer" }
        ],
        Angular: [
          { name: "Lisa Garcia", avatar: "LG", role: "Senior Developer" },
          { name: "Tom Anderson", avatar: "TA", role: "Developer" },
          { name: "Emma Davis", avatar: "ED", role: "Developer" },
          { name: "Chris Lee", avatar: "CL", role: "Developer" }
        ],
        Vue: [
          { name: "Anna Taylor", avatar: "AT", role: "Developer" },
          { name: "Ryan Miller", avatar: "RM", role: "Developer" },
          { name: "Kevin White", avatar: "KW", role: "Developer" },
          { name: "Maria Rodriguez", avatar: "MR", role: "Developer" }
        ],
        Svelte: [
          { name: "James Wilson", avatar: "JW", role: "Developer" },
          { name: "Sophie Brown", avatar: "SB", role: "Developer" },
          { name: "Daniel Kim", avatar: "DK", role: "Developer" }
        ]
      }
    }
  },

  // Employees On Leave Data
  employeesOnLeave: {
    2024: {
      Q1: [
        { name: "Alice Johnson", avatar: "AJ", role: "Senior Developer", leaveType: "Sick Leave", days: 3 },
        { name: "Bob Smith", avatar: "BS", role: "Developer", leaveType: "Vacation", days: 5 },
        { name: "Carol Davis", avatar: "CD", role: "Lead Developer", leaveType: "Personal", days: 2 }
      ],
      Q2: [
        { name: "David Wilson", avatar: "DW", role: "Developer", leaveType: "Vacation", days: 7 },
        { name: "Eva Brown", avatar: "EB", role: "Senior Developer", leaveType: "Sick Leave", days: 2 }
      ],
      Q3: [
        { name: "Frank Miller", avatar: "FM", role: "Developer", leaveType: "Vacation", days: 10 },
        { name: "Grace Lee", avatar: "GL", role: "Senior Developer", leaveType: "Personal", days: 3 },
        { name: "Henry Taylor", avatar: "HT", role: "Lead Developer", leaveType: "Sick Leave", days: 4 },
        { name: "Ivy Chen", avatar: "IC", role: "Developer", leaveType: "Vacation", days: 6 }
      ],
      Q4: [
        { name: "Jack Anderson", avatar: "JA", role: "Developer", leaveType: "Vacation", days: 5 },
        { name: "Kate White", avatar: "KW", role: "Senior Developer", leaveType: "Personal", days: 2 }
      ]
    },
    2023: {
      Q1: [
        { name: "Alice Johnson", avatar: "AJ", role: "Developer", leaveType: "Sick Leave", days: 4 },
        { name: "Bob Smith", avatar: "BS", role: "Developer", leaveType: "Vacation", days: 8 },
        { name: "Carol Davis", avatar: "CD", role: "Senior Developer", leaveType: "Personal", days: 3 },
        { name: "David Wilson", avatar: "DW", role: "Developer", leaveType: "Sick Leave", days: 2 }
      ],
      Q2: [
        { name: "Eva Brown", avatar: "EB", role: "Developer", leaveType: "Vacation", days: 6 },
        { name: "Frank Miller", avatar: "FM", role: "Senior Developer", leaveType: "Personal", days: 4 },
        { name: "Grace Lee", avatar: "GL", role: "Developer", leaveType: "Sick Leave", days: 3 }
      ],
      Q3: [
        { name: "Henry Taylor", avatar: "HT", role: "Developer", leaveType: "Vacation", days: 12 },
        { name: "Ivy Chen", avatar: "IC", role: "Senior Developer", leaveType: "Personal", days: 5 },
        { name: "Jack Anderson", avatar: "JA", role: "Developer", leaveType: "Sick Leave", days: 2 }
      ],
      Q4: [
        { name: "Kate White", avatar: "KW", role: "Developer", leaveType: "Vacation", days: 7 },
        { name: "Liam Garcia", avatar: "LG", role: "Senior Developer", leaveType: "Personal", days: 3 },
        { name: "Mia Rodriguez", avatar: "MR", role: "Developer", leaveType: "Sick Leave", days: 4 },
        { name: "Noah Kim", avatar: "NK", role: "Senior Developer", leaveType: "Vacation", days: 9 }
      ]
    }
  }
};

// Mock API Service Functions
export const mockApiService = {
  // Get Project Wise Allocation Data
  getProjectWiseAllocation: (year, quarter) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const data = mockData.projectWiseAllocation[year]?.[quarter] || mockData.projectWiseAllocation[2024].Q1;
        resolve({
          success: true,
          data: data,
          year: year,
          quarter: quarter
        });
      }, 300);
    });
  },

  // Get Total vs On-Project Data
  getTotalVsOnProject: (year, quarter) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const data = mockData.totalVsOnProject[year]?.[quarter] || mockData.totalVsOnProject[2024].Q1;
        resolve({
          success: true,
          data: data,
          year: year,
          quarter: quarter
        });
      }, 300);
    });
  },

  // Get Employees Working Data
  getEmployeesWorking: (year, quarter) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Mock API getEmployeesWorking called with:', year, quarter);
        const data = mockData.employeesWorking[year]?.[quarter] || mockData.employeesWorking[2024].Q1;
        console.log('Mock API getEmployeesWorking returning:', data);
        resolve({
          success: true,
          data: data,
          year: year,
          quarter: quarter
        });
      }, 300);
    });
  },

  // Get Skill Distribution Data
  getSkillDistribution: (year, quarter) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Mock API getSkillDistribution called with:', year, quarter);
        const data = mockData.skillDistribution[year]?.[quarter] || mockData.skillDistribution[2024].Q1;
        console.log('Mock API getSkillDistribution returning:', data);
        resolve({
          success: true,
          data: data,
          year: year,
          quarter: quarter
        });
      }, 300);
    });
  },

  // Get Skill Trends Data
  getSkillTrends: (year, quarter) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const data = mockData.skillTrends[year]?.[quarter] || mockData.skillTrends[2024].Q1;
        resolve({
          success: true,
          data: data,
          year: year,
          quarter: quarter
        });
      }, 300);
    });
  },

  // Get Employees Skills Listing Data
  getEmployeesSkillsListing: (year, quarter) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const data = mockData.employeesSkillsListing[year]?.[quarter] || mockData.employeesSkillsListing[2024].Q1;
        resolve({
          success: true,
          data: data,
          year: year,
          quarter: quarter
        });
      }, 300);
    });
  },

  // Get Employees On Leave Data
  getEmployeesOnLeave: (year, quarter) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const data = mockData.employeesOnLeave[year]?.[quarter] || mockData.employeesOnLeave[2024].Q1;
        resolve({
          success: true,
          data: data,
          year: year,
          quarter: quarter
        });
      }, 300);
    });
  }
};

export default mockApiService;
