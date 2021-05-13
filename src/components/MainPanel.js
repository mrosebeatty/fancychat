import React from 'react'

const MainPanel =({children}) => (
    <div className='column hero'> 
              <div className='hero-body'>
                <div className='columns is-centered'>
                   {children}
                </div>
              </div> 
            </div>
    )

export default MainPanel;

