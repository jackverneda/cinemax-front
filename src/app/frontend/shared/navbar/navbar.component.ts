import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, EventEmitter, Inject, Input, OnInit, Output, PLATFORM_ID } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Router, RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  imports: [CommonModule, RouterModule, MatToolbarModule, MatIconModule, MatButtonModule, MatMenuModule, MatSidenavModule],
})
export class NavbarComponent implements OnInit {
  constructor(
    @Inject(PLATFORM_ID) private _platformId: any,
    private router: Router,
  ) {}

  @Input() pages: any;
  @Output() toogleDrawer = new EventEmitter();

  ngOnInit() {
    if (isPlatformBrowser(this._platformId)) window.addEventListener('scroll', this.topOfPage);
  }

  topOfPage(): boolean {
    if (isPlatformBrowser(this._platformId)) return window.pageYOffset < 10;
    return false;
  }

  goToSearch() {
    this.router.navigateByUrl('/frontend/search');
  }

  toggleDrawer() {
    this.toogleDrawer.emit(null);
  }
}
