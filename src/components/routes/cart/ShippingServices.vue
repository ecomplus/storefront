<template>
  <div class="_shipping">
    <el-collapse-transition>
      <div v-if="!shippingLoading" key="shipping-services" class="_shipping-services">
        <div v-if="shippingServices.length">
          <div
            class="_shipping-service"
            v-for="(service, index) in shippingServices"
            :key="index + service.selected.toString()"
            :class="{ '_shipping-selected': service.selected }"
            @click="selectShippingService(index)">
            <a-icon v-if="service.selected" icon="shipping-fast" class="_shipping-icon"></a-icon>
            <span class="_shipping-deadline">
              {{ $t('shipping.upTo') + ' ' + shippingServiceTime(service) }}
              {{ !shippingServiceWorkingDays(service) ?
                $t('shipping.days') : $t('shipping.workingDays') }}
            </span>
            <span class="_shipping-freight">
              {{ formatMoney(service.shipping_line.total_price) }}
            </span>
            <span class="_shipping-label">
              {{ service.label }}
            </span>
          </div>
        </div>

        <div v-else class="_shipping-empty">
          {{ $t('shipping.empty') }}
        </div>
      </div>

      <div v-else key="services-loading" class="_shipping-loading">
        <a-icon class="_shipping-loading-icon __icon-mr" icon="circle-notch" spin></a-icon>
        {{ $t('shipping.loading') }}
      </div>
    </el-collapse-transition>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { formatMoney } from '@/lib/utils'

export default {
  name: 'ShippingServices',

  computed: mapGetters([
    'shippingServices',
    'checkoutZip',
    'shippingServiceTime',
    'shippingServiceWorkingDays',
    'shippingLoading',
    'shippingLoadError'
  ]),

  methods: {
    ...mapMutations([
      'selectShippingService'
    ]),
    formatMoney,

    loadError () {
      if (this.shippingLoadError) {
        // show alert notification
        if (this.shippingLoadError === 'INVALID_ZIP') {
          this.$message({
            showClose: true,
            message: this.$t('shipping.invalidZip'),
            type: 'warning'
          })
        } else {
          // API or client error
          this.$message({
            message: this.$t('shipping.loadError'),
            type: 'error'
          })
        }
      }
    }
  },

  watch: {
    shippingLoadError () {
      this.loadError()
    }
  },

  mounted () {
    this.loadError()
  }
}
</script>

<style lang="scss">
// Element UI theme variables
@import '../../../../node_modules/element-theme-chalk/src/common/var.scss';

._shipping {
  font-size: $--font-size-base;
  text-align: right;
}
._shipping-service {
  display: block;
  background: $--tag-info-fill;
  margin-top: $--card-padding * .5;
  border-radius: $--tag-border-radius;
  padding: $--card-padding * .55 $--card-padding * .75;
  overflow: hidden;
  cursor: pointer;
  transition: $--all-transition;
  position: relative;
}
._shipping-service:first-child {
  margin-top: 0;
}
._shipping-icon {
  position: absolute;
  top: 50%;
  margin-top: -($--font-size-base / 2);
  line-height: 1;
  left: $--card-padding * .6;
  color: rgba($--color-success, .6);
}
._shipping-label {
  display: inline-block;
  color: $--color-primary;
}
._shipping-label::before {
  content: ' / ';
  font-size: $--font-size-small;
}
._shipping-freight::before {
  content: ' - ';
  font-size: $--font-size-small;
}
._shipping-selected ._shipping-deadline {
  font-weight: 600;
}
._shipping-selected,
._shipping-service:hover {
  background: darken($--tag-info-fill, 20%);
  color: $--color-text-primary;
}
._shipping-selected ._shipping-label {
  color: $--color-success;
}
._shipping-loading-icon {
  color: $--color-primary;
}
</style>
