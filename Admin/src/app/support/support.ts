import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Sidebar } from '../sidebar/sidebar';
import { Topbar } from '../topbar/topbar';

interface FAQ {
  id: number;
  question: string;
  answer: string;
}

interface SupportTicket {
  id: string;
  title: string;
  status: string;
  date: string;
  organization: string;
  email: string;
  description: string;
}

@Component({
  selector: 'app-support',
  standalone: true,
  imports: [CommonModule, Sidebar, Topbar],
  templateUrl: './support.html',
  styleUrl: './support.css',
})
export class Support implements OnInit {
  // User Information
  adminName: string = 'Super Admin';
  role: string = 'Administrator';
  userAvatar: string = '';
  
  // Stats
  totalTickets: number = 5;
  openTickets: number = 2;
  totalFaqs: number = 4;
  resolutionRate: number = 94;
  
  // Active Tab
  activeTab: string = 'faq';
  
  // FAQs Data
  faqs: FAQ[] = [
    {
      id: 1,
      question: 'How do I create an event?',
      answer: 'Click on "Events" in the sidebar, then click add event above the table and  fill out all required fields, upload images, and submit for approval.'
    },
    {
      id: 2,
      question: 'How long does event approval take?',
      answer: 'Events are typically reviewed and approved within 24-48 hours during business days.'
    },
    {
      id: 3,
      question: 'When do I receive payments?',
      answer: 'Payments are processed and transferred to your account 3-5 business days after the event concludes.'
    },
    {
      id: 4,
      question: 'Can I modify events after approval?',
      answer: 'Yes, but significant changes may require re-approval. Minor updates like descriptions can be made immediately.'
    }
  ];
  
  // Support Tickets Data
  tickets: SupportTicket[] = [
    {
      id: 'T-2025-001',
      title: 'Payment delay for color fest',
      status: 'Open',
      date: '20/10/2025',
      organization: 'BNET Organizers',
      email: 'bnetorg@gmail.com',
      description: 'I completed the event 5 days ago but haven\'t received payment yet. The event was successful with 387 attendees.'
    },
    {
      id: 'T-2025-002',
      title: 'Event approval taking too long',
      status: 'In Progress',
      date: '20/10/2025',
      organization: 'BNET Organizers',
      email: 'bnetorg@gmail.com',
      description: 'My Tech Conference has been pending approval for 3 days. The event is scheduled for next month and I need to start marketing.'
    },
    {
      id: 'T-2025-003',
      title: 'Unable to upload event images',
      status: 'Resolved',
      date: '20/10/2025',
      organization: 'BNET Organizers',
      email: 'bnetorg@gmail.com',
      description: 'Getting an error when trying to upload images for my comedy show event. Tried multiple formats including JPG and PNG.'
    },
    {
      id: 'T-2025-004',
      title: 'Payment delay for color fest',
      status: 'Open',
      date: '20/10/2025',
      organization: 'BNET Organizers',
      email: 'bnetorg@gmail.com',
      description: 'When I click on the analytics button for my event, I get a 404 error. Other events work fine.'
    }
  ];
  
  // UI State
  isSidebarOpen: boolean = true;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.loadSupportData();
  }

  loadSupportData(): void {
    // TODO: Replace with actual API calls
  }

  handleSidebarToggle(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  handleSearch(query: string): void {
    console.log('Searching for:', query);
    // Implement search functionality
  }

  // Tab Management
  switchTab(tab: string): void {
    this.activeTab = tab;
  }

  // FAQ Management Methods
  addNewFaq(): void {
    console.log('Add new FAQ');
    // Open modal or navigate to FAQ creation page
    this.router.navigate(['/support/faq/new']);
  }

  editFaq(faq: FAQ): void {
    console.log('Edit FAQ:', faq);
    // Open modal or navigate to FAQ edit page
    this.router.navigate(['/support/faq/edit', faq.id]);
  }

  removeFaq(faq: FAQ): void {
    console.log('Remove FAQ:', faq);
    // Show confirmation dialog
    const confirmed = confirm(`Are you sure you want to delete the FAQ: "${faq.question}"?`);
    if (confirmed) {
      this.faqs = this.faqs.filter(f => f.id !== faq.id);
      this.totalFaqs = this.faqs.length;
      // TODO: Call API to delete FAQ
    }
  }

  // Support Ticket Methods
  viewAndRespond(ticket: SupportTicket): void {
    console.log('View and respond to ticket:', ticket);
    // Navigate to ticket details page
    this.router.navigate(['/support/tickets', ticket.id]);
  }

  markResolved(ticket: SupportTicket): void {
    console.log('Mark ticket as resolved:', ticket);
    ticket.status = 'Resolved';
    this.updateTicketStats();
    // TODO: Call API to update ticket status
  }

  markInProgress(ticket: SupportTicket): void {
    console.log('Mark ticket as in progress:', ticket);
    ticket.status = 'In Progress';
    this.updateTicketStats();
    // TODO: Call API to update ticket status
  }

  updateTicketStats(): void {
    this.openTickets = this.tickets.filter(t => t.status === 'Open').length;
    const resolvedTickets = this.tickets.filter(t => t.status === 'Resolved').length;
    this.resolutionRate = this.totalTickets > 0 
      ? Math.round((resolvedTickets / this.totalTickets) * 100) 
      : 0;
  }

  getStatusClass(status: string): string {
    switch(status.toLowerCase()) {
      case 'open':
        return 'open';
      case 'in progress':
        return 'in-progress';
      case 'resolved':
        return 'resolved';
      default:
        return '';
    }
  }
}