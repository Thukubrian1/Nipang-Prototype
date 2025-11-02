import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectSectionsComponent } from './steps/select-sections-component/select-sections-component';
import { BasicInfoComponent } from './steps/basic-info-component/basic-info-component';
import { DateTimeComponent } from './steps/date-time-component/date-time-component';
import { AdditionalInfoComponent } from './steps/additional-info-component/additional-info-component';
import { MediaUploadComponent } from './steps/media-upload-component/media-upload-component';
import { PricingTicketsComponent } from './steps/pricing-tickets-component/pricing-tickets-component';
import { ReviewSubmitComponent } from './steps/review-submit-component/review-submit-component';
import { EventFormData, EventSection } from '../models/eventmodel';


@Component({
  selector: 'app-add-event',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SelectSectionsComponent,
    BasicInfoComponent,
    DateTimeComponent,
    PricingTicketsComponent,
    MediaUploadComponent,
    AdditionalInfoComponent,
    ReviewSubmitComponent
  ],
  templateUrl: './add-event.html',
  styleUrls: ['./add-event.css']
})
export class AddEvent {  // Changed from AddEventModalComponent to AddEvent
  @Input() isOpen: boolean = false;
  @Output() close = new EventEmitter<void>();
  @Output() submit = new EventEmitter<EventFormData>();

  currentStep: number = 0;
  
  selectedSections: EventSection = {
    basicInfo: true,
    dateTime: false,
    pricingTickets: false,
    mediaUpload: false,
    additionalInfo: false
  };

  formData: Partial<EventFormData> = {
    type: 'event',
    priceType: 'free',
    isRecurring: false
  };

  steps = [
    { id: 'select', label: 'Select Sections', icon: 'check-circle' },
    { id: 'basic', label: 'Basic Info', icon: 'info' },
    { id: 'datetime', label: 'Date & Time', icon: 'calendar' },
    { id: 'pricing', label: 'Pricing & Tickets', icon: 'dollar' },
    { id: 'media', label: 'Media Upload', icon: 'image' },
    { id: 'additional', label: 'Additional Info', icon: 'info' }
  ];

  get activeSteps() {
    const active = [this.steps[0], this.steps[1]];
    if (this.selectedSections.dateTime) active.push(this.steps[2]);
    if (this.selectedSections.pricingTickets) active.push(this.steps[3]);
    if (this.selectedSections.mediaUpload) active.push(this.steps[4]);
    if (this.selectedSections.additionalInfo) active.push(this.steps[5]);
    return active;
  }

  get isLastStep(): boolean {
    return this.currentStep === this.activeSteps.length - 1;
  }

  get currentStepId(): string {
    return this.activeSteps[this.currentStep]?.id || 'select';
  }

  closeModal() {
    this.close.emit();
    this.resetForm();
  }

  resetForm() {
    this.currentStep = 0;
    this.selectedSections = {
      basicInfo: true,
      dateTime: false,
      pricingTickets: false,
      mediaUpload: false,
      additionalInfo: false
    };
    this.formData = {
      type: 'event',
      priceType: 'free',
      isRecurring: false
    };
  }

  handleSectionsSelected(sections: EventSection) {
    this.selectedSections = sections;
  }

  handleStepData(data: any) {
    this.formData = { ...this.formData, ...data };
  }

  nextStep() {
    if (this.currentStep < this.activeSteps.length - 1) {
      this.currentStep++;
    }
  }

  previousStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  handleSubmit() {
    this.submit.emit(this.formData as EventFormData);
    this.closeModal();
  }
}