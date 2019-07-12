import React, {Component} from 'react';
import PropTypes from 'prop-types';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';

const MESSAGE = {
    success: "Book successfully added!",
    error: "Please complete the process"
};

const LABEL = {
    success: "Add another book",
    error: "Ok"
};

class ConfirmationDialog extends Component {

    handleOnClick = () => {
        if(this.props.success) {
            this.props.clearReducers();
            this.props.onClose();
            this.props.redirectToRoot();
        } else {
            this.props.onClose();
        }
    };

    render() {
        return (
            <Dialog onClose={this.props.onClose} aria-labelledby="simple-dialog-title" open={this.props.open}>
                <DialogTitle id="simple-dialog-title">{this.props.success && MESSAGE.success || MESSAGE.error}</DialogTitle>
                <Button
                    onClick={() => this.handleOnClick()}
                    variant='contained'
                    size="large"
                    color="primary"
                >
                    {
                        this.props.success &&
                        LABEL.success
                        ||
                        LABEL.error
                    }
                </Button>
            </Dialog>
        )
    }

}

ConfirmationDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    success: PropTypes.bool.isRequired,
    clearReducers: PropTypes.func.isRequired,
    redirectToRoot: PropTypes.func.isRequired,
};

export default ConfirmationDialog;
