import { DocumentService } from '../../services/document.service';
import { Component } from '@angular/core';
import { Location } from '@angular/common';
import Colleges from './Colleges';

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
}
