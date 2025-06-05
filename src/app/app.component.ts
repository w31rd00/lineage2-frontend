import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopHeaderComponent } from './top-header/top-header.component';
import { MainHeaderComponent } from './main-header/main-header.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TopHeaderComponent, MainHeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'lineage2-angular-app';

  constructor(private translate: TranslateService) {
    translate.setDefaultLang('ka');
    translate.use('ka');
  }

}
