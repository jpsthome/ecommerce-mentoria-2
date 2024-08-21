import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  Input,
} from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { User } from '@ecommerce-mentoria-2/user';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  standalone: true,
  selector: 'ecommerce-mentoria-2-user-table',
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.scss',
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    NgOptimizedImage,
    RouterModule,
    MatTooltipModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserTableComponent {
  private readonly _cdr = inject(ChangeDetectorRef);

  dataSource!: MatTableDataSource<User>;

  @Input({ required: true }) set users(users: User[]) {
    this.dataSource = new MatTableDataSource<User>(users);
    this._cdr.detectChanges();
  }

  displayedColumns: string[] = [
    'avatar',
    'name',
    'email',
    'createdAt',
    'actions',
  ];
}
