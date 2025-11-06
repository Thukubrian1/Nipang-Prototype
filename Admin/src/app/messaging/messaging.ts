import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Sidebar } from '../sidebar/sidebar';
import { Topbar } from '../topbar/topbar';


@Component({
  selector: 'app-messaging',
  standalone: true,
  imports: [CommonModule, FormsModule, Sidebar, Topbar],
  templateUrl: './messaging.html',
  styleUrls: ['./messaging.css']
})
export class Messaging implements OnInit {
  
  // User Information
  adminName: string = 'Super Admin';
  role: string = 'Administrator';
  userAvatar: string = '';
  
  // UI State
  isSidebarOpen: boolean = true;
  activeTab: string = 'summary';
  
  // Search States
  summarySearchBy: string = 'title';
  summarySearchQuery: string = '';
  sentSearchBy: string = 'title';
  sentSearchQuery: string = '';
  templateSearchBy: string = 'name';
  templateSearchQuery: string = '';
  
  // Notifications Summary Stats
  sentToday: number = 342;
  sentTodayChange: number = 8.5;
  openRate: number = 78.3;
  openRateChange: number = 12;
  clickRate: number = 23.1;
  clickRateChange: number = 15;
  
  // Notifications Data
  notifications = [
    {
      id: 1,
      title: 'New Discount',
      target: 'All Users (Nairobi)',
      sent: 3000,
      opens: 2500,
      status: 'Delivered'
    },
    {
      id: 2,
      title: 'System Maintenance',
      target: 'All Users',
      sent: 5000,
      opens: 3500,
      status: 'Delivered'
    },
    {
      id: 3,
      title: 'Admin Dashboard Updates',
      target: 'Admins Only',
      sent: 0,
      opens: 0,
      status: 'Pending'
    },
    {
      id: 4,
      title: 'Dashboard Maintenance',
      target: 'Service Providers only',
      sent: 0,
      opens: 0,
      status: 'Pending'
    }
  ];
  
  // Sent Notifications Data
  sentNotifications = [
    {
      id: 1,
      title: 'Welcome Email',
      sender: 'Bnet Organizers',
      receiver: 'Brian Ngugi',
      message: 'Dear {{user_name}},Welcome ...',
      attachment: 'https://nipange-terms',
      status: 'Delivered'
    },
    {
      id: 2,
      title: 'Welcome Email',
      sender: 'Bnet Organizers',
      receiver: 'Brian Ngugi',
      message: 'Dear {{user_name}},Welcome ...',
      attachment: 'https://nipange-terms',
      status: 'Delivered'
    },
    {
      id: 3,
      title: 'Welcome Email',
      sender: 'Bnet Organizers',
      receiver: 'Brian Ngugi',
      message: 'Dear {{user_name}},Welcome ...',
      attachment: 'https://nipange-terms',
      status: 'Delivered'
    },
    {
      id: 4,
      title: 'Welcome Email',
      sender: 'Bnet Organizers',
      receiver: 'Brian Ngugi',
      message: 'Dear {{user_name}},Welcome ...',
      attachment: 'https://nipange-terms',
      status: 'Pending'
    },
    {
      id: 5,
      title: 'Welcome Email',
      sender: 'Bnet Organizers',
      receiver: 'Brian Ngugi',
      message: 'Dear {{user_name}},Welcome ...',
      attachment: 'https://nipange-terms',
      status: 'Pending'
    },
    {
      id: 6,
      title: 'Welcome Email',
      sender: 'Bnet Organizers',
      receiver: 'Brian Ngugi',
      message: 'Dear {{user_name}},Welcome ...',
      attachment: 'https://nipange-terms',
      status: 'Delivered'
    },
    {
      id: 7,
      title: 'Welcome Email',
      sender: 'Bnet Organizers',
      receiver: 'Brian Ngugi',
      message: 'Dear {{user_name}},Welcome ...',
      attachment: 'https://nipange-terms',
      status: 'Pending'
    },
    {
      id: 8,
      title: 'Welcome Email',
      sender: 'Bnet Organizers',
      receiver: 'Brian Ngugi',
      message: 'Dear {{user_name}},Welcome ...',
      attachment: 'https://nipange-terms',
      status: 'Delivered'
    },
    {
      id: 9,
      title: 'Welcome Email',
      sender: 'Bnet Organizers',
      receiver: 'Brian Ngugi',
      message: 'Dear {{user_name}},Welcome ...',
      attachment: 'https://nipange-terms',
      status: 'Pending'
    },
    {
      id: 10,
      title: 'Welcome Email',
      sender: 'Bnet Organizers',
      receiver: 'Brian Ngugi',
      message: 'Dear {{user_name}},Welcome ...',
      attachment: 'https://nipange-terms',
      status: 'Delivered'
    },
    {
      id: 11,
      title: 'Welcome Email',
      sender: 'Bnet Organizers',
      receiver: 'Brian Ngugi',
      message: 'Dear {{user_name}},Welcome ...',
      attachment: 'https://nipange-terms',
      status: 'Pending'
    }
  ];
  
  // Pagination
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 8;
  visiblePages: number[] = [1, 2, 3, 4, 5, 6, 7, 8];
  
  // Templates Stats
  totalMessages: number = 20;
  activeMessages: number = 10;
  inactiveMessages: number = 5;
  
  // Templates Data
  templates = [
    {
      id: 1,
      name: 'Welcome Email',
      type: 'Email/SMS',
      subject: 'Welcome to {{company_name}}',
      status: 'Active'
    },
    {
      id: 2,
      name: 'Event Reminder',
      type: 'Email/SMS',
      subject: 'Upcoming Event Reminder',
      status: 'Active'
    },
    {
      id: 3,
      name: 'Password Reset',
      type: 'Email/SMS',
      subject: 'Password Reset Request',
      status: 'Active'
    },
    {
      id: 4,
      name: 'Easter Holiday Greetings',
      type: 'Email/SMS',
      subject: 'Happy Easter from {{company_name}}! 🐰',
      status: 'Inactive'
    }
  ];

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.calculatePagination();
  }

  handleSidebarToggle(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  handleSearch(query: string): void {
    console.log('Searching for:', query);
  }

  switchTab(tab: string): void {
    this.activeTab = tab;
  }

  // Notifications Summary Actions
  sendNotification(): void {
    console.log('Send notification');
    this.router.navigate(['/messaging/send']);
  }

  editNotification(id: number): void {
    console.log('Edit notification:', id);
    this.router.navigate(['/messaging/edit', id]);
  }

  deleteNotification(id: number): void {
    console.log('Delete notification:', id);
    if (confirm('Are you sure you want to delete this notification?')) {
      this.notifications = this.notifications.filter(n => n.id !== id);
    }
  }

  // Sent Notifications Actions
  editSent(id: number): void {
    console.log('Edit sent notification:', id);
    this.router.navigate(['/messaging/sent/edit', id]);
  }

  resendNotification(id: number): void {
    console.log('Resend notification:', id);
    if (confirm('Are you sure you want to resend this notification?')) {
      // Implement resend logic
    }
  }

  // Pagination Methods
  calculatePagination(): void {
    this.totalPages = Math.ceil(this.sentNotifications.length / this.itemsPerPage);
    this.updateVisiblePages();
  }

  updateVisiblePages(): void {
    const pages: number[] = [];
    const maxVisible = 8;
    
    if (this.totalPages <= maxVisible) {
      for (let i = 1; i <= this.totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (this.currentPage <= 4) {
        for (let i = 1; i <= 7; i++) {
          pages.push(i);
        }
        pages.push(this.totalPages);
      } else if (this.currentPage >= this.totalPages - 3) {
        pages.push(1);
        for (let i = this.totalPages - 6; i <= this.totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        for (let i = this.currentPage - 2; i <= this.currentPage + 2; i++) {
          pages.push(i);
        }
        pages.push(this.totalPages);
      }
    }
    
    this.visiblePages = pages;
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updateVisiblePages();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateVisiblePages();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateVisiblePages();
    }
  }

  goToFirstPage(): void {
    this.currentPage = 1;
    this.updateVisiblePages();
  }

  goToLastPage(): void {
    this.currentPage = this.totalPages;
    this.updateVisiblePages();
  }

  // Templates Actions
  addTemplate(): void {
    console.log('Add template');
    this.router.navigate(['/messaging/templates/new']);
  }

  editTemplate(id: number): void {
    console.log('Edit template:', id);
    this.router.navigate(['/messaging/templates/edit', id]);
  }

  deleteTemplate(id: number): void {
    console.log('Delete template:', id);
    if (confirm('Are you sure you want to delete this template?')) {
      this.templates = this.templates.filter(t => t.id !== id);
    }
  }
}
