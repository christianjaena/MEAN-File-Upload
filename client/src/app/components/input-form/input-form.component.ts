import { DocumentService } from '../../services/document.service';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.css'],
})
export class InputFormComponent implements OnInit {
  author: string;
  title: string;
  date: string;
  selectedFile: File;

  constructor(
    private documentService: DocumentService,
    private location: Location
  ) {
    this.author = '';
    this.title = '';
    this.date = '';
    this.selectedFile = {} as File;
  }

  ngOnInit() {}

  onFileSelected(event: any) {
    this.selectedFile = <File>event.target.files[0];
  }

  onUpload() {
    const formInput = new FormData();
    formInput.append('author', this.author);
    formInput.append('title', this.title);
    formInput.append('date', this.date);
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
    this.selectedFile = {} as File;
    this.goBack();
  }

  goBack() {
    this.location.back();
  }
}
