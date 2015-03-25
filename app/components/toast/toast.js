var React = require('react'),
    flux = require('../../flux');


var Toast = React.createClass({

        ToastStore.on('toast_add', this.showToast);
    },

    render: function() {
        return <span></span>;
    }
});

module.exports = Toast;
