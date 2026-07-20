import { z } from "zod";

export const headerSchema = z.object({
  name: z.string().min(1, "Name is required."),
  headline: z.string().min(1, "Professional headline is required."),
  email: z.string().email("Please enter a valid email address."),
  phone: z.string().min(1, "Phone number is required."),
  location: z.string().min(1, "Location is required."),
  website: z.string().url("Please enter a valid URL.").or(z.literal("")),
  github: z.string().url("Please enter a valid GitHub profile URL.").or(z.literal("")),
  linkedin: z.string().url("Please enter a valid LinkedIn profile URL.").or(z.literal("")),
});

export const summarySchema = z.object({
  body: z.string().max(1000, "Summary must be under 1000 characters."),
});

export const experienceSchema = z.object({
  company: z.string().min(1, "Company name is required."),
  title: z.string().min(1, "Job title is required."),
  location: z.string().optional(),
  startDate: z.string().min(1, "Start date is required."),
  endDate: z.string().or(z.literal("")),
  current: z.boolean().default(false),
  bullets: z.array(z.string().min(1, "Bullet point cannot be empty.")),
});

export const educationSchema = z.object({
  school: z.string().min(1, "School name is required."),
  degree: z.string().min(1, "Degree is required."),
  fieldOfStudy: z.string().min(1, "Field of study is required."),
  location: z.string().optional(),
  startDate: z.string().min(1, "Start date is required."),
  endDate: z.string().or(z.literal("")),
  gpa: z.string().optional(),
  bullets: z.array(z.string()).optional(),
});

export const skillSchema = z.object({
  name: z.string().min(1, "Skill name is required."),
  level: z.enum(["beginner", "intermediate", "advanced", "expert"]).optional(),
});

export const skillGroupSchema = z.object({
  category: z.string().min(1, "Category title is required."),
  skills: z.array(skillSchema).min(1, "At least one skill is required in category."),
});

export const projectSchema = z.object({
  title: z.string().min(1, "Project title is required."),
  description: z.string().min(1, "Description is required."),
  url: z.string().url("Please enter a valid URL.").or(z.literal("")),
  tech: z.array(z.string()).optional(),
  bullets: z.array(z.string().min(1, "Bullet point cannot be empty.")),
});

export const certificationSchema = z.object({
  name: z.string().min(1, "Certification name is required."),
  issuer: z.string().min(1, "Issuer is required."),
  date: z.string().min(1, "Date is required."),
  url: z.string().url("Please enter a valid URL.").or(z.literal("")),
});

export const languageSchema = z.object({
  name: z.string().min(1, "Language name is required."),
  proficiency: z.string().min(1, "Proficiency level is required."),
});

export const customSectionSchema = z.object({
  title: z.string().min(1, "Section title is required."),
  body: z.string().min(1, "Section content is required."),
});

export const resumeDataSchema = z.object({
  header: headerSchema.optional(),
  summary: summarySchema.optional(),
  workExperience: z.array(experienceSchema).optional(),
  education: z.array(educationSchema).optional(),
  skills: z.array(skillGroupSchema).optional(),
  projects: z.array(projectSchema).optional(),
  certifications: z.array(certificationSchema).optional(),
  languages: z.array(languageSchema).optional(),
  custom: z.array(customSectionSchema).optional(),
});

export type ResumeDataInput = z.infer<typeof resumeDataSchema>;
