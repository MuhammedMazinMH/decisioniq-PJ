# DecisionIQ

> **AI-Powered Decision Intelligence Platform for Career and Higher-Education Decisions**

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js 16" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-5.7-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS 4" />
  <img src="https://img.shields.io/badge/AI_SDK-6-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="AI SDK 6" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/license-MIT-green?style=flat-square" alt="License" />
  <img src="https://img.shields.io/badge/status-active-success?style=flat-square" alt="Status" />
  <img src="https://img.shields.io/badge/PRs-welcome-blueviolet?style=flat-square" alt="PRs Welcome" />
</p>

---

## 📋 Table of Contents

- [Problem Statement](#-problem-statement)
- [Solution](#-solution)
- [Key Features](#-key-features)
- [How It Works](#-how-it-works)
- [Architecture](#-architecture)
- [Screenshots](#-screenshots)
- [Example Use Cases](#-example-use-cases)
- [Technology Stack](#-technology-stack)
- [Installation](#-installation)
- [Local Development](#-local-development)
- [Project Structure](#-project-structure)
- [Future Scope](#-future-scope)
- [Author](#-author)

---

## 🎯 Problem Statement

Career and higher-education decisions are some of the **highest-stakes choices** a person ever makes — yet most people make them with surprisingly little structure. A single choice between two job offers, an MBA versus a promotion, or a specialization for a master's degree can shape the next decade of someone's life.

These decisions are hard because they are riddled with friction:

| Challenge | Why It Hurts |
| --- | --- |
| 🧩 **Incomplete information** | Offer letters, resumes, and program details are scattered across documents that are never compared side by side. |
| ❤️ **Emotional reasoning** | Excitement, fear, and pressure crowd out objective trade-off analysis. |
| 👥 **Social influence** | Peers, family, and brand prestige push people toward "safe" rather than *right* decisions. |
| 🌫️ **Uncertainty** | The long-term consequences of a choice are invisible at the moment of deciding. |
| 🤖 **Generic AI recommendations** | Off-the-shelf chatbots give one-size-fits-all advice with no transparency into *why*. |

The result: people flip a coin, follow the crowd, or trust a gut feeling — and only discover the trade-offs they missed years later.

---

## 💡 Solution

**DecisionIQ replaces guesswork with structured reasoning.**

Instead of handing users a vague answer, DecisionIQ ingests their **real documents** — offer letters, resumes, certifications, and academic records — extracts the facts that matter, and walks each decision through a transparent, multi-stage intelligence pipeline.

It generates **adaptive follow-up questions** tailored to the user's situation, builds a **weighted decision matrix** from their stated priorities, runs **risk analysis** and **future outcome simulation**, actively **detects cognitive biases**, and produces a recommendation backed by a fully visible **Decision Intelligence Trace**.

Every recommendation comes with a **Confidence Score** and a **Decision Quality Score**, so users don't just learn *what* to choose — they understand *how* and *why* that conclusion was reached.

---

## ✨ Key Features

| Feature | Description |
| --- | --- |
| 📤 **Document Upload & Processing** | Drag-and-drop upload for PDF, DOCX, and TXT files with transparent file records. |
| 📄 **Resume Intelligence** | Parses resumes to understand skills, experience, and career trajectory. |
| 🔍 **Context Extraction** | Automatically extracts companies, roles, stipends, durations, locations, and benefits from documents. |
| ❓ **Dynamic Follow-Up Questions** | Generates adaptive, situation-specific questions from your documents and context. |
| ⚖️ **Trade-Off Analysis** | Surfaces the real costs and benefits hidden behind each option. |
| 📊 **Weighted Decision Matrix** | Scores every option against your prioritized criteria. |
| 🛡️ **Risk Analysis** | Identifies and rates the risks attached to each path. |
| 🔮 **Future Outcome Simulation** | Projects likely long-term outcomes on a decision timeline. |
| 🧠 **Decision Bias Detection** | Flags cognitive biases (Social Proof, Confirmation, Sunk Cost, Recency, and more) with corrections. |
| 🎯 **Confidence Score** | Quantifies how strongly the data supports the recommendation. |
| 🏅 **Decision Quality Score** | Measures the completeness and rigor of the decision input. |
| 🧾 **Decision Intelligence Trace** | A transparent, step-by-step reasoning path behind every recommendation. |
| ✅ **Transparent Recommendations** | Clear, explainable guidance with decision strength labeling. |

---

## 🔄 How It Works

```
            👤 User Uploads Documents
                       │
                       ▼
              📄 Document Parsing
                       │
                       ▼
            🔍 Information Extraction
                       │
                       ▼
           🧩 Context Understanding
                       │
                       ▼
        ❓ Adaptive Question Generation
                       │
                       ▼
             ⚖️ Trade-Off Analysis
                       │
                       ▼
              🛡️ Risk Assessment
                       │
                       ▼
         🔮 Future Outcome Simulation
                       │
                       ▼
              🧠 Bias Detection
                       │
                       ▼
         ✅ Recommendation Generation
```

---

## 🏗️ Architecture

```
┌───────────────────────────────────────────────────────────────────────┐
│                            CLIENT (Browser)                             │
│                                                                         │
│    Landing  →  Decision Builder  →  Analysis  →  Results Dashboard      │
│    (Next.js App Router · React 19 · Tailwind CSS v4 · shadcn/ui)        │
└─────────────────────────────────┬───────────────────────────────────────┘
                                   │  HTTP / Server Actions
                                   ▼
┌───────────────────────────────────────────────────────────────────────┐
│                        NEXT.JS API ROUTES (Server)                      │
│                                                                         │
│    /api/extract     →  Document parsing (unpdf · mammoth)              │
│    /api/questions   →  Adaptive follow-up question generation         │
│    /api/analyze     →  Decision engine (trade-offs, risk, bias, sim)  │
└─────────────────────────────────┬───────────────────────────────────────┘
                                   │  Structured prompts + Zod schemas
                                   ▼
┌───────────────────────────────────────────────────────────────────────┐
│                       AI LAYER (Vercel AI SDK 6)                        │
│                                                                         │
│    Structured generation  ·  Schema-validated output (Zod)             │
│    Reasoning trace  ·  Confidence & quality scoring                    │
└─────────────────────────────────┬───────────────────────────────────────┘
                                   │
                                   ▼
┌───────────────────────────────────────────────────────────────────────┐
│                          STATE & DATA LAYER                             │
│                                                                         │
│    Decision Store (React Context) · Analysis Schemas · Scenario Data   │
└───────────────────────────────────────────────────────────────────────┘
```

---

## 📸 Screenshots

> Replace the placeholders below with actual screenshots before submission.

| View | Preview |
| --- | --- |
| **Landing Page** | `![Landing Page](docs/screenshots/landing.png)` |
| **Document Extraction** | `![Document Extraction](docs/screenshots/extraction.png)` |
| **Adaptive Questions** | `![Adaptive Questions](docs/screenshots/questions.png)` |
| **Analysis Engine** | `![Analysis Engine](docs/screenshots/analysis.png)` |
| **Recommendation Dashboard** | `![Recommendation Dashboard](docs/screenshots/recommendation.png)` |
| **Risk Analysis** | `![Risk Analysis](docs/screenshots/risk.png)` |
| **Future Simulation** | `![Future Simulation](docs/screenshots/future.png)` |
| **Decision Intelligence Trace** | `![Decision Intelligence Trace](docs/screenshots/trace.png)` |

---

## 🎓 Example Use Cases

- **Internship Selection** — Compare multiple internship offers across stipend, learning, brand, and conversion potential.
- **Job Offer Comparison** — Weigh competing offers on salary, growth, work-life balance, and flexibility.
- **MBA vs Job** — Decide between pursuing higher education and accepting a strong career opportunity.
- **Higher Studies Planning** — Evaluate programs, specializations, and locations for a master's degree.
- **Career Path Selection** — Choose between divergent roles such as AI Engineer vs Data Scientist.
- **Certification Decisions** — Determine whether a certification is worth the time and cost investment.

---

## 🛠️ Technology Stack

| Layer | Technology |
| --- | --- |
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router) |
| **Frontend** | [React 19](https://react.dev/) · TypeScript 5.7 |
| **UI Components** | [shadcn/ui](https://ui.shadcn.com/) · [Base UI](https://base-ui.com/) · [lucide-react](https://lucide.dev/) icons |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) · `tailwind-merge` · `class-variance-authority` · `tw-animate-css` |
| **AI Components** | [Vercel AI SDK 6](https://sdk.vercel.ai/) · [Zod](https://zod.dev/) schema validation |
| **Document Processing** | [unpdf](https://github.com/unjs/unpdf) (PDF) · [mammoth](https://github.com/mwilliamson/mammoth.js) (DOCX) |
| **Analytics** | [@vercel/analytics](https://vercel.com/analytics) |
| **Deployment** | [Vercel](https://vercel.com/) |

---

## 📦 Installation

> **Prerequisites:** Node.js 18.18+ and a package manager (`npm`, `pnpm`, `yarn`, or `bun`).

```bash
# 1. Clone the repository
git clone https://github.com/MuhammedMazinMH/decisioniq.git

# 2. Enter the project directory
cd decisioniq

# 3. Install dependencies
npm install

# 4. Configure environment variables (see below)
cp .env.example .env.local

# 5. Start the development server
npm run dev
```

### Environment Variables

DecisionIQ uses the Vercel AI SDK. When deployed on Vercel, the **AI Gateway** is configured automatically. For local development with non–zero-config providers, set:

```bash
AI_GATEWAY_API_KEY=your_api_key_here
```

---

## 💻 Local Development

Scripts are defined in `package.json`:

| Command | Description |
| --- | --- |
| `npm run dev` | Start the local development server with hot reload. |
| `npm run build` | Create an optimized production build. |
| `npm run start` | Serve the production build locally. |
| `npm run lint` | Run ESLint across the project. |

The app runs at **[http://localhost:3000](http://localhost:3000)** by default.

---

## 📁 Project Structure

```
decisioniq/
├── app/
│   ├── about/page.tsx              # About page
│   ├── analysis/page.tsx           # Live analysis view
│   ├── api/
│   │   ├── analyze/route.ts        # Decision engine endpoint
│   │   ├── extract/route.ts        # Document extraction endpoint
│   │   └── questions/route.ts      # Adaptive question generation
│   ├── decision/page.tsx           # Decision builder (upload + inputs)
│   ├── demo/page.tsx               # Demo scenarios
│   ├── history/page.tsx            # Decision history
│   ├── results/page.tsx            # Results dashboard
│   ├── layout.tsx                  # Root layout + metadata
│   └── page.tsx                    # Landing page
│
├── components/
│   ├── app/
│   │   ├── bias-detector.tsx       # Cognitive bias detection UI
│   │   ├── comparison-matrix.tsx   # Weighted decision matrix
│   │   ├── confidence-meter.tsx    # Confidence score gauge
│   │   ├── quality-meter.tsx       # Decision quality gauge
│   │   ├── decision-upload.tsx     # Document upload + extraction
│   │   ├── future-timeline.tsx     # Future outcome simulation
│   │   ├── reasoning-timeline.tsx  # Decision Intelligence Trace
│   │   ├── recommendation-card.tsx # Final recommendation
│   │   ├── results-content.tsx     # Results orchestration
│   │   └── risk-analysis-card.tsx  # Risk assessment UI
│   ├── hero.tsx                    # Landing hero
│   ├── features.tsx                # Feature highlights
│   ├── how-it-works.tsx            # Workflow section
│   ├── site-header.tsx             # Global header + brand logo
│   └── ui/                         # shadcn/ui primitives
│
├── lib/
│   ├── analysis-schema.ts          # Zod schemas for AI output
│   ├── decision-data.ts            # Scenario + decision data
│   ├── decision-store.tsx          # Global decision state (Context)
│   └── utils.ts                    # Shared utilities
│
├── app/icon.png                    # Brain favicon
├── package.json
└── README.md
```

---

## 🚀 Future Scope

- **Multi-Document Comparison** — Compare unlimited offers and programs simultaneously in one workspace.
- **Team Decision Intelligence** — Collaborative decision-making with shared priorities and voting.
- **Financial Decision Support** — Salary growth modeling, cost-of-living adjustments, and ROI projections.
- **Enterprise Decision Intelligence** — Organization-wide decision frameworks for hiring and strategy.
- **Personalized Decision Memory** — Persistent profiles that learn a user's values and improve recommendations over time.

---

## 👤 Author

**Muhammed Mazin MH**

[![GitHub](https://img.shields.io/badge/GitHub-MuhammedMazinMH-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/MuhammedMazinMH)

---

<p align="center">
  <em>DecisionIQ — Make better decisions through transparent reasoning, not coin flips.</em>
</p>
