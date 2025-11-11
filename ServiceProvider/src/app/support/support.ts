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
  category?: string;
  messages?: TicketMessage[];
}

interface TicketMessage {
  id: number;
  sender: 'user' | 'support';
  senderName: string;
  message: string;
  timestamp: string;
  date: string;
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
  isCreateTicketModalOpen: boolean = false;
  isTicketDetailModalOpen: boolean = false;
  
  // Create Ticket Form
  ticketForm = {
    category: '',
    subject: '',
    message: ''
  };
  
  ticketCategories: string[] = [
    'Event approval',
    'Payment issues',
    'Technical support',
    'Account management',
    'General inquiry'
  ];
  
  // Ticket Detail View
  selectedTicket: Ticket | null = null;
  replyMessage: string = '';
  
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
      status: 'Open',
      category: 'Payment issues',
      messages: [
        {
          id: 1,
          sender: 'user',
          senderName: 'You',
          message: 'I organized the Summer Festival event which concluded on Oct 5, 2025. The payment was supposed to be processed within 3-5 business days, but I have not received it yet. Can you please check the status?',
          timestamp: '10:30 AM',
          date: 'Oct 10, 2025'
        },
        {
          id: 2,
          sender: 'support',
          senderName: 'Support Team',
          message: 'Thank you for reaching out. We are looking into your payment status and will get back to you shortly with an update.',
          timestamp: '11:45 AM',
          date: 'Oct 10, 2025'
        }
      ]
    },
    {
      id: '#T-2025-002',
      subject: 'Event approval taking too long',
      date: 'Oct 10, 2025',
      status: 'In progress',
      category: 'Event approval',
      messages: [
        {
          id: 1,
          sender: 'user',
          senderName: 'You',
          message: 'I submitted my event "Tech Conference 2025" for approval 5 days ago, but it is still pending. The event is scheduled for next month and I need to start promoting it.',
          timestamp: '9:00 AM',
          date: 'Oct 10, 2025'
        },
        {
          id: 2,
          sender: 'support',
          senderName: 'Support Team',
          message: 'We apologize for the delay. Your event is currently under review by our compliance team. We will expedite the process and update you within 24 hours.',
          timestamp: '10:15 AM',
          date: 'Oct 10, 2025'
        },
        {
          id: 3,
          sender: 'user',
          senderName: 'You',
          message: 'Thank you for the quick response. I will wait for the update.',
          timestamp: '10:30 AM',
          date: 'Oct 10, 2025'
        }
      ]
    },
    {
      id: '#T-2025-003',
      subject: 'Unable to upload event images',
      date: 'Oct 10, 2025',
      status: 'Resolved',
      category: 'Technical support',
      messages: [
        {
          id: 1,
          sender: 'user',
          senderName: 'You',
          message: 'I am getting an error when trying to upload images for my event. The error message says "File size too large" but my images are only 2MB each.',
          timestamp: '8:00 AM',
          date: 'Oct 10, 2025'
        },
        {
          id: 2,
          sender: 'support',
          senderName: 'Support Team',
          message: 'We have identified the issue. There was a temporary bug in our system that was incorrectly calculating file sizes. This has now been fixed. Please try uploading your images again.',
          timestamp: '9:30 AM',
          date: 'Oct 10, 2025'
        },
        {
          id: 3,
          sender: 'user',
          senderName: 'You',
          message: 'It works now! Thank you for the quick fix.',
          timestamp: '10:00 AM',
          date: 'Oct 10, 2025'
        }
      ]
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
    this.isCreateTicketModalOpen = true;
  }

  closeCreateTicketModal(): void {
    this.isCreateTicketModalOpen = false;
    this.resetTicketForm();
  }

  resetTicketForm(): void {
    this.ticketForm = {
      category: '',
      subject: '',
      message: ''
    };
  }

  submitTicket(): void {
    if (!this.ticketForm.category || !this.ticketForm.subject || !this.ticketForm.message) {
      alert('Please fill in all fields');
      return;
    }

    console.log('Submitting ticket:', this.ticketForm);
    
    // Create new ticket
    const newTicket: Ticket = {
      id: `#T-2025-${String(this.tickets.length + 1).padStart(3, '0')}`,
      subject: this.ticketForm.subject,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: 'Open'
    };
    
    // Add to tickets list
    this.tickets.unshift(newTicket);
    
    // TODO: Send to API
    // this.supportService.createTicket(this.ticketForm).subscribe(
    //   response => {
    //     console.log('Ticket created successfully', response);
    //   },
    //   error => {
    //     console.error('Error creating ticket', error);
    //   }
    // );
    
    alert('Ticket created successfully!');
    this.closeCreateTicketModal();
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
    const ticket = this.tickets.find(t => t.id === ticketId);
    if (ticket) {
      this.selectedTicket = ticket;
      this.isTicketDetailModalOpen = true;
    }
  }

  closeTicketDetailModal(): void {
    this.isTicketDetailModalOpen = false;
    this.selectedTicket = null;
    this.replyMessage = '';
  }

  sendReply(): void {
    if (!this.replyMessage.trim()) {
      alert('Please enter a message');
      return;
    }

    if (this.selectedTicket && this.selectedTicket.messages) {
      const newMessage: TicketMessage = {
        id: this.selectedTicket.messages.length + 1,
        sender: 'user',
        senderName: 'You',
        message: this.replyMessage,
        timestamp: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }),
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      };

      this.selectedTicket.messages.push(newMessage);
      
      // Update ticket status to In progress if it was Open
      if (this.selectedTicket.status === 'Open') {
        this.selectedTicket.status = 'In progress';
      }

      // TODO: Send to API
      // this.supportService.replyToTicket(this.selectedTicket.id, this.replyMessage).subscribe(
      //   response => {
      //     console.log('Reply sent successfully', response);
      //   },
      //   error => {
      //     console.error('Error sending reply', error);
      //   }
      // );

      this.replyMessage = '';
      
      // Scroll to bottom of messages
      setTimeout(() => {
        const messagesContainer = document.querySelector('.ticket-messages');
        if (messagesContainer) {
          messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
      }, 100);
    }
  }

  closeTicketAsResolved(): void {
    if (confirm('Are you sure you want to close this ticket? This will mark the issue as resolved.')) {
      if (this.selectedTicket) {
        this.selectedTicket.status = 'Closed';
        
        // TODO: Send to API
        // this.supportService.closeTicket(this.selectedTicket.id).subscribe(
        //   response => {
        //     console.log('Ticket closed successfully', response);
        //   },
        //   error => {
        //     console.error('Error closing ticket', error);
        //   }
        // );

        alert('Ticket has been closed successfully!');
        this.closeTicketDetailModal();
      }
    }
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