import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'multi-tenant-management';


  ngOnInit() {
    this.setDefaultTheme()
  }
  setDefaultTheme() {
    if (localStorage.getItem('theme')) {
       let theme = localStorage.getItem('theme');
       const body = document.getElementsByTagName('body')[0];
       if(theme === 'light'){
        body.classList.remove('dark');
        body.classList.add(theme);
      }
    }
  }
}
