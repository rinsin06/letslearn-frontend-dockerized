import React, { useRef, useState, useEffect, useContext } from 'react'
import './App.css';
import axios from './axios'
import NavBar from './Components/NavBar/NavBar';
import Footer from './Components/Footer/Footer';
import Banner from './Components/Banner/Banner';
import RowPost from './Components/RowPost/RowPost';
import { action, comedy, documentary, horror, orginals, romance, trending } from './urls';
import { AppContext } from './AppContext'
import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom'
import { FirebaseContext, AuthContext } from './Context/firebaseContext';
import Cookies from 'js-cookie';

import LoginPage from './Pages/Login';
import SignUpPage from './Pages/SignUp';
import Profile from './Pages/Profile';
import ResetPassword from './Pages/ResetPassword';
import AdminDashboard from './Pages/AdminDashboard';
import CourseCreation from './Pages/CourseCrreation';
import AdminCourseList from './Pages/AdminCourseList';
import AdminSignIn from './Components/Admin/AdminSignIn/AdminSignIn';
import AdminUsers from './Pages/AdminUsers';
import AdminCategoryList from './Pages/AdminCategoryList';
import { Provider, useDispatch, useSelector } from 'react-redux'
import store from './redux/Store'
import { Box, Container, Divider, Typography } from '@mui/material';
import getDataInfo from './redux/api';
import getCourseInfo from './redux/courseapi';
import AdminCourseView from './Pages/AdminViewCourse';
import UserCourseList from './Components/UserCourseList/UserCourseList';
import TrendingCourse from './TrendingCourse/TrendingCourse';
import UserCourseViewPage from './Pages/UserCourseViewPage';
import UserWishListPage from './Pages/UserWishList';
import UserCartPage from './Pages/UserCartPage';
import getCartInfo from './redux/cartapi';
import getWishListInfo from './redux/wishlistapi';
import UserLearningsPage from './Pages/UserLearningsPage';
import { getLearnings } from './AdminService';
import getLearningsInfo from './redux/learningsapi';
import UserLearningsViewPage from './Pages/UserLearningsViewPage';
import ChatPage from './Pages/ChatPage';
import Chat from './Components/Admin/chat/Chat';


function App() {
  const actionRef = useRef(null);
  const horrorRef = useRef(null);
  const orginalsRef = useRef(null);
  const trendingRef = useRef(null);
  const comedyRef = useRef(null);
  const romanceRef = useRef(null);
  const documetaryRef = useRef(null);

  const [orginalsData, setOrginalsData] = useState([]);
  const [actionData, setActionData] = useState([]);
  const [horrorData, setHorrorData] = useState([]);
  const [trendingData, setTrendingData] = useState([]);
  const [comedyData, setComedyData] = useState([]);
  const [romanceData, setRomanceData] = useState([]);
  const [documentaryData, setDocumentaryData] = useState([]);
  // ... Add states for other responses as needed
  const [allMovies, setAllMovies] = useState([]);

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchRow, setSearchRow] = useState(false);
  const [listView, setListView] = useState(false);




  const [userData, setUserdata] = useState()

  const [userId, setUserId] = useState();

  const dispatch = useDispatch();



  const [listedMovies, setListedMovies] = useState(() => {
    // Retrieve state from sessionStorage on component mount
    const savedState = sessionStorage.getItem('listedMovies');
    return savedState ? JSON.parse(savedState) : [];
  });

  const categories = useSelector(state => state.dataInfo.data);
  const courses = useSelector(state => state.courseInfo.courses);
  const cartItems = useSelector(state => state.cartInfo.cartItems);
  const wishList = useSelector(state => state.wishListInfo.wishList);

  const [wishListData, setWishList] = useState([]);
  const [data, setData] = useState([]);

  const [cartItemdata, setCartItems] = useState([]);

  useEffect(() => {

    dispatch(getDataInfo());
    dispatch(getCourseInfo());
    dispatch(getCartInfo());
    dispatch(getWishListInfo());
    dispatch(getLearningsInfo());

    console.log(categories);
    console.log(courses);
    console.log(cartItems);
  }, [])

  const [pythonData, setPythonData] = useState([]);

  useEffect(() => {

    if (data) {

      const filteredMovies = data.filter((data) =>
        data.category ? data.category.name.includes("Python") : data.subCategory.name.includes("Python")
      );

      setPythonData(filteredMovies);
    }

  }, [data])

  const [javaData, setJavaData] = useState([]);

  useEffect(() => {

    if (data) {

      const filteredMovies = data.filter((data) =>
        data.category ? data.category.name.includes("Java") : data.subCategory.name.includes("Java")
      );

      setJavaData(filteredMovies);
    }

  }, [data])
  useEffect(() => {

    setData(courses);

  }, [courses])

  useEffect(() => {
    setCartItems(cartItems);

  }, [cartItems])

  useEffect(() => {

    setWishList(wishList);
  }, [wishList])


  useEffect(() => {

    console.log(categories);
    console.log(cartItemdata);
    console.log(wishListData);

    const userDataInfo = {
      name: localStorage.getItem("name"),
      email: localStorage.getItem("email"),
    }





    const token = Cookies.get('token')
    sessionStorage.setItem('listedMovies', JSON.stringify(listedMovies));

    console.log(token);
    // Fetch data from multiple APIs
    const fetchMovies = async () => {
      try {
        const response1 = await axios.get(orginals);
        const response2 = await axios.get(action);
        const response3 = await axios.get(horror);
        const response4 = await axios.get(trending);
        const response5 = await axios.get(comedy);
        const response6 = await axios.get(romance);
        const response7 = await axios.get(documentary);

        setOrginalsData(response1.data.results);
        setActionData(response2.data.results);
        setHorrorData(response3.data.results);
        setTrendingData(response4.data.results);
        setComedyData(response5.data.results);
        setRomanceData(response6.data.results);
        setDocumentaryData(response7.data.results);

        // Combine or manage the data from different responses
        const combinedMovies = [
          ...response1.data.results,
          ...response2.data.results,
          ...response3.data.results,
          ...response4.data.results,
          ...response5.data.results,
          ...response6.data.results,
          ...response7.data.results,

        ];

        setAllMovies(combinedMovies);

      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    // Call the function to fetch movies
    fetchMovies();


  }, []); // Empty dependency array means run once on mount

  // Render the rest of your components using `allMovies` data
  const history = useHistory();
  const handleSearch = (query) => {

    if (query === '') {

      setSearchRow(false);

    }


    const normalizedQuery = query.toLowerCase();
    setSearchQuery(normalizedQuery);
    console.log(normalizedQuery);

    if (data) {
      const filteredMovies = data.filter((data) =>
        data.title ? data.title.toLowerCase().includes(query.toLowerCase()) : data.name.toLowerCase().includes(query.toLowerCase())
      );

      setSearchResults(filteredMovies);



      setSearchRow(true);


    }
  };

  const handleCategory = (query) => {

    if (query === '') {

      setSearchRow(false);

    }
    const normalizedQuery = query.toLowerCase();
    setSearchQuery(normalizedQuery);
    console.log(normalizedQuery);

    if (data) {
      const filteredMovies = data.filter((data) =>
        data.category ? data.category.name.includes(query) : data.subCategory.name.includes(query)
      );

      setSearchResults(filteredMovies);



      setSearchRow(true)
    }
  };

  const handleListView = () => { setListView((prevIsOpen) => !prevIsOpen); }

  const handleListedMovies = (movie) => {

    setListedMovies([...listedMovies, movie])
  }


  const handleRemoveListedMovies = (movie) => {

    const updatedListedMovies = listedMovies.filter((listedMovie) => listedMovie.id !== movie.id)

    setListedMovies(updatedListedMovies);


  }


  const [featuredCourse, setFeaturedCourse] = useState();

  const [featureddata, setFeaturedData] = useState({
    coverImage: ''
  });

  const [pic, setImage] = useState('')




  useEffect(() => {
    const fetchRandomImage = () => {
      if (courses && courses.length > 0) {
        const randomIndex = Math.floor(Math.random() * courses.length);
        const randomCourse = courses[randomIndex];
        setFeaturedData({ coverImage: randomCourse.coverImage });
        setImage(randomCourse.coverImage);
        setFeaturedCourse(randomCourse);
      }
    };

    fetchRandomImage(); // Run on initial render
  }, [courses]);




  return (


    <Router>


      <Route exact path='/'>

        <div className="App">



          <NavBar handleCategory={handleCategory} handleListView={handleListView} handleSearch={handleSearch} actionRef={actionRef} horrorRef={horrorRef} orginalsRef={orginalsRef} trendingRef={trendingRef} comedyRef={comedyRef}
            romanceRef={romanceRef} documetaryRef={documetaryRef} />

          <Container style={{ maxWidth: '1470px', width: '100%' }}>

            <Banner />
            <Box sx={{ paddingTop: 5, paddingBottom: 5 }}>
              <Typography color={'white'} variant="h4" sx={{ fontWeight: "bold", fontFamily: "serif" }} gutterBottom>
                All the skills you need in one place
              </Typography>

              <Typography color={'white'} variant="h6" sx={{ fontWeight: "bold", fontFamily: "serif" }} gutterBottom>
                From critical workplace skills to technical topics, our catalog supports well-rounded professional development.
              </Typography>
            </Box>

          </Container>
          <Divider sx={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }} />
          <Container style={{ maxWidth: '1470px', width: '100%', }}>


            <Box sx={{ paddingTop: 5, paddingBottom: 5 }}>
              <AppContext.Provider value={{ listedMovies }}>
                {searchRow &&
                  <RowPost ref={orginalsRef}
                    data={searchResults}
                    handleListedMovies={handleListedMovies}
                    handleRemoveListedMovies={handleRemoveListedMovies}

                    title="Search Results.."
                    id="orginals"
                  />}
                {listView &&
                  <RowPost ref={orginalsRef}
                    handleListedMovies={handleListedMovies}
                    handleRemoveListedMovies={handleRemoveListedMovies}

                    data={listedMovies}
                    title="My List"
                    id="orginals" />}


                <RowPost ref={orginalsRef}
                  data={data}
                  handleListedMovies={handleListedMovies}
                  handleRemoveListedMovies={handleRemoveListedMovies}
                  leftButtonPosition={10} rightButtonPosition={10}
                  title="New Courses"
                  id="orginals" />
                <RowPost ref={actionRef}
                  data={data}
                  handleListedMovies={handleListedMovies}
                  handleRemoveListedMovies={handleRemoveListedMovies}

                  title="Trending Now"
                  isSmall id="action" />
                <Divider sx={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }} />
                <Container style={{ width: '80%', }}>
                  <Box sx={{ paddingTop: 5, paddingBottom: 5 }}>
                    <Typography color={'white'} variant="h4" sx={{ fontWeight: "bold", fontFamily: "serif" }} gutterBottom>
                      Featured Course
                    </Typography>
                    <Typography color={'white'} variant="h6" sx={{ fontWeight: "bold", fontFamily: "serif" }} gutterBottom>
                      Take a look at one of our featured courses.
                    </Typography>
                  </Box>
                  <TrendingCourse data={featuredCourse} />


                </Container>
                <Divider sx={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }} />
                <RowPost ref={actionRef}
                  data={javaData}
                  handleListedMovies={handleListedMovies}
                  handleRemoveListedMovies={handleRemoveListedMovies}

                  title="JAVA"
                  isSmall id="action" />

                <RowPost ref={actionRef}
                  data={pythonData}
                  handleListedMovies={handleListedMovies}
                  handleRemoveListedMovies={handleRemoveListedMovies}

                  title="Python"
                  isSmall id="action" />

              </AppContext.Provider>

            </Box>

          </Container>
          <Footer />
        </div>

      </Route>
      <Switch>
        <Route path='/signin'>
          <LoginPage />

        </Route>
        <Route path='/signup'>
          <SignUpPage />

        </Route>

        <Route path='/profile'>
          <Profile />

        </Route>

        <Route path='/password-reset'>

          <ResetPassword />

        </Route>
        <Route path='/admin-signin'>

          <AdminSignIn />

        </Route>

        <Route path='/admin'>

          <AdminDashboard />

        </Route>

        <Route path='/create-course'>

          <CourseCreation />

        </Route>

        <Route path='/view-courses'>

          <AdminCourseList />

        </Route>
        <Route path='/view-users'>

          <AdminUsers />

        </Route>

        <Route path='/view-categories'>

          <AdminCategoryList />

        </Route>

        <Route path='/view-course'>

          <AdminCourseView />

        </Route>

        <Route path='/user-courseView'>

          <UserCourseViewPage />

        </Route>

        <Route path='/user-wishlist'>

          <UserWishListPage />

        </Route>

        <Route path='/user-cart'>

          <UserCartPage />

        </Route>

        <Route path='/user-learnings'>

          <UserLearningsPage />

        </Route>

        <Route path='/user-learningsView'>

          <UserLearningsViewPage />

        </Route>


       


      </Switch>

    </Router>





  );
}

export default App;
