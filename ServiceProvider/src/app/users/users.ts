import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Sidebar } from '../sidebar/sidebar';
import { Topbar } from '../topbar/topbar';

interface User {
  id: number;
  name: string;
  email: string;
  lastLogin: string;
  role: 'Super admin' | 'Moderator' | 'Data Analyst';
  status: 'Active' | 'Inactive';
}

interface AdminForm {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  gender: string;
  role: string;
  status: string;
  permissions: {
    manageUsers: boolean;
    manageEvents: boolean;
    viewAnalytics: boolean;
    systemSettings: boolean;
    createEvents: boolean;
    editEvents: boolean;
    viewAllEvents: boolean;
    accessAnalytics: boolean;
  };
}

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule, Sidebar, Topbar],
  templateUrl: './users.html',
  styleUrls: ['./users.css']
})
export class Users implements OnInit {
  // User Information
  organizerName: string = 'BNET ORGANIZERS';
  location: string = 'Nairobi, Kenya';
  userAvatar: string = '';
  
  // UI State
  isSidebarOpen: boolean = true;
  notificationCount: number = 3;
  
  // Search
  searchQuery: string = '';
  
  // Modal States
  showAddAdminModal: boolean = false;
  showEditAdminModal: boolean = false;
  showDeleteAdminModal: boolean = false;
  
  // Admin Forms
  newAdmin: AdminForm = this.getEmptyAdminForm();
  editingAdmin: AdminForm & { id?: number } = this.getEmptyAdminForm();
  deletingAdminId: number = 0;
  
  // Users/Admins Data
  users: User[] = [
    {
      id: 1,
      name: 'Brian Ngugi',
      email: 'b****@gmail.com',
      lastLogin: 'Currently Online',
      role: 'Super admin',
      status: 'Active'
    },
    {
      id: 2,
      name: 'Brian Ngugi',
      email: 'b****@gmail.com',
      lastLogin: 'Yesterday',
      role: 'Moderator',
      status: 'Active'
    },
    {
      id: 3,
      name: 'Brian Ngugi',
      email: 'b****@gmail.com',
      lastLogin: '2 hours ago',
      role: 'Data Analyst',
      status: 'Active'
    },
    {
      id: 4,
      name: 'Brian Ngugi',
      email: 'b****@gmail.com',
      lastLogin: 'Yesterday',
      role: 'Moderator',
      status: 'Active'
    },
    {
      id: 5,
      name: 'Brian Ngugi',
      email: 'b****@gmail.com',
      lastLogin: 'Yesterday',
      role: 'Moderator',
      status: 'Active'
    },
    {
      id: 6,
      name: 'Brian Ngugi',
      email: 'b****@gmail.com',
      lastLogin: '2 hours ago',
      role: 'Data Analyst',
      status: 'Active'
    },
    {
      id: 7,
      name: 'Brian Ngugi',
      email: 'b****@gmail.com',
      lastLogin: '2 hours ago',
      role: 'Data Analyst',
      status: 'Active'
    },
    {
      id: 8,
      name: 'Brian Ngugi',
      email: 'b****@gmail.com',
      lastLogin: '2 hours ago',
      role: 'Data Analyst',
      status: 'Active'
    },
    {
      id: 9,
      name: 'Brian Ngugi',
      email: 'b****@gmail.com',
      lastLogin: 'Currently Online',
      role: 'Super admin',
      status: 'Active'
    },
    {
      id: 10,
      name: 'Brian Ngugi',
      email: 'b****@gmail.com',
      lastLogin: 'Currently Online',
      role: 'Super admin',
      status: 'Active'
    }
  ];
  
  filteredUsers: User[] = [];

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.filteredUsers = [...this.users];
  }

  // Helper method to get empty admin form
  getEmptyAdminForm(): AdminForm {
    return {
      name: '',
      email: '',
      phoneNumber: '',
      password: '',
      confirmPassword: '',
      gender: 'Male',
      role: 'Super admin',
      status: 'Active',
      permissions: {
        manageUsers: false,
        manageEvents: false,
        viewAnalytics: false,
        systemSettings: false,
        createEvents: false,
        editEvents: false,
        viewAllEvents: false,
        accessAnalytics: false
      }
    };
  }

  handleSidebarToggle(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  handleSearch(query: string): void {
    console.log('Searching for:', query);
    this.searchQuery = query;
    this.filterUsers();
  }

  filterUsers(): void {
    if (!this.searchQuery.trim()) {
      this.filteredUsers = [...this.users];
      return;
    }

    const query = this.searchQuery.toLowerCase();
    this.filteredUsers = this.users.filter(user =>
      user.name.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query) ||
      user.role.toLowerCase().includes(query)
    );
  }

  // Add Admin Modal Methods
  openAddAdminModal(): void {
    this.newAdmin = this.getEmptyAdminForm();
    this.showAddAdminModal = true;
  }

  closeAddAdminModal(): void {
    this.showAddAdminModal = false;
    this.newAdmin = this.getEmptyAdminForm();
  }

  saveNewAdmin(): void {
    // Validation
    if (!this.newAdmin.name || !this.newAdmin.email) {
      alert('Please fill in all required fields');
      return;
    }

    if (this.newAdmin.password !== this.newAdmin.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    // Generate new ID
    const newId = Math.max(...this.users.map(u => u.id), 0) + 1;

    // Create new user
    const newUser: User = {
      id: newId,
      name: this.newAdmin.name,
      email: this.newAdmin.email,
      lastLogin: 'Just now',
      role: this.newAdmin.role as 'Super admin' | 'Moderator' | 'Data Analyst',
      status: this.newAdmin.status as 'Active' | 'Inactive'
    };

    this.users.push(newUser);
    this.filterUsers();
    
    console.log('New admin created:', newUser);
    console.log('Permissions:', this.newAdmin.permissions);
    
    this.closeAddAdminModal();
    alert('Admin added successfully!');
  }

  // Edit Admin Modal Methods
  openEditAdminModal(user: User): void {
    this.editingAdmin = {
      id: user.id,
      name: user.name,
      email: user.email,
      phoneNumber: '+254 712345789', // Default phone
      password: 'brian@123', // Default password for demo
      confirmPassword: 'brian@123',
      gender: 'Male',
      role: user.role,
      status: user.status,
      permissions: {
        manageUsers: true,
        manageEvents: true,
        viewAnalytics: true,
        systemSettings: true,
        createEvents: true,
        editEvents: true,
        viewAllEvents: true,
        accessAnalytics: true
      }
    };
    this.showEditAdminModal = true;
  }

  closeEditAdminModal(): void {
    this.showEditAdminModal = false;
    this.editingAdmin = this.getEmptyAdminForm();
  }

  updateAdmin(): void {
    // Validation
    if (!this.editingAdmin.name || !this.editingAdmin.email) {
      alert('Please fill in all required fields');
      return;
    }

    if (this.editingAdmin.password !== this.editingAdmin.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    // Find and update user
    const userIndex = this.users.findIndex(u => u.id === this.editingAdmin.id);
    if (userIndex !== -1) {
      this.users[userIndex] = {
        ...this.users[userIndex],
        name: this.editingAdmin.name,
        email: this.editingAdmin.email,
        role: this.editingAdmin.role as 'Super admin' | 'Moderator' | 'Data Analyst',
        status: this.editingAdmin.status as 'Active' | 'Inactive'
      };
      
      this.filterUsers();
      
      console.log('Admin updated:', this.users[userIndex]);
      console.log('Permissions:', this.editingAdmin.permissions);
      
      this.closeEditAdminModal();
      alert('Admin updated successfully!');
    }
  }

  // Delete Admin Modal Methods
  openDeleteAdminModal(user: User): void {
    this.deletingAdminId = user.id;
    this.showDeleteAdminModal = true;
  }

  closeDeleteAdminModal(): void {
    this.showDeleteAdminModal = false;
    this.deletingAdminId = 0;
  }

  confirmDeleteAdmin(): void {
    this.users = this.users.filter(u => u.id !== this.deletingAdminId);
    this.filterUsers();
    
    console.log('Admin deleted:', this.deletingAdminId);
    
    this.closeDeleteAdminModal();
    alert('Admin deleted successfully!');
  }

  // Legacy methods (kept for backwards compatibility)
  addAdmin(): void {
    this.openAddAdminModal();
  }

  editUser(userId: number): void {
    const user = this.users.find(u => u.id === userId);
    if (user) {
      this.openEditAdminModal(user);
    }
  }

  deleteUser(userId: number): void {
    const user = this.users.find(u => u.id === userId);
    if (user) {
      this.openDeleteAdminModal(user);
    }
  }

  getRoleClass(role: string): string {
    switch (role.toLowerCase()) {
      case 'super admin':
        return 'role-super-admin';
      case 'moderator':
        return 'role-moderator';
      case 'data analyst':
        return 'role-data-analyst';
      default:
        return '';
    }
  }

  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'active':
        return 'status-active';
      case 'inactive':
        return 'status-inactive';
      default:
        return '';
    }
  }
}