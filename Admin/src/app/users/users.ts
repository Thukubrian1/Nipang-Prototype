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
  phone?: string;
  gender?: string;
  lastLogin: string;
  role: string;
  status: string;
  password?: string;
  action?: string;
}

interface ServiceProvider {
  id: string;
  name: string;
  email: string;
  phone: string;
  description?: string;
  categories: string[];
  subcategories: string[];
  events: number;
  status: string;
  password?: string;
}

interface AppUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  gender?: string;
  dateOfBirth?: string;
  location: string;
  categoryPreference: string[];
  budgetTier?: string;
  userType: string;
  eventsAttended: number;
  status: string;
  password?: string;
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

interface Category {
  id: string;
  name: string;
  subcategories: string[];
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
  
  // Modal States
  showAddAdminModal: boolean = false;
  showEditAdminModal: boolean = false;
  showDeleteAdminModal: boolean = false;
  showAddProviderModal: boolean = false;
  showViewProviderModal: boolean = false;
  showSuspendProviderModal: boolean = false;
  showRejectProviderModal: boolean = false;
  showApproveProviderModal: boolean = false;
  showReinstateProviderModal: boolean = false;
  showAddUserModal: boolean = false;
  showViewUserModal: boolean = false;
  showSuspendUserModal: boolean = false;
  showReactivateUserModal: boolean = false;
  
  // Filters
  providerFilter: string = '';
  userFilter: string = '';
  searchQuery: string = '';

  // Selected Items
  selectedAdmin: Admin | null = null;
  selectedProvider: ServiceProvider | null = null;
  selectedUser: AppUser | null = null;

  // Form Data
  adminForm: Admin = {
    id: '',
    name: '',
    email: '',
    phone: '',
    gender: '',
    lastLogin: '',
    role: 'Super Admin',
    status: 'Active',
    password: '',
    action: 'Activate'
  };

  providerForm: ServiceProvider = {
    id: '',
    name: '',
    email: '',
    phone: '',
    description: '',
    categories: [],
    subcategories: [],
    events: 0,
    status: 'Pending',
    password: ''
  };

  userForm: AppUser = {
    id: '',
    name: '',
    email: '',
    phone: '',
    gender: '',
    dateOfBirth: '',
    location: '',
    categoryPreference: [],
    budgetTier: '',
    userType: 'Standard',
    eventsAttended: 0,
    status: 'Active',
    password: ''
  };

  suspensionReason: string = '';
  rejectionReason: string = '';
  reinstatementReason: string = '';

  // Categories and Subcategories
  categories: Category[] = [
    { id: '1', name: 'Night Life', subcategories: ['Clubs', 'Bars', 'Lounges', 'Late Night Dining'] },
    { id: '2', name: 'Outdoor Adventure', subcategories: ['Hiking', 'Camping', 'Rock Climbing', 'Water Sports'] },
    { id: '3', name: 'Wellness', subcategories: ['Yoga', 'Meditation', 'Spa', 'Fitness'] },
    { id: '4', name: 'Arts & Culture', subcategories: ['Museums', 'Galleries', 'Theater', 'Concerts'] },
    { id: '5', name: 'Food & Dining', subcategories: ['Fine Dining', 'Casual Dining', 'Food Tours', 'Cooking Classes'] },
    { id: '6', name: 'Sports', subcategories: ['Team Sports', 'Individual Sports', 'Spectator Events', 'Sports Training'] }
  ];

  availableSubcategories: string[] = [];

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
    { id: '1', name: 'BNET Organizers', email: 'b****n@gmail.com', phone: '0712****90', categories: ['Night Life', 'Outdoor Adventure'], subcategories: [], events: 12, status: 'Approved' },
    { id: '2', name: 'BNET Organizers', email: 'b****n@gmail.com', phone: '0712****90', categories: ['Night Life', 'Outdoor Adventure'], subcategories: [], events: 12, status: 'Approved' },
    { id: '3', name: 'BNET Organizers', email: 'b****n@gmail.com', phone: '0712****90', categories: ['Night Life', 'Outdoor Adventure'], subcategories: [], events: 12, status: 'Approved' },
    { id: '4', name: 'BNET Organizers', email: 'b****n@gmail.com', phone: '0712****90', categories: ['Night Life', 'Outdoor Adventure'], subcategories: [], events: 12, status: 'Approved' },
    { id: '5', name: 'BNET Organizers', email: 'b****n@gmail.com', phone: '0712****90', categories: ['Night Life', 'Outdoor Adventure'], subcategories: [], events: 12, status: 'Approved' },
    { id: '6', name: 'BNET Organizers', email: 'b****n@gmail.com', phone: '0712****90', categories: ['Night Life', 'Outdoor Adventure'], subcategories: [], events: 12, status: 'Pending' },
    { id: '7', name: 'BNET Organizers', email: 'b****n@gmail.com', phone: '0712****90', categories: ['Night Life', 'Outdoor Adventure'], subcategories: [], events: 12, status: 'Pending' },
    { id: '8', name: 'BNET Organizers', email: 'b****n@gmail.com', phone: '0712****90', categories: ['Night Life', 'Outdoor Adventure'], subcategories: [], events: 12, status: 'Pending' },
    { id: '9', name: 'BNET Organizers', email: 'b****n@gmail.com', phone: '0712****90', categories: ['Night Life', 'Outdoor Adventure'], subcategories: [], events: 12, status: 'Suspended' }
  ];

  // App Users Data
  appUsers: AppUser[] = [
    { id: '1', name: 'Brian Ngugi', email: 'b****n@gmail.com', phone: '0712****90', location: 'Nairobi', userType: 'Standard', categoryPreference: [], eventsAttended: 24, status: 'Active' },
    { id: '2', name: 'Brian Ngugi', email: 'b****n@gmail.com', phone: '0712****90', location: 'Nairobi', userType: 'Premium', categoryPreference: [], eventsAttended: 24, status: 'Active' },
    { id: '3', name: 'Brian Ngugi', email: 'b****n@gmail.com', phone: '0712****90', location: 'Nairobi', userType: 'Standard', categoryPreference: [], eventsAttended: 24, status: 'Active' },
    { id: '4', name: 'Brian Ngugi', email: 'b****n@gmail.com', phone: '0712****90', location: 'Nairobi', userType: 'Premium', categoryPreference: [], eventsAttended: 24, status: 'Active' },
    { id: '5', name: 'Brian Ngugi', email: 'b****n@gmail.com', phone: '0712****90', location: 'Nairobi', userType: 'Standard', categoryPreference: [], eventsAttended: 24, status: 'Active' },
    { id: '6', name: 'Brian Ngugi', email: 'b****n@gmail.com', phone: '0712****90', location: 'Nairobi', userType: 'Premium', categoryPreference: [], eventsAttended: 24, status: 'Active' },
    { id: '7', name: 'Brian Ngugi', email: 'b****n@gmail.com', phone: '0712****90', location: 'Nairobi', userType: 'Standard', categoryPreference: [], eventsAttended: 24, status: 'Suspended' },
    { id: '8', name: 'Brian Ngugi', email: 'b****n@gmail.com', phone: '0712****90', location: 'Nairobi', userType: 'Premium', categoryPreference: [], eventsAttended: 24, status: 'Suspended' },
    { id: '9', name: 'Brian Ngugi', email: 'b****n@gmail.com', phone: '0712****90', location: 'Nairobi', userType: 'Standard', categoryPreference: [], eventsAttended: 24, status: 'Suspended' }
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

  // Category Management
  onCategoryChange(category: string, isChecked: boolean, formType: 'provider' | 'user'): void {
    if (formType === 'provider') {
      if (isChecked) {
        if (!this.providerForm.categories.includes(category)) {
          this.providerForm.categories.push(category);
        }
      } else {
        this.providerForm.categories = this.providerForm.categories.filter(c => c !== category);
        // Remove subcategories of this category
        const cat = this.categories.find(c => c.name === category);
        if (cat) {
          this.providerForm.subcategories = this.providerForm.subcategories.filter(
            sc => !cat.subcategories.includes(sc)
          );
        }
      }
      this.updateAvailableSubcategories();
    } else {
      if (isChecked) {
        if (!this.userForm.categoryPreference.includes(category)) {
          this.userForm.categoryPreference.push(category);
        }
      } else {
        this.userForm.categoryPreference = this.userForm.categoryPreference.filter(c => c !== category);
      }
    }
  }

  onSubcategoryChange(subcategory: string, isChecked: boolean): void {
    if (isChecked) {
      if (!this.providerForm.subcategories.includes(subcategory)) {
        this.providerForm.subcategories.push(subcategory);
      }
    } else {
      this.providerForm.subcategories = this.providerForm.subcategories.filter(sc => sc !== subcategory);
    }
  }

  updateAvailableSubcategories(): void {
    this.availableSubcategories = [];
    this.providerForm.categories.forEach(catName => {
      const cat = this.categories.find(c => c.name === catName);
      if (cat) {
        this.availableSubcategories.push(...cat.subcategories);
      }
    });
  }

  isCategorySelected(category: string, formType: 'provider' | 'user'): boolean {
    if (formType === 'provider') {
      return this.providerForm.categories.includes(category);
    } else {
      return this.userForm.categoryPreference.includes(category);
    }
  }

  isSubcategorySelected(subcategory: string): boolean {
    return this.providerForm.subcategories.includes(subcategory);
  }

  // Admin Actions
  addAdmin(): void {
    this.adminForm = {
      id: '',
      name: '',
      email: '',
      phone: '',
      gender: 'Male',
      lastLogin: '',
      role: 'Super Admin',
      status: 'Active',
      password: '',
      action: 'Activate'
    };
    this.showAddAdminModal = true;
  }

  saveAdmin(): void {
    if (this.adminForm.name && this.adminForm.email && this.adminForm.password) {
      const newAdmin: Admin = {
        ...this.adminForm,
        id: (this.admins.length + 1).toString(),
        lastLogin: 'Never'
      };
      this.admins.push(newAdmin);
      this.showAddAdminModal = false;
      alert('Admin added successfully');
    } else {
      alert('Please fill all required fields');
    }
  }

  editAdmin(id: string): void {
    const admin = this.admins.find(a => a.id === id);
    if (admin) {
      this.selectedAdmin = admin;
      this.adminForm = { ...admin };
      this.showEditAdminModal = true;
    }
  }

  updateAdmin(): void {
    if (this.selectedAdmin && this.adminForm.name && this.adminForm.email) {
      const index = this.admins.findIndex(a => a.id === this.selectedAdmin!.id);
      if (index !== -1) {
        this.admins[index] = { ...this.adminForm };
        this.showEditAdminModal = false;
        this.selectedAdmin = null;
        alert('Admin updated successfully');
      }
    } else {
      alert('Please fill all required fields');
    }
  }

  deleteAdmin(id: string): void {
    const admin = this.admins.find(a => a.id === id);
    if (admin) {
      this.selectedAdmin = admin;
      this.showDeleteAdminModal = true;
    }
  }

  confirmDeleteAdmin(): void {
    if (this.selectedAdmin) {
      this.admins = this.admins.filter(admin => admin.id !== this.selectedAdmin!.id);
      this.showDeleteAdminModal = false;
      this.selectedAdmin = null;
      alert('Admin deleted successfully');
    }
  }

  // Service Provider Actions
  addServiceProvider(): void {
    this.providerForm = {
      id: '',
      name: '',
      email: '',
      phone: '',
      description: '',
      categories: [],
      subcategories: [],
      events: 0,
      status: 'Pending',
      password: ''
    };
    this.availableSubcategories = [];
    this.showAddProviderModal = true;
  }

  saveServiceProvider(): void {
    if (this.providerForm.name && this.providerForm.email && this.providerForm.password && 
        this.providerForm.categories.length > 0) {
      const newProvider: ServiceProvider = {
        ...this.providerForm,
        id: (this.serviceProviders.length + 1).toString()
      };
      this.serviceProviders.push(newProvider);
      this.showAddProviderModal = false;
      alert('Service provider added successfully');
    } else {
      alert('Please fill all required fields and select at least one category');
    }
  }

  viewProvider(id: string): void {
    const provider = this.serviceProviders.find(p => p.id === id);
    if (provider) {
      this.selectedProvider = provider;
      this.providerForm = { ...provider };
      this.updateAvailableSubcategories();
      this.showViewProviderModal = true;
    }
  }

  approveProvider(id: string): void {
    const provider = this.serviceProviders.find(p => p.id === id);
    if (provider) {
      this.selectedProvider = provider;
      this.showApproveProviderModal = true;
    }
  }

  confirmApproveProvider(): void {
    if (this.selectedProvider) {
      const provider = this.serviceProviders.find(p => p.id === this.selectedProvider!.id);
      if (provider) {
        provider.status = 'Approved';
      }
      this.showApproveProviderModal = false;
      this.selectedProvider = null;
      alert('Service provider approved successfully');
    }
  }

  rejectProvider(id: string): void {
    const provider = this.serviceProviders.find(p => p.id === id);
    if (provider) {
      this.selectedProvider = provider;
      this.rejectionReason = '';
      this.showRejectProviderModal = true;
    }
  }

  confirmRejectProvider(): void {
    if (this.selectedProvider && this.rejectionReason) {
      console.log('Rejecting provider:', this.selectedProvider.id, 'Reason:', this.rejectionReason);
      this.showRejectProviderModal = false;
      this.selectedProvider = null;
      this.rejectionReason = '';
      alert('Service provider rejected');
    } else {
      alert('Please select a reason for rejection');
    }
  }

  suspendProvider(id: string): void {
    const provider = this.serviceProviders.find(p => p.id === id);
    if (provider) {
      this.selectedProvider = provider;
      this.suspensionReason = '';
      this.showSuspendProviderModal = true;
    }
  }

  confirmSuspendProvider(): void {
    if (this.selectedProvider && this.suspensionReason) {
      const provider = this.serviceProviders.find(p => p.id === this.selectedProvider!.id);
      if (provider) {
        provider.status = 'Suspended';
      }
      this.showSuspendProviderModal = false;
      this.selectedProvider = null;
      this.suspensionReason = '';
      alert('Service provider suspended');
    } else {
      alert('Please select a reason for suspension');
    }
  }

  reinstateProvider(id: string): void {
    const provider = this.serviceProviders.find(p => p.id === id);
    if (provider) {
      this.selectedProvider = provider;
      this.reinstatementReason = '';
      this.showReinstateProviderModal = true;
    }
  }

  confirmReinstateProvider(): void {
    if (this.selectedProvider && this.reinstatementReason) {
      const provider = this.serviceProviders.find(p => p.id === this.selectedProvider!.id);
      if (provider) {
        provider.status = 'Approved';
      }
      this.showReinstateProviderModal = false;
      this.selectedProvider = null;
      this.reinstatementReason = '';
      alert('Service provider reinstated successfully');
    } else {
      alert('Please select a reason for reinstatement');
    }
  }

  // App User Actions
  addAppUser(): void {
    this.userForm = {
      id: '',
      name: '',
      email: '',
      phone: '',
      gender: 'Male',
      dateOfBirth: '',
      location: '',
      categoryPreference: [],
      budgetTier: '',
      userType: 'Standard',
      eventsAttended: 0,
      status: 'Active',
      password: ''
    };
    this.showAddUserModal = true;
  }

  saveAppUser(): void {
    if (this.userForm.name && this.userForm.email && this.userForm.password) {
      const newUser: AppUser = {
        ...this.userForm,
        id: (this.appUsers.length + 1).toString()
      };
      this.appUsers.push(newUser);
      this.showAddUserModal = false;
      alert('App user added successfully');
    } else {
      alert('Please fill all required fields');
    }
  }

  viewUser(id: string): void {
    const user = this.appUsers.find(u => u.id === id);
    if (user) {
      this.selectedUser = user;
      this.userForm = { ...user };
      this.showViewUserModal = true;
    }
  }

  suspendUser(id: string): void {
    const user = this.appUsers.find(u => u.id === id);
    if (user) {
      this.selectedUser = user;
      this.suspensionReason = '';
      this.showSuspendUserModal = true;
    }
  }

  confirmSuspendUser(): void {
    if (this.selectedUser && this.suspensionReason) {
      const user = this.appUsers.find(u => u.id === this.selectedUser!.id);
      if (user) {
        user.status = 'Suspended';
      }
      this.showSuspendUserModal = false;
      this.selectedUser = null;
      this.suspensionReason = '';
      alert('User suspended');
    } else {
      alert('Please select a reason for suspension');
    }
  }

  reactivateUser(id: string): void {
    const user = this.appUsers.find(u => u.id === id);
    if (user) {
      this.selectedUser = user;
      this.reinstatementReason = '';
      this.showReactivateUserModal = true;
    }
  }

  confirmReactivateUser(): void {
    if (this.selectedUser && this.reinstatementReason) {
      const user = this.appUsers.find(u => u.id === this.selectedUser!.id);
      if (user) {
        user.status = 'Active';
      }
      this.showReactivateUserModal = false;
      this.selectedUser = null;
      this.reinstatementReason = '';
      alert('User reactivated successfully');
    } else {
      alert('Please select a reason for reactivation');
    }
  }

  // Modal Close Functions
  closeModal(): void {
    this.showAddAdminModal = false;
    this.showEditAdminModal = false;
    this.showDeleteAdminModal = false;
    this.showAddProviderModal = false;
    this.showViewProviderModal = false;
    this.showSuspendProviderModal = false;
    this.showRejectProviderModal = false;
    this.showApproveProviderModal = false;
    this.showReinstateProviderModal = false;
    this.showAddUserModal = false;
    this.showViewUserModal = false;
    this.showSuspendUserModal = false;
    this.showReactivateUserModal = false;
    this.selectedAdmin = null;
    this.selectedProvider = null;
    this.selectedUser = null;
    this.suspensionReason = '';
    this.rejectionReason = '';
    this.reinstatementReason = '';
  }

  getCategoriesDisplay(categories: string[]): string {
    return categories.join(', ');
  }
}