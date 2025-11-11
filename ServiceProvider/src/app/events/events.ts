import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Sidebar } from '../sidebar/sidebar';
import { Topbar } from '../topbar/topbar';
import { FormsModule } from '@angular/forms';
import { EventFormData } from '../models/eventmodel';
import { AddEvent } from '../add-event/add-event';

interface Event {
  id: number;
  name: string;
  category: string;
  subCategory: string;
  date: string;
  time: string;
  bookings: number;
  capacity: number;
  revenue: number;
  status: 'Active' | 'Pending' | 'Sponsored' | 'Draft' | 'Cancelled';
}

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

interface EventAnalytics {
  eventName: string;
  category: string;
  totalRevenue: number;
  totalBookings: number;
  capacityFilled: string;
  averageRating: number;
  conversionRate: number;
  conversionChange: number;
  avgTicketPrice: number;
  cancellationRate: number;
  cancellationImprovement: number;
  viewsTrend: DayData[];
  bookingTrend: DayData[];
  demographics: AgeGroup[];
  reviews: Review[];
}

interface DayData {
  day: string;
  value: number;
}

interface AgeGroup {
  range: string;
  percentage: number;
}

interface Review {
  id: number;
  rating: number;
  title: string;
  comment: string;
  userName: string;
  userAvatar: string;
  date: string;
  replied: boolean;
  reply?: string;
}

interface EditEventForm {
  coverImage: string;
  galleryImages: string[];
  eventName: string;
  description: string;
  category: string;
  subCategory: string;
  location: string;
  locationURL: string;
  dateFrom: string;
  dateTo: string;
  startTime: string;
  endTime: string;
  totalTickets: number;
  priceTypes: PriceType[];
}

interface PriceType {
  id: number;
  typeName: string;
  price: number;
  availableTickets: number;
  ticketType: string;
  ticketURL: string;
  availableFrom: string;
  availableTo: string;
}

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule, FormsModule, Sidebar, Topbar, AddEvent],
  templateUrl: './events.html',
  styleUrls: ['./events.css']
})

export class Events implements OnInit {
  // User Information
  organizerName: string = 'BNET ORGANIZERS';
  location: string = 'Event Organizer • Nairobi, Kenya';
  userAvatar: string = '';
  
  // UI State
  isSidebarOpen: boolean = true;
  notificationCount: number = 3;
  
  // Stats
  liveEvents: number = 24;
  liveEventsChange: number = 3;
  pendingApproval: number = 10;
  sponsoredEvents: number = 8;
  sponsoredEventsNew: number = 5;
  draftEvents: number = 10;
  
  // Search and Filter
  searchQuery: string = '';
  selectedFilter: string = 'Event';
  filterOptions: string[] = ['Event', 'Provider', 'Category', 'Status'];
  
  // Sponsor Event Modals
  showSponsorEventModal: boolean = false;
  showPaymentMethodModal: boolean = false;
  showMobileBankingModal: boolean = false;
  showCardPaymentModal: boolean = false;
  showWalletPaymentModal: boolean = false;
  
  // Delete, Edit, Analytics Modals
  showDeleteModal: boolean = false;
  showEditModal: boolean = false;
  showAnalyticsModal: boolean = false;
  showAllReviewsModal: boolean = false;
  activeReviewFilter: string = 'all';
  
  // Selected Event Data
  selectedSponsorEvent: SponsorEvent | null = null;
  selectedEventId: number = 0;
  selectedPaymentMethod: string = '';
  sponsorshipFee: number = 10;
  deletingEvent: Event | null = null;
  
  // Analytics Data
  currentAnalytics: EventAnalytics | null = null;
  currentReviewReply: string = '';
  replyingToReviewId: number = 0;
  
  // Edit Event Form
  editEventForm: EditEventForm = {
    coverImage: '',
    galleryImages: [],
    eventName: '',
    description: '',
    category: '',
    subCategory: '',
    location: '',
    locationURL: '',
    dateFrom: '',
    dateTo: '',
    startTime: '',
    endTime: '',
    totalTickets: 0,
    priceTypes: []
  };
  
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
  
  // Events Data
  events: Event[] = [
    {
      id: 1,
      name: 'Color Fest',
      category: 'Outdoor Adventures',
      subCategory: 'Hiking',
      date: '12/12/2025',
      time: '9:00 AM',
      bookings: 45,
      capacity: 100,
      revenue: 22500,
      status: 'Sponsored'
    },
    {
      id: 2,
      name: 'Color Fest',
      category: 'Outdoor Adventures',
      subCategory: 'Hiking',
      date: '12/12/2025',
      time: '8:00 AM',
      bookings: 45,
      capacity: 100,
      revenue: 22500,
      status: 'Sponsored'
    },
    {
      id: 3,
      name: 'Color Fest',
      category: 'Outdoor Adventures',
      subCategory: 'Hiking',
      date: '12/12/2025',
      time: '9:00 AM',
      bookings: 45,
      capacity: 100,
      revenue: 22500,
      status: 'Active'
    },
    {
      id: 4,
      name: 'Color Fest',
      category: 'Outdoor Adventures',
      subCategory: 'Hiking',
      date: '12/12/2025',
      time: '9:00 AM',
      bookings: 45,
      capacity: 100,
      revenue: 22500,
      status: 'Active'
    },
    {
      id: 5,
      name: 'Color Fest',
      category: 'Outdoor Adventures',
      subCategory: 'Hiking',
      date: '12/12/2025',
      time: '9:00 AM',
      bookings: 45,
      capacity: 100,
      revenue: 22500,
      status: 'Pending'
    },
    {
      id: 6,
      name: 'Color Fest',
      category: 'Outdoor Adventures',
      subCategory: 'Hiking',
      date: '12/12/2025',
      time: '9:00 AM',
      bookings: 45,
      capacity: 100,
      revenue: 22500,
      status: 'Pending'
    },
    {
      id: 7,
      name: 'Color Fest',
      category: 'Outdoor Adventures',
      subCategory: 'Hiking',
      date: '12/12/2025',
      time: '9:00 AM',
      bookings: 45,
      capacity: 100,
      revenue: 22500,
      status: 'Pending'
    },
    {
      id: 8,
      name: 'Color Fest',
      category: 'Outdoor Adventures',
      subCategory: 'Hiking',
      date: '12/12/2025',
      time: '9:00 AM',
      bookings: 45,
      capacity: 100,
      revenue: 22500,
      status: 'Pending'
    },
    {
      id: 9,
      name: 'Color Fest',
      category: 'Outdoor Adventures',
      subCategory: 'Hiking',
      date: '12/12/2025',
      time: '9:00 AM',
      bookings: 45,
      capacity: 100,
      revenue: 22500,
      status: 'Draft'
    },
    {
      id: 10,
      name: 'Color Fest',
      category: 'Outdoor Adventures',
      subCategory: 'Hiking',
      date: '12/12/2025',
      time: '9:00 AM',
      bookings: 45,
      capacity: 100,
      revenue: 22500,
      status: 'Draft'
    }
  ];
  
  filteredEvents: Event[] = [];
  isAddEventModalOpen: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.filteredEvents = [...this.events];
  }

  handleSidebarToggle(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  handleSearch(query: string): void {
    console.log('Searching for:', query);
    this.searchQuery = query;
    this.filterEvents();
  }

  onSearchChange(): void {
    this.filterEvents();
  }

  filterEvents(): void {
    if (!this.searchQuery.trim()) {
      this.filteredEvents = [...this.events];
      return;
    }

    const query = this.searchQuery.toLowerCase();
    this.filteredEvents = this.events.filter(event => {
      switch (this.selectedFilter) {
        case 'Event':
          return event.name.toLowerCase().includes(query);
        case 'Category':
          return event.category.toLowerCase().includes(query) || 
                 event.subCategory.toLowerCase().includes(query);
        case 'Status':
          return event.status.toLowerCase().includes(query);
        default:
          return true;
      }
    });
  }

  addEvent(): void {
    this.isAddEventModalOpen = true;
  }
  
  closeAddEventModal(): void {
    this.isAddEventModalOpen = false;
  }
  
  handleEventSubmit(eventData: EventFormData): void {
    console.log('Event submitted:', eventData);
    this.isAddEventModalOpen = false;
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

  // Event Actions
  editEvent(eventId: number): void {
    const event = this.events.find(e => e.id === eventId);
    if (event) {
      // Populate edit form with event data
      this.editEventForm = {
        coverImage: '',
        galleryImages: [],
        eventName: event.name,
        description: 'Venue will be at Karura forest on 5th July 2025 from 9:00AM to 5:00PM. Come one come all',
        category: event.category,
        subCategory: event.subCategory,
        location: 'Karura Forest',
        locationURL: 'Karura Forest location',
        dateFrom: '5/07/2025',
        dateTo: '5/07/2025',
        startTime: '9:00AM',
        endTime: '5:00PM',
        totalTickets: 1100,
        priceTypes: [
          {
            id: 1,
            typeName: 'Regular',
            price: 2000,
            availableTickets: 1000,
            ticketType: 'General',
            ticketURL: 'https://nipange.chan.com',
            availableFrom: '3/07/2025 at 4:00 PM',
            availableTo: '5/07/2025 at 12:00 AM'
          },
          {
            id: 2,
            typeName: 'VIP',
            price: 5000,
            availableTickets: 50,
            ticketType: 'General',
            ticketURL: 'https://nipange.chan.com',
            availableFrom: '3/07/2025 at 4:00 PM',
            availableTo: '5/07/2025 at 12:00 AM'
          },
          {
            id: 3,
            typeName: 'VVIP',
            price: 10000,
            availableTickets: 20,
            ticketType: 'General',
            ticketURL: 'https://nipange.chan.com',
            availableFrom: '3/07/2025 at 4:00 PM',
            availableTo: '5/07/2025 at 12:00 AM'
          },
          {
            id: 4,
            typeName: 'Reserved',
            price: 0,
            availableTickets: 30,
            ticketType: 'Reserved',
            ticketURL: 'https://nipange.chan.com',
            availableFrom: '3/07/2025 at 4:00 PM',
            availableTo: '5/07/2025 at 12:00 AM'
          }
        ]
      };
      this.showEditModal = true;
    }
  }

  closeEditModal(): void {
    this.showEditModal = false;
  }

  addPriceType(): void {
    const newId = this.editEventForm.priceTypes.length + 1;
    this.editEventForm.priceTypes.push({
      id: newId,
      typeName: '',
      price: 0,
      availableTickets: 0,
      ticketType: 'General',
      ticketURL: '',
      availableFrom: '',
      availableTo: ''
    });
  }

  removePriceType(index: number): void {
    this.editEventForm.priceTypes.splice(index, 1);
  }

  updateEvent(): void {
    console.log('Updating event:', this.editEventForm);
    // TODO: Integrate with API
    alert('Event updated successfully!');
    this.closeEditModal();
  }

  viewAnalytics(eventId: number): void {
    // Mock analytics data
    this.currentAnalytics = {
      eventName: 'Color Fest',
      category: 'Outdoor Adventures • Hiking',
      totalRevenue: 22500,
      totalBookings: 45,
      capacityFilled: '45/100',
      averageRating: 4.8,
      conversionRate: 68,
      conversionChange: 5,
      avgTicketPrice: 500,
      cancellationRate: 3.2,
      cancellationImprovement: 1.5,
      viewsTrend: [
        { day: 'Mon', value: 40 },
        { day: 'Tue', value: 60 },
        { day: 'Wed', value: 80 },
        { day: 'Thur', value: 90 },
        { day: 'Fri', value: 120 },
        { day: 'Sat', value: 150 },
        { day: 'Sun', value: 100 }
      ],
      bookingTrend: [
        { day: 'Mon', value: 8 },
        { day: 'Tue', value: 12 },
        { day: 'Wed', value: 10 },
        { day: 'Thur', value: 9 },
        { day: 'Fri', value: 6 },
        { day: 'Sat', value: 15 },
        { day: 'Sun', value: 9 }
      ],
      demographics: [
        { range: 'Age 18-25', percentage: 35 },
        { range: 'Age 26-35', percentage: 45 },
        { range: 'Age 36-50', percentage: 15 },
        { range: 'Age 50+', percentage: 5 }
      ],
      reviews: [
        {
          id: 1,
          rating: 5,
          title: 'Great Experience',
          comment: 'Really enjoyed the hiking trail and the organization was top-notch. Would recommend to friends!',
          userName: 'Jane Doe',
          userAvatar: '',
          date: '21st Oct 2025',
          replied: false
        },
        {
          id: 2,
          rating: 5,
          title: 'Great Experience',
          comment: 'Really enjoyed the hiking trail and the organization was top-notch. Would recommend to friends!',
          userName: 'Jane Doe',
          userAvatar: '',
          date: '21st Oct 2025',
          replied: false
        },
        {
          id: 3,
          rating: 5,
          title: 'Great Experience',
          comment: 'Really enjoyed the hiking trail and the organization was top-notch. Would recommend to friends!',
          userName: 'Jane Doe',
          userAvatar: '',
          date: '21st Oct 2025',
          replied: false
        }
      ]
    };
    this.showAnalyticsModal = true;
  }

  closeAnalyticsModal(): void {
    this.showAnalyticsModal = false;
    this.showAllReviewsModal = false;
  }

  viewAllReviews(): void {
    this.showAnalyticsModal = false;
    this.showAllReviewsModal = true;
  }

  backToAnalytics(): void {
    this.showAllReviewsModal = false;
    this.showAnalyticsModal = true;
  }

  setReviewFilter(filter: string): void {
    this.activeReviewFilter = filter;
  }

  getFilteredReviews(): Review[] {
    if (!this.currentAnalytics) return [];
    
    if (this.activeReviewFilter === 'pending') {
      return this.currentAnalytics.reviews.filter(r => !r.replied);
    } else if (this.activeReviewFilter === 'replied') {
      return this.currentAnalytics.reviews.filter(r => r.replied);
    }
    return this.currentAnalytics.reviews;
  }

  startReply(reviewId: number): void {
    this.replyingToReviewId = reviewId;
    this.currentReviewReply = '';
  }

  cancelReply(): void {
    this.replyingToReviewId = 0;
    this.currentReviewReply = '';
  }

  sendReply(reviewId: number): void {
    if (!this.currentReviewReply.trim()) {
      alert('Please enter a reply');
      return;
    }
    
    if (this.currentAnalytics) {
      const review = this.currentAnalytics.reviews.find(r => r.id === reviewId);
      if (review) {
        review.replied = true;
        review.reply = this.currentReviewReply;
      }
    }
    
    console.log('Sending reply to review', reviewId, this.currentReviewReply);
    this.cancelReply();
  }

  exportReport(): void {
    console.log('Exporting full report');
    alert('Report exported successfully!');
  }

  scheduleReport(): void {
    console.log('Scheduling report');
    alert('Report scheduling feature coming soon!');
  }

  deleteEvent(eventId: number): void {
    const event = this.events.find(e => e.id === eventId);
    if (event) {
      this.deletingEvent = event;
      this.showDeleteModal = true;
    }
  }

  closeDeleteModal(): void {
    this.showDeleteModal = false;
    this.deletingEvent = null;
  }

  confirmDeleteEvent(): void {
    if (this.deletingEvent) {
      console.log('Delete event:', this.deletingEvent.id);
      this.events = this.events.filter(e => e.id !== this.deletingEvent!.id);
      this.filterEvents();
      this.closeDeleteModal();
    }
  }

  viewLiveEvents(): void {
    this.router.navigate(['/events'], { queryParams: { status: 'active' } });
  }

  viewPendingApproval(): void {
    this.router.navigate(['/events'], { queryParams: { status: 'pending' } });
  }

  viewSponsoredEvents(): void {
    this.router.navigate(['/events'], { queryParams: { status: 'sponsored' } });
  }

  viewDraftEvents(): void {
    this.router.navigate(['/events'], { queryParams: { status: 'draft' } });
  }

  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'active':
        return 'status-active';
      case 'pending':
        return 'status-pending';
      case 'sponsored':
        return 'status-sponsored';
      case 'draft':
        return 'status-draft';
      case 'cancelled':
        return 'status-cancelled';
      default:
        return '';
    }
  }
}