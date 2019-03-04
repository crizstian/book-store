import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import 'rxjs/add/observable/throw';

@Injectable()
export class ApiService {
  headers: Headers = new Headers({
    "Content-Type": "application/json",
    Accept: "application/json"
  });

  api_url: string = "http://172.20.10.2:3000";
  // api_url: string = 'https://localhost:3000'

  constructor(private http: Http) {
    console.log(this.api_url);
  }

  private getJson(response: Response) {
    return response.json();
  }

  private checkForError(response: Response): Response | Observable<any> {
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      var error = new Error(response.statusText);
      error["response"] = response;
      console.error(error);
      throw error;
    }
  }

  get(path: string, body): Observable<any> {
    return this.http
      .post(`${this.api_url}${path}`, JSON.stringify(body), {
        headers: this.headers
      })
      .map(this.checkForError)
      .catch(err => Observable.throw(err))
      .map(this.getJson);
  }

  post(path: string, body): Observable<any> {
    return this.http
      .post(`${this.api_url}${path}`, JSON.stringify(body), {
        headers: this.headers
      })
      .map(this.checkForError)
      .catch(err => Observable.throw(err))
      .map(this.getJson);
  }

  put(path: string, body): Observable<any> {
    return this.http
      .put(`${this.api_url}${path}`, JSON.stringify(body), {
        headers: this.headers
      })
      .map(this.checkForError)
      .catch(err => Observable.throw(err))
      .map(this.getJson);
  }

  delete(path): Observable<any> {
    console.log(path);
    return this.http
      .delete(`${this.api_url}${path}`, { headers: this.headers })
      .map(this.checkForError)
      .catch(err => Observable.throw(err))
      .map(this.getJson);
  }

  setHeaders(headers) {
    Object.keys(headers).forEach(header =>
      this.headers.set(header, headers[header])
    );
  }
}
