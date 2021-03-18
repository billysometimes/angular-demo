import { Component } from '@angular/core';
import { AppConfigService } from './providers/app-config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private config: AppConfigService) {
    console.log(this.config.getConfig());
    }
  title = 'sample-app @ ' + this.config.getConfig().environment;
}
