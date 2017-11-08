import css from './css.mjs';
import isJson from '../esm-utils/isJson.mjs';

const {bind, hyper, wire} = hyperHTML;

class IdxAdminTab extends HTMLElement {
  constructor() {
    super();
    this.tabs = this.tabs || [];
  }

  attributeChangedCallback(name, oVal, nVal) {
    if (name === 'tabs' && isJson(nVal)) {
      this.tabs = JSON.parse(nVal);
      this.tabs.forEach((tab) => {
        tab.number = parseInt(tab.number, 10).toLocaleString();
        tab.tabSelected = (e) => {
          let id = e.target.id;
          let selectedTab = this.tabs.find((_tab) => _tab.id === id);
          this.clearSelections();
          if (selectedTab) selectedTab.selected = true;
          this.updateView();
          document.dispatchEvent(new CustomEvent('idxTabChanged', {detail: id}));
        };
      });
      this.updateView();
    }
  }

  clearSelections() {
    this.tabs.forEach((tab) => {
      tab.selected = false;
    });
  }

  connectedCallback() {
    this.attachShadow({mode: 'open'});
    this.updateView();
  }

  currentlySelected() {
    return this.tabs.find((tab) => tab.selected);
  }

  disconnectedCallback() {
    this.tabs = [];
    this.updateView();
  }

  updateView() {
    hyper(this.shadowRoot)`
      <style>${css}</style>
      <div id="tab-container">
      ${this.tabs.map(tab => wire(tab)`
        <div class="${tab.selected ? 'tab selected' : 'tab'}" onclick="${tab.tabSelected}">
          <div class="name" id="${tab.id}">${tab.name}</div>
          <div class="number">${tab.number}</div>
        </div>
      `)}
      </div>
      `;
    // if (this.element) patch(this.element, render, this);
  }

  static get observedAttributes() {
    return ['tabs'];
  }
}

customElements.define('idx-admin-tab', IdxAdminTab);

export { IdxAdminTab };
