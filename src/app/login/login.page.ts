import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { sharedService } from '../services/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  ionViewDidEnter() {
    // this.login();
    // this._sharedService.resetStudentPassword();
    this._sharedService.loadMatches();
    this._sharedService.loadMatchesClient();
    this.fetchapi({ id: 1, device: 'mobile_new' });
  }
  async fetchapi(body) {
    try {
      const base64UserName = btoa('9492188326');
      const base64Password = btoa('srini@4u');
      const bb = `${base64UserName},${base64Password}`;
      const ba = btoa('9492188326,srini@4u');

      fetch(
        'https://www.quackquack.in/qq/visitors/index_new_design_filter.php',
        {
          method: 'POST',
          body,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          },
        }
      )
        .then((res) => res.json)
        .then((data) => {
          console.log(data);
        })
        .catch((e) => {
          console.log('error is ', e);
        });
    } catch (e) {
      console.log('SOMETHING WENT WRONG!!!', e);
    }
  }
  form: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder, private _sharedService: sharedService) {
    this.form = this.fb.group({
      name: [null, [Validators.required, Validators.minLength(5)]],

      email: [
        null,
        [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      password: [null, [Validators.required, Validators.minLength(6)]],
      confirmPassword: [null, [Validators.required]],
    });
  }

  saveDetails() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    // const encrypted = this._sharedService.encryptData(this.form.value);
    // this._sharedService.storeCredentials(encrypted);
  }

  onReset() {
    this.submitted = false;
    this.form.reset();
  }
  login() {
    const data = {
      user_name: `9492188326`,
      country_code: 91,
      password: `srini@4u`,
      remember: 1,
      device: `mobile`,
      login_type: `button`,
      captcha: ``,
    };
    this._sharedService.login(data);
    // this._sharedService.login(data).subscribe(
    //   (res: any) => {
    //     console.log(res);
    //   },
    //   (err: any) => {
    //     console.log('err is ', err);
    //   }
    // );
  }
}
// #headers = {
//   'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
// };
// const url = `${this.#BASE_URL}/qq/login/index1.php`;
// country_code: [91, [Validators.required]],
//     user_name: ['', [Validators.required]],
//     password: ['', [Validators.required]],
//     remember: [1, [Validators.required]],
//     login_type: ['button'],
//     device: ['mobile'],
//     captcha: [''],
