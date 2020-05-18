<template>
  <div ref="modal" class="modal fade" :class="modalClasses" tabindex="-1" role="dialog">
    <div class="modal-dialog" :class="modalDialogClasses" role="document">
      <div class="modal-content">
        <div v-if="!hideHeader" class="modal-header">
          <slot name="header">
            <h5 class="modal-title">{{ title }}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </slot>
        </div>
        <div class="modal-body">
          <slot name="body"></slot>
        </div>
        <div v-if="!hideFooter" class="modal-footer">
          <slot name="footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Ok</button>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';

export default {
  name: 'Modal',
  props: {
    title: {
      type: String
    },
    hideHeader: {
      type: Boolean,
      default: false
    },
    hideFooter: {
      type: Boolean,
      default: false
    },
    position: {
      type: String,
      default: 'default',
      validator(value) {
        return ['default', 'center', 'left', 'right'].includes(value);
      }
    },
    size: {
      type: String,
      default: 'default',
      validator(value) {
        return ['default', 'small', 'large'].includes(value);
      }
    }
  },
  data() {
    return {
      inner$Modal: null
    };
  },
  methods: {
    /**
     * Public API method for use with the "ref" attribute
     */
    controlModal(method, events) {
      const supportedMethods = ['toggle', 'show', 'hide'];

      if (!supportedMethods.includes(method)) {
        throw new Error('Modal method not supported');
      }

      const { onShow = null, onShown = null, onHide = null, onHidden = null } =
        events || {};

      if (onShow) this.inner$Modal.one('show.bs.modal', onShow);
      if (onShown) this.inner$Modal.one('shown.bs.modal', onShown);
      if (onHide) this.inner$Modal.one('hide.bs.modal', onHide);
      if (onHidden) this.inner$Modal.one('hidden.bs.modal', onHidden);

      this.inner$Modal.modal(method);
    },
    removeModalBackdrop() {
      $(document.body).removeClass('modal-open');
      $('.modal-backdrop').remove();
    }
  },
  computed: {
    modalClasses() {
      const classes = [];

      switch (this.position) {
        case 'left':
          classes.push('left');
          break;
        case 'right':
          classes.push('right');
          break;
        default:
          break;
      }

      return classes;
    },
    modalDialogClasses() {
      const classes = [];

      switch (this.position) {
        case 'center':
          classes.push('modal-dialog-centered');
          break;
        default:
          break;
      }

      if (this.position !== 'left' || this.position !== 'right') {
        switch (this.size) {
          case 'small':
            classes.push('modal-sm');
            break;
          case 'large':
            classes.push('modal-lg');
            break;
          default:
            break;
        }
      }

      return classes;
    }
  },
  mounted() {
    // Init modal
    this.inner$Modal = $(this.$refs.modal);
    this.inner$Modal.modal({ show: false });
  },
  beforeDestroy() {
    // Hide modal and remove backdrop
    this.inner$Modal.modal('hide');
    this.$nextTick(() => this.removeModalBackdrop());
  }
};
</script>
