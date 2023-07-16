import { type App } from 'obsidian';

const getRandomWeightedListItem: (
  app: App,
  file: any,
  cb: (value: string) => void
) => Promise<void> = async (
  app: App,
  file: any,
  cb: (value: string) => void
) => {
  const offset = file.frontmatter.position.end.offset;
  const path = app.metadataCache.getFirstLinkpathDest(file.name, file.path);

  if (path == null) return;

  await app.vault
    .cachedRead(path)
    .then((value) => {
      const sourceText = value.substring(offset).trim();
      const items = sourceText.split(/\r?\n/);
      const itemsBounds: number[] = [];
      let prevUpperBounds = 0;

      // Total upper bounds for
      items.forEach((item) => {
        const parts = item.split('|');
        const UpperBounds = parseInt(parts[0]) + prevUpperBounds;
        itemsBounds.push(UpperBounds);
        prevUpperBounds = UpperBounds;
      });
      console.log(itemsBounds);
      const totalBounds = itemsBounds[itemsBounds.length - 1];
      const roll = Math.floor(Math.random() * totalBounds + 1);

      const index = itemsBounds.findIndex((upperBounds) => {
        return upperBounds >= roll;
      });

      const result = items[index].split('|')[1].trim();
      const text = `1d${totalBounds} = ${roll} : ${result}`;

      console.log(
        `roll ${roll}, index ${index}, ${items[index].split('|')[1]}`
      );

      cb(text);
    })
    .catch((error) => {
      console.log(error);
    });
};

export default getRandomWeightedListItem;
