
import { html } from 'hono/html'

export const Header = (props: { user: any }) => html`
  <header class="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex h-14 items-center gap-4">
            <div class="mr-4 flex">
                <a class="mr-6 flex items-center space-x-2 font-bold" href="#">
                    <span>Uni-Vault</span>
                </a>
            </div>
            
            <div class="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                <div class="w-full flex-1 md:w-auto md:flex-none">
                     <!-- Search could go here globally later -->
                </div>
                <!-- User Nav -->
                <div class="flex items-center gap-4">
                    <div class="flex flex-col text-right hidden sm:block">
                        <span class="text-sm font-medium">${props.user.name}</span>
                        <span class="text-xs text-muted-foreground capitalize">${props.user.role}</span>
                    </div>
                    <div class="relative inline-block text-left group">
                         <button class="flex items-center gap-2 rounded-full bg-secondary p-1 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                             <div class="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                                 ${props.user.name.charAt(0).toUpperCase()}
                             </div>
                         </button>
                         <!-- Dropdown Menu -->
                         <div class="absolute right-0 mt-2 w-56 origin-top-right rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in fade-in-80 hidden group-hover:block focus-within:block z-50" role="menu">
                            <div class="p-2 bg-popover rounded-md border shadow-md">
                                <p class="text-xs font-medium text-muted-foreground px-2 py-1.5">${props.user.email}</p>
                                <div class="h-px bg-muted my-1"></div>
                                <button id="logout-btn" class="relative flex w-full cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-destructive/10 hover:text-destructive data-[disabled]:pointer-events-none data-[disabled]:opacity-50 font-medium text-red-500">
                                    Log out
                                </button>
                            </div>
                         </div>
                    </div>
                </div>
            </div>
        </div>
      </header>
      <script>
        const handleLogout = async () => {
          try {
            // 1. Call the signout endpoint
            // Equivalent to authClient.signOut()
            await fetch('/api/auth/sign-out', { method: 'POST' });
            
            // 2. Clear local storage to ensure no ghost sessions remain
            localStorage.clear();
            sessionStorage.clear();
        
            // 3. FORCE the redirect. 
            // This stops the 'Unexpected end of JSON' from blocking the UI
            window.location.replace("/login");
          } catch (error) {
            console.error("Logout error:", error);
            // If the server errors out, we still want the user out of the dashboard
            window.location.href = "/login";
          }
        };

        document.getElementById('logout-btn').addEventListener('click', handleLogout);
      </script>
`
