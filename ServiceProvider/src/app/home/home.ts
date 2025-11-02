import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Sidebar } from '../sidebar/sidebar';
import { Topbar } from '../topbar/topbar';
import { AddEvent } from '../add-event/add-event';  // FIXED: Import AddEvent component instead of DOM Event
import { EventFormData } from '../models/eventmodel';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, Sidebar, Topbar, AddEvent],  // FIXED: Use AddEvent component
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

  sponsorEvent(): void {
    this.router.navigate(['/home/events/sponsor']);
  }

  createSupportTicket(): void {
    this.router.navigate(['/home/support']);
  }

  viewAnalytics(): void {
    this.router.navigate(['/home/analytics']);
  }
}