import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  language = '';

  constructor(private translateService: TranslateService) { }

  setInitialAppLanguage(){
    this.translateService.setDefaultLang('hu');
    const defaultLanguage = this.translateService.defaultLang;
    this.translateService.use(defaultLanguage);
  }

  setLanguage(str: string){
    this.translateService.use(str);
    console.log(str);
  }

  getLanguage(){
    return this.language = this.translateService.currentLang;
  }
}
