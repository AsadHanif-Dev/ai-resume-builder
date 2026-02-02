import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { Resume, DEFAULT_RESUME, Experience, Education, Project, Certification, Achievement, Language, Publication, VolunteerExperience } from './types'

type SavedResume = Resume & { savedAt: string }

type State = {
  resume: Resume
  savedResumes: SavedResume[]
  setResume: (r: Partial<Resume>) => void
  reset: () => void
  addExperience: (exp: Experience) => void
  updateExperience: (id: string, patch: Partial<Experience>) => void
  removeExperience: (id: string) => void
  addEducation: (e: Education) => void
  updateEducation: (id: string, patch: Partial<Education>) => void
  removeEducation: (id: string) => void
  addProject: (p: Project) => void
  updateProject: (id: string, patch: Partial<Project>) => void
  removeProject: (id: string) => void
  addCertification: (c: Certification) => void
  updateCertification: (id: string, patch: Partial<Certification>) => void
  removeCertification: (id: string) => void
  addAchievement: (a: Achievement) => void
  updateAchievement: (id: string, patch: Partial<Achievement>) => void
  removeAchievement: (id: string) => void
  addLanguage: (l: Language) => void
  updateLanguage: (id: string, patch: Partial<Language>) => void
  removeLanguage: (id: string) => void
  addPublication: (p: Publication) => void
  updatePublication: (id: string, patch: Partial<Publication>) => void
  removePublication: (id: string) => void
  addVolunteerExperience: (v: VolunteerExperience) => void
  updateVolunteerExperience: (id: string, patch: Partial<VolunteerExperience>) => void
  removeVolunteerExperience: (id: string) => void
  saveToLocal: () => void
  loadFromLocal: () => void
  saveVersion: (name?: string) => void
  loadVersion: (id: string) => void
  deleteVersion: (id: string) => void
  loadSavedResumes: () => void
}

const LOCAL_KEY = 'ai-resume:resume'
const VERSIONS_KEY = 'ai-resume:versions'

export const useResumeStore = create<State>()(
  devtools((set, get) => ({
    resume: DEFAULT_RESUME,
    savedResumes: [],
    
    setResume: (partial) => set((s) => ({ 
      resume: { ...s.resume, ...partial, updatedAt: new Date().toISOString() } 
    })),
    
    reset: () => set({ resume: { ...DEFAULT_RESUME, id: `resume_${Date.now()}` } }),
    
    addExperience: (exp) => set((s) => ({ 
      resume: { ...s.resume, experiences: [...s.resume.experiences, exp], updatedAt: new Date().toISOString() } 
    })),
    
    updateExperience: (id, patch) => set((s) => ({ 
      resume: { 
        ...s.resume, 
        experiences: s.resume.experiences.map(e => e.id === id ? { ...e, ...patch } : e), 
        updatedAt: new Date().toISOString() 
      } 
    })),
    
    removeExperience: (id) => set((s) => ({ 
      resume: { 
        ...s.resume, 
        experiences: s.resume.experiences.filter(e => e.id !== id), 
        updatedAt: new Date().toISOString() 
      } 
    })),
    
    addEducation: (e) => set((s) => ({ 
      resume: { ...s.resume, education: [...s.resume.education, e], updatedAt: new Date().toISOString() } 
    })),
    
    updateEducation: (id, patch) => set((s) => ({
      resume: {
        ...s.resume,
        education: s.resume.education.map(e => e.id === id ? { ...e, ...patch } : e),
        updatedAt: new Date().toISOString()
      }
    })),
    
    removeEducation: (id) => set((s) => ({
      resume: {
        ...s.resume,
        education: s.resume.education.filter(e => e.id !== id),
        updatedAt: new Date().toISOString()
      }
    })),
    
    addProject: (p) => set((s) => ({ 
      resume: { ...s.resume, projects: [...s.resume.projects, p], updatedAt: new Date().toISOString() } 
    })),
    
    updateProject: (id, patch) => set((s) => ({
      resume: {
        ...s.resume,
        projects: s.resume.projects.map(p => p.id === id ? { ...p, ...patch } : p),
        updatedAt: new Date().toISOString()
      }
    })),
    
    removeProject: (id) => set((s) => ({
      resume: {
        ...s.resume,
        projects: s.resume.projects.filter(p => p.id !== id),
        updatedAt: new Date().toISOString()
      }
    })),
    
    addCertification: (c) => set((s) => ({ 
      resume: { ...s.resume, certifications: [...s.resume.certifications, c], updatedAt: new Date().toISOString() } 
    })),
    
    updateCertification: (id, patch) => set((s) => ({
      resume: {
        ...s.resume,
        certifications: s.resume.certifications.map(c => c.id === id ? { ...c, ...patch } : c),
        updatedAt: new Date().toISOString()
      }
    })),
    
    removeCertification: (id) => set((s) => ({
      resume: {
        ...s.resume,
        certifications: s.resume.certifications.filter(c => c.id !== id),
        updatedAt: new Date().toISOString()
      }
    })),
    
    addAchievement: (a) => set((s) => ({ 
      resume: { ...s.resume, achievements: [...s.resume.achievements, a], updatedAt: new Date().toISOString() } 
    })),
    
    updateAchievement: (id, patch) => set((s) => ({
      resume: {
        ...s.resume,
        achievements: s.resume.achievements.map(a => a.id === id ? { ...a, ...patch } : a),
        updatedAt: new Date().toISOString()
      }
    })),
    
    removeAchievement: (id) => set((s) => ({
      resume: {
        ...s.resume,
        achievements: s.resume.achievements.filter(a => a.id !== id),
        updatedAt: new Date().toISOString()
      }
    })),
    
    addLanguage: (l) => set((s) => ({ 
      resume: { ...s.resume, languages: [...s.resume.languages, l], updatedAt: new Date().toISOString() } 
    })),
    
    updateLanguage: (id, patch) => set((s) => ({
      resume: {
        ...s.resume,
        languages: s.resume.languages.map(l => l.id === id ? { ...l, ...patch } : l),
        updatedAt: new Date().toISOString()
      }
    })),
    
    removeLanguage: (id) => set((s) => ({
      resume: {
        ...s.resume,
        languages: s.resume.languages.filter(l => l.id !== id),
        updatedAt: new Date().toISOString()
      }
    })),
    
    addPublication: (p) => set((s) => ({ 
      resume: { ...s.resume, publications: [...s.resume.publications, p], updatedAt: new Date().toISOString() } 
    })),
    
    updatePublication: (id, patch) => set((s) => ({
      resume: {
        ...s.resume,
        publications: s.resume.publications.map(p => p.id === id ? { ...p, ...patch } : p),
        updatedAt: new Date().toISOString()
      }
    })),
    
    removePublication: (id) => set((s) => ({
      resume: {
        ...s.resume,
        publications: s.resume.publications.filter(p => p.id !== id),
        updatedAt: new Date().toISOString()
      }
    })),
    
    addVolunteerExperience: (v) => set((s) => ({ 
      resume: { ...s.resume, volunteerExperiences: [...s.resume.volunteerExperiences, v], updatedAt: new Date().toISOString() } 
    })),
    
    updateVolunteerExperience: (id, patch) => set((s) => ({
      resume: {
        ...s.resume,
        volunteerExperiences: s.resume.volunteerExperiences.map(v => v.id === id ? { ...v, ...patch } : v),
        updatedAt: new Date().toISOString()
      }
    })),
    
    removeVolunteerExperience: (id) => set((s) => ({
      resume: {
        ...s.resume,
        volunteerExperiences: s.resume.volunteerExperiences.filter(v => v.id !== id),
        updatedAt: new Date().toISOString()
      }
    })),
    
    saveToLocal: () => {
      try {
        const val = JSON.stringify(get().resume)
        localStorage.setItem(LOCAL_KEY, val)
      } catch (e) { console.error(e) }
    },
    
    loadFromLocal: () => {
      try {
        const raw = localStorage.getItem(LOCAL_KEY)
        if (raw) {
          const parsed = JSON.parse(raw) as Resume
          // Merge with DEFAULT_RESUME to ensure all fields exist (migration for new sections)
          set({ resume: { ...DEFAULT_RESUME, ...parsed } })
        }
      } catch (e) { console.error(e) }
    },
    
    saveVersion: (name?: string) => {
      try {
        const current = get().resume
        const savedResume: SavedResume = {
          ...current,
          id: `resume_${Date.now()}`,
          name: name || current.name || 'Untitled Resume',
          savedAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
        
        const existing = get().savedResumes
        const updated = [savedResume, ...existing]
        
        localStorage.setItem(VERSIONS_KEY, JSON.stringify(updated))
        set({ savedResumes: updated })
      } catch (e) { console.error(e) }
    },
    
    loadVersion: (id: string) => {
      const saved = get().savedResumes.find(r => r.id === id)
      if (saved) {
        // Merge with DEFAULT_RESUME to ensure all fields exist (migration for new sections)
        set({ resume: { ...DEFAULT_RESUME, ...saved, updatedAt: new Date().toISOString() } })
      }
    },
    
    deleteVersion: (id: string) => {
      try {
        const updated = get().savedResumes.filter(r => r.id !== id)
        localStorage.setItem(VERSIONS_KEY, JSON.stringify(updated))
        set({ savedResumes: updated })
      } catch (e) { console.error(e) }
    },
    
    loadSavedResumes: () => {
      try {
        const raw = localStorage.getItem(VERSIONS_KEY)
        if (raw) {
          const parsed = JSON.parse(raw) as SavedResume[]
          set({ savedResumes: parsed })
        }
      } catch (e) { console.error(e) }
    }
  }))
)
