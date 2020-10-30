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
      console.log(error.message);
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
      console.log(error.message);
    });
  },

  getRequest(url, completion) {
    fetch(`${this.baseUrl}${url}`, {
      headers: this.headersLogged,
    }).then((res) => {
      res.json().then((data) => {
        completion(data);
      });
    }).catch((error) => {
      console.log(error.message);
      completion('error');
    });
  },

  postOrPutRequest(method, url, body, completion) {
    fetch(`${this.baseUrl}${url}`, {
      method, headers: this.headersLogged, body,
    }).then(() => {
      completion();
    }).catch((error) => {
      console.log(error.message);
      completion('error');
    });
  },

  deleteRequest(url, completion) {
    fetch(`${this.baseUrl}${url}`, {
      method: 'DELETE', headers: this.headersLogged,
    }).then(() => {
      completion();
    }).catch((error) => {
      console.log(error.message);
      completion('error');
    });
  },

};
