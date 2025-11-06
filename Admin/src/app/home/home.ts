import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Sidebar } from '../sidebar/sidebar';
import { Topbar } from '../topbar/topbar';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, Sidebar, Topbar],  
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home implements OnInit {
  // User Information
  adminName: string = 'Super Admin';
  role: string = 'Administrator';
  userAvatar: string = '';
  
  // Stats Data
  totalUsers: number = 1500;
  usersGrowthPercentage: number = 12.5;
  activeEvents: number = 24;
  eventsGrowthPercentage: number = 10;
  avgSessionTime: string = '10m';
  sessionGrowthPercentage: number = 23.1;
  
  // Financial Data
  availableBalance: string = 'KSh 8,452,500';
  heldInWallet: string = 'KSh 4,250,000';
  commissionEarned: string = 'KSh 682,500';
  lifetimeRevenue: string = 'KSh 15,630,000';
  totalTransactions: number = 147;
  
  // Chart Data for Line Chart
  revenueLinePoints: string = '';
  bookingsLinePoints: string = '';
  chartLabels: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'];
  
  revenueData: number[] = [200000, 210000, 220000, 205000, 230000, 250000, 240000, 260000, 270000, 280000, 295000];
  bookingsData: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  
  // AI-Powered Insights
  aiInsights = [
    {
      title: 'High Demand Period Detected',
      description: 'Weekends show 3x higher booking rates. Consider promoting Friday - Sunday events',
      linkText: 'View Recommendations'
    },
    {
      title: 'Revenue Optimization Opportunity',
      description: 'Music category events 45% higher conversion rates. Increase allocation',
      linkText: 'Optimize Now'
    },
    {
      title: 'User Retention Alert',
      description: '500 users at risk of churning. Launch targeted re-engagement campaign',
      linkText: 'Create Campaign'
    }
  ];
  
  // Upcoming Events
  upcomingEvents = [
    { 
      id: 1, 
      name: 'Album Launch', 
      date: '20/10/2025', 
      time: '19:00', 
      booked: '45/100 booked',
      price: 'KSH 15,000',
      category: 'Music'
    },
    { 
      id: 2, 
      name: 'Album Launch', 
      date: '20/10/2025', 
      time: '19:00', 
      booked: '45/100 booked',
      price: 'KSH 15,000',
      category: 'Music'
    },
    { 
      id: 3, 
      name: 'Album Launch', 
      date: '20/10/2025', 
      time: '19:00', 
      booked: '45/100 booked',
      price: 'KSH 15,000',
      category: 'Music'
    },
    { 
      id: 4, 
      name: 'Album Launch', 
      date: '20/10/2025', 
      time: '19:00', 
      booked: '45/100 booked',
      price: 'KSH 15,000',
      category: 'Music'
    }
  ];
  
  // Popular Categories
  popularCategories = [
    { name: 'Romantic Eats & Dates', count: 342 },
    { name: 'Outdoor Adventures', count: 287 },
    { name: 'Family & Kids Outing', count: 198 },
    { name: 'Wellness', count: 156 },
    { name: 'Spiritual & Uplifting', count: 134 },
    { name: 'Clubbing & Concerts', count: 100 }
  ];
  
  // Recent Platform Activity
  recentActivities = [
    {
      title: 'New Service Provider Registration',
      description: 'Elite Events Ltd registered and submitted 2 events for approval',
      time: '5 minutes ago'
    },
    {
      title: 'Event Fully Booked',
      description: 'Summer Music Festival reached maximum capacity (500 bookings)',
      time: '18 minutes ago'
    },
    {
      title: 'Payment Processed',
      description: 'Withdrawal request of KSh 85,000 approved for Urban Venues Co.',
      time: '1 hour ago'
    },
    {
      title: 'Event Pending Review',
      description: 'Tech Conference 2025 awaiting admin approval',
      time: '2 hours ago'
    }
  ];
  
  // UI State
  isSidebarOpen: boolean = true;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.loadDashboardData();
    this.generateChartPoints();
  }

  loadDashboardData(): void {
    // TODO: Replace with actual API calls
  }

  generateChartPoints(): void {
    // Generate points for revenue line
    const revenuePoints: string[] = [];
    const maxRevenue = Math.max(...this.revenueData);
    const revenueScale = 250 / maxRevenue;
    
    this.revenueData.forEach((value, index) => {
      const x = 50 + index * 70;
      const y = 250 - (value * revenueScale);
      revenuePoints.push(`${x},${y}`);
    });
    this.revenueLinePoints = revenuePoints.join(' ');
    
    // Generate points for bookings line (mostly flat at bottom)
    const bookingsPoints: string[] = [];
    this.bookingsData.forEach((value, index) => {
      const x = 50 + index * 70;
      const y = 250;
      bookingsPoints.push(`${x},${y}`);
    });
    this.bookingsLinePoints = bookingsPoints.join(' ');
  }

  handleSidebarToggle(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  handleSearch(query: string): void {
    console.log('Searching for:', query);
    // Implement search functionality
  }

  // Financial Actions
  requestWithdrawal(): void {
    console.log('Request withdrawal');
    this.router.navigate(['/home/wallet/withdrawal']);
  }

  viewFullWallet(): void {
    console.log('View full wallet');
    this.router.navigate(['/home/wallet']);
  }

  // Chart Actions
  viewChartDetails(event: Event): void {
    event.preventDefault();
    console.log('View chart details');
    this.router.navigate(['/home/analytics/revenue-trend']);
  }

  // Insights Actions
  viewAllInsights(event: Event): void {
    event.preventDefault();
    console.log('View all insights');
    this.router.navigate(['/home/insights']);
  }

  viewInsightDetails(insight: any, event: Event): void {
    event.preventDefault();
    console.log('View insight:', insight.title);
    this.router.navigate(['/home/insights', insight.title.toLowerCase().replace(/ /g, '-')]);
  }

  // Quick Actions
  addNewEvent(): void {
    this.router.navigate(['/home/events/new']);
  }

  manageUsers(): void {
    this.router.navigate(['/home/users']);
  }

  viewTickets(): void {
    this.router.navigate(['/home/tickets']);
  }

  processPayments(): void {
    this.router.navigate(['/home/payments']);
  }

  sendNotifications(): void {
    this.router.navigate(['/home/messaging/broadcast']);
  }

  viewAnalytics(): void {
    this.router.navigate(['/home/analytics']);
  }

  // Navigation
  viewCategory(categoryName: string): void {
    console.log('View category:', categoryName);
    this.router.navigate(['/home/categories', categoryName]);
  }

  viewEvent(eventId: number): void {
    console.log('View event:', eventId);
    this.router.navigate(['/home/events', eventId]);
  }
}