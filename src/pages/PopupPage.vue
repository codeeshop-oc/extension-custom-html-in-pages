<template>
  <q-page class="row items-center justify-evenly">
    <div class="q-pa-md" style="min-width: 400px; max-width: 400px">
      <!--
        <q-btn
          color="red-10"
          label="myButtonClickHandler"
          class="q-mt-md"
          @click.stop="myButtonClickHandler()"
        /> -->
      <q-form @submit="onSubmit" class="q-gutter-md">
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
          :input-style="{ resize: 'none', height: '100%' }"
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
import { LocalStorage, useQuasar } from 'quasar';
import { PopupForm } from 'components/models';

export default defineComponent({
  name: 'PopupPage',
  setup() {
    const $q = useQuasar();

    // console.log(LocalStorage.getItem('https://localhost.com'))
    const FormValues = ref<PopupForm>({
      content: '',
      included_url: '',
      excluded_url: '',
    });

    function defaultValues() {
      if (
        ['', 'https://', 'http://'].includes(
          FormValues.value.included_url.trim()
        )
      ) {
        FormValues.value.included_url = 'all';
      }
    }

    //   async function myButtonClickHandler () {
    //     // console.log('started')
    //   await $q.bex.send('highlight.content', { selector: '[name="btnK"]' })
    //     // console.log('end')
    //   $q.notify('Text has been highlighted')
    // }
    async function save(key, value) {
      LocalStorage.set(key, value);
    }

    $q.bex.on('getstorage', ({ respond }) => {
      respond(localStorage)
    })

    $q.bex.on('browser.URLChanged', async ({ data, respond }) => {
      await $q.bex.send('browserURLChanged', { data, respond })
      respond({ data, respond })
    })

    return {
      FormValues,

      getPreviousStoredValue() {
        defaultValues();

        try {
          if (LocalStorage.getItem('all') == null) {
            save('all', {
              included_url: 'all',
              excluded_url: '',
              content: '',
            });
          }
        } catch (err) {
          console.warn('Value not found');
        }
      },

      onSubmit() {
        defaultValues();

        FormValues.value.included_url = FormValues.value.included_url.trim();

        if (
          FormValues.value.included_url &&
          FormValues.value.included_url.substr(0, 4) != 'http'
        ) {
          FormValues.value.included_url =
            'https://' + FormValues.value.included_url;
        }

        FormValues.value.content =
          '<div class="custom_html_in_pages">' +
          FormValues.value.content +
          '</div>';

        save(FormValues.value.included_url, FormValues.value);

        $q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: 'Saved',
        });
      },

      onRemoveAll() {
        LocalStorage.clear();
      },

      // myButtonClickHandler
    };
  },
});
</script>
