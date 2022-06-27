import './index.css'

const Header = props => {
  const {score, timer, stopTimer} = props
  if (timer === 1) {
    stopTimer()
  }

  return (
    <ul className="header-container">
      <div className="img-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/match-game-website-logo.png "
          alt="website logo"
          className="logo-img"
        />
      </div>
      <ul className="score-container">
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
      </ul>
    </ul>
  )
}

export default Header
