import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AlertifyService } from '../_services/Alertify.service';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  model: any = {};
  @Output()
  cancelRegister = new EventEmitter();
  constructor(private authService: AuthService, private alertify: AlertifyService) {}

  ngOnInit() {}
  register() {
    this.authService.register(this.model).subscribe(
      () =>  this.alertify.success('registration successfull'),

      (error) =>  this.alertify.error(error)
    );
  }
  cancel() {
    this.cancelRegister.emit(false);
  }
}
