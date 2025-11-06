import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface Notification {
  id: number;
  message: string;
  time: string;
  read: boolean;
}

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './topbar.html',
  styleUrls: ['./topbar.css']
})
export class Topbar {
  @Input() adminName: string = 'Super Admin';
  @Input() role: string = 'Administrator';
  @Input() userAvatar: string = '';
  
  @Output() searchQuery = new EventEmitter<string>();
  @Output() profileClick = new EventEmitter<void>();

  searchText: string = '';
  showProfileMenu: boolean = false;
  showNotifications: boolean = false;

  notifications: Notification[] = [
    {
      id: 1,
      message: 'New event booking request from John Doe',
      time: '5 minutes ago',
      read: false
    },
    {
      id: 2,
      message: 'Payment received for Event #12345',
      time: '1 hour ago',
      read: false
    },
    {
      id: 3,
      message: 'New service provider registration pending approval',
      time: '2 hours ago',
      read: true
    },
    {
      id: 4,
      message: 'System maintenance scheduled for tonight',
      time: '5 hours ago',
      read: true
    }
  ];

  constructor(private router: Router) {}

  get notificationCount(): number {
    return this.notifications.filter(n => !n.read).length;
  }

  onSearch(): void {
    if (this.searchText.trim()) {
      this.searchQuery.emit(this.searchText);
    }
  }

  toggleNotifications(): void {
    this.showNotifications = !this.showNotifications;
    this.showProfileMenu = false;
  }

  toggleProfileMenu(): void {
    this.showProfileMenu = !this.showProfileMenu;
    this.showNotifications = false;
  }

  closeAllDropdowns(): void {
    this.showProfileMenu = false;
    this.showNotifications = false;
  }

  markAllAsRead(): void {
    this.notifications.forEach(notification => {
      notification.read = true;
    });
  }

  navigateToProfile(): void {
    this.router.navigate(['/home/profile']);
    this.showProfileMenu = false;
  }

  navigateToSettings(): void {
    this.router.navigate(['/home/settings']);
    this.showProfileMenu = false;
  }

  logout(): void {
    console.log('Logging out...');
    this.router.navigate(['/login']);
  }
}