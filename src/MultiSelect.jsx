import React, {Component, PropTypes} from 'react'
import _ from 'lodash'

const SEPARATOR = ','

export default class MultiSelect extends Component {

  constructor(props, context) {
    super(props, context)

    this.state = {
      focused: false,
      query: '',
      fieldWidth: null //gotten from sizer, TODO
    }

    this.onClickDocument = this._onClickDocument.bind(this)
  }

  static propTypes = {
    extraClass: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    placeholder: PropTypes.string
  }

  static defaultProps = {
    extraClass: '',
    options: [],
    placeholder: ''
  }

  componentDidMount() {
    document.addEventListener('click', this.onClickDocument)
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.onClickDocument)
  }

  render() {
    const {options, placeholder} = this.props
    const {value, onChange} = this.props.input
    const {focused, query} = this.state

    const values = value ? _.filter(value.split(SEPARATOR), t => !!t) : []

    const filteredOptions = _.filter(_.difference(options, values), (opt) => (
      opt.toLowerCase().indexOf( query.toLowerCase() ) !== -1
    ))

    return (
      <div className="ui fluid search dropdown selection multiple" onClick={this._onClick.bind(this)}>
        <i className="dropdown icon"></i>
        {_.map(values, (s, idx) =>
          (<Label key={`label-${idx}`} name={s} onRemove={this._removeValue.bind(this, s)}/>)
        )}
        <input ref='query' className="search"
          autocomplete="off" tabindex="0"
          onChange={this._onTextChange.bind(this)}
          onKeyDown={this._onKeyDown.bind(this)}
          value={query}/>
        <span className="sizer" ref='sizer'>{query}</span>
        {!query && (<div className="default text">{placeholder}</div>)}

        {focused && (
          <div className="menu transition visible" tabindex="-1" style={{display: 'block !important'}}>
            {_.map(filteredOptions, (o, idx) =>
              (<div key={`item-${idx}`} className="item" onClick={this._onSelect.bind(this, o)}>{o}</div>)
            )}
          </div>
        )}

      </div>
    )
  }

  _onClickDocument(evt) {
    if(this.state.focused) {
      this._resetUI()
    }
  }

  _onClick(evt) {
    evt.nativeEvent.stopImmediatePropagation()
    if(!this.state.focused){
      this.setState({focused: true})
    }
    this.refs.query.focus()
  }

  _onTextChange(evt) {
    const newText = evt.target.value
    this.setState({query: newText}) //just to update sizer in order to get the width (Semantic UI design)

    //next tick
    // setTimeout(() => {
    //   console.log( this.refs.sizer.offsetWidth )
    //   // const newState = {fieldWidth : this.refs.sizer.offsetWidth}
    //   // this.setState(newState)
    // }, 0)
    //
  }

  _onSelect(text) {
    const {input : {value , onChange}} = this.props
    let values = value ? _.filter(value.split(SEPARATOR), t => !!t) : []
    values.push(text)
    onChange(values.join(SEPARATOR))

    this.setState({query: ''})
  }

  _onKeyDown(evt) {
    if(evt.keyCode === 9) {
      evt.preventDefault()
      const newValue = evt.target.value
      if(!!newValue){
        this._onSelect(newValue)
      }
    } else if(evt.keyCode === 8) {
      if(!evt.target.value) {
        this._removeValue()
      }
    }

  }

  _removeValue(text = undefined) {
    const {input : {value , onChange}} = this.props
    let values = value ? _.filter(value.split(SEPARATOR), t => !!t) : []

    if(!text) {

      if(values) {
        values.pop()
        onChange(values.join(SEPARATOR))
      }
    } else {
      const newValue = _.reject(values, (txt) => (txt === text))
      onChange(newValue.join(SEPARATOR))
    }
  }

  _resetUI() {
    this.setState({focused: false, query: ''})
    setTimeout(() => {this.refs.query.blur()}, 0)
  }

}

const Label = ({name, onRemove = f=>f}) => (
  <a className="ui label transition visible">{name}<i className="delete icon" onClick={onRemove}></i></a>
)
