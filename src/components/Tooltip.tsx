/* eslint-disable react/destructuring-assignment */
export default function Tooltip(btn: HTMLButtonElement, label: string) {
  if (document.querySelector('.tooltip') !== null) return null;
  return btn.insertAdjacentHTML(
    'beforeend',
    `<div class="tooltip">${label}</div>`
  );
}
