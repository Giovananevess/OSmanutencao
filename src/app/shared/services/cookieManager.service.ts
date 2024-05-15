import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CookieManagerService {

  constructor(private cookieService: CookieService) { }

  setUserIdInCookie(userId: string) {
    this.cookieService.set('userId', userId);
  }

  getUserIdFromCookie(): string {
    return this.cookieService.get('userId');
  }
}
