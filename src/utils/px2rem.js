import { on } from './dom-helpers/events';

export default function px2rem(doucment, window) {
  const docEl = document.documentElement;
  const resizeEvent = 'orientationchange' in window ? 'orientationchange' : 'resize';
  const recalc = () => {
    const clientWidth = docEl.clientWidth;
    if (!clientWidth) {
      return;
    }
    docEl.style.fontSize = `${(20 * (clientWidth / 320))}px`;
  };
  if (!docEl.addEventListener) {
    return;
  }
  on(window, resizeEvent, recalc);
  on(doucment, 'DOMContentLoaded', recalc, false);
}
