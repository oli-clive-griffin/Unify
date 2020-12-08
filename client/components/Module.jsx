import React from 'react'
import { connect } from 'react-redux'
import Likes from './Likes'

import { ReactTinyLink } from 'react-tiny-link'
import { commentsFetched } from '../actions'

import Comments from './Comments'
import AddComments from './AddComment'

class Module extends React.Component {
  state = {
    currentModule: null
  }

  componentDidMount () {
    const currentModuleId = Number(this.props.match.params.id)
    const currentModule = this.props.modules.find((module) => module.id == currentModuleId)
    this.setState({currentModule})
  }

  componentDidUpdate (prevProps) {
    if (!prevProps || prevProps.match.params.id !== this.props.match.params.id || prevProps.modules.length !== this.props.modules.length || prevProps !== this.props) {
      
      console.log('update if ');

      const currentModuleId = Number(this.props.match.params.id)
      const currentModule = this.props.modules.find((module) => module.id === currentModuleId)
      this.setState({ currentModule })
    }
  }  

  render () {
    return (

      this.state.currentModule ? 
      <div className = 'module' >
        <div className='h-module' >
          <Likes module={this.state.currentModule}/> 
          <h1> {this.state.currentModule.title} </h1>
          <div id='duration-and-saved'>
            <h5 id='num-users-saved'> {this.state.currentModule.likes ? this.state.currentModule.likes : 0} User(s) Have Saved This Module</h5>
            <h5 id='duration-display'>Duration: Approximately {this.state.currentModule.duration} minutes </h5>
          </div>
        </div>
        
        <div className="B-I-module">

          {this.state.currentModule.elements.map((item, i) => {
            switch (item.type) {
              case 'heading':
                return <h3 key={i}> {item.content} </h3>

              case 'paragraph':
                return <p key={i}> {item.content} </p>

              case 'link':
                return (

                  <div className="react-tiny-link"key={i}>
                    {item.content.includes('http') && <ReactTinyLink
                      cardSize="small"
                      showGraphic={true}
                      maxLine={2}
                      minLine={1}
                      url={item.content}
                    />}
                  </div>
                )
              case 'video':
                return (
                  item.content.includes("embed") ?
                  <div className="video-container" key={i}>
                    <iframe
                      height="auto"
                      src={item.content}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen>
                    </iframe>
                  </div>
                  : ""
                )
            }
          })}
        </div>

        <AddComments moduleID = {this.props.match.params.id}/>

        <Comments comments={this.state.currentModule.comments}/>
      </div> : ''
    )
  }
}

function mapStateToProps (globalState) {
  return {
    modules: globalState.modules
  }
}
export default connect(mapStateToProps)(Module)
