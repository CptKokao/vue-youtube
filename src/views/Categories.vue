<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      <div class="row">
        <CategotyCreate />
        <CategotyEdit />
      </div>
    </section>
  </div>
</template>

<script>
import CategotyCreate from '@/components/CategotyCreate'
import CategotyEdit from '@/components/CategotyEdit'

export default {
  name: "category",
  components: {
    CategotyCreate,
    CategotyEdit
  }
}
</script>
