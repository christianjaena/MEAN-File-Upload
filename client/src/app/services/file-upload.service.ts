import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Document } from './../interfaces/document';

@Injectable({
  providedIn: 'root',
})

export class FileUploadService {
  private url = 'http://localhost:5000/upload';

  constructor(private http: HttpClient) {}

  uploadFile(formData: FormData): Observable<Document> {
    return this.http.post<Document>(this.url, formData);
  }
}
