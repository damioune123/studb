import React from 'react'
import BananeImage from '../assets/banane.jpg'
import './HomeView.scss'

export const HomeView = () => (
  <div>
    <h4>Ceci n'est pas une banane!</h4>
    <img className='banane' src={BananeImage} />
  </div>
)

export default HomeView
