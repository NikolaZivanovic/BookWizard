import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import styles from './AddSubgenre.scss';
import {inputAddSubgenre} from "./AddSubgenre.actions";
import Header from "../Common/Header/Header";

class AddSubgenre extends Component {

    state = {
        subgenreName: this.props.addSubgenre.subgenreName || '',
        description: this.props.addSubgenre.description || '',
        isRequired: this.props.addSubgenre.isRequired || false,
    };

    handleTextAreaInput = e => {
        const {name, value} = e.currentTarget;
        this.setState({
            [name]: value
        }, () => this.props.inputAddSubgenre(this.state))
    };

    handleCheckBox = () => {
        this.setState(prevState => ({
            isRequired: !prevState.isRequired
        }), () => this.props.inputAddSubgenre(this.state))
    };

    render() {
        return (
            <React.Fragment>
                <Header />
                <div className={styles.Container}>
                    <TextField
                        className={styles.SubgenreName}
                        name="subgenreName"
                        onChange={e => this.handleTextAreaInput(e)}
                        id="outlined"
                        label="Subgenre name"
                        margin="normal"
                        variant="outlined"
                        defaultValue={this.state.subgenreName}
                    />

                    <TextField
                        id="outlined-multiline-static"
                        name="description"
                        onChange={e => this.handleTextAreaInput(e)}
                        label="Type the description..."
                        multiline
                        rows="4"
                        margin="normal"
                        variant="outlined"
                        defaultValue={this.state.description}
                    />

                    <FormControlLabel
                        control={
                            <Checkbox
                                defaultChecked={this.state.isRequired}
                                value="checkedB"
                                onChange={() => this.handleCheckBox()}
                                color="primary"
                            />
                        }
                        label="Description is required for this subgenre"
                    />
                </div>
            </React.Fragment>
        )
    }
}

AddSubgenre.propTypes = {
    inputAddSubgenre: PropTypes.func.isRequired,
    addSubgenre: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    addSubgenre: state.addSubgenreReducer.data,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    inputAddSubgenre,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AddSubgenre);
