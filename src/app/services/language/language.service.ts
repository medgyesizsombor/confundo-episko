import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AverageScoreComponent } from 'src/app/components/average-score/average-score.component';

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
    localStorage.setItem('language', defaultLanguage);
  }

  setLanguage(str: string){
    this.translateService.use(str);
    localStorage.setItem('language', str);
  }

  getLanguage(){
    return this.language = this.translateService.currentLang;
  }
}
