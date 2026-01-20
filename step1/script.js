const SYSTEM_ORDER = [
  "Fundamentals",
  "Biochemistry/Genetics",
  "Immunology",
  "Microbiology",
  "Hematology",
  "Cardiovascular",
  "Respiratory",
  "Renal",
  "Gastrointestinal",
  "Reproductive",
  "Endocrine",
  "Neurology",
  "Musculoskeletal/Derm",
  "Psychiatry",
  "Public Health/Ethics"
];

const pathomaData = [
  {
    system: "Fundamentals",
    chapters: [
      {
        id: 1,
        title: "Growth Adaptations, Cell Injury",
        videos: [
          { id: "1.1", title: "Growth Adaptations", duration: 29 },
          { id: "1.2", title: "Cellular Injury", duration: 45 },
          { id: "1.3", title: "Cell Death", duration: 39 },
          { id: "1.4", title: "Free Radical Injury", duration: 22 },
          { id: "1.5", title: "Amyloid", duration: 20 }
        ]
      },
      {
        id: 2,
        title: "Inflammation & Healing",
        videos: [
          { id: "2.1a", title: "Acute Inflammation (Part 1)", duration: 36 },
          { id: "2.1b", title: "Acute Inflammation (Part 2)", duration: 27 },
          { id: "2.1c", title: "Acute Inflammation (Part 3)", duration: 19 },
          { id: "2.2", title: "Chronic Inflammation", duration: 26 },
          { id: "2.3", title: "Primary Immunodeficiency", duration: 17 },
          { id: "2.4a", title: "Autoimmune Disorders (Part 1)", duration: 30 },
          { id: "2.4b", title: "Autoimmune Disorders (Part 2)", duration: 45 },
          { id: "2.5", title: "Wound Healing", duration: 25 }
        ]
      },
      {
        id: 3,
        title: "Neoplasia",
        videos: [
          { id: "3.1", title: "Neoplasia", duration: 38 },
          { id: "3.2a", title: "Carcinogenesis (Part 1)", duration: 21 },
          { id: "3.2b", title: "Carcinogenesis (Part 2)", duration: 29 },
          { id: "3.2c", title: "Carcinogenesis (Part 3)", duration: 20 },
          { id: "3.3", title: "Tumor Progression", duration: 9 },
          { id: "3.4", title: "Clinical Characteristics", duration: 21 }
        ]
      }
    ]
  },
  {
    system: "Hematology",
    chapters: [
      {
        id: 4,
        title: "Hemostasis & Related Disorders",
        videos: [
          { id: "4.1", title: "Primary Hemostasis & Related Disorders", duration: 43 },
          { id: "4.2", title: "Secondary Hemostasis and Related Disorders", duration: 21 },
          { id: "4.3", title: "Other Disorders of Hemostasis", duration: 13 },
          { id: "4.4", title: "Thrombosis", duration: 22 },
          { id: "4.5", title: "Embolism", duration: 12 }
        ]
      },
      {
        id: 5,
        title: "Red Blood Cell Disorders",
        videos: [
          { id: "5.1", title: "Anemia", duration: 7 },
          { id: "5.2a", title: "Microcytic Anemias (Part 1)", duration: 28 },
          { id: "5.2b", title: "Microcytic Anemias (Part 2)", duration: 19 },
          { id: "5.2c", title: "Microcytic Anemias (Part 3)", duration: 19 },
          { id: "5.3", title: "Macrocytic Anemia", duration: 22 },
          { id: "5.4", title: "Normocytic Anemia", duration: 15 },
          { id: "5.5", title: "Normocytic Anemias w/ Extravascular Hemolysis", duration: 26 },
          { id: "5.6", title: "Normocytic Anemias w/ Intravascular Hemolysis", duration: 14 },
          { id: "5.7", title: "Anemia due to Underproduction", duration: 13 }
        ]
      },
      {
        id: 6,
        title: "White Blood Cell Disorders",
        videos: [
          { id: "6.1", title: "Leukopenia & Leukocytosis", duration: 21 },
          { id: "6.2", title: "Acute Leukemia", duration: 19 },
          { id: "6.3", title: "Chronic Leukemia", duration: 11 },
          { id: "6.4", title: "Myeloproliferative Disorders", duration: 22 },
          { id: "6.5", title: "Lymphadenopathy", duration: 11 },
          { id: "6.6", title: "Lymphoma", duration: 10 },
          { id: "6.7", title: "Hodgkin Lymphoma", duration: 10 },
          { id: "6.8", title: "Plasma Cell Disorders (Dyscrasias)", duration: 8 },
          { id: "6.9", title: "Langerhans Cell Histiocytosis", duration: 7 }
        ]
      }
    ]
  },
  {
    system: "Cardiovascular",
    chapters: [
      {
        id: 7,
        title: "Vascular Pathology",
        videos: [
          { id: "7.1", title: "Vasculitis", duration: 27 },
          { id: "7.2", title: "Hypertension", duration: 7 },
          { id: "7.3", title: "Arteriosclerosis", duration: 18 },
          { id: "7.4", title: "Aortic Dissection and Aneurysm", duration: 13 },
          { id: "7.5", title: "Vascular Tumors", duration: 5 }
        ]
      },
      {
        id: 8,
        title: "Cardiac Pathology",
        videos: [
          { id: "8.1", title: "Ischemic Heart Disease", duration: 30 },
          { id: "8.2", title: "Congestive Heart Failure", duration: 6 },
          { id: "8.3", title: "Congenital Defects", duration: 17 },
          { id: "8.4", title: "Valvular Disorders", duration: 25 },
          { id: "8.5", title: "Endocarditis", duration: 7 },
          { id: "8.6", title: "Cardiomyopathy", duration: 4 },
          { id: "8.7", title: "Cardiac Tumors", duration: 4 }
        ]
      }
    ]
  },
  {
    system: "Respiratory",
    chapters: [
      {
        id: 9,
        title: "Respiratory Tract Pathology",
        videos: [
          { id: "9.1", title: "Nasopharynx", duration: 4 },
          { id: "9.2", title: "Larynx", duration: 4 },
          { id: "9.3", title: "Pulmonary Infections", duration: 20 },
          { id: "9.4", title: "COPD", duration: 50 },
          { id: "9.5", title: "Restrictive Diseases", duration: 22 },
          { id: "9.6", title: "Pulmonary Hypertension", duration: 8 },
          { id: "9.7", title: "Respiratory Distress Syndromes", duration: 7 },
          { id: "9.8", title: "Lung Cancer", duration: 18 },
          { id: "9.9", title: "Pleura", duration: 3 }
        ]
      }
    ]
  },
  {
    system: "Renal",
    chapters: [
      {
        id: 12,
        title: "Kidney & Urinary Tract Pathology",
        videos: [
          { id: "12.1", title: "Congenital", duration: 12 },
          { id: "12.2", title: "Acute Renal Failure", duration: 15 },
          { id: "12.3", title: "Nephrotic Syndrome", duration: 27 },
          { id: "12.4", title: "Nephritic Syndrome", duration: 12 },
          { id: "12.5", title: "Urinary Tract Infection", duration: 6 },
          { id: "12.6", title: "Nephrolithiasis", duration: 5 },
          { id: "12.7", title: "Chronic Renal Failure", duration: 5 },
          { id: "12.8", title: "Renal Neoplasia", duration: 6 },
          { id: "12.9", title: "Lower Urinary Tract Carcinoma", duration: 7 }
        ]
      }
    ]
  },
  {
    system: "Gastrointestinal",
    chapters: [
      {
        id: 10,
        title: "Gastrointestinal Pathology",
        videos: [
          { id: "10.1", title: "Oral Cavity", duration: 6 },
          { id: "10.2", title: "Salivary Gland", duration: 7 },
          { id: "10.3", title: "Esophagus", duration: 28 },
          { id: "10.4", title: "Stomach", duration: 35 },
          { id: "10.5", title: "Small Bowel", duration: 31 },
          { id: "10.6", title: "Appendix", duration: 10 },
          { id: "10.7", title: "Inflammatory Bowel Disease", duration: 9 },
          { id: "10.8a", title: "Colon (Part 1)", duration: 22 },
          { id: "10.8b", title: "Colon: Colorectal Carcinoma (Part 2)", duration: 9 }
        ]
      },
      {
        id: 11,
        title: "Exocrine Pancreas, Gallbladder, Liver",
        videos: [
          { id: "11.1", title: "Exocrine Pancreas", duration: 13 },
          { id: "11.2", title: "Gallbladder", duration: 11 },
          { id: "11.3a", title: "Liver: Jaundice (Part 1)", duration: 12 },
          { id: "11.3b", title: "Liver: Hepatitis (Part 2)", duration: 8 },
          { id: "11.3c", title: "Liver: Cirrhosis & Tumors (Part 3)", duration: 21 }
        ]
      }
    ]
  },
  {
    system: "Reproductive",
    chapters: [
      {
        id: 13,
        title: "Female Genital System",
        videos: [
          { id: "13.1", title: "Vulva", duration: 22 },
          { id: "13.2", title: "Vagina", duration: 14 },
          { id: "13.3", title: "Cervix", duration: 20 },
          { id: "13.4", title: "Endometrium and Myometrium", duration: 31 },
          { id: "13.5", title: "Ovary", duration: 9 },
          { id: "13.6", title: "Ovarian Tumors", duration: 33 },
          { id: "13.7", title: "Gestational Pathology", duration: 24 }
        ]
      },
      {
        id: 14,
        title: "Male Genital System Pathology",
        videos: [
          { id: "14.1", title: "Penis", duration: 7 },
          { id: "14.2", title: "Testicle", duration: 9 },
          { id: "14.3", title: "Testicular Tumors", duration: 13 },
          { id: "14.4", title: "Prostate", duration: 12 }
        ]
      },
      {
        id: 16,
        title: "Breast Pathology",
        videos: [
          { id: "16.1", title: "Introduction", duration: 7 },
          { id: "16.2", title: "Inflammatory Conditions", duration: 9 },
          { id: "16.3", title: "Benign Tumors and Fibrocystic Changes", duration: 15 },
          { id: "16.4", title: "Breast Cancer", duration: 29 }
        ]
      }
    ]
  },
  {
    system: "Endocrine",
    chapters: [
      {
        id: 15,
        title: "Endocrine Pathology",
        videos: [
          { id: "15.1", title: "Anterior Pituitary Gland", duration: 7 },
          { id: "15.2", title: "Posterior Pituitary Gland", duration: 7 },
          { id: "15.3", title: "Thyroid Gland", duration: 6 },
          { id: "15.4", title: "Hyperthyroidism", duration: 5 },
          { id: "15.5", title: "Hypothyroidism", duration: 5 },
          { id: "15.6", title: "Thyroiditis", duration: 5 },
          { id: "15.7", title: "Thyroid Neoplasia", duration: 5 },
          { id: "15.8", title: "Parathyroid Gland", duration: 11 },
          { id: "15.9", title: "Endocrine Pancreas", duration: 15 },
          { id: "15.10", title: "Adrenal Cortex", duration: 13 },
          { id: "15.11", title: "Adrenal Medulla", duration: 12 }
        ]
      }
    ]
  },
  {
    system: "Neurology",
    chapters: [
      {
        id: 17,
        title: "CNS Pathology",
        videos: [
          { id: "17.1", title: "Developmental Anomalies", duration: 5 },
          { id: "17.2", title: "Spinal Cord Lesions", duration: 9 },
          { id: "17.3", title: "Meningitis", duration: 6 },
          { id: "17.4", title: "Cerebrovascular Disease", duration: 16 },
          { id: "17.5", title: "Trauma", duration: 7 },
          { id: "17.6", title: "Demyelinating Disorders", duration: 6 },
          { id: "17.7", title: "Dementia and Degenerative Disorders", duration: 35 },
          { id: "17.8", title: "CNS Tumors", duration: 12 }
        ]
      }
    ]
  },
  {
    system: "Musculoskeletal/Derm",
    chapters: [
      {
        id: 18,
        title: "MSK Pathology",
        videos: [
          { id: "18.1", title: "Skeletal System", duration: 25 },
          { id: "18.2", title: "Bone Tumors", duration: 15 },
          { id: "18.3", title: "Joint", duration: 21 },
          { id: "18.4", title: "Skeletal Muscle", duration: 6 },
          { id: "18.5", title: "Neuromuscular Junction", duration: 5 },
          { id: "18.6", title: "Soft Tissue Tumors", duration: 5 }
        ]
      },
      {
        id: 19,
        title: "Skin Pathology",
        videos: [
          { id: "19.1", title: "Inflammatory Diseases", duration: 15 },
          { id: "19.2", title: "Blistering Dermatoses", duration: 9 },
          { id: "19.3", title: "Epithelial Tumors", duration: 8 },
          { id: "19.4", title: "Disorders of Pigmentation and Melanocytes", duration: 12 },
          { id: "19.5", title: "Infectious Disorders", duration: 4 }
        ]
      }
    ]
  },
  { system: "Psychiatry", chapters: [] },
  { system: "Public Health/Ethics", chapters: [] }
];

const bnbData = [
  {
    system: "Fundamentals",
    sections: [
      { name: "Basic Pharmacology", duration: 86, videos: ["Enzymes (14m)", "Enzyme Inhibitors (8m)", "Dose-Response (21m)", "Drug Elimination (17m)", "Pharmacokinetics (27m)"] },
      { name: "Pathology - General", duration: 182, videos: ["Cellular Adaptations (18m)", "Cell Injury (11m)", "Free Radicals (18m)", "Apoptosis (16m)", "Necrosis (12m)", "Inflammation Principles (25m)", "Wound Healing (24m)", "Neoplasia (25m)"] }
    ]
  },
  {
    system: "Biochemistry/Genetics",
    sections: [
      { name: "Molecular Biochem", duration: 54, videos: ["DNA Structure (13m)", "Purine Metabolism (19m)", "Pyrimidines (22m)"] },
      { name: "Metabolism", duration: 252, videos: ["Glycolysis (31m)", "Gluconeogenesis (17m)", "TCA Cycle (14m)", "ETC (21m)", "Fatty Acids (27m)"] },
      { name: "Genetics", duration: 146, videos: ["Genetic Principles (24m)", "Hardy-Weinberg (12m)", "Pedigrees (18m)", "Down Syndrome (14m)"] },
      { name: "Cell Biology", duration: 200, videos: ["DNA Replication (17m)", "Transcription (23m)", "Translation (20m)", "Cell Cycle (14m)"] }
    ]
  },
  {
    system: "Cardiovascular",
    sections: [
      { name: "Anatomy/Physio", duration: 136, videos: ["Cardiac Phys (19m)", "PV Loops (16m)", "Wiggers (9m)", "Starling Curve (16m)"] },
      { name: "Pathology", duration: 380, videos: ["Ischemia (30m)", "STEMI (12m)", "Heart Failure Basics (22m)", "Cardiomyopathy (12m)", "Hypertension (12m)", "Valve Disease (26m)", "Shock (21m)"] }
    ]
  },
  {
    system: "Endocrine",
    sections: [
      { name: "Thyroid/Adrenal", duration: 145, videos: ["Thyroid Gland (28m)", "Thyroid Disorders (34m)", "Adrenal Glands (22m)", "Cushing Syndrome (33m)"] },
      { name: "Pancreas/Diabetes", duration: 87, videos: ["Diabetes (33m)", "Insulin (9m)", "Treatment (22m)"] }
    ]
  },
  {
    system: "Gastrointestinal",
    sections: [
      { name: "Anatomy/Physio", duration: 217, videos: ["GI Hormones (24m)", "Bilirubin (29m)", "Exocrine Pancreas (15m)"] },
      { name: "Pathology", duration: 314, videos: ["Esophageal Disorders (23m)", "Cirrhosis (23m)", "Gallstones (20m)", "IBD (20m)", "Colon Cancer (24m)"] }
    ]
  },
  {
    system: "Hematology",
    sections: [
      { name: "Red Blood Cells", duration: 168, videos: ["Microcytic Anemia (33m)", "Thalassemia (21m)", "Sickle Cell (23m)"] },
      { name: "White Blood Cells & Coag", duration: 251, videos: ["Coagulation (29m)", "Platelet Disorders (24m)", "Leukemia (18m)", "Lymphoma (9m)"] }
    ]
  },
  {
    system: "Immunology",
    sections: [
      { name: "Basic & Clinical", duration: 317, videos: ["Innate Immunity (36m)", "T-Cells (30m)", "Hypersensitivity (21m)", "Immune Deficiency (36m)", "SLE & RA (32m)"] }
    ]
  },
  {
    system: "Microbiology",
    sections: [
      { name: "Bacteriology", duration: 300, videos: ["Staph (18m)", "Strep (21m)", "Gram Negatives (30m)", "Mycobacteria (11m)"] },
      { name: "Virology/Fungi/Parasites", duration: 336, videos: ["DNA Viruses (18m)", "RNA Viruses (43m)", "HIV (19m)", "Fungal Pneumonias (16m)", "Malaria (14m)"] }
    ]
  },
  {
    system: "Musculoskeletal/Derm",
    sections: [
      { name: "Dermatology", duration: 151, videos: ["Skin Disorders (20m)", "Skin Cancer (18m)"] },
      { name: "Musculoskeletal", duration: 339, videos: ["Knee/Shoulder Anatomy (32m)", "Bone Tumors (24m)", "Osteoarthritis/Gout (29m)"] }
    ]
  },
  {
    system: "Neurology",
    sections: [
      { name: "Neurology", duration: 678, videos: ["Stroke Syndromes (19m)", "Cranial Nerves (18m)", "Parkinson's (20m)", "Seizures (22m)", "The Eye (14m)"] }
    ]
  },
  {
    system: "Psychiatry",
    sections: [
      { name: "Psych", duration: 286, videos: ["Mood Disorders (21m)", "Anxiety (15m)", "Substance Abuse (52m)", "Antidepressants (20m)"] }
    ]
  },
  {
    system: "Respiratory",
    sections: [
      { name: "Pulmonary", duration: 413, videos: ["Pulmonary Phys (32m)", "V/Q Mismatch (30m)", "COPD (26m)", "Pneumonia (26m)", "PE (14m)"] }
    ]
  },
  {
    system: "Renal",
    sections: [
      { name: "Physiology", duration: 267, videos: ["Nephron Phys (38m)", "Acid-Base (30m)", "Electrolytes (23m)"] },
      { name: "Pathology", duration: 165, videos: ["Nephritic Syndrome (21m)", "Nephrotic Syndrome (18m)", "Renal Failure (21m)"] }
    ]
  },
  {
    system: "Reproductive",
    sections: [
      { name: "Repro", duration: 437, videos: ["Pregnancy (14m)", "PCOS/Endometriosis (22m)", "Breast Cancer (17m)", "Testicular Cancer (14m)"] }
    ]
  },
  {
    system: "Public Health/Ethics",
    sections: [
      { name: "Epi/Biostats", duration: 186, videos: ["Study Designs (17m)", "Bias (19m)", "Sensitivity/Specificity (22m)"] },
      { name: "Ethics", duration: 130, videos: ["Informed Consent (17m)", "Quality & Safety (30m)"] }
    ]
  }
];

const sketchyData = [
  {
    system: "Microbiology",
    sections: [
      { name: "Gram Positive Cocci", duration: 51, videos: ["Staph Aureus (11m)", "Staph Epidermidis (7m)", "Strep Pyogenes (15m)", "Strep Agalactiae (5m)", "Strep Pneumo (9m)", "Enterococcus (4m)"] },
      { name: "Gram Positive Bacilli", duration: 50, videos: ["Bacillus (10m)", "C. Tetani (7m)", "C. Botulinum (8m)", "C. Difficile (8m)", "C. Perfringens (6m)", "Corynebacterium (7m)", "Listeria (4m)"] },
      { name: "Gram-Pos Branching", duration: 10, videos: ["Actinomyces (3m)", "Nocardia (7m)"] },
      { name: "Gram Negative Cocci", duration: 22, videos: ["Neisseria Overview (5m)", "N. Meningitidis (9m)", "N. Gonorrheae (8m)"] },
      { name: "Gram Negative Bacilli (Enteric)", duration: 67, videos: ["Klebsiella/Enterobacter (8m)", "Proteus (3m)", "Salmonella (6m)", "Shigella (6m)", "E. Coli (9m)", "Yersinia (8m)", "Campylobacter (6m)", "Vibrio (6m)", "Helicobacter (5m)", "Pseudomonas (10m)"] },
      { name: "Gram Negative Bacilli (Respiratory)", duration: 24, videos: ["Bordatella (8m)", "Haemophilus (9m)", "Legionella (7m)"] },
      { name: "Gram Negative Zoonotics", duration: 17, videos: ["Bartonella (4m)", "Brucella (5m)", "Francisella (4m)", "Pasteurella (4m)"] },
      { name: "Mycobacteria", duration: 26, videos: ["M. Tuberculosis (17m)", "M. Leprae (9m)"] },
      { name: "Spirochetes", duration: 25, videos: ["Borrelia (8m)", "Leptospirosis (4m)", "Treponema (13m)"] },
      { name: "Gram-Indeterminate", duration: 44, videos: ["Chlamydia (15m)", "Coxiella (5m)", "Gardnerella (6m)", "Mycoplasma (6m)", "Rickettsia Overview (4m)", "R. Prowazekii (4m)", "R. Rickettsii (4m)"] },
      { name: "Fungi - Systemic", duration: 28, videos: ["Histoplasmosis (10m)", "Blastomycosis (6m)", "Coccidioidomycosis (7m)", "Paracoccidioidomycosis (5m)"] },
      { name: "Fungi - Cutaneous", duration: 15, videos: ["Malassezia (5m)", "Dermatophytes (6m)", "Sporothrix (4m)"] },
      { name: "Fungi - Opportunistic", duration: 45, videos: ["Candida (13m)", "Aspergillus (11m)", "Cryptococcus (9m)", "Mucormycosis (6m)", "Pneumocystis (6m)"] },
      { name: "Parasites - Intestinal", duration: 18, videos: ["Giardia (5m)", "Entamoeba (8m)", "Cryptosporidium (5m)"] },
      { name: "Parasites - CNS", duration: 21, videos: ["Toxoplasmosis (10m)", "Trypanosoma Brucei (5m)", "Naegleria (6m)"] },
      { name: "Parasites - Blood", duration: 33, videos: ["Trypanosoma Cruzi (6m)", "Babesia (7m)", "Plasmodium (14m)", "Leishmaniasis (6m)"] },
      { name: "Parasites - Other", duration: 6, videos: ["Trichomoniasis (6m)"] },
      { name: "Helminths", duration: 45, videos: ["Nematodes Intestinal (13m)", "Nematodes Tissue (11m)", "Cestodes (10m)", "Trematodes (11m)"] },
      { name: "RNA Viruses (+)", duration: 89, videos: ["Picorna Overview (11m)", "Polio (7m)", "Coxsackie (5m)", "Rhino (5m)", "Hep A (7m)", "Calici (5m)", "Flavi (8m)", "Hep C (10m)", "Toga (11m)", "Corona (4m)", "HIV (16m)"] },
      { name: "RNA Viruses (-)", duration: 66, videos: ["Orthomyxo (18m)", "Paramyxo (16m)", "Rhabdo (9m)", "Filo (5m)", "Bunya (6m)", "Arena (5m)", "Reo (7m)"] },
      { name: "DNA Viruses", duration: 120, videos: ["HSV 1&2 (11m)", "Adeno (5m)", "Pox (8m)", "Hep B (19m)", "EBV (13m)", "CMV (12m)", "VZV (12m)", "HHV-6 (5m)", "HHV-8 (7m)", "Polyoma (7m)", "Papilloma (14m)", "Parvo (7m)"] }
    ]
  }
];


const practiceExamCatalog = [
  { id: "nbme25", label: "NBME 25", mandatory: false, defaultChecked: false, kind: "nbme", order: 25, group: "practice" },
  { id: "uwsa1", label: "UWSA 1", mandatory: false, defaultChecked: false, kind: "uwsa", order: 1, group: "practice" },
  { id: "uwsa2", label: "UWSA 2", mandatory: false, defaultChecked: false, kind: "uwsa", order: 2, group: "practice" },
  { id: "uwsa3", label: "UWSA 3", mandatory: false, defaultChecked: false, kind: "uwsa", order: 3, group: "practice" },
  { id: "nbme26", label: "NBME 26", mandatory: true, defaultChecked: true, kind: "nbme", order: 26, group: "testing" },
  { id: "nbme27", label: "NBME 27", mandatory: true, defaultChecked: true, kind: "nbme", order: 27, group: "testing" },
  { id: "nbme28", label: "NBME 28", mandatory: true, defaultChecked: true, kind: "nbme", order: 28, group: "testing" },
  { id: "nbme29", label: "NBME 29", mandatory: true, defaultChecked: true, kind: "nbme", order: 29, group: "testing" },
  { id: "nbme30", label: "NBME 30", mandatory: true, defaultChecked: true, kind: "nbme", order: 30, group: "testing" },
  { id: "nbme31", label: "NBME 31", mandatory: true, defaultChecked: true, kind: "nbme", order: 31, group: "testing" },
  { id: "free120", label: "Free 120", mandatory: true, defaultChecked: true, kind: "free", order: 120, group: "testing" }
];

const els = {
  startDate: document.getElementById("startDate"),
  examDate: document.getElementById("examDate"),
  generateBtn: document.getElementById("generateBtn"),
  errorBox: document.getElementById("errorBox"),
  overview: document.getElementById("overviewStats"),
  feasibilityChip: document.getElementById("feasibilityChip"),
  quickFill: document.getElementById("quickFill"),
  breakBoxes: Array.from(document.querySelectorAll('.break-grid input[type="checkbox"][data-dow]')),
  weeklyCalendar: document.getElementById("weeklyCalendar"),
  calPrev: document.getElementById("calPrev"),
  calNext: document.getElementById("calNext"),
  calToday: document.getElementById("calToday"),
  calRange: document.getElementById("calRange"),
  downloadIcs: document.getElementById("downloadIcs"),
  learningGroup: document.getElementById("learningGroup"),
  practiceGroup: document.getElementById("practiceGroup"),
  testingGroup: document.getElementById("testingGroup"),
  dayDetail: document.getElementById("dayDetail"),
  pathomaToggle: null,
  bnbToggle: null,
  sketchyToggle: null,
  ankiToggle: null,
  uworldToggle: null
};

const LIMIT_MINUTES_PER_DAY = 12 * 60;
const UWORLD_TOTAL_Q = 4000;
const UWORLD_BLOCK_Q = 40;
const UWORLD_BLOCK_MINUTES = 120; // 40 questions per block, includes review
const UWORLD_TOTAL_BLOCKS = Math.ceil(UWORLD_TOTAL_Q / UWORLD_BLOCK_Q);
const UWORLD_TOTAL_MINUTES = UWORLD_TOTAL_BLOCKS * UWORLD_BLOCK_MINUTES;
const EXAM_MINUTES = 12 * 60;
const ANKI_MINUTES = 60;
const MIN_LEARNING_MINUTES = 180; // Minimum daily learning (Anki + videos) until videos are done

let calendarWeekStart = null;
let currentPlan = null; // { dayMap, start, exam }
let selectedDayKey = null;

function formatDateLabel(date) {
  return date.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric", year: "numeric" });
}

function formatDateKey(date) {
  return date.toISOString().slice(0, 10);
}

function startOfWeekSunday(date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() - d.getDay());
  return d;
}

function formatWeekRangeLabel(start, end) {
  const sameMonth = start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear();
  if (sameMonth) {
    const monthYear = start.toLocaleDateString(undefined, { month: "long", year: "numeric" });
    return `${monthYear} — ${start.getDate()}–${end.getDate()}`;
  }
  const startLabel = start.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
  const endLabel = end.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
  return `${startLabel} – ${endLabel}`;
}

function addDays(date, days) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function buildRange(start, end) {
  const days = [];
  let cur = new Date(start);
  while (cur <= end) {
    days.push(new Date(cur));
    cur = addDays(cur, 1);
  }
  return days;
}

function minutesToHuman(min) {
  const h = Math.floor(min / 60);
  const m = Math.round(min % 60);
  if (h <= 0) return `${m}m`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}m`;
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderResourceToggles() {
  const { learningGroup, practiceGroup, testingGroup } = els;
  if (!learningGroup || !practiceGroup || !testingGroup) return;

  const previous = {
    pathoma: els.pathomaToggle?.checked ?? true,
    bnb: els.bnbToggle?.checked ?? false,
    sketchy: els.sketchyToggle?.checked ?? false,
    anki: els.ankiToggle?.checked ?? true,
    uworld: els.uworldToggle?.checked ?? true
  };

  learningGroup.innerHTML = "";
  practiceGroup.innerHTML = "";
  testingGroup.innerHTML = "";

  const makePill = (id, label, checked, disabled = false) => {
    const lab = document.createElement("label");
    lab.className = "pill";
    const input = document.createElement("input");
    input.type = "checkbox";
    input.id = id;
    input.checked = checked;
    if (disabled) input.disabled = true;
    lab.appendChild(input);
    const span = document.createElement("span");
    span.textContent = label;
    lab.appendChild(span);
    return lab;
  };

  // Learning
  learningGroup.appendChild(makePill("pathomaToggle", "Pathoma", previous.pathoma));
  learningGroup.appendChild(makePill("bnbToggle", "Boards & Beyond", previous.bnb));
  learningGroup.appendChild(makePill("sketchyToggle", "Sketchy Micro", previous.sketchy));
  learningGroup.appendChild(makePill("ankiToggle", "Anki (daily)", previous.anki));

  // Practice
  practiceGroup.appendChild(makePill("uworldToggle", "UWorld Qbank", previous.uworld));
  for (const exam of practiceExamCatalog.filter(e => e.group === "practice")) {
    const pill = makePill(`exam-${exam.id}`, exam.label, exam.defaultChecked, false);
    practiceGroup.appendChild(pill);
  }

  // Testing
  for (const exam of practiceExamCatalog.filter(e => e.group === "testing")) {
    const pill = makePill(`exam-${exam.id}`, exam.label, exam.defaultChecked, false);
    testingGroup.appendChild(pill);
  }

  els.pathomaToggle = document.getElementById("pathomaToggle");
  els.bnbToggle = document.getElementById("bnbToggle");
  els.sketchyToggle = document.getElementById("sketchyToggle");
  els.ankiToggle = document.getElementById("ankiToggle");
  els.uworldToggle = document.getElementById("uworldToggle");
}

function getExamSelections() {
  const selections = [];
  for (const exam of practiceExamCatalog) {
    const input = document.getElementById(`exam-${exam.id}`);
    if (input && input.checked) selections.push(exam);
  }
  return selections;
}

function resetError(msg = "") {
  els.errorBox.textContent = msg;
}

function setFeasibility(status, tone) {
  els.feasibilityChip.textContent = status;
  els.feasibilityChip.style.color = tone === "bad" ? "#ffd7d7" : "#c8ffe0";
  els.feasibilityChip.style.borderColor = tone === "bad" ? "#ff6b6b" : "#58d68d";
}

function pickLeastLoadedDay(slots, durationMinutes, bufferStart) {
  const candidates = slots
    .filter(d => d.date < bufferStart && (LIMIT_MINUTES_PER_DAY - d.usedMinutes) >= durationMinutes)
    .sort((a, b) => {
      if (a.usedMinutes !== b.usedMinutes) return a.usedMinutes - b.usedMinutes;
      return a.date - b.date;
    });
  return candidates[0] || null;
}

function buildChipTooltip(task) {
  const bits = [];
  if (task.label) bits.push(task.label);
  if (task.detail) bits.push(task.detail);
  if (task.videos && task.videos.length) bits.push(task.videos.join(", "));
  return bits.join(" — ");
}

function hasExam(day) {
  return day.tasks.some(t => t.type === "exam");
}

function buildDayMap(start, end, breakSet) {
  const map = new Map();
  for (const d of buildRange(start, end)) {
    const key = formatDateKey(d);
    const isBreak = breakSet.has(d.getDay());
    map.set(key, {
      date: d,
      tasks: [],
      usedMinutes: 0,
      isBreak
    });
  }
  return map;
}

function addTask(day, task) {
  const hydrated = { videos: [], ...task };
  hydrated.calendarLabel = hydrated.calendarLabel || hydrated.label;
  day.tasks.push(hydrated);
  day.usedMinutes += hydrated.durationMinutes || 0;
}

function addExamTask(day, label) {
  const short = label.includes("–") ? label.split("–")[0].trim() : label;
  addTask(day, {
    type: "exam",
    label,
    calendarLabel: short,
    durationMinutes: EXAM_MINUTES,
    detail: "Full-length practice exam with same-day review"
  });
}

function totalMinutesForResource(resource) {
  return resource.reduce((sum, entry) => {
    if (entry.chapters) {
      return sum + entry.chapters.reduce((s, ch) => s + (ch.videos || []).reduce((sv, v) => sv + (v.duration || 0), 0), 0);
    }
    if (entry.sections) {
      return sum + entry.sections.reduce((s, sec) => s + sec.duration, 0);
    }
    return sum;
  }, 0);
}

function findSystemBlock(data, systemName) {
  return data.find(s => s.system === systemName);
}

function buildSystemQueue(systemName, flags) {
  const queue = [];
  if (flags.pathoma) {
    const sys = findSystemBlock(pathomaData, systemName);
    if (sys) {
      for (const ch of sys.chapters || []) {
        for (const v of ch.videos || []) {
          queue.push({
            type: "learning",
            label: `Pathoma – ${v.title}`,
            calendarLabel: "Pathoma",
            durationMinutes: v.duration,
            detail: `${ch.title} (${v.id})`,
            videos: [`${v.id} ${v.title}`],
            system: systemName
          });
        }
      }
    }
  }
  if (flags.bnb) {
    const sys = findSystemBlock(bnbData, systemName);
    if (sys) {
      for (const sec of sys.sections || []) {
        queue.push({
          type: "learning",
          label: `Boards & Beyond – ${sec.name}`,
          calendarLabel: "BnB",
          durationMinutes: sec.duration,
          detail: `${systemName} • ${sec.name}`,
          videos: sec.videos,
          system: systemName
        });
      }
    }
  }
  if (flags.sketchy) {
    const sys = findSystemBlock(sketchyData, systemName);
    if (sys) {
      for (const sec of sys.sections || []) {
        queue.push({
          type: "learning",
          label: `Sketchy – ${sec.name}`,
          calendarLabel: "Sketchy",
          durationMinutes: sec.duration,
          detail: `${systemName} • ${sec.name}`,
          videos: sec.videos,
          system: systemName
        });
      }
    }
  }
  return queue;
}

function getStudyDays(dayMap) {
  return Array.from(dayMap.values())
    .filter(d => !d.isBreak && !hasExam(d))
    .sort((a, b) => a.date - b.date);
}

function nextSaturdayOnOrAfter(date) {
  const d = new Date(date);
  const offset = (6 - d.getDay() + 7) % 7;
  d.setDate(d.getDate() + offset);
  return d;
}

function saturdayOnOrBefore(date) {
  const d = new Date(date);
  const offset = (d.getDay() + 7 - 6) % 7;
  d.setDate(d.getDate() - offset);
  return d;
}

function getBreakDowSet() {
  const set = new Set();
  for (const cb of els.breakBoxes) {
    const dow = Number.parseInt(cb.dataset.dow || "", 10);
    if (cb.checked && Number.isFinite(dow)) set.add(dow);
  }
  return set;
}

function renderStats(stats) {
  const parts = [
    { label: "Total calendar", value: `${stats.totalDays} days` },
    { label: "Study days", value: `${stats.studyDays} days` },
    { label: "Total work", value: `${stats.totalHours.toFixed(1)} hours` },
    { label: "Avg/day", value: `${stats.avgPerDay.toFixed(1)} hours` }
  ];
  els.overview.innerHTML = parts
    .map(p => `<div class="stat"><div class="label">${p.label}</div><div class="value">${p.value}</div></div>`)  
    .join("");
}

function renderDayDetail(dayMap) {
  if (!els.dayDetail) return;
  if (!dayMap || dayMap.size === 0) {
    els.dayDetail.innerHTML = '<div class="schedule-empty">Generate a plan to view a day.</div>';
    return;
  }
  const day = dayMap.get(selectedDayKey || Array.from(dayMap.keys())[0]);
  if (!day) {
    els.dayDetail.innerHTML = '<div class="schedule-empty">Select a day from the calendar.</div>';
    return;
  }
  const dateLabel = formatDateLabel(day.date);
  const metaParts = [];
  if (day.isBreak) metaParts.push("Break day");
  if (day.usedMinutes > 0) metaParts.push(minutesToHuman(day.usedMinutes));
  const meta = metaParts.join(" • ");

  if (!selectedDayKey) selectedDayKey = formatDateKey(day.date);

  const isExamDay = hasExam(day);
  const orderedTasks = isExamDay
    ? day.tasks.filter(t => t.type === "exam")
    : (() => {
        const learning = [];
        const practice = [];
        const buffer = [];
        const other = [];
        for (const t of day.tasks) {
          const type = t.type || "learning";
          if (type === "exam") continue;
          if (type === "learning") learning.push(t);
          else if (type === "practice") practice.push(t);
          else if (type === "buffer") buffer.push(t);
          else other.push(t);
        }

        const byLabel = (a, b) => (a.calendarLabel || a.label || "").localeCompare(b.calendarLabel || b.label || "");
        learning.sort((a, b) => {
          const aAnki = (a.label || "").toLowerCase().startsWith("anki");
          const bAnki = (b.label || "").toLowerCase().startsWith("anki");
          if (aAnki !== bAnki) return aAnki ? -1 : 1;
          return byLabel(a, b);
        });
        practice.sort(byLabel);
        buffer.sort(byLabel);
        other.sort(byLabel);
        return [...learning, ...practice, ...buffer, ...other];
      })();

  if (!orderedTasks || orderedTasks.length === 0) {
    els.dayDetail.innerHTML = `
      <div class="day-detail-header">
        <div class="day-detail-title">${escapeHtml(dateLabel)}</div>
        <div class="day-detail-meta">${escapeHtml(meta || "No tasks")}</div>
      </div>
      <div class="day-detail-empty">No tasks assigned.</div>
    `;
    return;
  }

  const items = orderedTasks.map(t => {
    const duration = t.durationMinutes ? minutesToHuman(t.durationMinutes) : "";
    const tagLabel = t.type === "exam" ? "Exam" : t.type === "practice" ? "Practice" : t.type === "buffer" ? "Buffer" : "Learning";
    const tag = `<span class="tag ${t.type || "learning"}">${escapeHtml(tagLabel)}</span>`;
    const note = t.detail ? `<div class="day-detail-note">${escapeHtml(t.detail)}</div>` : "";
    const videos = t.videos && t.videos.length
      ? `<ul class="day-detail-videos">${t.videos.map(v => `<li>${escapeHtml(v)}</li>`).join("")}</ul>`
      : "";

    return `<li class="day-detail-item">
      <div class="day-detail-info">
        <div class="day-detail-title-row">${tag}<span class="day-detail-name">${escapeHtml(t.label)}</span></div>
        ${note}
        ${videos}
      </div>
      <span class="day-detail-minutes">${escapeHtml(duration)}</span>
    </li>`;
  }).join("");

  els.dayDetail.innerHTML = `
    <div class="day-detail-header">
      <div class="day-detail-title">${escapeHtml(dateLabel)}</div>
      <div class="day-detail-meta">${escapeHtml(meta || "")}</div>
    </div>
    <ul class="day-detail-list">${items}</ul>
  `;
}

function renderCalendar(dayMap) {
  if (!els.weeklyCalendar) return;
  if (!dayMap || dayMap.size === 0) {
    els.weeklyCalendar.innerHTML = '<div class="schedule-empty">Generate a plan to see the weekly calendar.</div>';
    if (els.calRange) els.calRange.textContent = "";
    return;
  }

  const days = Array.from(dayMap.values()).sort((a, b) => a.date - b.date);
  const planStart = days[0].date;
  const planEnd = days[days.length - 1].date;
  if (!selectedDayKey || !dayMap.has(selectedDayKey)) {
    selectedDayKey = formatDateKey(planStart);
  }
  if (!calendarWeekStart || calendarWeekStart < startOfWeekSunday(planStart) || calendarWeekStart > startOfWeekSunday(planEnd)) {
    calendarWeekStart = startOfWeekSunday(planStart);
  }

  const weekStart = calendarWeekStart;
  const weekEnd = addDays(weekStart, 6);
  if (els.calRange) els.calRange.textContent = formatWeekRangeLabel(weekStart, weekEnd);

  const dowLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const parts = [];
  parts.push('<div class="calendar-dow-grid">');
  for (const label of dowLabels) parts.push(`<div class="calendar-dow">${escapeHtml(label)}</div>`);
  parts.push('</div>');
  parts.push('<div class="calendar-day-grid">');

  const todayKey = formatDateKey(new Date());
  const MAX_CHIPS = 3;
  for (let i = 0; i < 7; i++) {
    const date = addDays(weekStart, i);
    const key = formatDateKey(date);
    const day = dayMap.get(key);
    const cls = ["calendar-cell"];
    if (key === todayKey) cls.push("today");
    if (day?.isBreak) cls.push("break");
    if (key === selectedDayKey) cls.push("selected");

    const dateLabel = date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
    const chips = [];
    if (day) {
      const tasks = day.tasks || [];
      if (day.isBreak) chips.push('<span class="calendar-chip buffer">Break</span>');
      for (let j = 0; j < tasks.length && j < MAX_CHIPS; j++) {
        const t = tasks[j];
        const type = t.type || "learning";
        const chipLabel = escapeHtml(t.calendarLabel || t.label);
        const tooltip = buildChipTooltip(t);
        const titleAttr = tooltip ? ` title="${escapeHtml(tooltip)}"` : "";
        chips.push(`<span class="calendar-chip ${type}"${titleAttr}>${chipLabel}</span>`);
      }
      if (tasks.length > MAX_CHIPS) {
        chips.push(`<span class="calendar-chip more">+${tasks.length - MAX_CHIPS} more</span>`);
      }
      if (chips.length === 0) chips.push('<span class="calendar-chip more">No tasks</span>');
    } else {
      chips.push('<span class="calendar-chip more">No tasks</span>');
    }

    parts.push(`<div class="${cls.join(" ")}" data-day-key="${key}">`);
    parts.push(`<div class="calendar-date">${escapeHtml(dateLabel)}</div>`);
    parts.push('<div class="calendar-events">');
    parts.push(chips.join(""));
    parts.push('</div>');
    parts.push('</div>');
  }

  parts.push('</div>');
  els.weeklyCalendar.innerHTML = parts.join("");

  const cells = els.weeklyCalendar.querySelectorAll('[data-day-key]');
  cells.forEach(cell => {
    cell.addEventListener("click", () => {
      const key = cell.getAttribute("data-day-key");
      if (!key) return;
      selectedDayKey = key;
      renderDayDetail(dayMap);
      renderCalendar(dayMap);
    });
  });
}

function pad2(n) {
  return String(n).padStart(2, "0");
}

function formatIcsDate(date) {
  return `${date.getFullYear()}${pad2(date.getMonth() + 1)}${pad2(date.getDate())}`;
}

function formatIcsTimestamp(now) {
  return `${now.getUTCFullYear()}${pad2(now.getUTCMonth() + 1)}${pad2(now.getUTCDate())}T${pad2(now.getUTCHours())}${pad2(now.getUTCMinutes())}${pad2(now.getUTCSeconds())}Z`;
}

function icsEscape(value) {
  return String(value)
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,");
}

function buildIcs(dayMap) {
  if (!dayMap || dayMap.size === 0) return "";
  const now = new Date();
  const dtstamp = formatIcsTimestamp(now);
  const lines = [];

  lines.push("BEGIN:VCALENDAR");
  lines.push("VERSION:2.0");
  lines.push("PRODID:-//Step1 Planner//EN");
  lines.push("CALSCALE:GREGORIAN");
  lines.push("METHOD:PUBLISH");
  lines.push("X-WR-CALNAME:Step 1 Study Plan");

  const sorted = Array.from(dayMap.values()).sort((a, b) => a.date - b.date);
  sorted.forEach((day, idx) => {
    const dtstart = formatIcsDate(day.date);
    const dtend = formatIcsDate(addDays(day.date, 1));
    const uid = `step1-${dtstart}-${idx}@planner`;
    const summary = day.isBreak
      ? "Break / Buffer"
      : (day.tasks.length > 0 ? `Study – ${day.tasks.length} task${day.tasks.length === 1 ? "" : "s"}` : "Study placeholder");

    const descLines = [];
    if (day.tasks.length > 0) {
      for (const t of day.tasks) {
        const detail = t.detail ? `: ${t.detail}` : "";
        descLines.push(`- ${t.label}${detail}`);
      }
    } else if (day.isBreak) {
      descLines.push("Buffer / Rest day");
    } else {
      descLines.push("No tasks scheduled");
    }

    lines.push("BEGIN:VEVENT");
    lines.push(`UID:${icsEscape(uid)}`);
    lines.push(`DTSTAMP:${dtstamp}`);
    lines.push(`DTSTART;VALUE=DATE:${dtstart}`);
    lines.push(`DTEND;VALUE=DATE:${dtend}`);
    lines.push(`SUMMARY:${icsEscape(summary)}`);
    if (descLines.length > 0) lines.push(`DESCRIPTION:${icsEscape(descLines.join("\n"))}`);
    lines.push("END:VEVENT");
  });

  lines.push("END:VCALENDAR");
  return lines.join("\r\n");
}

function downloadIcsFile() {
  if (!currentPlan || !currentPlan.dayMap || currentPlan.dayMap.size === 0) {
    resetError("Generate a schedule before downloading the calendar.");
    return;
  }
  const ics = buildIcs(currentPlan.dayMap);
  if (!ics) {
    resetError("Nothing to export. Generate a schedule first.");
    return;
  }
  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "step1-study-plan.ics";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function generatePlan() {
  resetError();
  const startVal = els.startDate.value;
  const examVal = els.examDate.value;
  if (!startVal || !examVal) {
    resetError("Please set both start and exam dates.");
    return;
  }
  const start = new Date(`${startVal}T00:00:00`);
  const exam = new Date(`${examVal}T00:00:00`);
  if (exam < start) {
    resetError("Exam date must be on or after the start date.");
    return;
  }
  const bufferStart = addDays(exam, -14);
  if (bufferStart <= start) {
    setFeasibility("Not feasible (<14 days)", "bad");
    resetError("Plan not feasible. Please allow at least 14 days so we can keep a 2-week buffer before test day.");
    return;
  }
  const flags = {
    pathoma: els.pathomaToggle?.checked ?? true,
    bnb: els.bnbToggle?.checked ?? false,
    sketchy: els.sketchyToggle?.checked ?? false,
    anki: els.ankiToggle?.checked ?? true,
    uworld: els.uworldToggle?.checked ?? true
  };
  const examSelections = getExamSelections();

  const totalDays = Math.floor((exam - start) / (24 * 60 * 60 * 1000)) + 1;
  const breakSet = getBreakDowSet();
  const dayMap = buildDayMap(start, exam, breakSet);

  for (const day of dayMap.values()) {
    if (day.isBreak) addTask(day, { type: "buffer", label: "Buffer / Rest (Break Day)", durationMinutes: 0, detail: "Keep this day open for recovery." });
  }

  const dayBeforeExamKey = formatDateKey(addDays(exam, -1));
  const dayBeforeExam = dayMap.get(dayBeforeExamKey);
  if (dayBeforeExam) {
    dayBeforeExam.tasks = [];
    dayBeforeExam.usedMinutes = 0;
    dayBeforeExam.isBreak = true;
    addTask(dayBeforeExam, { type: "buffer", label: "Buffer / Rest (Break Day)", durationMinutes: 0, detail: "Protect the day before your exam." });
  }

  const breakDays = Array.from(dayMap.values()).filter(d => d.isBreak).length;
  const studyDayCount = totalDays - breakDays;
  if (studyDayCount <= 0) {
    resetError("All days are breaks. Please select at least one study day.");
    return;
  }

  // Practice exam placement
  const free120Date = addDays(exam, -3);
  const uwsa2Date = addDays(exam, -7);
  const selected = [...examSelections];
  const nbmeList = selected.filter(e => e.kind === "nbme").sort((a, b) => a.order - b.order);
  const baselineExam = nbmeList[0];
  if (baselineExam) {
    const weekEnd = addDays(start, 6);
    let baselineDate = nextSaturdayOnOrAfter(start);
    if (baselineDate > weekEnd) baselineDate = weekEnd;
    const baseDay = dayMap.get(formatDateKey(baselineDate));
    if (baseDay && !baseDay.isBreak) addExamTask(baseDay, `${baselineExam.label} – Baseline`);
  }

  const usedExamIds = new Set();
  if (baselineExam) usedExamIds.add(baselineExam.id);
  if (selected.some(e => e.id === "free120")) usedExamIds.add("free120");
  if (selected.some(e => e.id === "uwsa2")) usedExamIds.add("uwsa2");

  if (selected.some(e => e.id === "free120")) {
    const d = dayMap.get(formatDateKey(free120Date));
    if (d && !d.isBreak) addExamTask(d, "Free 120 – 3 days out");
  }

  if (selected.some(e => e.id === "uwsa2")) {
    const d = dayMap.get(formatDateKey(uwsa2Date));
    if (d && !d.isBreak) addExamTask(d, "UWSA 2 – 1 week out");
  }

  const remainingExams = selected.filter(e => !usedExamIds.has(e.id));
  let ptr = addDays(exam, -14) < start ? start : addDays(exam, -14);
  for (let i = remainingExams.length - 1; i >= 0; i--) {
    let target = saturdayOnOrBefore(ptr);
    while (target >= start) {
      const key = formatDateKey(target);
      const day = dayMap.get(key);
      if (day && !hasExam(day) && !day.isBreak) {
        addExamTask(day, `${remainingExams[i].label} – Weekend assessment`);
        break;
      }
      target = addDays(target, -7);
    }
    ptr = addDays(ptr, -7);
  }

  const studySlots = getStudyDays(dayMap).filter(d => d.date < bufferStart);
  const examDayCount = Array.from(dayMap.values()).filter(d => hasExam(d)).length;
  const studyWindowDays = studySlots.length + examDayCount;

  if (studySlots.length === 0) {
    setFeasibility("Not feasible (no study days)", "bad");
    resetError("No available study days before the 2-week buffer. Extend your dates or relax break days.");
    return;
  }

  const resourceMinutes = (flags.pathoma ? totalMinutesForResource(pathomaData) : 0)
    + (flags.bnb ? totalMinutesForResource(bnbData) : 0)
    + (flags.sketchy ? totalMinutesForResource(sketchyData) : 0);
  const ankiMinutesTotal = flags.anki ? studySlots.length * ANKI_MINUTES : 0;
  const uworldMinutesTotal = flags.uworld ? UWORLD_TOTAL_MINUTES : 0;
  const examMinutesTotal = examSelections.length * EXAM_MINUTES;
  const totalHours = (resourceMinutes + ankiMinutesTotal + uworldMinutesTotal + examMinutesTotal) / 60;
  const avgPerDay = totalHours / studyWindowDays;

  renderStats({ totalDays, studyDays: studyWindowDays, totalHours, avgPerDay });

  if (avgPerDay > 12) {
    setFeasibility("Not feasible (>12h/day)", "bad");
    resetError("Plan not feasible (>12h/day). Try unchecking 'Boards & Beyond', 'Sketchy', or extending your date range.");
    return;
  }
  setFeasibility("Feasible", "good");

  if (flags.anki) {
    for (const day of studySlots) {
      addTask(day, {
        type: "learning",
        label: "Anki",
        calendarLabel: "Anki",
        durationMinutes: ANKI_MINUTES,
        detail: "Spaced repetition (user-selected decks)"
      });
    }
  }

  const learningQueue = [];
  for (const systemName of SYSTEM_ORDER) {
    const queue = buildSystemQueue(systemName, flags);
    for (const item of queue) learningQueue.push(item);
  }

  const learningDays = [...studySlots]; // already sorted chronologically

  let dayIdx = 0;
  while (learningQueue.length > 0 && dayIdx < learningDays.length) {
    const day = learningDays[dayIdx];
    let remaining = LIMIT_MINUTES_PER_DAY - day.usedMinutes;
    let learningMinutes = day.tasks
      .filter(t => (t.type || "learning") === "learning")
      .reduce((s, t) => s + (t.durationMinutes || 0), 0);

    // Front-load: ensure at least MIN_LEARNING_MINUTES per day while learning queue remains
    while (learningQueue.length > 0 && remaining > 0 && learningMinutes < MIN_LEARNING_MINUTES) {
      const next = learningQueue[0];
      if (next.durationMinutes <= remaining) {
        addTask(day, next);
        remaining -= next.durationMinutes;
        learningMinutes += next.durationMinutes;
        learningQueue.shift();
      } else {
        break; // move to next day if the next item cannot fit
      }
    }
    dayIdx++;
  }

  // Place any leftover learning sequentially if capacity remains
  dayIdx = 0;
  while (learningQueue.length > 0 && dayIdx < learningDays.length) {
    const day = learningDays[dayIdx];
    const remaining = LIMIT_MINUTES_PER_DAY - day.usedMinutes;
    const next = learningQueue[0];
    if (next.durationMinutes <= remaining) {
      addTask(day, next);
      learningQueue.shift();
      continue;
    }
    dayIdx++;
  }

  if (learningQueue.length > 0) {
    setFeasibility("Not feasible (no space)", "bad");
    resetError("Ran out of study days while scheduling learning. Extend your dates or deselect a resource.");
    currentPlan = { dayMap, start, exam };
    renderDayDetail(dayMap);
    renderCalendar(dayMap);
    return;
  }

  let uworldBlocksRemaining = flags.uworld ? UWORLD_TOTAL_BLOCKS : 0;
  const uworldBlockCountByDay = new Map();
  while (uworldBlocksRemaining > 0) {
    const targetDay = pickLeastLoadedDay(studySlots, UWORLD_BLOCK_MINUTES, bufferStart);
    if (!targetDay) {
      setFeasibility("Not feasible (UWorld overflow)", "bad");
      resetError("Ran out of study days for UWorld blocks. Extend your dates or uncheck UWorld.");
      currentPlan = { dayMap, start, exam };
      renderDayDetail(dayMap);
      renderCalendar(dayMap);
      return;
    }
    const key = formatDateKey(targetDay.date);
    const nextNumber = (uworldBlockCountByDay.get(key) || 0) + 1;
    uworldBlockCountByDay.set(key, nextNumber);
    addTask(targetDay, {
      type: "practice",
      label: `UWorld Block ${nextNumber}`,
      calendarLabel: "UWorld",
      durationMinutes: UWORLD_BLOCK_MINUTES,
      detail: "40 questions with full review; choose your topic"
    });
    uworldBlocksRemaining--;
  }

  currentPlan = { dayMap, start, exam };
  calendarWeekStart = calendarWeekStart || startOfWeekSunday(start);
  renderDayDetail(dayMap);
  renderCalendar(dayMap);
}

function quickFillExample() {
  const today = new Date();
  const start = formatDateKey(today);
  const exam = formatDateKey(addDays(today, 84));
  els.startDate.value = start;
  els.examDate.value = exam;
  renderResourceToggles();
  els.pathomaToggle.checked = true;
  els.bnbToggle.checked = false;
  els.sketchyToggle.checked = false;
  els.ankiToggle.checked = true;
  els.uworldToggle.checked = true;
  generatePlan();
}

renderResourceToggles();
els.generateBtn.addEventListener("click", generatePlan);
els.quickFill.addEventListener("click", quickFillExample);
if (els.downloadIcs) els.downloadIcs.addEventListener("click", downloadIcsFile);
if (els.calPrev) els.calPrev.addEventListener("click", () => {
  if (!calendarWeekStart) calendarWeekStart = startOfWeekSunday(new Date());
  calendarWeekStart = addDays(calendarWeekStart, -7);
  renderCalendar(currentPlan?.dayMap);
});
if (els.calNext) els.calNext.addEventListener("click", () => {
  if (!calendarWeekStart) calendarWeekStart = startOfWeekSunday(new Date());
  calendarWeekStart = addDays(calendarWeekStart, 7);
  renderCalendar(currentPlan?.dayMap);
});
if (els.calToday) els.calToday.addEventListener("click", () => {
  calendarWeekStart = startOfWeekSunday(new Date());
  renderCalendar(currentPlan?.dayMap);
});
for (const cb of els.breakBoxes) {
  cb.addEventListener("change", () => generatePlan());
}

if (!els.startDate.value) {
  const today = new Date();
  els.startDate.value = formatDateKey(today);
  els.examDate.value = "";
}

renderDayDetail(new Map());
renderCalendar(new Map());
