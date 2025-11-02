import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Sidebar } from '../sidebar/sidebar';
import { Topbar } from '../topbar/topbar';

interface FAQ {
  id: number;
  question: string;
  answer: string;
  isExpanded: boolean;
}

interface Ticket {
  id: string;
  subject: string;
  date: string;
  status: 'Open' | 'In progress' | 'Resolved' | 'Closed';
}

@Component({
  selector: 'app-support',
  standalone: true,
  imports: [CommonModule, FormsModule, Sidebar, Topbar],
  templateUrl: './support.html',
  styleUrls: ['./support.css']
})
export class Support implements OnInit {
  // User Information
  organizerName: string = 'BNET ORGANIZERS';
  location: string = 'Nairobi, Kenya';
  userAvatar: string = '';
  
  // UI State
  isSidebarOpen: boolean = true;
  notificationCount: number = 3;
  isFAQExpanded: boolean = false;
  
  // FAQ Data
  faqs: FAQ[] = [
    {
      id: 1,
      question: 'How do I create an event?',
      answer: 'Click on "Events" in the sidebar, then click add event above the table and fill out all required fields, upload images, and submit for approval.',
      isExpanded: false
    },
    {
      id: 2,
      question: 'How long does event approval take?',
      answer: 'Events are typically reviewed and approved within 24-48 hours during business days.',
      isExpanded: false
    },
    {
      id: 3,
      question: 'When do I receive payments?',
      answer: 'Payments are processed and transferred to your account 3-5 business days after the event concludes.',
      isExpanded: false
    },
    {
      id: 4,
      question: 'Can I modify events after approval?',
      answer: 'Yes, but significant changes may require re-approval. Minor updates like descriptions can be made immediately.',
      isExpanded: false
    }
  ];
  
  // Recent Tickets
  tickets: Ticket[] = [
    {
      id: '#T-2025-001',
      subject: 'Payment delay for Summer Festival',
      date: 'Oct 10, 2025',
      status: 'Open'
    },
    {
      id: '#T-2025-002',
      subject: 'Event approval taking too long',
      date: 'Oct 10, 2025',
      status: 'In progress'
    },
    {
      id: '#T-2025-003',
      subject: 'Unable to upload event images',
      date: 'Oct 10, 2025',
      status: 'Resolved'
    }
  ];

  constructor(private router: Router) { }

  ngOnInit(): void {
    // Initialize component
  }

  handleSidebarToggle(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  handleSearch(query: string): void {
    console.log('Searching for:', query);
  }

  toggleFAQ(): void {
    this.isFAQExpanded = !this.isFAQExpanded;
    // Collapse all FAQs when closing
    if (!this.isFAQExpanded) {
      this.faqs.forEach(faq => faq.isExpanded = false);
    }
  }

  toggleFAQItem(faqId: number): void {
    const faq = this.faqs.find(f => f.id === faqId);
    if (faq) {
      faq.isExpanded = !faq.isExpanded;
    }
  }

  createTicket(): void {
    console.log('Create ticket clicked');
    // TODO: Open create ticket modal or navigate to create ticket page
    // this.router.navigate(['/home/support/create-ticket']);
  }

  startLiveChat(): void {
    console.log('Starting live chat...');
    // TODO: Open live chat widget or modal
  }

  callSupport(): void {
    console.log('Calling support...');
    // TODO: Initiate call or show support phone number
    window.location.href = 'tel:+1234567890';
  }

  viewTicket(ticketId: string): void {
    console.log('View ticket:', ticketId);
    // TODO: Navigate to ticket details page
    // this.router.navigate(['/home/support/ticket', ticketId]);
  }

  getTicketStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'open':
        return 'status-open';
      case 'in progress':
        return 'status-in-progress';
      case 'resolved':
        return 'status-resolved';
      case 'closed':
        return 'status-closed';
      default:
        return '';
    }
  }
}