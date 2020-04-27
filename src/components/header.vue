<template>
  <nb-header class="header">
    <nb-left />
      <nb-body>
        <nb-title>検温アプリ</nb-title>
      </nb-body>
    <nb-right />
  </nb-header>
</template>

<script>
export default {
  props: {
      data: Object
  },
};
</script>

<style>
.header {
 background-color: #91e4fb;
}
</style>