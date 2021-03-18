import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AppConfigService {
  private config: any;
  constructor(private http: HttpClient) { }
  public async loadConfig() {
    try {
      const config = await this.http.get('./assets/config/config.json')
        .toPromise();
      this.config = config;
    } catch (err) {
      console.error(err);
    }
  }
  
  getConfig() {
    return this.config;
  }
}