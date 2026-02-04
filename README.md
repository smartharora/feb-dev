# 💝 Valentine's Day Experience

A romantic, interactive web experience built for Jahnvi.

## 📁 Project Structure

```
feb-project/
├── index.html          # Main HTML structure
├── css/
│   └── styles.css     # All styling
├── js/
│   └── script.js      # All JavaScript logic
├── assets/
│   ├── music/         # Background music files
│   └── photos/
│       ├── timeline/  # Photos for timeline chapter
│       ├── reasons/   # Photos for reasons chapter
│       └── keepsake/  # Photos for final keepsake
├── .gitignore
└── README.md
```

## 🎵 Adding Background Music

1. **Choose a song:**
   - Romantic instrumental (piano, acoustic, lofi)
   - MP3 format recommended
   - Keep file size under 5MB for fast loading

2. **Add the file:**
   ```bash
   # Place your music file in:
   assets/music/background.mp3
   ```

3. **Update index.html (line ~33):**
   ```html
   <audio id="background-music" loop>
       <source src="./assets/music/background.mp3" type="audio/mpeg">
   </audio>
   ```

4. **Music controls:**
   - Music starts muted
   - User can click 🎵 button (bottom-right) to play/pause

## 📸 Adding Photos

### Timeline Photos (Chapter 3)

1. **Add photos to folder:**
   ```bash
   assets/photos/timeline/pink-dress.jpg
   assets/photos/timeline/first-date.jpg
   # ... etc
   ```

2. **Update in `js/script.js` (find `timelineMoments` array):**
   ```javascript
   {
       title: "The Pink Dress",
       memory: "I saw you on the stairs...",
       reflection: "It felt like it was made to be.",
       image: "/assets/photos/timeline/pink-dress.jpg"  // ADD THIS
   }
   ```

### Reason Photos (Chapter 4)

1. **Add photos to folder:**
   ```bash
   assets/photos/reasons/reason-1.jpg
   assets/photos/reasons/reason-2.jpg
   # ... etc
   ```

2. **Update in `js/script.js` (find `reasons` array):**
   ```javascript
   {
       text: "You love taking care of other people.",
       image: "/assets/photos/reasons/reason-1.jpg"  // UPDATE THIS
   }
   ```

### Keepsake Photos (Optional)

For the final keepsake screen, you can add a photo collage:

1. Add photos to `assets/photos/keepsake/`
2. Modify the keepsake HTML in `index.html` to include images

## 🎨 Customization Guide

### Update Personal Content

Edit these sections in **`js/script.js`**:

1. **Quiz Questions (Chapter 1):**
   - Find `quizQuestions` array
   - Update questions, options, and correct answers

2. **Text Input Question (Chapter 2):**
   - Find `TEXT_ANSWER` constant
   - Update question text in `index.html` (Chapter 2 section)

3. **Timeline Moments (Chapter 3):**
   - Find `timelineMoments` array
   - Update titles, memories, and reflections

4. **Reasons (Chapter 4):**
   - Find `reasons` array
   - Update with your own reasons

### Update Colors

Edit **`css/styles.css`** (lines 26-35):

```css
:root {
    --color-primary: #FFB6C1;      /* Light Pink */
    --color-secondary: #FFC8DD;    /* Lighter Pink */
    --color-accent: #FF85A2;       /* Hot Pink */
    --color-bg-light: #FFF5F7;     /* Background Light */
    --color-bg-cream: #FFFBF5;     /* Background Cream */
}
```

## 🚀 Deployment to Vercel

Your site is already connected to Vercel. Every time you push to GitHub, it auto-deploys:

### Update Workflow

1. **Make changes locally:**
   ```bash
   # Edit files
   # Add photos to assets/ folders
   # Update content in js/script.js
   ```

2. **Test locally:**
   - Open `index.html` in your browser
   - Check all chapters work correctly

3. **Commit and push:**
   ```bash
   git add .
   git commit -m "Updated timeline photos and reasons"
   git push origin main
   ```

4. **Auto-deploy:**
   - Vercel detects changes
   - Builds and deploys in ~30 seconds
   - Live on your subdomain automatically

## 📝 Quick Reference

### File Sizes
- **Photos:** Keep under 500KB each (use TinyPNG.com to compress)
- **Music:** Keep under 5MB
- **Total site:** Aim for under 10MB for fast loading

### Image Recommendations
- **Format:** JPG for photos, PNG for graphics
- **Dimensions:** 800px wide is plenty (Vercel optimizes automatically)
- **Compression:** Use TinyPNG or similar before uploading

### Performance Tips
- Vercel caches CSS/JS files for 1 year
- Photos are served from CDN edge locations
- Site loads fast globally thanks to Vercel's network

## 🛠️ Troubleshooting

### Photos not showing?
- Check file paths are correct: `/assets/photos/timeline/photo.jpg`
- Paths are case-sensitive on Vercel
- Make sure photos are committed and pushed to GitHub

### Music not playing?
- Check browser console for errors
- Some browsers block autoplay - user must click music button
- Make sure file path is correct in `index.html`

### Changes not appearing on live site?
- Wait 30-60 seconds for Vercel deployment
- Hard refresh browser: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
- Check Vercel dashboard for deployment status

## 💡 Future Enhancements

Ideas for later:
- Add photo collage to keepsake screen
- Add more timeline moments as new memories happen
- Create Easter egg hidden message
- Add confetti customization (hearts instead of squares)

## 📞 Support

If you need to update something:
1. Edit the appropriate file (HTML, CSS, or JS)
2. Test locally by opening `index.html` in browser
3. Push to GitHub - Vercel handles the rest!

---

Made with ❤️ for Jahnvi
