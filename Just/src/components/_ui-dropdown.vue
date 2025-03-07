<template>
  <div class="ui-dropdown-container" :class="{ 'is-open': open }" v-click-outside="hide">
    <slot name="before"></slot>
    <div v-if="hasButton" ref="trigger" class="ui-dropdown-toggle" @click.prevent.stop="toggle">
      <slot name="button"></slot>
    </div>
    <div class="ui-dropdown" ref="overlay" role="dialog" v-if="open" :class="dropdownClasses" :style="dropdownStyle">
      <slot></slot>
    </div>
  </div>
</template>


<script>
  //import Overlay from 'zero/helpers/overlay.js';
  import { defineComponent } from 'vue';

  const varKey = 'zero.ui-dropdown.current';

  export default defineComponent({
    name: 'uiDropdown',

    props: {
      align: {
        type: String,
        default: 'left',
        handler(newValue, oldValue) 
        {
          this.updateAlignment();
        }
      },
      theme: {
        type: String,
        default: 'dark'
      },
      locked: {
        type: Boolean,
        default: false
      },
      disablePositioning: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },

    computed: {

      hasButton()
      {
        return this.$slots.hasOwnProperty('button');
      },

      dropdownClasses()
      {
        let classes = ['align-' + this.valign, 'align-' + this.halign];

        if (!!this.theme)
        {
          classes.push('theme-' + this.theme);
        }

        return classes;
      },

      dropdownStyle()
      {
        if (this.topOffset != 0)
        {
          return `--v-offset: ${this.topOffset}px`;
        }

        return null;
      }
    },

    data: () => ({
      open: false,
      valign: 'top',
      halign: 'left',
      topOffset: 0
    }),


    mounted()
    {
      this.updateAlignment();
    },


    methods: {

      updateAlignment()
      {
        this.valign = this.align.indexOf('bottom') > -1 ? 'bottom' : 'top';
        this.halign = this.align.indexOf('right') > -1 ? 'right' : 'left';
      },

      toggle()
      {
        if (this.open)
        {
          this.hide();
        }
        else if (!this.disabled)
        {
          this.show();
        }
      },

      show()
      {
        if (this.disabled)
        {
          return;
        }

        if (this.zero.runtimeVariables[varKey])
        {
          this.zero.runtimeVariables[varKey].hide();
        }

        this.zero.runtimeVariables[varKey] = this;

        //Overlay.setDropdown(this);
        this.open = true;
        this.position();
        this.$emit('opened');
      },

      hide()
      {
        if (this.locked)
        {
          return;
        }
        this.open = false;
        this.$emit('closed');
        this.zero.runtimeVariables[varKey] = null;
      },

      position()
      {
        if (this.disablePositioning)
        {
          return;
        }
        
        this.$nextTick(() =>
        {
          // the trigger which is the relative to the overlay
          const reference = this.$el;

          // get bounding boxes both for the trigger and the overlay
          const triggerBoundingBox = reference ? reference.getBoundingClientRect() : { width: 0, height: 0, left: 0, top: 0 };
          const overlayBoundingBox = this.$refs.overlay.getBoundingClientRect();
          const windowBox = { width: window.innerWidth, height: window.innerHeight };
          const windowOffset = 32;

          // calculate available space for the dropdown in all 4 directions areound the trigger element
          let availableSpace = {
            left: triggerBoundingBox.left + triggerBoundingBox.width - windowOffset,
            right: windowBox.width - triggerBoundingBox.left - windowOffset,
            top: triggerBoundingBox.top - windowOffset,
            bottom: windowBox.height - triggerBoundingBox.top - triggerBoundingBox.height - windowOffset
          };

          if (this.valign == 'top' && availableSpace.bottom < overlayBoundingBox.height && availableSpace.top > availableSpace.bottom)
          {
            this.valign = 'bottom';
          }
          if (this.valign == 'bottom' && availableSpace.top < overlayBoundingBox.height && availableSpace.bottom > availableSpace.top)
          {
            this.valign = 'top';
          }

          if (this.halign == 'left' && availableSpace.right < overlayBoundingBox.width && availableSpace.left > availableSpace.right)
          {
            this.halign = 'right';
          }
          if (this.halign == 'right' && availableSpace.left < overlayBoundingBox.width && availableSpace.right > availableSpace.left)
          {
            this.halign = 'left';
          }

          const headerHeight = 90;
          const topOffset = ~~((availableSpace.top - headerHeight) - overlayBoundingBox.height) + 1;
          this.topOffset = this.valign == 'bottom' && topOffset < 0 ? topOffset : 0;
        });
      }

    }
  });
</script>


<style lang="scss">
  .ui-dropdown-container
  {
    position: relative;
  }

  .ui-dropdown
  {
    --v-offset: 0px;
    position: absolute;
    min-width: 300px;
    min-height: 20px;
    background: var(--color-dropdown);
    border-radius: var(--radius);
    border: 1px solid var(--color-dropdown-border);
    box-shadow: var(--shadow-dropdown);
    z-index: 8;
    top: calc(100% + 5px);
    padding: 5px;
    color: var(--color-text);

    &.align-right
    {
      right: 0;
    }

    &.align-top
    {
      top: calc(100% + 5px);
      bottom: auto;
    }

    &.align-bottom
    {
      bottom: calc(100% + 5px + var(--v-offset));
      top: auto;
    }
  }
</style>