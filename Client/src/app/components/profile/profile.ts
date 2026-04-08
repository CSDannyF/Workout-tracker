import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule} from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { UserService } from '../../services/user-service';
import { User } from '../../models/user';

@Component({
  selector: 'app-profile',
  imports: [FormsModule, MatCardModule, MatButtonModule, MatIconModule, MatFormField, MatInputModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit {

  // met partial kan ik een leeg object aanmaken
  user: Partial<User> = {};
  isEditing: boolean = false;

  constructor(private userService: UserService, private cdr: ChangeDetectorRef) {}

  async ngOnInit(): Promise<void> {
    this.user = await this.userService.getUser();
    this.cdr.detectChanges();
  }

  edit() {
    this.isEditing = !this.isEditing;
    console.log(this.isEditing);
  }

  async onSubmit() {
    let updatedUser = new User(
      this.user.id = 1,
      this.user.name ?? "",
      this.user.email ?? "",
      new Date(this.user.birthdate ?? Date.now()),
      this.user.gender ?? "",
      this.user.weight ?? 0,
      this.user.height ?? 0,
    )
    this.edit();
    await this.userService.updateUser(updatedUser);
  }
}
