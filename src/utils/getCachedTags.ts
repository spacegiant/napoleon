import { CachedMetadata } from 'obsidian';

// Source: https://github.com/erichalldev/obsidian-smart-random-note/blob/e17078681af5659c0400c4924cf8424dfa6d3b2a/src/utilities.ts#L30
function getCachedTags(cachedMetadata: CachedMetadata): string[] {
    console.log(cachedMetadata)
    const bodyTags: string[] = cachedMetadata.tags?.map((x) => x.tag) || [];
    const frontMatterTags: string[] = cachedMetadata.frontmatter?.tags || [];

    // frontmatter tags might not have a hashtag in front of them
    const cachedTags = bodyTags.concat(frontMatterTags).map((x) => (x.startsWith('#') ? x : '#' + x));

    return cachedTags;
}

export default getCachedTags;
