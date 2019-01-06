import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient, HttpRequest } from '@angular/common/http';

export interface PreSignedURL {
    success: boolean;
    message: string;
    urls: string
}

@Injectable()
export class FileService {

    constructor(
        private http: HttpClient
    ) { }

    getpresignedurls(): Observable<PreSignedURL>{
        let getheaders = new HttpHeaders().set('Accept', 'application/json');
        return this.http.get<PreSignedURL>('http://localhost:3000/get-presigned-url', { headers: getheaders});
    }

    uploadfileAWSS3(fileuploadurl, contenttype, file): Observable<any>{ 
        const headers = new HttpHeaders({
            'Content-Type': contenttype,
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Methods': 'PUT'
        });
        const req = new HttpRequest(
        'PUT',
        fileuploadurl,
        file,
        {
        headers: headers,
        reportProgress: true,
        });
        return this.http.request(req);
    }
}