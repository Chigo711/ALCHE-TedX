# Image Assets Directory

This directory contains all image assets for the<span class="ted-red">TEDx</span>ALCHE project.

## Directory Structure

```
public/images/
├── backgrounds/
│   ├── island/
│   │   ├── island-1.jpg
│   │   ├── island-2.jpg
│   │   └── island-3.jpg
│   └── college/
│       ├── college-1.jpg
│       ├── college-2.jpg
│       └── college-3.jpg
└── README.md (this file)
```

## Adding Images

### Island Themed Backgrounds (3 required)
Add 3 high-quality images of tropical islands or beaches to `backgrounds/island/`:
- **Recommended sources**: Unsplash, Pexels, Pixabay
- **Search terms**: "tropical beach", "island paradise", "Mauritius beach"
- **Suggested dimensions**: 1920x1080px or wider for backgrounds
- **Suggested names**: `island-1.jpg`, `island-2.jpg`, `island-3.jpg`

### College Themed Backgrounds (3 required)
Add 3 images showing diverse students in academic/campus settings to `backgrounds/college/`:
- **Recommended sources**: Unsplash, Pexels, Pixabay
- **Search terms**: "diverse students", "university campus", "students studying together"
- **Suggested dimensions**: 1920x1080px or wider for backgrounds
- **Suggested names**: `college-1.jpg`, `college-2.jpg`, `college-3.jpg`

## Free Image Resources

- [Unsplash](https://unsplash.com) - High quality, free to use
- [Pexels](https://www.pexels.com) - Free stock photos
- [Pixabay](https://pixabay.com) - Free images and photos

## Usage in Components

Reference images in components like:
```svelte
<img src="/images/backgrounds/island/island-1.jpg" alt="Island background" />
```

The `/` prefix ensures the path is relative to the `public` directory.
