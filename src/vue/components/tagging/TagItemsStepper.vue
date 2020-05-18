<template>
  <div class="card" :class="{ 'shadow-none': !shadow }">
    <div class="card-header">
      <Stepper :steps="steps" :selectedStep="selectedStep"></Stepper>
    </div>
    <div class="card-body">
      <div class="pt-3 pb-5">
        <div v-show="selectedStep === STEP_LABELS.TAG">
          <h5 class="mb-3">Enter Your Tag</h5>
          <div class="row justify-content-center">
            <div class="col-sm-6 col-lg-5">
              <div class="form-group">
                <label for="tag-items-stepper-tag-name">Tag</label>
                <input
                  type="text"
                  class="form-control"
                  id="tag-items-stepper-tag-name"
                  v-model.trim="inputs.tag"
                >
              </div>
            </div>
          </div>
        </div>
        <div
          v-show="selectedStep === STEP_LABELS.ITEMS"
          class="position-relative"
          :style="{ 'min-height': canDisplaySelectedItems ? '300px' : 'initial' }"
        >
          <div class="mb-3 d-flex flex-wrap justify-content-between">
            <h5>Select Items to Tag</h5>
            <button
              class="btn btn-flat-secondary"
              @click="canDisplaySelectedItems = true"
              :disabled="!inputs.selectedItems.length"
            >
              View Selected
              <span class="badge badge-light">{{ inputs.selectedItems.length }}</span>
            </button>
          </div>
          <div class="row align-items-center">
            <div class="col-12 offset-lg-3 col-lg-6">
              <div class="form-group">
                <label for="tag-items-stepper-items">Items</label>
                <select class="form-control" id="tag-items-stepper-items" v-model="inputs.item">
                  <option>Midas|January Order|2020|Offers|Midas Only|OC|FB</option>
                  <option>Midas|March Order|2020|Offers|Midas Only|OC|FB</option>
                  <option>Midas|March Order|2020|Offers|Midas Canada Only|OC|FB</option>
                </select>
              </div>
            </div>
            <div class="col-12 col-lg-3">
              <button
                class="btn btn-flat-primary"
                @click="selectItem(inputs.item)"
                :disabled="!inputs.item"
              >Select</button>
            </div>
          </div>
          <div
            v-if="canDisplaySelectedItems"
            class="px-3 bg-white position-absolute"
            style="top: 0; left: 0; right: 0; bottom: 0; opacity: 0.95; overflow-y: auto;"
          >
            <p class="my-0 text-right">
              <a href="javascript:void(0)" @click="canDisplaySelectedItems = false">Close</a>
            </p>
            <h5 class="mb-3 text-center">
              <span>Selected Items</span>
            </h5>
            <p
              v-if="!inputs.selectedItems.length"
              class="py-5 text-muted text-center"
            >No items to display</p>
            <div v-else class="mx-0 row justify-content-center">
              <div class="col-12 col-lg-6">
                <div v-for="item in inputs.selectedItems" :key="item" class="mb-3 d-flex">
                  <div class="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      class="custom-control-input"
                      :id="`${item}-selected-checkbox`"
                      checked="true"
                      @input="removeItem(item)"
                    >
                    <label
                      class="custom-control-label font-weight-bold"
                      :for="`${item}-selected-checkbox`"
                    >{{ item }}</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-show="selectedStep === STEP_LABELS.REVIEW">
          <h5 class="mb-3">Review Your Actions</h5>
          <p class="lead">
            You are tagging
            <span class="text-secondary">{{ inputs.selectedItems.length }} items</span>
            with the
            <span class="text-primary">{{ inputs.tag }}</span> tag
          </p>
          <div class="alert alert-light" role="alert">
            <span class="float-left mr-2">
              <i class="material-icons md-36">info</i>
            </span>
            Your items will be tagged asynchronously. It might take some time for your actions to be reflected in Tagging.
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-end">
        <div>
          <button v-if="selectedStepIndex <= 0" class="btn btn-danger mr-2" @click="onCancel">Cancel</button>
          <button v-else class="btn btn-secondary mr-2" @click="previousStep">Previous</button>
        </div>
        <div>
          <button
            v-if="selectedStepIndex >= steps.length - 1"
            class="btn btn-primary"
            @click="onFinish"
          >Finish</button>
          <button v-else class="btn btn-primary" @click="nextStep">Continue</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// TODO: Add step validation

import Stepper from '../general/Stepper.vue';

const STEP_LABELS = Object.freeze({
  TAG: 'Tag',
  ITEMS: 'Items',
  REVIEW: 'Review'
});

function getComponentData() {
  return {
    STEP_LABELS,
    steps: [STEP_LABELS.TAG, STEP_LABELS.ITEMS, STEP_LABELS.REVIEW],
    selectedStepIndex: 0,
    inputs: {
      tag: '',
      item: '',
      selectedItems: []
    },
    canDisplaySelectedItems: false
  };
}

export default {
  name: 'TagItemsStepper',
  components: {
    Stepper
  },
  props: {
    shadow: {
      type: Boolean,
      default: true
    },
    defaultTag: {
      type: String,
      default: ''
    },
    defaultSelectedItems: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return getComponentData();
  },
  methods: {
    /**
     * Public API method for use with the "ref" attribute
     */
    reset() {
      Object.assign(this.$data, getComponentData());
      this.inputs.tag = this.defaultTag;
      this.inputs.selectedItems = this.defaultSelectedItems;
    },
    previousStep() {
      if (this.selectedStepIndex <= 0) return;
      return --this.selectedStepIndex;
    },
    nextStep() {
      if (this.selectedStepIndex >= this.steps.length - 1) return;
      return ++this.selectedStepIndex;
    },
    onCancel() {
      this.$emit('cancel');
    },
    onFinish() {
      this.$emit('finish', {
        tag: this.inputs.tag,
        selectedItems: this.inputs.selectedItems
      });
    },
    selectItem(item) {
      if (!item) return;

      const isItemAlreadySelected = this.inputs.selectedItems.includes(item);

      if (isItemAlreadySelected) return;

      this.inputs.selectedItems.push(item);
      this.inputs.item = '';
    },
    removeItem(item) {
      if (!item) return;

      const index = this.inputs.selectedItems.indexOf(item);
      if (index < 0) return;

      this.inputs.selectedItems.splice(index, 1);
    }
  },
  computed: {
    selectedStep() {
      return this.steps[this.selectedStepIndex];
    }
  },
  watch: {
    defaultTag: {
      handler(newVal) {
        this.inputs.tag = newVal;
      },
      immediate: true
    },
    defaultSelectedItems: {
      handler(newVal) {
        this.inputs.selectedItems = newVal;
      },
      immediate: true
    }
  }
};
</script>
