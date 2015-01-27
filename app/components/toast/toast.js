var React = require('react'),
    ReactToastr = require('react-toastr'),
    flux = require('../../flux'),
    ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.jQuery);

var { ToastContainer } = ReactToastr;

var Toast = React.createClass({
    componentDidMount: function() {
        var ToastStore = flux.store('ToastStore');

        ToastStore.on('toast_add', this.showToast.bind(this));
    },


    showToast: function() {
        var title = iget("Don't touch me, mmm'kay"),
            message = iget('This part of application not implemented yet');

        this.refs.toasts.warning(message, title, {
            timeOut: 3000,
            extendedTimeOut: 10000
        });
    },

    render: function() {
        return (
            <ToastContainer ref="toasts"
                toastMessageFactory={ToastMessageFactory}
                id="toast-container"
                className="toast-top-right" />
        );
    }
});

module.exports = Toast;
