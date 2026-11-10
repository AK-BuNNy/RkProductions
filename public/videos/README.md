# Local Videos Directory

Place your `.mp4` or `.webm` video files here.

### How it works:
Any video dropped into this folder (`my-website/public/videos/`) will be served directly by the web server at `/videos/<filename>`.

### Example:
If you save a video named `mountain-journey.mp4` in this folder:
- **File location:** `my-website/public/videos/mountain-journey.mp4`
- **Path to use in `Services.tsx`:** `/videos/mountain-journey.mp4`

```tsx
{
  id: 'doc-1',
  title: 'The Mountain Journey',
  category: 'Documentary',
  description: '...',
  videoSrc: '/videos/mountain-journey.mp4', // Full video in modal
  previewSrc: '/videos/mountain-preview.mp4', // Optional short 2-3s clip for hover
  tags: ['8K', 'Documentary'],
  gallery: ['...']
}
```

### Recommendation:
- Keep full videos under **15–25 MB** (compressed with HandBrake or ffmpeg).
- Keep hover preview clips under **1–3 MB** for instant playback on hover.

