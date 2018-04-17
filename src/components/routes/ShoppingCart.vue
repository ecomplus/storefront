<template>
  <div class="_cart">
    <h1 class="_cart-title">
      Carrinho
      <small>2 itens</small>
    </h1>
    <div class="_cart-content">
      <el-row>
        <el-col :span="18" class="_items">
          <div class="_item" v-for="n in 2">
            <el-row>
              <el-col :span="4" class="_item-image">
                <img src="https://cea.vteximg.com.br/arquivos/ids/2692924-200-240/Polo-Masculina-em-Piquet-Listrada-Manga-Curta-Azul-Marinho-9115127-Azul_Marinho_1.jpg?v=636578442433670000" />
              </el-col>
              <el-col :span="20" class="_item-info">
                <el-row type="flex" align="middle" justify="space-between">
                  <div class="_item-values">
                    <span class="_item-quantity">
                      <el-input-number :min="1" :max="10" size="small"></el-input-number>
                    </span>
                    <span class="_item-remove">
                      <el-button type="danger" size="small">
                        <a-icon icon="times"></a-icon>
                      </el-button>
                    </span>
                    <span class="_item-price">
                      R$ 59,00
                    </span>
                  </div>
                  <div class="_item-total">
                    R$ 59,00
                  </div>
                </el-row>
                <div class="_item-gift">
                  <el-checkbox>
                    <a-icon icon="gift"></a-icon> Embrulhar para presente
                  </el-checkbox>
                </div>
                <h4 class="_item-title">
                  <small class="_item-sku">#AJBKJBN7</small>
                  Produto Jaju Kv Iosbbk Ik
                </h4>
              </el-col>
            </el-row>
          </div>
        </el-col>
        <el-col :span="6" class="_cart-info">
          <div class="_cart-values">
            <el-row>
              <el-col :span="12" class="_cart-subtotal">
                <small>Subtotal</small>
                R$ 500,00
              </el-col>
              <el-col :span="12" class="_cart-freigth">
                <small>Frete</small>
                R$ 70,00
              </el-col>
            </el-row>
            <el-popover ref="popzip" trigger="click" width="240">
              <div class="_cart-zip-popover">
                <el-input placeholder="CEP" class="_cart-zip" size="small">
                  <el-button slot="append">Calcular</el-button>
                </el-input>
              </div>
            </el-popover>
            <div class="_cart-zip-trigger">
              <a href="javascript:;" v-popover:popzip>
                Calcular frete
                <a-icon icon="truck"></a-icon>
              </a>
            </div>
            <el-popover ref="popcoupon" trigger="click" width="300">
              <div class="_cart-coupon-popover">
                <el-input placeholder="Código do cupom" class="_cart-coupon" size="small">
                  <el-button slot="append">Adicionar</el-button>
                </el-input>
              </div>
            </el-popover>
            <div class="_cart-coupon-trigger">
              <a href="javascript:;" v-popover:popcoupon>Adicionar cupom de desconto</a>
            </div>
          </div>
          <div class="_cart-total">
            <small>Total</small>
            R$ 570,00
          </div>
          <el-button type="success" class="_cart-buy">
            <a-icon icon="check" class="_buy-icon"></a-icon>
            Fechar pedido
          </el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ShoppingCart',
  computed: mapGetters([
    'cart'
  ])
}
</script>

<style lang="scss">
// Element UI theme variables
@import '../../../node_modules/element-theme-chalk/src/common/var.scss';

._item {
  padding: $--card-padding 0;
  border-top: 1px dashed $--border-color-light;
  margin-right: $--card-padding;
}
._item:not(:last-child) {
  border-bottom: none;
}
._item-image {
  padding-right: $--card-padding;
}
._item-image > img {
  border-radius: $--border-radius-small;
  border: $--border-base;
}
._item-values > * {
  display: inline-block;
}
._item-price {
  color: $--color-text-secondary;
  margin-left: 20px;
}
._item-total {
  color: $--color-text-primary;
  text-align: right;
  margin: -4px 0 0 10px;
}
._item-price,
._item-total,
._cart-buy {
  font-size: $--font-size-large;
}
._item-remove {
  margin-left: 10px;
}
._item-gift {
  margin-top: 10px;
}
._item-sku {
  color: $--color-text-secondary;
  font-size: 12px;
  display: block;
  margin-bottom: 2px;
}
._cart-info {
  text-align: right;
  font-size: $--font-size-large;
}
._cart-info > * {
  padding: $--card-padding;
}
._cart-info small {
  display: block;
  color: $--color-text-secondary;
}
._cart-values {
  background: $--border-color-extra-light;
  border-radius: $--border-radius-base;
}
._cart-total {
  font-weight: 600;
}
._cart-buy {
  width: 100%;
  font-weight: 600;
}
._buy-icon {
  margin-right: 10px;
}
._cart-zip-trigger,
._cart-coupon-trigger {
  font-size: 85%;
}
._cart-zip-trigger {
  margin: 10px 0 5px 0;
}
</style>
