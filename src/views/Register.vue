<template>
    <form @submit='onSubmit'>
        <div class="container register">
          <div class="row">
              <div class="col-md-3 register-left">
                  <img src="https://i1.wp.com/www.dijitalengagement.com/wp-content/uploads/2018/02/iTunesMusic.gif?fit=375%2C350&ssl=1" alt=""/>
                  <h3>Bienvenue dans Shareyoursound :)</h3>
              </div>
              <div class="col-md-9 register-right">
                  <div class="tab-content" id="myTabContent">
                      <div class="tab-pane fade show active" id="home" role="tabpanel"
                      aria-labelledby="home-tab">
                          <h3 class="register-heading">Register</h3>
                          <div class="row register-form">
                              <div class="col-md-6">
                                  <div class="form-group">
                                      <input type="text" class="form-control"
                                      placeholder="Firstname *" required v-model='firstname' />
                                  </div>
                                  <div class="form-group">
                                      <input type="text" class="form-control"
                                      placeholder="Lastname *" required v-model='lastname' />
                                  </div>
                              </div>
                              <div class="col-md-6">
                                  <div class="form-group">
                                      <input type="email" class="form-control"
                                      placeholder="Email *" required v-model='email' />
                                  </div>
                                  <div class="form-group">
                                      <input type="password" minlength="10" maxlength="10"
                                      name="password" class="form-control"
                                      placeholder="Password" required v-model='password' />
                                  </div>
                                  <input type="submit" class="btnRegister"  value="Register"/>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
        </div>
    </form>
</template>

<script>
import { ref } from 'vue';
import swal from 'sweetalert';
import api from '../api';

function useRegisterBlock() {
  const firstname = ref('');
  const lastname = ref('');
  const email = ref('');
  const password = ref('');

  function onSubmit(e) {
    e.preventDefault();

    if (firstname.value !== '' && lastname.value !== '' && email.value !== '' && password.value !== '') {
      api.register(firstname.value, lastname.value, email.value, password.value, () => {
        console.log(localStorage.getItem('token'));
      });
    } else {
      swal('Error', 'All fields are required', 'error');
    }
  }

  return {
    email, password, firstname, lastname, onSubmit,
  };
}
export default {
  setup() {
    return { ...useRegisterBlock() };
  },
};
</script>

<style>
    .register{
    background: -webkit-linear-gradient(left, #3931af, #00c6ff);
    margin-top: 3%;
    padding: 3%;
}
.register-left{
    text-align: center;
    color: #fff;
    margin-top: 4%;
}
.register-left input{
    border: none;
    border-radius: 1.5rem;
    padding: 2%;
    width: 60%;
    background: #f8f9fa;
    font-weight: bold;
    color: #383d41;
    margin-top: 30%;
    margin-bottom: 3%;
    cursor: pointer;
}
.register-right{
    background: #f8f9fa;
    border-top-left-radius: 10% 50%;
    border-bottom-left-radius: 10% 50%;
}
.register-left img{
    margin-top: 35%;
    margin-bottom: 5%;
    width: 25%;
    -webkit-animation: mover 2s infinite  alternate;
    animation: mover 1s infinite  alternate;
}
@-webkit-keyframes mover {
    0% { transform: translateY(0); }
    100% { transform: translateY(-20px); }
}
@keyframes mover {
    0% { transform: translateY(0); }
    100% { transform: translateY(-20px); }
}
.register-left p{
    font-weight: lighter;
    padding: 12%;
    margin-top: -9%;
}
.register .register-form{
    padding: 10%;
    margin-top: 10%;
}
.btnRegister{
    float: right;
    margin-top: 10%;
    border: none;
    border-radius: 1.5rem;
    padding: 2%;
    background: #0062cc;
    color: #fff;
    font-weight: 600;
    width: 50%;
    cursor: pointer;
}
.register .nav-tabs{
    margin-top: 3%;
    border: none;
    background: #0062cc;
    border-radius: 1.5rem;
    width: 28%;
    float: right;
}
.register .nav-tabs .nav-link{
    padding: 2%;
    height: 34px;
    font-weight: 600;
    color: #fff;
    border-top-right-radius: 1.5rem;
    border-bottom-right-radius: 1.5rem;
}
.register .nav-tabs .nav-link:hover{
    border: none;
}
.register .nav-tabs .nav-link.active{
    width: 100px;
    color: #0062cc;
    border: 2px solid #0062cc;
    border-top-left-radius: 1.5rem;
    border-bottom-left-radius: 1.5rem;
}
.register-heading{
    text-align: center;
    margin-top: 8%;
    margin-bottom: -15%;
    color: #495057;
}
</style>
