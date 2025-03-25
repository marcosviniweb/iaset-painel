
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `<router-outlet></router-outlet>`,
  styles: [
    `
      :host {
        display: flex;
        width: 100%;
        min-height: 100vh;
        height: 100%;
        
      }
    `,
  ],
})
export class AppComponent {

  title = 'painel-iaset';
}
