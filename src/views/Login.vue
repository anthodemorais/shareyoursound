<template>
    <div class="container">
      <div class="d-flex justify-content-center h-100">
        <div class="card">
          <div class="card-header">
            <h3>Login</h3>
          </div>
          <div class="card-body">
            <form @submit='onSubmit'>
              <div class="input-group form-group">
                <div class="input-group-prepend">
                  <span class="input-group-text"><i class="fas fa-user"></i></span>
                </div>
                <input type="email" class="form-control"
                placeholder="email" required v-model='email'>
              </div>
              <div class="input-group form-group">
                <div class="input-group-prepend">
                  <span class="input-group-text"><i class="fas fa-key"></i></span>
                </div>
                <input type="password" class="form-control"
                placeholder="password" required v-model='password'>
              </div>
              <div class="form-group">
                  <input type='submit' />
              </div>
            </form>
          </div>
          <div class="card-footer">
            <div class="d-flex justify-content-center links">
              Don't have an account?<a href="/register">Sign Up</a>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import swal from 'sweetalert';
import api from '../api';

function useLoginBlock(router) {
  const email = ref('');
  const password = ref('');

  if (localStorage.getItem('token') !== '') {
    router.push({ path: '/' });
  }
  function onSubmit(e) {
    e.preventDefault();

    if (email.value !== '' && password.value !== '') {
      api.login(email.value, password.value, () => {
        console.log(localStorage.getItem('token'));
        this.$router.push({ path: '/' });
      });
    } else {
      swal('Error', 'Email or password empty', 'error');
    }
  }

  return {
    email, password, onSubmit,
  };
}
export default {
  setup() {
    return { ...useLoginBlock(useRouter()) };
  },
};
</script>

<style>

.container{
height: 100%;
align-content: center;
}

.card{
height: 370px;
margin-top: auto;
margin-bottom: auto;
width: 400px;
background-color: rgba(0,0,0,0.5) !important;
}

.social_icon span{
font-size: 60px;
margin-left: 10px;
color: #FFC312;
}

.social_icon span:hover{
color: white;
cursor: pointer;
}

.card-header h3{
color: white;
}

.social_icon{
position: absolute;
right: 20px;
top: -45px;
}

.input-group-prepend span{
width: 50px;
background-color: #FFC312;
color: black;
border:0 !important;
}

input:focus{
outline: 0 0 0 0  !important;
box-shadow: 0 0 0 0 !important;

}

.remember{
color: white;
}

.remember input
{
width: 20px;
height: 20px;
margin-left: 15px;
margin-right: 5px;
}

.login_btn{
color: black;
background-color: #FFC312;
width: 100px;
}

.login_btn:hover{
color: black;
background-color: white;
}

.links{
color: white;
}

.links a{
margin-left: 4px;
}
</style>
