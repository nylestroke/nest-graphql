import { Injectable, Scope, ConsoleLogger } from '@nestjs/common';

@Injectable({ scope: Scope.TRANSIENT })
export class AppLogger extends ConsoleLogger {
  error(message: string) {
    super.error(message);
  }

  warn(message: string) {
    super.warn(message);
  }

  log(message: any) {
    if (!message) {
      return;
    }
    super.log(message);
  }
}
