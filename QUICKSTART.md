# 🚀 Quick Start Guide - AI Resume Builder

Get your AI Resume Builder running in 5 minutes!

## ⚡ Super Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Create environment file
cp .env.example .env.local

# 3. Add your OpenAI API key to .env.local
# OPENAI_API_KEY=sk-your-key-here

# 4. Run development server
npm run dev

# 5. Open browser
# Visit http://localhost:3000
```

## 📋 What You Get

### Pages Available

| Route | Purpose |
|-------|---------|
| `/` | Landing page with features overview |
| `/builder` | Main resume builder interface |
| `/chat` | AI chat assistant for resume help |
| `/dashboard` | View and manage saved resumes |
| `/templates` | Preview available templates |
| `/pricing` | Pricing information (free!) |

### Features Ready to Use

✅ **AI-Powered Writing**
- Generate professional summaries
- Rewrite bullets for impact
- Quantify achievements
- Extract job keywords

✅ **Resume Building**
- Add experiences, education, skills, projects
- Real-time preview
- Multiple professional templates
- Auto-save to browser

✅ **ATS Optimization**
- Score your resume
- Extract keywords from job descriptions
- Get improvement suggestions
- Optimize for better matching

✅ **Export & Save**
- High-quality PDF export
- Save multiple versions
- Local storage (no signup needed)
- Download as JSON or TXT

## 🔑 Getting Your OpenAI API Key

1. Go to https://platform.openai.com
2. Sign up or log in
3. Go to API Keys section
4. Click "Create new secret key"
5. Copy the key (starts with `sk-`)
6. Paste in `.env.local`

**Cost**: GPT-4o-mini costs ~$0.01 per resume. Very affordable!

## 🎯 First Steps

### 1. Start the Builder

Navigate to `/builder` and you'll see:
- Form to enter personal info
- Sections for experiences, education, skills
- AI buttons to enhance content
- Live preview on the right

### 2. Add Your Information

Fill in:
- Name, email, phone, location
- Professional summary
- Work experiences (with bullet points)
- Education
- Skills (comma-separated)
- Projects (optional)

### 3. Use AI Features

**Generate Summary**: Click "Generate with AI" next to summary field

**Rewrite Bullets**: Add experience bullets, then click "Rewrite bullets (AI)"

**Analyze Job**: Paste a job description, click "Analyze" to get:
- ATS compatibility score
- Matching keywords
- Improvement suggestions

### 4. Choose Template

Select from three professional templates:
- **Modern**: Clean with blue accents (best for tech)
- **Minimal**: Elegant simplicity (best for creative)
- **Classic**: Traditional professional (best for corporate)

### 5. Export

- **Save**: Stores locally in your browser
- **Export PDF**: Downloads high-quality PDF
- **Save Version**: Creates named version in dashboard

## 💡 Pro Tips

### Writing Better Bullets

❌ Bad: "Worked on frontend features"

✅ Good: "Developed 15+ responsive React components, improving user engagement by 35%"

Use AI to help! Just enter basic bullet and click "Rewrite bullets"

### ATS Optimization

1. Paste job description in analyzer
2. Note the keywords extracted
3. Click "Apply keywords to skills" to add them
4. Aim for 70%+ ATS score

### Using AI Chat

Ask questions like:
- "How can I make my bullet points more impactful?"
- "Review my resume and suggest improvements"
- "What keywords should I add for a software engineer role?"

### Saving Multiple Versions

Create different versions for different jobs:
1. Build base resume
2. Click "Save Version" and name it (e.g., "Software Engineer - Google")
3. Tailor for next job
4. Save as new version
5. Access all versions in `/dashboard`

## 🎨 Customization

### Change Templates

Edit files in `src/components/templates/`:
- `ModernTemplate.tsx` - Modern design
- `MinimalTemplate.tsx` - Minimal design
- `ClassicTemplate.tsx` - Classic design

### Adjust AI Prompts

Edit `src/app/api/ai/route.ts` to customize:
- How AI rewrites bullets
- Summary generation style
- Keyword extraction logic

### Modify Styling

All styles use Tailwind CSS. Edit component files directly:
- Change colors, fonts, spacing
- Tailwind classes are inline
- Dark mode automatically supported

## 🐛 Common Issues

**"AI is disabled" message**
- Add `OPENAI_API_KEY` to `.env.local`
- Restart dev server (`npm run dev`)

**PDF not downloading**
- Make sure preview is fully rendered
- Try different browser
- Check browser's download settings

**Resume not saving**
- Check browser allows localStorage
- Try incognito mode
- Different browser

**Build errors**
```bash
# Clear cache and reinstall
rm -rf .next node_modules package-lock.json
npm install
npm run dev
```

## 📱 Mobile Testing

The app is fully responsive! Test on:
- Open `http://localhost:3000` on phone
- Use browser dev tools (F12) → Device toolbar
- All features work on mobile

## 🚀 Going to Production

Ready to deploy? See [DEPLOYMENT.md](./DEPLOYMENT.md) for:
- Deploying to Vercel (recommended)
- Environment variables setup
- Custom domain configuration
- Performance optimization
- Monitoring and logging

## 📚 Learn More

- **Next.js Docs**: https://nextjs.org/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **OpenAI API**: https://platform.openai.com/docs
- **Vercel Deployment**: https://vercel.com/docs

## 🆘 Need Help?

1. Check [README.md](./README.md) for detailed documentation
2. Review [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment help
3. Open an issue on GitHub
4. Check browser console for errors (F12)

## ✨ Next Steps

Once you're comfortable:

1. ⭐ Star the repo if you find it useful
2. 🎨 Customize the design to your liking
3. 🚀 Deploy to Vercel and share with friends
4. 💬 Add your own AI prompts and features
5. 🤝 Contribute improvements back to the project

---

**Happy resume building! 🎉**

Your perfect job is just a great resume away.
