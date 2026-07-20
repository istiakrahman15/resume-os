"use client";

import { create } from "zustand";
import type {
  ResumeData,
  ResumeHeader,
  ResumeSummary,
  ResumeExperience,
  ResumeEducation,
  ResumeSkillGroup,
  ResumeProject,
  ResumeCertification,
  ResumeLanguage,
  ResumeCustomSection,
} from "../types";

interface ResumeEditorState {
  resumeId: string | null;
  title: string;
  templateId: string;
  theme: {
    accentColor?: string;
    fontStack?: string[];
    density?: "compact" | "comfortable" | "spacious";
  };
  data: ResumeData;
  activeSection: string;
  activeItemIndex: number | null;
  zoom: number;

  // Actions
  loadResume: (resume: {
    id: string;
    title: string;
    templateId: string;
    themeJson: any;
    dataJson: any;
  }) => void;
  setResumeId: (id: string | null) => void;
  setTitle: (title: string) => void;
  setTemplateId: (templateId: string) => void;
  updateTheme: (theme: Partial<ResumeEditorState["theme"]>) => void;
  updateHeader: (header: ResumeHeader) => void;
  updateSummary: (summary: ResumeSummary) => void;
  updateWorkExperience: (work: ResumeExperience[]) => void;
  updateEducation: (edu: ResumeEducation[]) => void;
  updateSkills: (skills: ResumeSkillGroup[]) => void;
  updateProjects: (projects: ResumeProject[]) => void;
  updateCertifications: (certs: ResumeCertification[]) => void;
  updateLanguages: (langs: ResumeLanguage[]) => void;
  updateCustom: (custom: ResumeCustomSection[]) => void;
  setActiveSection: (section: string) => void;
  setActiveItemIndex: (index: number | null) => void;
  setZoom: (zoom: number) => void;
}

const defaultResumeData: ResumeData = {
  header: {
    name: "",
    headline: "",
    email: "",
    phone: "",
    location: "",
    website: "",
    github: "",
    linkedin: "",
  },
  summary: {
    body: "",
  },
  workExperience: [],
  education: [],
  skills: [],
  projects: [],
  certifications: [],
  languages: [],
  custom: [],
};

export const useResumeEditorStore = create<ResumeEditorState>((set) => ({
  resumeId: null,
  title: "Untitled Resume",
  templateId: "minimal",
  theme: {
    density: "comfortable",
  },
  data: defaultResumeData,
  activeSection: "header",
  activeItemIndex: null,
  zoom: 100,

  loadResume: (resume) =>
    set({
      resumeId: resume.id,
      title: resume.title,
      templateId: resume.templateId,
      theme: resume.themeJson || { density: "comfortable" },
      data: { ...defaultResumeData, ...resume.dataJson },
    }),

  setResumeId: (id) => set({ resumeId: id }),
  setTitle: (title) => set({ title }),
  setTemplateId: (templateId) => set({ templateId }),
  updateTheme: (theme) =>
    set((state) => ({ theme: { ...state.theme, ...theme } })),

  updateHeader: (header) =>
    set((state) => ({ data: { ...state.data, header } })),

  updateSummary: (summary) =>
    set((state) => ({ data: { ...state.data, summary } })),

  updateWorkExperience: (workExperience) =>
    set((state) => ({ data: { ...state.data, workExperience } })),

  updateEducation: (education) =>
    set((state) => ({ data: { ...state.data, education } })),

  updateSkills: (skills) =>
    set((state) => ({ data: { ...state.data, skills } })),

  updateProjects: (projects) =>
    set((state) => ({ data: { ...state.data, projects } })),

  updateCertifications: (certifications) =>
    set((state) => ({ data: { ...state.data, certifications } })),

  updateLanguages: (languages) =>
    set((state) => ({ data: { ...state.data, languages } })),

  updateCustom: (custom) =>
    set((state) => ({ data: { ...state.data, custom } })),

  setActiveSection: (activeSection) =>
    set({ activeSection, activeItemIndex: null }),

  setActiveItemIndex: (activeItemIndex) => set({ activeItemIndex }),
  setZoom: (zoom) => set({ zoom }),
}));
