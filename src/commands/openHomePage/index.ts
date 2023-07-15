import { App, MarkdownView } from "obsidian";

const openHomePage = (app: App) => {
  return (checking: boolean) => {
    let leaf = app.workspace.getActiveViewOfType(MarkdownView);

    if (leaf) {
      if (!checking) {
        // this.app.workspace.detachLeavesOfType("markdown");
        app.workspace.openLinkText("HOME", "", false, {
          active: true,
        });
      }
      return true;
    }
    return false;
  };
};

export default openHomePage;
