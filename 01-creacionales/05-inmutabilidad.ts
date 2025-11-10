/**
 * ! Inmutabilidad con copia
 * Aunque la inmutabilidad es una buena práctica, no siempre es posible.
 * En estos casos, se puede hacer una copia del objeto y modificar la copia.
 *
 *  * Es útil para mantener un historial de estados en aplicaciones interactivas.
 */

import { COLORS } from '../helpers/colors.ts';

class CodeEditorState {
  readonly content: string;
  readonly cursorPosition: number;
  readonly unsavedChanges: boolean;

  constructor(
    content: string,
    cursorPosition: number,
    unsavedChanges: boolean,
  ) {
    this.content = content;
    this.cursorPosition = cursorPosition;
    this.unsavedChanges = unsavedChanges;
  }

  copyWith({
    content,
    cursorPosition,
    unsavedChanges,
  }: Partial<CodeEditorState>): CodeEditorState {
    return new CodeEditorState(
      content ?? this.content,
      cursorPosition ?? this.cursorPosition,
      unsavedChanges ?? this.unsavedChanges,
    );
  }

  displayState() {
    console.log('%cCode editor state:', COLORS.red);
    console.log(`
            Content: ${this.content}
            Cursor Position: ${this.cursorPosition}
            Unsaved Changes: ${this.unsavedChanges}
        `);
  }
}

class CodeEditorHistory {
  private history: CodeEditorState[] = [];
  private currentStateIndex: number = -1;

  save(state: CodeEditorState): void {
    if (this.currentStateIndex < this.history.length - 1) {
      this.history = this.history.splice(0, this.currentStateIndex + 1);
    }

    this.history.push(state);
    this.currentStateIndex++;
  }

  undo(): CodeEditorState | null {
    if (this.currentStateIndex > 0) {
      this.currentStateIndex--;
      return this.history[this.currentStateIndex];
    }

    return null;
  }

  redo(): CodeEditorState | null {
    if (this.currentStateIndex < this.history.length - 1) {
      this.currentStateIndex++;
      return this.history[this.currentStateIndex];
    }

    return null;
  }
}

function main() {
  const history = new CodeEditorHistory();
  let editorState = new CodeEditorState(
    "console.log('Hello, world!');",
    2,
    false,
  );

  history.save(editorState);
  console.log('%cInitial State:', COLORS.green);
  editorState.displayState();

  editorState = editorState.copyWith({
    content: "console.log('Hello, TypeScript!');",
    cursorPosition: 5,
    unsavedChanges: true,
  });

  history.save(editorState);
  console.log('%cModified State:', COLORS.green);
  editorState.displayState();

  editorState = editorState.copyWith({
    cursorPosition: 5,
  });
  history.save(editorState);
  console.log('%cModified State 2:', COLORS.green);
  editorState.displayState();

  console.log('%cUndoing changes...', COLORS.yellow);
  editorState = history.undo()!;
  editorState.displayState();
}

main();
