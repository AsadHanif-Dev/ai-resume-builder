# Deploy to Vercel - One Click Guide

Your code is now on GitHub! ✅
**Repository**: https://github.com/AsadHanif-Dev/ai-resume-builder

## Deploy in 3 Easy Steps:

### 1. Go to Vercel
Visit: https://vercel.com/new

### 2. Import Your GitHub Repository
- Click "Import Git Repository"
- Select `AsadHanif-Dev/ai-resume-builder`
- Vercel will auto-detect it's a Next.js app

### 3. Configure & Deploy
- **Framework Preset**: Next.js (auto-detected)
- **Root Directory**: `./` (default)
- **Build Command**: `npm run build` (auto-detected)
- **Output Directory**: `.next` (auto-detected)

#### Environment Variables (Important!)
Add these in the "Environment Variables" section:
```
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_MODEL=gpt-4o-mini
```

### 4. Click "Deploy"
That's it! Vercel will build and deploy your app in 2-3 minutes.

## After Deployment:
- Your live URL will be: `https://ai-resume-builder-[random].vercel.app`
- You can customize the domain in Vercel settings
- Every push to `master` branch auto-deploys

## Direct Link:
Click here to deploy now: https://vercel.com/new/clone?repository-url=https://github.com/AsadHanif-Dev/ai-resume-builder

---

**Note**: If you don't have an OpenAI API key yet, the app will still work for manual editing - just the AI features won't be available.
