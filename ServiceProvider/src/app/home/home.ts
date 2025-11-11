import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Sidebar } from '../sidebar/sidebar';
import { Topbar } from '../topbar/topbar';
import { AddEvent } from '../add-event/add-event';
import { EventFormData } from '../models/eventmodel';


interface SponsorEvent {
  id: number;
  title: string;
  category: string;
  date: string;
  time: string;
  booked: number;
  capacity: number;
  price: number;
  status: 'Active';
}
interface MobileBankingPaymentForm {
  paymentMode: string;
  phoneNumber: string;
  agreeToTerms: boolean;
}

interface CardPaymentForm {
  fullName: string;
  country: string;
  addressLine1: string;
  city: string;
  postalCode: string;
  cardNumber: string;
  expirationDate: string;
  securityCode: string;
  accountName: string;
  agreeToTerms: boolean;
}

interface WalletPaymentForm {
  walletPassword: string;
  agreeToTerms: boolean;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, Sidebar, Topbar, AddEvent],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home implements OnInit {
  // User Information
  organizerName: string = 'BNET ORGANIZERS';
  location: string = 'Nairobi, Kenya';
  userAvatar: string = '';
  
  // Stats Data
  activeEvents: number = 24;
  eventsThisWeek: number = 3;
  totalBookings: number = 100;
  bookingsPercentage: number = 15;
  totalRevenue: string = '100K';
  pendingRevenue: string = '22.5K';
  
  // Capacity Data
  avgCapacity: number = 51;
  capacityChange: number = 5;
  
  // Wallet Data
  availableBalance: number = 45800;
  pendingBalance: number = 22500;
  totalEarnings: number = 68300;
  
  // Sponsor Event Modals
  showSponsorEventModal: boolean = false;
  showPaymentMethodModal: boolean = false;
  showMobileBankingModal: boolean = false;
  showCardPaymentModal: boolean = false;
  showWalletPaymentModal: boolean = false;

  // Selected Event Data
  selectedSponsorEvent: SponsorEvent | null = null;
  selectedEventId: number = 0;
  selectedPaymentMethod: string = '';
  sponsorshipFee: number = 10;
  deletingEvent: Event | null = null;

  // Payment Forms
  mobileBankingForm: MobileBankingPaymentForm = {
    paymentMode: '',
    phoneNumber: '',
    agreeToTerms: false
  };
  
  cardPaymentForm: CardPaymentForm = {
    fullName: '',
    country: '',
    addressLine1: '',
    city: '',
    postalCode: '',
    cardNumber: '',
    expirationDate: '',
    securityCode: '',
    accountName: '',
    agreeToTerms: false
  };
  
  walletPaymentForm: WalletPaymentForm = {
    walletPassword: '',
    agreeToTerms: false
  };
  
  // Available events for sponsorship
  availableSponsorEvents: SponsorEvent[] = [
    {
      id: 1,
      title: 'Hiking at Karura',
      category: 'Outdoor Adventures - Hiking',
      date: '20/10/2025',
      time: '19:00',
      booked: 45,
      capacity: 100,
      price: 22500,
      status: 'Active'
    },
    {
      id: 2,
      title: 'Hiking at Karura',
      category: 'Outdoor Adventures - Hiking',
      date: '20/10/2025',
      time: '19:00',
      booked: 45,
      capacity: 100,
      price: 22500,
      status: 'Active'
    },
    {
      id: 3,
      title: 'Hiking at Karura',
      category: 'Outdoor Adventures - Hiking',
      date: '20/10/2025',
      time: '19:00',
      booked: 45,
      capacity: 100,
      price: 22500,
      status: 'Active'
    }
  ];

  // AI Insights
  insights = [
    {
      title: 'High Demand Window',
      description: 'Fridays 7-9 PM have 3× higher engagement',
      action: 'recommendations',
      actionText: 'View Recommendations →'
    },
    {
      title: 'Event Boost Suggestion',
      description: 'Sponsoring Summer Festival could increase bookings by 40%',
      action: 'sponsor',
      actionText: 'Sponsor Event →'
    }
  ];
  
  // Upcoming Events
  upcomingEvents = [
    {
      id: 1,
      title: 'Album Launch',
      date: '20/10/2025',
      time: '19:00',
      bookings: 45,
      capacity: 100,
      price: 15000,
      category: 'Music'
    },
    {
      id: 2,
      title: 'Album Launch',
      date: '20/10/2025',
      time: '19:00',
      bookings: 45,
      capacity: 100,
      price: 15000,
      category: 'Music'
    },
    {
      id: 3,
      title: 'Album Launch',
      date: '20/10/2025',
      time: '19:00',
      bookings: 45,
      capacity: 100,
      price: 15000,
      category: 'Music'
    },
    {
      id: 4,
      title: 'Album Launch',
      date: '20/10/2025',
      time: '19:00',
      bookings: 45,
      capacity: 100,
      price: 15000,
      category: 'Music'
    }
  ];
  
  // UI State
  isSidebarOpen: boolean = true;
  notificationCount: number = 3;
  isAddEventModalOpen: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    // TODO: Replace with actual API calls
  }

  handleSidebarToggle(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  handleSearch(query: string): void {
    console.log('Searching for:', query);
    // Implement search functionality
  }

  addEvent(): void {
    this.isAddEventModalOpen = true;
  }

    // Sponsor Event Journey
  sponsorEvent(): void {
    this.showSponsorEventModal = true;
  }

  closeSponsorEventModal(): void {
    this.showSponsorEventModal = false;
    this.selectedEventId = 0;
  }

  selectSponsorEvent(eventId: number): void {
    this.selectedEventId = eventId;
  }

  continueToPayment(): void {
    if (this.selectedEventId === 0) {
      alert('Please select an event to sponsor');
      return;
    }
    this.selectedSponsorEvent = this.availableSponsorEvents.find(e => e.id === this.selectedEventId) || null;
    this.closeSponsorEventModal();
    this.showPaymentMethodModal = true;
  }

  // Payment Method Selection
  closePaymentMethodModal(): void {
    this.showPaymentMethodModal = false;
    this.selectedPaymentMethod = '';
  }

  selectPaymentMethod(method: string): void {
    this.selectedPaymentMethod = method;
    this.closePaymentMethodModal();
    
    if (method === 'mobile') {
      this.mobileBankingForm = {
        paymentMode: '',
        phoneNumber: '',
        agreeToTerms: false
      };
      this.showMobileBankingModal = true;
    } else if (method === 'card') {
      this.cardPaymentForm = {
        fullName: '',
        country: '',
        addressLine1: '',
        city: '',
        postalCode: '',
        cardNumber: '',
        expirationDate: '',
        securityCode: '',
        accountName: '',
        agreeToTerms: false
      };
      this.showCardPaymentModal = true;
    } else if (method === 'wallet') {
      this.walletPaymentForm = {
        walletPassword: '',
        agreeToTerms: false
      };
      this.showWalletPaymentModal = true;
    }
  }

  backToEventSelection(): void {
    this.closePaymentMethodModal();
    this.showSponsorEventModal = true;
  }

  // Mobile Banking Payment
  closeMobileBankingModal(): void {
    this.showMobileBankingModal = false;
  }

  backToPaymentMethod(): void {
    this.closeMobileBankingModal();
    this.closeCardPaymentModal();
    this.closeWalletPaymentModal();
    this.showPaymentMethodModal = true;
  }

  processMobileBankingPayment(): void {
    if (!this.mobileBankingForm.paymentMode || !this.mobileBankingForm.phoneNumber || !this.mobileBankingForm.agreeToTerms) {
      alert('Please fill in all required fields and agree to terms');
      return;
    }
    console.log('Processing mobile banking payment:', this.mobileBankingForm);
    // TODO: Integrate with payment API
    alert('Sponsorship payment successful!');
    this.closeMobileBankingModal();
  }

  // Card Payment
  closeCardPaymentModal(): void {
    this.showCardPaymentModal = false;
  }

  processCardPayment(): void {
    if (!this.cardPaymentForm.fullName || !this.cardPaymentForm.cardNumber || 
        !this.cardPaymentForm.expirationDate || !this.cardPaymentForm.securityCode || 
        !this.cardPaymentForm.agreeToTerms) {
      alert('Please fill in all required fields and agree to terms');
      return;
    }
    console.log('Processing card payment:', this.cardPaymentForm);
    // TODO: Integrate with payment API
    alert('Sponsorship payment successful!');
    this.closeCardPaymentModal();
  }

  // Wallet Payment
  closeWalletPaymentModal(): void {
    this.showWalletPaymentModal = false;
  }

  processWalletPayment(): void {
    if (!this.walletPaymentForm.walletPassword || !this.walletPaymentForm.agreeToTerms) {
      alert('Please enter your wallet password and agree to terms');
      return;
    }
    console.log('Processing wallet payment:', this.walletPaymentForm);
    // TODO: Integrate with payment API
    alert('Sponsorship payment successful!');
    this.closeWalletPaymentModal();
  }

  closeAddEventModal(): void {
    this.isAddEventModalOpen = false;
  }

  handleEventSubmit(eventData: EventFormData): void {
    console.log('Event submitted:', eventData);
    
    // TODO: Send to API
    // this.eventService.createEvent(eventData).subscribe(
    //   response => {
    //     console.log('Event created successfully', response);
    //     this.router.navigate(['/home/events', response.id]);
    //   },
    //   error => {
    //     console.error('Error creating event', error);
    //   }
    // );
    
    // For now, just close the modal
    this.isAddEventModalOpen = false;
  }

  requestWithdrawal(): void {
    console.log('Request withdrawal clicked');
    this.router.navigate(['/home/wallet/withdraw']);
  }

  viewAllInsights(): void {
    console.log('View all insights clicked');
    this.router.navigate(['/home/analytics/insights']);
  }

  handleInsightAction(action: string): void {
    console.log('Insight action:', action);
    // Handle different insight actions
  }

  viewEvent(eventId: number): void {
    console.log('View event:', eventId);
    this.router.navigate(['/home/events', eventId]);
  }

  // Quick Actions
  createEvent(): void {
    this.isAddEventModalOpen = true;
  }

  createSupportTicket(): void {
    this.router.navigate(['/support']);
  }

  viewAnalytics(): void {
    this.router.navigate(['/analytics']);
  }
}