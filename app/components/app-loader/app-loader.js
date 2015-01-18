var AppLoader = React.createClass({
    render: function() {
        return (
            <div className="c-app-loader gray-bg">
                <div className="c-app-loader--message">
                    {iget('App loading...')}
                    <br/>
                    {iget('Please wait')}
                </div>
            </div>
        );
    }
});

module.exports = AppLoader;
