import * as core from "@actions/core";
import { AbstractInterpreter } from "./AbstractInterpreter";

const LEVEL_FIELD = "level";
const MESSAGE_FIELD = "message";
const STACK_TRACE_FIELD = "stack_trace";

export class JSONInterpreter extends AbstractInterpreter {
  doesMatch(line: string): boolean {
    try {
      JSON.parse(line);
      return true;
    } catch (e) {
      return false;
    }
  }

  annotate(line: string): any {
    const data = JSON.parse(line);

    const level = data[LEVEL_FIELD] || "INFO";
    let message = data[MESSAGE_FIELD] || "No message";
    const stackTrace = data[STACK_TRACE_FIELD] || "No stack trace";
    
    switch (level) {
      case "ERROR":
        message += `\n\nStack trace:\n${stackTrace}`;
        core.error(message.trim());
        break;

      case "WARN":
      case "WARNING":
        core.warning(message.trim());
        break;
    }
  }
}
