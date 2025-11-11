import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
  imports: [CommonModule, FormsModule, Sidebar, Topbar],
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
  
  // Modal States
  showAddFaqModal: boolean = false;
  showEditFaqModal: boolean = false;
  showRemoveFaqModal: boolean = false;
  showTicketModal: boolean = false;
  
  // Form Data
  newFaq: FAQ = {
    id: 0,
    question: '',
    answer: ''
  };
  
  editingFaq: FAQ = {
    id: 0,
    question: '',
    answer: ''
  };
  
  faqToRemove: FAQ | null = null;
  selectedTicket: SupportTicket | null = null;
  ticketResponse: string = '';
  
  // FAQs Data
  faqs: FAQ[] = [
    {
      id: 1,
      question: 'How do I create an event?',
      answer: 'Click on "Events" in the sidebar, then click add event above the table and fill out all required fields, upload images, and submit for approval.'
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
      title: 'Analytics page error',
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
    this.newFaq = {
      id: 0,
      question: '',
      answer: ''
    };
    this.showAddFaqModal = true;
  }

  closeAddFaqModal(): void {
    this.showAddFaqModal = false;
    this.newFaq = {
      id: 0,
      question: '',
      answer: ''
    };
  }

  saveFaq(): void {
    if (this.newFaq.question.trim() && this.newFaq.answer.trim()) {
      const newId = Math.max(...this.faqs.map(f => f.id), 0) + 1;
      this.faqs.push({
        id: newId,
        question: this.newFaq.question,
        answer: this.newFaq.answer
      });
      this.totalFaqs = this.faqs.length;
      this.closeAddFaqModal();
      alert('FAQ added successfully!');
      // TODO: Call API to save FAQ
    } else {
      alert('Please fill in both question and answer fields.');
    }
  }

  editFaq(faq: FAQ): void {
    this.editingFaq = { ...faq };
    this.showEditFaqModal = true;
  }

  closeEditFaqModal(): void {
    this.showEditFaqModal = false;
    this.editingFaq = {
      id: 0,
      question: '',
      answer: ''
    };
  }

  updateFaq(): void {
    if (this.editingFaq.question.trim() && this.editingFaq.answer.trim()) {
      const index = this.faqs.findIndex(f => f.id === this.editingFaq.id);
      if (index !== -1) {
        this.faqs[index] = { ...this.editingFaq };
        this.closeEditFaqModal();
        alert('FAQ updated successfully!');
        // TODO: Call API to update FAQ
      }
    } else {
      alert('Please fill in both question and answer fields.');
    }
  }

  removeFaq(faq: FAQ): void {
    this.faqToRemove = { ...faq };
    this.showRemoveFaqModal = true;
  }

  closeRemoveFaqModal(): void {
    this.showRemoveFaqModal = false;
    this.faqToRemove = null;
  }

  confirmRemoveFaq(): void {
    if (this.faqToRemove) {
      this.faqs = this.faqs.filter(f => f.id !== this.faqToRemove!.id);
      this.totalFaqs = this.faqs.length;
      this.closeRemoveFaqModal();
      alert('FAQ removed successfully!');
      // TODO: Call API to delete FAQ
    }
  }

  // Support Ticket Methods
  viewAndRespond(ticket: SupportTicket): void {
    this.selectedTicket = { ...ticket };
    this.ticketResponse = '';
    this.showTicketModal = true;
  }

  closeTicketModal(): void {
    this.showTicketModal = false;
    this.selectedTicket = null;
    this.ticketResponse = '';
  }

  sendResponse(): void {
    if (this.ticketResponse.trim()) {
      console.log('Sending response:', this.ticketResponse);
      console.log('To ticket:', this.selectedTicket);
      alert('Response sent successfully!');
      this.closeTicketModal();
      // TODO: Call API to send response
    } else {
      alert('Please enter a response before sending.');
    }
  }

  markResolved(ticket: SupportTicket): void {
    ticket.status = 'Resolved';
    this.updateTicketStats();
    alert('Ticket marked as resolved!');
    // TODO: Call API to update ticket status
  }

  markInProgress(ticket: SupportTicket): void {
    ticket.status = 'In Progress';
    this.updateTicketStats();
    alert('Ticket marked as in progress!');
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