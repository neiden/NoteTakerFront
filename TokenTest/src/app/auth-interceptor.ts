import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";

export class AuthInterceptor implements HttpInterceptor {

    constructor(){}
    
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        console.log("Intercepted request");
        if (req.url.includes('reset-password/reset') || req.url.includes('login') || req.url.includes('verify-account') || req.url.includes('register') || req.url.includes('reset-password')) {
            return next.handle(req);
        }
        const token = localStorage.getItem('token');
        const cloned = req.clone({
            headers: req.headers.set("Authorization", "Bearer " + token)
        });

        return next.handle(cloned);
    }
}
 