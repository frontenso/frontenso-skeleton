const Assets = require('assets/lib');
const path = require('path');

const PATHS = require('../../../../paths');

const resolver = new Assets();

/**
 * @class
 */
function InlineExtension() {
  this.tags = ['inline'];

  this.parse = function (parser, nodes) {
    // get the tag token
    const tok = parser.nextToken();

    const args = parser.parseSignature(null, true);
    parser.advanceAfterBlockEnd(tok.value);

    // See above for notes about CallExtension
    return new nodes.CallExtensionAsync(this, 'run', args);
  };

  this.run = function (context, url, callback) {
    const pathResolved = path.resolve(PATHS.src.imagesInline + url);
    resolver.data(pathResolved, callback);
  };
}

module.exports = { inlineExtension: new InlineExtension() };
