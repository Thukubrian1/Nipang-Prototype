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

  addAdmin(): void {
    console.log('Add admin clicked');
    // TODO: Open add admin modal or navigate to add admin page
    // this.router.navigate(['/home/users/add']);
  }

  editUser(userId: number): void {
    console.log('Edit user:', userId);
    // TODO: Open edit user modal or navigate to edit page
    // this.router.navigate(['/home/users/edit', userId]);
  }

  deleteUser(userId: number): void {
    const user = this.users.find(u => u.id === userId);
    if (confirm(`Are you sure you want to delete ${user?.name}?`)) {
      console.log('Delete user:', userId);
      this.users = this.users.filter(u => u.id !== userId);
      this.filterUsers();
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