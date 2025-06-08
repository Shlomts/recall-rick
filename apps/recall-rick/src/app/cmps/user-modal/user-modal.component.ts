import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss'],
  standalone: false,
})
export class UserModalComponent {
  username = '';
  @Output() usernameSet = new EventEmitter<string>();

  submit() {
    if (this.username.trim()) {
      this.usernameSet.emit(this.username.trim());
    }
  }
}
