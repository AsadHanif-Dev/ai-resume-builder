export type Experience = {
  id: string
  title: string
  company: string
  startDate?: string
  endDate?: string
  location?: string
  bullets: string[]
}

export type Education = {
  id: string
  school: string
  degree?: string
  startDate?: string
  endDate?: string
  gpa?: string
}

export type Project = {
  id: string
  name: string
  description?: string
  techStack?: string
  outcome?: string
  link?: string
}

export type Certification = {
  id: string
  name: string
  issuer: string
  year?: string
  link?: string
}

export type Achievement = {
  id: string
  title: string
  description?: string
  year?: string
}

export type Language = {
  id: string
  name: string
  proficiency: string // e.g., "Native", "Fluent", "Professional", "Intermediate", "Basic"
}

export type Publication = {
  id: string
  title: string
  publisher?: string
  year?: string
  link?: string
}

export type VolunteerExperience = {
  id: string
  role: string
  organization: string
  startDate?: string
  endDate?: string
  description?: string
}

export type Resume = {
  id: string
  name: string
  professionalTitle?: string
  email?: string
  phone?: string
  location?: string
  linkedin?: string
  portfolio?: string
  github?: string
  summary?: string
  experiences: Experience[]
  education: Education[]
  skills: string[]
  projects: Project[]
  certifications: Certification[]
  achievements: Achievement[]
  languages: Language[]
  publications: Publication[]
  volunteerExperiences: VolunteerExperience[]
  template?: 'modern' | 'minimal' | 'classic'
  updatedAt?: string
}

export const DEFAULT_RESUME: Resume = {
  id: 'local-resume',
  name: 'Your Name',
  professionalTitle: '',
  email: '',
  phone: '',
  location: '',
  linkedin: '',
  portfolio: '',
  github: '',
  summary: 'Experienced professional...',
  experiences: [],
  education: [],
  skills: [],
  projects: [],
  certifications: [],
  achievements: [],
  languages: [],
  publications: [],
  volunteerExperiences: [],
  template: 'modern',
  updatedAt: new Date().toISOString(),
}
