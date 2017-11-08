export default `
:host([colors]) {
  display: block;
  width: 100%;
  height: 36px;
}

#tab-container {
  display: flex;
  align-items: flex-start;
}

#tab-container .tab {
  display: flex;
  padding: 6px 16px 4px 10px;
  align-items: flex-start;
  cursor: pointer;
}

#tab-container .tab.selected,
#tab-container .tab:hover {
  background-color: var(--active-background-color, #e1edc1);
}

#tab-container .tab .name {
  font-size: 1.25em;
  margin-right: 12px;
  flex-wrap: nowrap;
  line-height: 1.25em;
  font-family: var(--name-font-family, serif);
}

#tab-container .tab .number {
  font-size: 0.75em;
  line-height: 1.5em;
  background-color: var(--number-background-color, #6b6b6b);
  color: var(--number-text-color, #f4f4f4);
  padding: 3px 6px;
  border-radius: 12px;
}

`
