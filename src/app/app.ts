import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header';
import { FooterComponent } from './components/footer/footer';
import { PublishFormComponent } from './components/publish-form/publish-form';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    PublishFormComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  title = 'notification-app';
}