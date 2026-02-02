export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-zinc-950 text-zinc-900 dark:text-zinc-50">
      <header className="max-w-7xl mx-auto p-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="text-2xl">📄</div>
          <h2 className="text-2xl font-semibold">AI Resume Builder</h2>
        </div>
        <nav className="flex items-center gap-4">
          <a href="/builder" className="font-medium hover:text-blue-600">Builder</a>
          <a href="/chat" className="font-medium hover:text-blue-600">AI Chat</a>
          <a href="/dashboard" className="font-medium hover:text-blue-600">Dashboard</a>
          <a href="/templates" className="font-medium hover:text-blue-600">Templates</a>
          <a href="/pricing" className="font-medium hover:text-blue-600">Pricing</a>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-16">
        <section className="grid gap-12 md:grid-cols-2 items-center mb-20">
          <div>
            <h1 className="text-5xl font-bold leading-tight mb-4">
              Build an <span className="text-blue-600">ATS-friendly</span> resume in minutes with AI
            </h1>
            <p className="mt-6 text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed">
              Rewrite bullets, generate summaries, extract ATS keywords, quantify achievements, and export to PDF — all powered by AI, right in your browser.
            </p>
            <div className="mt-8 flex gap-4">
              <a href="/builder" className="rounded-lg bg-blue-600 text-white px-6 py-3 font-medium hover:bg-blue-700 transition-colors">
                Get started — it's free
              </a>
              <a href="#how" className="rounded-lg border-2 border-zinc-300 dark:border-zinc-700 px-6 py-3 font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                How it works
              </a>
            </div>
            <ul className="mt-10 space-y-3">
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>AI-powered rewriting & ATS optimization</span>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Live preview with multiple professional templates</span>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Save locally, export to PDF, no signup required</span>
              </li>
            </ul>
          </div>
          <div className="rounded-xl border-2 border-zinc-200 dark:border-zinc-800 p-6 bg-white dark:bg-zinc-900 shadow-2xl">
            <div className="h-[500px] flex items-center justify-center text-zinc-400 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
              <div className="text-center">
                <div className="text-6xl mb-4">📄</div>
                <p className="text-sm">Professional resume preview</p>
                <a href="/builder" className="mt-4 inline-block text-blue-600 hover:underline">Open builder to try →</a>
              </div>
            </div>
          </div>
        </section>

        <section id="how" className="mb-20">
          <h3 className="text-3xl font-semibold mb-8 text-center">How it works</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700">
              <div className="text-4xl mb-4">✍️</div>
              <h4 className="font-semibold text-xl mb-2">1. Enter your info</h4>
              <p className="text-zinc-600 dark:text-zinc-400">
                Add your experiences, education, and skills. Upload an existing resume or start from scratch.
              </p>
            </div>
            <div className="p-6 bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700">
              <div className="text-4xl mb-4">🤖</div>
              <h4 className="font-semibold text-xl mb-2">2. Let AI optimize</h4>
              <p className="text-zinc-600 dark:text-zinc-400">
                Use AI to rewrite bullets, generate summaries, and tailor content to job descriptions for better ATS scores.
              </p>
            </div>
            <div className="p-6 bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700">
              <div className="text-4xl mb-4">📥</div>
              <h4 className="font-semibold text-xl mb-2">3. Export & apply</h4>
              <p className="text-zinc-600 dark:text-zinc-400">
                Choose from professional templates, export to PDF, and start applying with confidence.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-20">
          <h3 className="text-3xl font-semibold mb-8 text-center">Features</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: '🎯', title: 'ATS Optimization', desc: 'Score and optimize your resume for Applicant Tracking Systems' },
              { icon: '✨', title: 'AI Rewriting', desc: 'Transform bullets into impact-driven achievements' },
              { icon: '📊', title: 'Job Matching', desc: 'Tailor your resume to specific job descriptions' },
              { icon: '💾', title: 'Version Control', desc: 'Save and manage multiple resume versions' },
              { icon: '🎨', title: 'Templates', desc: 'Choose from Modern, Minimal, and Classic designs' },
              { icon: '💬', title: 'AI Chat', desc: 'Get personalized resume advice from AI assistant' }
            ].map((feature, i) => (
              <div key={i} className="flex gap-4 p-4 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                <div className="text-3xl">{feature.icon}</div>
                <div>
                  <h4 className="font-semibold mb-1">{feature.title}</h4>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="pricing" className="text-center mb-20">
          <h3 className="text-3xl font-semibold mb-4">Simple, transparent pricing</h3>
          <p className="text-zinc-600 dark:text-zinc-300 mb-8 max-w-2xl mx-auto">
            This app is completely free to use. All features (editor, templates, local storage, PDF export) are available at no cost. Bring your own OpenAI API key for AI features.
          </p>
          <div className="max-w-md mx-auto p-8 bg-white dark:bg-zinc-800 rounded-xl border-2 border-blue-600">
            <h4 className="font-semibold text-2xl mb-2">Free Forever</h4>
            <div className="text-4xl font-bold text-blue-600 mb-4">$0</div>
            <ul className="text-left space-y-2 mb-6">
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Unlimited resumes
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                All templates
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                PDF export
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                AI features (BYO API key)
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                No signup required
              </li>
            </ul>
            <a href="/builder" className="block w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
              Start Building
            </a>
          </div>
        </section>
      </main>

      <footer className="border-t border-zinc-200 dark:border-zinc-800 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center text-sm text-zinc-600 dark:text-zinc-400">
          <p>Built with Next.js, TypeScript, and OpenAI • Open source & free to use</p>
          <p className="mt-2">Deploy to Vercel in one click</p>
        </div>
      </footer>
    </div>
  )
}
