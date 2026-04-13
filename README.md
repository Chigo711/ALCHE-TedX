#<span class="ted-red">TEDx</span>ALCHE

A Svelte SPA project for<span class="ted-red">TEDx</span>ALCHE event website.

## Features

- Modern Svelte SPA framework
- Vite build tool for fast development
- Responsive design with custom styling
-<span class="ted-red">TED</span> branding and styling

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm

### Installation

```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

The application will open in your browser at `http://localhost:5173`

### Build

Build for production:

```bash
npm run build
```

### Preview

Preview the production build:

```bash
npm run preview
```

## Deployment to Netlify

This project is pre-configured for easy deployment to Netlify.

### Option 1: Connect GitHub Repository (Recommended)

1. Push your code to GitHub:
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. Go to [Netlify](https://netlify.com) and sign up/login
3. Click "New site from Git"
4. Select GitHub and authorize Netlify
5. Select your repository
6. Netlify will automatically detect the `netlify.toml` configuration
7. Click "Deploy site"

The site will automatically redeploy whenever you push to your main branch.

### Option 2: Deploy via Netlify CLI

1. Install Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```

2. Build the project:
   ```bash
   npm run build
   ```

3. Deploy:
   ```bash
   netlify deploy --prod
   ```

### Configuration

The `netlify.toml` file contains the deployment configuration:
- **Build command**: `npm run build`
- **Publish directory**: `dist/`
- **Redirects**: All routes redirect to `/index.html` for SPA routing

## Project Structure

```
src/
├── main.js          # Application entry point
├── App.svelte       # Root component
├── style.css        # Global styles
└── components/      # Reusable Svelte components
```

## Technologies

- **Svelte**: Reactive UI framework
- **Vite**: Next generation frontend tooling
- **JavaScript**: Programming language

## License

MIT
