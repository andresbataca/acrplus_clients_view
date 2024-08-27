import { HttpEvent, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from '../../../environments/environments.develoment';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  readonly #cache = new Map<string, HttpEvent<unknown>>();
  private baseUrl: string = environments.baseUrl;
  private urlSegmentsToCheck = ['/api/app/home', '/api/app/datos/paz_y_salvo_pdf'];

  constructor() {}

  get(key: string): any {
    return this.#cache.get(key);
  }

  set(key: string, value: HttpEvent<unknown>): void {
      this.#cache.set(key, value);
  }

  isCacheable(req: HttpRequest<any>): boolean {
    const baseUrl = this.baseUrl
    return this.urlSegmentsToCheck.some(segment => req.url.includes(`${baseUrl}${segment}`));
  }

  clear(): void {
    this.#cache.clear();
  }

}
