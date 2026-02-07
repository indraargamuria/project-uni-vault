
import { html } from 'hono/html'

export const Header = (props: { user: any }) => html`
  <header class="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex h-14 items-center gap-4">
            <button id="mobile-menu-trigger" class="md:hidden mr-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9">
                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
            </button>
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
                <div class="flex items-center gap-3">
                    <div class="flex flex-col text-right hidden sm:block">
                        <span class="text-sm font-medium">${props.user.name}</span>
                        <span class="text-xs text-muted-foreground capitalize">${props.user.role}</span>
                    </div>
                    
                    <div class="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold border border-border" title="${props.user.email}">
                         ${props.user.name.charAt(0).toUpperCase()}
                    </div>

                    <div class="h-6 w-px bg-border mx-1 hidden sm:block"></div>

                    <button id="logout-btn" class="flex items-center justify-center h-9 w-9 rounded-md hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors" title="Log out">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
                    </button>
                </div>
            </div>
        </div>
      </header>
      <script>
        const handleLogout = () => {
          // Forget the complex async logic, just hit the "Kill Switch" route
          window.location.href = "/force-logout";
        };

        document.getElementById('logout-btn').addEventListener('click', handleLogout);
      </script>
`
