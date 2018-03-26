import React, { Component } from 'react'
import SectionTile from '../components/SectionTile'

class SectionShowContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  render() {
    let sectionTiles = this.props.sections.map(section => {
      return(
          <SectionTile
            key={section.id}
            id={section.id}
            name={section.name}
            handleClick={this.props.handleClick}
          />
      )
    })
    return (
      <table className='section'>
        <thead>
          <tr>
            {sectionTiles}
          </tr>
        </thead>
      </table>
    )
  }
}

export default SectionShowContainer;