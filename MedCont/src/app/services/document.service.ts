import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { Document } from '../models/document';
@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  constructor(private http: HttpClient) { }

  apiURL: string = 'http://localhost:8080/user';


  uploadFiles(doc: Document, file1: File, file2: File) {
    const formData = new FormData();
    formData.append('file1', file1);
    formData.append('file2', file2);

    // Append other properties of the Document object
    formData.append('agentId', doc.agentId.toString());
    formData.append('medecinId', doc.medecinId.toString());
    // Append more properties if necessary

    return this.http.post<any>(`${this.apiURL}/upload`, formData, { responseType: 'text' as 'json' })
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error);
    return throwError('Error uploading files');
  }

  }




