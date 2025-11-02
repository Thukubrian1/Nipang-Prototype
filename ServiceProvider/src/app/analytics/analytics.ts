import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Sidebar } from '../sidebar/sidebar';
import { Topbar } from '../topbar/topbar';

interface MetricCard {
  title: string;
  value: string | number;
  change: string;
  changeType: 'positive' | 'negative';
}

interface InsightCard {
  title: string;
  description: string;
  actionText: string;
}

interface EventCategory {
  name: string;
  percentage: number;
  color: string;
}

interface TopEvent {
  category: string;
  subcategory: string;
  rsvps: number;
}

interface Organizer {
  name: string;
  initials: string;
  events: number;
  performance: number;
  color: string;
}

interface GeographicData {
  location: string;
  percentage: number;
  color: string;
}

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [CommonModule, FormsModule, Sidebar, Topbar],
  templateUrl: './analytics.html',
  styleUrls: ['./analytics.css']
})
export class Analytics implements OnInit {
  // User Information
  organizerName: string = 'BNET ORGANIZERS';
  location: string = 'Nairobi, Kenya';
  userAvatar: string = '';
  
  // UI State
  isSidebarOpen: boolean = true;
  notificationCount: number = 3;
  
  // Time Period
  timePeriod: string = 'Last 30 Days';
  timePeriodOptions: string[] = [
    'Last 7 Days',
    'Last 30 Days',
    'Last 90 Days',
    'Last 6 Months',
    'Last Year',
    'All Time'
  ];
  
  // Metrics
  metrics: MetricCard[] = [
    {
      title: 'Daily Active Users',
      value: 100,
      change: '+8.5% vs yesterday',
      changeType: 'positive'
    },
    {
      title: 'Weekly Active Users',
      value: '1,500',
      change: '+12% vs last week',
      changeType: 'positive'
    },
    {
      title: 'Monthly Active Users',
      value: '18,456',
      change: '+15% vs last month',
      changeType: 'positive'
    },
    {
      title: 'Page Views',
      value: '45,678',
      change: '-3% vs last period',
      changeType: 'negative'
    }
  ];
  
  // AI-Powered Insights
  insights: InsightCard[] = [
    {
      title: 'High Demand Window',
      description: 'Fridays 7-9 PM have 3× higher engagement',
      actionText: 'View Recommendations →'
    },
    {
      title: 'Event Boost Suggestion',
      description: 'Sponsoring Summer Festival could increase bookings by 40%',
      actionText: 'Sponsor Event →'
    },
    {
      title: 'Emerging Demographics',
      description: '1,200 users aged 25-34 in Nairobi seeking live music this weekend',
      actionText: 'Target Audience →'
    },
    {
      title: 'Price Optimization',
      description: 'Your Tech event is priced 15% below market average',
      actionText: 'Adjust Pricing →'
    }
  ];
  
  // Event Categories Performance
  eventCategories: EventCategory[] = [
    { name: 'Corporate', percentage: 45, color: '#2196F3' },
    { name: 'Wedding', percentage: 25, color: '#4CAF50' },
    { name: 'Social', percentage: 15, color: '#FFC107' },
    { name: 'Entertainment', percentage: 10, color: '#F44336' },
    { name: 'Other', percentage: 5, color: '#9E9E9E' }
  ];
  
  // Budget Category Distribution
  budgetCategories = [
    { name: 'Low Budget', value: 45, color: '#FFC107' },
    { name: 'Mid Budget', value: 38, color: '#2196F3' },
    { name: 'Luxury', value: 17, color: '#F44336' }
  ];
  
  // Geographic Distribution
  geographicData: GeographicData[] = [
    { location: 'Nairobi', percentage: 55, color: '#2196F3' },
    { location: 'Mombasa', percentage: 20, color: '#4CAF50' },
    { location: 'Kisumu', percentage: 10, color: '#FFC107' },
    { location: 'Nakuru', percentage: 8, color: '#F44336' },
    { location: 'Other', percentage: 7, color: '#9E9E9E' }
  ];
  
  // Top Events by RSVPs
  topEvents: TopEvent[] = [
    { category: 'Romantic, Eats & Dates', subcategory: 'Romantic Dining', rsvps: 342 },
    { category: 'Outdoor Adventures', subcategory: 'Road Trips & Get aways', rsvps: 287 },
    { category: 'Family & Kids Outing', subcategory: 'Playgrounds & Indoor Play Centers', rsvps: 198 },
    { category: 'Wellness', subcategory: 'Wellness Cafes', rsvps: 156 },
    { category: 'Spiritual & Uplifting', subcategory: 'Faith Based Retreats', rsvps: 134 },
    { category: 'Clubbing & Concerts', subcategory: 'Nightclubs & Bars', rsvps: 100 }
  ];
  
  // Top Organizer Performance
  organizers: Organizer[] = [
    { name: 'Java House', initials: 'JH', events: 12, performance: 85, color: '#2196F3' },
    { name: 'Sports Factory', initials: 'SF', events: 8, performance: 78, color: '#2196F3' },
    { name: 'Art Gallery', initials: 'AG', events: 6, performance: 72, color: '#2196F3' },
    { name: 'Foodies Festival', initials: 'FF', events: 4, performance: 68, color: '#2196F3' }
  ];
  
  // Event Status Distribution
  eventStatus = [
    { status: 'Upcoming', count: 45, percentage: 38, color: '#2196F3' },
    { status: 'Ongoing', count: 28, percentage: 23, color: '#4CAF50' },
    { status: 'Completed', count: 35, percentage: 29, color: '#9E9E9E' },
    { status: 'Cancelled', count: 12, percentage: 10, color: '#F44336' }
  ];
  
  // Total Events
  totalEvents: number = 120;
  
  // Chart Data for Views & RSVPs
  chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    views: [1200, 1800, 2800, 2600, 3500, 4200, 5000],
    rsvps: [200, 250, 300, 280, 350, 420, 500]
  };

  constructor() { }

  ngOnInit(): void {
    // Initialize component
  }

  handleSidebarToggle(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  handleSearch(query: string): void {
    console.log('Searching for:', query);
  }

  exportAsPDF(): void {
    console.log('Exporting as PDF');
    // TODO: Implement PDF export
  }

  exportAsCSV(): void {
    console.log('Exporting as CSV');
    // TODO: Implement CSV export
  }

  handleInsightAction(actionText: string): void {
    console.log('Insight action:', actionText);
    // TODO: Implement insight actions
  }

  getPerformanceColor(percentage: number): string {
    if (percentage >= 80) return '#4CAF50';
    if (percentage >= 60) return '#FFC107';
    return '#F44336';
  }
}