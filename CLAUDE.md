# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a single-file interactive Valentine's Day web experience. The entire project is contained in `index.html` - a self-contained HTML file with embedded CSS and JavaScript that creates a multi-chapter romantic journey.

## Architecture

**Single-File Structure**: All code (HTML, CSS, JavaScript) is embedded in `index.html`:
- HTML structure defines 6 chapters (0-5) as fixed-position overlays
- CSS handles all styling, animations, and responsive design
- JavaScript manages chapter navigation, interactive elements, and user interactions

**Chapter System**: The experience is organized into sequential chapters:
- Chapter 0: Opening screen with "Begin" button
- Chapter 1: Heart unlock interaction
- Chapter 2: Timeline of shared memories (carousel)
- Chapter 3: "Reasons I love you" with tap-to-reveal cards
- Chapter 4: "Will you be my Valentine?" with playful Yes/No buttons
- Chapter 5: Final keepsake message with confetti

**State Management**: Simple JavaScript variables track:
- `currentChapter`: Active chapter index
- `currentMoment`: Position in timeline carousel
- `currentReason`: Position in reasons carousel
- `viewedReasons`: Set tracking which reason cards have been revealed
- `yesScale`: Growing scale of "Yes" button as user tries to click "No"

**Key Interactive Features**:
- Chapter 4 implements a playful "No" button that evades the pointer/touch using distance detection and escape logic
- Confetti animation on "Yes" click using canvas-confetti library
- Carousel navigation for timeline and reasons with dot indicators
- Tap-to-reveal mechanism for reason cards with visual state changes

## Customization Points

The HTML includes comments with "PERSONALIZE:" markers indicating where content should be customized:
- Color palette: CSS variables in `:root` (lines 27-40)
- Opening message: Chapter 0 content (line 706)
- Unlock prompt: Chapter 1 text (lines 717-724)
- Timeline moments: `timelineMoments` array in JavaScript (lines 868-894)
- Reasons: `reasons` array in JavaScript (lines 956-985)
- Final message: Chapter 5 keepsake card (lines 802-808)

## Development Commands

**Run locally**: Open `index.html` directly in a web browser (no build step required).

**Live server** (for development with auto-reload):
```bash
# Using Python
python3 -m http.server 8000

# Using Node.js http-server (if installed)
npx http-server -p 8000
```

Then open `http://localhost:8000` in a browser.

## External Dependencies

- **Google Fonts**: Dancing Script font loaded from CDN
- **canvas-confetti**: Confetti animation library (v1.9.2) loaded from jsDelivr CDN

Both dependencies are loaded via CDN - no npm or package management required.

## Mobile Optimization

The design is mobile-first with:
- Viewport meta tags for mobile web apps
- Touch event handling for all interactions
- Responsive media queries for small (≤375px) and large (≥768px) screens
- `-webkit-tap-highlight-color: transparent` to prevent mobile tap highlights
