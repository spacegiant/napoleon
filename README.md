## Napoleon (Solo Tools) for Obsidian.md

WIP!!!

Create a note like this:

```
---
tags: 
- solo/list
label: "Kind of animal?"
---
Aardvark
Bear
Chinchilla
Donkey
Eagle
```

The script searches for any markdown files tagged with `solo/list` and then registers a command to output a random item from the list. The command for the above example would run `CMD + P > Solo: Animals`. The Command is named using the label.

Future plans: other list types such as weighted lists (in csv format probably), lists that have two tables linked (e.g. mythic action/subject).



### How to use

- Clone this repo.
- `npm i` or `yarn` to install dependencies
- `npm run dev` to start compilation in watch mode.

### Manually installing the plugin

- Copy over `main.js`, `styles.css`, `manifest.json` to your vault `VaultFolder/.obsidian/plugins/your-plugin-id/`.

### API Documentation

See https://github.com/obsidianmd/obsidian-api
