import { Component, OnInit, AfterViewInit, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Sidebar } from '../sidebar/sidebar';
import { Topbar } from '../topbar/topbar';

interface ReportCategory {
  id: string;
  name: string;
  count: number;
}

interface DashboardReport {
  id: string;
  title: string;
  description: string;
  lastRun: string;
  category: string;
}

interface TopEvent {
  title: string;
  subtitle: string;
  count: number;
}

interface TopOrganizer {
  initials: string;
  name: string;
  eventsCount: number;
  score: number;
}

interface ReportFilter {
  field: string;
  operator: string;
  value: string;
}

interface CustomReport {
  dataSource: string;
  selectedFields: string[];
  filters: ReportFilter[];
  dateFrom: string;
  dateTo: string;
  groupBy: string;
  sortBy: string;
}

interface SavedTemplate {
  id: string;
  name: string;
  category: string;
  fieldsSelected: number;
}

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [CommonModule, FormsModule, Sidebar, Topbar],
  templateUrl: './analytics.html',
  styleUrls: ['./analytics.css']
})
export class Analytics implements OnInit, AfterViewInit {
  
  // User Information
  adminName: string = 'Super Admin';
  role: string = 'Administrator';
  userAvatar: string = '';
  
  // UI State
  isSidebarOpen: boolean = true;
  activeTab: string = 'analytics';
  activeReportTab: string = 'standard';
  activeMetric: string = 'dau';
  
  // Analytics Filters
  selectedPeriod: string = '30';
  selectedCategory: string = 'all';
  selectedCity: string = 'all';
  
  // Analytics Metrics
  dailyActiveUsers: number = 100;
  weeklyActiveUsers: number = 1200;
  monthlyActiveUsers: number = 9500;
  
  // Charts Storage
  private charts: any = {};
  
  // Top Events Data
  topEvents: TopEvent[] = [
    {
      title: 'Romantic, Eats & Dates',
      subtitle: 'Romantic Dining',
      count: 342
    },
    {
      title: 'Outdoor Adventures',
      subtitle: 'Road Trips & Get aways',
      count: 287
    },
    {
      title: 'Family & Kids Outing',
      subtitle: 'Playgrounds & Indoor Play Centers',
      count: 198
    },
    {
      title: 'Wellness',
      subtitle: 'Wellness Cafes',
      count: 156
    },
    {
      title: 'Spiritual & Uplifting',
      subtitle: 'Faith Based Retreats',
      count: 134
    },
    {
      title: 'Clubbing & Concerts',
      subtitle: 'Nightclubs & Bars',
      count: 100
    }
  ];
  
  // Top Organizers Data
  topOrganizers: TopOrganizer[] = [
    {
      initials: 'JH',
      name: 'Java House',
      eventsCount: 12,
      score: 85
    },
    {
      initials: 'SF',
      name: 'Sports Factory',
      eventsCount: 8,
      score: 78
    },
    {
      initials: 'AG',
      name: 'Art Gallery',
      eventsCount: 6,
      score: 72
    },
    {
      initials: 'FF',
      name: 'Foodies Festival',
      eventsCount: 4,
      score: 68
    }
  ];
  
  // Reporting State
  selectedReportCategory: string | null = null;
  scheduledReportsCount: number = 2;
  savedTemplatesCount: number = 4;
  activeExportDropdown: string | null = null;
  activeExportMenu: string | null = null;
  
  // Report Categories
  reportCategories: ReportCategory[] = [
    {
      id: 'user',
      name: 'User Reports',
      count: 4
    },
    {
      id: 'event',
      name: 'Event Reports',
      count: 4
    },
    {
      id: 'financial',
      name: 'Financial Reports',
      count: 4
    },
    {
      id: 'compliance',
      name: 'Compliance Reports',
      count: 4
    }
  ];
  
  // All Reports Data
  private allReports: Record<string, DashboardReport[]> = {
    user: [
      {
        id: 'user-1',
        title: 'User Acquisition by Source',
        description: 'Track where your users are coming from',
        lastRun: '2 hours ago',
        category: 'user'
      },
      {
        id: 'user-2',
        title: 'User Demographics Breakdown',
        description: 'Age, gender, and location analytics',
        lastRun: '1 day ago',
        category: 'user'
      },
      {
        id: 'user-3',
        title: 'Premium vs Normal User Comparison',
        description: 'Compare behavior and metrics',
        lastRun: '3 hours ago',
        category: 'user'
      },
      {
        id: 'user-4',
        title: 'User Lifetime Value (LTV) Analysis',
        description: 'Revenue per user over time',
        lastRun: '5 hours ago',
        category: 'user'
      }
    ],
    event: [
      {
        id: 'event-1',
        title: 'Event Performance by Category',
        description: 'Compare categories and trends',
        lastRun: '1 hour ago',
        category: 'event'
      },
      {
        id: 'event-2',
        title: 'Venue/Organizer Performance',
        description: 'Rankings and metrics',
        lastRun: '4 hours ago',
        category: 'event'
      },
      {
        id: 'event-3',
        title: 'Event Capacity Utilization',
        description: 'Booking rates and optimization',
        lastRun: '2 days ago',
        category: 'event'
      },
      {
        id: 'event-4',
        title: 'Seasonal Trends',
        description: 'Identify patterns throughout the year',
        lastRun: '5 hours ago',
        category: 'event'
      }
    ],
    financial: [
      {
        id: 'financial-1',
        title: 'Revenue by Country/Currency',
        description: 'Geographic revenue breakdown',
        lastRun: '30 mins ago',
        category: 'financial'
      },
      {
        id: 'financial-2',
        title: 'Payment Method Analysis',
        description: 'Transaction preferences',
        lastRun: '2 hours ago',
        category: 'financial'
      },
      {
        id: 'financial-3',
        title: 'Refund and Cancellation Trends',
        description: 'Financial impact analysis',
        lastRun: '1 day ago',
        category: 'financial'
      },
      {
        id: 'financial-4',
        title: 'Commission and Fee Breakdown',
        description: 'Platform earnings',
        lastRun: '3 hours ago',
        category: 'financial'
      }
    ],
    compliance: [
      {
        id: 'compliance-1',
        title: 'GDPR Data Requests Log',
        description: 'Track data access and deletion requests',
        lastRun: '1 hour ago',
        category: 'compliance'
      },
      {
        id: 'compliance-2',
        title: 'Failed Login Attempts',
        description: 'Security monitoring and threats',
        lastRun: '15 mins ago',
        category: 'compliance'
      },
      {
        id: 'compliance-3',
        title: 'Role and Permission Changes Audit',
        description: 'Access control change history',
        lastRun: '3 hours ago',
        category: 'compliance'
      },
      {
        id: 'compliance-4',
        title: 'Payment Dispute Cases',
        description: 'Chargebacks and dispute tracking',
        lastRun: '5 hours ago',
        category: 'compliance'
      }
    ]
  };
  
  // Custom Report Builder State
  customReport: CustomReport = {
    dataSource: '',
    selectedFields: [],
    filters: [{ field: '', operator: 'equals', value: '' }],
    dateFrom: '',
    dateTo: '',
    groupBy: 'none',
    sortBy: 'newest'
  };
  
  // Available Fields by Data Source
  private dataSourceFields: Record<string, string[]> = {
    user: ['User ID', 'Name', 'Email', 'Registration Date', 'Last Login', 'Account Type', 'Total Bookings', 'Total Spent'],
    event: ['Event ID', 'Event Name', 'Category', 'Date', 'Venue', 'Capacity', 'RSVPs', 'Attendance', 'Revenue'],
    financial: ['Transaction ID', 'Amount', 'Currency', 'Payment Method', 'Date', 'Status', 'User ID', 'Event ID'],
    compliance: ['Log ID', 'Type', 'Timestamp', 'User ID', 'Action', 'IP Address', 'Status', 'Details']
  };
  
  // Saved Templates Data
  savedTemplates: SavedTemplate[] = [
    {
      id: 'template-1',
      name: 'Monthly Revenue Summary',
      category: 'Financial report',
      fieldsSelected: 5
    },
    {
      id: 'template-2',
      name: 'User Growth Report',
      category: 'User report',
      fieldsSelected: 7
    },
    {
      id: 'template-3',
      name: 'Event Booking Analysis',
      category: 'Event report',
      fieldsSelected: 6
    },
    {
      id: 'template-4',
      name: 'Security Audit Report',
      category: 'Compliance report',
      fieldsSelected: 4
    }
  ];

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit(): void {
    // Initial setup if needed
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Load Chart.js dynamically
      this.loadChartJS().then(() => {
        this.initializeCharts();
      });
    }
  }

  private async loadChartJS(): Promise<void> {
    return new Promise((resolve) => {
      if (typeof (window as any).Chart !== 'undefined') {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.js';
      script.onload = () => resolve();
      document.head.appendChild(script);
    });
  }

  // Sidebar Toggle
  handleSidebarToggle(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  // Search Handler
  handleSearch(query: string): void {
    console.log('Searching for:', query);
  }

  // Tab Switching
  switchTab(tab: string): void {
    this.activeTab = tab;
  }

  switchReportTab(tab: string): void {
    this.activeReportTab = tab;
  }

  switchMetric(metric: string): void {
    this.activeMetric = metric;
  }

  // Analytics Actions
  exportPDF(): void {
    console.log('Exporting as PDF...');
  }

  exportCSV(): void {
    console.log('Exporting as CSV...');
  }

  // Reporting Actions
  viewScheduledReports(): void {
    console.log('View scheduled reports');
    this.router.navigate(['/analytics/scheduled-reports']);
  }

  createCustomReport(): void {
    console.log('Create custom report');
    this.switchReportTab('custom');
  }

  selectReportCategory(categoryId: string): void {
    this.selectedReportCategory = categoryId;
  }

  getSelectedCategoryName(): string {
    const category = this.reportCategories.find(c => c.id === this.selectedReportCategory);
    return category ? category.name : '';
  }

  getSelectedCategoryReports(): DashboardReport[] {
    return this.selectedReportCategory ? this.allReports[this.selectedReportCategory] || [] : [];
  }

  scheduleReport(reportId: string): void {
    console.log('Schedule report:', reportId);
  }

  exportReport(reportId: string): void {
    console.log('Export report:', reportId);
  }

  toggleExportDropdown(reportId: string): void {
    this.activeExportDropdown = this.activeExportDropdown === reportId ? null : reportId;
  }

  toggleExportMenu(reportId: string): void {
    this.activeExportMenu = this.activeExportMenu === reportId ? null : reportId;
  }

  exportReportAs(reportId: string, format: string): void {
    console.log(`Export report ${reportId} as ${format}`);
    this.activeExportDropdown = null;
    this.activeExportMenu = null;
    
    switch(format) {
      case 'csv':
        alert(`Exporting report as CSV...`);
        break;
      case 'pdf':
        alert(`Exporting report as PDF...`);
        break;
      case 'xlsx':
        alert(`Exporting report as Excel (.xlsx)...`);
        break;
      case 'json':
        alert(`Exporting report as JSON...`);
        break;
    }
  }

  // Custom Report Builder Actions
  onDataSourceChange(): void {
    this.customReport.selectedFields = [];
  }

  getAvailableFields(): string[] {
    return this.customReport.dataSource ? this.dataSourceFields[this.customReport.dataSource] || [] : [];
  }

  toggleField(field: string): void {
    const index = this.customReport.selectedFields.indexOf(field);
    if (index > -1) {
      this.customReport.selectedFields.splice(index, 1);
    } else {
      this.customReport.selectedFields.push(field);
    }
  }

  addFilter(): void {
    this.customReport.filters.push({ field: '', operator: 'equals', value: '' });
  }

  removeFilter(index: number): void {
    if (this.customReport.filters.length > 1) {
      this.customReport.filters.splice(index, 1);
    }
  }

  saveAsTemplate(): void {
    console.log('Save as template');
    if (this.customReport.dataSource && this.customReport.selectedFields.length > 0) {
      const templateName = prompt('Enter template name:');
      if (templateName) {
        const newTemplate: SavedTemplate = {
          id: `template-${this.savedTemplates.length + 1}`,
          name: templateName,
          category: this.getCategoryNameFromDataSource(this.customReport.dataSource),
          fieldsSelected: this.customReport.selectedFields.length
        };
        this.savedTemplates.push(newTemplate);
        this.savedTemplatesCount = this.savedTemplates.length;
        alert('Template saved successfully!');
      }
    } else {
      alert('Please select a data source and at least one field before saving.');
    }
  }

  scheduleCustomReport(): void {
    console.log('Schedule custom report');
  }

  previewReport(): void {
    console.log('Preview report');
    console.log('Custom Report:', this.customReport);
  }

  generateReport(): void {
    console.log('Generate report');
    console.log('Custom Report:', this.customReport);
    
    if (!this.customReport.dataSource) {
      alert('Please select a data source');
      return;
    }
    
    if (this.customReport.selectedFields.length === 0) {
      alert('Please select at least one field');
      return;
    }
    
    alert('Report generated successfully! (This would trigger actual report generation in production)');
  }

  // Template Actions
  shareTemplate(templateId: string): void {
    console.log('Share template:', templateId);
  }

  deleteTemplate(templateId: string): void {
    if (confirm('Are you sure you want to delete this template?')) {
      this.savedTemplates = this.savedTemplates.filter(t => t.id !== templateId);
      this.savedTemplatesCount = this.savedTemplates.length;
      console.log('Template deleted:', templateId);
    }
  }

  useTemplate(templateId: string): void {
    console.log('Use template:', templateId);
    const template = this.savedTemplates.find(t => t.id === templateId);
    if (template) {
      this.switchReportTab('custom');
      alert(`Loading template: ${template.name}`);
    }
  }

  // Helper Methods
  private getCategoryNameFromDataSource(dataSource: string): string {
    const categoryMap: Record<string, string> = {
      user: 'User report',
      event: 'Event report',
      financial: 'Financial report',
      compliance: 'Compliance report'
    };
    return categoryMap[dataSource] || 'Custom report';
  }

  private initializeCharts(): void {
    if (typeof (window as any).Chart === 'undefined') {
      console.error('Chart.js not loaded');
      return;
    }

    const Chart = (window as any).Chart;

    // Common chart options
    const commonOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'bottom' as const,
          labels: {
            padding: 15,
            font: {
              size: 12
            }
          }
        }
      }
    };

    // 1. Engagement by Category Chart (Doughnut)
    const engagementCtx = document.getElementById('engagementByCategoryChart') as HTMLCanvasElement;
    if (engagementCtx) {
      this.charts.engagement = new Chart(engagementCtx, {
        type: 'doughnut',
        data: {
          labels: ['Romantic Dining', 'Outdoor Adventures', 'Family Activities', 'Wellness', 'Spiritual', 'Nightlife'],
          datasets: [{
            data: [342, 287, 198, 156, 134, 100],
            backgroundColor: [
              '#5b7cff',
              '#28a745',
              '#ffc107',
              '#17a2b8',
              '#6f42c1',
              '#dc3545'
            ],
            borderWidth: 2,
            borderColor: '#fff'
          }]
        },
        options: {
          ...commonOptions,
          cutout: '60%'
        }
      });
    }

    // 2. User Demographics by Age Chart (Bar)
    const demographicsCtx = document.getElementById('userDemographicsChart') as HTMLCanvasElement;
    if (demographicsCtx) {
      this.charts.demographics = new Chart(demographicsCtx, {
        type: 'bar',
        data: {
          labels: ['18-24', '25-34', '35-44', '45-54', '55+'],
          datasets: [{
            label: 'Users',
            data: [2400, 3800, 2100, 1500, 700],
            backgroundColor: '#5b7cff',
            borderRadius: 6
          }]
        },
        options: {
          ...commonOptions,
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                callback: function(value: any) {
                  return value.toLocaleString();
                }
              }
            }
          }
        }
      });
    }

    // 3. Mood-based Event Participation Chart (Horizontal Bar)
    const moodCtx = document.getElementById('moodBasedChart') as HTMLCanvasElement;
    if (moodCtx) {
      this.charts.mood = new Chart(moodCtx, {
        type: 'bar',
        data: {
          labels: ['Energetic', 'Relaxed', 'Adventurous', 'Romantic', 'Social', 'Contemplative'],
          datasets: [{
            label: 'Participants',
            data: [450, 380, 320, 280, 240, 180],
            backgroundColor: [
              '#dc3545',
              '#28a745',
              '#ffc107',
              '#e83e8c',
              '#17a2b8',
              '#6f42c1'
            ],
            borderRadius: 6
          }]
        },
        options: {
          ...commonOptions,
          indexAxis: 'y' as const,
          scales: {
            x: {
              beginAtZero: true
            }
          }
        }
      });
    }

    // 4. User Conversion Funnel Chart (Bar)
    const funnelCtx = document.getElementById('conversionFunnelChart') as HTMLCanvasElement;
    if (funnelCtx) {
      this.charts.funnel = new Chart(funnelCtx, {
        type: 'bar',
        data: {
          labels: ['Page Visits', 'Sign Ups', 'Event Views', 'Add to Cart', 'Completed Booking'],
          datasets: [{
            label: 'Users',
            data: [10000, 4500, 3200, 1800, 1200],
            backgroundColor: [
              '#5b7cff',
              '#6c8cff',
              '#8b9cff',
              '#aabcff',
              '#c9d3ff'
            ],
            borderRadius: 6
          }]
        },
        options: {
          ...commonOptions,
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                callback: function(value: any) {
                  return value.toLocaleString();
                }
              }
            }
          }
        }
      });
    }

    // 5. Revenue Analytics Chart (Line)
    const revenueCtx = document.getElementById('revenueAnalyticsChart') as HTMLCanvasElement;
    if (revenueCtx) {
      this.charts.revenue = new Chart(revenueCtx, {
        type: 'line',
        data: {
          labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
          datasets: [
            {
              label: 'Revenue (KSH)',
              data: [125000, 180000, 165000, 220000],
              borderColor: '#28a745',
              backgroundColor: 'rgba(40, 167, 69, 0.1)',
              tension: 0.4,
              fill: true,
              borderWidth: 2
            },
            {
              label: 'Bookings',
              data: [50, 72, 66, 88],
              borderColor: '#5b7cff',
              backgroundColor: 'rgba(91, 124, 255, 0.1)',
              tension: 0.4,
              fill: true,
              borderWidth: 2,
              yAxisID: 'y1'
            }
          ]
        },
        options: {
          ...commonOptions,
          scales: {
            y: {
              type: 'linear',
              display: true,
              position: 'left',
              beginAtZero: true,
              ticks: {
                callback: function(value: any) {
                  return 'KSH ' + value.toLocaleString();
                }
              }
            },
            y1: {
              type: 'linear',
              display: true,
              position: 'right',
              beginAtZero: true,
              grid: {
                drawOnChartArea: false
              }
            }
          }
        }
      });
    }

    // 6. Hourly Engagement Patterns Chart (Line)
    const hourlyCtx = document.getElementById('hourlyEngagementChart') as HTMLCanvasElement;
    if (hourlyCtx) {
      this.charts.hourly = new Chart(hourlyCtx, {
        type: 'line',
        data: {
          labels: ['6AM', '9AM', '12PM', '3PM', '6PM', '9PM', '12AM'],
          datasets: [{
            label: 'Active Users',
            data: [50, 120, 250, 180, 450, 520, 280],
            borderColor: '#5b7cff',
            backgroundColor: 'rgba(91, 124, 255, 0.2)',
            tension: 0.4,
            fill: true,
            borderWidth: 3,
            pointRadius: 5,
            pointHoverRadius: 7,
            pointBackgroundColor: '#5b7cff'
          }]
        },
        options: {
          ...commonOptions,
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                callback: function(value: any) {
                  return value.toLocaleString();
                }
              }
            }
          }
        }
      });
    }
  }
}