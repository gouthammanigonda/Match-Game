import './index.css'

const Header = props => {
  const {score, timer, stopTimer} = props
  if (timer === 0) {
    stopTimer()
  }

  return (
    <div className="header-container">
      <div className="img-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/match-game-website-logo.png "
          alt="website logo"
          className="logo-img"
        />
      </div>
      <div className="score-container">
        <div>
          <p className="header-heading">
            score: <spam className="span-ele">{score}</spam>
          </p>
        </div>

        <div className="timer-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/match-game-timer-img.png"
            alt="timer"
            className="timer"
          />
          <span className="span-ele">{timer} sec</span>
        </div>
      </div>
    </div>
  )
}

export default Header
