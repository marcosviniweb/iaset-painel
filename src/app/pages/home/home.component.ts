import { Component, inject, signal } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import { RouterModule, RouterOutlet } from '@angular/router';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MediaMatcher} from '@angular/cdk/layout';
import { AuthService } from '../../core/auth/auth.service';
@Component({
  selector: 'app-home',
  imports: [MatSidenavModule, RouterOutlet, RouterModule,MatToolbarModule, MatButtonModule, MatIconModule,  MatListModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  protected readonly isMobile = signal(true);
  protected readonly isOpened = signal(false)
  private readonly _mobileQuery: MediaQueryList;
  private readonly _mobileQueryListener: () => void;
  private authService = inject(AuthService)
  constructor() {
    const media = inject(MediaMatcher);

    this._mobileQuery = media.matchMedia('(max-width: 1000px)');
    this.isMobile.set(this._mobileQuery.matches);
    this._mobileQueryListener = () => this.isMobile.set(this._mobileQuery.matches);
    this._mobileQuery.addEventListener('change', this._mobileQueryListener);
  }

  Opened(){
    this.isOpened.set(!this.isOpened())
  }

  logOff(){
    this.authService.logOff()
  }

}
