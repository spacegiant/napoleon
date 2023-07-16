import { type MetadataCache, type TFile, getAllTags } from 'obsidian';
export function FilterMDFilesByTags(
  file: TFile,
  tagList: string[],
  metadataCache: MetadataCache
): boolean {
  // export function FilterMDFilesByTags(file, tagList, metadataCache) {
  if (!tagList) {
    return true;
  }
  const fileCache = metadataCache.getFileCache(file);
  const allTags = fileCache && getAllTags(fileCache);
  console.log(allTags);
  const tags = allTags?.map((e) => e.slice(1, e.length));
  console.log(tags);

  if (tags && tags.length > 0) {
    return tagList.every(function (val) {
      return tags.includes(val);
    });
  }

  return false;
}
