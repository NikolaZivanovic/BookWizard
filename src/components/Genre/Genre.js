import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {inputGenre} from "./Genre.actions";
import Button from '@material-ui/core/Button';
import styles from './Genre.scss';
import Header from "../Common/Header/Header";

class Genre extends Component {

    state = {};

    componentDidMount() {
        this.props.genre.forEach(genre => {
            this.setState({
                [genre.id]: this.props.selectedGenre.includes(genre.id.toString()),
            })
        })
    }

    selectGenreClickHandler = e => {
        this.props.inputGenre(e.currentTarget.value);

        const {value} = e.currentTarget;
        this.setState(prevState => ({
            [value]: !prevState[value],
        }))
    };

    renderGenres = () => {
        return this.props.genre.map(genre => (
            <Button
                key={genre.id}
                value={genre.id}
                onClick={e => this.selectGenreClickHandler(e)}
                variant={this.state[genre.id] && 'contained' || 'outlined'}
                size="large"
                color="primary"
            >
                {genre.name}
            </Button>
        ))
    };

    render() {
        return (
            <React.Fragment>
                <Header />
                <div className={styles.Container}>
                    {
                        this.props.genre &&
                        this.renderGenres()
                    }
                </div>
            </React.Fragment>
        )
    }
}

Genre.propTypes = {
    genre: PropTypes.array.isRequired,
    inputGenre: PropTypes.func.isRequired,
    selectedGenre: PropTypes.array,
};

const mapStateToProps = state => ({
    genre: state.initialData.genres,
    selectedGenre: state.genreReducer.data,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    inputGenre,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Genre);

