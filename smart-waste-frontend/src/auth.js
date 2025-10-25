export function saveAuth({ token, user }){
localStorage.setItem('token', token)
localStorage.setItem('user', JSON.stringify(user))
}
export function loadToken(){ return localStorage.getItem('token') }
export function loadUser(){ const u = localStorage.getItem('user'); return u ? JSON.parse(u) : null }
export function clearAuth(){ localStorage.removeItem('token'); localStorage.removeItem('user') }