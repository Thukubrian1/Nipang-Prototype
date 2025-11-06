import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Sidebar } from '../sidebar/sidebar';
import { Topbar } from '../topbar/topbar';

interface Admin {
  id: string;
  name: string;
  email: string;
  lastLogin: string;
  role: string;
  status: string;
}

interface ServiceProvider {
  id: string;
  name: string;
  email: string;
  phone: string;
  categories: string;
  events: number;
  status: string;
}

interface AppUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  userType: string;
  eventsAttended: number;
  status: string;
}

interface ProviderStats {
  active: number;
  pending: number;
  avgSessionTime: string;
  newThisWeek: number;
  sessionChange: string;
}

interface UserStats {
  active: number;
  premium: number;
  avgSessionTime: string;
  newThisWeek: number;
  sessionChange: string;
  premiumPercentage: number;
}

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule, Sidebar, Topbar],
  templateUrl: './users.html',
  styleUrl: './users.css',
})
export class Users implements OnInit {
  
  // User Information
  adminName: string = 'Super Admin';
  role: string = 'Administrator';
  userAvatar: string = '';
  
  // UI State
  isSidebarOpen: boolean = true;
  activeTab: string = 'admins';
  
  // Filters
  providerFilter: string = '';
  userFilter: string = '';
  searchQuery: string = '';

  // Provider Stats
  providerStats: ProviderStats = {
    active: 100,
    pending: 10,
    avgSessionTime: '10m',
    newThisWeek: 3,
    sessionChange: '2m vs'
  };

  // User Stats
  userStats: UserStats = {
    active: 1000,
    premium: 10,
    avgSessionTime: '10m',
    newThisWeek: 50,
    sessionChange: '2m vs',
    premiumPercentage: 1
  };

  // Admins Data
  admins: Admin[] = [
    { id: '1', name: 'Brian Ngugi', email: 'b****@gmail.com', lastLogin: 'Currently Online', role: 'Super admin', status: 'Active' },
    { id: '2', name: 'Brian Ngugi', email: 'b****@gmail.com', lastLogin: 'Yesterday', role: 'Moderator', status: 'Active' },
    { id: '3', name: 'Brian Ngugi', email: 'b****@gmail.com', lastLogin: '2 hours ago', role: 'Data Analyst', status: 'Active' },
    { id: '4', name: 'Brian Ngugi', email: 'b****@gmail.com', lastLogin: 'Yesterday', role: 'Moderator', status: 'Active' },
    { id: '5', name: 'Brian Ngugi', email: 'b****@gmail.com', lastLogin: 'Yesterday', role: 'Moderator', status: 'Active' },
    { id: '6', name: 'Brian Ngugi', email: 'b****@gmail.com', lastLogin: '2 hours ago', role: 'Data Analyst', status: 'Active' },
    { id: '7', name: 'Brian Ngugi', email: 'b****@gmail.com', lastLogin: '2 hours ago', role: 'Data Analyst', status: 'Active' },
    { id: '8', name: 'Brian Ngugi', email: 'b****@gmail.com', lastLogin: '2 hours ago', role: 'Data Analyst', status: 'Active' },
    { id: '9', name: 'Brian Ngugi', email: 'b****@gmail.com', lastLogin: 'Currently Online', role: 'Super admin', status: 'Active' },
    { id: '10', name: 'Brian Ngugi', email: 'b****@gmail.com', lastLogin: 'Currently Online', role: 'Super admin', status: 'Active' }
  ];

  // Service Providers Data
  serviceProviders: ServiceProvider[] = [
    { id: '1', name: 'BNET Organizers', email: 'b****n@gmail.com', phone: '0712****90', categories: 'Night Life, Outdoor Adventure', events: 12, status: 'Approved' },
    { id: '2', name: 'BNET Organizers', email: 'b****n@gmail.com', phone: '0712****90', categories: 'Night Life, Outdoor Adventure', events: 12, status: 'Approved' },
    { id: '3', name: 'BNET Organizers', email: 'b****n@gmail.com', phone: '0712****90', categories: 'Night Life, Outdoor Adventure', events: 12, status: 'Approved' },
    { id: '4', name: 'BNET Organizers', email: 'b****n@gmail.com', phone: '0712****90', categories: 'Night Life, Outdoor Adventure', events: 12, status: 'Approved' },
    { id: '5', name: 'BNET Organizers', email: 'b****n@gmail.com', phone: '0712****90', categories: 'Night Life, Outdoor Adventure', events: 12, status: 'Approved' },
    { id: '6', name: 'BNET Organizers', email: 'b****n@gmail.com', phone: '0712****90', categories: 'Night Life, Outdoor Adventure', events: 12, status: 'Pending' },
    { id: '7', name: 'BNET Organizers', email: 'b****n@gmail.com', phone: '0712****90', categories: 'Night Life, Outdoor Adventure', events: 12, status: 'Pending' },
    { id: '8', name: 'BNET Organizers', email: 'b****n@gmail.com', phone: '0712****90', categories: 'Night Life, Outdoor Adventure', events: 12, status: 'Pending' },
    { id: '9', name: 'BNET Organizers', email: 'b****n@gmail.com', phone: '0712****90', categories: 'Night Life, Outdoor Adventure', events: 12, status: 'Suspended' }
  ];

  // App Users Data
  appUsers: AppUser[] = [
    { id: '1', name: 'Brian Ngugi', email: 'b****n@gmail.com', phone: '0712****90', location: 'Nairobi', userType: 'Standard', eventsAttended: 24, status: 'Active' },
    { id: '2', name: 'Brian Ngugi', email: 'b****n@gmail.com', phone: '0712****90', location: 'Nairobi', userType: 'Premium', eventsAttended: 24, status: 'Active' },
    { id: '3', name: 'Brian Ngugi', email: 'b****n@gmail.com', phone: '0712****90', location: 'Nairobi', userType: 'Standard', eventsAttended: 24, status: 'Active' },
    { id: '4', name: 'Brian Ngugi', email: 'b****n@gmail.com', phone: '0712****90', location: 'Nairobi', userType: 'Premium', eventsAttended: 24, status: 'Active' },
    { id: '5', name: 'Brian Ngugi', email: 'b****n@gmail.com', phone: '0712****90', location: 'Nairobi', userType: 'Standard', eventsAttended: 24, status: 'Active' },
    { id: '6', name: 'Brian Ngugi', email: 'b****n@gmail.com', phone: '0712****90', location: 'Nairobi', userType: 'Premium', eventsAttended: 24, status: 'Active' },
    { id: '7', name: 'Brian Ngugi', email: 'b****n@gmail.com', phone: '0712****90', location: 'Nairobi', userType: 'Standard', eventsAttended: 24, status: 'Suspended' },
    { id: '8', name: 'Brian Ngugi', email: 'b****n@gmail.com', phone: '0712****90', location: 'Nairobi', userType: 'Premium', eventsAttended: 24, status: 'Suspended' },
    { id: '9', name: 'Brian Ngugi', email: 'b****n@gmail.com', phone: '0712****90', location: 'Nairobi', userType: 'Standard', eventsAttended: 24, status: 'Suspended' }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    console.log('Users component initialized');
  }

  // Sidebar & Search
  handleSidebarToggle(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  handleSearch(query: string): void {
    console.log('Search query:', query);
    this.searchQuery = query;
  }

  // Tab Navigation
  switchTab(tab: string): void {
    this.activeTab = tab;
  }

  // Admin Actions
  addAdmin(): void {
    console.log('Adding new admin...');
    alert('Opening admin creation form...');
  }

  editAdmin(id: string): void {
    console.log('Editing admin:', id);
    alert('Editing admin: ' + id);
  }

  deleteAdmin(id: string): void {
    if (confirm('Are you sure you want to delete this admin? This action cannot be undone.')) {
      console.log('Deleting admin:', id);
      this.admins = this.admins.filter(admin => admin.id !== id);
      alert('Admin deleted successfully');
    }
  }

  // Service Provider Actions
  addServiceProvider(): void {
    console.log('Adding new service provider...');
    alert('Opening service provider registration form...');
  }

  viewProvider(id: string): void {
    console.log('Viewing provider:', id);
    alert('Viewing provider details: ' + id);
  }

  approveProvider(id: string): void {
    if (confirm('Are you sure you want to approve this service provider?')) {
      console.log('Approving provider:', id);
      const provider = this.serviceProviders.find(p => p.id === id);
      if (provider) {
        provider.status = 'Approved';
      }
      alert('Service provider approved successfully');
    }
  }

  rejectProvider(id: string): void {
    if (confirm('Are you sure you want to reject this service provider?')) {
      const reason = prompt('Please provide a reason for rejection:');
      if (reason) {
        console.log('Rejecting provider:', id, 'Reason:', reason);
        alert('Service provider rejected');
      }
    }
  }

  suspendProvider(id: string): void {
    if (confirm('Are you sure you want to suspend this service provider?')) {
      const reason = prompt('Please provide a reason for suspension:');
      if (reason) {
        console.log('Suspending provider:', id, 'Reason:', reason);
        const provider = this.serviceProviders.find(p => p.id === id);
        if (provider) {
          provider.status = 'Suspended';
        }
        alert('Service provider suspended');
      }
    }
  }

  reinstateProvider(id: string): void {
    if (confirm('Are you sure you want to reinstate this service provider?')) {
      console.log('Reinstating provider:', id);
      const provider = this.serviceProviders.find(p => p.id === id);
      if (provider) {
        provider.status = 'Approved';
      }
      alert('Service provider reinstated successfully');
    }
  }

  // App User Actions
  addAppUser(): void {
    console.log('Adding new app user...');
    alert('Opening app user registration form...');
  }

  viewUser(id: string): void {
    console.log('Viewing user:', id);
    alert('Viewing user details: ' + id);
  }

  suspendUser(id: string): void {
    if (confirm('Are you sure you want to suspend this user?')) {
      const reason = prompt('Please provide a reason for suspension:');
      if (reason) {
        console.log('Suspending user:', id, 'Reason:', reason);
        const user = this.appUsers.find(u => u.id === id);
        if (user) {
          user.status = 'Suspended';
        }
        alert('User suspended');
      }
    }
  }

  reactivateUser(id: string): void {
    if (confirm('Are you sure you want to reactivate this user?')) {
      console.log('Reactivating user:', id);
      const user = this.appUsers.find(u => u.id === id);
      if (user) {
        user.status = 'Active';
      }
      alert('User reactivated successfully');
    }
  }
}