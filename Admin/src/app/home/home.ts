import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Sidebar } from '../sidebar/sidebar';
import { Topbar } from '../topbar/topbar';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, Sidebar, Topbar], 
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home implements OnInit, AfterViewInit {
  // Stats Data
  totalUsers: number = 1500;
  usersGrowth: number = 12.5;
  activeEvents: number = 24;
  eventsGrowth: number = 10;
  avgSessionTime: string = '10m';
  sessionGrowth: number = 23.1;
  revenue: string = '500K';
  revenueGrowth: number = 15;
  
  // Popular Categories
  popularCategories = [
    { name: 'Romantic Eats & Dates', count: 342 },
    { name: 'Outdoor Adventures', count: 287 },
    { name: 'Family & Kids Outing', count: 198 },
    { name: 'Wellness', count: 156 },
    { name: 'Spiritual & Uplifting', count: 134 },
    { name: 'Clubbing & Concerts', count: 100 }
  ];
  
  // Upcoming Events
  upcomingEvents = [
    {
      name: 'Jazz Night at Java',
      date: 'July 5 2025',
      location: 'Westlands',
      status: 'Live'
    },
    {
      name: 'Hiking at Mt Kenya',
      date: 'July 5 2025',
      location: 'Nanyuki',
      status: 'Live'
    },
    {
      name: 'Food Festival',
      date: 'July 5 2025',
      location: 'Nairobi CBD',
      status: 'Pending'
    },
    {
      name: 'Yoga Session',
      date: 'July 5 2025',
      location: 'Kilimoni',
      status: 'Pending'
    },
    {
      name: 'Tech Meetup',
      date: 'July 5 2025',
      location: 'iHub',
      status: 'Live'
    }
  ];
  
  pendingEventsCount: number = 10;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.loadDashboardData();
  }

  ngAfterViewInit(): void {
    // Initialize charts after view is ready
    setTimeout(() => {
      this.initializeCharts();
    }, 100);
  }

  loadDashboardData(): void {
    // TODO: Replace with actual API calls
    console.log('Loading dashboard data...');
  }

  initializeCharts(): void {
    this.initializeGrowthChart();
    this.initializeCategoryChart();
  }

  initializeGrowthChart(): void {
    const canvas = document.getElementById('growthChart') as HTMLCanvasElement;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = 300;

    // Sample data
    const data = {
      labels: ['Aug 01', 'Aug 05', 'Aug 10', 'Aug 15', 'Aug 20', 'Aug 25'],
      users: [100, 200, 300, 500, 700, 850],
      bookings: [50, 120, 200, 320, 450, 600]
    };

    // Draw chart
    this.drawBarChart(ctx, canvas.width, canvas.height, data);
  }

  drawBarChart(ctx: CanvasRenderingContext2D, width: number, height: number, data: any): void {
    const padding = 50;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;
    const barWidth = chartWidth / (data.labels.length * 2.5);
    const maxValue = Math.max(...data.users, ...data.bookings);

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Draw grid lines
    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 5; i++) {
      const y = padding + (chartHeight / 5) * i;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();
    }

    // Draw bars
    data.labels.forEach((label: string, index: number) => {
      const x = padding + (index * chartWidth) / data.labels.length;
      
      // Users bar (blue)
      const usersHeight = (data.users[index] / maxValue) * chartHeight;
      ctx.fillStyle = '#6366f1';
      ctx.fillRect(x + 10, height - padding - usersHeight, barWidth, usersHeight);
      
      // Bookings bar (green)
      const bookingsHeight = (data.bookings[index] / maxValue) * chartHeight;
      ctx.fillStyle = '#10b981';
      ctx.fillRect(x + barWidth + 15, height - padding - bookingsHeight, barWidth, bookingsHeight);
      
      // Labels
      ctx.fillStyle = '#666';
      ctx.font = '12px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(label, x + barWidth + 15, height - padding + 20);
    });
  }

  initializeCategoryChart(): void {
    const canvas = document.getElementById('categoryChart') as HTMLCanvasElement;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = 300;

    // Sample data
    const data = {
      labels: ['Nightlife', 'Sports', 'Arts & Culture', 'Food & Dining', 'Business', 'Wellness'],
      rsvps: [400, 300, 250, 350, 150, 200],
      views: [2800, 2000, 1800, 2400, 1200, 1400]
    };

    // Draw chart
    this.drawCategoryBarChart(ctx, canvas.width, canvas.height, data);
  }

  drawCategoryBarChart(ctx: CanvasRenderingContext2D, width: number, height: number, data: any): void {
    const padding = 50;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;
    const barWidth = chartWidth / (data.labels.length * 2.5);
    const maxValue = Math.max(...data.views);

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Draw grid lines
    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 5; i++) {
      const y = padding + (chartHeight / 5) * i;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();
    }

    // Draw bars
    data.labels.forEach((label: string, index: number) => {
      const x = padding + (index * chartWidth) / data.labels.length;
      
      // RSVPs bar (blue)
      const rsvpsHeight = (data.rsvps[index] / maxValue) * chartHeight;
      ctx.fillStyle = '#6366f1';
      ctx.fillRect(x + 10, height - padding - rsvpsHeight, barWidth * 0.8, rsvpsHeight);
      
      // Views bar (green)
      const viewsHeight = (data.views[index] / maxValue) * chartHeight;
      ctx.fillStyle = '#10b981';
      ctx.fillRect(x + barWidth + 5, height - padding - viewsHeight, barWidth * 0.8, viewsHeight);
      
      // Labels
      ctx.fillStyle = '#666';
      ctx.font = '11px Arial';
      ctx.textAlign = 'center';
      ctx.save();
      ctx.translate(x + barWidth, height - padding + 15);
      ctx.rotate(-Math.PI / 6);
      ctx.fillText(label, 0, 0);
      ctx.restore();
    });
  }

  // Quick Actions
  addNewEvent(): void {
    console.log('Add new event');
    this.router.navigate(['/admin/events/new']);
  }

  approvePendingEvents(): void {
    console.log('Approve pending events');
    this.router.navigate(['/admin/events/pending']);
  }

  viewReports(): void {
    console.log('View reports');
    this.router.navigate(['/admin/reports']);
  }

  sendBroadcast(): void {
    console.log('Send broadcast');
    this.router.navigate(['/admin/messaging/broadcast']);
  }
}