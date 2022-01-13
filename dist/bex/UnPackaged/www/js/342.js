"use strict";
(self["webpackChunkcustom_html_in_pages"] = self["webpackChunkcustom_html_in_pages"] || []).push([[342],{

/***/ 8342:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ PopupPage)
});

// EXTERNAL MODULE: ./node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js
var runtime_core_esm_bundler = __webpack_require__(3673);
// EXTERNAL MODULE: ./node_modules/@vue/runtime-dom/dist/runtime-dom.esm-bundler.js
var runtime_dom_esm_bundler = __webpack_require__(8880);
;// CONCATENATED MODULE: ./node_modules/@quasar/app/lib/webpack/loader.js.transform-quasar-imports.js!./node_modules/ts-loader/index.js??clonedRuleSet-3.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[4]!./node_modules/@quasar/app/lib/webpack/loader.vue.auto-import-quasar.js??ruleSet[0].use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[1]!./src/pages/PopupPage.vue?vue&type=template&id=6c48244c&ts=true

const _hoisted_1 = {
    class: "q-pa-md",
    style: { "min-width": "400px", "max-width": "400px" }
};
const _hoisted_2 = /*#__PURE__*/ (0,runtime_core_esm_bundler/* createTextVNode */.Uk)("Save");
const _hoisted_3 = /*#__PURE__*/ (0,runtime_core_esm_bundler/* createTextVNode */.Uk)("Save");
function render(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_q_input = (0,runtime_core_esm_bundler/* resolveComponent */.up)("q-input");
    const _component_q_tooltip = (0,runtime_core_esm_bundler/* resolveComponent */.up)("q-tooltip");
    const _component_q_btn = (0,runtime_core_esm_bundler/* resolveComponent */.up)("q-btn");
    const _component_q_form = (0,runtime_core_esm_bundler/* resolveComponent */.up)("q-form");
    const _component_q_page = (0,runtime_core_esm_bundler/* resolveComponent */.up)("q-page");
    return ((0,runtime_core_esm_bundler/* openBlock */.wg)(), (0,runtime_core_esm_bundler/* createBlock */.j4)(_component_q_page, { class: "row items-center justify-evenly" }, {
        default: (0,runtime_core_esm_bundler/* withCtx */.w5)(() => [
            (0,runtime_core_esm_bundler/* createElementVNode */._)("div", _hoisted_1, [
                (0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_q_form, {
                    onSubmit: _ctx.onSubmit,
                    onReset: _ctx.onReset,
                    class: "q-gutter-md"
                }, {
                    default: (0,runtime_core_esm_bundler/* withCtx */.w5)(() => [
                        (0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_q_input, {
                            filled: "",
                            type: "text",
                            modelValue: _ctx.FormValues.included_url,
                            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => ((_ctx.FormValues.included_url) = $event)),
                            label: "Included URL",
                            hint: "Included URL"
                        }, null, 8, ["modelValue"]),
                        (0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_q_input, {
                            filled: "",
                            type: "text",
                            modelValue: _ctx.FormValues.excluded_url,
                            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => ((_ctx.FormValues.excluded_url) = $event)),
                            label: "Excluded URL",
                            hint: "Included URL"
                        }, null, 8, ["modelValue"]),
                        (0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_q_input, {
                            modelValue: _ctx.FormValues.content,
                            "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => ((_ctx.FormValues.content) = $event)),
                            outlined: "",
                            type: "textarea",
                            "input-style": { resize: 'none', height: '100%' },
                            class: "full-height",
                            hint: "Script and tags to add"
                        }, null, 8, ["modelValue"]),
                        (0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_q_btn, {
                            color: "primary",
                            label: "Save Form",
                            class: "q-mt-md",
                            type: "submit"
                        }, {
                            default: (0,runtime_core_esm_bundler/* withCtx */.w5)(() => [
                                (0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_q_tooltip, { class: "bg-accent" }, {
                                    default: (0,runtime_core_esm_bundler/* withCtx */.w5)(() => [
                                        _hoisted_2
                                    ]),
                                    _: 1
                                })
                            ]),
                            _: 1
                        }),
                        (0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_q_btn, {
                            color: "red-10",
                            label: "Remove All Scripts",
                            class: "q-mt-md",
                            onClick: _cache[3] || (_cache[3] = (0,runtime_dom_esm_bundler/* withModifiers */.iM)(($event) => (_ctx.onRemoveAll()), ["stop"]))
                        }, {
                            default: (0,runtime_core_esm_bundler/* withCtx */.w5)(() => [
                                (0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_q_tooltip, { class: "bg-accent" }, {
                                    default: (0,runtime_core_esm_bundler/* withCtx */.w5)(() => [
                                        _hoisted_3
                                    ]),
                                    _: 1
                                })
                            ]),
                            _: 1
                        })
                    ]),
                    _: 1
                }, 8, ["onSubmit", "onReset"])
            ])
        ]),
        _: 1
    }));
}

;// CONCATENATED MODULE: ./src/pages/PopupPage.vue?vue&type=template&id=6c48244c&ts=true

// EXTERNAL MODULE: ./node_modules/@vue/reactivity/dist/reactivity.esm-bundler.js
var reactivity_esm_bundler = __webpack_require__(1959);
// EXTERNAL MODULE: ./node_modules/quasar/src/plugins/LocalStorage.js + 1 modules
var LocalStorage = __webpack_require__(6395);
// EXTERNAL MODULE: ./node_modules/quasar/src/composables/use-quasar.js
var use_quasar = __webpack_require__(8825);
;// CONCATENATED MODULE: ./node_modules/@quasar/app/lib/webpack/loader.js.transform-quasar-imports.js!./node_modules/ts-loader/index.js??clonedRuleSet-3.use[0]!./node_modules/@quasar/app/lib/webpack/loader.vue.auto-import-quasar.js??ruleSet[0].use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[1]!./src/pages/PopupPage.vue?vue&type=script&lang=ts

;
/* harmony default export */ const PopupPagevue_type_script_lang_ts = ((0,runtime_core_esm_bundler/* defineComponent */.aZ)({
    name: 'PopupPage',
    setup() {
        const $q = (0,use_quasar/* default */.Z)();
        // console.log(LocalStorage.getItem('https://localhost.com'))
        const FormValues = (0,reactivity_esm_bundler/* ref */.iH)({
            content: '',
            included_url: '',
            excluded_url: '',
        });
        function defaultValues() {
            if (FormValues.value.included_url.trim() == '') {
                FormValues.value.included_url = 'all';
            }
        }
        return {
            FormValues,
            getPreviousStoredValue() {
                defaultValues();
                try {
                    if (LocalStorage/* default.getItem */.Z.getItem('all') == null) {
                        LocalStorage/* default.set */.Z.set('all', {
                            included_url: 'all',
                            excluded_url: '',
                            content: '',
                        });
                    }
                    // let data = LocalStorage.getItem(FormValues.value.included_url)
                    // if(data != null && data == '11x') {
                    // let v = data.excluded_url
                    // // FormValues.value.excluded_url
                    // // FormValues.value.content
                    // let x = data.content
                    // }
                }
                catch (err) {
                    console.warn('Value not found');
                }
            },
            onSubmit() {
                defaultValues();
                FormValues.value.content = `<div class="custom_html_in_pages">` + FormValues.value.content + `</div>`;
                LocalStorage/* default.set */.Z.set(FormValues.value.included_url, FormValues.value);
                $q.notify({
                    color: 'green-4',
                    textColor: 'white',
                    icon: 'cloud_done',
                    message: 'Saved'
                });
            },
            onReset() {
            },
            onRemoveAll() {
                LocalStorage/* default.clear */.Z.clear();
            }
        };
    }
}));

;// CONCATENATED MODULE: ./src/pages/PopupPage.vue?vue&type=script&lang=ts
 
// EXTERNAL MODULE: ./node_modules/vue-loader/dist/exportHelper.js
var exportHelper = __webpack_require__(4260);
// EXTERNAL MODULE: ./node_modules/quasar/src/components/page/QPage.js
var QPage = __webpack_require__(4379);
// EXTERNAL MODULE: ./node_modules/quasar/src/components/form/QForm.js
var QForm = __webpack_require__(5269);
// EXTERNAL MODULE: ./node_modules/quasar/src/components/input/QInput.js + 30 modules
var QInput = __webpack_require__(6719);
// EXTERNAL MODULE: ./node_modules/quasar/src/components/btn/QBtn.js + 5 modules
var QBtn = __webpack_require__(2452);
// EXTERNAL MODULE: ./node_modules/quasar/src/components/tooltip/QTooltip.js + 11 modules
var QTooltip = __webpack_require__(9143);
// EXTERNAL MODULE: ./node_modules/@quasar/app/lib/webpack/runtime.auto-import.js
var runtime_auto_import = __webpack_require__(7518);
var runtime_auto_import_default = /*#__PURE__*/__webpack_require__.n(runtime_auto_import);
;// CONCATENATED MODULE: ./src/pages/PopupPage.vue




;
const __exports__ = /*#__PURE__*/(0,exportHelper/* default */.Z)(PopupPagevue_type_script_lang_ts, [['render',render]])

/* harmony default export */ const PopupPage = (__exports__);
;





runtime_auto_import_default()(PopupPagevue_type_script_lang_ts, 'components', {QPage: QPage/* default */.Z,QForm: QForm/* default */.Z,QInput: QInput/* default */.Z,QBtn: QBtn/* default */.Z,QTooltip: QTooltip/* default */.Z});


/***/ })

}]);