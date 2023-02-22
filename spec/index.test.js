import { marked } from 'marked';
import obsidian from '../src/index.js';

describe('obsidian', () => {
  beforeEach(() => {
    marked.setOptions(marked.getDefaults());
  });

  test('no options', () => {
    marked.use(obsidian());
    expect(marked('example markdown')).toBe('<p>example html</p>\n');
  });

  test('markdown not using this extension', () => {
    marked.use(obsidian());
    expect(marked('not example markdown')).not.toBe('<p>example html</p>\n');
  });
});
