<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Редактировать</h4>
      </div>

      <form @submit.prevent="update">
        <div class="input-field">
          <select ref="select" v-model="current">
            <option
              v-for="c in categories"
              :key="c.id"
              :value="c.id"
            >{{ c.name }}</option>
          </select>
          <label>Выберите категорию</label>
        </div>
        
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
            v-model.number="limit" 
            :class="{invalid: $v.limit.$dirty && !$v.limit.minValue}"  
          />
          <label for="limit">Лимит</label>
          <span v-if="$v.limit.$dirty && !$v.limit.minValue"
            class="helper-text invalid">
            Лимит должен быть не меньше {{ $v.limit.$params.minValue.min }}
          </span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Обновить
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import {required, minValue} from 'vuelidate/lib/validators';

export default {
  props: ['categories'],
  data: () => ({
    select: null,
    name: '',
    limit: 100,
    current: null
  }),
  validations: {
    name: {required},
    limit: {minValue: minValue(100)}
  },
  methods: {
    async update() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      try {
        const categoryData = {
          id: this.current,
          name: this.name,
          limit: this.limit
        };
        await this.$store.dispatch('updateCategory', categoryData);
        this.$message('Категория была обновлена')
        this.$emit('updated', categoryData)
      } catch (e) {}
    }
  },
  watch: {
    // находим текущую категорию 
    current(catID) {
      const {name, limit} = this.categories.find((c) => catID === c.id);
      this.name = name;
      this.limit = limit;
    }
  },
  created() {
    // находим значения первой категории 
    const {id, name, limit} = this.categories[0];
    this.name = name;
    this.limit = limit;
    this.current = id;
  },
  mounted() {
    this.select = M.FormSelect.init(this.$refs.select);
    M.updateTextFields();
  },
  destroyed() {
    // если select пустой и доступен destroy
    if (this.select && this.select.destroy) {
      this.select.destroy();
    }
  }
}
</script>
