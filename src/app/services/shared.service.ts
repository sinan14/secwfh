import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, HttpSetCookieOptions } from '@capacitor-community/http';

@Injectable({
  providedIn: 'root',
})
export class sharedService {
  constructor(private _http: HttpClient) {}
  #encryptSecretKey: string = environment.encSecret;
  #headers: any = {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
  };

  encryptData(data) {
    try {
      return CryptoJS.AES.encrypt(
        JSON.stringify(data),
        this.#encryptSecretKey
      ).toString();
    } catch (e) {
      console.log(e);
    }
  }

  decryptData(data: string) {
    try {
      const bytes = CryptoJS.AES.decrypt(data, this.#encryptSecretKey);
      if (bytes.toString()) {
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      }
      return data;
    } catch (e) {
      console.log(e);
    }
  }
  storeCredentials(data: any) {
    localStorage.setItem('credentials', data);
  }
  getCredentials() {
    const credentials = localStorage.getItem('credentials');
    return this.decryptData(credentials);
  }
  storeCredentialsToCookie() {}
  //   let headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Authorization': this.basic });
  // let options = { headers: headers };
  #BASE_URL = environment.baseUrl;
  async login(data) {
    const url = `${this.#BASE_URL}/qq/login/index1.php`;
    // 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    // 'Content-Type': 'application/json',
    // const headers = new HttpHeaders({});
    // const options = { headers: headers };
    // return this._http.post(url, data, options);
    const options = {
      url,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
      data,
    };
    try {
      const response: any = await Http.post(options);
      console.log(response);
      const parsedData = JSON.parse(response.data);
      localStorage.setItem(`token`, parsedData.url_token);
      // this.loadMatchesClient();
      // this.loadMatches();
    } catch (error) {
      console.log(`error is `, error);
    }
  }
  #matchesApi = `https://www.quackquack.in/qq/home/index41.php`;
  async loadMatches() {
    // const base64UserName = btoa('9492188326');
    // const base64Password = btoa('srini@4u');
    // const bb = `${base64UserName},${base64Password}`;
    // const ba = btoa('9492188326,srini@4u');
    // const b2 = btoa('9492188326srini@4u');

    const options = {
      url: this.#matchesApi,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        Authentication: `Bearer `,
      },
      data: {
        id: 1,
        device: `mobile_new`,
      },
    };
    try {
      const res = await Http.post(options)
      // const res: any = await Http.get({
      //   url: 'https://vervemobi.com/test.html',
      //   headers: {
      //     Authorization: `Bearer `,
      //   },
      // });
      console.log(res);
    } catch (error) {
      console.log(`error is `, error);
    }
  }
  async resetStudentPassword() {
    const url =
      'http://ec2-18-219-147-180.us-east-2.compute.amazonaws.com/api/students';
    const options = {
      url,
      headers: {
        Authorization: `Bearer `,
      },
    };
    try {
      const response = await Http.get(options);
      console.log(response);
    } catch (error) {
      console.log(`error is `, error);
    }
  }
  // loadMatchesClient() {
  //   const url = `${this.#BASE_URL}/qq/home/index41.php`;
  //   const token = localStorage.getItem('token');
  //   const base64UserName = btoa('9492188326');
  //   const base64Password = btoa('srini@4u');
  //   const bb = `${base64UserName},${base64Password}`;
  //   const ba = btoa('9492188326,srini@4u');

  //   let headers = new HttpHeaders({
  //     'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',

  //     // Authorization: base64UserName + base64Password,
  //   });
  //   let options = { headers: headers };
  //   const data = {
  //     id: 1,
  //     device: `mobile_new`,
  //   };
  //   return this._http.post(url, data, options).subscribe((res:any)=>{
  //     console.log('res is ',res);

  //   },(err:any)=>{
  //     console.log('err is',err);

  //   })
  // }
}
