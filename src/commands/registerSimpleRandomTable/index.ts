import { type App, MarkdownView } from 'obsidian';
import getRandomListItem from '../../utils/getRandomListItem';

// TODO: Fix table: any
const registerSimpleRandomTable = (app: App, table: any) => {
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
          getRandomListItem(app, table, (content: string) => {
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

export default registerSimpleRandomTable;
