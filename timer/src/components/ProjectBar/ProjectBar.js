import React, { useState } from "react";
import { Divider, SwipeableDrawer, IconButton, Link, List, ListItem, ListItemIcon, ListItemText, Popover, Typography } from "@mui/material";
//import { marked } from 'marked';      // Wait untill 4.0.0 ist bugfree!
//import DOMPurify from 'dompurify';

// Icons
import GitHubIcon from "@mui/icons-material/GitHub";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFreeCodeCamp} from '@fortawesome/free-brands-svg-icons/faFreeCodeCamp';
import {faCode} from '@fortawesome/free-solid-svg-icons/faCode';
import {faAlignLeft} from '@fortawesome/free-solid-svg-icons/faAlignLeft';
import CloseIcon from '@mui/icons-material/Close';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

// Styles
import './styles/projectbar.css'

// Data
// import readme_copy from './_readme_copy'

const ProjectBar = (props) => {
    const [drawerState, setDrawerState] = useState(false);
    const [readmeAnchor, setReadmeAnchor] = useState(false);

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerState(open);
    }

    const handleReadme = (event) => {
        setReadmeAnchor(event.currentTarget);        
    }

    const handleReadmeClose = () => {
        setReadmeAnchor(null);
    }

    const readmeOpen = Boolean(readmeAnchor);
    const readmePopover = readmeOpen ? 'readme-popover' : undefined;

    const loadReadme = () => {
        // let dirtyHTML = marked('# readme_copy');
        // return marked.parse('# readme_copy');    // Testreturn
        //return(DOMPurify.sanitize(marked(readme_copy), {USE_PROFILES: {html:true}}));
    }

    return (
        <React.Fragment key="projectbar">
            <div id="button-div">
                <IconButton color='primary' onClick={toggleDrawer(true)}><DoubleArrowIcon></DoubleArrowIcon></IconButton>
            </div>
            <SwipeableDrawer 
                sx  = {{
                    width: 300,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: 300,
                        boxSizing: 'border-box',
                    },
                }}
                anchor  =   "left"
                open    =   {drawerState}
                onClose =   {toggleDrawer(false)}
                onOpen  =   {toggleDrawer(true)}
            >
                <List>
                    <ListItem>
                        <Typography variant="h4" pt={3} color="secondary">{props.title}</Typography>
                    </ListItem>
                    
                    <ListItem>
                        <Link color="secondary" underline="hover" href={props.instURL} target="_blank" rel="noopener">    
                            <Typography variant="subtitle1">{props.institute}</Typography>
                        </Link>
                    </ListItem>
                    
                    <ListItem>
                        <Link color="secondary" underline="hover" href={props.courseURL} target="_blank" rel="noopener">    
                            <Typography variant="subtitle1">{props.course}</Typography>
                        </Link>
                    </ListItem>
                    
                    <Divider/>

                    <Link className="pbar-link" aria-describedby={readmePopover} onClick={handleReadme}>
                        <ListItem button key="readme">
                            <ListItemIcon><FontAwesomeIcon icon={faAlignLeft} size='lg'/></ListItemIcon>
                            <ListItemText primary="Render the Readme"></ListItemText>
                        </ListItem>
                    </Link>
                    <Popover 
                        id={readmePopover}
                        open={readmeOpen}
                        anchorEl={readmeAnchor}
                        onClose={handleReadmeClose}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                    >
                        <div id="readme-div"> 
                            <div id="readmeCloseIcon-div">
                                <IconButton onClick={handleReadmeClose}><CloseIcon /></IconButton>
                            </div>
                            <div id="readme-text" dangerouslySetInnerHTML={{__html:loadReadme()}}></div>
                        </div>
                    </Popover>

                    <Link className="pbar-link" href={props.userStory} target="_blank" rel="noopener">
                        <ListItem button key="userstory">
                            <ListItemIcon><FontAwesomeIcon icon={faFreeCodeCamp} size='lg'/></ListItemIcon>
                            <ListItemText primary="Read the User Story"></ListItemText>
                        </ListItem>
                    </Link>
                    
                    <Link className="pbar-link" href={props.repository} target="_blank" rel="noopener">
                        <ListItem button key="repository">
                            <ListItemIcon><FontAwesomeIcon icon={faCode} size='lg'/></ListItemIcon>
                            <ListItemText primary="Inspect the Code"></ListItemText>
                        </ListItem>
                    </Link>
                    
                    <Divider />
                    
                    <Link className="pbar-link" href="https://github.com/Dmnk28" target="_blank" rel="noopener">
                        <ListItem button key="github">
                            <ListItemIcon><GitHubIcon /></ListItemIcon>
                            <ListItemText primary="GitHub Profile"></ListItemText>
                        </ListItem>
                    </Link>
                    
                    <Link className="pbar-link" href="https://www.linkedin.com/in/dominikoesterle/" target="_blank" rel="noopener">
                        <ListItem button key="github">
                            <ListItemIcon><LinkedInIcon /></ListItemIcon>
                            <ListItemText primary="LinkedIn Profile"></ListItemText>
                        </ListItem>
                    </Link>

                    <Link className="pbar-link" href="https://do-webdev.de" target="_self">
                        <ListItem button key="portfolio" disabled>
                            <ListItemIcon><ArrowBackIcon /></ListItemIcon>
                            <ListItemText primary="Back to my portfolio"></ListItemText>
                        </ListItem>
                    </Link>
                </List>
            </SwipeableDrawer>
        </React.Fragment>
    );

}

export default ProjectBar;