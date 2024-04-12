import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import { useState } from 'react';
import { Box, Container, IconButton, Typography } from '@mui/material';
import { useEffect } from 'react';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ListAltIcon from '@mui/icons-material/ListAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useContext } from 'react';
import { AuthContext } from '../../../Context/Context';


export default function NestedList(props) {
    const { list, onEditLesson, onDeleteLesson } = props;
    const [open, setOpen] = React.useState(true);

    const [LessonsList, setLessonsList] = useState([]);

    const { setLessons,lessonslisting } = useContext(AuthContext);

    const [openState, setOpenState] = React.useState(Array(props.list.length).fill(false));

    const handleClick = (index) => {
        // Toggle the open state for the clicked lesson and close others
        setOpenState((prevState) => {
            const newOpenState = [...prevState];
            newOpenState[index] = !newOpenState[index];
            return newOpenState;
        });
    };

    return (
        <Box
            sx={{
                marginTop: 20,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                bgcolor: 'background.paper'
            }}
        >

            <List
                sx={{ width: '100%', bgcolor: 'background.paper' }}
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                        <ListItemIcon>
                            <Box display="flex" alignItems="center">
                            <MenuBookIcon />
                                <Typography component="h1" variant="h6" sx={{ mr: 1 }}>
                                    Lessons
                                </Typography>
                               
                            </Box>
                        </ListItemIcon>

                    </ListSubheader>
                }
            >
                {lessonslisting.map((lesson, index) => (

                    <div key={index}>
                        <ListItemButton onClick={() => handleClick(index)}>
                            <ListItemIcon>
                                <ListAltIcon />
                            </ListItemIcon>
                            <ListItemText primary={`Lesson ${lesson.lessonOrder} `} />
                            {!openState[index] && <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <IconButton color='info' aria-label="edit" onClick={() => onEditLesson(lesson, index)}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton color='error' aria-label="delete" onClick={() => onDeleteLesson(index)}>
                                    <DeleteIcon />
                                </IconButton>
                            </Box>}
                            {openState[index] ? <ExpandLess /> : <ExpandMore />}

                        </ListItemButton>
                        <Collapse in={openState[index]} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <ListItemButton sx={{ pl: 4 }}>
                                    <ListItemIcon>
                                        <ListItemText primary="Title:" />
                                    </ListItemIcon>

                                    <ListItemText primary={lesson.title} />

                                </ListItemButton>
                                <ListItemButton sx={{ pl: 4 }}>
                                    <ListItemIcon >
                                        <ListItemText primary="Description :" />
                                    </ListItemIcon>

                                    <ListItemText primary={
                                        <div style={{ paddingLeft: 40, maxHeight: 100, overflowY: 'auto' }}>
                                            {lesson.description}
                                        </div>
                                    } />

                                </ListItemButton>
                                <ListItemButton sx={{ pl: 4 }}>
                                    <ListItemIcon>
                                        <ListItemText primary="Video URL:" />
                                    </ListItemIcon>

                                    <ListItemText primary={lesson.videoUrl} />

                                </ListItemButton>
                                <ListItemButton sx={{ pl: 4 }}>
                                    <ListItemIcon>
                                        <ListItemText primary="Content:" />
                                    </ListItemIcon>

                                    <ListItemText primary={
                                        <div style={{ maxHeight: 100, overflowY: 'auto' }}>
                                            {lesson.content}
                                        </div>
                                    } />

                                </ListItemButton>
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    <IconButton color='info' aria-label="edit" onClick={() => onEditLesson(lesson, index)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton color='error' aria-label="delete" onClick={() => onDeleteLesson(index)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </Box>
                            </List>
                        </Collapse>

                    </div>

                ))}
            </List>

        </Box>


    );
}
