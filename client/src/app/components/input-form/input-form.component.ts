import { DocumentService } from '../../services/document.service';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import Colleges from './Colleges';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.css'],
})
export class InputFormComponent implements OnInit {
  colleges: string[];
  departments: string[];
  documentForm!: FormGroup;

  constructor(
    private documentService: DocumentService,
    private location: Location
  ) {
    this.colleges = Object.keys(Colleges);
    this.departments = [];
  }

  ngOnInit() {
    this.documentForm = new FormGroup({
      author: new FormControl('', [Validators.required]),
      title: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
      file: new FormControl('', [Validators.required]),
      college: new FormControl('', [Validators.required]),
      department: new FormControl('', [Validators.required]),
    });
  }

  get author() {
    return this.documentForm.get('author')!;
  }

  get title() {
    return this.documentForm.get('title')!;
  }

  get date() {
    return this.documentForm.get('date')!;
  }

  get file() {
    return this.documentForm.get('file')!;
  }

  get college() {
    return this.documentForm.get('college')!;
  }

  get department() {
    return this.documentForm.get('department')!;
  }

  onCollegeSelected() {
    if (this.college.value !== '') {
      this.departments = Colleges[this.college.value];
    }
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.documentForm.patchValue({
        file,
      });
    }
  }

  onSubmit() {
    const formData = new FormData();
    const fileName = this.createFileName(this.date, this.author, this.file);
    formData.append('author', this.author?.value);
    formData.append('title', this.title?.value);
    formData.append('college', this.college?.value);
    formData.append('department', this.department?.value);
    formData.append('date', this.date?.value);
    formData.append('file', this.file?.value, fileName);

    this.documentService.uploadDocument(formData).subscribe(() => {
      this.clearInput();
      this.goBack();
    });
  }

  clearInput() {
    this.documentForm.reset();
  }

  createFileName(date: any, author: any, file: any) {
    return `${date?.value}${author?.value}${file?.value.name}`.trim();
  }

  goBack() {
    this.location.back();
  }
}
