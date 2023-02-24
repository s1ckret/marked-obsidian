const defaultOptions = {
  links: {},
  hrefForNonExistentLinks: 'non-existent-link.html',
  srcForNonExistentImages: 'non-existent-image.png'
};

export function markedObsidian(options) {
  options = {
    ...defaultOptions,
    ...options
  };

  return {
    extensions: [
      {
        name: 'obsidian',
        level: 'inline',
        start(src) {
          return src.match(/^[^!]?\[\[/)?.index;
        },
        tokenizer(src, tokens) {
          const imageRule = /^!\[\[(.+?)\]\]/;
          const imageMatch = imageRule.exec(src);
          if (imageMatch) {
            const link = imageMatch[1];
            let src = options.links[link];

            if (!src) {
              src = options.srcForNonExistentImages;
            }

            return {
              type: 'obsidian',
              raw: imageMatch[0],
              link,
              src
            };
          }

          const linkRule = /^\[\[(.+?)([|](.+?)?)?\]\]/;
          const linkMatch = linkRule.exec(src);
          if (linkMatch) {
            const link = linkMatch[1];
            let href = options.links[link];

            if (!href) {
              href = options.hrefForNonExistentLinks;
            }
            const alt = linkMatch[3];

            return {
              type: 'obsidian',
              raw: linkMatch[0],
              link,
              href,
              alt
            };
          }
        },
        renderer(token) {
          if (token.src) {
            return `<img src="${token.src}" alt="${token.link}">`;
          } else {
            return `<a href="${token.href}">${token.alt ? token.alt : token.link}</a>`;
          }
        }
      }
    ]
  };
}
