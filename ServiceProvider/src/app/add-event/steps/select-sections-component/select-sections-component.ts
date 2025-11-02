import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventSection } from '../../../models/eventmodel';


@Component({
  selector: 'app-select-sections',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './select-sections-component.html',
  styleUrls: ['./select-sections-component.css']
})
export class SelectSectionsComponent {
  @Input() selectedSections: EventSection = {
    basicInfo: true,
    dateTime: false,
    pricingTickets: false,
    mediaUpload: false,
    additionalInfo: false
  };
  
  @Output() sectionsChange = new EventEmitter<EventSection>();

  sections = [
    { 
      key: 'basicInfo' as keyof EventSection, 
      title: 'Basic Information',  // FIXED: Changed from 'label' to 'title'
      description: 'Event name, description, category',
      icon: 'info',  // FIXED: Added icon property
      required: true 
    },
    { 
      key: 'dateTime' as keyof EventSection, 
      title: 'Date & Time',  // FIXED: Changed from 'label' to 'title'
      description: 'Schedule and recurrence',
      icon: 'calendar',  // FIXED: Added icon property
      required: false 
    },
    { 
      key: 'pricingTickets' as keyof EventSection, 
      title: 'Pricing & Tickets',  // FIXED: Changed from 'label' to 'title'
      description: 'Ticket types and pricing',
      icon: 'dollar',  // FIXED: Added icon property
      required: false 
    },
    { 
      key: 'mediaUpload' as keyof EventSection, 
      title: 'Media Upload',  // FIXED: Changed from 'label' to 'title'
      description: 'Images and videos',
      icon: 'image',  // FIXED: Added icon property
      required: false 
    },
    { 
      key: 'additionalInfo' as keyof EventSection, 
      title: 'Additional Information',  // FIXED: Changed from 'label' to 'title'
      description: 'Extra details and notes',
      icon: 'info-circle',  // FIXED: Added icon property
      required: false 
    }
  ];

  // FIXED: Added selectedSectionsList getter
  get selectedSectionsList(): string[] {
    const sections = [];
    if (this.selectedSections.basicInfo) sections.push('Basic Information');
    if (this.selectedSections.dateTime) sections.push('Date & Time');
    if (this.selectedSections.pricingTickets) sections.push('Pricing & Tickets');
    if (this.selectedSections.mediaUpload) sections.push('Media Upload');
    if (this.selectedSections.additionalInfo) sections.push('Additional Information');
    return sections;
  }

  toggleSection(key: keyof EventSection) {
    if (key === 'basicInfo') return; // Basic info is always required
    
    this.selectedSections = {
      ...this.selectedSections,
      [key]: !this.selectedSections[key]
    };
    
    this.sectionsChange.emit(this.selectedSections);
  }
}