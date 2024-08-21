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
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

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
  ],
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
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

  expandedElement: User | null = null;
  displayedColumns: string[] = [
    'avatar',
    'name',
    'email',
    'createdAt',
    'expand',
  ];
}
