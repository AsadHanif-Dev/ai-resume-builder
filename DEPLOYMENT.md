# Deployment Guide - AI Resume Builder

This guide will help you deploy your AI Resume Builder to Vercel, the recommended hosting platform.

## Prerequisites

- GitHub account
- Vercel account (free tier is sufficient)
- OpenAI API key ([get one here](https://platform.openai.com/api-keys))

## Step-by-Step Deployment

### 1. Prepare Your Repository

1. **Create a GitHub repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Verify .gitignore**
   
   Ensure these are in your `.gitignore`:
   ```
   .env.local
   .env*.local
   node_modules/
   .next/
   .vercel/
   ```

### 2. Deploy to Vercel

#### Option A: One-Click Deploy

Click this button to deploy automatically:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/ai-resume-builder)

#### Option B: Manual Deploy

1. **Go to Vercel**
   - Visit [vercel.com](https://vercel.com/)
   - Sign in with your GitHub account

2. **Import Project**
   - Click "New Project"
   - Select "Import Git Repository"
   - Choose your `ai-resume-builder` repository

3. **Configure Project**
   - Framework Preset: **Next.js** (auto-detected)
   - Root Directory: `./` (default)
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)

4. **Add Environment Variables**
   
   Click "Environment Variables" and add:
   
   | Name | Value |
   |------|-------|
   | `OPENAI_API_KEY` | `sk-proj-your-actual-key` |
   | `OPENAI_MODEL` | `gpt-4o-mini` |
   
   ⚠️ **Important**: Keep these secret! Never commit them to git.

5. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes for build to complete
   - Your site will be live at `https://your-project.vercel.app`

### 3. Configure Custom Domain (Optional)

1. Go to your project dashboard
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

### 4. Enable Analytics (Optional)

Vercel provides free analytics:

1. Go to your project dashboard
2. Click "Analytics"
3. Enable Web Analytics
4. View traffic, performance metrics

## Environment Variables Reference

### Required

- **OPENAI_API_KEY**: Your OpenAI API key (required for AI features)
  - Get from: https://platform.openai.com/api-keys
  - Format: `sk-proj-xxxxxxxxxxxxx`
  - Cost: ~$0.01 per resume with GPT-4o-mini

### Optional

- **OPENAI_MODEL**: OpenAI model to use
  - Default: `gpt-4o-mini`
  - Options: `gpt-4o-mini`, `gpt-4o`, `gpt-4-turbo`
  - Recommendation: Use `gpt-4o-mini` for cost efficiency

- **NEXT_PUBLIC_OPENAI_API_KEY**: Client-side API key
  - ⚠️ **NOT RECOMMENDED for production**
  - Only use for testing
  - Will be exposed in browser

## Continuous Deployment

Vercel automatically deploys on every push to your main branch:

1. Make changes locally
2. Commit and push:
   ```bash
   git add .
   git commit -m "Update feature"
   git push
   ```
3. Vercel automatically builds and deploys
4. View deployment status in Vercel dashboard

## Troubleshooting

### Build Failures

**Error: Missing environment variables**
- Add `OPENAI_API_KEY` in Vercel dashboard
- Redeploy from dashboard

**Error: Module not found**
- Check `package.json` dependencies
- Run `npm install` locally to test
- Commit `package-lock.json`

**Error: TypeScript errors**
- Run `npm run build` locally
- Fix TypeScript errors
- Push fixes

### Runtime Errors

**AI features not working**
- Verify environment variables in Vercel
- Check OpenAI API key is valid
- Check OpenAI account has credits
- View logs in Vercel dashboard

**PDF export failing**
- Check browser compatibility
- Try different browser
- Clear browser cache

**Resume not saving**
- localStorage might be disabled
- Check browser privacy settings
- Try incognito/private mode

## Performance Optimization

### Vercel Configuration

Create `vercel.json` in root:

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        }
      ]
    }
  ]
}
```

### Edge Functions

API routes automatically run on Vercel Edge Network for low latency worldwide.

### Caching

Static pages are automatically cached. Dynamic pages use ISR (Incremental Static Regeneration).

## Monitoring

### View Logs

1. Go to Vercel dashboard
2. Select your project
3. Click "Deployments"
4. Click any deployment
5. View "Functions" logs

### Set Up Alerts

1. Go to project settings
2. Click "Notifications"
3. Add email or Slack webhook
4. Configure alerts for:
   - Deployment failures
   - Performance issues
   - Error spikes

## Cost Estimation

### Vercel (Hosting)
- **Free Tier**: Perfect for personal use
  - 100GB bandwidth/month
  - Unlimited sites
  - Automatic SSL

### OpenAI API
- **GPT-4o-mini**: ~$0.01 per resume
- **Monthly estimate**: $1-5 for typical use
- **Recommendation**: Set usage limits in OpenAI dashboard

## Security Best Practices

1. ✅ **Never commit `.env.local`**
2. ✅ **Use server-side API routes only**
3. ✅ **Rotate API keys periodically**
4. ✅ **Set OpenAI usage limits**
5. ✅ **Enable Vercel security headers**
6. ✅ **Use environment-specific keys**

## Scaling

The app is designed to scale automatically:

- **Vercel Edge**: Auto-scales globally
- **Serverless Functions**: Scale to zero when not used
- **LocalStorage**: No database bottlenecks
- **Static Generation**: Fast page loads

## Support

- **Vercel Docs**: https://vercel.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **OpenAI Docs**: https://platform.openai.com/docs

## Checklist

Before going live:

- [ ] Environment variables configured
- [ ] OpenAI API key tested
- [ ] Custom domain configured (optional)
- [ ] Analytics enabled
- [ ] Error monitoring set up
- [ ] Tested on mobile devices
- [ ] Tested PDF export
- [ ] Tested AI features
- [ ] README updated with your domain
- [ ] Terms of service added (if collecting data)

---

**Your app is now live! 🎉**

Share it with the world and help job seekers create amazing resumes.
