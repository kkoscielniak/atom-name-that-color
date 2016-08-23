'use babel';

import AtomNameThatColorView from './atom-name-that-color-view';
import { CompositeDisposable } from 'atom';

export default {

  atomNameThatColorView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.atomNameThatColorView = new AtomNameThatColorView(state.atomNameThatColorViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.atomNameThatColorView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-name-that-color:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.atomNameThatColorView.destroy();
  },

  serialize() {
    return {
      atomNameThatColorViewState: this.atomNameThatColorView.serialize()
    };
  },

  toggle() {
    console.log('AtomNameThatColor was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
