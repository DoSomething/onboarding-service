class CopyEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      copy: []
    }

    this.getFormItem = this.getFormItems.bind(this);
    this.copyChange = this.copyChange.bind(this);
    this.addCopy = this.addCopy.bind(this);
    this.deleteCopy = this.deleteCopy.bind(this);
  }

  deleteCopy(index) {
    this.state.copy.splice(index, 1);
    this.forceUpdate();
  }

  addCopy() {
    this.state.copy.push({type: 'header', text: ''});
    this.forceUpdate();
  }

  copyChange(e) {
    this.state.copy[e.target.dataset.index] = e.target.value;
    this.forceUpdate();
  }

  dragStart() {

  }

  getFormItems(copy) {
    const items = this.state.copy.map(function(c, index) {
      return (
        <div key={index} id={`copy_${index}`} className="form-item -inline -padded">
          <div className="select -inline">
            <select>
              <option>Header</option>
              <option>Paragraph</option>
            </select>
          </div>
          <input id="copy_header" type="text" className="text-field" value={c.text} onChange={this.copyChange} data-index={index}></input>
          <a className="button -padded -delete" onClick={()=> this.deleteCopy(index)}>Delete</a>
        </div>
      );
    }.bind(this));
    return items;
  }

  render() {
    return (
      <div>
        <a className="button" onClick={this.addCopy}>Add</a>
        <div className="copy-edit">
          {this.getFormItems()}
        </div>
      </div>
    );
  }
}
