import React, { PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { v4 } from 'uuid';
import { isNumber, isUndefined, kebabCase } from 'lodash';

function renderOptions(options = []) {
  return options.map(option => {
    const value = option.id ? option.id : option.value;

    return <option key={ v4() } value={ value }>{ option.name }</option>;
  });
}

function getSelectedValue(selected, options) {
  if (isUndefined(selected)) return 1;
  if (isNumber(selected)) return selected;
  const element = options.find(option => Object.is(kebabCase(option.name), kebabCase(selected)));

  return !isUndefined(element) ? element.value : 1;
}

export default React.createClass({
  displayName: 'Select',
  mixins: [ PureRenderMixin ],
  propTypes: {
    className: PropTypes.string,
    data: PropTypes.object.isRequired,
    isDisabled: PropTypes.bool,
    onChange: PropTypes.func,
  },
  getInitialState() {
    const { selected, options = [] } = this.props.data;
    const value = getSelectedValue(selected, options);

    return { options, value };
  },
  handleChange(event) {
    const { onChange } = this.props;
    const value = event.target.value;
    if (onChange) onChange(value);
    this.setState({ value });
  },
  componentWillReceiveProps(nextProps) {
    const { options } = this.props.data;
    const optionsLen = options.hasOwnProperty('size') ? options.size : options.length;

    if (optionsLen) {
      const nextOptions = nextProps.data.options;
      const value = getSelectedValue(nextProps.data.selected, nextOptions);
      this.setState({ value, options: nextOptions });
    }
  },
  render() {
    const { className = '', data = {} } = this.props;
    const { options, value } = this.state;
    const { label, name, isDisabled = false } = data;
    const selectClassName = data.className ? data.className : '';
    const disabledModifier = isDisabled ? 'raw-select--disabled' : '';
    const labelElement = label ? <label className='div-select__label'>{ label }</label> : undefined;

    return (
      <div className={ `div-select ${ className }`.trim() }>
        { labelElement }
        <div className='u-select-wrapper'>
          <select className={ `${ selectClassName } raw-select ${ disabledModifier }`.trim() }
                  name={ name }
                  disabled={ isDisabled }
                  value={ value }
                  onChange={ this.handleChange }>
            { renderOptions(options) }
          </select>
        </div>
      </div>
    );
  },
});