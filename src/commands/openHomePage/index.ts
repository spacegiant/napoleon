import { type App, MarkdownView } from 'obsidian';

const openHomePage = (app: App) => {
  return (checking: boolean) => {
    const leaf = app.workspace.getActiveViewOfType(MarkdownView);

    if (leaf) {
      if (!checking) {
        // this.app.workspace.detachLeavesOfType("markdown");
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        app.workspace.openLinkText('HOME', '', false, {
          active: true,
        });
      }
      return true;
    }
    return false;
  };
};

export default openHomePage;
