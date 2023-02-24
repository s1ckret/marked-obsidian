import { marked } from 'marked';
import { markedObsidian } from '../src/index.js';

describe('obsidian', () => {
  beforeEach(() => {
    marked.setOptions(marked.getDefaults());
  });

  test('no options', () => {
    marked.use(markedObsidian());
    expect(marked('example markdown')).toBe('<p>example markdown</p>\n');
  });

  test('markdown not using this extension', () => {
    marked.use(markedObsidian());
    expect(marked('not example markdown')).not.toBe('<p>example html</p>\n');
  });

  test('it should parse obsidian links', () => {
    const options = {
      links: {
        'a link': 'a-link.html'
      }
    };

    marked.use(markedObsidian(options));

    const html = marked.parse('This is [[a link]].');
    expect(html).toBe('<p>This is <a href="a-link.html">a link</a>.</p>\n');
  });

  test('it should parse obsidian links with alt text', () => {
    const options = {
      links: {
        'a link': 'a-link.html'
      }
    };

    marked.use(markedObsidian(options));

    const html = marked.parse('This is [[a link|my cat]].');
    expect(html).toBe('<p>This is <a href="a-link.html">my cat</a>.</p>\n');
  });

  test('it should parse non-existent obsidian links', () => {
    const options = {
      hrefForNonExistentLinks: 'error.html'
    };
    marked.use(markedObsidian(options));

    const html = marked.parse('This is [[a link]].');
    expect(html).toBe('<p>This is <a href="error.html">a link</a>.</p>\n');
  });

  test('it should parse obsidian images', () => {
    const options = {
      links: {
        'an image.png': 'media/an-image.png'
      }
    };

    marked.use(markedObsidian(options));

    const html = marked.parse('This is ![[an image.png]].');
    expect(html).toBe('<p>This is <img src="media/an-image.png" alt="an image.png">.</p>\n');
  });

  test('it should parse non-existent obsidian images', () => {
    const options = {
      srcForNonExistentImages: 'no-image.png'
    };

    marked.use(markedObsidian(options));

    const html = marked.parse('This is ![[an image.png]].');
    expect(html).toBe('<p>This is <img src="no-image.png" alt="an image.png">.</p>\n');
  });
});
