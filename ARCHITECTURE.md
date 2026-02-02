# 🏗️ Architecture Overview - AI Resume Builder

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         Client Side                          │
├─────────────────────────────────────────────────────────────┤
│  Browser (React/Next.js)                                     │
│  ├─ UI Components (Resume Editor, Preview, Templates)       │
│  ├─ State Management (Zustand Store)                        │
│  ├─ Local Storage (Resume Data, Versions)                   │
│  └─ PDF Generation (html2canvas + jsPDF)                    │
└────────────────┬────────────────────────────────────────────┘
                 │
                 │ HTTPS
                 │
┌────────────────▼────────────────────────────────────────────┐
│                      Server Side (Vercel)                    │
├─────────────────────────────────────────────────────────────┤
│  Next.js API Routes (Edge Functions)                        │
│  ├─ /api/ai          - AI text generation                   │
│  ├─ /api/chat        - Streaming chat responses             │
│  └─ Rate limiting, error handling                           │
└────────────────┬────────────────────────────────────────────┘
                 │
                 │ HTTPS
                 │
┌────────────────▼────────────────────────────────────────────┐
│                      External APIs                           │
├─────────────────────────────────────────────────────────────┤
│  OpenAI API                                                  │
│  ├─ GPT-4o-mini model                                       │
│  ├─ Text generation & rewriting                             │
│  └─ Streaming responses                                     │
└─────────────────────────────────────────────────────────────┘
```

## Data Flow

### Resume Building Flow
```
User Input → Form Component → Zustand Store → Local Storage
                                     ↓
                              Live Preview
                                     ↓
                              Template Renderer
                                     ↓
                              PDF Export
```

### AI Enhancement Flow
```
User Request → API Route → OpenAI API → Response
                                           ↓
                                    Format & Validate
                                           ↓
                                    Update Resume State
                                           ↓
                                    Save to Local Storage
```

## Core Components

### Frontend (`src/app/`)

#### Pages
- **`page.tsx`**: Landing page with features, pricing
- **`builder/page.tsx`**: Main resume builder interface
- **`chat/page.tsx`**: AI chat assistant
- **`dashboard/page.tsx`**: Saved resumes management
- **`templates/page.tsx`**: Template showcase
- **`pricing/page.tsx`**: Pricing information

#### Components (`src/components/`)

**Editor Components**
- `ResumeEditor.tsx`: Main form with all input fields
- `EditorLayout.tsx`: Layout wrapper with sidebar/preview
- `EditsModal.tsx`: Modal for AI-suggested edits
- `TemplateSelector.tsx`: Template picker

**Display Components**
- `Preview.tsx`: Live resume preview
- `templates/ModernTemplate.tsx`: Modern design
- `templates/MinimalTemplate.tsx`: Minimal design
- `templates/ClassicTemplate.tsx`: Classic design

### Backend (`src/app/api/`)

#### API Routes

**`/api/ai` (POST)**
- Handles AI text generation
- Actions: rewrite-bullets, generate-summary, extract-keywords, etc.
- Returns JSON response

```typescript
POST /api/ai
Body: {
  action: "rewrite-bullets",
  data: { bullets: ["..."] }
}
Response: {
  result: "AI generated text"
}
```

**`/api/chat` (POST)**
- Streaming chat responses
- Server-sent events (SSE)
- Maintains conversation context

```typescript
POST /api/chat
Body: {
  messages: [{ role: "user", content: "..." }]
}
Response: Stream of text chunks
```

### State Management (`src/lib/store.ts`)

**Zustand Store**
```typescript
{
  resume: Resume,           // Current resume data
  savedResumes: Resume[],   // All saved versions
  setResume: () => void,    // Update current resume
  saveVersion: () => void,  // Save new version
  loadVersion: () => void,  // Load saved version
  // ... more actions
}
```

**Persistence**
- Automatic save to localStorage
- Key: `ai-resume:resume` (current)
- Key: `ai-resume:versions` (saved versions)

### Utilities (`src/lib/`)

**`types.ts`**
- TypeScript interfaces
- Resume, Experience, Education, Project, etc.

**`validation.ts`**
- Zod schemas for validation
- Form validation rules

**`ats.ts`**
- ATS scoring algorithm
- Keyword extraction
- Resume matching logic

**`export.ts`**
- PDF generation
- High-quality rendering
- Multi-page support

**`parser.ts`**
- Resume file parsing
- JSON, TXT support
- Text extraction logic

**`utils.ts`**
- Helper functions
- Date formatting
- Utility methods

## Key Design Decisions

### No Database
**Why?** 
- Simplicity: No backend infrastructure
- Privacy: Data stays in browser
- Cost: Free to run
- Speed: No network latency

**How?**
- LocalStorage for persistence
- Zustand for state management
- Export/import for backup

### Server-Side AI Only
**Why?**
- Security: API keys never exposed
- Cost control: Rate limiting possible
- Flexibility: Easy to switch providers

**Implementation**
- API routes handle AI calls
- Client sends minimal data
- Streaming for real-time feedback

### Client-Side PDF Generation
**Why?**
- No server processing needed
- Works offline
- Instant generation

**How?**
- html2canvas captures preview
- jsPDF creates PDF
- High-quality rendering (3x scale)

### Template System
**Why?**
- Professional designs
- Easy customization
- Consistent rendering

**Structure**
- React components
- Shared Resume interface
- CSS for print optimization

## Performance Optimizations

### Bundle Size
- Tree shaking with Next.js
- Code splitting by route
- Dynamic imports for heavy components

### Loading Speed
- Static page generation
- Optimized images
- Minimal dependencies

### Runtime Performance
- React memoization
- Debounced autosave
- Lazy loading

## Security Measures

### API Keys
- Server-side only
- Environment variables
- Never in client code

### Input Validation
- Zod schemas
- Client & server validation
- Sanitization

### Headers
- CSP headers
- CORS configuration
- XSS protection

## Scalability

### Horizontal Scaling
- Stateless API routes
- Edge deployment (Vercel)
- No database bottlenecks

### Cost Efficiency
- Pay-per-use API calls
- No server costs (Vercel free tier)
- Minimal OpenAI usage

### Global Distribution
- Edge functions worldwide
- CDN for static assets
- Low latency everywhere

## Extension Points

### Adding Features
```typescript
// 1. Add new API route
// src/app/api/feature/route.ts
export async function POST(req) {
  // Implementation
}

// 2. Create UI component
// src/components/Feature.tsx
export default function Feature() {
  // Implementation
}

// 3. Add to store (if needed)
// src/lib/store.ts
addFeature: (data) => set(...)
```

### Adding Templates
```typescript
// 1. Create template component
// src/components/templates/NewTemplate.tsx
export default function NewTemplate({ resume }) {
  return <div>{/* Design */}</div>
}

// 2. Update selector
// src/components/TemplateSelector.tsx
const templates = [..., { id: 'new', name: 'New' }]

// 3. Update preview
// src/components/Preview.tsx
{resume.template === 'new' && <NewTemplate />}
```

### Custom AI Prompts
```typescript
// src/app/api/ai/route.ts
case 'custom-action':
  systemPrompt = 'Your instructions...'
  userPrompt = `Your prompt with ${data.input}`
  break
```

## Testing Strategy

### Unit Tests
- Component rendering
- State management
- Utility functions

### Integration Tests
- API routes
- Form submission
- PDF generation

### E2E Tests
- Full user workflows
- Cross-browser testing
- Mobile responsiveness

## Monitoring

### Metrics to Track
- API response times
- Error rates
- PDF generation success
- User engagement

### Logging
- API route logs (Vercel)
- Client errors (console)
- OpenAI API costs

### Analytics
- Vercel Analytics
- Custom event tracking
- Performance monitoring

## Future Architecture

### Potential Enhancements
- **Database**: Add PostgreSQL for sharing
- **Authentication**: NextAuth for user accounts
- **Collaboration**: Real-time editing
- **Templates**: User-created templates
- **Analytics**: Resume performance tracking

### Maintaining Simplicity
- Keep core features database-free
- Optional premium features with DB
- Progressive enhancement approach

---

**Built for simplicity, designed for scale.**

This architecture supports thousands of users while maintaining zero server costs and maximum privacy.
