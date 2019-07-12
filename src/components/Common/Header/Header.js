import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

const style = (theme => ({
    root: {
        width: '90%',
    },
    backButton: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
}));

class Header extends Component {

    getSteps = () => {
        if(this.props.isAddSubgenreSelected) {
            return ['Select genre', 'Select subgenre', 'Add subgenre', 'Information']
        }
        return ['Select genre', 'Select subgenre', 'Information'];
    };

    getActiveStep = () => {
      switch (window.location.pathname) {
          case '/': {
              return 0;
          }
          case '/subgenre': {
              return 1;
          }
          case '/add_subgenre': {
              return 2;
          }
          case '/information': {
              if(this.props.isAddSubgenreSelected){
                  return 3
              }
              return 2
          }
      }
    };

    render() {
        const steps = this.getSteps();
        return (
            <div className={style.root}>
                <Stepper nonLinear activeStep={this.getActiveStep()}>
                    {steps.map(label => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </div>
        )
    }
}


Header.propTypes = {
    isAddSubgenreSelected: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
    isAddSubgenreSelected: state.subgenreReducer.isAddSubgenreSelected,
});

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch);

export default withStyles(style)(connect(mapStateToProps, mapDispatchToProps)(Header));

