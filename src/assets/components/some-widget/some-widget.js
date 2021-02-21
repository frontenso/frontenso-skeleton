/**
 * @class
 */
class SomeWidget {
  currentIndex = 0;
  timeout = 2000;

  constructor() {
    /** @type {Array} */
    this.itemArr = [];

    this.containerNode = document.querySelector('[data-widget]');
    if (!this.containerNode) {
      return;
    }
    const itemEls = this.containerNode.querySelector('[data-widget-items]');
    if (!itemEls) {
      return;
    }

    this.itemArr = Array.from(itemEls.children);

    this.update();

    setInterval(() => {
      this.next();
    }, this.timeout);
  }

  /** @returns {void} */
  next() {
    this.currentIndex =
      this.currentIndex < this.itemArr.length - 1 ? this.currentIndex + 1 : 0;
    this.update();
  }

  /** @returns {void} */
  update() {
    this.itemArr.forEach((node) => {
      node.style.opacity = '0';
    });
    const currentItemNode = this.itemArr[this.currentIndex];
    currentItemNode.style.opacity = '1';
  }
}

export default new SomeWidget();
