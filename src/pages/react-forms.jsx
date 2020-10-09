import React from 'react'

import NameForm from '../components/predefined-forms/name-form'
import EssayForm from '../components/predefined-forms/essay-form'
import FlavorForm from '../components/predefined-forms/flavor-form'
import MultiInputForm from '../components/predefined-forms/multi-input-form'
import UncontrolledNameForm from '../components/predefined-forms/uncontrolled-name-form'

export default function () {
  return (
    <>
      <h1>React Forms</h1>
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
      <input defaultValue='hi' />
      <input defaultValue={undefined} disabled />
      <br />
      <br />
      <UncontrolledNameForm />
    </>
  )
}
