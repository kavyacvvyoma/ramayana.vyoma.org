# Vyoma Ramayana Website — Component Guide

## How to run

**Option A — Vite (recommended)**
```bash
npm create vite@latest ramayana-website -- --template react
cd ramayana-website
npm install
# Copy all .jsx and .js files into src/
# In src/main.jsx change: import App from './App' → import App from './00_App'
npm run dev   # → http://localhost:5173
```

**Option B — Create React App**
```bash
npx create-react-app ramayana-website
cd ramayana-website
# Copy all files into src/
# In src/index.js change: import App from './App' → import App from './00_App'
npm start     # → http://localhost:3000
```

---

## File map — what to edit and where

| File | Edit for... |
|------|-------------|
| `01_theme.js` | Colors, fonts, nav items, featured event toggle, CSS animations |
| `02_SharedComponents.jsx` | Card style, Button style, Tag style, Om icon, PageHdr layout |
| `03_Navbar.jsx` | Logo name/tagline, navbar height, nav link styling |
| `04_Footer.jsx` | Contact info, social links, tagline, copyright text |
| `05_IntroAnimation.jsx` | Arrow animation timing, cracker colors, blast text (Jai Shree Ram letters) |
| `06_HomePage.jsx` | Hero text, Sanskrit shloka, stats, info cards, Kandas list, Characters grid |
| `07_RamaRavanaAnimation.jsx` | Scene label, victory text, firework colors, animation phases |
| `08_ProductsPage.jsx` | Product categories, individual product cards (title, price, description) |
| `09_CoursesPage.jsx` | Course list, persona filter tabs, course details |
| `10_EventsPage.jsx` | 2025 upcoming events, 2024/2023 past event listings |
| `11_GalleryPage.jsx` | Gallery images per year (emoji + caption), lightbox |
| `12_QuizPage.jsx` | Practice quiz questions, championship details, prize structure, past results |
| `13_FeaturedEventPage.jsx` | Mahotsava 2025 event details, schedule, highlights |
| `00_App.jsx` | Page routing only — add new pages here |

---

## Common edits

### Change a color sitewide
Open `01_theme.js` → edit the value in the `C` object. Example:
```js
orange1: "#FF6B00",  // change this to rebrand the primary color
teal:    "#0D7377",  // change this to update the teal accent
```

### Add a new nav page
1. Create `XX_MyNewPage.jsx` with `export function MyNewPage() { ... }`
2. In `01_theme.js` add `"My New Page"` to `NAV_ITEMS`
3. In `00_App.jsx` import and add to the `pages` map:
   ```js
   import { MyNewPage } from "./XX_MyNewPage";
   // inside pages object:
   "My New Page": <MyNewPage />,
   ```

### Remove the featured event tab
In `01_theme.js`:
```js
export const FEATURED_EVENT_ACTIVE = false;  // ← change to false
```

### Disable the intro animation
In `00_App.jsx`:
```js
const SHOW_INTRO = false;  // ← change to false
```

### Add a product
Open `08_ProductsPage.jsx`, find the `cats` array, find the right category, add to its `items`:
```js
{ title: "My New Book", desc: "Description here.", price: "₹299", tag: "New", emoji: "📗", color: C.teal }
```

### Add a course
Open `09_CoursesPage.jsx`, add to the `courses` array:
```js
{
  title: "My New Course", persona: ["Adults"], level: "Beginner",
  duration: "8 weeks", lang: "EN | KN",
  desc: "Course description.", emoji: "📚", color: C.teal,
  modules: ["Module 1", "Module 2", "Module 3"],
}
```

### Add a 2025 event
Open `10_EventsPage.jsx`, add to the `current` array:
```js
{
  name: "New Event Name", date: "July 15, 2025", status: "UPCOMING",
  loc: "Bengaluru + Online", icon: "🌺", color: C.teal,
  desc: "Event description.",
  details: ["Free entry", "Certificate", "Open to all"],
}
```

### Add gallery images
Open `11_GalleryPage.jsx`, find the right year in `gallery`, add to `imgs`:
```js
{ e: "🌸", c: "Caption for this image" }
```

### Edit quiz questions
Open `12_QuizPage.jsx`, edit the `qs` array:
```js
{ q: "Your question?", opts: ["Option A","Option B","Option C","Option D"], ans: 2 }
// ans is the 0-based index of the correct answer
```
