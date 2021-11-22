import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  selected = '';

  constructor(private translateService: TranslateService) { }

  setInitialAppLanguage(){
    const language = this.translateService.getBrowserLang();
    this.translateService.use('hu');
  }

  setLanguage(){
    this.translateService.use('hu');


  }
}
