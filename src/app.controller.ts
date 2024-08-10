import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";

/**
 *
 */
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // eslint-disable-next-line jsdoc/require-returns
  /**
   *
   */
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
