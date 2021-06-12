import { DocumentService } from '../../services/document.service';
import { Component } from '@angular/core';
import { Location } from '@angular/common';
import Colleges from './Colleges';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.css'],
})
export class InputFormComponent {
  author: string;
  title: string;
  date: string;
  selectedFile: File;
  college: string;
  department: string;
  colleges: string[];
  departments: string[];
  isValid: boolean = false;

  documentForm = new FormGroup({
    author: new FormControl('', [Validators.required]),
    title: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required]),
    file: new FormControl('', [Validators.required]),
    college: new FormControl('', [Validators.required]),
    department: new FormControl('', [Validators.required]),
  });

  constructor(
    private documentService: DocumentService,
    private location: Location
  ) {
    this.author = '';
    this.title = '';
    this.date = '';
    this.selectedFile = {} as File;
    this.college = '';
    this.department = '';
    this.colleges = Object.keys(Colleges);
    this.departments = [];
  }

  onFileSelected(event: any) {
    this.selectedFile = <File>event.target.files[0];
  }

  onCollegeSelected() {
    if (this.college !== '') {
      this.departments = Colleges[this.college];
    }
  }

  onUpload() {
    const formInput = new FormData();
    formInput.append('author', this.author);
    formInput.append('title', this.title);
    formInput.append('date', this.date);
    formInput.append('college', this.college);
    formInput.append('department', this.department);
    formInput.append(
      'file',
      this.selectedFile,
      `${this.date}${this.author}${this.selectedFile.name}`.trim()
    );

    this.documentService.uploadDocument(formInput).subscribe();
    this.clearInput();
  }

  clearInput() {
    this.author = '';
    this.title = '';
    this.date = '';
    this.college = '';
    this.selectedFile = {} as File;
    this.goBack();
  }

  goBack() {
    this.location.back();
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
    formData.append('author', this.documentForm.get('author')?.value);
    formData.append('title', this.documentForm.get('title')?.value);
    formData.append('college', this.documentForm.get('college')?.value);
    formData.append('department', this.documentForm.get('department')?.value);
    formData.append('date', this.documentForm.get('date')?.value);
    formData.append(
      'file',
      this.documentForm.get('file')?.value,
      `${this.documentForm.get('date')?.value}${
        this.documentForm.get('author')?.value
      }${this.documentForm.get('file')?.value.name}`.trim()
    );

    this.documentService.uploadDocument(formData).subscribe();
    this.clearInput();
  }
}
