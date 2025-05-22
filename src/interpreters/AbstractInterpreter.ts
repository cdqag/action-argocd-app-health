export abstract class AbstractInterpreter {
  abstract doesMatch(line: string): boolean;
  abstract annotate(line: string): any;
}
