# ELISH-SPEAK

**Speak Nigeria • One Word at a Time**

A Progressive Web App (PWA) that teaches the three major Nigerian languages — **Hausa**, **Igbo** and **Yoruba** — using English as the benchmark language.

**Creator:** Rev. Silas C. Nentawe

---

## Features

- **Interactive Lessons** – Flashcards with English ↔ Native word + pronunciation guide
- **Quiz Mode** – Multiple-choice questions (both directions)
- **Match Game** – Pair English words with their translations
- **Memory Cards** – Classic memory matching game
- **Word Puzzle** – Unscramble letters to form the correct word
- **Exercises** – Translation & fill-in-the-blank practice
- **Progress Tracking** – Words learned, streaks, scores (saved locally)
- **Offline Support** – Works without internet after first visit
- **Installable** – Add to home screen on mobile & desktop

---

## How to Launch

### Option 1: Netlify (Recommended – easiest)

1. Go to [https://app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag and drop the entire `elish-speak` folder
3. Your live site is ready in seconds!
4. Optional: Connect a custom domain or claim the site to manage it.

### Option 2: GitHub Pages

1. Create a new repository on GitHub (e.g. `elish-speak`)
2. Upload all files from this folder to the repo (or push via git)
3. Go to **Settings → Pages**
4. Under “Source”, select the branch (`main`) and folder (`/ (root)`)
5. Save. Your app will be live at `https://YOUR-USERNAME.github.io/elish-speak/`

### Option 3: Any static host

Upload the whole folder to any static hosting service (Vercel, Cloudflare Pages, Firebase Hosting, etc.).

---

## Local Testing

Open `index.html` in a modern browser, or run a simple local server:

```bash
# Python
python -m http.server 8080

# Node
npx serve .
```

Then visit `http://localhost:8080`

> **Note:** Service Worker & Install prompt require HTTPS (or localhost).

---

## Project Structure

```
elish-speak/
├── index.html          # Main app shell
├── css/styles.css      # All styles
├── js/
│   ├── data.js         # Vocabulary (Hausa, Igbo, Yoruba)
│   └── app.js          # App logic, games, progress
├── icons/              # PWA icons
├── manifest.json       # PWA manifest
├── sw.js               # Service Worker (offline)
└── README.md
```

---

## Credits

Created by **Rev. Silas C. Nentawe**  
Built to promote Nigerian languages and cultural pride.

May this app help many speak the languages of the people with joy.
