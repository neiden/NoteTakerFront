import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";

export class AuthInterceptor implements HttpInterceptor {

    constructor(){}
    
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        console.log("Intercepted request");
        const token = localStorage.getItem('token');
        const cloned = req.clone({
            headers: req.headers.set("Authorization", "Bearer " + token)
        });

        return next.handle(cloned);
    }
}
 