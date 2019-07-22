import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import styles from './Information.scss';
import {inputInformation} from "./Information.actions";
import Header from "../Common/Header/Header";

class Information extends Component {

    handleInput = e => {
        const payload = {
            [e.target.name]: e.target.value,
        };
        this.props.inputInformation(payload);
    };

    render() {
        const {
            title,
            author,
            isbn,
            publisher,
            pages,
            format,
            edition,
            language,
            description,
        } = this.props.information;
        return (
            <React.Fragment>
                <Header/>
                <div className={styles.Container}>
                    <TextField
                        value={title}
                        autoComplete="off"
                        className={styles.InformationInput}
                        onChange={e => this.handleInput(e)}
                        name="title"
                        id="outlined"
                        label="Book title"
                        margin="normal"
                        variant="outlined"
                    />

                    <FormControl className={styles.InformationInput} variant="outlined">
                        <InputLabel htmlFor="outlined-author-simple">
                            Author
                        </InputLabel>
                        <Select
                            value={author}
                            onChange={e => this.handleInput(e)}
                            input={<OutlinedInput labelWidth={50} name="author" id="outlined-author-simple"/>}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value="Dan Abnett">Dan Abnett</MenuItem>
                            <MenuItem value="Graham McNeill">Graham McNeill</MenuItem>
                            <MenuItem value="Ben Counter">Ben Counter</MenuItem>
                        </Select>
                    </FormControl>

                    <TextField
                        value={isbn}
                        autoComplete="off"
                        className={styles.InformationInput}
                        onChange={e => this.handleInput(e)}
                        name="isbn"
                        id="outlined"
                        label="ISBN"
                        margin="normal"
                        variant="outlined"
                    />

                    <FormControl className={styles.InformationInput} variant="outlined">
                        <InputLabel htmlFor="outlined-publisher-simple">
                            Publisher
                        </InputLabel>
                        <Select
                            value={publisher}
                            onChange={e => this.handleInput(e)}
                            input={<OutlinedInput labelWidth={70} name="publisher" id="outlined-publisher-simple"/>}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value="Dan Abnett">Black Library</MenuItem>
                            <MenuItem value="Graham McNeill">Penguin Random House</MenuItem>
                            <MenuItem value="Ben Counter">Hachette Livre</MenuItem>
                        </Select>
                    </FormControl>

                    <TextField
                        className={styles.DatePicker}
                        onChange={e => this.handleInput(e)}
                        name="date"
                        id="date"
                        label="Date published"
                        type="date"
                        defaultValue="2019-05-24"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />

                    <TextField
                        value={pages}
                        autoComplete="off"
                        className={styles.PagesInput}
                        onChange={e => this.handleInput(e)}
                        name="pages"
                        id="outlined"
                        label="Number of pages"
                        margin="normal"
                        variant="outlined"
                    />

                    <FormControl className={styles.FormatInput} variant="outlined">
                        <InputLabel htmlFor="outlined-format-simple">
                            Format
                        </InputLabel>
                        <Select
                            value={format}
                            onChange={e => this.handleInput(e)}
                            input={<OutlinedInput labelWidth={50} name="format" id="outlined-format-simple"/>}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value="Hardcover">Hardcover</MenuItem>
                            <MenuItem value="E-book">E-book</MenuItem>
                            <MenuItem value="Audiobook">Audiobook</MenuItem>
                            <MenuItem value="Chapbook">Chapbook</MenuItem>
                        </Select>
                    </FormControl>

                    <div className={styles.EditionContainer}>
                        <div className={styles.EditionElements}>
                            <TextField
                                value={edition}
                                autoComplete="off"
                                className={styles.EditionElementsInput}
                                onChange={e => this.handleInput(e)}
                                name="edition"
                                id="outlined"
                                label="Edition"
                                margin="normal"
                                variant="outlined"
                            />
                        </div>
                        <div className={styles.EditionElements}>
                            <FormControl className={styles.EditionElementsSelect} variant="outlined">
                                <InputLabel htmlFor="outlined-language-simple">
                                    Edition language
                                </InputLabel>
                                <Select
                                    value={language}
                                    onChange={e => this.handleInput(e)}
                                    input={<OutlinedInput labelWidth={120} name="language"
                                                          id="outlined-language-simple"/>}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value="en">English</MenuItem>
                                    <MenuItem value="nl">Dutch</MenuItem>
                                    <MenuItem value="de">German</MenuItem>
                                    <MenuItem value="fr">French</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </div>

                    <TextField
                        value={description}
                        id="outlined-multiline-static"
                        onChange={e => this.handleInput(e)}
                        name="description"
                        label="Type the description..."
                        multiline
                        rows="4"
                        margin="normal"
                        variant="outlined"
                    />
                </div>
            </React.Fragment>
        )
    }
}

Information.propTypes = {
    inputInformation: PropTypes.func.isRequired,
    information: PropTypes.object.isRequired,
    isDescriptionRequired: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
    information: state.informationReducer,
    isDescriptionRequired: state.subgenreReducer.isDescriptionRequired,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    inputInformation,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Information);
