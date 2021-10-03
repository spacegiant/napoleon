import { Workspace, MarkdownView } from 'obsidian';

// https://regex101.com/r/4hVg8q/1
const re = /(\d*)(D\d*)((?:[+*-](?:\d+|\([A-Z]*\)))*)(?:\+(D\d*))?/gi;

export default (doc: Document, workspace: Workspace) => {
    init: doc.addEventListener("keyup", e => {
        const view = workspace.getActiveViewOfType(MarkdownView);

        if (view.getMode() !== 'source') return;
        
        const editor = view.editor;
        const doc = editor.getDoc();
        const cursor = doc.getCursor();
        const lineNo = cursor.line;
        const currentLine = editor.getLine(lineNo);
        const match = re.exec(currentLine);
        console.log(match)

        if (false && match) {
            const updatedLine = currentLine.replace(match[0], "NEW")
            editor.setLine(lineNo, updatedLine)
            // editor.replaceRange("found", cursor)
        }

        // console.log(currentLine);
    })
}
