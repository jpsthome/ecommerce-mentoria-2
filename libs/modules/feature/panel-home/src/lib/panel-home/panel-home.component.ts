import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule],
  templateUrl: './panel-home.component.html',
  styleUrl: './panel-home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PanelHomeComponent {}
