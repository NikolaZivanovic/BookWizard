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

    state = {};

    componentDidMount() {
        this.removeSubgenresFromReducer(this.subgenres);
        this.subgenres.forEach(subgenre => {
            this.setState({
                [subgenre.id]: this.props.selectedSubgenre.includes(subgenre.id),
            })
        })
    }

    mapSelectedGenres = () => {
        this.subgenres = [];
        this.props.selectedGenre.map(selectedGenre => {
            this.props.genre.map(genre => {
                if (genre.id == selectedGenre) {
                    genre.subgenres.forEach(subgenre => {
                        this.subgenres.push(subgenre)
                    });
                }
            })
        });
    };

    removeSubgenresFromReducer = subgenres => {
        let keepSubgenres = [];
        this.props.selectedSubgenre.forEach(selectedSubgenre => {
            subgenres.forEach(subgenre => {
                if (selectedSubgenre === subgenre.id) {
                    keepSubgenres.push(subgenre.id);
                }
            })
        });
        if (keepSubgenres.length > 0) {
            this.props.inputSubgenre(keepSubgenres);
        } else this.props.inputSubgenre('remove')
    };

    renderSubgenres = () => {
        this.mapSelectedGenres();

        return this.subgenres.map(subgenre => (
            <Button
                className={styles.SubgenreButton}
                key={subgenre.id}
                value={subgenre.id}
                onClick={e => this.selectSubgenreClickHandler(e)}
                variant={this.state[subgenre.id] && 'contained' || 'outlined'}
                size="large"
                color="primary"
            >
                {subgenre.name}
            </Button>
        ))
    };

    selectSubgenreClickHandler = e => {
        this.props.inputSubgenre(e.currentTarget.value);

        const {value} = e.currentTarget;
        this.setState(prevState => ({
            [value]: !prevState[value],
        }))
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
    selectedGenre: PropTypes.array,
    inputSubgenre: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    selectedSubgenre: PropTypes.array,
    addSubgenreSelected: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    genre: state.initialData.genres,
    selectedGenre: state.genreReducer.data,
    selectedSubgenre: state.subgenreReducer.data,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    inputSubgenre,
    addSubgenreSelected,
    history,
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Subgenre));
