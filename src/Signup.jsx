import { useState } from 'react'
import { useHistory, Link } from 'react-router-dom'

const Signup = () => {

  const initialState = { name: '', password: '', email: '', phone: '', profession: '' }

  const [state, setState] = useState(initialState);
  const [error, setError] = useState(null);

  const history = useHistory()

  const handleOnChange = (e) => {
    setState(p => ({ ...p, [e.target.name]: e.target.value }))
  }

  const onSubmit = (e) => {
    // store the data locally in local storage
    try {
      localStorage.setItem('GEEK_SYNERGY_AUTH', JSON.stringify(state));
      history.push('/login')
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
      <h2 className="text-gray-600 text-center text-2xl">SignUp</h2>
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
        <fieldset className="flex flex-col align-start justify-start">
          <label className="text-base text-gray-500" htmlFor="email">Email</label>
          <input className="border border-gray-300 py-1 px-2" type="text" name="email" id="email" value={state.email} onChange={handleOnChange} />
        </fieldset>
        <fieldset className="flex flex-col align-start justify-start">
          <label className="text-base text-gray-500" htmlFor="phone">Phone</label>
          <input className="border border-gray-300 py-1 px-2" type="text" name="phone" id="phone" value={state.phone} onChange={handleOnChange} />
        </fieldset>
        <fieldset className="flex flex-col align-start justify-start">
          <label className="text-base text-gray-500" htmlFor="profession">Profession</label>
          <select className="border border-gray-300 py-2 px-2" name="profession" id="profession" onChange={handleOnChange}>
            <option value="student">Student</option>
            <option value="salaried">Salaried</option>
            <option value="self-employed">Self Employed</option>
            <option value="business">Business</option>
          </select>
        </fieldset>
      </div>
      <div className="flex flex-row justify-center align-center space-x-8">
        <button className="bg-green-400 text-white my-2 rounded-md px-6 py-2 text-base" onClick={onSubmit}>SignUp</button>
        <button className="bg-red-400 text-white my-2 rounded-md px-6 py-2 text-base" onClick={onReset}>Reset</button>
      </div>
      <div className="flex flex-row justify-center align-center w-100 text-center mt-3">
        <Link className={'text-blue-500 text-center'} to={'/login'}>Login Instead? &nbsp;&rarr;</Link>
      </div>
    </div>
  )
}

export default Signup
