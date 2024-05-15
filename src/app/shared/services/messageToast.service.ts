import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageToastService {

  private messageSubject = new BehaviorSubject<string>('');

  constructor() { }

  getMessage() {
    return this.messageSubject.asObservable();
  }

  showMessage(message: string) {
    this.messageSubject.next(message);
  }
}
