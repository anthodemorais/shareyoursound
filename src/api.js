export default {
  baseUrl: 'https://api.shareyoursound.loscil.fr/api',
  headers: { 'Content-Type': 'application/json' },
  headersLogged: this.headers + { Authorization: `Bearer ${localStorage.getItem('token')}` },
  login(email, password, completion) {
    const body = { username: email, password };
    fetch(`${this.baseUrl}/login_check`, {
      method: 'POST', headers: this.headers, body,
    }).then((res) => {
      res.json().then((data) => {
        localStorage.setItem('token', data.token);
        completion();
      });
    }).catch((error) => {
      console.log(error);
    });
  },

  register(email, password, firstname, lastname, completion) {
    const body = {
      email, password, firstname, lastname,
    };

    fetch(`${this.baseUrl}/register`, {
      method: 'POST', headers: this.headers, body,
    }).then(() => {
      this.login(email, password, () => {
        completion();
      });
    }).catch((error) => {
      console.log(error);
    });
  },

  getMe() {
    fetch(`${this.baseUrl}/api/type`, {
      headers: this.headers,
    }).then((res) => {
      res.json().then((response) => {
        this.posts = response;
        console.log(response);
      });
    }).catch((error) => {
      console.log(error);
    });
  },

};
