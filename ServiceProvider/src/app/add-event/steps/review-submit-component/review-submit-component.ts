import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventFormData, EventSection } from '../../../models/eventmodel';

@Component({
  selector: 'app-review-submit',  // FIXED: Changed from 'app-review-submit-component' to 'app-review-submit'
  standalone: true,
  imports: [CommonModule],
  templateUrl: './review-submit-component.html',
  styleUrls: ['./review-submit-component.css']
})
export class ReviewSubmitComponent {
  @Input() formData: Partial<EventFormData> = {};
  @Input() selectedSections: EventSection = {
    basicInfo: true,
    dateTime: false,
    pricingTickets: false,
    mediaUpload: false,
    additionalInfo: false
  };

  get selectedSectionsList(): string[] {
    const sections = [];
    if (this.selectedSections.basicInfo) sections.push('Basic Information');
    if (this.selectedSections.dateTime) sections.push('Date & Time');
    if (this.selectedSections.pricingTickets) sections.push('Pricing & Tickets');
    if (this.selectedSections.mediaUpload) sections.push('Media Upload');
    if (this.selectedSections.additionalInfo) sections.push('Additional Information');
    return sections;
  }

  get mediaCount(): string {
    let count = 0;
    if (this.formData.coverImage) count++;
    if (this.formData.galleryMedia) count += this.formData.galleryMedia.length;
    return `${count} image(s), 0 video(s)`;
  }

  get priceDisplay(): string {
    if (this.formData.priceType === 'free') {
      return 'Free';
    } else if (this.formData.prices && this.formData.prices.length > 0) {
      const minPrice = Math.min(...this.formData.prices.map(p => p.price));
      const maxPrice = Math.max(...this.formData.prices.map(p => p.price));
      if (minPrice === maxPrice) {
        return `KSh ${minPrice}`;
      }
      return `KSh ${minPrice} - KSh ${maxPrice}`;
    }
    return 'Not specified';
  }
}