import React from "react";
import accurateInterval from "accurate-interval";

import { Button, ButtonGroup, Container, Grid, IconButton, Typography } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import ReplayIcon from "@mui/icons-material/Replay";


class Timer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            sessionLength: 25,
            breakLength: 5,
            timeTitle: "Session",
            sessionCount: 0,
            breakCount: 0,
            time: 1500,
            timer: "",
            timerRunning: false 
        }

    }


    /////////////
    /* Methods */
    /////////////

    startTimer = () => {
        this.setState({
            timer: accurateInterval(() => {
                this.decrementTime()
                this.timerControl();
                }, 1000)
        });
    }

    decrementTime = () => {
        this.setState({
            time: this.state.time - 1
        });
    }

    timerControl = () => {
        if (this.state.time === 0) this.beepSound();
        if (this.state.time < 0 && this.state.timer && this.state.timeTitle === "Session") {
            this.state.timer.clear();
            this.setState({
                timeTitle: "Break",
                sessionCount: this.state.sessionCount + 1,
            });
            this.calcDuration(this.state.breakLength);
            this.startTimer();
        }
        if (this.state.time < 0 && this.state.timer && this.state.timeTitle === "Break") {
            this.state.timer.clear();
            this.setState({
                timeTitle: "Session",
                breakCount: this.state.breakCount + 1,
            });
            this.calcDuration(this.state.sessionLength);
            this.startTimer();
        }
    }


    calcDuration = (duration) => {
        this.setState({
            time: duration*60
        });
    }

    beepSound = (optional) =>{
        const audio = document.getElementById('beep');
        audio.currentTime = 0;
        if (optional) {
            audio.pause();
            return;
        }
        audio.play();
    }

    secsToClock = () => {
        let mins = Math.floor(this.state.time / 60);
        let secs = this.state.time - mins * 60;
        mins = (mins < 10) ? '0' + mins : mins;
        secs = (secs < 10)? '0' + secs : secs;
        return mins + ":" + secs;
    }

    ////////////////////////////
    /* Handle UI Interactions */
    ////////////////////////////

    handlePlayBtn = () => {
        if (!this.state.timerRunning) {
            this.startTimer(); 
        } else {
            if (this.state.timer) this.state.timer.clear(); 
        }

        this.setState({
            timerRunning: !this.state.timerRunning
        });

    }

    handleReset = () => {
        if (this.state.timer) this.state.timer.clear();
        this.setState({
            sessionLength: 25,
            breakLength: 5,
            timeTitle: "Session",
            sessionCount: 0,
            breakCount: 0,
            time: 1500,
            timer: "",
            timerRunning: false 
        });
        this.beepSound('pause');
    }

    handleDurationButtons = (event) => {
        switch (event.target.value) {
            case 'breakUp':
                if (this.state.breakLength < 60) this.setState({breakLength: this.state.breakLength + 1});
                break;
            case 'breakDown':
                if (this.state.breakLength > 1) this.setState({breakLength: this.state.breakLength - 1});
                break;
            case 'sessionUp':
                if (this.state.sessionLength < 60) this.setState({sessionLength: this.state.sessionLength + 1, time: this.state.time + 60});
                break;
            case 'sessionDown':
                if (this.state.sessionLength > 1) this.setState({sessionLength: this.state.sessionLength - 1, time: this.state.time - 60});
                break;
            default:
                return;
        }
    }


    //////////////////////////////////
    /* Let"s get the Party starting */
    //////////////////////////////////

    render() {
        return (
            <React.Fragment>
                <div id="timer-container">
                    <div id="timer">
                        <Typography variant="h3" component="h1">Session-Timer</Typography>
                    
                        <Grid container spacing={3} pt={3}>
                            <Grid item xs={6}>
                                <Typography variant="h5" component="h2" id="session-label">Session-Length</Typography>
                            </Grid>    
                            <Grid item xs={6}>
                                <Typography variant="h5" component="h2" id="break-label">Break-Length</Typography>
                            </Grid>    
                            <Grid item xs={6}>
                                <div className="time-adjust">
                                    <Typography variant="h3" id="session-length">{this.state.sessionLength}</Typography>
                                <ButtonGroup disableElevation variant="contained" orientation="vertical" size="small">
                                    <Button value="sessionUp" onClick={this.handleDurationButtons} id="session-increment">Up</Button>
                                    <Button value="sessionDown" onClick={this.handleDurationButtons} id="session-decrement">Down</Button>
                                </ButtonGroup>
                                </div>
                            </Grid>
                            <Grid item xs={6}>
                                <div className="time-adjust">
                                    <Typography variant="h3" id="break-length">{this.state.breakLength}</Typography>
                                    <ButtonGroup disableElevation variant="contained" orientation="vertical" size="small">
                                        <Button value="breakUp"onClick={this.handleDurationButtons} id="break-increment">Up</Button>
                                        <Button value="breakDown"onClick={this.handleDurationButtons} id="break-decrement">Down</Button>
                                    </ButtonGroup>
                                </div>
                            </Grid>
                        </Grid>

                        <div id="time-container">
                            <Typography variant="h5" component="h2" pt={3} pb={0} id="timer-label">{this.state.timeTitle}</Typography>
                            <Typography variant="h2" pt={1} id="time-left">{this.secsToClock()}</Typography>
                        </div>
                    
                        <Container id="time-controls">
                            <IconButton size="large" id="start_stop" onClick={this.handlePlayBtn}>{this.state.timerRunning ? <PauseIcon fontSize="inherit"/> : <PlayArrowIcon fontSize="inherit"/>}</IconButton>
                            <IconButton size="large" id="reset" onClick={this.handleReset}><ReplayIcon fontSize="inherit"/></IconButton>
                        </Container>

                    </div>
                </div>
                <audio id="beep" src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav" />
            </React.Fragment>
        
        )
    };
}

export default Timer;