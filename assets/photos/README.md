# 📸 Photo Assets Folder

This folder contains all images used in the Valentine's experience.

## 📁 Folder Structure

```
photos/
├── timeline/      ← Chapter 3: Timeline photos
├── reasons/       ← Chapter 4: Reason card photos
└── keepsake/      ← Chapter 6: Final keepsake photos (optional)
```

## 📋 Adding Photos

### Timeline Photos (Chapter 3)

1. **Save photos here:**
   ```
   photos/timeline/pink-dress.jpg
   photos/timeline/first-date.jpg
   photos/timeline/vacation.jpg
   ```

2. **Update in `js/script.js`:**
   ```javascript
   const timelineMoments = [
       {
           title: "The Pink Dress",
           memory: "Your memory text here",
           reflection: "Your reflection here",
           image: "/assets/photos/timeline/pink-dress.jpg"
       }
   ];
   ```

### Reason Photos (Chapter 4)

1. **Save photos here:**
   ```
   photos/reasons/caring.jpg
   photos/reasons/laugh.jpg
   photos/reasons/together.jpg
   ```

2. **Update in `js/script.js`:**
   ```javascript
   const reasons = [
       {
           text: "You love taking care of other people.",
           image: "/assets/photos/reasons/caring.jpg"
       }
   ];
   ```

## ⚡ Photo Guidelines

### Size & Format
- **Format:** JPG (photos) or PNG (graphics)
- **Max width:** 800px is plenty
- **File size:** Keep under 500KB each
- **Compress:** Use [TinyPNG.com](https://tinypng.com) before uploading

### Naming
- Use lowercase
- No spaces (use hyphens: `first-date.jpg` not `first date.jpg`)
- Be descriptive: `pink-dress.jpg` not `img1.jpg`

### Aspect Ratio
- **Timeline photos:** 4:3 or 16:9 works well
- **Reason photos:** 4:3 is ideal
- Don't worry too much - they'll be cropped nicely

## 🚀 Quick Deploy

After adding photos:

```bash
git add assets/photos/
git add js/script.js
git commit -m "Added photos to timeline and reasons"
git push
```

Vercel will auto-deploy in ~30 seconds!

## 💡 Tips

1. **Test locally first:** Open `index.html` to preview
2. **Mobile matters:** Photos look different on phones - test there too
3. **Compression is key:** Big photos = slow site
4. **Path is everything:** `/assets/photos/timeline/photo.jpg` (note the leading slash)

## ❓ Troubleshooting

**Photo not showing?**
- Check filename matches exactly (case-sensitive!)
- Make sure path starts with `/assets/photos/`
- Verify file is actually uploaded to GitHub
- Hard refresh browser: Cmd+Shift+R

**Too slow to load?**
- Compress images (aim for 200-300KB each)
- Resize to 800px wide before uploading
- Use JPG for photos (not PNG)
