import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './topbar.html',
  styleUrls: ['./topbar.css']
})
export class Topbar {
  @Input() organizerName: string = 'BNET ORGANIZERS';
  @Input() location: string = 'Nairobi, Kenya';
  @Input() userAvatar: string = 'assets/images/user-avatar.png';
  @Input() notificationCount: number = 0;
  
  @Output() searchQuery = new EventEmitter<string>();
  @Output() notificationClick = new EventEmitter<void>();
  @Output() profileClick = new EventEmitter<void>();

  searchText: string = '';
  showNotifications: boolean = false;
  showProfileMenu: boolean = false;

  notifications = [
    { id: 1, title: 'New booking received', message: 'Tech Conference 2025', time: '5 min ago', read: false },
    { id: 2, title: 'Payment processed', message: 'KSh 25,000 deposited', time: '1 hour ago', read: false },
    { id: 3, title: 'Event reminder', message: 'Corporate Meetup tomorrow', time: '3 hours ago', read: true }
  ];

  constructor(private router: Router) {}

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

  handleNotificationClick(notificationId: number): void {
    console.log('Notification clicked:', notificationId);
    // Mark as read
    const notification = this.notifications.find(n => n.id === notificationId);
    if (notification) {
      notification.read = true;
    }
    this.notificationClick.emit();
  }

  navigateToProfile(): void {
    this.router.navigate(['/home/profile']);
    this.showProfileMenu = false;
  }

  navigateToSettings(): void {
    this.router.navigate(['/home/profile']);
    this.showProfileMenu = false;
  }

  logout(): void {
    // Implement logout logic
    console.log('Logging out...');
    this.router.navigate(['/login']);
  }

  get unreadCount(): number {
    return this.notifications.filter(n => !n.read).length;
  }
}