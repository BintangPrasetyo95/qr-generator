# Design Reference: Shrinker Tool

This document extracts the core design principles, technical architecture, and UI/UX patterns from the **BintangPrasetyo95's Shrinker** tool. It serves as a blueprint for building future client-side processing tools with a similar premium, modern, and user-friendly experience.

## 1. Technical Stack & Architecture
- **Core Strategy**: 100% Client-side processing. No server uploads. This ensures user privacy, reduces server costs to zero, and provides immediate feedback.
- **Languages**: Vanilla HTML5, CSS3, JavaScript (ES6+). Avoids heavy frameworks, ensuring extremely fast load times and simple deployment (e.g., GitHub Pages).
- **Libraries Used**:
  - `pdf.js` (Mozilla): To parse and render PDF pages.
  - `pdf-lib`: To reconstruct and save modified PDFs.
  - `jszip`: To unpack, modify, and repack DOCX (ZIP) archives.
- **Processing Engine**:
  - **Iterative Approach**: Uses a `while` loop to repeatedly process files at decreasing quality/scale until a specific user-defined size threshold is met.
  - **Canvas Manipulation**: Uses the HTML5 `<canvas>` API as the primary engine for image compression (scaling down dimensions and lowering JPEG quality).

## 2. Visual Design & Theme (The "Bee" Theme)
- **Aesthetics**: Dark mode with vibrant glassmorphism.
- **Color Palette**:
  - **Background**: Deep black/brown (`#0d0c00`).
  - **Text**: Off-white/cream (`#fff8e1`) for primary text, muted gold (`#c9a84c`) for secondary.
  - **Accents (Bee theme)**: Amber (`#f5a800`) and Yellow (`#ffda00`).
  - **Status Colors**: Green (`#a8e063`) for success, Red (`#ff4d6d`) for errors/warnings.
- **Visual Elements**:
  - **Background Orbs**: Large, blurred, slowly animating radial gradients in the background to add depth and life without cluttering the screen.
  - **Glass Cards**: Content is housed in translucent cards with `backdrop-filter: blur(24px)` and subtle borders, creating a modern "glass" effect.
  - **Subtle Textures**: SVG-based honeycomb background patterns on the body and striped patterns on buttons/icons to reinforce the theme.
  - **Gradients**: Text gradients and button gradients to draw attention to primary actions.

## 3. UI/UX Flow (State Machine)
The application acts as a linear wizard, hiding and showing panels based on the current state:

1. **Initial State (Upload)**:
   - Centered drag-and-drop zone with a pulsing icon.
   - Clear list of supported formats with colored badges.
2. **Configuration State (Settings)**:
   - File info bar appears at the top (with a remove/cancel button).
   - Target size inputs (number + MB/KB dropdown) with visual flow diagrams indicating "Original Size -> Shrinking -> Target Size".
   - Compression mode selector (Normal, Balanced, Aggressive) styled as selectable cards.
   - Primary "Start Compression" button.
3. **Processing State (Progress)**:
   - Real-time statistics grid (Iteration, Quality, Scale, Estimated Time Remaining).
   - Animated progress bar (with moving bee stripes).
   - Auto-scrolling iteration log showing the exact byte size and status of each pass.
   - Before/After metric cards.
4. **Completion State (Result)**:
   - Success/Warning icon with an animated pop-in.
   - Final size and reduction percentage statistics.
   - Primary "Download" button and a secondary "Compress Another" button.

## 4. Key UX Best Practices to Replicate
- **Immediate Feedback**: The UI updates constantly during heavy processing, showing exact iterations and logs. This prevents the user from thinking the app has frozen.
- **Non-blocking Operations**: Extensive use of `async`/`await` and `setTimeout`/`sleep()` inside heavy `while` loops to yield control back to the browser's render thread, keeping the UI completely responsive.
- **Graceful Degradation**: If the target size is physically impossible (e.g., minimum scale/quality reached), the tool gracefully halts, returns the best possible result, and clearly explains why to the user.
- **Micro-interactions**: Hover states on buttons (translating Y), pulsing rings on the dropzone, spinning loaders, and smooth slide-down animations for panels transitioning in.
- **Visual Context**: Icons change dynamically based on file type (red for PDF, blue for DOCX, green for Images).

## 5. File Structure Blueprint
When creating a new tool, follow this simple structure:
- `index.html`: Contains the layout, SVG icons inline, and library CDN links.
- `style.css`: Contains CSS variables (design tokens), animations, glassmorphism utilities, and responsive media queries.
- `app.js`: Contains state variables, DOM references, event listeners, and the core processing logic divided into clear async functions.
