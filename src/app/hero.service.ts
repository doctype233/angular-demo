import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Hero } from './hero';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({ //标记类为依赖注入系统的参与者之一
  providedIn: 'root'
})
export class HeroService {
  constructor(
    private http:HttpClient,
    private messageService: MessageService,
  ) { }

  private heroesUrl='api/heroes'  // URL to web api

  /** GET heroes from the server */
  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
    .pipe(
      tap(_ => this.log('fetched heroes')),
      catchError(this.handleError<Hero[]>('getHeroes', []))   //返回一个英雄数组 
    )
  }

  getHero(id: number): Observable<Hero> {
    // this.messageService.add(`HeroService : fetched hero =>id:${id}`)
    // return of(HEROES.find(hero => hero.id === id))
    return this.http.get<Hero>(`${this.heroesUrl}/${id}`)
    .pipe(
      tap(_=>this.log('fetched hero,id='+id)),
      catchError(this.handleError<Hero>('getHero'))  //返回单个英雄数据
    )
  }
  updateHero(hero:Hero):Observable<Hero>{
    return this.http.put(this.heroesUrl,hero,httpOptions)
    .pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    )
  }
  private log(message:string){
    this.messageService.add(`HeroService:${message}`)
  }
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
   
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
   
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
   
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  
}
