<template>
  <div>
    <div v-show="isBusy" :style="busyStyles">
      <div class="progress">
        <div class="progress-bar progress-bar-indeterminate" role="progressbar"></div>
      </div>
      <p class="mt-4 text-center text-muted">{{ busyText }}</p>
    </div>
    <div v-show="!isBusy">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BusyContainer',
  props: {
    isBusy: {
      type: Boolean,
      required: true
    },
    busyText: {
      type: String,
      default: 'Loading...'
    },
    busyMinHeight: {
      type: String,
      default: '30vh'
    },
    busyIndicatorPosition: {
      type: String,
      default: 'center',
      validator(value) {
        return ['start', 'center', 'end'].includes(value);
      }
    }
  },
  computed: {
    busyStyles() {
      let justifyContent;

      switch (this.busyIndicatorPosition) {
        case 'start':
          justifyContent = 'flex-start';
          break;
        case 'center':
          justifyContent = 'center';
          break;
        case 'end':
          justifyContent = 'flex-end';
          break;
        default:
          justifyContent = 'flex-start';
          break;
      }

      return {
        display: 'flex',
        'flex-direction': 'column',
        'justify-content': justifyContent,
        'min-height': this.busyMinHeight
      };
    }
  }
};
</script>
