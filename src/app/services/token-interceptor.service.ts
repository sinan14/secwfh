// import { Injectable, Injector } from "@angular/core";
// import { HttpInterceptor } from "@angular/common/http";
// // import { AuthService } from "./auth.service";

// @Injectable({
//   providedIn: "root",
// })
// export class TokenInterceptorService implements HttpInterceptor {
//   constructor(private injector: Injector) {}
//   intercept(req: any, next: any) {
//     // let authService = this.injector.get(AuthService);
//     const base64UserName = btoa('9492188326');
//     const base64Password = btoa('srini@4u');
//     const bb = `${base64UserName},${base64Password}`;
//     const ba = btoa('9492188326,srini@4u');
//     let tokenizedReq = req.clone({
//       // setHeaders: {
//       //   Authorization: ''
//       // },
//     });
//     return next.handle(tokenizedReq);
//   }
// }
