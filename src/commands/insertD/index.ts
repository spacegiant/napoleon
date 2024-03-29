import { type App, MarkdownView } from 'obsidian';

const insertD = (app: App) => {
  return (checking: boolean) => {
    const leaf = app.workspace.getActiveViewOfType(MarkdownView);

    if (leaf) {
      if (!checking) {
        const leaf = app.workspace.getActiveViewOfType(MarkdownView);
        if (leaf) {
          const mode = leaf.getState().mode;
          const isEditing = mode === 'source';

          const view = app.workspace.getActiveViewOfType(MarkdownView);

          if (isEditing && view) {
            const editor = view.editor;
            const doc = editor.getDoc();
            const cursor = doc.getCursor();
            doc.replaceRange('d', cursor);
            doc.focus();
            doc.setCursor({
              line: cursor.line,
              ch: cursor.ch + 1,
            });
          }
        }
      }
      return true;
    }
    return false;
  };
};

export default insertD;
