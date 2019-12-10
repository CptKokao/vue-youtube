<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      <Loader v-if="loading" />
      <div class="row" v-else>
        <CategotyCreate @created="addNewCategory"/>
        <CategotyEdit 
          :categories="categories"
        />
      </div>
    </section>
  </div>
</template>

<script>
import CategotyCreate from '@/components/CategotyCreate'
import CategotyEdit from '@/components/CategotyEdit'

export default {
  name: "category",
  data: () => ({
    categories: [],
    loading: true
  }),
  async mounted() {
    this.categories = await this.$store.dispatch('fetchCategories');
    this.loading = false;
  },
  components: {
    CategotyCreate,
    CategotyEdit
  },
  methods: {
    addNewCategory(category) {
      this.categories.push(category);
      console.log(this.categories);
    } 
  }
}
</script>
