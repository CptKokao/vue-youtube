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
          v-if="categories.length"
          :categories="categories"
          :key="categories.length + updateCount"
          @updated="updateCategories"
        />
        <p class ="center" v-else>Категории нет</p>
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
    loading: true,
    updateCount: 0
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
    },
    updateCategories(category) {
      const idx = this.categories.findIndex((c) => c.id === category.id);
      this.categories[idx].name = category.name;
      this.categories[idx].limit = category.limit;
      this.updateCount++;

    }
  }
}
</script>
