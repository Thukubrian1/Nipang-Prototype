import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-date-time',  // FIXED: Changed from 'app-date-time-component' to 'app-date-time'
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './date-time-component.html',
  styleUrls: ['./date-time-component.css']
})
export class DateTimeComponent implements OnInit {
  @Input() formData: any = {};
  @Output() dataChange = new EventEmitter<any>();

  localData = {
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    isRecurring: false,
    recurrencePattern: 'daily',
    recurrenceDays: [] as string[],
    recurrenceDescription: '',
    recurrenceEndDate: ''
  };

  daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  ngOnInit() {
    this.localData = { ...this.localData, ...this.formData };
  }

  toggleRecurring() {
    this.localData.isRecurring = !this.localData.isRecurring;
    if (!this.localData.isRecurring) {
      this.localData.recurrencePattern = 'daily';
      this.localData.recurrenceDays = [];
      this.localData.recurrenceDescription = '';
      this.localData.recurrenceEndDate = '';
    }
    this.emitChange();
  }

  toggleDay(day: string) {
    const index = this.localData.recurrenceDays.indexOf(day);
    if (index > -1) {
      this.localData.recurrenceDays.splice(index, 1);
    } else {
      this.localData.recurrenceDays.push(day);
    }
    this.emitChange();
  }

  isDaySelected(day: string): boolean {
    return this.localData.recurrenceDays.includes(day);
  }

  emitChange() {
    this.dataChange.emit(this.localData);
  }
}