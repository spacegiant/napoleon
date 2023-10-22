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
  const tags: string[] = file.frontmatter.tags;
  if (tags.includes('solo/list')) {
    // TODO: Is void valid here?
    void getRandomListItem(app, file, cb);
  } else if(tags.includes('solo/weighted')) {
    // TODO: Is void valid here?
    void getRandomWeightedListItem(app, file, cb);
  }
};

export default getRandomItem;
