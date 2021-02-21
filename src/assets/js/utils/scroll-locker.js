/**
 *
 * @returns {{unlock: function, lock: function} | null}
 * @constructor
 */
function ScrollLocker() {
  if (typeof document == 'undefined') {
    return null;
  }

  const element = document.body;

  function lock() {
    element.style.overflow = 'hidden';
  }

  function unlock() {
    element.style.overflow = '';
  }

  return {
    lock,
    unlock,
  };
}

const scrollLocker = new ScrollLocker();

export default scrollLocker;
