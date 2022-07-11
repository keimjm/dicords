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
          <div className='splash-content'></div>
        </div>
    </div>
  )
}

export default SplashPage
