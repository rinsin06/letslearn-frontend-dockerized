import {createStore,combineReducers} from 'redux';
import {applyMiddleware} from 'redux'
import {thunk} from 'redux-thunk'


function dataInfo(state = {
   data: [],
   error: '',
   loading: false,
 }, action) {
   switch (action.type) {
     case 'set-data':
       return {
         ...state,
         data: action.payload
       };
     case 'loading':
       return {
         ...state,
         loading: action.payload
       };
     case 'error':
       return {
         ...state,
         error: action.payload
       };
     default:
       return state;
   }
 }

 function courseInfo(state = {
  courses: [],
  error: '',
  loading: false,
}, action) {
  switch (action.type) {
    case 'set-coursedata':
      return {
        ...state,
        courses: action.payload
      };
    case 'loading':
      return {
        ...state,
        loading: action.payload
      };
    case 'error':
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
}


function cartInfo(state = {
  cartItems: [],
  error: '',
  loading: false,
}, action) {
  switch (action.type) {
    case 'set-cartdata':
      return {
        ...state,
        cartItems: action.payload
      };
    case 'loading':
      return {
        ...state,
        loading: action.payload
      };
    case 'error':
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
}

function wishListInfo(state = {
  wishList: [],
  error: '',
  loading: false,
}, action) {
  switch (action.type) {
    case 'set-wishlistdata':
      return {
        ...state,
        wishList: action.payload
      };
    case 'loading':
      return {
        ...state,
        loading: action.payload
      };
    case 'error':
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
}

function learningsInfo(state = {
  learnings: [],
  error: '',
  loading: false,
}, action) {
  switch (action.type) {
    case 'set-learningsdata':
      return {
        ...state,
        learnings: action.payload
      };
    case 'loading':
      return {
        ...state,
        loading: action.payload
      };
    case 'error':
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
}
 
 // Action Creators
 function setData(data) {
   return {
     type: 'set-data',
     payload: data
   };
 }
 
 function setLoading(isLoading) {
   return {
     type: 'loading',
     payload: isLoading
   };
 }
 
 function setError(error) {
   return {
     type: 'error',
     payload: error
   };
 }

 function setCourse(data) {
  return {
    type: 'set-coursedata',
    payload: data
  };
}

function setCourseLoading(isLoading) {
  return {
    type: 'loading',
    payload: isLoading
  };
}

function setCourseError(error) {
  return {
    type: 'error',
    payload: error
  };
}

function setCart(data) {
  return {
    type: 'set-cartdata',
    payload: data
  };
}

function setCartLoading(isLoading) {
  return {
    type: 'loading',
    payload: isLoading
  };
}

function setCartError(error) {
  return {
    type: 'error',
    payload: error
  };
}

function setWishList(data) {
  return {
    type: 'set-wishlistdata',
    payload: data
  };
}

function setWishListLoading(isLoading) {
  return {
    type: 'loading',
    payload: isLoading
  };
}

function setWishListError(error) {
  return {
    type: 'error',
    payload: error
  };
}

function setLearnings(data) {
  return {
    type: 'set-learningsdata',
    payload: data
  };
}

function setLearningsLoading(isLoading) {
  return {
    type: 'loading',
    payload: isLoading
  };
}

function setLearningsError(error) {
  return {
    type: 'error',
    payload: error
  };
}
 
 // Store
 const appReducer = combineReducers({
   dataInfo,courseInfo,cartInfo,wishListInfo,learningsInfo
 });
 
 const store = createStore(appReducer,applyMiddleware(thunk));
 
 export default store;
 
 export {
   setData,
   setError,
   setLoading,
   setCourse,
   setCourseLoading,
   setCourseError,
   setCart,
   setCartLoading,
   setCartError,setWishList,
   setWishListError,setWishListLoading,
   setLearnings,setLearningsError,setLearningsLoading

 };