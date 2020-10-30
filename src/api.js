const baseUrl = 'https://api.shareyoursound.loscil.fr/api';
const headers = { 'Content-Type': 'application/json' };
const headersLogged = { 'Content-Type': 'application/json', Authentication: `Bearer ${localStorage.getItem('token')}` };

const api = {
  login(email, password, completion) {
    const body = { username: email, password };
    fetch(`${baseUrl}/login_check`, {
      method: 'POST', headers, body,
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
    fetch(`${baseUrl}/register`, {
      method: 'POST', headers, body,
    }).then(() => {
      this.login(email, password, () => {
        completion();
      });
    }).catch((error) => {
      console.log(error.message);
    });
  },

  getRequest(url, completion) {
    fetch(`${baseUrl}${url}`, {
      headers: headersLogged,
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
    fetch(`${baseUrl}${url}`, {
      method, headers: headersLogged, body,
    }).then(() => {
      completion();
    }).catch((error) => {
      console.log(error.message);
      completion('error');
    });
  },

  deleteRequest(url, completion) {
    fetch(`${baseUrl}${url}`, {
      method: 'DELETE', headers: headersLogged,
    }).then(() => {
      completion();
    }).catch((error) => {
      console.log(error.message);
      completion('error');
    });
  },

};

export default api;
