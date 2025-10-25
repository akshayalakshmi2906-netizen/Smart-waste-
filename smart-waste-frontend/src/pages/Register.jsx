// import { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { api } from '../api'

// export default function Register() {
//   const nav = useNavigate()
//   const [form, setForm] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     address: '',
//     password: '',
//     confirmPassword: ''
//   })
//   const [err, setErr] = useState('')

//   // Update form values
//   const onChange = e => setForm({ ...form, [e.target.name]: e.target.value })

//   // Submit form
//   const onSubmit = async e => {
//     e.preventDefault()
//     setErr('')

//     if (form.password !== form.confirmPassword) {
//       return setErr('Passwords do not match')
//     }

//     try {
//       // Remove confirmPassword before sending to backend
//       const { confirmPassword, ...data } = form

//       // Make API call
//       await api.post('/auth/register', data)

//       // Navigate to login on success
//       nav('/login')
//     } catch (e) {
//       // Show backend error message if available
//       console.log(e?.response?.data) // for debugging
//       setErr(e?.response?.data?.error || 'Registration failed')
//     }
//   }

//   return (
//     <div className="container small">
//       <h2>Create account</h2>
//       <form onSubmit={onSubmit} className="form">
//         <input
//           name="name"
//           placeholder="Full name"
//           value={form.name}
//           onChange={onChange}
//           required
//         />
//         <input
//           name="email"
//           placeholder="Email"
//           value={form.email}
//           onChange={onChange}
//           required
//         />
//         <input
//           name="phone"
//           placeholder="Phone"
//           value={form.phone}
//           onChange={onChange}
//           required
//         />
//         <input
//           name="address"
//           placeholder="Address"
//           value={form.address}
//           onChange={onChange}
//           required
//         />
//         <input
//           name="password"
//           type="password"
//           placeholder="Password"
//           value={form.password}
//           onChange={onChange}
//           required
//         />
//         <input
//           name="confirmPassword"
//           type="password"
//           placeholder="Confirm password"
//           value={form.confirmPassword}
//           onChange={onChange}
//           required
//         />

//         {err && <div className="error">{err}</div>}
//         <button className="btn" type="submit">Register</button>
//       </form>
//       <div className="foot">
//         Already have an account? <a href="/login">Login</a>
//       </div>
//     </div>
//   )
// }

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../api'
import './Register.css'

export default function Register() {
  const nav = useNavigate()
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    confirmPassword: ''
  })
  const [err, setErr] = useState('')

  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const onSubmit = async e => {
    e.preventDefault()
    setErr('')

    if (form.password !== form.confirmPassword) {
      return setErr('Passwords do not match')
    }

    try {
      const { confirmPassword, ...data } = form
      await api.post('/auth/register', data)
      nav('/login')
    } catch (e) {
      console.log(e?.response?.data)
      setErr(e?.response?.data?.error || 'Registration failed')
    }
  }

  return (
    <div className="register-page">
      <div className="register-container">
        <h2 className="register-title">Create account</h2>
        <form onSubmit={onSubmit} className="register-form">
          <input
            name="name"
            placeholder="Full name"
            value={form.name}
            onChange={onChange}
            required
          />
          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={onChange}
            required
          />
          <input
            name="phone"
            placeholder="Phone"
            value={form.phone}
            onChange={onChange}
            required
          />
          <input
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={onChange}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={onChange}
            required
          />
          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirm password"
            value={form.confirmPassword}
            onChange={onChange}
            required
          />

          {err && <div className="register-error">{err}</div>}
          <button className="register-btn" type="submit">Register</button>
        </form>
        <div className="register-foot">
          Already have an account? <a href="/login">Login</a>
        </div>
      </div>
    </div>
  )
}
