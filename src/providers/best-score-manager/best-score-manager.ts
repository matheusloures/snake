import { Injectable } from '@angular/core';

/*
  Generated class for the BestScoreManagerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BestScoreManagerProvider {
  private ngxSnake = 'ngx_snake';
  public store(score: number) {
    localStorage.setItem(this.ngxSnake, JSON.stringify({ 'best_score': score }));
  }

  public retrieve() {
    let storage = this.parse();
    if (!storage) {
      this.store(0);
      storage = this.parse();
    }

    return storage.best_score;
  }

  private parse() {
    return JSON.parse(localStorage.getItem(this.ngxSnake));
  }

  constructor() {
    console.log('Hello BestScoreManagerProvider Provider');
  }

}
