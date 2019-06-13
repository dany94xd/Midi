import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConexionService {

  url: string = 'http://200.10.147.68:3002/send';
  constructor(private http: HttpClient) { }

  sendMessage(messageContent: any) {
    return this.http.post(this.url,
      JSON.stringify(messageContent),
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' }), responseType: 'text' });
  }

}
