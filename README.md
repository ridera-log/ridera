# SwiftCargo React App

A modern React application built with **Vite**, **TypeScript**, and **Tailwind CSS** for SwiftCargo logistics services.

## Project Structure

```
src/
├── components/
│   ├── Header.tsx           # Navigation header with dark mode toggle
│   ├── Hero.tsx             # Hero section with CTA buttons
│   ├── Services.tsx         # Services grid showcase
│   ├── Features.tsx         # Features/Why Us section
│   └── Footer.tsx           # Footer with links
├── hooks/
│   └── useTheme.tsx         # Dark mode theme management with TypeScript
├── App.tsx                  # Main app component
├── main.tsx                 # React entry point
└── index.css                # Global styles with Tailwind

tsconfig.json               # TypeScript configuration
tsconfig.node.json          # TypeScript config for build files
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

The app will open at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The optimized build will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## Features

- ✈️ **Component-based Architecture** - Modular, reusable React components
- 📘 **TypeScript** - Full type safety with strict mode enabled
- 🎨 **Tailwind CSS** - Utility-first CSS framework for rapid UI development
- 🌙 **Dark Mode** - Built-in dark mode with localStorage persistence
- 📱 **Responsive Design** - Mobile-first design that works on all devices
- ⚡ **Vite** - Lightning-fast build tool and dev server
- 🔄 **Modern React** - React 18 with hooks

## Development

### Adding New Components

Components are written in TypeScript (`.tsx`) with proper type annotations:

```typescript
import { FC } from 'react'

interface ComponentProps {
  // your props
}

const MyComponent: FC<ComponentProps> = ({ prop }) => {
  return <div>Content</div>
}

export default MyComponent
```

### Type Checking

Run TypeScript type checking without building:

```bash
npm run type-check
```

### Styling

All styles use Tailwind CSS utility classes. Customize the theme in `tailwind.config.js`.

### State Management

For more complex state needs, consider adding:
- React Context API (already set up for theme with TypeScript)
- Redux or Zustand for global state

## Next Steps

- [ ] Add About page
- [ ] Add Services detail pages
- [ ] Implement quote calculator form
- [ ] Add testimonials section
- [ ] Set up contact form with backend
- [ ] Add SEO improvements
- [ ] Implement blog section
- [ ] Set up user authentication

## Technologies

- **React 18** - UI library
- **TypeScript 5** - Type-safe JavaScript
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling framework
- **PNPM/NPM** - Package manager

## License

All rights reserved © 2024 SwiftCargo
# ridera
# ridera
