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
            this.setState({
                isAddDisabled: true,
            })
        } else {
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
        this.props.history.push('/success')
    };

    render() {
        const {pathname} = this.props.location;
        const {isNextDisabled, isAddDisabled} = this.state;
        return (
            <div className={styles.Container}>
                <div>
                    {
                        pathname !== '/' &&
                        pathname !== '/success' &&
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
                        pathname !== '/success' &&
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
                        pathname !== '/success' &&
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
