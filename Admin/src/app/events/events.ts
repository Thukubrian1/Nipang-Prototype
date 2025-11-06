import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Sidebar } from '../sidebar/sidebar';
import { Topbar } from '../topbar/topbar';

interface Event {
  id: string;
  name: string;
  provider: string;
  category: string;
  dateFrom: string;
  dateTo: string;
  bookings?: string;
  revenue?: string;
  status: string;
}

interface Booking {
  id: string;
  event: string;
  provider: string;
  availableSlots: number;
  booked: number;
  remaining: number;
  confirmed: number;
  pending: number;
}

interface EventStats {
  live: number;
  pending: number;
  sponsored: number;
  newThisWeek: number;
  newSponsored: number;
}

interface BookingStats {
  total: number;
  confirmed: number;
  pending: number;
  newThisWeek: number;
  confirmedPercentage: number;
  pendingPercentage: number;
}

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule, FormsModule, Sidebar, Topbar],
  templateUrl: './events.html',
  styleUrl: './events.css',
})
export class Events implements OnInit {
  
  // User Information
  adminName: string = 'Super Admin';
  role: string = 'Administrator';
  userAvatar: string = '';
  
  // UI State
  isSidebarOpen: boolean = true;
  activeTab: string = 'events';
  
  // Filters
  eventFilter: string = '';
  bookingFilter: string = '';
  searchQuery: string = '';

  // Event Stats
  eventStats: EventStats = {
    live: 24,
    pending: 10,
    sponsored: 8,
    newThisWeek: 3,
    newSponsored: 5
  };

  // Booking Stats
  bookingStats: BookingStats = {
    total: 5000,
    confirmed: 3000,
    pending: 2000,
    newThisWeek: 1000,
    confirmedPercentage: 60,
    pendingPercentage: 40
  };

  // Events Data
  events: Event[] = [
    {
      id: '1',
      name: 'Color Fest',
      provider: 'BNET Organizers',
      category: 'Outdoor Adventures',
      dateFrom: '12/12/2025 at 9:00 AM',
      dateTo: '14/12/2025 at 6:00 PM',
      bookings: '45/100',
      revenue: 'Ksh 22,500',
      status: 'Sponsored'
    },
    {
      id: '2',
      name: 'Color Fest',
      provider: 'BNET Organizers',
      category: 'Outdoor Adventures',
      dateFrom: '12/12/2025 at 9:00 AM',
      dateTo: '14/12/2025 at 6:00 PM',
      bookings: '45/100',
      revenue: 'Ksh 22,500',
      status: 'Sponsored'
    },
    {
      id: '3',
      name: 'Color Fest',
      provider: 'BNET Organizers',
      category: 'Outdoor Adventures',
      dateFrom: '12/12/2025 at 9:00 AM',
      dateTo: '14/12/2025 at 6:00 PM',
      bookings: '45/100',
      revenue: 'Ksh 22,500',
      status: 'Active'
    },
    {
      id: '4',
      name: 'Color Fest',
      provider: 'BNET Organizers',
      category: 'Outdoor Adventures',
      dateFrom: '12/12/2025 at 9:00 AM',
      dateTo: '14/12/2025 at 6:00 PM',
      bookings: '45/100',
      revenue: 'Ksh 22,500',
      status: 'Active'
    },
    {
      id: '5',
      name: 'Kikuyu Gardens',
      provider: 'BNET Organizers',
      category: 'Outdoor Adventures',
      dateFrom: 'Open Daily',
      dateTo: 'Open Daily',
      status: 'Active'
    },
    {
      id: '6',
      name: 'Kikuyu Gardens',
      provider: 'BNET Organizers',
      category: 'Outdoor Adventures',
      dateFrom: 'Open 5 Days',
      dateTo: 'Open 5 Days',
      status: 'Active'
    },
    {
      id: '7',
      name: 'Kikuyu Gardens',
      provider: 'BNET Organizers',
      category: 'Outdoor Adventures',
      dateFrom: 'Open Daily',
      dateTo: 'Open Daily',
      status: 'Active'
    },
    {
      id: '8',
      name: 'Kikuyu Gardens',
      provider: 'BNET Organizers',
      category: 'Outdoor Adventures',
      dateFrom: 'Open Daily',
      dateTo: 'Open Daily',
      status: 'Pending'
    },
    {
      id: '9',
      name: 'Color Fest',
      provider: 'BNET Organizers',
      category: 'Outdoor Adventures',
      dateFrom: '12/12/2025 at 9:00 AM',
      dateTo: '14/12/2025 at 6:00 PM',
      status: 'Pending'
    }
  ];

  // Bookings Data
  bookings: Booking[] = [
    {
      id: '1',
      event: 'Color Fest',
      provider: 'BNET Organizers',
      availableSlots: 1100,
      booked: 500,
      remaining: 600,
      confirmed: 300,
      pending: 200
    },
    {
      id: '2',
      event: 'Color Fest',
      provider: 'BNET Organizers',
      availableSlots: 1100,
      booked: 500,
      remaining: 600,
      confirmed: 300,
      pending: 200
    },
    {
      id: '3',
      event: 'Color Fest',
      provider: 'BNET Organizers',
      availableSlots: 1100,
      booked: 500,
      remaining: 600,
      confirmed: 300,
      pending: 200
    },
    {
      id: '4',
      event: 'Color Fest',
      provider: 'BNET Organizers',
      availableSlots: 1100,
      booked: 500,
      remaining: 600,
      confirmed: 300,
      pending: 200
    },
    {
      id: '5',
      event: 'Color Fest',
      provider: 'BNET Organizers',
      availableSlots: 1100,
      booked: 500,
      remaining: 600,
      confirmed: 300,
      pending: 200
    },
    {
      id: '6',
      event: 'Color Fest',
      provider: 'BNET Organizers',
      availableSlots: 1100,
      booked: 500,
      remaining: 600,
      confirmed: 300,
      pending: 200
    },
    {
      id: '7',
      event: 'Color Fest',
      provider: 'BNET Organizers',
      availableSlots: 1100,
      booked: 500,
      remaining: 600,
      confirmed: 300,
      pending: 200
    },
    {
      id: '8',
      event: 'Color Fest',
      provider: 'BNET Organizers',
      availableSlots: 1100,
      booked: 500,
      remaining: 600,
      confirmed: 300,
      pending: 200
    },
    {
      id: '9',
      event: 'Color Fest',
      provider: 'BNET Organizers',
      availableSlots: 1100,
      booked: 500,
      remaining: 600,
      confirmed: 300,
      pending: 200
    }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    console.log('Events component initialized');
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

  // Event Actions
  addEvent(): void {
    console.log('Adding new event...');
    alert('Opening event creation form...');
  }

  editEvent(id: string): void {
    console.log('Editing event:', id);
    alert('Editing event: ' + id);
  }

  viewAnalytics(id: string): void {
    console.log('Viewing analytics for event:', id);
    alert('Opening analytics dashboard for event: ' + id);
  }

  approveEvent(id: string): void {
    if (confirm('Are you sure you want to approve this event?')) {
      console.log('Approving event:', id);
      const event = this.events.find(e => e.id === id);
      if (event) {
        event.status = 'Active';
      }
      alert('Event approved successfully');
    }
  }

  rejectEvent(id: string): void {
    if (confirm('Are you sure you want to reject this event?')) {
      const reason = prompt('Please provide a reason for rejection:');
      if (reason) {
        console.log('Rejecting event:', id, 'Reason:', reason);
        alert('Event rejected');
      }
    }
  }

  suspendEvent(id: string): void {
    if (confirm('Are you sure you want to suspend this event?')) {
      const reason = prompt('Please provide a reason for suspension:');
      if (reason) {
        console.log('Suspending event:', id, 'Reason:', reason);
        const event = this.events.find(e => e.id === id);
        if (event) {
          event.status = 'Suspended';
        }
        alert('Event suspended');
      }
    }
  }

  // Booking Actions
  viewBookingDetails(id: string): void {
    console.log('Viewing booking details:', id);
    alert('Viewing detailed booking information for: ' + id);
  }

  exportBookings(): void {
    console.log('Exporting bookings data...');
    alert('Exporting bookings to CSV...');
  }
}