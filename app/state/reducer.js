const initialState = {
  token: 'joshua',
  status: '',
  group: '',
  api: 'http://localhost:8000',
  location: window.location.origin,
  avatar: '',
  language: 1,
};

function reducer(state = initialState, action = {}) {
  switch (action.type) {
  case 'SET_SESION': {
    const { token, status, group } = action.payload;
    return Object.assign({}, state, { token, status, group });
  }
  case 'SET_AVATAR': {
    const avatar = action.payload;
    return Object.assign({}, state, { avatar });
  }
  default:
    return state;
  }
}

export default reducer;
