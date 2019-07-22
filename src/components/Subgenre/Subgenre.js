import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router-dom'
import {inputSubgenre, addSubgenreSelected} from "./Subgenre.actions";
import Button from '@material-ui/core/Button';
import styles from './Subgenre.scss';
import APP_ROUTES from 'Config/appRoutes';
import Header from "../Common/Header/Header";

class Subgenre extends Component {

    state = {
        selectedSubgenre: this.createInitialState()
    };

     createInitialState() {
        if(this.props.selectedSubgenre !== null) {
            return this.props.selectedSubgenre;
        }
        return null;
    };

    getSubgenres = () => {
        let subgenres = null;
        this.props.genre.forEach(genre => {
            if(genre.id.toString() === this.props.selectedGenre) subgenres = genre.subgenres;
        });
        return subgenres;
    };

    renderSubgenres = () => {
        return this.getSubgenres().map(subgenre => (
            <Button
                className={styles.SubgenreButton}
                key={subgenre.id}
                value={subgenre.id}
                onClick={e => this.selectSubgenreClickHandler(e, subgenre.isDescriptionRequired)}
                variant={this.state.selectedSubgenre === subgenre.id.toString() && 'contained' || 'outlined'}
                size="large"
                color="primary"
                disabled={this.props.isAddSubgenreSelected}
            >
                {subgenre.name}
            </Button>
        ))
    };

    selectSubgenreClickHandler = (e, isDescriptionRequired) => {
        const {value} = e.currentTarget;
        this.props.inputSubgenre(value, isDescriptionRequired);
        this.setState({
            selectedSubgenre: value
        })
    };

    addSubgenreClickHandler = () => {
        this.props.addSubgenreSelected();
        this.props.history.push(APP_ROUTES.ADD_SUBGENRE);
    };

    render() {
        return (
            <React.Fragment>
                <Header/>
                <div className={styles.Container}>
                    {
                        this.props.genre &&
                        this.props.selectedGenre &&
                        this.renderSubgenres()
                    }
                    <Button
                        className={styles.SubgenreButton}
                        onClick={() => this.addSubgenreClickHandler()}
                        variant='contained'
                        size="large"
                        color="primary"
                        disabled={this.state.selectedSubgenre !== null}

                    >
                        Add Subgenre
                    </Button>
                </div>
            </React.Fragment>
        )
    }
}

Subgenre.propTypes = {
    genre: PropTypes.array.isRequired,
    selectedGenre: PropTypes.string.isRequired,
    inputSubgenre: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    selectedSubgenre: PropTypes.string,
    addSubgenreSelected: PropTypes.func.isRequired,
    isAddSubgenreSelected: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
    genre: state.initialData.genres,
    selectedGenre: state.genreReducer.data,
    selectedSubgenre: state.subgenreReducer.data,
    isAddSubgenreSelected: state.subgenreReducer.isAddSubgenreSelected,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    inputSubgenre,
    addSubgenreSelected,
    history,
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Subgenre));
