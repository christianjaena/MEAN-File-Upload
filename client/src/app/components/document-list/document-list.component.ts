import { DocumentService } from './../../services/document.service';
import { Component, OnInit } from '@angular/core';
import { Document } from '../../interfaces/document.interface';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css'],
})
export class DocumentListComponent implements OnInit {
  documents: Document[] = [];

  constructor(private documentService: DocumentService) {}

  ngOnInit() {
    this.getDocuments();
  }

  getDocuments() {
    this.documentService
      .getDocuments()
      .subscribe((result) => (this.documents = result));
  }

  goTo(url: string) {
    window.open(url, '_blank');
  }
}
