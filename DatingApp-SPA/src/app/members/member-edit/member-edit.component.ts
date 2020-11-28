import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/_models/user';
import { ActivatedRoute } from '@angular/router';

import { AlertifyService } from 'src/app/_services/Alertify.service';
import { UserService } from 'src/app/_services/user.service';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/_services/auth.service';


@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css'],
})
export class MemberEditComponent implements OnInit {
  user: User;
  photoUrl: string;
  @ViewChild('editForm') editForm: NgForm;
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }
  constructor(
    private userServce: UserService,
    private alertify: AlertifyService,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.route.data.subscribe((data) => {
      const user = 'user';
      this.user = data[user];
    });
    this.authService.curentPhotoUrl.subscribe(photoUrl=>this.photoUrl=photoUrl)
  }
  updateUser() {
    console.log('here');
    this.userServce
      .updateUser(this.authService.decodedToken.nameid, this.user)
      .subscribe(
        (next) => {
          this.alertify.success('Profile Updated Successfully');
          this.editForm.reset(this.user);
        },
        (error) => {
          this.alertify.error(error);
        }
      );
  }
  updateMainPhoto(photoUrl)
  {
    this.user.photoUrl = photoUrl;

  }
}
