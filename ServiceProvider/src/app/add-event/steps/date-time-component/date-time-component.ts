import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface DaySchedule {
  day: string;
  selected: boolean;
  openingTime: string;
  closingTime: string;
}

@Component({
  selector: 'app-date-time',
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
    recurrencePattern: 'weekly',
    recurrenceDays: [] as string[],
    recurrenceDescription: '',
    recurrenceEndDate: '',
    daySchedules: [] as DaySchedule[]
  };

  daysOfWeek: DaySchedule[] = [
    { day: 'Monday', selected: false, openingTime: '', closingTime: '' },
    { day: 'Tuesday', selected: false, openingTime: '', closingTime: '' },
    { day: 'Wednesday', selected: false, openingTime: '', closingTime: '' },
    { day: 'Thursday', selected: false, openingTime: '', closingTime: '' },
    { day: 'Friday', selected: false, openingTime: '', closingTime: '' },
    { day: 'Saturday', selected: false, openingTime: '', closingTime: '' },
    { day: 'Sunday', selected: false, openingTime: '', closingTime: '' }
  ];

  ngOnInit() {
    this.localData = { ...this.localData, ...this.formData };
    if (this.localData.daySchedules && this.localData.daySchedules.length > 0) {
      this.daysOfWeek = this.localData.daySchedules;
    }
  }

  toggleRecurring() {
    this.localData.isRecurring = !this.localData.isRecurring;
    if (!this.localData.isRecurring) {
      this.localData.recurrencePattern = 'weekly';
      this.localData.recurrenceDays = [];
      this.localData.recurrenceDescription = '';
      this.localData.recurrenceEndDate = '';
      this.daysOfWeek.forEach(day => {
        day.selected = false;
        day.openingTime = '';
        day.closingTime = '';
      });
    }
    this.emitChange();
  }

  toggleDay(daySchedule: DaySchedule) {
    daySchedule.selected = !daySchedule.selected;
    if (!daySchedule.selected) {
      daySchedule.openingTime = '';
      daySchedule.closingTime = '';
    }
    this.updateRecurrenceDays();
    this.emitChange();
  }

  updateRecurrenceDays() {
    this.localData.recurrenceDays = this.daysOfWeek
      .filter(day => day.selected)
      .map(day => day.day);
  }

  applySameTimeToAll() {
    const selectedDays = this.daysOfWeek.filter(day => day.selected);
    if (selectedDays.length === 0) return;

    const firstDay = selectedDays[0];
    selectedDays.forEach(day => {
      day.openingTime = firstDay.openingTime;
      day.closingTime = firstDay.closingTime;
    });
    this.emitChange();
  }

  onDayTimeChange() {
    this.emitChange();
  }

  emitChange() {
    this.localData.daySchedules = this.daysOfWeek;
    this.dataChange.emit(this.localData);
  }
}