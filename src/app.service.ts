import { Injectable } from "@nestjs/common";

/**
 *
 */
@Injectable()
export class AppService {
  // eslint-disable-next-line jsdoc/require-returns
  /**
   *
   */
  getHello(): string {
    return "Hola mundo!";
  }
}
