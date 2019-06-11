import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {


  url: string = 'http://200.10.147.68:3002/auth/restorePassword';

  constructor(private http: HttpClient) { }

  sendMessagePass(messageContent: any) {
    return this.http.post(this.url,
      JSON.stringify(messageContent),
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' }), responseType: 'text' });
  }

  
  
}
