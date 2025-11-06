import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Sidebar } from '../sidebar/sidebar';
import { Topbar } from '../topbar/topbar';

interface Category {
  id: string;
  name: string;
  active: boolean;
  subcategories: Subcategory[];
  showAddForm?: boolean;
  newSubcategoryName?: string;
}

interface Subcategory {
  id: string;
  name: string;
}

interface PaymentGateway {
  name: string;
  status: string;
}

interface PlanStatistic {
  name: string;
  count: number;
  percentage: number;
  color: string;
}

interface RevenueByPlan {
  name: string;
  amount: string;
  subscribers: number;
  color: string;
}

interface Subscription {
  id: string;
  provider?: string;
  userName?: string;
  users?: string;
  plan: string;
  monthlyFee: number;
  status: string;
  nextBilling: string;
}

interface Payment {
  transactionId: string;
  customer: string;
  bundle: string;
  amount: number;
  status: string;
  date: string;
}

interface BundleFeature {
  icon: string;
  label: string;
  value: string;
}

interface Bundle {
  id: string;
  name: string;
  priceUSD: number;
  priceKSH: number;
  period: string;
  validity: string;
  features: BundleFeature[];
  integrations?: string[];
  popular: boolean;
  active: boolean;
}

interface PaymentSummary {
  amount: string;
  count: number;
}

interface CustomTax {
  name: string;
  rate: number;
  type: string;
}

interface TaxExemption {
  id: string;
  label: string;
  enabled: boolean;
}

interface Documentation {
  id: string;
  label: string;
  required: boolean;
}

interface Integration {
  name: string;
  description: string;
  status: string;
}

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule, Sidebar, Topbar],
  templateUrl: './settings.html',
  styleUrls: ['./settings.css']
})
export class Settings implements OnInit {
  
  // User Information
  adminName: string = 'Super Admin';
  role: string = 'Administrator';
  userAvatar: string = '';
  
  // UI State
  isSidebarOpen: boolean = true;
  activeMainTab: string = 'general';
  activeBillingTab: string = 'bundles';
  activeUserType: string = 'providers';
  
  // General Settings
  platformName: string = 'Ni pange';
  logoFileName: string = '';
  defaultEmail: string = 'info@nipange.com';
  defaultPhone: string = '0701234567';
  platformDescription: string = 'Brief Description of nipange platform ...';
  commissionRate: number = 10;
  defaultCurrency: string = 'KSH';
  defaultApproval: string = 'manual';
  enableSeasonalTags: boolean = false;
  
  newCategoryName: string = '';
  categories: Category[] = [
    {
      id: '1',
      name: 'Outdoor Adventures',
      active: true,
      subcategories: [
        { id: '1-1', name: 'Hiking' },
        { id: '1-2', name: 'Camping' }
      ]
    },
    {
      id: '2',
      name: 'Dining',
      active: true,
      subcategories: [
        { id: '2-1', name: 'Fine Dining' },
        { id: '2-2', name: 'Casual Dining' },
        { id: '2-3', name: 'Food Trucks' }
      ]
    },
    {
      id: '3',
      name: 'Entertainment',
      active: false,
      subcategories: [
        { id: '3-1', name: 'Live Music' },
        { id: '3-2', name: 'Theater' }
      ]
    }
  ];

  // Data Management
  dataRetentionDays: number = 365;
  backupSchedule: string = 'daily';
  autoDeleteInactiveUsers: boolean = false;
  analyticsDataCollection: boolean = false;
  
  // Security & Compliance
  twoFactorAuth: boolean = false;
  gdprCompliance: boolean = false;
  kenyaDataProtection: boolean = false;
  passwordPolicy: string = 'strong';
  sessionTimeout: number = 30;
  
  // Notifications
  notifyEventRegistrations: boolean = false;
  notifyEventSubmissions: boolean = false;
  notifyUserReports: boolean = false;
  pushSystemAlerts: boolean = false;
  pushMarketingBroadcasts: boolean = false;
  pushEventReminders: boolean = false;
  
  // Regional & Tax Configuration
  selectedCountry: string = 'KE';
  primaryCurrency: string = 'KE';
  exchangeRate: number = 100;
  rateUpdateFrequency: string = 'daily';
  primaryTaxRate: number = 16;
  taxCalculationMethod: string = 'exclusive';
  taxRegistrationNumber: string = 'P051234567B';
  digitalServicesTax: number = 1.5;
  withholdingTax: number = 5;
  environmentalTax: number = 0;
  luxuryTax: number = 0;
  importDuty: number = 0;
  exciseTax: number = 0;
  taxReportingPeriod: string = 'monthly';
  invoiceNumberingFormat: string = 'custom';
  taxAuthorityPortal: string = 'https://itax.kra.go.ke';
  filingDeadline: number = 20;
  economicZoneType: string = 'epz';
  taxIncentiveRate: number = 10;
  incentiveValidityPeriod: string = '12/31/2025';
  zoneRegistrationNumber: string = 'EPZ-2023-001';
  

  // Bundles for Service Providers
  providerBundles: Bundle[] = [
    {
      id: '1',
      name: 'Free Plan',
      priceUSD: 0,
      priceKSH: 0,
      period: 'Month',
      validity: '7 Days',
      features: [
        { icon: 'user', label: 'Users', value: '1' },
        { icon: 'calendar', label: 'Events/Month', value: '2' },
        { icon: 'ticket', label: 'Tickets/Bookings', value: '100' },
        { icon: 'category', label: 'Categories', value: '1' },
        { icon: 'percent', label: 'Commission Rate', value: '15%' },
        { icon: 'image', label: 'Carousel', value: '2 images/event/month' },
        { icon: 'support', label: 'Support', value: 'FAQ Only' }
      ],
      integrations: ['General settings only'],
      popular: false,
      active: true
    },
    {
      id: '2',
      name: 'Standard Plan',
      priceUSD: 15,
      priceKSH: 1500,
      period: 'Month',
      validity: 'Monthly',
      features: [
        { icon: 'user', label: 'Users', value: '<=2' },
        { icon: 'calendar', label: 'Events/Month', value: '<=2' },
        { icon: 'ticket', label: 'Tickets/Bookings', value: '1,000' },
        { icon: 'category', label: 'Categories', value: '<=2' },
        { icon: 'percent', label: 'Commission Rate', value: '4%' },
        { icon: 'image', label: 'Carousel', value: '10 images/event/month' },
        { icon: 'support', label: 'Support', value: 'FAQ Only' }
      ],
      integrations: ['General settings', 'Third Party Integrations', 'Notifications', 'Social Media (2)'],
      popular: false,
      active: true
    },
    {
      id: '3',
      name: 'Professional Plan',
      priceUSD: 20,
      priceKSH: 2000,
      period: 'Month',
      validity: 'Monthly',
      features: [
        { icon: 'user', label: 'Users', value: '<=5' },
        { icon: 'calendar', label: 'Events/Month', value: '<=5' },
        { icon: 'ticket', label: 'Tickets/Bookings', value: '2,000' },
        { icon: 'category', label: 'Categories', value: '<=5' },
        { icon: 'percent', label: 'Commission Rate', value: '3.5%' },
        { icon: 'image', label: 'Carousel', value: '10 images + 3 videos /event/month' },
        { icon: 'support', label: 'Support', value: 'FAQ & Live Chat' }
      ],
      integrations: ['General settings', 'Third Party Integrations', 'Notifications', 'Social Media (5)', 'Advanced Analytics'],
      popular: true,
      active: true
    },
    {
      id: '4',
      name: 'Premium Plan',
      priceUSD: 25,
      priceKSH: 2500,
      period: 'Month',
      validity: 'Monthly',
      features: [
        { icon: 'user', label: 'Users', value: '<=10' },
        { icon: 'calendar', label: 'Events/Month', value: '<=10' },
        { icon: 'ticket', label: 'Tickets/Bookings', value: '5,000' },
        { icon: 'category', label: 'Categories', value: 'Unlimited' },
        { icon: 'percent', label: 'Commission Rate', value: '3%' },
        { icon: 'image', label: 'Carousel', value: 'Unlimited' },
        { icon: 'support', label: 'Support', value: 'Priority Support (24/7)' }
      ],
      integrations: ['All features', 'Advanced Analytics', 'API Access', 'Custom Integrations'],
      popular: false,
      active: true
    },
    {
      id: '5',
      name: 'Enterprise Plan',
      priceUSD: 40,
      priceKSH: 4000,
      period: 'Month',
      validity: 'Custom',
      features: [
        { icon: 'user', label: 'Users', value: 'Unlimited' },
        { icon: 'calendar', label: 'Events/Month', value: 'Unlimited' },
        { icon: 'ticket', label: 'Tickets/Bookings', value: 'Unlimited' },
        { icon: 'category', label: 'Categories', value: 'Unlimited' },
        { icon: 'percent', label: 'Commission Rate', value: '2.5%' },
        { icon: 'image', label: 'Carousel', value: 'Unlimited' },
        { icon: 'support', label: 'Support', value: 'Dedicated Account Manager' }
      ],
      integrations: ['All features', 'White-label options', 'Custom development', 'SLA guarantees'],
      popular: false,
      active: true
    }
  ];

  // Bundles for App Users
  appUserBundles: Bundle[] = [
    {
      id: 'user-1',
      name: 'Free Plan',
      priceUSD: 0,
      priceKSH: 0,
      period: 'Month',
      validity: 'Lifetime',
      features: [
        { icon: 'ticket', label: 'Event Bookings', value: 'Unlimited' },
        { icon: 'calendar', label: 'Event Discovery', value: 'Basic Search' },
        { icon: 'support', label: 'Support', value: 'Community Forum' },
        { icon: 'user', label: 'Profile', value: 'Basic Profile' }
      ],
      integrations: ['Basic event browsing', 'Standard bookings', 'Email notifications'],
      popular: false,
      active: true
    },
    {
      id: 'user-2',
      name: 'Premium Plan',
      priceUSD: 5,
      priceKSH: 500,
      period: 'Month',
      validity: 'Monthly',
      features: [
        { icon: 'ticket', label: 'Event Bookings', value: 'Unlimited' },
        { icon: 'calendar', label: 'Event Discovery', value: 'Advanced Search & Filters' },
        { icon: 'support', label: 'Support', value: 'Priority Support' },
        { icon: 'user', label: 'Profile', value: 'Premium Profile with Badge' },
        { icon: 'percent', label: 'Discounts', value: 'Exclusive Deals & Early Access' },
        { icon: 'analytics', label: 'Insights', value: 'Personalized Recommendations' }
      ],
      integrations: ['Advanced search', 'Priority booking', 'Exclusive offers', 'Early bird access', 'Mobile app premium features'],
      popular: true,
      active: true
    }
  ];

  // Current bundles (switches between providers and users)
  bundles: Bundle[] = this.providerBundles;

  customTaxes: CustomTax[] = [];
  
  taxExemptions: TaxExemption[] = [
    { id: 'charity', label: 'Charitable/Non-profit events', enabled: false },
    { id: 'education', label: 'Educational institutions', enabled: false },
    { id: 'government', label: 'Government agencies', enabled: false },
    { id: 'export', label: 'Export services', enabled: false }
  ];

  requiredDocumentation: Documentation[] = [
    { id: 'tax-cert', label: 'Tax Compliance Certificate', required: true },
    { id: 'pin', label: 'PIN Certificate', required: true },
    { id: 'invoice', label: 'Monthly Invoices', required: true },
    { id: 'receipt', label: 'Digital Receipts', required: true }
  ];

  paymentGateways: PaymentGateway[] = [
    { name: 'M-Pesa (Safaricom)', status: 'Active' },
    { name: 'Airtel Money', status: 'Active' },
    { name: 'Card Payments (Visa/Mastercard)', status: 'Active' }
  ];

  allPaymentGateways: PaymentGateway[] = [
    { name: 'M-Pesa (Safaricom)', status: 'Active' },
    { name: 'Airtel Money', status: 'Active' },
    { name: 'Card Payments (Visa/Mastercard)', status: 'Active' },
    { name: 'PayPal', status: 'Inactive' }
  ];

  thirdPartyIntegrations: Integration[] = [
    { name: 'Ticketing API', description: 'Third-party ticketing system integration', status: 'Active' },
    { name: 'Mailchimp', description: 'Email marketing automation', status: 'Active' },
    { name: 'Google Analytics', description: 'Advanced analytics and tracking', status: 'Active' },
    { name: 'Zoom', description: 'Virtual event hosting', status: 'Inactive' }
  ];

  socialMediaIntegrations: Integration[] = [
    { name: 'Facebook', description: 'Share events & manage pages', status: 'Active' },
    { name: 'Instagram', description: 'Visual content & stories', status: 'Active' },
    { name: 'Twitter/X', description: 'Real-time updates', status: 'Active' },
    { name: 'LinkedIn', description: 'Professional networking', status: 'Inactive' },
    { name: 'TikTok', description: 'Short-form video marketing', status: 'Inactive' }
  ];

  autoShareEvents: boolean = false;

  planStatistics: PlanStatistic[] = [
    { name: 'Free', count: 1250, percentage: 67.8, color: '#E0E0E0' },
    { name: 'Standard', count: 350, percentage: 18.4, color: '#5B7CFF' },
    { name: 'Professional', count: 150, percentage: 9.7, color: '#7C3AED' },
    { name: 'Premium', count: 150, percentage: 5.7, color: '#28A745' },
    { name: 'Enterprise', count: 50, percentage: 3.6, color: '#FFC107' }
  ];

  revenueByPlan: RevenueByPlan[] = [
    { name: 'Standard', amount: 'KES 652,800', subscribers: 340, color: '#5B7CFF' },
    { name: 'Professional', amount: 'KES 460,800', subscribers: 180, color: '#7C3AED' },
    { name: 'Premium', amount: 'KES 460,800', subscribers: 180, color: '#28A745' },
    { name: 'Enterprise', amount: 'KES 326,400', subscribers: 85, color: '#FFC107' }
  ];

  providerSubscriptions: Subscription[] = [
    { id: '1', provider: 'Safari Events Ltd', users: '3', plan: 'Professional', monthlyFee: 2000, status: 'Active', nextBilling: 'Nov 15, 2024' },
    { id: '2', provider: 'City Concerts Co', users: '2', plan: 'Standard', monthlyFee: 1500, status: 'Active', nextBilling: 'Nov 18, 2024' },
    { id: '3', provider: 'Mountain Adventures', users: '1', plan: 'Free', monthlyFee: 0, status: 'Active', nextBilling: 'N/A' },
    { id: '4', provider: 'Tech Meetups KE', users: '5', plan: 'Premium', monthlyFee: 2500, status: 'Suspended', nextBilling: 'Nov 10, 2024' },
    { id: '5', provider: 'Corporate Events Hub', users: 'Unlimited', plan: 'Enterprise', monthlyFee: 4000, status: 'Active', nextBilling: 'Dec 1, 2024' }
  ];

  appUserSubscriptions: Subscription[] = [
    { id: 'user-1', userName: 'John Doe', plan: 'Premium', monthlyFee: 500, status: 'Active', nextBilling: 'Nov 15, 2024' },
    { id: 'user-2', userName: 'Jane Smith', plan: 'Premium', monthlyFee: 500, status: 'Active', nextBilling: 'Nov 18, 2024' },
    { id: 'user-3', userName: 'Mike Johnson', plan: 'Free', monthlyFee: 0, status: 'Active', nextBilling: 'N/A' },
    { id: 'user-4', userName: 'Sarah Williams', plan: 'Premium', monthlyFee: 500, status: 'Pending', nextBilling: 'Nov 10, 2024' },
    { id: 'user-5', userName: 'David Brown', plan: 'Premium', monthlyFee: 500, status: 'Active', nextBilling: 'Dec 1, 2024' }
  ];

  recentPayments: Payment[] = [
    { transactionId: 'TXN-20241101-001', customer: 'Safari Events Ltd', bundle: 'Professional', amount: 2000, status: 'Completed', date: 'Nov 1, 2024' },
    { transactionId: 'TXN-20241101-002', customer: 'City Concerts Co', bundle: 'Standard', amount: 1500, status: 'Completed', date: 'Nov 1, 2024' },
    { transactionId: 'TXN-20241102-003', customer: 'Tech Meetups KE', bundle: 'Premium', amount: 2500, status: 'Pending', date: 'Nov 2, 2024' },
    { transactionId: 'TXN-20241103-004', customer: 'Beach Events Co', bundle: 'Standard', amount: 1500, status: 'Failed', date: 'Nov 3, 2024' },
    { transactionId: 'TXN-20241104-005', customer: 'Corporate Events Hub', bundle: 'Enterprise', amount: 4000, status: 'Completed', date: 'Nov 4, 2024' }
  ];

  successfulPayments: PaymentSummary = { amount: 'KES 5,000,000', count: 800 };
  pendingPayments: PaymentSummary = { amount: 'KES 500,000', count: 20 };
  failedPayments: PaymentSummary = { amount: 'KES 200,000', count: 15 };
  
  // Filters
  statusFilter: string = '';
  searchQuery: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    console.log('Settings component initialized');
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
  switchMainTab(tab: string): void {
    this.activeMainTab = tab;
  }

  switchBillingTab(tab: string): void {
    this.activeBillingTab = tab;
  }

  switchUserType(type: string): void {
    this.activeUserType = type;
    
    // Switch between provider and app user bundles
    if (type === 'users') {
      this.bundles = this.appUserBundles;
      // Update statistics for app users
      this.planStatistics = [
        { name: 'Free', count: 1250, percentage: 78.1, color: '#E0E0E0' },
        { name: 'Premium', count: 350, percentage: 21.9, color: '#5B7CFF' }
      ];
      this.revenueByPlan = [
        { name: 'Premium', amount: 'KES 175,000', subscribers: 350, color: '#5B7CFF' }
      ];
      this.successfulPayments = { amount: 'KES 175,000', count: 350 };
      this.pendingPayments = { amount: 'KES 2,500', count: 5 };
      this.failedPayments = { amount: 'KES 1,500', count: 3 };
    } else {
      this.bundles = this.providerBundles;
      // Update statistics for service providers
      this.planStatistics = [
        { name: 'Free', count: 1250, percentage: 67.8, color: '#E0E0E0' },
        { name: 'Standard', count: 350, percentage: 18.4, color: '#5B7CFF' },
        { name: 'Professional', count: 150, percentage: 9.7, color: '#7C3AED' },
        { name: 'Premium', count: 150, percentage: 5.7, color: '#28A745' },
        { name: 'Enterprise', count: 50, percentage: 3.6, color: '#FFC107' }
      ];
      this.revenueByPlan = [
        { name: 'Standard', amount: 'KES 652,800', subscribers: 340, color: '#5B7CFF' },
        { name: 'Professional', amount: 'KES 460,800', subscribers: 180, color: '#7C3AED' },
        { name: 'Premium', amount: 'KES 460,800', subscribers: 180, color: '#28A745' },
        { name: 'Enterprise', amount: 'KES 326,400', subscribers: 85, color: '#FFC107' }
      ];
      this.successfulPayments = { amount: 'KES 5,000,000', count: 800 };
      this.pendingPayments = { amount: 'KES 500,000', count: 20 };
      this.failedPayments = { amount: 'KES 200,000', count: 15 };
    }
  }

    // Category Management
  get totalCategories(): number {
    return this.categories.length;
  }

  get activeCategories(): number {
    return this.categories.filter(cat => cat.active).length;
  }

  addCategory(): void {
    if (this.newCategoryName.trim()) {
      const newCategory: Category = {
        id: Date.now().toString(),
        name: this.newCategoryName.trim(),
        active: true,
        subcategories: []
      };
      this.categories.push(newCategory);
      this.newCategoryName = '';
      console.log('Category added:', newCategory);
    }
  }

  removeCategory(categoryId: string): void {
    if (confirm('Are you sure you want to remove this category?')) {
      this.categories = this.categories.filter(cat => cat.id !== categoryId);
      console.log('Category removed:', categoryId);
    }
  }

  toggleCategoryStatus(categoryId: string): void {
    const category = this.categories.find(cat => cat.id === categoryId);
    if (category) {
      category.active = !category.active;
      console.log('Category status toggled:', categoryId, category.active);
    }
  }

  showAddSubcategoryForm(categoryId: string): void {
    const category = this.categories.find(cat => cat.id === categoryId);
    if (category) {
      category.showAddForm = true;
      category.newSubcategoryName = '';
    }
  }

  cancelAddSubcategory(categoryId: string): void {
    const category = this.categories.find(cat => cat.id === categoryId);
    if (category) {
      category.showAddForm = false;
      category.newSubcategoryName = '';
    }
  }

  addSubcategory(categoryId: string): void {
    const category = this.categories.find(cat => cat.id === categoryId);
    if (category && category.newSubcategoryName && category.newSubcategoryName.trim()) {
      const newSubcategory: Subcategory = {
        id: `${categoryId}-${Date.now()}`,
        name: category.newSubcategoryName.trim()
      };
      category.subcategories.push(newSubcategory);
      category.showAddForm = false;
      category.newSubcategoryName = '';
      console.log('Subcategory added:', newSubcategory);
    }
  }

  removeSubcategory(categoryId: string, subcategoryId: string): void {
    const category = this.categories.find(cat => cat.id === categoryId);
    if (category) {
      category.subcategories = category.subcategories.filter(sub => sub.id !== subcategoryId);
      console.log('Subcategory removed:', subcategoryId);
    }
  }

  // File Upload
  handleFileUpload(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.logoFileName = file.name;
      console.log('File uploaded:', file.name);
    }
  }

  // Settings Actions
  saveSettings(): void {
    console.log('Saving settings...');
    alert('Settings saved successfully!');
  }

  resetToDefaults(): void {
    if (confirm('Are you sure you want to reset all settings to default values?')) {
      console.log('Resetting to defaults...');
      alert('Settings reset to default values.');
    }
  }

  // Bundle Management
  addNewBundle(): void {
    console.log('Opening add bundle form...');
    alert('Add new bundle form would open here');
  }

  editBundle(bundleId: string): void {
    console.log('Editing bundle:', bundleId);
    alert('Edit bundle form would open here for bundle: ' + bundleId);
  }

  deleteBundle(bundleId: string): void {
    if (confirm('Are you sure you want to delete this bundle? This action cannot be undone.')) {
      if (this.activeUserType === 'users') {
        this.appUserBundles = this.appUserBundles.filter(b => b.id !== bundleId);
        this.bundles = this.appUserBundles;
      } else {
        this.providerBundles = this.providerBundles.filter(b => b.id !== bundleId);
        this.bundles = this.providerBundles;
      }
      console.log('Bundle deleted:', bundleId);
    }
  }

  getFeatureIcon(iconName: string): string {
    const icons: { [key: string]: string } = {
      'user': 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2',
      'calendar': 'M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10z',
      'ticket': 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z',
      'category': 'M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z',
      'percent': 'M7.5 4A3.5 3.5 0 1 0 11 7.5 3.5 3.5 0 0 0 7.5 4zm9 12a3.5 3.5 0 1 0 3.5 3.5 3.5 3.5 0 0 0-3.5-3.5z',
      'image': 'M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2z',
      'support': 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z',
      'analytics': 'M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z'
    };
    return icons[iconName] || icons['category'];
  }

  getUniqueFeatureNames(): string[] {
    const featureNames = new Set<string>();
    this.bundles.forEach(bundle => {
      bundle.features.forEach(feature => {
        featureNames.add(feature.label);
      });
    });
    return Array.from(featureNames);
  }

  getFeatureValue(bundle: Bundle, featureName: string): string {
    const feature = bundle.features.find(f => f.label === featureName);
    return feature ? feature.value : '-';
  }
  
  // Export Functions
  exportPDF(): void {
    console.log('Exporting as PDF...');
    alert('Exporting as PDF...');
  }

  exportCSV(): void {
    console.log('Exporting as CSV...');
    alert('Exporting as CSV...');
  }

  // Subscription Actions
  editSubscription(id: string): void {
    console.log('Editing subscription:', id);
    alert('Edit subscription: ' + id);
  }

  suspendSubscription(id: string): void {
    if (confirm('Are you sure you want to suspend this subscription?')) {
      console.log('Suspending subscription:', id);
      alert('Subscription suspended: ' + id);
    }
  }

  // Regional & Tax Actions
  addCountry(): void {
    console.log('Adding new country...');
    alert('Add new country configuration');
  }

  addCustomTax(): void {
    this.customTaxes.push({ name: '', rate: 0, type: 'percentage' });
  }

  removeCustomTax(index: number): void {
    if (confirm('Are you sure you want to remove this custom tax?')) {
      this.customTaxes.splice(index, 1);
    }
  }

  saveAllSettings(): void {
    console.log('Saving all settings...');
    alert('All settings saved successfully!');
  }

  validateConfiguration(): void {
    console.log('Validating configuration...');
    alert('Configuration is valid!');
  }

  previewTaxCalculation(): void {
    console.log('Previewing tax calculation...');
    alert('Tax calculation preview...');
  }

  deleteCountry(): void {
    if (confirm('Are you sure you want to delete this country configuration? This action cannot be undone.')) {
      console.log('Deleting country...');
      alert('Country configuration deleted.');
    }
  }
}