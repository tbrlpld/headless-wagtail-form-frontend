import React from 'react'

import NameForm from '../components/name-form'
import EssayForm from '../components/essay-form'
import FlavorForm from '../components/flavor-form'

export default function Home () {
  return (
    <>
      <div>Hello to the world!</div>
      <p>
        <NameForm />
      </p>
      <p>
        <EssayForm />
      </p>
      <p>
        <FlavorForm />
      </p>
    </>
  )
}
