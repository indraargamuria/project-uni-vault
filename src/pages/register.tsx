
import { html } from 'hono/html'

export const Register = () => html`
  <div class="flex items-center justify-center min-h-[60vh]">
    <div class="rounded-xl border border-zinc-200 bg-card text-card-foreground shadow-sm w-full max-w-[350px]">
      <div class="p-6 space-y-1">
        <h3 class="font-semibold tracking-tight text-2xl">Create an account</h3>
        <p class="text-sm text-muted-foreground">Enter your email below to create your account.</p>
      </div>
      <div class="p-6 pt-0 grid gap-4">
        <form id="register-form">
            <div class="grid gap-2">
                <label class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" for="name">Name</label>
                <input class="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50" id="name" placeholder="Nilam" required type="text" name="name">
            </div>
          <div class="grid gap-2 mt-2">
            <label class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" for="email">Email</label>
            <input class="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50" id="email" placeholder="m@example.com" required type="email" name="email">
          </div>
          <div class="grid gap-2 mt-2">
            <label class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" for="password">Password</label>
            <input class="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50" id="password" required type="password" name="password">
          </div>
          <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 w-full mt-4" type="submit">Sign Up</button>
        </form>
        
        <div class="text-center text-sm">
             Already have an account? <a href="/login" class="underline hover:text-primary">Login</a>
        </div>

        <div id="error-message" class="text-sm text-destructive hidden text-center"></div>
      </div>
    </div>
  </div>

  <script>
    document.getElementById('register-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const errorDiv = document.getElementById('error-message');
      
      try {
        const res = await fetch('/api/auth/sign-up/email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, password })
        });

        if (res.ok) {
          window.location.href = '/dashboard';
        } else {
          const data = await res.json();
          errorDiv.textContent = data.message || 'Registration failed';
          errorDiv.classList.remove('hidden');
        }
      } catch (err) {
        errorDiv.textContent = 'Network error occurred';
        errorDiv.classList.remove('hidden');
      }
    });
  </script>
`
