import React from 'react'

function SplashPage() {

  const handleLogin = () => {
    window.location.href = '/login'
  }

  return (
    <div className="splash-page">
        <div className='splash-container'>
          <div className='splash-nav-container'>
            <nav className='splash-nav'>
              <div className='logo-name'><span><i className="fa-brands fa-discord"></i></span>dicords</div>
              <ul className='links'>
                <li><a href='https://github.com/keimjm/dicords' className='no-decor-nav'>Github</a></li>
                <li><a href='https://www.linkedin.com/in/joshua-keim-5237a1167/' className='no-decor-nav'>LinkedIn</a></li>
                <li><a href='https://www.linkedin.com/in/joshua-keim-5237a1167/' className='no-decor-nav'>About</a></li>
              </ul>
              <button className='btn-login' onClick={handleLogin}>Login</button>
            </nav>
          </div>
          <div className='splash-content'>
            <div className='splash-body-header'>
              <h1>Imagine a Place....</h1>
            </div>
            <div className='splash-body'>
            ...where you can belong to a school club, a gaming group, or a worldwide art community. Where just you and a handful of friends can spend time together. A place that makes it easy to talk every day and hang out more often.
            </div>
            <button className='open-button' onClick={handleLogin}>Open Dicords</button>
          </div>
        </div>
    </div>
  )
}

export default SplashPage
