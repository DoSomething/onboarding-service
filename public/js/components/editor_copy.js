class CopyEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      copy: []
    }

    this.renderForm = this.renderForm.bind(this);
    this.renderCopy = this.renderCopy.bind(this);
    this.deleteCopy = this.deleteCopy.bind(this);
    this.addCopy = this.addCopy.bind(this);
  }

  deleteCopy(index) {
    delete this.state[index];
  }

  addCopy(type) {
    const text = document.getElementById(`copy_${type}`).value;
    this.state.copy.push({type: type, text: text});
    this.forceUpdate();
  }

  renderForm() {
    return (
      <div className="copy-edit">
        <div className="form-item">
          <label className="field-label">Header</label>
          <input id="copy_header" type="text" className="text-field"></input>
          <a className="button -padded" onClick={()=>this.addCopy('header')}>Add header</a>
        </div>
        <div className="form-item">
          <label className="field-label">Paragraph</label>
          <input id="copy_paragraph" type="text" className="text-field"></input>
          <a className="button -padded" onClick={()=>this.addCopy('paragraph')}>Add paragraph</a>
        </div>
      </div>
    );
  }

  renderCopy() {
    const copy = this.state.copy.map(function(c, index) {
      if (c.type === 'header') return <h1 key={index} onClick={()=>this.deleteCopy(index)}>{c.text}</h1>
      if (c.type === 'paragraph') return <p key={index} onClick={()=>this.deleteCopy(index)}>{c.text}</p>
    }.bind(this));

    return copy || null;
  }

  render() {
    return (
      <div>
        {this.renderForm()}
        {this.renderCopy()}
      </div>
    );
  }
}
