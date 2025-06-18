import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'error-modal',
  templateUrl: './error-modal.component.html',
  styleUrls: ['./error-modal.component.scss'],
  standalone: false,
})
export class ErrorModalComponent {
  @Input() errorMessage: string = 'An error occurred.';
  @Output() closed = new EventEmitter<void>();
  visible = true;

  close() {
    this.visible = false;
    this.closed.emit();
  }
}
