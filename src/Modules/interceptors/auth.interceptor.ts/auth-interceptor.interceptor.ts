import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { map, Observable } from "rxjs";
import { User } from "src/modules/user/entities/user.entity";
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
  intercept(context: ExecutionContext, next: CallHandler): Observable<User> {
    return next.handle().pipe(
      map(({ user, token, refresh }) => {
        const response = context.switchToHttp().getResponse();
        if (token) {
          response.cookie("token", token, { httpOnly: true });
          response.cookie("refresh", refresh, { httpOnly: true });
        }

        return user;
      }),
    );
  }
}
