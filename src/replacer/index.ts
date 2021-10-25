import Replacer from './replacer';

export default (doc: Document, app: any) => {
    init: doc.addEventListener("keydown", e => {
        if (e.key === 'Tab') {
            console.log("TABBEDx")
            Replacer(app);
        }
    });
}
