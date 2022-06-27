import {Component} from 'react'
import Header from '../Header'
import Results from '../Result'
import './index.css'

class Game extends Component {
  state = {
    activeTabId: 'FRUIT',
    randomImageId: '',
    randomImage: '',
    score: 0,
    gameInProgress: true,
    timer: 60,
  }

  componentDidMount() {
    this.generateRandomImage()
    this.timer()
  }

  componentWillUnmount() {
    this.stopTimer()
  }

  generateRandomImage = () => {
    const random = Math.floor(Math.random() * 30)
    const {imagesList} = this.props
    const randomImageId = imagesList[random].id
    const randomImage = imagesList[random].imageUrl
    this.setState({
      randomImageId,
      randomImage,
    })
  }

  timer = () => {
    this.Index = setInterval(() => {
      this.setState(prevState => ({
        timer: prevState.timer - 1,
      }))
    }, 1000)
  }

  stopTimer = () => {
    clearInterval(this.Index)
    this.setState({
      timer: 0,
      gameInProgress: false,
    })
  }

  categoryButton = id => {
    this.setState({
      activeTabId: id,
    })
  }

  EachButton = id => {
    const {randomImageId} = this.state
    if (id === randomImageId) {
      this.setState(
        prevState => ({
          score: prevState.score + 1,
          gameInProgress: true,
        }),
        this.generateRandomImage,
      )
    } else {
      this.setState({
        gameInProgress: false,
      })
    }
  }

  renderItems = () => {
    const {activeTabId} = this.state
    const {imagesList} = this.props
    const activeList = imagesList.filter(each => each.category === activeTabId)
    return (
      <ul className="unordered-list">
        {activeList.map(each => {
          const onClickEachButton = () => {
            this.EachButton(each.id)
          }
          return (
            <li key={each.id} className="list-item">
              <button
                className="each-button"
                type="button"
                onClick={onClickEachButton}
              >
                <img
                  src={each.thumbnailUrl}
                  alt="thumbnail"
                  className="each-img"
                />
              </button>
            </li>
          )
        })}
      </ul>
    )
  }

  renderGameProgressView = () => {
    const {tabsList} = this.props
    const {activeTabId, randomImage} = this.state
    return (
      <div className="flex">
        <ul>
          <div key={randomImage} className="random-list">
            <img src={randomImage} alt="match" className="result-img" />
          </div>
        </ul>
        <div className="buttons-container">
          {tabsList.map(each => {
            const onClickCategory = () => {
              this.categoryButton(each.tabId)
            }

            const activeBtn = activeTabId === each.tabId
            const classname = activeBtn ? 'active' : ''

            return (
              <button
                className={`button ${classname}`}
                type="button"
                onClick={onClickCategory}
              >
                {each.displayText}
              </button>
            )
          })}
        </div>
        <div className="each-category">{this.renderItems()}</div>
      </div>
    )
  }

  onReset = () => {
    this.setState({
      activeTabId: 'FRUIT',
      score: 0,
      gameInProgress: true,
      timer: 60,
    })
  }

  render() {
    const {score, timer, gameInProgress} = this.state

    return (
      <div className="bg-container">
        <Header score={score} timer={timer} stopTimer={this.stopTimer} />
        <div className="main-container">
          {gameInProgress ? (
            this.renderGameProgressView()
          ) : (
            <Results
              score={score}
              onReset={this.onReset}
              stopTimer={this.stopTimer}
            />
          )}
        </div>
      </div>
    )
  }
}

export default Game
