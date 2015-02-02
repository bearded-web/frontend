describe('StartScanButton', function() {
    jest.dontMock('../start-scan-button');
    jest.dontMock('react/addons');
    jest.dontMock('../../../flux');


    it('must call actions.scan.createScans if clicked', function() {

        var React = require('react/addons');
        var StartScanButton = require('../start-scan-button');
        var TestUtils = React.addons.TestUtils;
        var flux = require('../../../flux');

        var project = '1',
            target = '2',
            plan = '3';


        // Render a checkbox with label in the document
        var btn = TestUtils.renderIntoDocument(
            <StartScanButton project={project} target={target} plan={plan} />
        );

        var mockCreateScan = flux.actions.scan.createScan = jest.genMockFunction();

        TestUtils.Simulate.click(btn.getDOMNode());

        expect(mockCreateScan).toBeCalledWith(target, project, plan);
    });
});
