var React = require('react/addons');
var TestUtils = React.addons.TestUtils;

jest.dontMock('../src/components/Application.jsx');

describe('Application', function () {
  var Application = require('../src/components/Application.jsx');

  it('Hello!', function () {
    var app = TestUtils.renderIntoDocument(<Application />);
    var node = app.getDOMNode();

    expect(app.getDOMNode().textContent).toEqual('Hello! Hello!');
  });
});
