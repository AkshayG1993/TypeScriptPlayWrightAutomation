export const loginInvalidData = [
  { username: 'locked_out_user', password: 'secret_sauce',error:'Epic sadface: Sorry, this user has been locked out.' },
  { username: 'invalid_user', password: 'secret_sauce',error:'Epic sadface: Username and password do not match any user in this service' },
  { username: '', password: '', error:'Epic sadface: Username is required'},
  { username: 'error_user', password: '', error:'Epic sadface: Password is required'}
];