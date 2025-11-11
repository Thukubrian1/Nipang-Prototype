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

interface BankAccountForm {
  accountType: string;
  bankName: string;
  accountNumber: string;
  accountName: string;
  branchName: string;
  swiftCode: string;
  nickname: string;
}

interface MobileAccountForm {
  accountType: string;
  provider: string;
  phoneNumber: string;
  accountName: string;
  nickname: string;
}

interface PaypalAccountForm {
  accountType: string;
  email: string;
  nickname: string;
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
  location: string = 'Event Organizer • Nairobi, Kenya';
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
  correctPin: string = '1234';
  
  // Withdraw Modals
  showWithdrawModal: boolean = false;
  showSelectAccountModal: boolean = false;
  showVerifyIdentityModal: boolean = false;
  showSuccessModal: boolean = false;
  
  // Account Modals
  showAddAccountModal: boolean = false;
  showAddBankAccountModal: boolean = false;
  showAddMobileAccountModal: boolean = false;
  showAddPaypalAccountModal: boolean = false;
  showVerifyAccountModal: boolean = false;
  showEditAccountModal: boolean = false;
  showDeleteAccountModal: boolean = false;
  
  // Account Management
  editingAccount: any = null;
  deletingAccount: SavedAccount | null = null;
  
  // Withdrawal Data
  withdrawAmount: number = 0;
  selectedAccountId: number = 0;
  verificationDestination: string = '+254***1234 & your@email.com';
  otpCode: string = '';
  transactionId: string = 'TTEW1324';
  
  // Account Forms
  selectedAccountType: string = '';
  bankAccountForm: BankAccountForm = this.getEmptyBankAccountForm();
  mobileAccountForm: MobileAccountForm = this.getEmptyMobileAccountForm();
  paypalAccountForm: PaypalAccountForm = this.getEmptyPaypalAccountForm();
  accountVerificationDestination: string = '+254***1234 & your@email.com';
  accountOtpCode: string = '';
  
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

  // Helper Methods
  getEmptyBankAccountForm(): BankAccountForm {
    return {
      accountType: 'Bank Account',
      bankName: '',
      accountNumber: '',
      accountName: '',
      branchName: '',
      swiftCode: '',
      nickname: ''
    };
  }

  getEmptyMobileAccountForm(): MobileAccountForm {
    return {
      accountType: 'Mobile Banking',
      provider: '',
      phoneNumber: '',
      accountName: '',
      nickname: ''
    };
  }

  getEmptyPaypalAccountForm(): PaypalAccountForm {
    return {
      accountType: 'Paypal',
      email: '',
      nickname: ''
    };
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

  // Withdraw Modal Flow
  openWithdrawModal(): void {
    this.showWithdrawModal = true;
    this.withdrawAmount = 0;
  }

  closeWithdrawModal(): void {
    this.showWithdrawModal = false;
    this.withdrawAmount = 0;
  }

  proceedToSelectAccount(): void {
    if (this.withdrawAmount <= 0 || this.withdrawAmount > this.availableBalance) {
      alert('Please enter a valid withdrawal amount');
      return;
    }
    this.closeWithdrawModal();
    this.showSelectAccountModal = true;
  }

  closeSelectAccountModal(): void {
    this.showSelectAccountModal = false;
    this.selectedAccountId = 0;
  }

  selectAccount(accountId: number): void {
    this.selectedAccountId = accountId;
  }

  proceedToVerifyIdentity(): void {
    if (this.selectedAccountId === 0) {
      alert('Please select an account');
      return;
    }
    this.closeSelectAccountModal();
    this.showVerifyIdentityModal = true;
  }

  closeVerifyIdentityModal(): void {
    this.showVerifyIdentityModal = false;
    this.otpCode = '';
  }

  resendOTP(): void {
    console.log('Resending OTP...');
    alert('OTP has been resent to your registered phone and email');
  }

  verifyOTP(): void {
    if (this.otpCode.length !== 6) {
      alert('Please enter a valid 6-digit OTP');
      return;
    }
    // Simulate verification
    console.log('Verifying OTP:', this.otpCode);
    this.closeVerifyIdentityModal();
    this.showSuccessModal = true;
    
    // Update balance
    this.availableBalance -= this.withdrawAmount;
    
    // Add to withdrawals
    const account = this.savedAccounts.find(a => a.id === this.selectedAccountId);
    this.withdrawals.unshift({
      id: Date.now(),
      eventName: 'Withdrawal',
      amount: this.withdrawAmount,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      method: account?.type || 'Bank Transfer'
    });
    
    // Close success modal after 3 seconds
    setTimeout(() => {
      this.closeSuccessModal();
    }, 3000);
  }

  closeSuccessModal(): void {
    this.showSuccessModal = false;
    this.withdrawAmount = 0;
    this.selectedAccountId = 0;
    this.otpCode = '';
  }

  // Add Account Flow
  openAddAccountModal(): void {
    this.selectedAccountType = '';
    this.showAddAccountModal = true;
  }

  closeAddAccountModal(): void {
    this.showAddAccountModal = false;
    this.selectedAccountType = '';
  }

  onAccountTypeChange(accountType: string): void {
    this.selectedAccountType = accountType;
    
    // Close all modals first
    this.closeAddAccountModal();
    this.closeAddBankAccountModal();
    this.closeAddMobileAccountModal();
    this.closeAddPaypalAccountModal();
    
    // Open the appropriate form modal based on selected account type
    if (accountType === 'bank') {
      this.bankAccountForm = this.getEmptyBankAccountForm();
      this.showAddBankAccountModal = true;
    } else if (accountType === 'mobile') {
      this.mobileAccountForm = this.getEmptyMobileAccountForm();
      this.showAddMobileAccountModal = true;
    } else if (accountType === 'paypal') {
      this.paypalAccountForm = this.getEmptyPaypalAccountForm();
      this.showAddPaypalAccountModal = true;
    }
  }

  // Bank Account
  closeAddBankAccountModal(): void {
    this.showAddBankAccountModal = false;
  }

  backToAccountTypeSelection(): void {
    this.closeAddBankAccountModal();
    this.closeAddMobileAccountModal();
    this.closeAddPaypalAccountModal();
    this.showAddAccountModal = true;
    this.selectedAccountType = '';
  }

  verifyAndAddBankAccount(): void {
    if (!this.bankAccountForm.bankName || !this.bankAccountForm.accountNumber || 
        !this.bankAccountForm.accountName || !this.bankAccountForm.branchName) {
      alert('Please fill in all required fields');
      return;
    }
    this.closeAddBankAccountModal();
    this.accountVerificationDestination = '+254***1234 & your@email.com';
    this.showVerifyAccountModal = true;
  }

  // Mobile Account
  closeAddMobileAccountModal(): void {
    this.showAddMobileAccountModal = false;
  }

  verifyAndAddMobileAccount(): void {
    if (!this.mobileAccountForm.provider || !this.mobileAccountForm.phoneNumber || 
        !this.mobileAccountForm.accountName) {
      alert('Please fill in all required fields');
      return;
    }
    this.closeAddMobileAccountModal();
    this.accountVerificationDestination = this.mobileAccountForm.phoneNumber + ' & your@email.com';
    this.showVerifyAccountModal = true;
  }

  // PayPal Account
  closeAddPaypalAccountModal(): void {
    this.showAddPaypalAccountModal = false;
  }

  verifyAndAddPaypalAccount(): void {
    if (!this.paypalAccountForm.email) {
      alert('Please enter your PayPal email address');
      return;
    }
    this.closeAddPaypalAccountModal();
    this.accountVerificationDestination = '+254***1234 & ' + this.paypalAccountForm.email;
    this.showVerifyAccountModal = true;
  }

  // Verify Account
  closeVerifyAccountModal(): void {
    this.showVerifyAccountModal = false;
    this.accountOtpCode = '';
  }

  resendAccountOTP(): void {
    console.log('Resending account OTP...');
    alert('OTP has been resent to your registered contact');
  }

  verifyAccountOTP(): void {
    if (this.accountOtpCode.length !== 6) {
      alert('Please enter a valid 6-digit OTP');
      return;
    }
    
    // Add the new account
    const newId = Math.max(...this.savedAccounts.map(a => a.id), 0) + 1;
    
    if (this.selectedAccountType === 'bank') {
      this.savedAccounts.push({
        id: newId,
        type: 'Bank Account',
        name: this.bankAccountForm.bankName,
        accountNumber: '****' + this.bankAccountForm.accountNumber.slice(-3),
        isDefault: false,
        icon: '🏛️'
      });
    } else if (this.selectedAccountType === 'mobile') {
      const providerName = this.mobileAccountForm.provider === 'mpesa' ? 'Safaricom' :
                          this.mobileAccountForm.provider === 'airtel' ? 'Airtel Money' :
                          this.mobileAccountForm.provider === 'tkash' ? 'T-Kash' : this.mobileAccountForm.provider;
      this.savedAccounts.push({
        id: newId,
        type: 'Mobile Wallet',
        name: providerName,
        accountNumber: '***' + this.mobileAccountForm.phoneNumber.slice(-3),
        isDefault: false,
        icon: '📱'
      });
    } else if (this.selectedAccountType === 'paypal') {
      this.savedAccounts.push({
        id: newId,
        type: 'Bank Account',
        name: 'PayPal',
        accountNumber: this.paypalAccountForm.email,
        isDefault: false,
        icon: '💳'
      });
    }
    
    this.closeVerifyAccountModal();
    alert('Account added successfully!');
  }

  // Wallet Actions
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
    this.openAddAccountModal();
  }

  editAccount(accountId: number): void {
    const account = this.savedAccounts.find(a => a.id === accountId);
    if (account) {
      this.editingAccount = {
        ...account,
        nickname: account.name
      };
      this.showEditAccountModal = true;
    }
  }

  closeEditAccountModal(): void {
    this.showEditAccountModal = false;
    this.editingAccount = null;
  }

  saveEditedAccount(): void {
    if (!this.editingAccount) return;
    
    const index = this.savedAccounts.findIndex(a => a.id === this.editingAccount.id);
    if (index !== -1) {
      // If setting as default, unset all others
      if (this.editingAccount.isDefault) {
        this.savedAccounts.forEach(account => {
          account.isDefault = false;
        });
      }
      
      this.savedAccounts[index] = {
        ...this.savedAccounts[index],
        name: this.editingAccount.name,
        accountNumber: this.editingAccount.accountNumber,
        isDefault: this.editingAccount.isDefault
      };
      
      this.closeEditAccountModal();
      alert('Account updated successfully!');
    }
  }

  deleteAccount(accountId: number): void {
    const account = this.savedAccounts.find(a => a.id === accountId);
    if (account) {
      this.deletingAccount = account;
      this.showDeleteAccountModal = true;
    }
  }

  closeDeleteAccountModal(): void {
    this.showDeleteAccountModal = false;
    this.deletingAccount = null;
  }

  confirmDeleteAccount(): void {
    if (this.deletingAccount) {
      this.savedAccounts = this.savedAccounts.filter(a => a.id !== this.deletingAccount!.id);
      console.log('Account deleted:', this.deletingAccount.id);
      this.closeDeleteAccountModal();
      alert('Account deleted successfully!');
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