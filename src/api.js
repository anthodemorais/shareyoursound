const baseUrl = 'https://api.shareyoursound.loscil.fr/api';

const api = {
  login(email, password, completion) {
    const body = { username: email, password };
    const headers = {
      'Content-Type': 'application/json',
      'Content-Length': JSON.stringify(body).length.toString(),
    };
    fetch(`${baseUrl}/login_check`, {
      method: 'POST', headers, body: JSON.stringify(body),
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
    const headers = {
      'Content-Type': 'application/json',
      'Content-Length': JSON.stringify(body).length.toString(),
    };
    fetch(`${baseUrl}/register`, {
      method: 'POST', headers, body: JSON.stringify(body),
    }).then(() => {
      this.login(email, password, () => {
        completion();
      });
    }).catch((error) => {
      console.log(error.message);
    });
  },

  getRequest(url, completion) {
    const headers = {
      'Content-Type': 'application/json',
      'Content-Length': '0',
      Authentication: `Bearer ${localStorage.getItem('token')}`,
    };
    fetch(`${baseUrl}${url}`, { headers }).then((res) => {
      res.json().then((data) => {
        completion(data);
      });
    }).catch((error) => {
      console.log(error.message);
      completion('error');
    });
  },

  postOrPutRequest(method, url, body, completion) {
    const headers = {
      'Content-Type': 'application/json',
      'Content-Length': JSON.stringify(body).length.toString(),
      Authentication: `Bearer ${localStorage.getItem('token')}`,
    };
    fetch(`${baseUrl}${url}`, {
      method, headers, body: JSON.stringify(body),
    }).then(() => {
      completion();
    }).catch((error) => {
      console.log(error.message);
      completion('error');
    });
  },

  deleteRequest(url, completion) {
    const headers = {
      'Content-Type': 'application/json',
      'Content-Length': '0',
      Authentication: `Bearer ${localStorage.getItem('token')}`,
    };
    fetch(`${baseUrl}${url}`, {
      method: 'DELETE', headers,
    }).then(() => {
      completion();
    }).catch((error) => {
      console.log(error.message);
      completion('error');
    });
  },

};

export default api;
