import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import Button from '@material-ui/core/Button';
import styles from './ConfirmationDialog.scss';
import {clearReducers} from "../Footer/ClearData.actions";
import {connect} from "react-redux";
import {withRouter} from 'react-router-dom'

class ConfirmationDialog extends Component {

    componentDidMount() {
        window.scrollTo(0,0);
    }

    handleOnClick = () => {
        this.props.clearReducers();
        this.props.history.push("/");
    };

    render() {
        return (
            <div className={styles.Container}>
                <h1>Book added successfully!</h1>
                <Button
                    className={styles.DialogButton}
                    onClick={() => this.handleOnClick()}
                    variant='contained'
                    size="large"
                    color="primary"
                >
                    Add another book
                </Button>
            </div>


        )
    }
}

ConfirmationDialog.propTypes = {
    history: PropTypes.object.isRequired,
    clearReducers: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => bindActionCreators({
    history,
    clearReducers,
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ConfirmationDialog));

