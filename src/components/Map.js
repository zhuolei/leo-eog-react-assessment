import React, {Component}from "react";
import Card from "@material-ui/core/Card";
import CardHeaderRaw from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import ReactMapGl, {Marker,Popup, NavigationControl, FullscreenControl} from "react-map-gl";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import * as actions from "../store/actions";
import LinearProgress from "@material-ui/core/LinearProgress";
import {toast } from 'react-toastify';
require('dotenv').config()
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
        margin: "5vh 10vw",
    },
    map: {
        margin: "auto"
    },
    marker: {
        backgroundColor: "red",
        width: "1.0rem",
        height: "1.0rem",
        display: "block",
        left: "-0.5rem",
        top: "-0.5rem",
        position: "relative",
        borderRadius: "1.5rem 1.5rem 0",
        transform: "rotate(45deg)",
        border: "1px solid #FFFFFF",
    }
};
const fullscreenControlStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    padding: '10px'
};
  
const navStyle = {
    position: 'absolute',
    top: 36,
    left: 0,
    padding: '10px'
};
  
class Map extends Component {
    state = {
        viewport: {
            width: '100%',
            height: '450px',
            latitude: 29.7604,
            longitude:  -95.3698,
            zoom: 5
        }
    }
    componentDidMount() {
        this.props.droneLoad();
    }
    _updateViewport = (viewport) => {
        this.setState({viewport});
    }
    render() {
        const {classes, loading, list} = this.props;
        if (loading) return <LinearProgress />;
        if (list.length < 375) {
            toast.error('Server connection down!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
                })
        };
        const drone = list[list.length - 1]
        return (
            <Card className={classes.card}>
                <CardHeader title="Map Visualization"/>
                <CardContent>
                    <ReactMapGl
                        {...this.state.viewport}   
                        mapboxApiAccessToken={"pk.eyJ1IjoibGVvZG9uZyIsImEiOiJjanZiaHM3YXkwNHdpM3lydnQ0bDR1aXRnIn0.A0Kbl0Vu4vWTrkMd8QEmIw"}
                        mapStyle="mapbox://styles/leodong/cjvbk2ooc6upj1foetkt17y31"
                        onViewportChange={(viewport) => {
                            this.setState({viewport});
                        }}
                        id="body"
                    >
                        <Marker 
                            className={classes.marker}
                            latitude={drone.latitude} 
                            longitude={drone.longitude}
                        >
                        </Marker>
                    <div className="fullscreen" style={fullscreenControlStyle}>
                    <FullscreenControl container={document.getElementById('body')}/>
                    </div>
                    <div className="nav" style={navStyle}>
                    <NavigationControl onViewportChange={this._updateViewport} />
                    </div>

                    </ReactMapGl>
                    </CardContent>
            </Card>
        )
    }
}

const mapState = (state, ownProps) => {
    const {loading, list} = state.drone;
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
)(withStyles(styles)(Map))