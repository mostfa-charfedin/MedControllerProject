import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { Doc} from '../models/doc';
@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  constructor(private http: HttpClient) { }

  apiURL: string = 'http://localhost:8080/user';

  getAllDocuments(): Observable<any> {
    return this.http.get<any>(`${this.apiURL}/allDocs`);
  }
  getDocumentsByUSerId(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiURL}/findDocumentByUserId/${id}`);
  }
  getDocumentById(id: number): Observable<any> {
    return this.http.get<Doc>(`${this.apiURL}/doc/${id}`,);
  }

  uploadFiles(doc: Doc, file1: File, file2: File) {
    const formData = new FormData();
    formData.append('file1', file1);
    formData.append('file2', file2);

    // Append other properties of the Document object
    formData.append('agentId', doc.agentId.toString());
    formData.append('medecinId', doc.medecinId.toString());
    // Append more properties if necessary

    return this.http.post<any>(`${this.apiURL}/uploadDoc`, formData, { responseType: 'text' as 'json' })
      .pipe(
        catchError(this.handleError)
      );
  }

  updateFiles(doc:Doc, file1: File, file2: File, file3: File) {
    const formData = new FormData();
    formData.append('file1', file1);
    formData.append('file2', file2);
    formData.append('file3', file3);

    // Append other properties of the Document object
    formData.append('documentId', doc.id.toString());
 

    // Append more properties if necessary

    return this.http.post<any>(`${this.apiURL}/updateDoc`, formData, { responseType: 'text' as 'json' })
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error);
    return throwError('Error uploading files');
  }


}






