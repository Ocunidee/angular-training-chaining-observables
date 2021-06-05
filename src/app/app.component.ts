import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize, switchMap } from 'rxjs/operators';
import { User, UserService } from './user.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  user: User | null;
  firstName = '';
  loading = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUser().subscribe(user => (this.user = user));
  }

  editUser() {
    this.loading = true;
    this.userService
      .edit(this.firstName)
      // Compose this observable with the one returned by loadUser()
      // Then subscribe to the result and update the view
      .pipe(/*TODO*/)
      .subscribe(/*TODO*/);
  }

  loadUser(): Observable<User> {
    this.loading = true;
    return this.userService
      .details()
      .pipe(finalize(() => (this.loading = false)));
  }
}
