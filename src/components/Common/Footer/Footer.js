import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Button from '@material-ui/core/Button';
import {locationHelper} from './locationHelper';
import styles from './Footer.scss';
import {withRouter} from 'react-router-dom'
import ConfirmationDialog from '../ConfirmationDialog/ConfirmationDialog';
import {clearReducers} from "./ClearData.actions";

class Footer extends Component {

    state = {
        isDialogOpen: false,
        success: false,
        isNextDisabled: true,
    };

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            switch (this.props.location.pathname) {
                case '/': {
                    this.checkIsNextDisabled(this.props.genre);
                    break;
                }
                case '/subgenre': {
                    this.checkIsNextDisabled(this.props.subgenre);
                    break;
                }
                case '/add_subgenre': {
                    this.checkIsNextDisabled(this.props.addSubgenre);
                    break;
                }
                case '/information': {
                    this.checkIsAddDisabled();
                }
            }
        }
    }

    checkIsNextDisabled = data => {
        if (data !== null) {
            this.setState({
                isNextDisabled: false,
            })
        } else {
            this.setState({
                isNextDisabled: true,
            })
        }
    };

    checkIsAddDisabled = () => {
        if ((this.props.isDescriptionRequired || this.props.addSubgenre.isRequired) && this.props.information.description === "") {
            console.log('1')
            this.setState({
                isAddDisabled: true,
            })
        } else {
            console.log('2')
            this.setState({
                isAddDisabled: false,
            })
        }

    };

    nextButtonHandler = () => {
        this.props.history.push(locationHelper(this.props.location.pathname));
    };

    backButtonHandler = () => {
        this.props.history.goBack();
    };

    finishButtonHandler = () => {
        // dispatch API call here and check for errors before opening success
        this.setState(prevState => ({
            isDialogOpen: !prevState.isDialogOpen,
            success: true
        }))
    };

    render() {
        console.log(this.props.addSubgenre)
        const {pathname} = this.props.location;
        const {isDialogOpen, success, isNextDisabled, isAddDisabled} = this.state;
        return (
            <div className={styles.Container}>
                {
                    isDialogOpen &&
                    <ConfirmationDialog open={isDialogOpen} onClose={() => this.finishButtonHandler()} success={success}
                                        clearReducers={() => this.props.clearReducers()}
                                        redirectToRoot={() => this.props.history.push("/")}/>
                }
                <div>
                    {
                        pathname !== '/' &&
                        <Button
                            onClick={() => this.backButtonHandler()}
                            variant='outlined'
                            size="large"
                            color="primary"
                        >
                            BACK
                        </Button>
                    }

                    {
                        pathname !== '/information' &&
                        <Button
                            className={styles.ButtonNext}
                            onClick={() => this.nextButtonHandler()}
                            variant='contained'
                            size="large"
                            color="primary"
                            disabled={isNextDisabled}
                        >
                            NEXT
                        </Button>
                        ||
                        <Button
                            className={styles.ButtonNext}
                            onClick={() => this.finishButtonHandler()}
                            variant='contained'
                            size="large"
                            color="primary"
                            disabled={isAddDisabled}
                        >
                            ADD
                        </Button>

                    }
                </div>
            </div>
        )
    }
}

Footer.propTypes = {
    history: PropTypes.object.isRequired,
    genre: PropTypes.string,
    subgenre: PropTypes.string,
    addSubgenre: PropTypes.object,
    information: PropTypes.object,
    clearReducers: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    isDescriptionRequired: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
    genre: state.genreReducer.data,
    subgenre: state.subgenreReducer.data,
    addSubgenre: state.addSubgenreReducer.data,
    information: state.informationReducer,
    isDescriptionRequired: state.subgenreReducer.isDescriptionRequired,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    history,
    clearReducers,
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Footer));
