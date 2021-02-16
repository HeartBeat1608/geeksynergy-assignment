import React, { useState } from 'react'
import { useHistory, Link } from 'react-router-dom'

const Login = () => {

  const initialState = { name: '', password: '' }

  const [state, setState] = useState(initialState);
  const [error, setError] = useState(null);

  const history = useHistory()

  const handleOnChange = (e) => {
    setState(p => ({ ...p, [e.target.name]: e.target.value }))
  }

  const onLogin = (e) => {
    try {
      const local = JSON.parse(localStorage.getItem('GEEK_SYNERGY_AUTH'));
      if (!local) throw new Error('Oops. Something went wrong');

      if (local.name !== state.name) {
        throw new Error('Invalid Name');
      }

      if (local.password !== state.password) {
        throw new Error('Invalid Password');
      }

      history.push('/home');
    } catch (error) {
      setError(error.message)
    }
  }

  const onReset = () => {
    setState(initialState);
    setError(null);
  }

  return (
    <div className="md:container  bg-white px-8 py-6" style={{ minWidth: '400px' }}>
      <h2 className="text-gray-600 text-center text-2xl">Login</h2>
      <hr className="mt-1" />
      <span className={`text-white bg-red-400 text-base rounded mx-auto block text-center px-2 py-1 mt-3 ${!error && 'hidden'}`}>{error}</span>
      <div className="space-y-4 py-4">
        <fieldset className="flex flex-col align-start justify-start">
          <label className="text-base text-gray-500" htmlFor="name">Name</label>
          <input className="border border-gray-300 py-1 px-4" type="text" name="name" id="name" value={state.name} onChange={handleOnChange} />
        </fieldset>
        <fieldset className="flex flex-col align-start justify-start">
          <label className="text-base text-gray-500" htmlFor="password">Password</label>
          <input className="border border-gray-300 py-1 px-2" type="password" name="password" id="password" value={state.password} onChange={handleOnChange} />
        </fieldset>
      </div>
      <div className="flex flex-row justify-center align-center space-x-8">
        <button className="bg-green-400 text-white my-2 rounded-md px-6 py-2 text-base" onClick={onLogin}>Login</button>
        <button className="bg-red-400 text-white my-2 rounded-md px-6 py-2 text-base" onClick={onReset}>Reset</button>
      </div>
      <div className="flex flex-row justify-center align-center w-100 text-center mt-2">
        <Link className={'text-blue-500 text-center'} to={'/signup'}>Sign Up &nbsp;&rarr;</Link>
      </div>
    </div>
  )
}

export default Login
