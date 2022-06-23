import React from 'react'
import NavBar from '../NavBar/NavBar'
import Recipes from '../RecipeCard/RecipeCard'

function MainRoute() {
  return (
    <div>
      <NavBar/>
      <Recipes/>
    </div>
  )
}

export default MainRoute