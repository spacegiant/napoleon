// import { type App, MarkdownView } from 'obsidian';

// const registerDecks = (app: App, table: any): null | undefined => {
//   const nonTask: any = [];
//   const checked: any = [];
//   const unchecked: any = [];

//   table.listItems.forEach((item: any) => {
//     if (!item.task) {
//       nonTask.push(item);
//     } else if (item.task === 'x') {
//       checked.push(item);
//     } else {
//       unchecked.push(item);
//     }
//   });

//   // make sure they are not just list items
//   if (checked.length + unchecked.length === 0) {
//     return null;
//   }
//   const path = app.metadataCache.getFirstLinkpathDest(
//     table.basename,
//     table.path
//   );
//   const content = app.vault.cachedRead(path).then((value) => {
//     console.log('VALUE ', value);
//   });
//   // do we need to shuffle?
//   if (table.frontmatter.shuffle && checked.length === 0) {
//     // reset all as checked
//     const view = app.workspace.getActiveViewOfType(MarkdownView);
//     unchecked.map((item: any) => {
//       const lineNo = item.position.start.line;
//       const newLine = view?.editor.getLine(lineNo).replace('[ ]', '[x]');
//       item.task = 'x';
//       view?.editor.setLine(lineNo, newLine);
//     });
//   }

//   const roll = Math.floor(Math.random() * checked.length);
//   console.log('ROLL ', checked[roll]);

//   // const uncheckedItems = table.listItems.filter((item: any) => {
//   //   console.log(item.task)
//   //   return item.task && item.task !== "x";
//   // })s
//   // If all checked, then uncheck all items
//   // if(uncheckedItems.length === 0) {

//   // }
//   // table.listItems.forEach((item: any) => {
//   //   const view = app.workspace.getActiveViewOfType(MarkdownView);
//   //   if (item.task !== "x") {
//   //     const lineNo = item.position.start.line;
//   //     const newLine = view.editor.getLine(lineNo).replace("[ ]", "[x]")
//   //     console.log(view.editor.getLine(lineNo))
//   //     item.task = "x";
//   //     view.editor.setLine(lineNo, newLine)

//   //   }
//   // });
// };

// export default registerDecks;
