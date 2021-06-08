import { Component } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  files: string[] = [];
  selectedFile: File = {} as File;
  uploadProgress = 0;

  constructor(private http: HttpClient) {}

  onFileSelected(event: any) {
    this.selectedFile = <File>event.target.files[0];
  }

  goTo(url: string) {
    window.open(url, '_blank');
  }

  onUpload() {
    const fd = new FormData();
    fd.append('file', this.selectedFile, this.selectedFile.name);
    this.http
      .post<{ imagePath: string }>('http://localhost:5000/upload', fd, {
        reportProgress: true,
      })
      .subscribe((response) => {
        this.files.push(response.imagePath);
        // if (event.type === HttpEventType.UploadProgress) {
        //   if (event.total) {
        //     this.uploadProgress = Math.round(
        //       (event.loaded / event.total) * 100
        //     );
        //   }
        // } else if (event.type === HttpEventType.Response) {
        //   console.log(event);
        // }
      });
  }
}
