import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Sidebar } from '../sidebar/sidebar';
import { Topbar } from '../topbar/topbar';

interface Transaction {
  id: number;
  eventName: string;
  status: string;
  amount: number;
  date?: string;
}

interface Withdrawal {
  id: number;
  eventName: string;
  amount: number;
  date: string;
  method: string;
}

interface Invoice {
  id: string;
  eventName: string;
  amount: number;
  issueDate: string;
  dueDate: string;
  status: 'Pending' | 'Paid';
}

interface SavedAccount {
  id: number;
  type: 'Bank Account' | 'Mobile Wallet';
  name: string;
  accountNumber: string;
  isDefault: boolean;
  icon: string;
}

@Component({
  selector: 'app-wallet',
  standalone: true,
  imports: [CommonModule, FormsModule, Sidebar, Topbar],
  templateUrl: './wallet.html',
  styleUrls: ['./wallet.css']
})
export class Wallet implements OnInit {
  // User Information
  organizerName: string = 'BNET ORGANIZERS';
  location: string = 'Nairobi, Kenya';
  userAvatar: string = '';
  
  // UI State
  isSidebarOpen: boolean = true;
  notificationCount: number = 3;
  activeMainTab: 'wallet' | 'settings' = 'wallet';
  activeSubTab: 'overview' | 'withdrawals' | 'invoices' = 'overview';
  
  // PIN Modal
  isPinModalOpen: boolean = false;
  pinInput: string = '';
  pinError: string = '';
  correctPin: string = '1234'; // In production, this would be validated against backend
  
  // Wallet Data
  availableBalance: number = 45800;
  pendingBalance: number = 22500;
  totalEarnings: number = 68300;
  commissionRate: number = 15;
  
  // Transaction History
  transactions: Transaction[] = [
    {
      id: 1,
      eventName: 'Album Launch',
      status: 'Awaiting event completion',
      amount: 15000
    },
    {
      id: 2,
      eventName: 'Summer Music Festival',
      status: 'Payment Received',
      amount: 15000,
      date: 'Oct 10, 2025'
    },
    {
      id: 3,
      eventName: 'Tech Conference 2025',
      status: 'Payment Received',
      amount: 15000,
      date: 'Oct 10, 2025'
    },
    {
      id: 4,
      eventName: 'Art Exhibition Opening',
      status: 'Invoice Generated',
      amount: 15000,
      date: 'Oct 10, 2025'
    }
  ];
  
  // Withdrawals
  withdrawals: Withdrawal[] = [
    {
      id: 1,
      eventName: 'Summer Music Festival',
      amount: 15000,
      date: 'Oct 10, 2025',
      method: 'Bank Transfer'
    },
    {
      id: 2,
      eventName: 'Tech Conference 2025',
      amount: 15000,
      date: 'Sep 10, 2025',
      method: 'Mpesa Transfer'
    },
    {
      id: 3,
      eventName: 'Art Exhibition Opening',
      amount: 15000,
      date: 'Aug 10, 2025',
      method: 'Bank Transfer'
    }
  ];
  
  // Invoices
  invoices: Invoice[] = [
    {
      id: 'INV-004',
      eventName: 'Album Launch',
      amount: 15000,
      issueDate: 'Oct 10, 2025',
      dueDate: 'Oct 25, 2025',
      status: 'Pending'
    },
    {
      id: 'INV-003',
      eventName: 'Summer Music Festival',
      amount: 15000,
      issueDate: 'Oct 10, 2025',
      dueDate: 'Oct 25, 2025',
      status: 'Paid'
    },
    {
      id: 'INV-002',
      eventName: 'Tech Conference 2025',
      amount: 15000,
      issueDate: 'Sep 10, 2025',
      dueDate: 'Sep 25, 2025',
      status: 'Paid'
    }
  ];
  
  // Saved Accounts
  savedAccounts: SavedAccount[] = [
    {
      id: 1,
      type: 'Bank Account',
      name: 'KCB Bank',
      accountNumber: '****456',
      isDefault: true,
      icon: '🏛️'
    },
    {
      id: 2,
      type: 'Mobile Wallet',
      name: 'Safaricom',
      accountNumber: '***799',
      isDefault: false,
      icon: '📱'
    }
  ];

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

  // Tab Navigation
  switchMainTab(tab: 'wallet' | 'settings'): void {
    if (tab === 'settings' && this.activeMainTab !== 'settings') {
      // Show PIN modal before accessing settings
      this.openPinModal();
    } else {
      this.activeMainTab = tab;
    }
  }

  switchSubTab(tab: 'overview' | 'withdrawals' | 'invoices'): void {
    this.activeSubTab = tab;
  }

  // PIN Modal
  openPinModal(): void {
    this.isPinModalOpen = true;
    this.pinInput = '';
    this.pinError = '';
  }

  closePinModal(): void {
    this.isPinModalOpen = false;
    this.pinInput = '';
    this.pinError = '';
  }

  submitPin(): void {
    if (this.pinInput === this.correctPin) {
      this.activeMainTab = 'settings';
      this.closePinModal();
    } else {
      this.pinError = 'Incorrect PIN. Please try again.';
      this.pinInput = '';
    }
  }

  // Wallet Actions
  withdrawNow(): void {
    console.log('Withdraw now clicked');
    // TODO: Implement withdrawal flow
  }

  exportReport(): void {
    console.log('Export report clicked');
    // TODO: Implement report export
  }

  viewInvoice(invoiceId: string): void {
    console.log('View invoice:', invoiceId);
    this.router.navigate(['/home/wallet/invoice', invoiceId]);
  }

  previewInvoice(invoiceId: string): void {
    console.log('Preview invoice:', invoiceId);
    // TODO: Show invoice preview modal
  }

  downloadInvoice(invoiceId: string): void {
    console.log('Download invoice:', invoiceId);
    // TODO: Implement invoice download
  }

  viewWithdrawalDetails(withdrawalId: number): void {
    console.log('View withdrawal details:', withdrawalId);
    // TODO: Show withdrawal details modal
  }

  // Settings Actions
  addNewAccount(): void {
    console.log('Add new account clicked');
    // TODO: Show add account modal
  }

  editAccount(accountId: number): void {
    console.log('Edit account:', accountId);
    // TODO: Show edit account modal
  }

  deleteAccount(accountId: number): void {
    if (confirm('Are you sure you want to delete this account?')) {
      this.savedAccounts = this.savedAccounts.filter(a => a.id !== accountId);
      console.log('Account deleted:', accountId);
    }
  }

  setDefaultAccount(accountId: number): void {
    this.savedAccounts.forEach(account => {
      account.isDefault = account.id === accountId;
    });
    console.log('Set default account:', accountId);
  }

  changeWalletPin(): void {
    console.log('Change wallet PIN clicked');
    // TODO: Show change PIN modal
  }

  enableTwoFactor(): void {
    console.log('Enable two-factor authentication clicked');
    // TODO: Show 2FA setup modal
  }

  viewActivityLog(): void {
    console.log('View activity log clicked');
    this.router.navigate(['/home/wallet/activity-log']);
  }

  configureWithdrawalLimits(): void {
    console.log('Configure withdrawal limits clicked');
    // TODO: Show withdrawal limits modal
  }

  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'paid':
        return 'status-paid';
      case 'pending':
        return 'status-pending';
      default:
        return '';
    }
  }
}