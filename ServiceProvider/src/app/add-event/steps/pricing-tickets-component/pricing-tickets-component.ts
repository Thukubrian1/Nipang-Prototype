import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PriceItem } from '../../../models/eventmodel';

@Component({
  selector: 'app-pricing-tickets',  // FIXED: Changed from 'app-pricing-tickets-component' to 'app-pricing-tickets'
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pricing-tickets-component.html',
  styleUrls: ['./pricing-tickets-component.css']
})
export class PricingTicketsComponent implements OnInit {
  @Input() formData: any = {};
  @Output() dataChange = new EventEmitter<any>();

  localData = {
    priceType: 'free',
    totalTickets: 0,
    ticketUrl: '',
    availableFrom: '',
    availableTo: '',
    prices: [] as PriceItem[]
  };

  ngOnInit() {
    this.localData = { ...this.localData, ...this.formData };
    if (!this.localData.prices) {
      this.localData.prices = [];
    }
  }

  onPriceTypeChange() {
    if (this.localData.priceType === 'free') {
      this.localData.prices = [];
    }
    this.emitChange();
  }

  addPrice() {
    const newPrice: PriceItem = {
      id: this.generateId(),
      name: '',
      price: 0,
      availableTickets: 0,
      ticketType: 'normal',
      ticketUrl: '',
      availableFrom: '',
      availableTo: ''
    };
    this.localData.prices.push(newPrice);
    this.emitChange();
  }

  removePrice(index: number) {
    this.localData.prices.splice(index, 1);
    this.emitChange();
  }

  generateId(): string {
    return 'price_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  emitChange() {
    this.dataChange.emit(this.localData);
  }
}