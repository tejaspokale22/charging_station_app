<template>
  <div class="flex justify-center items-center p-4">
    <div class="w-8 h-8 border-4 border-black border-t-gray-200 rounded-full animate-spin"></div>
  </div>
</template>

<script>
export default {
  name: 'Spinner',
  props: {
    overlay: {
      type: Boolean,
      default: false
    }
  }
}
</script>
