import { Component } from '@angular/core';

export interface SidebarMenuItem {
    route: string;
    text: string;
    icon: string;
}

@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})


export class Sidebar {

  private sidebar: HTMLElement | null;
    private sidebarItems: NodeListOf<HTMLAnchorElement>;
    private isMobile: boolean;
    private navigationCallback: ((route: string) => void) | null = null;

    constructor() {
        this.sidebar = document.getElementById('sidebar');
        this.sidebarItems = document.querySelectorAll('.sidebar-item');
        this.isMobile = window.innerWidth <= 1024;
        
        this.init();
    }

    private init(): void {
        this.setupNavigation();
        this.setupResponsiveHandlers();
        this.setupClickOutside();
    }

    /**
     * Setup navigation items
     */
    private setupNavigation(): void {
        this.sidebarItems.forEach(item => {
            item.addEventListener('click', (e) => {
                this.handleItemClick(e, item);
            });
        });
    }

    /**
     * Handle sidebar item click
     */
    private handleItemClick(e: Event, clickedItem: HTMLAnchorElement): void {
        e.preventDefault();

        // Remove active class from all items
        this.sidebarItems.forEach(item => {
            item.classList.remove('active');
        });

        // Add active class to clicked item
        clickedItem.classList.add('active');

        // Get route from data attribute
        const route = clickedItem.getAttribute('data-route') || '';

        // Call navigation callback if set
        if (this.navigationCallback) {
            this.navigationCallback(route);
        }

        // Close sidebar on mobile after selection
        if (this.isMobile) {
            this.close();
        }

        console.log(`Navigating to: ${route}`);
    }

    /**
     * Toggle sidebar visibility
     */
    public toggle(): void {
        if (this.isMobile) {
            this.sidebar?.classList.toggle('active');
            if (this.sidebar?.classList.contains('active')) {
                document.body.classList.add('no-scroll');
            } else {
                document.body.classList.remove('no-scroll');
            }
        } else {
            this.sidebar?.classList.toggle('collapsed');
        }
    }

    /**
     * Open sidebar
     */
    public open(): void {
        this.sidebar?.classList.remove('collapsed');
        if (this.isMobile) {
            this.sidebar?.classList.add('active');
            document.body.classList.add('no-scroll');
        }
    }

    /**
     * Close sidebar
     */
    public close(): void {
        this.sidebar?.classList.remove('active');
        this.sidebar?.classList.add('collapsed');
        document.body.classList.remove('no-scroll');
    }

    /**
     * Check if sidebar is open
     */
    public isOpen(): boolean {
        if (this.isMobile) {
            return this.sidebar?.classList.contains('active') || false;
        }
        return !this.sidebar?.classList.contains('collapsed');
    }

    /**
     * Set active menu item by route
     */
    public setActiveByRoute(route: string): void {
        this.sidebarItems.forEach(item => {
            if (item.getAttribute('data-route') === route) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }

    /**
     * Set active menu item by index
     */
    public setActiveByIndex(index: number): void {
        this.sidebarItems.forEach((item, i) => {
            if (i === index) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }

    /**
     * Get active menu item
     */
    public getActiveItem(): HTMLAnchorElement | null {
        return document.querySelector('.sidebar-item.active');
    }

    /**
     * Get active route
     */
    public getActiveRoute(): string | null {
        const activeItem = this.getActiveItem();
        return activeItem?.getAttribute('data-route') || null;
    }

    /**
     * Setup responsive handlers
     */
    private setupResponsiveHandlers(): void {
        let resizeTimeout: number;

        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = window.setTimeout(() => {
                this.handleResize();
            }, 250);
        });
    }

    /**
     * Handle window resize
     */
    private handleResize(): void {
        const wasMobile = this.isMobile;
        this.isMobile = window.innerWidth <= 1024;

        // Reset sidebar state when switching between mobile and desktop
        if (wasMobile !== this.isMobile) {
            this.sidebar?.classList.remove('active', 'collapsed');
            document.body.classList.remove('no-scroll');
        }
    }

    /**
     * Setup click outside handler
     */
    private setupClickOutside(): void {
        document.addEventListener('click', (e) => {
            const target = e.target as HTMLElement;
            
            if (this.isMobile && 
                this.sidebar?.classList.contains('active') &&
                !this.sidebar.contains(target) &&
                !target.closest('#menuToggle')) {
                this.close();
            }
        });
    }

    /**
     * Set navigation callback
     */
    public setNavigationCallback(callback: (route: string) => void): void {
        this.navigationCallback = callback;
    }

    /**
     * Add menu item dynamically
     */
    public addMenuItem(item: SidebarMenuItem, position?: number): void {
        const nav = this.sidebar?.querySelector('.sidebar-nav');
        if (!nav) return;

        const menuItem = document.createElement('a');
        menuItem.href = '#';
        menuItem.className = 'sidebar-item';
        menuItem.setAttribute('data-route', item.route);
        menuItem.innerHTML = `
            ${item.icon}
            <span class="sidebar-text">${item.text}</span>
        `;

        if (position !== undefined && position < nav.children.length) {
            nav.insertBefore(menuItem, nav.children[position]);
        } else {
            nav.appendChild(menuItem);
        }

        // Re-setup navigation
        this.sidebarItems = document.querySelectorAll('.sidebar-item');
        this.setupNavigation();
    }

    /**
     * Remove menu item by route
     */
    public removeMenuItem(route: string): void {
        this.sidebarItems.forEach(item => {
            if (item.getAttribute('data-route') === route) {
                item.remove();
            }
        });

        // Update items list
        this.sidebarItems = document.querySelectorAll('.sidebar-item');
    }

}
