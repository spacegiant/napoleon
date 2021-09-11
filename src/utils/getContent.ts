import {App} from 'obsidian';


const getContent = (app: App, filename: string, filepath: string, cb: (value: string) => void) => {
    const path = app.metadataCache.getFirstLinkpathDest(filename, filepath);
    const content = app.vault.cachedRead(path).then((value) => cb(value)).catch(error => console.log(error));
}

export default getContent;
