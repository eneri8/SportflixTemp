import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { request } from '../../helpers/fetch-server.js';
import ProfileImage from '../Landing/Avatar/ProfileImage.js'
import Select from '../Select.js'
import { head } from 'lodash';
import { setAvatar, setLanguage } from 'state/actions';

export default React.createClass({
  displayName: 'Crear',
  mixins: [ PureRenderMixin ],
  getInitialState() {
    return {
      images: [],
      languages: [],
    };
  },
  componentWillMount() {
    const { api } = this.props;
    request({
      url: `${ api }/api/pages/profile-options/`,
    }).then(response => {
      this.setState({
      	images: head(response.payload).images,
      	languages: head(response.payload).lenguages
      });
    }).catch(error => {
      console.log(error);
    }
    );
  },
  handleChangeLanguage(value) {
  	const { dispatch } = this.props;
  	dispatch(setLanguage(value));
  },
  selectImage(value) {
  	const { switchModal } = this.props;
    switchModal('avatar');
  },
  render() {
    const images = [
      {
          "id": 1,
          "path": "/media/images/sports/Futbol.svg"
      }
    ]
    const { api, selectedLanguage } = this.props;
    const imgs = images.map(img => <ProfileImage api={ api } setImageSelected= { this.selectImage } key={img.id} img={ img }/>);
    const langs= [
        {
            "id": 1,
            "name": "Español"
        },
        {
            "id": 2,
            "name": "Inglés"
        },
        {
            "id": 3,
            "name": "Alemán"
        }
    ];
    const data = { options: langs,
    			   selected: selectedLanguage };

    console.log(data);

    return (
      <div className='modal-input--avatar'>
        <h3 className='modal-input__title'>CREAR PERFIL</h3>

        { imgs }

        <div className='modal-input__label'>EDITAR</div>

        <div className='modal-input__input-group'>
        	<input placeholder='Nombre' className='modal-input__input-group__input'/>
        	<span className='modal-input__input-group__label'>
            	USUARIO
            </span>
        </div>

        <Select data={ data } onChange={ this.handleChangeLanguage }/>
        <span>
        	IDIOMA
        </span>
        
        <button className='button button--block button--gray' type="button" >Guardar</button>
      </div>
    );
  },
});