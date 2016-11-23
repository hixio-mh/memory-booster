import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import classnames from 'classnames';
import { action } from 'mobx';
import Block from './Block';

export class Play extends Component {
  static propTypes = {
    blocks: PropTypes.object.isRequired,
    length: PropTypes.number.isRequired
  };

  state = {
    gameOver: false
  };

  @action
  handleSelectBlock = (index) => {
    const block = this.props.blocks[index];
    block.selected = true;

    if (block.gem !== true) {
      this.setState({
        gameOver: true
      });
    }
  };

  renderBlock = (block, index) => {
    return <Block
      key={block.id}
      index={index}
      width={50}
      selected={block.selected}
      onClick={this.handleSelectBlock}
    />;
  };

  render() {
    const { blocks, length } = this.props;
    const { gameOver } = this.state;

    return (
      <div style={{ width: length * 50 }} className={classnames({ gameOver })}>
        { blocks.map(this.renderBlock) }

        { gameOver && <div className='gameOver__overlay'>
          Game Over
        </div> }
      </div>
    );
  }
}


export default inject(store => ({
  blocks: store.board.blocks,
  length: store.board.length
}))(observer(Play));
