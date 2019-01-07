import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpRequest, HttpHeaders } from '@angular/common/http';

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

    uploadfileAWSS3(fileuploadurl, contenttype, data: any): Observable<any>{ 
        const headers = new HttpHeaders({
            'Content-Type': 'multipart/form-data',
        });
        const req = new HttpRequest(
            'PUT',
            fileuploadurl,
            data,
            {
                headers: headers,
                reportProgress: true,
            }
        );
        return this.http.request(req);
    }

    test(): Observable<any> {
        let header = new HttpHeaders();
        header = header.set('Content-Type', 'application/json; charset=utf-8').set('Accept', 'application/json').set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFybm9sZHlvb0BpdGFtLmdhbWVzIiwiaWF0IjoxNTQ2NDcxMzM2fQ.cLanAcAc7dPS9_9NTg0Bx2emrvv5nfqEKW_jyh_qW40');
        
        const params = {
            "id": "airnold@naver.com",
            "password": "1111",
            "firstName": "Arnold",
            "lastName": "Yoo"
        }
        // return this.http.post('https://gd7uqabuzd.execute-api.ap-northeast-2.amazonaws.com/dev/v1/get-application', { headers: header});
        return this.http.post('https://gd7uqabuzd.execute-api.ap-northeast-2.amazonaws.com/dev/v1/sign-up', params, { headers: header});   
    }
}