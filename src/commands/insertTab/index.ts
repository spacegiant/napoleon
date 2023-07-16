import { type App, MarkdownView } from 'obsidian';
import Replacer from '../../replacer';

const insertTab = (app: App) => {
  return (checking: boolean) => {
    const leaf = app.workspace.getActiveViewOfType(MarkdownView);

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
