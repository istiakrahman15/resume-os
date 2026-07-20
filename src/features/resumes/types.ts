export interface ResumeHeader {
  name: string;
  headline: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  github?: string;
  linkedin?: string;
}

export interface ResumeSummary {
  body: string;
}

export interface ResumeExperience {
  company: string;
  title: string;
  location?: string;
  startDate: string;
  endDate: string;
  current: boolean;
  bullets: string[];
}

export interface ResumeEducation {
  school: string;
  degree: string;
  fieldOfStudy: string;
  location?: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  bullets?: string[];
}

export interface ResumeSkill {
  name: string;
  level?: "beginner" | "intermediate" | "advanced" | "expert";
}

export interface ResumeSkillGroup {
  category: string;
  skills: ResumeSkill[];
}

export interface ResumeProject {
  title: string;
  description: string;
  url?: string;
  tech?: string[];
  bullets: string[];
}

export interface ResumeCertification {
  name: string;
  issuer: string;
  date: string;
  url?: string;
}

export interface ResumeLanguage {
  name: string;
  proficiency: string; // e.g. "Native", "Fluent", "Conversational"
}

export interface ResumeCustomSection {
  title: string;
  body: string;
}

export interface ResumeData {
  header?: ResumeHeader;
  summary?: ResumeSummary;
  workExperience?: ResumeExperience[];
  education?: ResumeEducation[];
  skills?: ResumeSkillGroup[];
  projects?: ResumeProject[];
  certifications?: ResumeCertification[];
  languages?: ResumeLanguage[];
  custom?: ResumeCustomSection[];
}

export interface ResumeTemplate {
  id: string;
  name: string;
  category: "modern" | "minimal" | "classic" | "professional" | "developer" | "creative";
  tier: "free" | "pro";
  accentColor: string;
  fontStack: string[];
  thumbnails: { png: string; webp: string };
  pdfLayout: "single" | "two-column";
  component: React.FC<{ data: ResumeData; theme?: any }>;
}
