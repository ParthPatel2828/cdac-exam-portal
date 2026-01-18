import { Component, OnInit } from '@angular/core';
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

  constructor(private toasterService: ToasterService) {}

  ngOnInit(): void {
    this.toasterService.toasts$.subscribe((toasts) => {
      this.toasts = toasts;
    });
  }

  removeToast(id: string): void {
    this.toasterService.remove(id);
  }

  getToastClass(type: string): string {
    return `toast-${type}`;
  }
}
