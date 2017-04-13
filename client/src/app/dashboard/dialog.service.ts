import { Injectable } from '@angular/core';

@Injectable()
export class DialogService {

  confirm(message?: string) {
    return window.confirm(message || 'Is it OK?');
  };
  
}