import { Injectable } from '@angular/core';
import { Agent } from '../shared/agency';
import { Router } from '@angular/router'
import { Http, Response, RequestOptions, Headers, Request, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class Services {
  private AgentUrl = 'http://localhost:8080/printdata';

  constructor(
    private http: Http
  ) { }


  getAgent(): Observable<Agent[]> {
    return this.http.get(this.AgentUrl)
      .map((response: Response) => <Agent[]>response.json())
      .catch(this.handleError);
  }

  private handleError(error: Response | any) {
    console.log('handle error');
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}