import { FileUploadService } from './../../services/file-upload.service';
import { DepFlags } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.css'],
})
export class InputFormComponent implements OnInit {
  selectedFile: File = {} as File;

  constructor(private fileUpload: FileUploadService) {}

  ngOnInit() {}

  onFileSelected(event: any) {
    this.selectedFile = <File>event.target.files[0];
  }

  onUpload() {
    const fd = new FormData();
    fd.append('file', this.selectedFile, this.selectedFile.name);

    this.fileUpload.uploadFile(fd).subscribe();
  }
}
