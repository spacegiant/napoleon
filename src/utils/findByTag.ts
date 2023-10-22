import { type MetadataCache, type TFile, getAllTags } from 'obsidian';
export function FilterMDFilesByTags(
  file: TFile,
  tagList: string[],
  metadataCache: MetadataCache
): boolean {
  if (!tagList) {
    return true;
  }
  const fileCache = metadataCache.getFileCache(file);
  const allTags = fileCache && getAllTags(fileCache);
  const tags = allTags?.map((e) => e.slice(1, e.length));

  if (tags && tags.length > 0) {
    return tagList.every(function (val) {
      return tags.includes(val);
    });
  }

  return false;
}
