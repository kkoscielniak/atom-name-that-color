'use babel';

import { CompositeDisposable } from 'atom';
import ntc from './ntc';

export default {

  subscriptions: null,

  activate(state) {

    this.subscriptions = new CompositeDisposable();

    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'color:name': () => this.nameThatColor()
    }));
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  nameThatColor() {
    let editor;
    if (editor = atom.workspace.getActiveTextEditor()) {

      let selectedText = editor.getSelectedText();
      if (selectedText.length !== 0) {
        let colorName =
          "$color_" + ntc.name(selectedText)[1]
          .replace(/\s+/g, '-')
          .toLowerCase() + ": #" + selectedText + ";";

        console.log(colorName);

        editor.insertText(colorName);
      }
    }
  }

};
