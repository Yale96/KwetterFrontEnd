import {Injectable} from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class SessionCheckService {

  content: boolean;
  constructor( private jwtHelper: JwtHelperService ) {
  }

  public validate( token: string ): Observable< any > {
    return Observable.interval(1000).map( (x) => this.jwtHelper.isTokenExpired( token ) );
  }
}
