import type { App } from 'obsidian';

const getRandomListItem: (
  app: App,
  file: any,
  cb: (value: string) => void
) => Promise<void> = async (
  app: App,
  file: any,
  cb: (value: string) => void
) => {
  console.log(file);
  const offset = file.frontmatterPosition.end.offset;
  // console.log("TYPEOF = ", typeof file);
  const path = app.metadataCache.getFirstLinkpathDest(file.name, file.path);
  if (!path) return;
  await app.vault
    .cachedRead(path)
    .then((value) => {
      const sourceText = value.substring(offset).trim();
      const items = sourceText.split(/\r?\n/);
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
      const prefix = file.frontmatter.label ? file.frontmatter.label + ' ' : '';

      const roll = Math.floor(Math.random() * items.length);
      const text = `${prefix}${items[roll]}`;
      cb(text);
    })
    .catch((error) => {
      console.log(error);
    });
};

export default getRandomListItem;
