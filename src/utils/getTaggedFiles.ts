import { App } from 'obsidian';

export default function getTaggedFiles(app: App) {
    const metadataCache = app.metadataCache;
    const markdownFiles = app.vault.getMarkdownFiles();
    const simpleList: {}[] = [];
    const doubleTables: {}[] = [];
    const weightedTables: {}[] = [];
    const config: {}[] = [];

    for (const markdownFile of markdownFiles) {
        const cachedMetadata = metadataCache.getFileCache(markdownFile);

        if (!cachedMetadata) return;

        if (cachedMetadata.frontmatter?.tags.includes('solo/list')) {           
            simpleList.push(Object.assign({}, markdownFile, cachedMetadata))
        } else if (cachedMetadata.frontmatter?.tags.includes('solo/double')) {           
            doubleTables.push(Object.assign({}, markdownFile, cachedMetadata));
        } else if (cachedMetadata.frontmatter?.tags.includes('solo/weighted')) {
            weightedTables.push(Object.assign({}, markdownFile, cachedMetadata));
        } else if (cachedMetadata.frontmatter?.tags.includes('solo/config')) {
            config.push(markdownFile)
        }
    }

    return {
        simpleList,
        doubleTables,
        weightedTables,
        config
    };
}