import { App, MarkdownView } from "obsidian";
import getRandomWeighedListItem from "../../utils/getRandomWeightedListItem";

// TODO: Fix table: any
const registerWeightedRandomTable = (app: App, table: any) => {
  return (checking: boolean) => {
    let leaf = app.workspace.getActiveViewOfType(MarkdownView);
    if (leaf) {
      if (!checking) {
        const mode = leaf.getState().mode;
        const isEditing = mode === "source";

        const view = app.workspace.getActiveViewOfType(MarkdownView);

        if (isEditing && view) {
          const editor = view.editor;
          const doc = editor.getDoc();
          const cursor = doc.getCursor();
          getRandomWeighedListItem(app, table, (content: string) => {
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
