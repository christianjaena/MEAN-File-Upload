import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Document } from '../interfaces/document.interface';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  private url = 'http://localhost:5000/document';

  constructor(private http: HttpClient) {}

  uploadDocument(formData: FormData): Observable<Document> {
    return this.http.post<Document>(this.url, formData);
  }

  getDocuments(): Observable<Document[]> {
    return this.http.get<Document[]>(this.url);
  }
}
