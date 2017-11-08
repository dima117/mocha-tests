import './component.mjs';

describe('idx-admin-tab', function() {
  let el;

  before((done) => {
    el = document.createElement('idx-admin-tab');
    document.body.appendChild(el);
    setTimeout(done, 100);
  });

  after(() => {
    el.parentNode.removeChild(el);
  });

  it('will exist and have certain properties', () => {
    expect(el).to.exist;
    expect(el.attributeChangedCallback).to.be.a('function');
    expect(el.clearSelections).to.be.a('function');
    expect(el.connectedCallback).to.be.a('function');
    expect(el.currentlySelected).to.be.a('function');
    expect(el.updateView).to.be.a('function');
  });

  it('should react to the tabs attribute changing', () => {
    el.setAttribute('tabs', JSON.stringify([
      {
      id: 'imagesetsAll',
      name: 'All Imagesets',
      number: 100,
      selected: true
      },
      {
        id: 'imagesetsReturns',
        name: 'Returns',
        number: 20
      },
      {
        id: 'imagesetsHolds',
        name: 'Holds',
        number: 5
      }
    ]));
    expect(el.tabs).to.be.an('array');
    expect(el.tabs).to.have.length(3);
    expect(el.currentlySelected()).to.be.an('object');
    expect(el.currentlySelected().id).to.be.equal('imagesetsAll');
  });

  it('should react to a tab being selected', () => {
    el.setAttribute('tabs', JSON.stringify([
      {
      id: 'imagesetsAll',
      name: 'All Imagesets',
      number: 100,
      selected: true
      },
      {
        id: 'imagesetsReturns',
        name: 'Returns',
        number: 20
      },
      {
        id: 'imagesetsHolds',
        name: 'Holds',
        number: 5
      }
    ]));
    el.shadowRoot.getElementById('imagesetsReturns').click();
    expect(el.tabs).to.be.an('array');
    expect(el.tabs).to.have.length(3);
    expect(el.currentlySelected()).to.be.an('object');
    expect(el.currentlySelected().id).to.be.equal('imagesetsReturns');
  });
});
