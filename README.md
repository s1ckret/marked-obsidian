
# marked-obsidian

An extension to marked library to parse Obsidian links

# Usage
```js
import {marked} from "marked";
import obsidian from "marked-obsidian";

const options = {
	// |default options|
};

marked.use(obsidian(options));

marked.parse("|example markdown|");
// <p>|example html|</p>
```

## `options`

<!-- TBD -->
