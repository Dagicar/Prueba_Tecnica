import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../../../shared/services/login.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(
    private formbuilder: FormBuilder,
    private loginService: LoginService,
    private authService: AuthService,
    private toastr: ToastrService
  ) { }

  loginForm!: FormGroup;

  ngOnInit() {
    this.createForm()
  }



  private createForm() {
    this.loginForm = this.formbuilder.group({
      username: [null, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: [null, [Validators.required]]
    })
  }

  async onSubmit() {
    try {
      const body = this.loginForm.value;
      const { accessToken, tokenType } = await this.loginService.login(body)
      this.toastr.success(("Autenticado correctamente"), 'Autorizado', {
        positionClass: 'toast-bottom-right'
      });
      this.authService.authorize({ accessToken, tokenType })
    } catch (error) {
      this.toastr.error((error as any).message, (error as any).name, {
        positionClass: 'toast-bottom-right'
      });
    }
  }

}
