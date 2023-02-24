# marked-obsidian

An extension to marked library to parse Obsidian links.

# Usage

```js
import { marked } from 'marked';
import obsidian from 'marked-obsidian';

const options = {
  links: {
    'Primary key': 'primary-key.html'
  }
};

marked.use(obsidian(options));

marked.parse('[[Primary key]] is used to uniquely identify objects.');
// <p><a href="primary-key.html">Primary key</a> is used to uniquely identify objects.</p>
```

## `options`

- `links` - is an object, where key is an obsidian link, value is HTML link.
- `hrefForNonExistentLinks` - HTML link for non-existent obsidian links.
- `srcForNonExistentImages` - source for non-existent images.

### `defaultOptions`

```js
const defaultOptions = {
  links: {},
  hrefForNonExistentLinks: 'non-existent-link.html',
  srcForNonExistentImages: 'non-existent-image.png'
};
```
