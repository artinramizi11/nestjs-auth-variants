import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { map, Observable, tap } from "rxjs";

@Injectable()
export class LogginInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const loggedAt = new Date().toLocaleString()
    return next.handle().pipe(
      map((data) => {
        return {
            message: "Sucess",
            data,
            loggedAt
        }; 
      }),
      tap(() => console.log("after interceptor"))
    
    );
  }
}