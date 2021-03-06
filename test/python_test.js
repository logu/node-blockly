'use strict';

var assert = require('chai').assert;

var Blockly = require('../index.js'),
    ifBlockXml = require('./xml/if');

function xmlToPython(xml) {
  try {
    var xml = Blockly.Xml.textToDom(xml);
  }
  catch (e) {
    return ''
  }

  var workspace = new Blockly.Workspace();
  Blockly.Xml.domToWorkspace(workspace, xml);
  return Blockly.Python.workspaceToCode(workspace);
}

describe('PHP Generator', function() {
  it('should convert valid xml to js code', function() {
    var code = xmlToPython(ifBlockXml);

    assert.equal(code, 'if 6 * 7 == 42:\n  print(\'Dont panic\')\nelse:\n  print(\'Panic\')\n')
  });

  it('should convert invalid xml to empty string', function() {
    var code = xmlToPython('<block type="math_number"><field name="NUM">42</field></block>');

    assert.equal(code, '')
  });
});


