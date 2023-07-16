import { App, MarkdownView } from 'obsidian';
import getRandomListItem from 'src/utils/getRandomListItem';

// TODO: Fix table: any
const registerSimpleRandomTable = (app: App, table: any) => {
  return (checking: boolean) => {
    let leaf = app.workspace.getActiveViewOfType(MarkdownView);
    if (leaf) {
      if (!checking) {
        console.log('simple');
        const mode = leaf.getState().mode;
        const isEditing = mode === 'source';

        const view = app.workspace.getActiveViewOfType(MarkdownView);

        if (isEditing && view) {
          const editor = view.editor;
          const doc = editor.getDoc();
          const cursor = doc.getCursor();
          getRandomListItem(app, table, (content: string) => {
            console.log(content);
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
