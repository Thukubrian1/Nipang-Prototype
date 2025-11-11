import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Sidebar } from '../sidebar/sidebar';
import { Topbar } from '../topbar/topbar';

interface Plan {
  id: string;
  name: string;
  price: number;
  period: string;
  isCurrent: boolean;
  features: string[];
}

interface Invoice {
  id: number;
  date: string;
  total: number;
  status: 'Paid' | 'Pending' | 'Failed';
}

interface Category {
  id: string;
  name: string;
  selected: boolean;
}

interface PaymentFormData {
  fullName: string;
  country: string;
  address: string;
  city: string;
  postalCode: string;
  cardNumber: string;
  expirationDate: string;
  securityCode: string;
  accountName: string;
}

@Component({
  selector: 'app-profileandbilling',
  standalone: true,
  imports: [CommonModule, FormsModule, Sidebar, Topbar],
  templateUrl: './profileandbilling.html',
  styleUrls: ['./profileandbilling.css']
})

export class Profileandbilling implements OnInit {
  // User Information
  organizerName: string = 'BNET ORGANIZERS';
  location: string = 'Nairobi, Kenya';
  userAvatar: string = '';
  
  // UI State
  isSidebarOpen: boolean = true;
  notificationCount: number = 3;
  activeTab: 'profile' | 'billing' = 'profile';
  
  // Modal States
  showCancelPlanModal: boolean = false;
  showPaymentMethodModal: boolean = false;
  
  // Cancel Plan Form
  cancelReason: string = '';
  cancelDescription: string = '';
  
  // Payment Form
  paymentForm: PaymentFormData = {
    fullName: '',
    country: '',
    address: '',
    city: '',
    postalCode: '',
    cardNumber: '',
    expirationDate: '',
    securityCode: '',
    accountName: ''
  };
  
  // Payment Info
  paymentMethod: string = 'Visa •••• 6265';
  
  // Invoices
  invoices: Invoice[] = [
    {
      id: 1,
      date: 'Oct 14, 2025',
      total: 20,
      status: 'Paid'
    }
  ];
  
  // Subscription Plans
  currentPlan: string = 'Professional';
  nextBillingDate: string = 'November 16, 2025';
  
  plans: Plan[] = [
    {
      id: 'free',
      name: 'Free',
      price: 0,
      period: '7 days',
      isCurrent: false,
      features: [
        '1 user',
        '1 event',
        '1 category',
        '15% commission rate',
        'Limited Analytics',
        '2 images/event/month',
        'FAQ Only',
        'Integrations: General settings only'
      ]
    },
    {
      id: 'standard',
      name: 'Standard',
      price: 15,
      period: 'month',
      isCurrent: false,
      features: [
        '<= 2 Users',
        '<= 2 events',
        '<= 2 categories',
        '4% commission rate',
        'Limited analytics',
        '10 images/event/month',
        'FAQ Only',
        'Integrations: General settings, Third party integrations, Notifications, Social Media (2)'
      ]
    },
    {
      id: 'professional',
      name: 'Professional',
      price: 20,
      period: 'month',
      isCurrent: true,
      features: [
        '<= 5 Users',
        '<= 5 events',
        '<= 5 categories',
        '3.5% commission rate',
        'Full analytics',
        '10 images + videos/event/month',
        'FAQ + Live Chat',
        'Integrations: General settings, Third party integrations, Notifications, Social Media (5)'
      ]
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 30,
      period: 'month',
      isCurrent: false,
      features: [
        '<= 10 Users',
        '<= 10 events',
        '<= 10 categories',
        '3% commission rate',
        'Full analytics',
        '20 images + videos/event/month',
        'FAQ + Live Chat + Phone Support',
        'Integrations: General settings, Third party integrations, Notifications, Social Media (Unlimited)'
      ]
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 0,
      period: 'custom',
      isCurrent: false,
      features: [
        'Unlimited Users',
        'Unlimited events',
        'Unlimited categories',
        'Extended Analytics',
        'Unlimited media',
        'Customizations',
        'FAQ + Live Chat + Phone Support',
        'Integrations: General settings, Third party integrations, Notifications, Social Media (Unlimited)'
      ]
    }
  ];
  
  // Profile Data
  businessName: string = 'Ni pange';
  contactEmail: string = 'info@nipange.com';
  contactPhone: string = '0701234567';
  platformDescription: string = 'Professional event planning and management services in Nairobi. We specialize in corporate events, weddings, and social gatherings.';
  
  categories: Category[] = [
    { id: 'romantic', name: 'Romantic, Eats & Dates', selected: true },
    { id: 'outdoor', name: 'Outdoor Adventures', selected: true },
    { id: 'family', name: 'Family & Kids Outing', selected: false },
    { id: 'wellness', name: 'Wellness', selected: false },
    { id: 'spiritual', name: 'Spiritual & Uplifting', selected: false },
    { id: 'clubbing', name: 'Clubbing & Concerts', selected: false }
  ];
  
  // Brand Identity
  businessLogo: File | null = null;
  businessLogoPreview: string = '';
  primaryColor: string = '#318BFA';
  secondaryColor: string = '#D9D9D9';
  coverImage: File | null = null;
  coverImagePreview: string = '';
  
  // Notification Preferences
  emailNotifications: boolean = false;
  rsvpNotifications: boolean = false;
  eventApprovalNotifications: boolean = false;
  weeklyReports: boolean = false;
  smsNotifications: boolean = false;
  
  // Account Security
  currentPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  twoFactorAuth: boolean = false;
  
  // Social Media
  instagram: string = '@yourbusiness';
  facebook: string = 'facebook.com/yourbusiness';
  tiktok: string = '@yourbusiness';
  twitter: string = '@yourbusiness';

  constructor(private router: Router) { }

  ngOnInit(): void {
    // Initialize component
  }

  handleSidebarToggle(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  handleSearch(query: string): void {
    console.log('Searching for:', query);
  }

  switchTab(tab: 'profile' | 'billing'): void {
    this.activeTab = tab;
  }

  // Helper Methods
  getCurrentPlanPrice(): number {
    const currentPlanObj = this.plans.find(p => p.isCurrent);
    return currentPlanObj ? currentPlanObj.price : 0;
  }

  getCurrentPlanFeatures(): string[] {
    const currentPlanObj = this.plans.find(p => p.isCurrent);
    return currentPlanObj ? currentPlanObj.features.slice(0, 4) : [];
  }

  // Cancel Plan Modal Methods
  openCancelPlanModal(): void {
    this.cancelReason = '';
    this.cancelDescription = '';
    this.showCancelPlanModal = true;
  }

  closeCancelPlanModal(): void {
    this.showCancelPlanModal = false;
    this.cancelReason = '';
    this.cancelDescription = '';
  }

  confirmCancelPlan(): void {
    if (!this.cancelReason) {
      alert('Please select a reason for cancelling');
      return;
    }

    if (!this.cancelDescription.trim()) {
      alert('Please provide a description');
      return;
    }

    console.log('Cancelling plan with reason:', this.cancelReason);
    console.log('Description:', this.cancelDescription);
    
    // TODO: Implement actual cancellation logic
    this.closeCancelPlanModal();
    alert('Your subscription has been cancelled. You can continue using the service until Nov 14, 2025.');
  }

  // Payment Method Modal Methods
  openPaymentMethodModal(): void {
    // Pre-fill with existing data if available
    this.paymentForm = {
      fullName: '',
      country: '',
      address: '',
      city: '',
      postalCode: '',
      cardNumber: '',
      expirationDate: '',
      securityCode: '',
      accountName: ''
    };
    this.showPaymentMethodModal = true;
  }

  closePaymentMethodModal(): void {
    this.showPaymentMethodModal = false;
  }

  updatePaymentMethod(): void {
    // Validation
    if (!this.paymentForm.fullName || !this.paymentForm.country || 
        !this.paymentForm.address || !this.paymentForm.city || 
        !this.paymentForm.postalCode || !this.paymentForm.cardNumber || 
        !this.paymentForm.expirationDate || !this.paymentForm.securityCode || 
        !this.paymentForm.accountName) {
      alert('Please fill in all required fields');
      return;
    }

    // Card number validation (basic)
    const cardNumber = this.paymentForm.cardNumber.replace(/\s/g, '');
    if (cardNumber.length < 13 || cardNumber.length > 19) {
      alert('Please enter a valid card number');
      return;
    }

    // Expiration date validation (basic MM/YY format)
    if (!/^\d{2}\/\d{2}$/.test(this.paymentForm.expirationDate)) {
      alert('Please enter expiration date in MM/YY format');
      return;
    }

    // Security code validation
    if (this.paymentForm.securityCode.length < 3 || this.paymentForm.securityCode.length > 4) {
      alert('Please enter a valid security code');
      return;
    }

    console.log('Updating payment method:', this.paymentForm);
    
    // Update the displayed payment method
    const lastFour = cardNumber.slice(-4);
    this.paymentMethod = `Visa •••• ${lastFour}`;
    
    // TODO: Implement actual payment method update logic
    this.closePaymentMethodModal();
    alert('Payment method updated successfully!');
  }

  // Billing Actions
  viewInvoice(invoiceId: number): void {
    console.log('View invoice:', invoiceId);
    // TODO: Navigate to invoice detail or open modal
  }

  cancelPlan(): void {
    this.openCancelPlanModal();
  }

  selectPlan(planId: string): void {
    const plan = this.plans.find(p => p.id === planId);
    if (plan && !plan.isCurrent) {
      if (planId === 'enterprise') {
        console.log('Contact sales for enterprise plan');
        // TODO: Open contact sales modal or form
        alert('Thank you for your interest in our Enterprise plan. Our sales team will contact you shortly.');
      } else {
        console.log('Selecting plan:', planId);
        // TODO: Navigate to payment or confirm plan change
        if (confirm(`Are you sure you want to ${plan.price > this.getCurrentPlanPrice() ? 'upgrade' : 'downgrade'} to the ${plan.name} plan?`)) {
          // Update current plan
          this.plans.forEach(p => p.isCurrent = false);
          plan.isCurrent = true;
          this.currentPlan = plan.name;
          alert(`Successfully ${plan.price > this.getCurrentPlanPrice() ? 'upgraded' : 'downgraded'} to ${plan.name} plan!`);
        }
      }
    }
  }

  // Profile Actions
  onLogoSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.businessLogo = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.businessLogoPreview = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onCoverImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.coverImage = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.coverImagePreview = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  updatePassword(): void {
    if (!this.currentPassword || !this.newPassword || !this.confirmPassword) {
      alert('Please fill in all password fields');
      return;
    }

    if (this.newPassword !== this.confirmPassword) {
      alert('New passwords do not match');
      return;
    }

    if (this.newPassword.length < 8) {
      alert('Password must be at least 8 characters long');
      return;
    }

    console.log('Updating password');
    // TODO: Implement password update
    this.currentPassword = '';
    this.newPassword = '';
    this.confirmPassword = '';
    alert('Password updated successfully!');
  }

  saveChanges(): void {
    console.log('Saving profile changes');
    // TODO: Implement save functionality
    alert('Changes saved successfully!');
  }

  resetToDefaults(): void {
    if (confirm('Are you sure you want to reset all settings to default?')) {
      console.log('Resetting to defaults');
      // TODO: Implement reset functionality
      alert('Settings reset to defaults!');
    }
  }

  deleteAccount(): void {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      if (confirm('Please confirm again. This will permanently delete all your data.')) {
        console.log('Deleting account');
        // TODO: Implement account deletion
        alert('Account deletion initiated. You will receive a confirmation email.');
      }
    }
  }

  getInvoiceStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'paid':
        return 'status-paid';
      case 'pending':
        return 'status-pending';
      case 'failed':
        return 'status-failed';
      default:
        return '';
    }
  }
}