import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { map, Observable, tap } from "rxjs";
import { Response } from "express";
/**
 *
 */
@Injectable()
export class AuthInterceptor implements NestInterceptor {
  /**
   * Intercepta la request entrante
   * @param {ExecutionContext} context jk
   * @param {CallHandler} next akjhd
   * @returns {Observable<any>} hagsdj
   */
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const res = context.switchToHttp().getResponse<Response>();

    return next.handle().pipe(
      tap(async ({ token }) => {
        res.cookie("token", token, {});
      }),
      map(({ user }) => {
        return user;
      }),
    );
  }
}
