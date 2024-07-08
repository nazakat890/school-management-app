import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  isUMMenuOpen = false;
  constructor() { }

  ngOnInit(): void {
  }

  toggleUMMenu(){
    this.isUMMenuOpen = !this.isUMMenuOpen;
  }
}
