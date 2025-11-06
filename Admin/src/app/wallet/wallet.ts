import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Sidebar } from '../sidebar/sidebar';
import { Topbar } from '../topbar/topbar';

interface Transaction {
  id: string;
  type: string;
  eventName: string;
  date: string;
  amount: number;
  status: string;
  details?: {
    eventPayment?: number;
    rate?: string;
    commission?: number;
    subscribers?: number;
    ref?: string;
  };
}

interface Invoice {
  id: string;
  invoiceNumber: string;
  eventName: string;
  grossAmount: number;
  commission: number;
  netAmount: number;
  issueDate: string;
  dueDate: string;
  sentStatus: boolean;
  paidStatus: boolean;
  processingStatus?: boolean;
}

interface Withdrawal {
  id: string;
  ref: string;
  date: string;
  amount: number;
  method: string;
  status: string;
}

interface SavedAccount {
  id: string;
  type: string;
  name: string;
  details: string;
  isDefault: boolean;
}

interface EscrowEvent {
  id: string;
  name: string;
  status: string;
  currency: string;
  escrowId: string;
  attendees: number;
  provider: string;
  email: string;
  eventDate: string;
  completedDate?: string;
  rating?: number;
  totalPayment: number;
  platformCommission: number;
  amountToProvider: number;
}

@Component({
  selector: 'app-wallet',
  standalone: true,
  imports: [CommonModule, FormsModule, Sidebar, Topbar],
  templateUrl: './wallet.html',
  styleUrl: './wallet.css',
})
export class Wallet implements OnInit {
  
  adminName: string = 'Super Admin';
  role: string = 'Administrator';
  userAvatar: string = '';
  
  isSidebarOpen: boolean = true;
  activeMainTab: string = 'wallet';
  activeSubTab: string = 'overview';
  
  showPinModal: boolean = false;
  pinInput: string = '';
  
  walletData = {
    availableForWithdrawal: 8452500,
    heldInEscrow: 4250000,
    escrowPendingEvents: 3,
    commissionEarned: 682500,
    averageCommissionRate: 15,
    totalLifetimeEarnings: 15630000,
    lifetimeGrowth: 12.5,
    appSubscribers: 2450000,
    activeSubscriptions: 450,
    appSubsGrowth: 8.2,
    serviceProviderSubs: 1820000,
    premiumProviders: 85,
    providerSubsGrowth: 5.4,
    eventSponsorships: 3500000,
    averagePerEvent: 291666,
    commissionRate: 15,
    eventsThisMonth: 47,
    activeSubscribers: 535,
    todayRevenue: 450000,
    thisWeekRevenue: 2150000,
    thisMonthRevenue: 8452500
  };

  revenueDistribution = [
    { label: 'App Subscriptions', percentage: 35, color: '#3b82f6' },
    { label: 'Provider Subscriptions', percentage: 45, color: '#10b981' },
    { label: 'Event Sponsorships', percentage: 15, color: '#8b5cf6' },
    { label: 'Event Commissions', percentage: 5, color: '#f59e0b' }
  ];

  transactions: Transaction[] = [
    {
      id: '1',
      type: 'Commission',
      eventName: 'Color Fest',
      date: '2025-11-01',
      amount: 225000,
      status: 'Completed',
      details: {
        eventPayment: 1500000,
        rate: '15%',
        commission: 225000
      }
    },
    {
      id: '2',
      type: 'App Subscription',
      eventName: '',
      date: 'Oct 10, 2025',
      amount: 450000,
      status: 'Completed',
      details: {
        subscribers: 450,
        ref: 'TXN-1234'
      }
    },
    {
      id: '3',
      type: 'Commission',
      eventName: 'Tech Summit',
      date: '2025-10-15',
      amount: 225000,
      status: 'Completed',
      details: {
        eventPayment: 1500000,
        rate: '15%',
        commission: 225000
      }
    }
  ];

  invoices: Invoice[] = [
    {
      id: '1',
      invoiceNumber: 'INV-003',
      eventName: 'Summer Music Festival',
      grossAmount: 850000,
      commission: 127500,
      netAmount: 500000,
      issueDate: 'Oct 10, 2025',
      dueDate: 'Oct 25, 2025',
      sentStatus: true,
      paidStatus: true
    },
    {
      id: '2',
      invoiceNumber: 'INV-003',
      eventName: 'Color Fest',
      grossAmount: 750000,
      commission: 112500,
      netAmount: 637500,
      issueDate: 'Oct 5, 2025',
      dueDate: 'Oct 20, 2025',
      sentStatus: true,
      paidStatus: false,
      processingStatus: true
    }
  ];

  withdrawals: Withdrawal[] = [
    {
      id: '1',
      ref: 'BT-20251020-001 • 10:05',
      date: 'Oct 10, 2025',
      amount: 2000000,
      method: 'Bank Transfer',
      status: 'Completed'
    },
    {
      id: '2',
      ref: 'BT-20251020-001 • 10:05',
      date: 'Oct 5, 2025',
      amount: 2000000,
      method: 'Bank Transfer',
      status: 'Completed'
    }
  ];

  savedAccounts: SavedAccount[] = [
    {
      id: '1',
      type: 'Bank Account',
      name: 'KCB Bank',
      details: '****456',
      isDefault: true
    },
    {
      id: '2',
      type: 'Mobile Wallet',
      name: 'Safaricom',
      details: '***799',
      isDefault: false
    }
  ];

  walletSettings = {
    commissionRate: 15,
    autoRelease: false,
    minimumWithdrawal: 10000,
    emailNotifications: false,
    currency: 'KSH(Kenyan Shillings)'
  };

  escrowEvents: EscrowEvent[] = [
    {
      id: '1',
      name: 'London Business Conference',
      status: 'Ready For Release',
      currency: 'GBP',
      escrowId: 'ESC-003',
      attendees: 1500,
      provider: 'UK Events Limited',
      email: 'info@ukevents.co.uk',
      eventDate: '2025-10-26',
      completedDate: '2025-10-26',
      rating: 4.7,
      totalPayment: 12000,
      platformCommission: 1800,
      amountToProvider: 10200
    },
    {
      id: '2',
      name: 'Annual Tech Summit 2025',
      status: 'Ready For Release',
      currency: 'KSH',
      escrowId: 'ESC-001',
      attendees: 450,
      provider: 'BNET Organizers',
      email: 'contact@eliteevents.co.ke',
      eventDate: '2025-10-28',
      completedDate: '2025-10-28',
      rating: 4.8,
      totalPayment: 850000,
      platformCommission: 127500,
      amountToProvider: 722500
    },
    {
      id: '3',
      name: 'Fashion Week Nairobi',
      status: 'In Progress',
      currency: 'KSH',
      escrowId: 'ESC-004',
      attendees: 800,
      provider: 'Glamour Events Ltd',
      email: 'info@glamourevents.co.ke',
      eventDate: '2025-11-05',
      totalPayment: 5000,
      platformCommission: 750,
      amountToProvider: 4250
    },
    {
      id: '4',
      name: 'Corporate Gala Dinner',
      status: 'Awaiting Completion',
      currency: 'KSH',
      escrowId: 'ESC-005',
      attendees: 200,
      provider: 'Premium Catering Services',
      email: 'hello@premiumcatering.co.ke',
      eventDate: '2025-11-10',
      totalPayment: 650000,
      platformCommission: 97500,
      amountToProvider: 552500
    },
    {
      id: '5',
      name: 'New York Tech Expo',
      status: 'Ready For Release',
      currency: 'USD',
      escrowId: 'ESC-002',
      attendees: 1500,
      provider: 'NYC Events Inc',
      email: 'contact@nycevents.com',
      eventDate: '2025-11-08',
      rating: 4.7,
      totalPayment: 12000,
      platformCommission: 1800,
      amountToProvider: 10200
    }
  ];

  escrowStats = {
    totalHeld: 4250000,
    totalEvents: 5,
    averagePerEvent: 850000,
    readyForRelease: 2400000,
    readyEvents: 3,
    readyCommission: 360000,
    inProgress: 5000,
    inProgressEvents: 1,
    inProgressCommission: 750,
    awaitingCompletion: 650000,
    awaitingEvents: 1,
    awaitingCommission: 97500,
    totalCommission: 458250,
    netToProviders: 3791750
  };

  transactionFilter: string = '';
  searchQuery: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    console.log('Wallet component initialized');
  }

  handleSidebarToggle(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  handleSearch(query: string): void {
    console.log('Search query:', query);
    this.searchQuery = query;
  }

  switchMainTab(tab: string): void {
    if (tab === 'walletSettings') {
      this.showPinModal = true;
    } else {
      this.activeMainTab = tab;
      if (tab === 'wallet') {
        this.activeSubTab = 'overview';
      }
    }
  }

  switchSubTab(tab: string): void {
    this.activeSubTab = tab;
  }

  closePinModal(): void {
    this.showPinModal = false;
    this.pinInput = '';
  }

  submitPin(): void {
    if (this.pinInput.length === 4) {
      console.log('PIN submitted:', this.pinInput);
      this.showPinModal = false;
      this.activeMainTab = 'walletSettings';
      this.pinInput = '';
    } else {
      alert('Please enter a 4-digit PIN');
    }
  }

  initiateWithdrawal(): void {
    console.log('Initiating withdrawal...');
    alert('Opening withdrawal form...');
  }

  viewEscrow(): void {
    this.activeMainTab = 'escrowManagement';
  }

  exportReport(): void {
    console.log('Exporting report...');
    alert('Exporting full report...');
  }

  previewInvoice(id: string): void {
    console.log('Previewing invoice:', id);
    alert('Opening invoice preview: ' + id);
  }

  downloadInvoice(id: string): void {
    console.log('Downloading invoice:', id);
    alert('Downloading invoice: ' + id);
  }

  addNewAccount(): void {
    console.log('Adding new account...');
    alert('Opening add account form...');
  }

  editAccount(id: string): void {
    console.log('Editing account:', id);
    alert('Editing account: ' + id);
  }

  deleteAccount(id: string): void {
    if (confirm('Are you sure you want to delete this account?')) {
      console.log('Deleting account:', id);
      this.savedAccounts = this.savedAccounts.filter(acc => acc.id !== id);
    }
  }

  setDefaultAccount(id: string): void {
    this.savedAccounts.forEach(acc => {
      acc.isDefault = acc.id === id;
    });
    console.log('Set default account:', id);
  }

  changeWalletPin(): void {
    console.log('Opening change PIN dialog...');
    alert('Change Wallet PIN functionality...');
  }

  enableTwoFactor(): void {
    console.log('Enabling two-factor authentication...');
    alert('Enable Two-Factor Authentication...');
  }

  viewActivityLog(): void {
    console.log('Viewing activity log...');
    alert('Opening activity log...');
  }

  withdrawalLimits(): void {
    console.log('Opening withdrawal limits...');
    alert('Withdrawal Limits & Notifications settings...');
  }

  saveSettings(): void {
    console.log('Saving wallet settings...', this.walletSettings);
    alert('Wallet settings saved successfully!');
  }

  releaseFunds(eventId: string): void {
    const event = this.escrowEvents.find(e => e.id === eventId);
    if (event && confirm(`Release funds for ${event.name}?`)) {
      console.log('Releasing funds for event:', eventId);
      alert('Generating invoice and releasing funds...');
    }
  }

  holdFunds(eventId: string): void {
    const event = this.escrowEvents.find(e => e.id === eventId);
    if (event) {
      const reason = prompt('Please provide a reason for holding funds:');
      if (reason) {
        console.log('Holding funds for event:', eventId, 'Reason:', reason);
        alert('Funds held successfully');
      }
    }
  }

  viewEventDetails(eventId: string): void {
    console.log('Viewing event details:', eventId);
    alert('Opening detailed event information...');
  }

  getStatusClass(status: string): string {
    const statusMap: { [key: string]: string } = {
      'Ready For Release': 'ready',
      'In Progress': 'in-progress',
      'Awaiting Completion': 'awaiting'
    };
    return statusMap[status] || '';
  }

  formatCurrency(amount: number, currency: string = 'KSH'): string {
    return `${currency} ${amount.toLocaleString()}`;
  }

  getBarWidth(percentage: number): string {
    return `${percentage}%`;
  }
}