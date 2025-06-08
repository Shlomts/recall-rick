import { Component } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})

export class AppComponent {
  title = 'recall-rick';
  constructor(public userService: UserService) {}
  onUsernameSet(name: string) {
    this.userService.username = name;
  }
}
