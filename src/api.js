import swal from 'sweetalert';

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
      swal('Error', 'Failed to log in. Try again...', 'error');
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
      swal('Error', 'Failed to register. Try again...', 'error');
    });
  },

  getRequest(url, completion) {
    const headers = {
      'Content-Type': 'application/json',
      'Content-Length': '0',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };
    fetch(`${baseUrl}${url}`, { headers }).then((res) => {
      res.json().then((data) => {
        completion(data);
        console.log(data);
      });
    }).catch((error) => {
      console.log(error.message);
      completion('error');
      swal('Error', `Failed to get ${url}. Try again...`, 'error');
    });
  },

  postOrPutRequest(method, url, body, completion) {
    const headers = {
      'Content-Type': 'application/json',
      'Content-Length': JSON.stringify(body).length.toString(),
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };
    fetch(`${baseUrl}${url}`, {
      method, headers, body: JSON.stringify(body),
    }).then(() => {
      completion();
    }).catch((error) => {
      console.log(error.message);
      completion('error');
      swal('Error', 'Failed to submit. Try again...', 'error');
    });
  },

  deleteRequest(url, completion) {
    const headers = {
      'Content-Type': 'application/json',
      'Content-Length': '0',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };
    fetch(`${baseUrl}${url}`, {
      method: 'DELETE', headers,
    }).then(() => {
      completion();
    }).catch((error) => {
      console.log(error.message);
      completion('error');
      swal('Error', 'Failed to delete. Try again...', 'error');
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

export default api;
