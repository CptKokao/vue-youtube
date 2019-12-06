<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Создать</h4>
      </div>

      <form @submit.prevent="create">
        <div class="input-field">
          <input 
            id="name" 
            type="text" 
            v-model="name" 
            :class="{invalid: $v.name.$dirty && !$v.name.required}"  
          />
          <label for="name">Название</label>
          <span v-if="$v.name.$dirty && !$v.name.required"
            class="helper-text invalid">
            Введите название категории
          </span>
        </div>

        <div class="input-field">
          <input 
            id="limit" 
            type="number"
            v-model="limit" 
            :class="{invalid: $v.limit.$dirty && !$v.limit.minValue}"  
          />
          <label for="limit">Лимит</label>
          <span v-if="$v.limit.$dirty && !$v.limit.minValue"
            class="helper-text invalid">
            Минимальная величина {{ $v.limit.$params.minValue.min }}
          </span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Создать
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import {required, minValue} from 'vuelidate/lib/validators';

export default {
  data: () => ({
    name: '',
    limit: 100
  }),
  validations: {
    name: {required},
    limit: {minValue: minValue(100)}
  },
  mounted() {
    M.updateTextFields();
  },
  methods: {
    create () {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
    }
  }
}
</script>
