import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CATEGORIES, SUB_CATEGORIES } from '../../../models/eventmodel';


@Component({
  selector: 'app-basic-info',
  imports: [CommonModule, FormsModule],
  templateUrl: './basic-info-component.html',
  styleUrls: ['./basic-info-component.css']  // FIXED: Changed from 'basic-info-omponent.css'
})

export class BasicInfoComponent implements OnInit {
  @Input() formData: any = {};
  @Output() dataChange = new EventEmitter<any>();

  categories = CATEGORIES;
  subCategories: string[] = [];

  localData = {
    type: 'event',
    name: '',
    description: '',
    category: '',
    subCategory: '',
    location: '',
    locationUrl: ''
  };

  ngOnInit() {
    this.localData = { ...this.localData, ...this.formData };
    this.updateSubCategories();
  }

  onCategoryChange() {
    this.localData.subCategory = '';
    this.updateSubCategories();
    this.emitChange();
  }

  updateSubCategories() {
    if (this.localData.category) {
      this.subCategories = SUB_CATEGORIES[this.localData.category] || [];
    } else {
      this.subCategories = [];
    }
  }

  emitChange() {
    this.dataChange.emit(this.localData);
  }
}