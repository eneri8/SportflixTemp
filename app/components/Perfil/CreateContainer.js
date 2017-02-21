import Create from './Create';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  return {
    api: state.api,
    token: state.token,
    selectedLanguage: state.language,
    avatar: state.avatar,
  };
}

export default connect(mapStateToProps)(Create);