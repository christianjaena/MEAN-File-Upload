import { DocumentService } from '../../services/document.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.css'],
})
export class InputFormComponent implements OnInit {
  selectedFile: File = {} as File;
  author: string = '';
  title: string = '';
  date: string = '';

  constructor(private documentService: DocumentService) {}

  ngOnInit() {}

  onFileSelected(event: any) {
    this.selectedFile = <File>event.target.files[0];
  }

  onUpload() {
    const formInput = new FormData();
    formInput.append('author', this.author);
    formInput.append('title', this.title);
    formInput.append('date', this.date);
    formInput.append('file', this.selectedFile, this.selectedFile.name);

    this.documentService.uploadDocument(formInput).subscribe();
  }
}
