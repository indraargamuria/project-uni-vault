
import { html } from 'hono/html'

export const Dashboard = (props: {
    user: any,
    files: any[],
    pendingUsers?: any[],
    stats: {
        totalFiles: number,
        vaultGrowth: number,
        userActivity: number
    },
    navigation: Record<string, string[]>,
    isApproved: boolean,
    activityFeed: any[]
}) => {
    const isAdmin = props.user.role === 'admin';
    const { isApproved, activityFeed } = props;

    return html`
    <div class="flex flex-col md:flex-row gap-8 min-h-[calc(100vh-100px)]">
      <!-- Sidebar -->
      <aside class="w-full md:w-64 flex-shrink-0 space-y-6 hidden md:block">
         <!-- Mobile Toggle could go here, omitting for MVP simplicity -->
         <div class="space-y-4">
             <div class="py-2">
                 <h2 class="mb-2 px-2 text-lg font-semibold tracking-tight">Library</h2>
                 <div class="space-y-1">
                     ${Object.entries(props.navigation).map(([category, subjects]) => html`
                        <div class="space-y-1">
                            <button class="w-full text-left px-2 py-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                                ${category}
                            </button>
                            <div class="ml-4 border-l pl-4 space-y-1">
                                ${subjects.map(subject => html`
                                    <a href="#" class="block text-sm text-muted-foreground hover:text-primary transition-colors">
                                        ${subject}
                                    </a>
                                `)}
                            </div>
                        </div>
                     `)}
                     ${Object.keys(props.navigation).length === 0 ? html`<p class="px-2 text-sm text-muted-foreground">No categories yet.</p>` : ''}
                 </div>
             </div>
         </div>
      </aside>

      <!-- Main Content -->
      <main class="flex-1 space-y-8">
      
      <!-- Breadcrumb -->
      <nav class="flex text-sm text-muted-foreground" aria-label="Breadcrumb">
        <ol class="inline-flex items-center space-x-1 md:space-x-3">
            <li class="inline-flex items-center">
             <a href="#" class="inline-flex items-center hover:text-foreground">
                <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
                Vault
             </a>
            </li>
            <li>
             <div class="flex items-center">
                 <svg class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                 <span class="ml-1 text-sm font-medium text-gray-500 md:ml-2">Dashboard</span>
             </div>
            </li>
        </ol>
      </nav>
      
      <!-- Account Status Banner -->
      ${!isApproved ? html`
        <div class="rounded-lg border border-amber-200 bg-amber-50 p-4 text-amber-800 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-200" role="alert">
            <div class="flex items-center gap-4">
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
               <div>
                  <h5 class="font-medium leading-none tracking-tight">Access Pending</h5>
                  <div class="text-sm opacity-90 mt-1">Your account is awaiting approval from admin (Arga). You will be able to view and download files once approved.</div>
               </div>
            </div>
        </div>
      ` : ''}

      <!-- Header & Stats -->
      <div class="flex items-center justify-between space-y-2">
        <div>
          <h2 class="text-3xl font-bold tracking-tight">Dashboard</h2>
        </div>
      </div>
      
      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div class="rounded-xl border bg-card text-card-foreground shadow-sm">
            <div class="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
                <h3 class="tracking-tight text-sm font-medium">Total Files</h3>
            </div>
            <div class="p-6 pt-0">
                <div class="text-2xl font-bold">${isApproved ? props.stats.totalFiles : '-'}</div>
                <p class="text-xs text-muted-foreground">In the vault</p>
            </div>
        </div>
        <div class="rounded-xl border bg-card text-card-foreground shadow-sm">
            <div class="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
                <h3 class="tracking-tight text-sm font-medium">Vault Growth</h3>
            </div>
            <div class="p-6 pt-0">
                 <div class="text-2xl font-bold">${isApproved ? '+' + props.stats.vaultGrowth : '-'}</div>
                <p class="text-xs text-muted-foreground">New files (7 days)</p>
            </div>
        </div>
        <div class="rounded-xl border bg-card text-card-foreground shadow-sm">
            <div class="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
                <h3 class="tracking-tight text-sm font-medium">Your Activity</h3>
            </div>
            <div class="p-6 pt-0">
                 <div class="text-2xl font-bold">${isApproved ? props.stats.userActivity : '-'}</div>
                <p class="text-xs text-muted-foreground">Uploads & Downloads</p>
            </div>
        </div>
      </div>

      <!-- Admin Section -->
      ${isAdmin ? html`
        <div class="rounded-xl border bg-card text-card-foreground shadow">
          <div class="flex flex-col space-y-1.5 p-6">
            <h3 class="font-semibold leading-none tracking-tight">Admin Approval Queue</h3>
            <p class="text-sm text-muted-foreground">Pending student registrations.</p>
          </div>
          <div class="p-6 pt-0">
            ${props.pendingUsers && props.pendingUsers.length > 0 ? html`
              <div class="relative w-full overflow-auto">
                <table class="w-full caption-bottom text-sm">
                  <thead class="[&_tr]:border-b">
                    <tr class="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                      <th class="h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 w-[100px]">ID</th>
                      <th class="h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">Email</th>
                      <th class="h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">Name</th>
                      <th class="h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody class="[&_tr:last-child]:border-0">
                    ${props.pendingUsers.map(u => html`
                      <tr class="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                        <td class="p-2 align-middle font-medium">${u.id.substring(0, 8)}...</td>
                        <td class="p-2 align-middle">${u.email}</td>
                        <td class="p-2 align-middle">${u.name}</td>
                        <td class="p-2 align-middle text-right">
                          <button onclick="approveUser('${u.email}')" class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-8 px-3">
                            Approve
                          </button>
                        </td>
                      </tr>
                    `)}
                  </tbody>
                </table>
              </div>
            ` : html`<div class="text-sm text-muted-foreground py-4">No pending users found.</div>`}
          </div>
        </div>
      ` : ''}

      <!-- File List & Activity Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        <!-- Files (3 cols) -->
        <div class="lg:col-span-3 rounded-xl border bg-card text-card-foreground shadow overflow-hidden">
            <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 gap-4">
                <div class="space-y-1">
                    <h3 class="font-semibold leading-none tracking-tight">Files</h3>
                    <p class="text-sm text-muted-foreground">Access your learning materials.</p>
                </div>
                <div class="w-full sm:w-auto flex items-center gap-2">
                    <div class="relative w-full sm:w-[250px]">
                        <svg xmlns="http://www.w3.org/2000/svg" class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                        <input id="search-input" type="search" placeholder="Search files..." class="flex h-9 w-full rounded-md border border-input bg-background pl-9 pr-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
                    </div>
                </div>
            </div>
        <div class="flex items-center p-6 pt-0">
            ${isApproved ? html`
             <button onclick="document.getElementById('upload-modal').classList.remove('hidden')" class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 ml-auto">
                Upload File
             </button>
            ` : html`
             <button disabled class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-muted text-muted-foreground h-9 px-4 py-2 ml-auto cursor-not-allowed">
                Upload Locked
             </button>
            `}
        </div>
        <div class="p-6 pt-0">
          ${props.files && props.files.length > 0 ? html`
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              ${props.files.map(f => {
        let icon = html`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-8 w-8 text-blue-500"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>`;
        let bgColor = 'bg-blue-50 dark:bg-blue-950/20';

        if (f.type.includes('image')) {
            icon = html`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-8 w-8 text-purple-500"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>`;
            bgColor = 'bg-purple-50 dark:bg-purple-950/20';
        } else if (f.type.includes('pdf')) {
            icon = html`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-8 w-8 text-red-500"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><path d="M5 17a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-2z"/><line x1="9" x2="9" y1="17" y2="21"/></svg>`;
            bgColor = 'bg-red-50 dark:bg-red-950/20';
        } else if (f.type.includes('sheet') || f.type.includes('excel') || f.type.includes('csv')) {
            icon = html`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-8 w-8 text-green-500"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="8" x2="16" y1="13" y2="13"/><line x1="8" x2="16" y1="17" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>`;
            bgColor = 'bg-green-50 dark:bg-green-950/20';
        }

        return html`
                  <div class="group relative rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-md transition-all hover:scale-[1.02] cursor-pointer">
                    <div class="flex flex-col space-y-1.5 p-6 pb-2">
                        <div class="flex items-center justify-between mb-2">
                             <div class="${bgColor} p-2 rounded-lg">
                                ${icon}
                             </div>
                             <span class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
                                ${f.category || 'General'}
                             </span>
                        </div>
                        <h3 class="font-semibold tracking-tight text-lg line-clamp-1" title="${f.name}">${f.name}</h3>
                        <p class="text-xs text-muted-foreground">${f.subject || 'No Subject'}</p>
                    </div>
                     <div class="p-6 pt-2">
                        <div class="flex items-center justify-between text-xs text-muted-foreground mb-4">
                            <span>${(f.size / 1024).toFixed(1)} KB</span>
                            <span>${new Date(f.createdAt).toLocaleDateString()}</span>
                        </div>
                        <a href="/api/files/download/${f.id}" class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 w-full">
                           Download
                        </a>
                     </div>
                  </div>
                `
    })}
            <div id="empty-search-state" class="hidden col-span-full flex flex-col items-center justify-center py-10 text-center text-muted-foreground">
               <p>No matches found.</p>
            </div>
            </div>
          ` : html`
            <div class="flex flex-col items-center justify-center py-10 text-center text-muted-foreground">
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-10 w-10 mb-4 opacity-50"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" x2="12" y1="18" y2="12"/><line x1="9" x2="15" y1="15" y2="15"/></svg>
               <p>No files in the vault.</p>
            </div>
          `}
        </div>
       </div>
     </div>

     <!-- Activity Feed (1 col) -->
      <div class="lg:col-span-1 space-y-4">
         <div class="rounded-xl border bg-card text-card-foreground shadow h-full">
            <div class="flex flex-col space-y-1.5 p-6">
                <h3 class="font-semibold leading-none tracking-tight">Recent Activity</h3>
                <p class="text-sm text-muted-foreground">Latest updates in the vault.</p>
            </div>
            <div class="p-6 pt-0">
                <div class="space-y-4">
                    ${activityFeed && activityFeed.length > 0 ? activityFeed.map(log => {
        const isUpload = log.action === 'upload';
        return html`
                            <div class="flex items-start gap-4">
                                <span class="relative flex h-2 w-2 shrink-0 overflow-hidden rounded-full mt-2">
                                    <span class="animate-ping absolute inline-flex h-full w-full rounded-full ${isUpload ? 'bg-blue-400 opacity-75' : 'bg-green-400 opacity-75'}"></span>
                                    <span class="relative inline-flex rounded-full h-2 w-2 ${isUpload ? 'bg-blue-500' : 'bg-green-500'}"></span>
                                </span>
                                <div class="space-y-1">
                                    <p class="text-sm font-medium leading-none">
                                        <span class="font-semibold">${log.userName || 'Someone'}</span>
                                        ${isUpload ? 'uploaded' : 'downloaded'}
                                    </p>
                                    <p class="text-xs text-muted-foreground line-clamp-1" title="${log.fileName}">${log.fileName}</p>
                                    <p class="text-[10px] text-muted-foreground">${new Date(log.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                </div>
                            </div>
                        `
    }) : html`<p class="text-sm text-muted-foreground">No recent activity.</p>`}
                </div>
            </div>
         </div>
      </div>

     </div>
     </main>
    </div>

    <script>
      // Search Logic
      const searchInput = document.getElementById('search-input');
      // We need to target the card wrappers. The file cards are inside the grid.
      // selector: .grid > .group
      
      searchInput.addEventListener('input', (e) => {
          const term = e.target.value.toLowerCase();
          const fileCards = document.querySelectorAll('.group.relative'); 
          
          fileCards.forEach(card => {
              const name = card.querySelector('h3').textContent.toLowerCase();
              const subject = card.querySelector('p').textContent.toLowerCase(); 
              
              if (name.includes(term) || subject.includes(term)) {
                  card.parentElement.style.display = '';
                  card.style.display = '';
// ... Inside the map loop
// Actually better to add it after the map expression but before the closing div of the grid.
// Let's modify the map block to include it or append it.

// Replacement strategy: Locate the end of the map.
// The code has:
// ...
// })}
// </div>

// I will target the end of the map and insert the empty state div.
// Then update the script.

// Let's replace the script block first as it is easier to target.
              } else {
                  card.style.display = 'none';
              }
          });
          
          const visibleCount = Array.from(fileCards).filter(c => c.style.display !== 'none').length;
          const emptyState = document.getElementById('empty-search-state');
          if (emptyState) {
              emptyState.classList.toggle('hidden', visibleCount > 0);
          }
      });
      
      // Initial check (in case we want to support pre-filtering later, though unnecessary now)
    </script>

    <!-- Upload Modal -->
    <div id="upload-modal" class="hidden fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
        <div class="bg-card text-card-foreground rounded-xl border shadow-lg max-w-lg w-full p-6 space-y-4">
            <div class="flex flex-col space-y-1.5 text-center sm:text-left">
                <h3 class="text-lg font-semibold leading-none tracking-tight">Upload File</h3>
                <p class="text-sm text-muted-foreground">Add a new document to the vault.</p>
            </div>
            
            <form id="upload-form" class="space-y-4">
                <div class="grid gap-2">
                    <label class="text-sm font-medium leading-none" for="file-upload">File</label>
                    <input id="file-upload" type="file" name="file" required class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                </div>
                <div class="grid gap-2">
                    <label class="text-sm font-medium leading-none" for="subject">Subject</label>
                    <input id="subject" name="subject" placeholder="e.g. Calculus I" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                </div>
                 <div class="grid gap-2">
                    <label class="text-sm font-medium leading-none" for="category">Category</label>
                    <select id="category" name="category" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                        <option value="General">General</option>
                        <option value="Assignment">Assignment</option>
                        <option value="Lecture Notes">Lecture Notes</option>
                        <option value="Exam Paper">Exam Paper</option>
                    </select>
                </div>
                
                <div class="flex justify-end space-x-2">
                    <button type="button" onclick="document.getElementById('upload-modal').classList.add('hidden')" class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
                        Cancel
                    </button>
                    <button type="submit" class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-10 px-4 py-2">
                        Upload
                    </button>
                </div>
            </form>
        </div>
    </div>

    <script>
      // Search Logic
      const searchInput = document.getElementById('search-input');
      const fileCards = document.querySelectorAll('.group.relative'); // Select file cards
      
      searchInput.addEventListener('input', (e) => {
          const term = e.target.value.toLowerCase();
          
          fileCards.forEach(card => {
              const name = card.querySelector('h3').textContent.toLowerCase();
              const subject = card.querySelector('p').textContent.toLowerCase(); // Subject is in the first p tag under h3
              
              if (name.includes(term) || subject.includes(term)) {
                  card.parentElement.classList.remove('hidden'); // Ensure parent wrapper is visible if filtering logic hides entries (grid items are usually direct children though)
                  card.style.display = '';
              } else {
                  card.style.display = 'none';
              }
          });
      });

      // Upload Form Handler
      document.getElementById('upload-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        
        try {
            const res = await fetch('/api/files/upload', {
                method: 'POST',
                body: formData
            });
            
            if (res.ok) {
                alert('File uploaded successfully!');
                window.location.reload();
            } else {
                const data = await res.json();
                alert('Upload failed: ' + data.message);
            }
        } catch (error) {
            console.error(error);
            alert('An error occurred during upload.');
        }
      });

      async function approveUser(email) {
        if (!confirm('Approve ' + email + '?')) return;
        
        try {
            const secret = prompt('Please enter the Admin Secret to confirm:');
            if (!secret) return;

            const res = await fetch('/admin/approve', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'X-Admin-Secret': secret
                },
                body: JSON.stringify({ email })
            });
            
            if (res.ok) {
                alert('User approved!');
                window.location.reload();
            } else {
                alert('Failed to approve');
            }
        } catch (e) {
            console.error(e);
            alert('Error approving user');
        }
      }
    </script>
  `
}
