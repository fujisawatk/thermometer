<template>
  <nb-header class="header">
    <nb-left class="header-left"/>
    <nb-body class="header-body">
      <nb-title class="header-title">簡単自己診断</nb-title>
    </nb-body>
    <nb-right class="header-right" />
  </nb-header>
</template>

<style>
.header {
  flex-direction: row;
  background-color: #91e4fb;
}

.header-left,
.header-right{
  flex:1;
}

.header-body {
  flex: 5;
  align-items: center;
}

.header-title {
  color: black;
  font-weight: bold;
}
</style>