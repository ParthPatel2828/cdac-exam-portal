import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToasterService, Toast } from './toaster.service';

@Component({
  selector: 'app-toaster',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toaster.component.html',
  styleUrl: './toaster.component.scss',
})
export class ToasterComponent implements OnInit {
  toasts: Toast[] = [];

  constructor(private toasterService: ToasterService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.toasterService.toasts$.subscribe((toasts) => {
      // Update view in next microtask to avoid ExpressionChangedAfterItHasBeenCheckedError
      Promise.resolve().then(() => {
        this.toasts = toasts;
        this.cdr.markForCheck();
      });
    });
  }

  removeToast(id: string): void {
    this.toasterService.remove(id);
  }

  getToastClass(type: string): string {
    return `toast-${type}`;
  }
}
