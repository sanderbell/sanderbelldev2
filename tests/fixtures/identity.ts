type State = {user: {email: string} | null; callback?: {type: string; token?: string}; calls: {method: string; value?: string}[]};
const state = () => (globalThis as typeof globalThis & {huiAuthFixture: State}).huiAuthFixture;
export async function getUser() { return state().user; }
export async function handleAuthCallback() { return state().callback || null; }
export async function login(email: string) { state().calls.push({method: 'login', value: email}); state().user = {email}; return state().user; }
export async function acceptInvite(token: string, password: string) { state().calls.push({method: 'invite', value: password}); state().user = {email: 'owner@example.test'}; }
export async function updateUser(data: {password: string}) { state().calls.push({method: 'password', value: data.password}); }
export async function requestPasswordRecovery(email: string) { state().calls.push({method: 'recovery', value: email}); }
export async function logout() { state().calls.push({method: 'logout'}); state().user = null; }
