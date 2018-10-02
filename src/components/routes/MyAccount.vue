<template>
  <div class="_account">
    <h1 class="_cart-title">
      {{ $t('session.account') }}
    </h1>
    <el-tabs>
      <el-tab-pane label="User"></el-tab-pane>
      <el-tab-pane label="Config"></el-tab-pane>
      <el-tab-pane label="Role"></el-tab-pane>
      <el-tab-pane label="Task"></el-tab-pane>
    </el-tabs>

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'MyAccount'
}
</script>
