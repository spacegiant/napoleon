import { App, MarkdownView } from "obsidian";
import Replacer from "src/replacer";

const insertTab = (app: App) => {
  return (checking: boolean) => {
    let leaf = app.workspace.getActiveViewOfType(MarkdownView);

    if (leaf) {
      if (!checking) {
        Replacer(app);
      }
      return true;
    }
    return false;
  };
};

export default insertTab;
