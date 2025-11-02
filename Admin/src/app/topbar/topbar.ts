import { Component } from '@angular/core';

@Component({
  selector: 'app-topbar',
  imports: [],
  templateUrl: './topbar.html',
  styleUrl: './topbar.css',
})
export class Topbar {

  private menuToggle: HTMLButtonElement | null;
    private searchInput: HTMLInputElement | null;
    private sidebarToggleCallback: (() => void) | null = null;

    constructor() {
        this.menuToggle = document.getElementById('menuToggle') as HTMLButtonElement;
        this.searchInput = document.getElementById('searchInput') as HTMLInputElement;
        
        this.init();
    }

    private init(): void {
        this.setupMenuToggle();
        this.setupSearch();
    }

    /**
     * Setup menu toggle button
     */
    private setupMenuToggle(): void {
        this.menuToggle?.addEventListener('click', () => {
            if (this.sidebarToggleCallback) {
                this.sidebarToggleCallback();
            }
            this.animateHamburger();
        });
    }

    /**
     * Animate hamburger icon
     */
    public animateHamburger(isActive?: boolean): void {
        const lines = this.menuToggle?.querySelectorAll('.hamburger-line');
        
        if (!lines) return;

        if (isActive) {
            lines[0]?.setAttribute('style', 'transform: rotate(45deg) translateY(7px);');
            lines[1]?.setAttribute('style', 'opacity: 0;');
            lines[2]?.setAttribute('style', 'transform: rotate(-45deg) translateY(-7px);');
        } else {
            lines.forEach(line => line.removeAttribute('style'));
        }
    }

    /**
     * Setup search functionality
     */
    private setupSearch(): void {
        this.searchInput?.addEventListener('input', (e) => {
            this.handleSearch((e.target as HTMLInputElement).value);
        });

        this.searchInput?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.executeSearch((e.target as HTMLInputElement).value);
            }
        });
    }

    /**
     * Handle search input
     */
    private handleSearch(query: string): void {
        // Implement debounced search logic
        console.log('Searching for:', query);
        // Add your search API call here
    }

    /**
     * Execute search on Enter key
     */
    private executeSearch(query: string): void {
        console.log('Executing search for:', query);
        // Add your search execution logic here
    }

    /**
     * Set callback for sidebar toggle
     */
    public setSidebarToggleCallback(callback: () => void): void {
        this.sidebarToggleCallback = callback;
    }

    /**
     * Get search input value
     */
    public getSearchValue(): string {
        return this.searchInput?.value || '';
    }

    /**
     * Clear search input
     */
    public clearSearch(): void {
        if (this.searchInput) {
            this.searchInput.value = '';
        }
    }

    /**
     * Update user profile
     */
    public updateUserProfile(name: string, role: string): void {
        const userName = document.querySelector('.user-name');
        const userRole = document.querySelector('.user-role');
        
        if (userName) userName.textContent = name;
        if (userRole) userRole.textContent = role;
    }
    
}
