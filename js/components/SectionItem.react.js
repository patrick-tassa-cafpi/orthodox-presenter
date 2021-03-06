var React = require('react');
var PropTypes = require('prop-types');
var createReactClass = require('create-react-class');
var NavActions = require('../actions/NavActions');
var SectionActions = require('../actions/SectionActions');
var NavSubMenuStore = require('../stores/NavSubMenuStore');
var classNames = require('classnames');

var SectionItem = createReactClass({

    propTypes: {
        sectionItem: PropTypes.object.isRequired,
        attributes: PropTypes.object.isRequired
    },

    getInitialState: function () {
        return {
            isLeaf: typeof this.props.sectionItem["node"] === 'undefined',
            loadDoc: typeof this.props.sectionItem["load"] != 'undefined'
        }
    },

    componentDidMount: function () {
        NavSubMenuStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function () {
        NavSubMenuStore.removeChangeListener(this._onChange);
    },
    /*
    componentWillUpdate: function () {
        var sectionItem = this.props.sectionItem;
        var attributes = this.props.attributes;
        console.log(sectionItem.load)
        SectionActions.load(sectionItem.load, attributes);
    },
    */
    render: function () {
        var sectionItem = this.props.sectionItem;

        return (
            <li key={sectionItem.id} className="sidebar-brand nav-menu-item" onClick={this._onClick}>
                <a href={null}>{sectionItem.title}</a>
            </li>
        );
    },

    _onClick: function () {
        var sectionItem = this.props.sectionItem;
        var attributes = this.props.attributes;
        if (attributes.autoLoad) {
            NavActions.setState("autoLoad");
        }

        if (typeof sectionItem["node"] != 'undefined') {
            NavActions.next(sectionItem.id);
        } else if (this.state.loadDoc && this.state.isLeaf) {
            SectionActions.load(sectionItem.load, attributes);
        }
    },

    _onChange: function () {
        var sectionItem = this.props.sectionItem;
        var attributes = this.props.attributes;
        //SectionActions.load(sectionItem.load, attributes);
    }
});

module.exports = SectionItem;
