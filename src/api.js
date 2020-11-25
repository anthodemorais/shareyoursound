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
      if (res.status === 200) {
        res.json().then((data) => {
          localStorage.setItem('token', data.token);
          completion();
        });
      } else if (res.status === 404) {
        swal('404 Error', 'Wrong URL', 'error');
        completion('error');
      } else if (res.status === 403) {
        swal('Error', 'Bad Request', 'error');
        completion('error');
      } else if (res.status === 500) {
        swal('Error', 'Server Error', 'error');
        completion('error');
      }
    }).catch((error) => {
      console.log(error.message);
      swal('Error', 'Failed to log in. Try again...', 'error');
    });
  },

  register(firstname, lastname, email, password, completion) {
    const body = {
      email, password, firstname, lastname,
    };
    const headers = {
      'Content-Type': 'application/json',
      'Content-Length': JSON.stringify(body).length.toString(),
    };
    fetch(`${baseUrl}/register`, {
      method: 'POST', headers, body: JSON.stringify(body),
    }).then((res) => {
      if (res.status === 200) {
        this.login(email, password, () => {
          completion();
        });
      } else if (res.status === 404) {
        swal('404 Error', 'Wrong URL', 'error');
        completion('error');
      } else if (res.status === 403) {
        swal('Error', 'Bad Request', 'error');
        completion('error');
      } else if (res.status === 500) {
        swal('Error', 'Server Error', 'error');
        completion('error');
      }
    }).catch((error) => {
      swal('Error', 'Failed to register. Try again...', 'error');
      console.log(error.message);
    });
  },

  getRequest(url, completion) {
    const headers = {
      'Content-Type': 'application/json',
      'Content-Length': '0',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };
    fetch(`${baseUrl}${url}`, { headers }).then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          completion(data);
          console.log(data);
        });
      } else if (res.status === 404) {
        swal('404 Error', 'Wrong URL', 'error');
        completion('error');
      } else if (res.status === 403) {
        swal('Error', 'Bad Request', 'error');
        completion('error');
      } else if (res.status === 500) {
        swal('Error', 'Server Error', 'error');
        completion('error');
      }
    }).catch((error) => {
      console.log(error.message);
      swal('Error', `Failed to get ${url}. Try again...`, 'error');
      completion('error');
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
    }).then((res) => {
      if (res.status === 200) {
        completion();
      } else if (res.status === 404) {
        swal('404 Error', 'Wrong URL', 'error');
        completion('error');
      } else if (res.status === 403) {
        swal('Error', 'Bad Request', 'error');
        completion('error');
      } else if (res.status === 500) {
        swal('Error', 'Server Error', 'error');
        completion('error');
      }
    }).catch((error) => {
      console.log(error.message);
      swal('Error', 'Failed to submit. Try again...', 'error');
      completion('error');
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
    }).then((res) => {
      if (res.status === 200) {
        completion();
      } else if (res.status === 404) {
        swal('404 Error', 'Wrong URL', 'error');
        completion('error');
      } else if (res.status === 403) {
        swal('Error', 'Bad Request', 'error');
        completion('error');
      } else if (res.status === 500) {
        swal('Error', 'Server Error', 'error');
        completion('error');
      }
    }).catch((error) => {
      console.log(error.message);
      swal('Error', 'Failed to delete. Try again...', 'error');
      completion('error');
    });
  },

};

export default api;
