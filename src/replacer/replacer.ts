import { MarkdownView, App } from 'obsidian';
// https://github.com/GreenImp/rpg-dice-roller
import { DiceRoll } from 'rpg-dice-roller';

const Replacer = (app: App) => {
    const view = app.workspace.getActiveViewOfType(MarkdownView);

            if (view.getMode() !== 'source') return;

            const editor = view.editor;
            const doc = editor.getDoc();
            const cursor = doc.getCursor();
            const lineNo = cursor.line;
            const currentLine = editor.getLine(lineNo);

            const cleanedLine = currentLine.replace(/\s+/g, ' ').trim();
            const stringList = cleanedLine.split(" ");
            const lastString = stringList[stringList.length - 1];
            const roll = new DiceRoll(lastString.toLowerCase());
            stringList[stringList.length - 1] = roll.output;
            editor.setLine(lineNo, stringList.join(' '));
}

export default Replacer;
