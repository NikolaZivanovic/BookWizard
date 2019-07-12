import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { locationHelper } from './locationHelper';
import styles from './Footer.scss';
import {withRouter} from 'react-router-dom'
import ConfirmationDialog from '../ConfirmationDialog/ConfirmationDialog';
import { INIT_STATE_GENRE } from "../../Genre/Genre.reducer";
import { INIT_STATE_SUBGENRE } from "../../Subgenre/Subgenre.reducer";
import { INIT_STATE_ADD_SUBGENRE } from "../../AddSubgenre/AddSubgenre.reducer";
import { INIT_STATE_INFORMATION } from "../../Information/Information.reducer";
import { clearReducers } from "./ClearData.actions";

class Footer extends Component {

    state = {
        isDialogOpen: false,
        success: false,
    };

    nextButtonHandler = () => {
        this.props.history.push(locationHelper(this.props.location.pathname));
    };

    backButtonHandler = () => {
        this.props.history.goBack();
    };

    finishButtonHandler = () => {
        if(this.isProcessComplete()){
            this.setState(prevState => ({
                isDialogOpen: !prevState.isDialogOpen,
                success: true
            }))
        } else {
            this.setState(prevState => ({
                isDialogOpen: !prevState.isDialogOpen,

            }))
        }
    };

    isGenreInputComplete = () => {
        return this.props.genre === INIT_STATE_GENRE.data;
    };

    isSubgenreInputComplete = () => {
        if(this.props.subgenre !== INIT_STATE_SUBGENRE.data || this.props.addSubgenre !== INIT_STATE_ADD_SUBGENRE.data) {
            return false
        }
        return true;
    };

    isInformationInputComplete = () => {
        return this.props.information === INIT_STATE_INFORMATION;
    };

    isProcessComplete = () => {
        return this.isGenreInputComplete() === false && this.isSubgenreInputComplete() === false && this.isInformationInputComplete() === false;
    };

    render() {
        const { pathname } = this.props.location;
        const { isDialogOpen, success } = this.state;
        return (
            <div className={styles.Container}>
                {
                    isDialogOpen &&
                        <ConfirmationDialog open={isDialogOpen} onClose={() => this.finishButtonHandler()} success={success} clearReducers={() => this.props.clearReducers()} redirectToRoot={() => this.props.history.push("/")}/>
                }
                <div>
                    <Button
                        onClick={() => this.finishButtonHandler()}
                        variant='contained'
                        size="large"
                        color="primary"
                    >
                        FINISH
                    </Button>
                </div>
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
                        >
                            NEXT
                        </Button>
                    }
                </div>
            </div>
        )
    }
}

Footer.propTypes = {
    history: PropTypes.object.isRequired,
    genre: PropTypes.array,
    subgenre: PropTypes.array,
    addSubgenre: PropTypes.object,
    information: PropTypes.object,
    clearReducers: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    genre: state.genreReducer.data,
    subgenre: state.subgenreReducer.data,
    addSubgenre: state.addSubgenreReducer.data,
    information: state.informationReducer,
});

const mapDispatchToProps = dispatch => bindActionCreators( {
    history,
    clearReducers,
}, dispatch );

export default withRouter(connect( mapStateToProps, mapDispatchToProps )( Footer ));
