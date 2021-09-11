import { getAllTags } from 'obsidian';
// export function FilterMDFilesByTags(file: TFile, tagList: string[], metadataCache: MetadataCache): boolean {
export function FilterMDFilesByTags(file, tagList, metadataCache) {

    if (!tagList) {
        return true;
    }

    let tags = getAllTags(metadataCache.getFileCache(file)).map(e => e.slice(1, e.length));

    if (tags && tags.length > 0) {
        return tagList.every(function (val) { return tags.indexOf(val) >= 0; });
    }

    return false;
}