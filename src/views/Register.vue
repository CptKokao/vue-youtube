<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
      <!-- валидация email -->
      <div class="input-field">
        <input 
          id="email"
          type="text"
          v-model.trim="email"
          :class="{invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}"
        >
        <label for="email">Email</label>
        <small 
          class="helper-text invalid"
          v-if="$v.email.$dirty && !$v.email.required" 
        >Поле Email не должно быть пустым</small>
        <small 
          class="helper-text invalid"
          v-else-if="$v.email.$dirty && !$v.email.email" 
        >Введите корректный email</small>
      </div>
      <!-- валидация password -->
      <div class="input-field">
        <input 
          id="password" 
          type="password" 
          v-model="password"
          :class="{invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength)}"
        >
        <label for="password">Пароль</label>
        <small 
          class="helper-text invalid"
          v-if="$v.password.$dirty && !$v.password.required" 
        >Поле Пароль не должно быть пустым</small>
        <small 
          class="helper-text invalid"
          v-else-if="$v.password.$dirty && !$v.password.minLength" 
        >Длина пароля должна быть не менее {{ $v.password.$params.minLength.min }} символов. Сейчас он имеет {{ password.length }} символов.</small>
      </div>
      <!-- валидация Name -->
      <div class="input-field">
        <input 
          id="name" 
          type="text"
          v-model="name"
          :class="{invalid: ($v.name.$dirty && !$v.name.required)}"
        />
        <label for="name">Имя</label>
        <small 
          class="helper-text invalid"
          v-if="$v.name.$dirty && !$v.name.required" 
        >Поле Имя не должно быть пустым</small>
      </div>
      <!-- валидация checkbox -->
      <p>
        <label>
          <input 
            type="checkbox" 
            v-model="checkbox"  
          />
          <span>С правилами согласен</span>
        </label>
        <br>
        <small
          class="helper-text invalid"
          v-if="$v.name.$dirty && !$v.checkbox.checked" 
        >Вы должны согласиться с правилами</small></p>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          Зарегистрироваться
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Уже есть аккаунт?
        <router-link to="/login">Войти!</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import {email, required, minLength} from 'vuelidate/lib/validators';

export default {
  name: "register",
  data: () => ({
    email: "",
    password: "",
    name: "",
    checkbox: false
  }),
  validations: {
    email: {email, required},
    password: {required, minLength: minLength(8)},
    name: {required},
    checkbox: {checked: v => v}
  },
  methods: {
    async submitHandler () {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      const formData = {
        email: this.email,
        password: this.password,
        name: this.name
      }
      try {
        await this.$store.dispatch("register", formData);
        this.$router.push("/");
      } catch (e) {}
    }
  }
}
</script>
