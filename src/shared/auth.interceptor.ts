import {Injectable} from "@angular/core";
import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent} from '@angular/common/http';
import {AuthService} from '../providers/auth.service/AuthService';
import {Observable} from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private auth: AuthService) {}
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('Calling Interceptor');
        const authToken = this.auth.getToken();
        request = request.clone({
          setHeaders: {
            Authorization: "Bearer " + authToken
          }
        });
        return next.handle(request);
      }
}
