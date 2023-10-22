import type { App } from 'obsidian';
import getRandomListItem from './getRandomListItem';
import getRandomWeightedListItem from './getRandomWeightedListItem';

const getRandomItem: (
  app: App,
  file: any,
  cb: (value: string) => void
) => Promise<void> = async (
  app: App,
  file: any,
  cb: (value: string) => void
) => {
  console.log(file.frontmatter.tags);
  const tags: string[] = file.frontmatter.tags;
  if (tags.includes('solo/list')) {
    getRandomListItem(app, file, cb);
  } else if(tags.includes('solo/weighted')) {
    getRandomWeightedListItem(app, file, cb);
  }
};

export default getRandomItem;
