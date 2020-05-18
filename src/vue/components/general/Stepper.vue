<template>
  <div :class="[stepperClasses]">
    <div v-for="step in steps" :key="step">
      <div class="stepper" :class="[getStepStateClasses(step)]">
        <div class="stepper-icon">
          <i v-if="isStepDone(step)" class="material-icons">check</i>
          <span v-else>{{ getIndexOfStep(step) + 1 }}</span>
        </div>
        <span class="stepper-text">{{ step }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Stepper',
  props: {
    direction: {
      type: String,
      default: 'horizontal',
      validator(value) {
        return ['horizontal', 'vertical'].includes(value);
      }
    },
    steps: {
      type: Array,
      required: true
    },
    selectedStep: {
      type: String,
      required: true
    }
  },
  methods: {
    getIndexOfStep(step) {
      return this.steps.indexOf(step);
    },
    isStepActive(step) {
      return step === this.activeStep;
    },
    isStepDone(step) {
      return this.getIndexOfStep(step) < this.activeStepIndex;
    },
    getStepStateClasses(step) {
      const classes = [];

      if (this.isStepActive(step)) {
        classes.push('active');
      }

      if (this.isStepDone(step)) {
        classes.push('done');
      }

      return classes;
    }
  },
  computed: {
    stepperClasses() {
      const stepperDirection =
        this.direction === 'horizontal' ? 'stepper-horiz' : 'stepper-vert';
      return [stepperDirection];
    },
    activeStep() {
      return this.selectedStep ? this.selectedStep : this.steps[0];
    },
    activeStepIndex() {
      return this.steps.indexOf(this.activeStep);
    }
  }
};
</script>
