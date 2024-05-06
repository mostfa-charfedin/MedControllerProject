import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { Doc} from '../models/doc';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  constructor(private http: HttpClient,    private authService : AuthService) { }

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

    formData.append('agentId', doc.agentId.toString());
    formData.append('medecinId', doc.medecinId.toString());
    formData.append('matriculeAssure', doc.matriculeAssure);
    formData.append('nomAssure', doc.nomAssure);
    formData.append('nomBenificiaire', doc.nomBenificiaire);
    formData.append('QualiteBinificiaire', doc.qualiteBinificiaire);
    // Append more properties if necessary
console.log(formData)
    return this.http.post<any>(`${this.apiURL}/uploadDoc`, formData, { responseType: 'text' as 'json' })
      .pipe(
        catchError(this.handleError)
      );
  }



  updateFile(idDoc:number, file1: File) {
    const formData = new FormData();
    formData.append('file1', file1);
    // Append other properties of the Document object
    formData.append('documentId', idDoc.toString());
    // Append more properties if necessary
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    const httpHeaders = new HttpHeaders({"Authorization": jwt});
    return this.http.post<any>(`${this.apiURL}/updateDoc`, formData, { headers: httpHeaders, responseType: 'text' as 'json'})
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error);
    return throwError('Error uploading files');
  }


}






