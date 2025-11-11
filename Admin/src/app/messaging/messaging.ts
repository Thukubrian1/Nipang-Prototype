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
  
  // Template variable properties for message personalization
  user_name: string = '{{user_name}}';
  user_email: string = '{{user_email}}';
  event_name: string = '{{event_name}}';
  date: string = '{{date}}';
  time: string = '{{time}}';
  company_name: string = '{{company_name}}';
  
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
      content: 'Dear {{user_name}},\n\nWelcome to our platform! We are excited to have you on board.',
      attachment: 'terms-and-conditions.pdf',
      status: 'Active'
    },
    {
      id: 2,
      name: 'Event Reminder',
      type: 'Email/SMS',
      subject: 'Upcoming Event Reminder',
      content: 'Event Reminder',
      attachment: '',
      status: 'Active'
    },
    {
      id: 3,
      name: 'Password Reset',
      type: 'Email/SMS',
      subject: 'Password Reset Request',
      content: 'Password reset content',
      attachment: '',
      status: 'Active'
    },
    {
      id: 4,
      name: 'Easter Holiday Greetings',
      type: 'Email/SMS',
      subject: 'Happy Easter from {{company_name}}! 🐰',
      content: 'Easter greetings',
      attachment: '',
      status: 'Inactive'
    }
  ];

  // Modal States
  showNotificationModal: boolean = false;
  notificationModalMode: 'add' | 'edit' = 'add';
  showTemplateModal: boolean = false;
  templateModalMode: 'add' | 'edit' = 'add';
  showDeleteNotificationModal: boolean = false;
  showDeleteTemplateModal: boolean = false;
  showEditSentModal: boolean = false;
  showResendModal: boolean = false;
  
  // Form Models
  notificationForm = {
    id: 0,
    title: '',
    message: '',
    target: '',
    sendTime: 'now',
    scheduledDate: ''
  };

  templateForm = {
    id: 0,
    name: '',
    type: '',
    subject: '',
    content: '',
    attachment: '',
    status: 'Active'
  };

  sentForm = {
    id: 0,
    templateName: '',
    templateType: 'Email/SMS',
    subject: '',
    message: '',
    attachment: '',
    status: 'Active'
  };

  // Temporary storage for delete operations
  deleteNotificationId: number = 0;
  deleteTemplateId: number = 0;
  resendNotificationId: number = 0;

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

  // =============== NOTIFICATION MODAL METHODS ===============

  openSendNotificationModal(): void {
    this.notificationModalMode = 'add';
    this.resetNotificationForm();
    this.showNotificationModal = true;
  }

  openEditNotificationModal(notification: any): void {
    this.notificationModalMode = 'edit';
    this.notificationForm = {
      id: notification.id,
      title: notification.title,
      message: '',
      target: notification.target,
      sendTime: 'now',
      scheduledDate: ''
    };
    this.showNotificationModal = true;
  }

  closeNotificationModal(): void {
    this.showNotificationModal = false;
    this.resetNotificationForm();
  }

  resetNotificationForm(): void {
    this.notificationForm = {
      id: 0,
      title: '',
      message: '',
      target: '',
      sendTime: 'now',
      scheduledDate: ''
    };
  }

  saveNotification(): void {
    console.log('Saving notification:', this.notificationForm);
    
    const newNotification = {
      id: this.notifications.length + 1,
      title: this.notificationForm.title,
      target: this.notificationForm.target || 'All Users',
      sent: 0,
      opens: 0,
      status: 'Pending'
    };
    
    this.notifications.push(newNotification);
    this.closeNotificationModal();
    
    // Show success message
    alert('Notification created successfully!');
  }

  updateNotification(): void {
    console.log('Updating notification:', this.notificationForm);
    
    const index = this.notifications.findIndex(n => n.id === this.notificationForm.id);
    if (index !== -1) {
      this.notifications[index] = {
        ...this.notifications[index],
        title: this.notificationForm.title,
        target: this.notificationForm.target
      };
    }
    
    this.closeNotificationModal();
    
    // Show success message
    alert('Notification updated successfully!');
  }

  openDeleteNotificationModal(id: number): void {
    this.deleteNotificationId = id;
    this.showDeleteNotificationModal = true;
  }

  closeDeleteNotificationModal(): void {
    this.showDeleteNotificationModal = false;
    this.deleteNotificationId = 0;
  }

  confirmDeleteNotification(): void {
    this.notifications = this.notifications.filter(n => n.id !== this.deleteNotificationId);
    this.closeDeleteNotificationModal();
    alert('Notification deleted successfully!');
  }

  // =============== TEMPLATE MODAL METHODS ===============

  openAddTemplateModal(): void {
    this.templateModalMode = 'add';
    this.resetTemplateForm();
    this.showTemplateModal = true;
  }

  openEditTemplateModal(template: any): void {
    this.templateModalMode = 'edit';
    this.templateForm = {
      id: template.id,
      name: template.name,
      type: template.type,
      subject: template.subject,
      content: template.content || '',
      attachment: template.attachment || '',
      status: template.status
    };
    this.showTemplateModal = true;
  }

  closeTemplateModal(): void {
    this.showTemplateModal = false;
    this.resetTemplateForm();
  }

  resetTemplateForm(): void {
    this.templateForm = {
      id: 0,
      name: '',
      type: '',
      subject: '',
      content: '',
      attachment: '',
      status: 'Active'
    };
  }

  toggleTemplateStatus(): void {
    this.templateForm.status = this.templateForm.status === 'Active' ? 'Inactive' : 'Active';
  }

  removeAttachment(): void {
    this.templateForm.attachment = '';
  }

  saveTemplate(): void {
    console.log('Saving template:', this.templateForm);
    
    const newTemplate = {
      id: this.templates.length + 1,
      name: this.templateForm.name,
      type: this.templateForm.type,
      subject: this.templateForm.subject,
      content: this.templateForm.content,
      attachment: this.templateForm.attachment,
      status: this.templateForm.status
    };
    
    this.templates.push(newTemplate);
    this.totalMessages++;
    
    if (this.templateForm.status === 'Active') {
      this.activeMessages++;
    } else {
      this.inactiveMessages++;
    }
    
    this.closeTemplateModal();
    alert('Template created successfully!');
  }

  updateTemplate(): void {
    console.log('Updating template:', this.templateForm);
    
    const index = this.templates.findIndex(t => t.id === this.templateForm.id);
    if (index !== -1) {
      const oldStatus = this.templates[index].status;
      
      this.templates[index] = {
        id: this.templateForm.id,
        name: this.templateForm.name,
        type: this.templateForm.type,
        subject: this.templateForm.subject,
        content: this.templateForm.content,
        attachment: this.templateForm.attachment,
        status: this.templateForm.status
      };
      
      // Update stats if status changed
      if (oldStatus !== this.templateForm.status) {
        if (this.templateForm.status === 'Active') {
          this.activeMessages++;
          this.inactiveMessages--;
        } else {
          this.activeMessages--;
          this.inactiveMessages++;
        }
      }
    }
    
    this.closeTemplateModal();
    alert('Template updated successfully!');
  }

  openDeleteTemplateModal(id: number): void {
    this.deleteTemplateId = id;
    this.showDeleteTemplateModal = true;
  }

  closeDeleteTemplateModal(): void {
    this.showDeleteTemplateModal = false;
    this.deleteTemplateId = 0;
  }

  confirmDeleteTemplate(): void {
    const template = this.templates.find(t => t.id === this.deleteTemplateId);
    
    if (template) {
      if (template.status === 'Active') {
        this.activeMessages--;
      } else {
        this.inactiveMessages--;
      }
      this.totalMessages--;
    }
    
    this.templates = this.templates.filter(t => t.id !== this.deleteTemplateId);
    this.closeDeleteTemplateModal();
    alert('Template deleted successfully!');
  }

  // =============== SENT NOTIFICATIONS METHODS ===============

  openEditSentModal(sent: any): void {
    this.sentForm = {
      id: sent.id,
      templateName: sent.title,
      templateType: 'Email/SMS',
      subject: 'Welcome to {{company_name}}',
      message: 'Dear {{user_name}},\n\nWelcome to our platform! We are excited to have you on board.',
      attachment: 'terms-and-conditions.pdf',
      status: 'Active'
    };
    this.showEditSentModal = true;
  }

  closeEditSentModal(): void {
    this.showEditSentModal = false;
    this.resetSentForm();
  }

  resetSentForm(): void {
    this.sentForm = {
      id: 0,
      templateName: '',
      templateType: 'Email/SMS',
      subject: '',
      message: '',
      attachment: '',
      status: 'Active'
    };
  }

  toggleSentStatus(): void {
    this.sentForm.status = this.sentForm.status === 'Active' ? 'Inactive' : 'Active';
  }

  removeSentAttachment(): void {
    this.sentForm.attachment = '';
  }

  updateSentNotification(): void {
    console.log('Updating sent notification:', this.sentForm);
    
    const index = this.sentNotifications.findIndex(s => s.id === this.sentForm.id);
    if (index !== -1) {
      // Update the sent notification data
      this.sentNotifications[index] = {
        ...this.sentNotifications[index],
        title: this.sentForm.templateName
      };
    }
    
    this.closeEditSentModal();
    alert('Notification updated successfully!');
  }

  openResendModal(id: number): void {
    this.resendNotificationId = id;
    this.showResendModal = true;
  }

  closeResendModal(): void {
    this.showResendModal = false;
    this.resendNotificationId = 0;
  }

  confirmResend(): void {
    console.log('Resending notification:', this.resendNotificationId);
    this.closeResendModal();
    alert('Notification resent successfully!');
  }

  editSent(id: number): void {
    console.log('Edit sent notification:', id);
    this.router.navigate(['/messaging/sent/edit', id]);
  }

  resendNotification(id: number): void {
    console.log('Resend notification:', id);
    if (confirm('Are you sure you want to resend this notification?')) {
      alert('Notification resent successfully!');
    }
  }

  // =============== PAGINATION METHODS ===============

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
}