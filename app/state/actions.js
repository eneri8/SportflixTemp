export function setSesion(sesion) {
  return {
    type: 'SET_SESION',
    payload: sesion,
  };
}

export function setAvatar(avatar) {
  return {
    type: 'SET_AVATAR',
    payload: avatar,
  };
}

export function setLanguage(language) {
  return {
    type: 'SET_LANGUAGE',
    payload: language,
  };
}
