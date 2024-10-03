import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';
import { UsersService } from '../../../services/users.service';
import { User } from '../../../types/user';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent implements OnInit {
  users: User[] = [];

  @Input() selectedUser: User | null = null;

  @Output() userSelected = new EventEmitter<User>();

  constructor(private usersService: UsersService){}

  ngOnInit(): void {
    this.usersService.getAll().subscribe({
      next: (response) => {
        this.users = response;
      },
      error: () => {}
    })
  }

  onSelect(user: User): void {
    this.userSelected.emit(user);
  }

  isSelected(user: User): boolean {
    return this.selectedUser?.id == user.id;
  }

}
