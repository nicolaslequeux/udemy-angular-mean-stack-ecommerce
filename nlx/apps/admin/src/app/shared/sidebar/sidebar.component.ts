import { Component, OnInit } from '@angular/core';

import { AuthService } from '@nlx/users';

@Component({
  selector: 'admin-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {
  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    null;
  }

  logoutUser(): void {
    this.auth.logout();
  }
}
