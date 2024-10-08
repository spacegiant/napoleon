import { MarkdownView, type App } from 'obsidian';
// https://github.com/GreenImp/rpg-dice-roller
import { DiceRoll } from '@dice-roller/rpg-dice-roller';

const Replacer = (app: App): void => {
  const view = app.workspace.getActiveViewOfType(MarkdownView);

  if (view?.getMode() !== 'source') return;

  const editor = view.editor;
  const doc = editor.getDoc();
  const cursor = doc.getCursor();
  const lineNo = cursor.line;
  const currentLine = editor.getLine(lineNo);

  const cleanedLine = currentLine.replace(/\s+/g, ' ').trim();
  const stringList = cleanedLine.split(' ');
  const lastString = stringList[stringList.length - 1];

  try {
    const roll = new DiceRoll(lastString);
    stringList[stringList.length - 1] = roll.output;
  } catch (e) {
    console.error('Dice notation not recognised');
  }

  const returnString = stringList.join(' ');
  editor.setLine(lineNo, returnString);
  editor.focus();
  editor.setCursor(lineNo, returnString.length);
};

export default Replacer;
