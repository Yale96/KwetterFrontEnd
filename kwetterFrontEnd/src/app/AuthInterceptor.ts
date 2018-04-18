import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>,
            next: HttpHandler): Observable<HttpEvent<any>> {

    const idToken = localStorage.getItem("id_token");
    const nameToken = localStorage.getItem("name_token");
    console.log(idToken);
    console.log(nameToken);

    if (idToken && nameToken) {
      const cloned = req.clone({
        headers: req.headers.set("Authorization",
          "Bearer " + idToken + nameToken)
      });

      return next.handle(cloned);
    }
    else {
      return next.handle(req);
    }
  }
}
