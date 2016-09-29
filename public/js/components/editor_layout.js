class LayoutEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      layout: 'three-quarter-single',
    }

    this.renderInputs = this.renderInputs.bind(this);
    this.boxClick = this.boxClick.bind(this);
  }

  boxClick(layout) {
    this.setState({layout: layout});
  }

  renderInputs(container, active) {
    const inputs = container.map(function(item, index) {
      const name = item.replace(/-/g, ' ');
      const url = `/img/${item}.png`;

      return (
        <div key={index} className="box__choice">
          <img alt={name} src={url} className={item === this.state.layout ? '-active' : ''} onClick={()=>this.boxClick(item)}></img>
          <p>{name}</p>
        </div>
      );
    }.bind(this));

    return inputs;
  }

  render() {
    return (
      <div className="box-selection">{this.renderInputs(this.props.layouts, this.state.layouts)}</div>
    );
  }
}

LayoutEditor.defaultProps = {
  layouts: ['center', 'three-quarter-single', 'three-quarter-triad', 'three-quarter-quartet']
}
