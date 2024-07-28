import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet],
  template: ` <section class="container">
    <router-outlet />
  </section>`,
})
export default class HomeComponent {}
