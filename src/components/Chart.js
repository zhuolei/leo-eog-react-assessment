import React, {Component}from "react";
import Card from "@material-ui/core/Card";
import CardHeaderRaw from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import * as actions from "../store/actions";
import LinearProgress from "@material-ui/core/LinearProgress";
const cardStyles = theme => ({
    root: {
        background: theme.palette.primary.main
    },
    title: {
        color: "white"
    }
})

const CardHeader = withStyles(cardStyles)(CardHeaderRaw);

const styles = {
    card: {
        margin: "5% 25%"
    },
};

class Chart extends Component {
    componentDidMount() {
        this.props.droneLoad()
    }

    render() {
        const {classes, loading, list} = this.props;
        return (
            <Card className={classes.card}>
                <CardHeader title="Chart Visualization"/>
                <CardContent>

                </CardContent>
            </Card>
        )
    }
}
const mapState = (state, ownProps) => {
    const {loading, list} = state.drone;
    console.log(loading, list);
    // store.dispatch({
    //     type: actions.FETCH_WEATHER,
    //     longitude: -95.3698,
    //     latitude: 29.7604
    //   })
    return {
        loading,
        list
    };
}
const mapDispatch = dispatch => ({
    droneLoad: () => dispatch({
        type: actions.FETCH_DRONE
    }),
    error: (code) => dispatch({
        type: actions.API_ERROR,
        code
    })
})
export default connect(
    mapState,
    mapDispatch
)(withStyles(styles)(Chart))