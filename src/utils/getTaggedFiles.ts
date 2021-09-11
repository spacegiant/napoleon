import { App } from 'obsidian';

// function getTagFilesMap(app: App): TagFilesMap {
export default function getTaggedFiles(app: App) {
    const metadataCache = app.metadataCache;
    const markdownFiles = app.vault.getMarkdownFiles();

    // const tagFilesMap: TagFilesMap = {};
    const randomTables: {}[] = [];
    const randomWeighted: {}[] = [];
    const config: {}[] = [];

    for (const markdownFile of markdownFiles) {
        const cachedMetadata = metadataCache.getFileCache(markdownFile);

        // console.log("!!! ", markdownFile, cachedMetadata)

        if (!cachedMetadata) return;

        const tags = cachedMetadata.frontmatter?.tags;

        if (cachedMetadata.frontmatter?.tags.includes('solo-table')) {
            randomTables.push(Object.assign({}, markdownFile, cachedMetadata));
        } else if (cachedMetadata.frontmatter?.tags.includes('solo-weighted')) {
            randomWeighted.push(Object.assign({}, markdownFile, cachedMetadata));
        } else if (cachedMetadata.frontmatter?.tags.includes('solo-config')) {
            config.push(markdownFile)
        }
    }

    return {
        randomTables,
        randomWeighted,
        config
    };
}