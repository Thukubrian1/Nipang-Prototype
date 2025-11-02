import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-additional-info',  // ✅ FIXED: Removed -component
  standalone: true,                 // ✅ ADDED: standalone flag
  imports: [CommonModule, FormsModule],
  templateUrl: './additional-info-component.html',
  styleUrls: ['./additional-info-component.css']
})
export class AdditionalInfoComponent implements OnInit {
  @Input() formData: any = {};
  @Output() dataChange = new EventEmitter<any>();

  localData = {
    additionalDescription: ''
  };

  ngOnInit() {
    this.localData = { ...this.localData, ...this.formData };
  }

  emitChange() {
    this.dataChange.emit(this.localData);
  }
}