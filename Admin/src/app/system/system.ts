import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Sidebar } from '../sidebar/sidebar';
import { Topbar } from '../topbar/topbar';

@Component({
  selector: 'app-system',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, Sidebar, Topbar],
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
  
  // Modal States
  showRoleModal: boolean = false;
  showDeleteRoleModal: boolean = false;
  showReasonModal: boolean = false;
  showDeleteReasonModal: boolean = false;
  
  // Edit States
  isEditingRole: boolean = false;
  isEditingReason: boolean = false;
  currentEditId: number | null = null;
  
  // Forms
  roleForm!: FormGroup;
  reasonForm!: FormGroup;
  
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

  constructor(
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.updateSearchBy();
    this.initializeForms();
  }

  initializeForms(): void {
    // Role Form
    this.roleForm = this.fb.group({
      status: ['Active', Validators.required],
      name: ['', Validators.required],
      manageUsers: [false],
      manageEvents: [false],
      viewAnalytics: [false],
      systemSettings: [false],
      createEvents: [false],
      editEvents: [false],
      viewAllEvents: [false],
      accessAnalytics: [false]
    });

    // Reason Form
    this.reasonForm = this.fb.group({
      reason: ['', Validators.required],
      type: ['', Validators.required],
      applicableTo: ['', Validators.required],
      status: ['', Validators.required]
    });
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

  // ===== ROLE MODAL METHODS =====
  addSystemRole(): void {
    this.isEditingRole = false;
    this.currentEditId = null;
    this.roleForm.reset({
      status: 'Active',
      manageUsers: false,
      manageEvents: false,
      viewAnalytics: false,
      systemSettings: false,
      createEvents: false,
      editEvents: false,
      viewAllEvents: false,
      accessAnalytics: false
    });
    this.showRoleModal = true;
  }

  editRole(id: number): void {
    this.isEditingRole = true;
    this.currentEditId = id;
    const role = this.roles.find(r => r.id === id);
    
    if (role) {
      this.roleForm.patchValue({
        status: role.status,
        name: role.name,
        // Set default permissions for demo
        manageUsers: true,
        manageEvents: true,
        viewAnalytics: true,
        systemSettings: true,
        createEvents: false,
        editEvents: true,
        viewAllEvents: true,
        accessAnalytics: true
      });
    }
    
    this.showRoleModal = true;
  }

  closeRoleModal(): void {
    this.showRoleModal = false;
    this.isEditingRole = false;
    this.currentEditId = null;
  }

  saveRole(): void {
    if (this.roleForm.valid) {
      const formValue = this.roleForm.value;
      
      if (this.isEditingRole && this.currentEditId) {
        // Update existing role
        const index = this.roles.findIndex(r => r.id === this.currentEditId);
        if (index !== -1) {
          this.roles[index] = {
            ...this.roles[index],
            name: formValue.name,
            status: formValue.status,
            lastActivity: 'Just now'
          };
        }
      } else {
        // Add new role
        const newRole = {
          id: Math.max(...this.roles.map(r => r.id)) + 1,
          name: formValue.name,
          assignedUsers: 0,
          lastActivity: 'Just now',
          status: formValue.status
        };
        this.roles.push(newRole);
      }
      
      this.updateRoleStats();
      this.closeRoleModal();
    }
  }

  deleteRole(id: number): void {
    this.currentEditId = id;
    this.showDeleteRoleModal = true;
  }

  closeDeleteRoleModal(): void {
    this.showDeleteRoleModal = false;
    this.currentEditId = null;
  }

  confirmDeleteRole(): void {
    if (this.currentEditId) {
      this.roles = this.roles.filter(r => r.id !== this.currentEditId);
      this.updateRoleStats();
    }
    this.closeDeleteRoleModal();
  }

  updateRoleStats(): void {
    this.totalRoles = this.roles.length;
    this.activeRoles = this.roles.filter(r => r.status === 'Active').length;
    this.inactiveRoles = this.roles.filter(r => r.status === 'Inactive').length;
  }

  // ===== REASON MODAL METHODS =====
  addReason(): void {
    this.isEditingReason = false;
    this.currentEditId = null;
    this.reasonForm.reset();
    this.showReasonModal = true;
  }

  editReason(id: number): void {
    this.isEditingReason = true;
    this.currentEditId = id;
    const reason = this.reasons.find(r => r.id === id);
    
    if (reason) {
      this.reasonForm.patchValue({
        reason: reason.reason,
        type: reason.type,
        applicableTo: reason.applicableTo,
        status: reason.status
      });
    }
    
    this.showReasonModal = true;
  }

  closeReasonModal(): void {
    this.showReasonModal = false;
    this.isEditingReason = false;
    this.currentEditId = null;
  }

  saveReason(): void {
    if (this.reasonForm.valid) {
      const formValue = this.reasonForm.value;
      
      if (this.isEditingReason && this.currentEditId) {
        // Update existing reason
        const index = this.reasons.findIndex(r => r.id === this.currentEditId);
        if (index !== -1) {
          this.reasons[index] = {
            id: this.currentEditId,
            reason: formValue.reason,
            type: formValue.type,
            applicableTo: formValue.applicableTo,
            status: formValue.status
          };
        }
      } else {
        // Add new reason
        const newReason = {
          id: Math.max(...this.reasons.map(r => r.id)) + 1,
          reason: formValue.reason,
          type: formValue.type,
          applicableTo: formValue.applicableTo,
          status: formValue.status
        };
        this.reasons.push(newReason);
      }
      
      this.updateReasonStats();
      this.closeReasonModal();
    }
  }

  deleteReason(id: number): void {
    this.currentEditId = id;
    this.showDeleteReasonModal = true;
  }

  closeDeleteReasonModal(): void {
    this.showDeleteReasonModal = false;
    this.currentEditId = null;
  }

  confirmDeleteReason(): void {
    if (this.currentEditId) {
      this.reasons = this.reasons.filter(r => r.id !== this.currentEditId);
      this.updateReasonStats();
    }
    this.closeDeleteReasonModal();
  }

  updateReasonStats(): void {
    this.totalReasons = this.reasons.length;
    this.activeReasons = this.reasons.filter(r => r.status === 'Active').length;
    this.inactiveReasons = this.reasons.filter(r => r.status === 'Inactive').length;
  }
}