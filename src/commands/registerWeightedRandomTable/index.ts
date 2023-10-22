import { type App, MarkdownView } from 'obsidian';
import getRandomItem from 'src/utils/getRandomItem';

// TODO: Fix table: any
const registerWeightedRandomTable = (app: App, table: any) => {
  return (checking: boolean) => {
    const leaf = app.workspace.getActiveViewOfType(MarkdownView);
    if (leaf) {
      if (!checking) {
        const mode = leaf.getState().mode;
        const isEditing = mode === 'source';

        const view = app.workspace.getActiveViewOfType(MarkdownView);

        if (isEditing && view) {
          const editor = view.editor;
          const doc = editor.getDoc();
          const cursor = doc.getCursor();
          // eslint-disable-next-line @typescript-eslint/no-floating-promises
          getRandomItem(app, table, (content: string) => {
            const string = content;
            doc.replaceRange(string, cursor);
            doc.focus();
            doc.setCursor(cursor.line, string.length + cursor.ch);
          });
        }
      }
      return true;
    }
    return false;
  };
};

export default registerWeightedRandomTable;
