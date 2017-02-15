import React, { PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { request } from 'helpers/fetch-server.js';
import { setSesion } from 'state/actions';

export default React.createClass({
  displayName: 'SignIn',
  mixins: [ PureRenderMixin ],
  propTypes: {
    api: PropTypes.string.isRequired,
  },
  onclick() {
    const { api, closeModal, dispatch } = this.props;
    request({
      url: `${ api }/api/users/signin/`,
      method: 'post',
      body: new FormData(this.refs.form),
    }).then(response => {
      console.log(response.payload);
      dispatch(setSesion(response.payload.object));
      closeModal();
    }).catch(error =>
      console.log(error)
    );
  },
  onclic() {
    console.log(this.props.token);
  },
  componentWillMount() {
    console.log(this.props.token);
  },
  render() {
    return (
      <form className='modal-input' ref='form'>
        <input name='email' placeholder='Correo Electrónico' className='modal-input__input'/>
        <input name='password' type='password' placeholder='Contraseña' className='modal-input__input'/>
        <button className='button button--gray' type="button" onClick={ this.onclick } >Iniciar Sesión</button>
        <button className='button button--gray' type="button" onClick={ this.onclic } >Props</button>
      </form>
    );
  },
});
