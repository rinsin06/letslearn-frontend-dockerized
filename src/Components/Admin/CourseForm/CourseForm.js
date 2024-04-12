import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import { Breadcrumbs, Chip, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useHistory, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../../Context/Context';

import { Firebase } from '../../../firebase/config';
import { FirebaseContext } from '../../../Context/firebaseContext';
// import { app } from '../../../firebase/config';

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function CourseForm(props) {


  const handleSubmit = (event) => {

    props.next();
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };




  const handleImageUpload = async (file) => {
    Firebase.storage().ref(`/image/${file.name}`).put(file).then(({ ref }) => {
      ref.getDownloadURL().then((url) => {
        setCourse({ ...course, imageUrl: url })
      })
    })
  }

  const history = useHistory();

  const categoryList = useSelector(state => state.dataInfo.data);

  const [filteredCategories, setFilteredCategories] = useState(categoryList);

  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category); // Update selected category

  };

  useEffect(() => {
    setFilteredCategories(categoryList);
    console.log(categoryList);

  }, [categoryList]);


  const location = useLocation();
  const { editcourse, editlessons } = location.state || {}; // Retrieve the course and lessons objects from the location state

  const [url, setUrl] = useState(false);
  // Use the course and lessons objects to pre-fill the form fields
  useEffect(() => {
    if (editcourse) {

      setCourse(editcourse);
      setUrl(true);

      if (editcourse.category) {
        setcategoryname(editcourse.category);
        const foundCategory = categoryList.find(category => category.category.name === editcourse.category);
        setSelectedCategory(foundCategory);
        setsubcategoryname(editcourse.subcategory);

      }
      console.log(editcourse);
    }
  }, [editcourse]);
  const [categoryname, setcategoryname] = useState('');

  const [subcategoryname, setsubcategoryname] = useState('');

  const handlechange1 = (input) => {
    setcategoryname(input.category.name)
    setCourse({ ...course, category: input.category.name })

  }

  const handlechange2 = (input) => {
    setsubcategoryname(input.name);
    setCourse({ ...course, subcategory: input.name })

  }

  const { course, setCourse } = useContext(AuthContext);

  const [data, setData] = useState();


  return (
    <ThemeProvider theme={defaultTheme}>


      <Container component="main" maxWidth="xs">

        <CssBaseline />
        <Box
          sx={{
            marginTop: 5,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            bgcolor: 'background.paper'
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <CreateNewFolderIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Create Course
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="Course Name"
                  required
                  fullWidth
                  id="firstName"
                  label="Course Name"
                  autoFocus
                  value={course.title} // Set initial value from state
                  onChange={(e) => setCourse({ ...course, title: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} sm={6}>

                <TextField
                  required
                  fullWidth
                  id="Overview"
                  label="Author Name"
                  name="lastName"
                  autoComplete="family-name"
                  rows={5}
                  value={course.authorName} // Set initial value from state
                  onChange={(e) => setCourse({ ...course, authorName: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Category</InputLabel>
                  <Select

                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={categoryname}
                    label="Category"

                  >
                    {filteredCategories.map((category, index) => (
                      <MenuItem
                        disableRipple
                        disableTouchRipple
                        value={category.category.name}
                        sx={{ typography: 'body2', py: 1.5 }} key={index} onClick={() => {
                          handleCategoryClick(category)
                          handlechange1(category)
                        }}>
                        {category.category.name}
                      </MenuItem>


                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Sub-Category</InputLabel>
                  <Select

                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={subcategoryname}
                    label="Sub-Category"

                  >
                    {selectedCategory && selectedCategory.subcategories.map((subcategory, subIndex) => (
                      <MenuItem onClick={() => { handlechange2(subcategory) }} value={subcategory.name} key={subIndex} >
                        {subcategory.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>

                <Typography>Cover Image</Typography>
                <div>
                  {url ?<TextField
                  required
                  fullWidth
                  disabled
                  name="password"
                 
                  id="password"
                  autoComplete="new-password"
                  value={course.imageUrl} // Set initial value from state
                 
                />:<TextField
                    required
                    fullWidth
                    type='file'
                    id="email"
                   
                    name="email"

                    autoComplete="off" // Disable autocomplete to prevent browser interference
                    onChange={(e) => handleImageUpload(e.target.files[0])}
                  />
                }
                </div>{url && <Button onClick={()=>setUrl(false)}>Change</Button>} 
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Price"
                  type='number'
                  id="password"
                  autoComplete="new-password"
                  value={course.price} // Set initial value from state
                  onChange={(e) => setCourse({ ...course, price: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Duration"
                  type='number'
                  id="password"
                  autoComplete="new-password"
                  value={course.duration} // Set initial value from state
                  onChange={(e) => setCourse({ ...course, duration: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Description"
                  id="password"
                  autoComplete="new-password"
                  value={course.description} // Set initial value from state
                  onChange={(e) => setCourse({ ...course, description: e.target.value })}
                  multiline
                  rows={4}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Add Lessons
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>

              </Grid>
            </Grid>
          </Box>
        </Box>

      </Container>



    </ThemeProvider>
  );
}
