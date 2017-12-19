import setAuthorizationToken from '../shared/setAuthorizationToken';

const USER_IS_LOADING = "USER_IS_LOADING";
const USER_AUTHENTICATED = "USER_AUTHENTICATED";
const USER_SET = "USER_SET";
export const actionCreators = {
    loginUser: state => async (dispatch, getState) => {
        if (getState().userAuthentication.isLoading) {
            // Don't issue a duplicate request (we already have or are loading the requested data)
            return;
        }
        try{
            if(state.email === "test@test.com" && state.password==="hello"){
                dispatch({type: USER_IS_LOADING, isLoading: true});
                const user = {username:"test@test.com",expiry:""};
                const token = {user:user,token:"klasdjkhsajkldklsjadflashdj"};
                setAuthorizationToken(token);
                dispatch({type: USER_AUTHENTICATED, isAuthenticated: true});
                dispatch({type: USER_SET, user});
                dispatch({type: USER_IS_LOADING, isLoading: false});
            }
            else{
                throw "User or password wrong!";
            }

        }
        catch (e){
            dispatch({type: USER_IS_LOADING, isLoading: false});
            throw e;
        }
    },
    logoutUser: () => async (dispatch, getState) => {
        setAuthorizationToken(false);
        dispatch({type: USER_AUTHENTICATED, user: null, isAuthenticated: false})
    },
    setUser: user => async (dispatch, getState) => {
        dispatch({type: USER_SET, user});
        dispatch({type: USER_AUTHENTICATED, isAuthenticated: true});
    }
};

const initialState = {
    user: {},
    isLoading: false,
    isAuthenticated: false
};

export const reducer = (state, action) => {
    state = state || initialState;
    switch (action.type) {
        case USER_IS_LOADING:
            return {
                ...state,
                isLoading: action.isLoading
            };
        case USER_AUTHENTICATED:
            return {
                ...state,
                isAuthenticated: action.isAuthenticated
            };
        case USER_SET:
            return {
                ...state,
                user: action.user
            };
        default:
            return state;
    }
};