import React from 'react'

import NameForm from '../components/name-form'
import EssayForm from '../components/essay-form'
import FlavorForm from '../components/flavor-form'
import MultiInputForm from '../components/multi-input-form'
import UncontrolledNameForm from '../components/uncontrolled-name-form'

export default function Home () {
  return (
    <>
      <div>Hello to the world!</div>
      <br />
      <br />
      <NameForm />
      <br />
      <br />
      <EssayForm />
      <br />
      <br />
      <FlavorForm />
      <br />
      <br />
      <MultiInputForm />
      <br />
      <br />
      <input value='hi' />
      <input value={null} disabled />
      <br />
      <br />
      <UncontrolledNameForm />
    </>
  )
}
