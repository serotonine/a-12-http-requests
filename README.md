# ANGULAR Http Requests.
### Repository
https://github.com/serotonine/a-12-http-requests

### About
Build [Maximilian Schwarzmüller](https://www.udemy.com/user/maximilian-schwarzmuller) Http Requests: See below links.

***

### ANGULAR 18
**xxx**

##### Summary
- [Angular HttpClient + provideHttpClient](https://www.udemy.com/course/the-complete-guide-to-angular-2/learn/lecture/44116304)
- [Add HttpClient in NgModule](https://www.udemy.com/course/the-complete-guide-to-angular-2/learn/lecture/44127430)
- [Move http request logic in a Service](https://www.udemy.com/course/the-complete-guide-to-angular-2/learn/lecture/44116338)
- [`tap`](https://www.udemy.com/course/the-complete-guide-to-angular-2/learn/lecture/44116340)
-[Introducing HTTP Interceptors](https://www.udemy.com/course/the-complete-guide-to-angular-2/learn/lecture/44116366)
  httpClient has methods which allow you to register a so-called Interceptor.
  Register an Interceptor at the place you provide the HTTP CLIent : here in the Bootstrap app (Main.ts).
  ```js
    bootstrapApplication(AppComponent, {
      providers:[provideHttpClient(
        withInterceptors([])
      )]
    }).catch((err) => console.error(err));
  ```
  in the array, pass functions.