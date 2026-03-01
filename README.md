# UMT Interactive Course Finder — Deployment Guide

**Version:** 2.0  
**Author:** Muhammad Izzat Haqimi Bin Roslan, Universiti Malaysia Terengganu  
**Contact:** haqimi150@gmail.com  
**Prepared for:** Pusat Ekosistem Digital (PED), UMT — ped@umt.edu.my

---

## Overview

The UMT Course Finder is a fully self-contained, single-file interactive web application designed to help SPM school leavers and prospective students discover the right undergraduate programme at UMT through a 4-step quiz system.

**No server, no database, no backend required.** Just one `.html` file.

---

## Files in This Package

| File | Description |
|------|-------------|
| `umt-course-finder-v2.html` | The fully functional web app (open in any browser) |
| `README.md` | This deployment guide |
| `email-proposal.docx` | Formal proposal letter to PED |

---

## Quick Start (Testing Locally)

1. Download or extract this ZIP
2. Double-click `umt-course-finder-v2.html`
3. It will open in your default browser — no installation needed

> **Note:** The embedded map uses OpenStreetMap (Leaflet.js) which requires an internet connection to load map tiles. All other features work fully offline.

---

## Deployment Options

### Option A — Standalone Static Page (Recommended)

Upload `umt-course-finder-v2.html` to any UMT web server and link to it:

```
https://www.umt.edu.my/course-finder/
```

No configuration needed. The file is entirely self-contained.

### Option B — Embed in Existing UMT Portal (iframe)

Insert this snippet anywhere in the UMT website:

```html
<iframe 
  src="/course-finder/umt-course-finder-v2.html"
  width="100%" 
  height="900px" 
  style="border:none; border-radius:12px;"
  title="UMT Interactive Course Finder">
</iframe>
```

### Option C — WordPress Short Page

1. Create a new WordPress page
2. Switch to "Full Width" or "No Sidebar" template
3. Add a **Custom HTML** block
4. Paste the full content of `umt-course-finder-v2.html`

---

## Technical Details

| Property | Value |
|----------|-------|
| File size | ~200 KB (single file) |
| Frameworks | Vanilla JS, no npm/build step required |
| Fonts | Google Fonts (Syne, DM Sans) — free |
| Map | Leaflet.js v1.9.4 + OpenStreetMap — free, no API key |
| Browser support | Chrome 80+, Firefox 75+, Safari 13+, Edge 80+ |
| Mobile support | Fully responsive (tested on 320px–1440px) |

---

## Features Summary

- **4-step personalised quiz** — subjects, activities, work environment, personality
- **18 undergraduate programmes** across 6 faculties
- **Bilingual UI** — full English / Bahasa Malaysia toggle (persists via localStorage)
- **Course comparison** — side-by-side comparison of up to 3 programmes
- **Entry requirements & fees** shown per programme
- **Filter by faculty** — IT, Marine, Engineering, Business, Maritime
- **Share results** — Web Share API on mobile, clipboard fallback on desktop
- **WhatsApp counsellor** link integration
- **OpenStreetMap campus location** — no Google API key required
- **All UMT social media links** — Facebook, Instagram, YouTube, X, LinkedIn, TikTok, Telegram

---

## Customisation Guide (For PED Developers)

### Adding / Updating Courses

All course data is in the `courses` array inside the `<script>` tag. Each course object follows this structure:

```javascript
{
  id: 19,                          // Unique ID
  name: "Bachelor of ...",         // English name
  nameBM: "Sarjana Muda ...",      // Malay name
  faculty: "Faculty of ...",
  facultyBM: "Fakulti ...",
  tags: ["Tag1", "Tag2"],          // Display tags on card
  category: "IT",                  // IT | Marine | Engineering | Business | Maritime
  duration: "4 Years / 8 Semesters",
  durationBM: "4 Tahun / 8 Semester",
  semesters: 8,
  intake: "March & September",
  intakeBM: "Mac & September",
  mode: "Full-time",
  modeBM: "Sepenuh Masa",
  language: "English",
  level: "Bachelor's Degree",
  levelBM: "Ijazah Sarjana Muda",
  url: "https://www.umt.edu.my/...", // Official programme page URL
  description: "...",
  descriptionBM: "...",
  careers: ["Career 1", "Career 2"],
  careersBM: ["Kerjaya 1", "Kerjaya 2"],
  entry: {
    spmMin: "5B",
    credits: 5,
    subjects: "Mathematics, Biology...",
    grade: "B"
  },
  fees: {
    tuition: "RM 7,000",
    total: "RM 28,000",
    scholarship: "JPA, PTPTN, MARA"
  },
  semDetails: [
    { title: "Sem 1 Title", titleBM: "...", desc: "...", descBM: "..." },
    // ... up to 8 semesters
  ],
  weights: {
    // Quiz answer keys that match this course
    // Higher number = stronger match
    // Keys: coding, tech, ocean, engineering, business_act, nature, food,
    //       data, ships, energy, helping, bio, chem, phys, math, biz,
    //       social, geo, tech_company, sea, gov, research, corp, outdoor,
    //       ngo, hospitality, analytical, creative, leader, caring,
    //       adventurous, detail
    coding: 4,
    tech: 3,
    analytical: 4
  }
}
```

### Updating Language Strings

All UI text is in the `t` object at the top of the `<script>` block, with `en` and `bm` sub-objects. Update both to keep the bilingual toggle working.

### Changing Brand Colours

Update these CSS custom properties at the top of the `<style>` block:

```css
:root {
  --umt-purple: #3D2A8C;
  --umt-red:    #C8102E;
  --umt-gold:   #F5A623;
}
```

---

## Known Limitations

- Course data is hardcoded — for live data, PED can integrate a REST API call to replace the `courses` array
- The scoring algorithm is heuristic-based; it can be upgraded to a weighted ML model
- Currently covers 18 programmes — full coverage of all 35+ programmes requires additional data entry

---

## Source Code Transfer

The full source code is offered to UMT / PED at no cost for any official use, modification, or further development. No licensing restrictions apply.

---

## Contact

For questions, demonstrations, or handover arrangements:

**Muhammad Izzat Haqimi Bin Roslan]**  
Research Assistant —SEATRU  
📧 haqimi150@gmail.com  
📞 +60 13-253 0175
