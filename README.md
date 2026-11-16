<p align="center">
  <strong>ResumeOS</strong><br/>
  <em>Build. Optimize. Get Hired.</em>
</p>

<p align="center">
  <a href="https://github.com/istiakrahman15/resume-os/actions"><img src="https://img.shields.io/github/actions/workflow/status/istiakrahman15/resume-os/ci.yml?branch=main&style=flat-square" alt="CI Status" /></a>
  <a href="https://github.com/istiakrahman15/resume-os/blob/main/LICENSE"><img src="https://img.shields.io/badge/License-MIT-blue?style=flat-square" alt="License" /></a>
  p>

---

**ResumeOS** is an open-source, AI-powered career toolkit that helps job seekers create stunning resumes, ATS-optimized CVs, cover letters, portfolio websites, and manage their entire job search — from a single dashboard.

## ✨ Features

| Module              | Description                                                                 |
|---------------------|-----------------------------------------------------------------------------|
| **Resume Builder**  | Drag-and-drop section editor with real-time preview and multiple templates  |
| **AI Writer**       | GPT/Claude/Ollama-powered resume bullet rewrites via SSE streaming          |
| **ATS Optimizer**   | Paste a job description → get keyword match score + actionable suggestions  |
| **Cover Letters**   | AI-generated, job-tailored cover letters with tone and length controls      |
| **Portfolio Sites** | Publish a personal portfolio on a custom subdomain or CNAME                 |
| **Job Tracker**     | Kanban board to track applications across Applied → Interview → Offer stages|
| **PDF Export**      | Server-rendered PDF downloads via `@react-pdf/renderer`                     |
| **Billing**         | Stripe Checkout + webhook-synced subscriptions with free/pro tiers          |
| **Analytics**       | Response rate funnels, AI usage stats, and template distribution charts     |
| **Admin Panel**     | Platform-level user management, MRR metrics, and audit logs                 |

## 🛠 Tech Stack

- **Framework:** Next.js 16 (App Router, Turbopack, React 19)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS v4 (CSS-first `@theme` configuration)
- **Components:** shadcn v4 (`base-nova` style, `@base-ui/react`)
- **Database:** PostgreSQL via Supabase + Drizzle ORM
- **Auth:** Supabase Auth (email/password, OAuth: Google, GitHub)
- **AI Providers:** OpenAI, Anthropic, Ollama (pluggable `AiProvider` abstraction)
- **Payments:** Stripe Checkout + Webhooks
- **Charts:** Recharts with OKLCH theme tokens
- **PDF:** `@react-pdf/renderer` (server-side streaming)
- **CI/CD:** GitHub Actions + Docker multi-stage builds

## 📁 Project Structure

```
resume-os/
├── app/
│   ├── (marketing)/      # Landing, pricing, templates, about
│   ├── (auth)/            # Login, register, forgot-password, callback
│   ├── (app)/             # Dashboard, resumes, cover-letters, ats, jobs,
│   │                      # portfolios, billing, settings, profile, analytics
│   ├── (admin)/           # Admin control center
│   ├── api/               # AI streaming, PDF export, Stripe webhooks
│   ├── [slug]/            # Public portfolio runtime (ISR)
│   └── u/[username]/      # Public user profiles
├── components/
│   ├── ui/                # shadcn v4 primitives
│   ├── shared/            # PageHeader, EmptyState, Skeletons
│   ├── layout/            # Sidebar, Topbar, MobileNav
│   └── charts/            # Recharts wrappers (Area, Bar, Donut, Sparkline)
├── src/
│   ├── ai/                # AiProvider abstraction
│   ├── config/            # site, billing, nav, templates, brand constants
│   ├── db/                # Drizzle client + entity schemas
│   ├── features/          # Domain logic (resumes, cover-letters, billing, etc.)
│   └── lib/               # Supabase clients, rate-limiter, security headers
├── Dockerfile             # Multi-stage production build
├── .github/workflows/     # CI pipeline
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js 22+
- npm 10+
- A [Supabase](https://supabase.com) project (for database + auth)
- Optional: Stripe account (for billing), OpenAI/Anthropic API key (for AI features)

### Installation

```bash
# Clone the repository
git clone https://github.com/istiakrahman15/resume-os.git
cd resume-os

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local
```

### Environment Variables

Create a `.env.local` file with the following:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# AI Providers (optional)
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...

# Stripe (optional)
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...

# Site
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

### Docker

```bash
docker build \
  --build-arg NEXT_PUBLIC_SUPABASE_URL=your_url \
  --build-arg NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key \
  -t resume-os .

docker run -p 3000:3000 --env-file .env.local resume-os
```

## 📄 License

This project is licensed under the [MIT License](LICENSE).

## 👤 Developer

**Istiak Rahman**

- GitHub: [@istiakrahman15](https://github.com/istiakrahman15)
- Portfolio: [devistiak.eu.cc](https://devistiak.eu.cc)
- Support: [supportkori.com/istiakrahman15](https://www.supportkori.com/istiakrahman15)

---

<p align="center">
  Built with ❤️ by <a href="https://devistiak.eu.cc">Istiak Rahman</a>
</p>
