import { AbstractInterpreter } from './AbstractInterpreter';
import { JSONInterpreter } from './JSONInterpreter';


const interpreters = [
  new JSONInterpreter()
];

/**
 * Returns the list of interpreters.
 * @returns {AbstractInterpreter[]} The list of interpreters.
 */
export const getInterpreters = (): AbstractInterpreter[] => {
  return interpreters;
}

/**
 * Returns the interpreter that matches the given line.
 * @param line The line to match.
 * @returns {AbstractInterpreter | null} The interpreter that matches the line, or null if none match.
 */
export const getMatchingInterpreter = (line: string): AbstractInterpreter | null => {
  for (const interpreter of interpreters) {
    if (interpreter.doesMatch(line)) {
      return interpreter;
    }
  }
  return null;
}

export const annotateWithMatchingInterpreter = (line: string): void => {
  const interpreter = getMatchingInterpreter(line);
  if (interpreter) {
    interpreter.annotate(line);
  }
}
