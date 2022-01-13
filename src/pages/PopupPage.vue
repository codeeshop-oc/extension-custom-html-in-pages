<template>
  <q-page class="row items-center justify-evenly">
    <div class="q-pa-md" style="min-width: 400px; max-width: 400px">
      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
        <q-input
          filled
          type="text"
          v-model="FormValues.included_url"
          label="Included URL"
          hint="Included URL"
        />
        <q-input
          filled
          type="text"
          v-model="FormValues.excluded_url"
          label="Excluded URL"
          hint="Excluded URL"
        />
        <!-- <q-input v-model="url" filled type="url" hint="URL" /> -->
        <q-input
          v-model="FormValues.content"
          outlined
          type="textarea"
          :input-style="{resize: 'none', height: '100%'}"
          class="full-height"
          hint="Script and tags to add"
        ></q-input>
        <q-btn color="primary" label="Save Form" class="q-mt-md" type="submit">
          <q-tooltip class="bg-accent">Save</q-tooltip>
        </q-btn>
        <q-btn
          color="red-10"
          label="Remove All Scripts"
          class="q-mt-md"
          @click.stop="onRemoveAll()"
        >
          <q-tooltip class="bg-accent">Save</q-tooltip>
        </q-btn>
      </q-form>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { LocalStorage, useQuasar } from 'quasar'
import { PopupForm } from 'components/models';

export default defineComponent({
  name: 'PopupPage',
  setup() {
    const $q = useQuasar()

    // console.log(LocalStorage.getItem('https://localhost.com'))
    const FormValues = ref < PopupForm > ({
      content: '',
      included_url: '',
      excluded_url: '',
    });

    function defaultValues() {
      if (FormValues.value.included_url.trim() == '') {
        FormValues.value.included_url = 'all'
      }
    }

    return {
      FormValues,

      getPreviousStoredValue() {
        defaultValues()

        try {
          if (LocalStorage.getItem('all') == null) {
            LocalStorage.set('all', {
              included_url: 'all',
              excluded_url: '',
              content: '',
            })
          }

          // let data = LocalStorage.getItem(FormValues.value.included_url)
          // if(data != null && data == '11x') {
          // let v = data.excluded_url
          // // FormValues.value.excluded_url
          // // FormValues.value.content
          // let x = data.content
          // }
        } catch (err) {
          console.warn('Value not found')
        }
      },

      onSubmit() {
        defaultValues()

        FormValues.value.content = `<div class="custom_html_in_pages">` + FormValues.value.content + `</div>`
        LocalStorage.set(FormValues.value.included_url, FormValues.value)

        $q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: 'Saved'
        })
      },

      onReset() {

      },

      onRemoveAll() {
        LocalStorage.clear()
      }
    };
  }
});
</script>
