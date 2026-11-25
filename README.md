# Muhammad Arsalan — Personal Portfolio

A personal backend developer portfolio built with **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS**.

## Quick Start (Local Development)

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## How to Add a New Project

All projects live in one file: **`data/projects.json`**.  
The **Selected Work** grid, **All / Laravel / .NET** filter counts, and **`/projects/[slug]`** case study pages are generated automatically from this file.

1. Place your cover image (and any extra screenshots) inside `public/images/projects/`, for example:
   `public/images/projects/my-new-project.jpg`
2. Open `data/projects.json` and append a new object inside the JSON array:

```json
{
  "title": "Your Project Title",
  "slug": "your-project-slug",
  "shortDescription": "One-line summary shown on the project card and case study header.",
  "coverImage": "/images/projects/my-new-project.jpg",
  "tags": ["Laravel", "MySQL", "REST API"],
  "stack": "laravel",
  "type": "employment",
  "date": "2026",
  "overview": "Detailed overview of what the system does and why it was built.",
  "role": "Your specific responsibilities in this project.",
  "features": [
    "Key feature 1",
    "Key feature 2"
  ],
  "techStack": ["PHP", "Laravel", "MySQL"],
  "challengesAndSolutions": [
    {
      "challenge": "Technical bottleneck or requirement you faced.",
      "solution": "How you designed and implemented the solution."
    }
  ],
  "screenshots": [
    {
      "src": "/images/projects/my-new-project.jpg",
      "alt": "Screenshot description",
      "caption": "Optional caption shown under the image."
    }
  ],
  "githubUrl": "https://github.com/your-username/repo",
  "liveDemoUrl": "https://your-demo-url.com"
}
```

### Field Reference
- **`stack`**: `"laravel"` or `"dotnet"` (controls the filter toggle and badge)
- **`type`**: `"employment"`, `"freelance"`, or `"personal"` (controls the label on the card)
- **`slug`**: URL-friendly unique ID (generates `/projects/<slug>`)
- **`githubUrl` / `liveDemoUrl`**: Optional. Omit or remove the key if a project has no public repo or live link.

---

## Replacing Placeholders & Enabling Direct Contact Form Emails

1. **CV PDFs**: Replace the placeholder files in `public/cv/` (keep the exact filenames, or update `links.laravelCv` / `links.dotnetCv` in `src/data/profile.ts`):
   - `public/cv/Muhammad-Arsalan-Laravel-CV.pdf`
   - `public/cv/Muhammad-Arsalan-DotNet-CV.pdf`
2. **Profile & Dates**: Update `src/data/profile.ts`:
   - LinkedIn and GitHub URLs (`links.linkedin`, `links.github`)
   - Freelance `.NET Developer` dates (`[START DATE] – [END DATE / Present]`)
   - Notice period wording in the FAQ if needed
3. **Direct Email Sending (Contact Form)**:
   - Without a key, the contact form provides **Send via Gmail (Web)** and **Default Mail App** buttons pre-filled with the visitor's message.
   - To make the **Send Message** button send emails directly from the page with zero redirects:
     1. Go to [web3forms.com](https://web3forms.com) (free), enter `arslankhakwani001@gmail.com`, and copy the Access Key sent to your email.
     2. Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_WEB3FORMS_KEY=your-key-here`.
     3. When deploying on Vercel or Netlify, add `NEXT_PUBLIC_WEB3FORMS_KEY` in **Environment Variables**.
4. **Project Links**: Update `githubUrl` and `liveDemoUrl` in `data/projects.json`
5. **Domain URL**: Update `metadataBase` in `src/app/layout.tsx` and `baseUrl` in `src/app/sitemap.ts` to match your live Vercel or Netlify URL.

---

## Deploy for Free (Vercel or Netlify)

### Option A: Vercel (Recommended for Next.js)
1. Push this folder to a GitHub repository.
2. Go to [vercel.com](https://vercel.com) and sign in with GitHub.
3. Click **Add New → Project** and import your repository.
4. Keep the default **Next.js** framework settings and click **Deploy**.

### Option B: Netlify
1. Push this folder to a GitHub repository.
2. Go to [netlify.com](https://netlify.com) and sign in with GitHub.
3. Click **Add new site → Import an existing project** and select your repo.
4. Netlify automatically detects Next.js (`npm run build`). Click **Deploy site**.
