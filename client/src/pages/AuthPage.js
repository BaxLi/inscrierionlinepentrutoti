import React, { useState } from 'react'

export const AuthPage = () => {
  const [form, setForm] = useState({ email: '', password: '' })

  const changeHandler = (ev) => {
    setForm({ ...form, [ev.target.name]: ev.target.value })
  }

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h5>Programarea serviciilor online</h5>
        <div className="card blue darken-1">
          <div className="card-content white-text">
            <span className="card-title">Authorization</span>
          </div>

          <div className="input-field">
            <input
              id="email"
              name="email"
              onChange={changeHandler}
              type="email"
              class="validate"
              className="yellowInput"
            />
            <label htmlFor="email">E@mail</label>
          </div>
          <div className="input-field">
            <input
              id="password"
              name="password"
              onChange={changeHandler}
              type="password"
              class="validate"
              className="yellowInput"
            />
            <label htmlFor="password">Password</label>
          </div>

          <div className="card-action">
            <button className="btn yellow darken-4 waves-effect waves" onClick={}>
              Login
            </button>
            <button className="btn grey lighten-1 black-text waves-effect waves" onClick={}>
              Register new
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
