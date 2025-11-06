import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Sidebar } from '../sidebar/sidebar';
import { Topbar } from '../topbar/topbar';

@Component({
  selector: 'app-system',
  standalone: true,
  imports: [CommonModule, FormsModule, Sidebar, Topbar],
  templateUrl: './system.html',
  styleUrls: ['./system.css']
})
export class System implements OnInit {
  
  // User Information
  adminName: string = 'Super Admin';
  role: string = 'Administrator';
  userAvatar: string = '';
  
  // UI State
  isSidebarOpen: boolean = true;
  activeTab: string = 'roles';
  
  // Search States
  searchBy: string = 'role';
  searchQuery: string = '';
  
  // Roles Stats
  totalRoles: number = 10;
  activeRoles: number = 10;
  inactiveRoles: number = 5;
  
  // Roles Data
  roles = [
    {
      id: 1,
      name: 'Super Admin',
      assignedUsers: 5,
      lastActivity: '2 Hours Ago',
      status: 'Active'
    },
    {
      id: 2,
      name: 'Moderator',
      assignedUsers: 4,
      lastActivity: '5 Hours Ago',
      status: 'Active'
    },
    {
      id: 3,
      name: 'Data Analyst',
      assignedUsers: 3,
      lastActivity: '1 Day Ago',
      status: 'Active'
    },
    {
      id: 4,
      name: 'Event Manager',
      assignedUsers: 5,
      lastActivity: '2 Days Ago',
      status: 'Inactive'
    }
  ];
  
  // Reasons Stats
  totalReasons: number = 10;
  activeReasons: number = 10;
  inactiveReasons: number = 5;
  
  // Reasons Data
  reasons = [
    {
      id: 1,
      reason: 'Violation of terms of service',
      type: 'Rejection',
      applicableTo: 'All Users',
      status: 'Active'
    },
    {
      id: 2,
      reason: 'Security Risk Identified',
      type: 'Suspension',
      applicableTo: 'Admin User',
      status: 'Active'
    },
    {
      id: 3,
      reason: 'Appeal Reviewed and accepted',
      type: 'Reinstating',
      applicableTo: 'All Users',
      status: 'Active'
    },
    {
      id: 4,
      reason: 'Duplicate Account',
      type: 'Suspension',
      applicableTo: 'Service Providers',
      status: 'Inactive'
    }
  ];

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.updateSearchBy();
  }

  handleSidebarToggle(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  handleSearch(query: string): void {
    console.log('Searching for:', query);
  }

  switchTab(tab: string): void {
    this.activeTab = tab;
    this.searchQuery = '';
    this.updateSearchBy();
  }

  updateSearchBy(): void {
    if (this.activeTab === 'roles') {
      this.searchBy = 'role';
    } else {
      this.searchBy = 'reason';
    }
  }

  // Roles Actions
  addSystemRole(): void {
    console.log('Add system role');
    this.router.navigate(['/system-roles/roles/new']);
  }

  editRole(id: number): void {
    console.log('Edit role:', id);
    this.router.navigate(['/system-roles/roles/edit', id]);
  }

  deleteRole(id: number): void {
    console.log('Delete role:', id);
    if (confirm('Are you sure you want to delete this role?')) {
      this.roles = this.roles.filter(r => r.id !== id);
      this.updateRoleStats();
    }
  }

  updateRoleStats(): void {
    this.totalRoles = this.roles.length;
    this.activeRoles = this.roles.filter(r => r.status === 'Active').length;
    this.inactiveRoles = this.roles.filter(r => r.status === 'Inactive').length;
  }

  // Reasons Actions
  addReason(): void {
    console.log('Add reason');
    this.router.navigate(['/system-roles/reasons/new']);
  }

  editReason(id: number): void {
    console.log('Edit reason:', id);
    this.router.navigate(['/system-roles/reasons/edit', id]);
  }

  deleteReason(id: number): void {
    console.log('Delete reason:', id);
    if (confirm('Are you sure you want to delete this reason?')) {
      this.reasons = this.reasons.filter(r => r.id !== id);
      this.updateReasonStats();
    }
  }

  updateReasonStats(): void {
    this.totalReasons = this.reasons.length;
    this.activeReasons = this.reasons.filter(r => r.status === 'Active').length;
    this.inactiveReasons = this.reasons.filter(r => r.status === 'Inactive').length;
  }
}

