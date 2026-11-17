# Local Thumbnails Directory

Place your cover / poster images here for the Services & Featured section.

### How it works:
Any image placed in this folder (`my-website/public/thumbnails/`) can be referenced as `/thumbnails/<filename>`.

### Supported Formats:
- `.jpg` / `.jpeg`
- `.png`
- `.webp` (Recommended for fast loading)

### Example in `Services.tsx`:
```tsx
{
  id: 'doc-1',
  title: 'KAANALIN THAAGAM',
  category: 'Short Film',
  thumbnail: '/thumbnails/kaanalin-thaagam.jpg', // Image displayed BEFORE hover
  videoSrc: '/videos/kaanalin thaagam teaser.mp4',
  previewSrc: '/videos/kaanalin thaagam teaser_hover.mp4', // Video played ON hover
  tags: ['Cinematic', 'Short Film'],
}
```

