import styles from '../../../node_modules/codemirror/lib/codemirror.css';
import createWidgetContainer from '../../../core/containers/widgetContainer';

import React from 'react'
import CodeMirror from 'react-codemirror'
import '../../../node_modules/codemirror/addon/display/autorefresh.js'

const options = {
  lineNumbers: true,
  autoRefresh: true,
  mode: 'javascript'
}

class CodeEditor extends React.Component {
  constructor(props) {
    super(props);
    this.updateCode = this.updateCode.bind(this);
  }

  updateCode(newCode) {
    this.setState({
      code: newCode
    })
  }

  render() {
    return (
      <div>
        <CodeMirror ref="editor" value={this.props.state.content} options={options} onChange={this.updateCode}/>
      </div>
    );
  }
}

export default createWidgetContainer(CodeEditor, {}, {
  titlePrefix: 'Code'
});
