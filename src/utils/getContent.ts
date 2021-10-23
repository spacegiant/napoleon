import {App} from 'obsidian';


const getContent = (app: App, file: any, cb: (value: string) => void) => {
    const offset = file.frontmatter.position.end.offset;
    const path = app.metadataCache.getFirstLinkpathDest(file.name, file.path);
    return app.vault.cachedRead(path).then((value) => {
        const sourceText = value.substring(offset).trim();
        const items = sourceText.split(/\r?\n/);
        const prefix = file.frontmatter.label ? file.frontmatter.label + " " : "";

        // console.log(items)
        const roll = Math.floor(Math.random() * items.length )
        const text = `${prefix}${items[roll]}`;
        return cb(text);
    }).catch(error => console.log(error));
}

export default getContent;
