<template>
  <q-layout view="hhh lpr fFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          {{$t('product_name')}}
        </q-toolbar-title>
        <div>v1.0</div>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'BrowserLayout',
  data () {
    return {
    }
  }
}
</script>
