import type { App, CachedMetadata } from 'obsidian';
import type { TaggedFilesCollection } from 'src/types';

function getTaggedFiles(app: App): TaggedFilesCollection | undefined {
  const metadataCache = app.metadataCache;
  const markdownFiles = app.vault.getMarkdownFiles();
  const randomTables: TaggedFilesCollection = [];

  for (const markdownFile of markdownFiles) {
    const cachedMetadata: CachedMetadata | null = metadataCache.getFileCache(markdownFile);
    // if (cachedMetadata?.frontmatter?.tags == null) return;

    const tags: string[] = cachedMetadata?.frontmatter?.tags;

    // TODO: Add this to settings
    const randomTableTag = "solo";

    const isRandomTableTag = (tag: string, randomTableTag: string): boolean => {
      return tag.split("/")[0] === randomTableTag;
    };

    const isRandomTable = (tag: string | string[]): boolean | undefined => {
      if (typeof tags === 'string') {
        return isRandomTableTag(tags, randomTableTag);
       } else if (Array.isArray(tags)) {
        return tags.filter(tag => isRandomTableTag(tag, randomTableTag)).length > 0;
       }
    }

    isRandomTable(tags) && randomTables.push(Object.assign({}, markdownFile, cachedMetadata))


    
 



  }

  return randomTables;

}

export default getTaggedFiles;
