import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-media-upload',  // FIXED: Changed from 'app-media-upload-component' to 'app-media-upload'
  standalone: true,
  imports: [CommonModule],
  templateUrl: './media-upload-component.html',
  styleUrls: ['./media-upload-component.css']
})
export class MediaUploadComponent implements OnInit {
  @Input() formData: any = {};
  @Output() dataChange = new EventEmitter<any>();

  coverImage: File | null = null;
  coverImagePreview: string | null = null;
  
  galleryMedia: File[] = [];
  galleryPreviews: string[] = [];

  ngOnInit() {
    // Initialize from formData if available
  }

  onCoverImageSelect(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }

      // Validate file size (10MB max)
      if (file.size > 10 * 1024 * 1024) {
        alert('Image size should be less than 10MB');
        return;
      }

      this.coverImage = file;
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        this.coverImagePreview = e.target?.result as string;
      };
      reader.readAsDataURL(file);

      this.emitChange();
    }
  }

  removeCoverImage() {
    this.coverImage = null;
    this.coverImagePreview = null;
    this.emitChange();
  }

  onGallerySelect(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const files = Array.from(input.files);
      
      // Validate total number (max 8)
      if (this.galleryMedia.length + files.length > 8) {
        alert('Maximum 8 items allowed in gallery');
        return;
      }

      files.forEach(file => {
        // Validate file type
        if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) {
          alert(`${file.name} is not a valid image or video file`);
          return;
        }

        // Validate file size
        const maxSize = file.type.startsWith('video/') ? 100 * 1024 * 1024 : 10 * 1024 * 1024;
        if (file.size > maxSize) {
          alert(`${file.name} is too large. Max size: ${file.type.startsWith('video/') ? '100MB' : '10MB'}`);
          return;
        }

        this.galleryMedia.push(file);

        // Create preview
        const reader = new FileReader();
        reader.onload = (e) => {
          this.galleryPreviews.push(e.target?.result as string);
        };
        reader.readAsDataURL(file);
      });

      this.emitChange();
    }
  }

  removeGalleryItem(index: number) {
    this.galleryMedia.splice(index, 1);
    this.galleryPreviews.splice(index, 1);
    this.emitChange();
  }

  isVideo(file: File): boolean {
    return file.type.startsWith('video/');
  }

  emitChange() {
    this.dataChange.emit({
      coverImage: this.coverImage,
      galleryMedia: this.galleryMedia
    });
  }
}