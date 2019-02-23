import React, { Component } from 'react';
import './App.css';
import marked from 'marked'
import { connect } from 'react-redux'

const ACTIONS = {
  SET_CONTENT: "SET_CONTENT",
  SET_RESULT: "SET_CONTENT",
  GET_RESULT: "GET_RESULT",
  GET_CONTENT: "GET_RESULT"
}
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      magnifiedWindow: ''
    }
  }
  componentDidMount() {
    document.getElementById('preview').innerHTML = this.props.result
  }
  onChangeText = (e) => {
    this.props.setContent(e.target.value)
    this.props.setResult(e.target.value)
    let markedValue = marked(e.target.value)
    document.getElementById('preview').innerHTML = markedValue
  }
  onMagnify = (e) => {
    const normalClassName = document.getElementById(e.target.id).parentElement.parentElement.className
    if (normalClassName === 'editor-container' | normalClassName === 'result-container') {
      this.setState({ magnifiedWindow: normalClassName })
    }
    document.getElementById(e.target.id).parentElement.parentElement.className =
      normalClassName === this.state.magnifiedWindow
        ? 'expand-class'
        : this.state.magnifiedWindow
  }

  render() {
    return (
      <div className="App">
        <div className="editor-container">
          <div className="editor-head">
            <i class="fas fa-fire"></i>
            &nbsp;Editor &nbsp;
            <i className="fas fa-compress-arrows-alt close-icon" id="expand-editor" onClick={this.onMagnify}></i>
          </div>
          <textarea id="editor" onChange={this.onChangeText}>{this.props.content}</textarea>
        </div>
        <div className="result-container">
          <div className="result-head">
            <i class="fas fa-fire"></i>
            &nbsp;Previewer &nbsp;
          <i className="fas fa-compress-arrows-alt close-icon" id="expand-preview" onClick={this.onMagnify}></i></div>
          <span id="preview">
          </span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    content: state.content,
    result: state.result
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setContent: (content) => { dispatch({ type: ACTIONS.SET_CONTENT, content: content }) },
    getContent: () => { dispatch({ type: ACTIONS.GET_CONTENT }) },
    setResult: (content) => { dispatch({ type: ACTIONS.SET_RESULT, content: content }) },
    getResult: () => { dispatch({ type: ACTIONS.GET_RESULT }) },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
