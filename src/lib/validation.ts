import { z } from 'zod'

export const experienceSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'Title is required'),
  company: z.string().min(1, 'Company is required'),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  location: z.string().optional(),
  bullets: z.array(z.string()).default([])
})

export const educationSchema = z.object({
  id: z.string(),
  school: z.string().min(1, 'School is required'),
  degree: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  gpa: z.string().optional()
})

export const projectSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Project name is required'),
  description: z.string().optional(),
  techStack: z.string().optional(),
  outcome: z.string().optional(),
  link: z.string().url('Must be valid URL').or(z.literal('')).optional()
})

export const certificationSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Certification name is required'),
  issuer: z.string().min(1, 'Issuer is required'),
  year: z.string().optional(),
  link: z.string().url('Must be valid URL').or(z.literal('')).optional()
})

export const achievementSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'Achievement title is required'),
  description: z.string().optional(),
  year: z.string().optional()
})

export const languageSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Language name is required'),
  proficiency: z.enum(['Native', 'Fluent', 'Professional', 'Intermediate', 'Basic'])
})

export const publicationSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'Publication title is required'),
  publisher: z.string().optional(),
  year: z.string().optional(),
  link: z.string().url('Must be valid URL').or(z.literal('')).optional()
})

export const volunteerExperienceSchema = z.object({
  id: z.string(),
  role: z.string().min(1, 'Role is required'),
  organization: z.string().min(1, 'Organization is required'),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  description: z.string().optional()
})

export const resumeSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Name is required'),
  professionalTitle: z.string().optional(),
  email: z.string().email('Invalid email').or(z.literal('')).optional(),
  phone: z.string().optional(),
  location: z.string().optional(),
  linkedin: z.string().url('Must be valid URL').or(z.literal('')).optional(),
  portfolio: z.string().url('Must be valid URL').or(z.literal('')).optional(),
  github: z.string().url('Must be valid URL').or(z.literal('')).optional(),
  summary: z.string().optional(),
  experiences: z.array(experienceSchema).default([]),
  education: z.array(educationSchema).default([]),
  skills: z.array(z.string()).default([]),
  projects: z.array(projectSchema).default([]),
  certifications: z.array(certificationSchema).default([]),
  achievements: z.array(achievementSchema).default([]),
  languages: z.array(languageSchema).default([]),
  publications: z.array(publicationSchema).default([]),
  volunteerExperiences: z.array(volunteerExperienceSchema).default([]),
  template: z.enum(['modern', 'minimal', 'classic']).default('modern'),
  updatedAt: z.string().optional()
})

export type ResumeFormData = z.infer<typeof resumeSchema>
