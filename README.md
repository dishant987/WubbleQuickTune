# 🎵 Wubble QuickTune Mini - AI Music Preview Generator

A modern, responsive React TypeScript application that generates AI-powered music previews based on mood and genre selection. Built with shadcn/ui components and Tailwind CSS for a beautiful, accessible user experience.

![Wubble QuickTune Mini](https://via.placeholder.com/800x400/6366f1/ffffff?text=Wubble+QuickTune+Mini)

## ✨ Features

### 🎯 Core Functionality
- **Mood & Genre Selection**: Choose from 4 moods (Happy, Sad, Energetic, Chill) and 4 genres (Pop, Lo-fi, Cinematic, EDM)
- **AI Music Generation**: Randomly selects curated tracks based on your mood selection
- **Real-Time Audio Player**: Full-featured audio player with live progress tracking
- **Track Management**: Like/unlike tracks and view recent listening history
- **Download Functionality**: Download your favorite generated tracks

### 🎵 Advanced Audio Features
- **Live Time Display**: Real-time current position and total duration (MM:SS format)
- **Interactive Progress Bar**: Click to seek to any position in the track
- **Accurate Duration Detection**: Automatically detects actual audio file duration
- **Smooth Progress Updates**: 60fps progress bar updates during playback
- **Audio State Management**: Proper play/pause state handling

### 🎨 Modern UI/UX
- **shadcn/ui Components**: Beautiful, accessible components with consistent design
- **Dark/Light Mode**: Seamless theme switching with system preference detection
- **Responsive Design**: Mobile-first approach, works perfectly on all devices
- **Glass Morphism**: Modern backdrop blur effects and gradient backgrounds
- **Smooth Animations**: Micro-interactions and hover effects throughout

### 💾 Data Persistence
- **LocalStorage Integration**: Liked tracks and recent history persist across sessions
- **Zustand State Management**: Efficient, lightweight state management
- **Track History**: Keep track of your last 10 generated tracks

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/wubble-quicktune-mini.git
   cd wubble-quicktune-mini
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Add your music files**
   Create the following directory structure in the `public` folder:
   ```
   public/
   ├── chill/
   │   ├── 1.mp3
   │   ├── 2.mp3
   │   ├── 3.mp3
   │   └── 4.mp3
   ├── energetic/
   │   ├── 1.mp3
   │   ├── 2.mp3
   │   ├── 3.mp3
   │   └── 4.mp3
   ├── happy/
   │   ├── 1.mp3
   │   ├── 2.mp3
   │   ├── 3.mp3
   │   └── 4.mp3
   └── sad/
       ├── 1.mp3
       ├── 2.mp3
       ├── 3.mp3
       └── 4.mp3
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks and concurrent features
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Beautiful, accessible component library

### State Management
- **Zustand** - Lightweight state management with persistence
- **LocalStorage** - Client-side data persistence

### UI Components
- **Radix UI** - Unstyled, accessible UI primitives
- **Lucide React** - Beautiful, customizable icons
- **next-themes** - Theme switching functionality

### Audio
- **Web Audio API** - Native browser audio handling
- **HTML5 Audio** - Cross-browser audio playback

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/                 # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── badge.tsx
│   │   └── select.tsx
│   ├── audio-progress.tsx  # Interactive progress bar
│   ├── track-info.tsx      # Track information display
│   ├── theme-toggle.tsx    # Dark/light mode toggle
│   ├── theme-provider.tsx  # Theme context provider
│   └── progress-bar.tsx    # Generation progress bar
├── data/
│   ├── music-data.ts       # Curated music collection
│   └── app-data.ts         # Moods and genres data
├── store/
│   └── music-store.ts      # Zustand store configuration
├── lib/
│   └── utils.ts            # Utility functions
├── App.tsx                 # Main application component
└── main.tsx                # Application entry point
```

## 🎵 Music Data Structure

The app uses a structured approach to organize music tracks:

```typescript
export const music = {
  chill: [
    {
      id: 1,
      name: "Chill Vibes",
      description: "Relaxing and soothing music to unwind.",
      track: "/chill/1.mp3",
    },
    // ... more tracks
  ],
  // ... other moods
}
```

## 🎨 Customization

### Adding New Moods/Genres
Edit `src/data/app-data.ts`:
```typescript
export const moods = [
  { id: "your-mood", name: "Your Mood", emoji: "😊" },
  // ... existing moods
]
```

### Customizing Themes
Modify CSS variables in `src/index.css`:
```css
:root {
  --primary: 221.2 83.2% 53.3%;
  --secondary: 210 40% 96%;
  /* ... other variables */
}
```

### Adding New Tracks
1. Add MP3 files to the appropriate `public/` subdirectory
2. Update `src/data/music-data.ts` with track information

## 📱 Responsive Breakpoints

- **Mobile**: < 640px - Stacked layout, larger touch targets
- **Tablet**: 640px - 1024px - Balanced grid layouts  
- **Desktop**: > 1024px - Full multi-column layout

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
```bash
npm i -g vercel
vercel --prod
```

## 🔮 Planned Improvements

### 🎵 Audio Enhancements
- [ ] **Volume Control** - Add volume slider with mute/unmute functionality
- [ ] **Playback Speed Control** - Variable speed playback (0.5x, 1x, 1.25x, 1.5x, 2x)
- [ ] **Audio Visualization** - Real-time waveform or frequency visualization
- [ ] **Loop & Shuffle Modes** - Continuous playback with repeat and shuffle options
- [ ] **Crossfade Transitions** - Smooth transitions between tracks

### ⌨️ User Experience
- [ ] **Keyboard Shortcuts** - Space for play/pause, arrow keys for seeking, up/down for volume
- [ ] **PWA Support** - Make the app installable as a Progressive Web App
- [ ] **Offline Mode** - Cache tracks for offline listening
- [ ] **Gesture Controls** - Swipe gestures for mobile navigation

### 🎨 Visual Enhancements
- [ ] **Custom Visualizations** - Animated waveforms during playback
- [ ] **Track Artwork** - Display album art or generated visuals
- [ ] **Advanced Animations** - Framer Motion integration for smooth transitions
- [ ] **Custom Themes** - User-selectable color schemes

### 📊 Advanced Features
- [ ] **Playlist Creation** - Create and manage custom playlists
- [ ] **Social Sharing** - Share generated tracks on social media
- [ ] **Export Functionality** - Export playlists in various formats
- [ ] **Track Ratings** - Rate tracks and show popular tracks first
- [ ] **Advanced Filtering** - Filter by tempo, key, instruments, etc.

### 🔧 Technical Improvements
- [ ] **Real AI Integration** - Connect to actual AI music generation APIs
- [ ] **Database Integration** - Store user data and preferences
- [ ] **User Authentication** - User accounts and cloud sync
- [ ] **Analytics** - Track usage patterns and popular tracks
- [ ] **Performance Optimization** - Lazy loading and code splitting

## 🙏 Acknowledgments

- **shadcn/ui** for the beautiful component library
- **Radix UI** for accessible primitives
- **Tailwind CSS** for the utility-first CSS framework
- **Lucide** for the icon set
- **Zustand** for simple state management

**Made with ❤️ by the Wubble Team**

*Transform your mood into music with AI-powered generation*
```