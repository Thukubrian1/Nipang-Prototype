import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Sidebar } from '../sidebar/sidebar';
import { Topbar } from '../topbar/topbar';
import { FormsModule } from '@angular/forms';


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


@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule, FormsModule, Sidebar, Topbar],
  templateUrl: './events.html',
  styleUrls: ['./events.css']
})




export class Events implements OnInit {
  // User Information
  organizerName: string = 'BNET ORGANIZERS';
  location: string = 'Nairobi, Kenya';
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
    }
  ];
  
  filteredEvents: Event[] = [];

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
    this.router.navigate(['/home/events/add']);
  }

  sponsorEvent(): void {
    this.router.navigate(['/home/events/sponsor']);
  }

  editEvent(eventId: number): void {
    console.log('Edit event:', eventId);
    this.router.navigate(['/home/events/edit', eventId]);
  }

  viewAnalytics(eventId: number): void {
    console.log('View analytics for event:', eventId);
    this.router.navigate(['/home/events', eventId, 'analytics']);
  }

  deleteEvent(eventId: number): void {
    if (confirm('Are you sure you want to delete this event?')) {
      console.log('Delete event:', eventId);
      this.events = this.events.filter(e => e.id !== eventId);
      this.filterEvents();
    }
  }

  viewLiveEvents(): void {
    this.router.navigate(['/home/events'], { queryParams: { status: 'active' } });
  }

  viewPendingApproval(): void {
    this.router.navigate(['/home/events'], { queryParams: { status: 'pending' } });
  }

  viewSponsoredEvents(): void {
    this.router.navigate(['/home/events'], { queryParams: { status: 'sponsored' } });
  }

  viewDraftEvents(): void {
    this.router.navigate(['/home/events'], { queryParams: { status: 'draft' } });
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