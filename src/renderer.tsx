
import { html } from 'hono/html'
import { jsxRenderer } from 'hono/jsx-renderer'

declare module 'hono' {
    interface ContextRenderer {
        (content: string | Promise<string>, props?: { title?: string }): Response
    }
}

export const renderer = jsxRenderer(({ children, title }) => {
    return html`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${title || 'Uni-Vault'}</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
          body { font-family: 'Inter', sans-serif; }
        </style>
        <script>
          tailwind.config = {
            theme: {
              extend: {
                colors: {
                  border: "hsl(240 5.9% 90%)",
                  input: "hsl(240 5.9% 90%)",
                  ring: "hsl(240 10% 3.9%)",
                  background: "hsl(0 0% 100%)",
                  foreground: "hsl(240 10% 3.9%)",
                  primary: {
                    DEFAULT: "hsl(240 5.9% 10%)",
                    foreground: "hsl(0 0% 98%)",
                  },
                  secondary: {
                    DEFAULT: "hsl(240 4.8% 95.9%)",
                    foreground: "hsl(240 5.9% 10%)",
                  },
                  destructive: {
                    DEFAULT: "hsl(0 84.2% 60.2%)",
                    foreground: "hsl(0 0% 98%)",
                  },
                  muted: {
                    DEFAULT: "hsl(240 4.8% 95.9%)",
                    foreground: "hsl(240 3.8% 46.1%)",
                  },
                  accent: {
                    DEFAULT: "hsl(240 4.8% 95.9%)",
                    foreground: "hsl(240 5.9% 10%)",
                  },
                  popover: {
                    DEFAULT: "hsl(0 0% 100%)",
                    foreground: "hsl(240 10% 3.9%)",
                  },
                  card: {
                    DEFAULT: "hsl(0 0% 100%)",
                    foreground: "hsl(240 10% 3.9%)",
                  },
                },
              }
            }
          }
        </script>
      </head>
      <body class="bg-background text-foreground antialiased min-h-screen flex flex-col">
        ${title === 'Dashboard' ? children : html`
          <main class="flex-1 container py-6 mx-auto max-w-screen-xl px-4">
            ${children}
          </main>
        `}
      </body>
    </html>
  `
})
