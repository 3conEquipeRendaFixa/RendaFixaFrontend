import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'srf-b3-root',
  imports: [RouterOutlet],
  styleUrl: './app.scss',
  template: '<router-outlet></router-outlet>',
})
export class App {}
