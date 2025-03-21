import { MockService } from './core/services/mock.service';
import { Component, inject } from '@angular/core';
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
  constructor(private MockService:MockService){
    this.MockService.initMock()
    
   
  }
  title = 'painel-iaset';
}
