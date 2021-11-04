import React from "react";

import { Button, Grid, Typography } from "@mui/material";

const Timer = () => {
    return (
        <React.Fragment>
            <div id="timer-container">
                <div id="timer">
                    <Typography variant="h3" component="h1">Session-Timer</Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="h5" component="h2" id="session-label">Session</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="h5" component="h2">Break</Typography>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Timer;